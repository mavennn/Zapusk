<template>
  <div>
    <MainHeader tab="agenda" :lang="lang" />
    <div class="skittles-content">
      <div class="skittles-days">
        <div
          class="sd-item"
          :class="{ 'sdi-active': day == active_day }"
          v-for="(day, key) in days"
          v-bind:key="key"
          @click="active_day = day"
        >
          {{ lang == "en" ? "Day" : "День" }} {{ day }}
        </div>
      </div>

      <!--    INTRODUCTORY AND SPEAKERS    -->
      <div
        class="skittles-block"
        v-for="(block, key) in blocks"
        v-bind:key="'block_' + key"
      >
        <div class="sb-head">
          <div class="sbh-title">{{ block.title }}</div>
          <div class="sbh-place">{{ block.place }}</div>
        </div>
        <div class="sb-body">
          <div
            class="sbb-item"
            v-if="event.day == active_day"
            v-for="(event, key) in block.events"
            @click="openSpeakers(block.title, event)"
            v-bind:key="'event_' + key"
          >
            <div class="sbbi-event">
              <div class="sbbie-title">{{ event.title }}</div>
              <div class="sbbie-divider">
                <div class="sbbied-border"></div>
              </div>
              <div class="sbbie-time">{{ event.time }}</div>
            </div>
            <div class="sbbi-person">
              <div class="sbbip-name">
                {{ event.speaker.name }} {{ event.speaker.sname }}
              </div>
              <div class="sbbip-company">
                | {{ event.speaker.companyName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--      MEETENGS AND REQUESTS    -->
    <div class="schedulled-content">
      <div
        class="skittles-block"
        v-for="(block, key) in blocks1"
        v-bind:key="'block_' + key"
      >
        <div class="sb-head">
          <div class="sbh-title">{{ block.title }}</div>
          <div class="sbh-place">{{ block.place }}</div>
        </div>
        <div class="sb-body">
          <div
            class="sbb-item"
            v-for="(event, key) in block.events"
            v-bind:key="'event_' + key"
          >
            <div class="sbbi-img" :style="getImg(event.photo)"></div>
            <div class="sbbi-desc">
              <div class="sbbid-row">
                <div class="sbbidr-name">{{ event.username }}</div>
                <div class="sbbidr-divider">
                  <div class="sbbidrd-border"></div>
                </div>
                <div
                  v-if="block.title == 'my meetings'"
                  class="sbbidr-time"
                  :class="{ 'sbbidrt-active': event.future }"
                >
                  {{ event.time }}
                </div>
                <div v-else class="sbbidr-time">
<!--                  {{-->
<!--                    event.status == 1-->
<!--                      ? lang == "en"-->
<!--                        ? "Submitted"-->
<!--                        : "Подана"-->
<!--                      : ""-->
<!--                  }}-->
                  {{
                    event.status == 1
                      ? "Принята"
                      : ""
                  }}<br>
                  {{// event.time}}
<!--                  {{-->
<!--                    event.status == 3-->
<!--                      ? lang == "en"-->
<!--                        ? "Rejected."-->
<!--                        : "Отклонена"-->
<!--                      : ""-->
<!--                  }}-->
                </div>
              </div>
              <div class="sbbid-company">{{ event.companyName }}</div>
            </div>
          </div>
          <div
            v-show="lang == 'en'"
            class="sbb-noevent"
            v-if="block.events.length == 0"
          >
            You have no any
            {{ block.title == "my meetings" ? "meetings" : "requests" }} yet
            <br />Tap <span>SPEAKERS</span> for making appointments
          </div>
          <div
            v-show="lang == 'ru'"
            class="sbb-noevent"
            v-if="block.events.length == 0"
          >
            Нажмите на вкладку <span>СПИКЕРЫ</span>, чтобы записаться на
            встречу'
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "./main_header.vue";
export default {
  data() {
    return {
      lang: "en",
      days: [1],
      active_day: 1,
      users: {},
      blocks: [
        {
          title: "introductory",
          place: "Conference Hall",
          events: []
        },
        {
          title: "speakers",
          place: "Conference Hall",
          events: []
        }
      ],
      blocks1: [
        {
          title: "my meetings",
          place: "Meeting Zone",
          events: []
        },
        {
          title: "my requests",
          place: "",
          events: []
        }
      ]
    };
  },
  props: {},
  computed: {},
  created() {
    this.lang = localStorageProxy.getItem("lang");
    if (this.lang == "ru") {
      this.blocks[0].title = "выступления";
      this.blocks[1].title = "спикеры";
      this.blocks1[0].title = "мои встречи";
      this.blocks1[1].title = "мои заявки";
    }
    this.getMyMeetings();
    this.getMyRequests();
    App.User.getSchedulle().then(res => {
      res.sort((a, b) => {
        return a.time.split(":").join("") - b.time.split(":").join("");
      });
      res.forEach(element => {
        if (element.type == "introductory") {
          this.blocks[0].events.push(element);
        } else if (element.type == "speaker") {
          this.blocks[1].events.push(element);
        }
      });
    });
  },
  prettyTime() {

  },
  methods: {
    openSpeakers(title, event) {
      console.log(title, event);
      if (title == "speakers" || title == "спикеры")
        this.goRoute("/speaker/" + event.speaker._id);
    },
    getImg(url) {
      return `background: url(${url}) center no-repeat;background-size:cover;`;
    },
    // тут ошибка с swal err в начале загрузки агенды
    getMyMeetings() {
      Request.postJson("/api/user/meetings/forUser", { day: this.active_day })
        .then(data => {
          this.users = data.users;
          this.blocks1[0].events = data.meetings.map(val => {
            if (App.User.isSpeaker()) {
              val.username =
                this.users[val.user].name + " " + this.users[val.user].sname;
              val.university = this.users[val.user].university;
              val.country = this.users[val.user].country;
              val.photo = this.users[val.user].photo;
              return val;
            } else {
              val.username =
                this.users[val.speaker].name + this.users[val.speaker].sname;
              val.companyName = this.users[val.speaker].companyName;
              val.country = this.users[val.speaker].country;
              val.photo = this.users[val.speaker].photo;
              return val;
            }
          });
        })
        .catch(err => {
          console.log(err);
          // swal('Error', err, 'error')
        });
    },
    getMyRequests() {
      Request.postJson("/api/user/requests/forUser", { day: this.active_day })
        .then(data => {
          this.users = data.users; // тут спикеры, к которым я записан
          this.blocks1[1].events = data.requests.map(val => {
            val.username = this.users[val.speaker].name + " " + this.users[val.speaker].sname;
            val.companyName = this.users[val.speaker].companyName;
            val.country = this.users[val.speaker].country;
            val.photo = this.users[val.speaker].photo;
            return val;
          });
        })
        .catch(err => {
          console.log(err);
          // swal("Error", err, "error");
        });
    }
  },
  beforeDestroy() {},
  watch: {
    active_day() {
      this.getMyMeetings();
      this.getMyRequests();
    }
  },
  components: {
    MainHeader
  }
};
</script>

<style lang="scss">
.skittles-content {
  padding: 72px 16px 12px;
  .skittles-days {
    display: flex;
    .sd-item {
      color: #a8a8a8;
      font-size: 14px;
      font-weight: 600;
      width: 50px;
      text-transform: uppercase;
      &.sdi-active {
        color: #62b5e5;
      }
    }
  }
  .skittles-block {
    margin: 8px 0;
    .sb-head {
      display: flex;
      border-bottom: solid 1px #a8a8a8;
      padding: 5px 0;
      font-size: 14px;
      color: #4a4a4a;
      .sbh-title {
        flex: 1;
        text-transform: uppercase;
      }
    }
    .sb-body {
      .sbb-item {
        font-size: 12px;
        margin: 10px 0 12px;
        .sbbi-event {
          display: flex;
          .sbbie-title {
            font-weight: 600;
            color: #132d75;
            text-transform: uppercase;
          }
          .sbbie-divider {
            flex: 1;
            padding: 8px;
            .sbbied-border {
              border-bottom: dashed 1px #132d75;
              width: 100%;
            }
          }
          .sbbie-time {
            white-space: nowrap;
            color: #4a4a4a;
          }
        }
        .sbbi-person {
          display: flex;
          color: #17479e;
          .sbbip-name {
            font-weight: 600;
          }
          .sbbip-company {
            font-weight: 300;
            padding-left: 0.2rem;
          }
        }
      }
      .sbb-noevent {
        font-size: 12px;
        font-weight: 300;
        color: #132d75;
        text-align: center;
        padding: 20px;
        line-height: 20px;
        span {
          font-size: 14px;
          font-weight: normal;
          color: #9b9b9b;
        }
      }
    }
  }
}
.schedulled-content {
  padding: 0px 16px 12px;
  .skittles-days {
    display: flex;
    .sd-item {
      color: #a8a8a8;
      font-size: 14px;
      font-weight: 600;
      width: 50px;
      text-transform: uppercase;
      &.sdi-active {
        color: #62b5e5;
      }
    }
  }
  .skittles-block {
    margin: 12px 0;
    .sb-head {
      display: flex;
      border-bottom: solid 1px #a8a8a8;
      padding: 5px 0;
      font-size: 14px;
      color: #4a4a4a;
      .sbh-title {
        flex: 1;
        text-transform: uppercase;
      }
    }
    .sb-body {
      .sbb-item {
        font-size: 12px;
        margin: 10px 0 12px;
        display: flex;
        .sbbi-img {
          width: 42px;
          height: 42px;
        }
        .sbbi-desc {
          flex: 1;
          padding-left: 12px;
          .sbbid-row {
            display: flex;
            .sbbidr-name {
              color: #17479e;
            }
            .sbbidr-divider {
              flex: 1;
              padding: 8px;
              .sbbidrd-border {
                border-bottom: dashed 1px #132d75;
                width: 100%;
              }
            }
            .sbbidr-time {
              color: #c5c3c5;
              &.sbbidrt-active {
                color: #df4661;
              }
            }
          }
          .sbbid-company {
            color: #132d75;
            font-weight: 600;
          }
        }
      }
      .sbb-noevent {
        font-size: 12px;
        font-weight: 300;
        color: #132d75;
        text-align: center;
        padding: 20px;
        line-height: 20px;
        span {
          font-size: 14px;
          font-weight: normal;
          color: #9b9b9b;
        }
      }
    }
  }
}
</style>
