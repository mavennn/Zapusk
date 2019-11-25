<template>
  <div class="skittles-profile" v-if="load">
    <div class="sp-block">
      <div class="spb-title">
        {{ lang == "en" ? "Personal Info" : "Персональная информация" }}
      </div>
      <div class="spb-content">

        <!-- фото -->
        <div class="spbc-row">
          <div class="spbcr-img" :style="getImg(user.photo)"></div>
          <div class="spbcr-desc">
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                {{ lang == "en" ? "Name" : "Имя" }}:
              </div>
              <div class="spbcrdr-val">{{ user.name }} {{ user.sname }}</div>
            </div>
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                {{ lang == "en" ? "Country" : "Страна" }}:
              </div>
              <div class="spbcrdr-val">
                {{ getName(user.country, "country") }}
              </div>
            </div>
            <div class="spbcrd-row">
              <div class="spbcrdr-label">
                {{ lang == "en" ? "City" : "Город" }}:
              </div>
              <div class="spbcrdr-val">{{ user.city }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sp-block">
      <div class="spb-title">
        {{ lang == "en" ? "My Organization" : "Моя организация" }}
      </div>
      <div class="spb-content">
        <div class="spbc-row">
          <div class="spbcr-label">
            {{ lang == "en" ? "Organization" : "Организация" }}:
          </div>
          <div class="spbcr-val">{{ user.companyName }}</div>
        </div>
        <div class="spbc-row">
          <div class="spbcr-label">
            {{ lang == "en" ? "Business Sphere" : "Cфера деятельности" }}:
          </div>
          <div class="spbcr-val">{{ user.businessSphere }}</div>
        </div>
        <div class="spbc-row">
          <div class="spbcr-label">{{ lang == "en" ? "Company URL" : "Ссылка на сайт" }}:</div>
          <div class="spbcr-val">
            {{ getName(user.companyUrl, "role") }}
          </div>
        </div>
      </div>
    </div>
<!--    <div class="sp-block" v-if="user.permission == 'speaker'">-->
<!--      <div class="spb-title">-->
<!--        {{ lang == "en" ? "My Presentation" : "Моя презентация" }}-->
<!--      </div>-->
<!--      <div class="spb-content">-->
<!--        <div class="spbc-block">-->
<!--          <div class="spbc-event">-->
<!--            <div class="spbce-title">{{ user.presentation.subject }}</div>-->
<!--            <div class="spbce-divider">-->
<!--              <div class="spbced-border"></div>-->
<!--            </div>-->
<!--            <div class="spbce-time">-->
<!--              {{ user.presentation.day == 1 ? "24" : "25" }} AUG-->
<!--              {{ user.presentation.time }}-->
<!--            </div>-->
<!--          </div>-->
<!--          <a :href="user.presentation.link" target="_blank"-->
<!--            ><div class="spbc-button">-->
<!--              {{ lang == "en" ? "Tap to open pitchdeck" : "Посмотреть" }}-->
<!--            </div></a-->
<!--          >-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="schedulled-content">
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
                  v-if="block.title == 'meetings' || block.title == 'Встречи'"
                  class="sbbidr-time"
                  :class="{ 'sbbidrt-active': event.future }"
                >
                  {{ event.time }}
                </div>
                <div v-else class="sbbidr-time">
                  {{
                    event.status == 1
                      ? lang == "en"
                        ? "Submitted"
                        : "Подана"
                      : ""
                  }}
                  {{
                    event.status == 2
                      ? lang == "en"
                        ? "Accepted"
                        : "Принята"
                      : ""
                  }}
                  {{
                    event.status == 3
                      ? lang == "en"
                        ? "Rejected."
                        : "Отклонена"
                      : ""
                  }}
                </div>
              </div>
              <div class="sbbid-company">{{ event.organization }}</div>
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
            отсутствуют
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      days: [1, 2],
      active_day: 2,
      users: {},
      blocks: [
        {
          title: "meetings",
          place: "Meeting Zone",
          events: []
        },
        {
          title: "requests",
          place: "",
          events: []
        }
      ],
      lang: "ru",
      load: false,
      opts: {
        role: [],
        country: []
      },
      user: {
        prefix: null,
        name: "",
        sname: "",
        prefname: "",
        country: "",
        photo: "",
        email: "",
        companyName: "",
        companyUrl: "",
        vacanciesUrl: "",
        businessSphere: "",
        questionsForSpeaker: {
          yourProduct: "",
          companyTasks: "",
          positions: "",
          candidatsTasks: "",
          intership: ""
        },
        recording_status: 1
      }
    };
  },
  computed: {},
  created() {
    this.getMyMeetings();
    this.getMyRequests();
    App.User.getTags()
      .then(data => {
        this.opts = data;
        if (this.lang == "ru") {
          this.blocks[0].title = "Встречи";
          this.blocks[1].title = "Заявки";
        }
      })
      .then(() => {
        App.User.getUserById(this.data).then(res => {
          this.user = data;
          this.load = true;
        });
      });
  },
  methods: {
    getMyMeetings() {
      Request.postJson("/api/admin/meetings/list", {
        speakerId: this.data,
        day: this.active_day,
        status: 1
      })
        .then(data => {
          this.users = data.users;
          this.blocks[0].events = data.meetings.map(val => {
            if (this.users[val.user]) {
              val.username =
                this.users[val.user].name + " " + this.users[val.user].sname;
              val.organization = this.users[val.user].organization
                ? this.users[val.user].organization.name
                : "";
              val.country = this.users[val.user].country;
              val.photo = this.users[val.user].photo;
            }
            return val;
          });
        })
        .catch(err => {
          console.log(err);
          // swal('Error', err, 'error')
        });
    },
    getMyRequests() {
      Request.postJson("/api/admin/requests/list", {
        speakerId: this.data,
        day: this.active_day
      })
        .then(data => {
          this.users = data.users;
          this.blocks[1].events = data.requests.map(val => {
            val.username =
              this.users[val.user].name + " " + this.users[val.user].sname;
            val.organization = this.users[val.user].organization
              ? this.users[val.user].organization.name
              : "";
            val.country = this.users[val.user].country;
            val.photo = this.users[val.user].photo;
            return val;
          });
        })
        .catch(err => {
          //swal('Error', err, 'error')
        });
    },
    getUserInfo() {},
    getImg(url) {
      if (!url) return "background: grey";
      return `background: url(${url}) center no-repeat`;
    },
    getName(arr, opt) {
      let str = "";
      let arr1 = [];
      if (typeof arr == "string" || typeof arr == "undefined") {
        arr1.push(arr);
      } else {
        arr1 = arr;
      }
      if (undefined == arr1) {
        console.log(opt);
      }
      arr1.forEach(item => {
        this.opts[opt].forEach(elem => {
          if (item == elem._id) {
            str += `${elem.name}, `;
          }
        });
      });
      return str.slice(0, str.length - 2);
    },
    getNameById(id, opt) {
      if (empty(id)) return "";
      if (empty(this.opts[opt])) return "s";
      return this.opts[opt].filter(v => v._id == id)[0].name;
    },
    smessage() {
      this.$root.$emit("smessage", false);
    },
    sendRequest() {
      Request.postJson("/api/user/appointment/make", {
        speakerId: this.user._id
      })
        .then(data => {
          swal("Success", "Request sent successfully", "success");
        })
        .catch(err => {
          if (err == "feedback") {
            this.smessage();
          } else {
            swal("Info", err, "info");
          }
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
  components: {}
};
</script>

<style lang="scss" scoped>
.skittles-profile {
  .spContent {
    font-weight: 600;
  }
  .sp-block {
    .spb-title {
      font-family: Akrobat;
      font-size: 12px;
      line-height: 1.08;
      letter-spacing: normal;
      color: #000000;
      text-transform: uppercase;
      padding: 7px 0;
      border-bottom: solid 1px #979797;
    }
    .spb-content {
      padding: 9px 0 0px;
      .spbc-row {
        padding-bottom: 13px;
        display: flex;
        .spbcr-img {
          background-size: cover !important;
          width: 54px;
          height: 54px;
        }
        .spbcr-desc {
          flex: 1;
          margin-left: 17px;
          .spbcrd-row {
            display: flex;
            margin-bottom: 4px;
            .spbcrdr-label {
              width: 74px;
              font-family: Akrobat;
              font-size: 12px;
              line-height: 1;
              letter-spacing: -0.3px;
              color: #17479e;
            }
            .spbcrdr-val {
              font-family: Akrobat;
              font-size: 12px;
              line-height: 1;
              letter-spacing: -0.3px;
              color: #132d75;
            }
          }
          .spbcrdr-btm-l {
            font-size: 10px;
            color: #838383;
            letter-spacing: 0;
            line-height: 12px;
          }
        }
        .spbcr-label {
          flex: 1;
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #17479e;
        }
        .spbcr-val {
          flex: 1;
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #132d75;
        }
      }
      .spbc-block {
        padding-bottom: 12px;
        .spbc-event {
          display: flex;
          .spbce-title {
            font-family: Akrobat;
            font-size: 12px;
            font-weight: 600;
            line-height: 0.83;
            letter-spacing: normal;
            color: #17479e;
            text-transform: uppercase;
          }
          .spbce-divider {
            flex: 1;
            padding: 4px;
            .spbced-border {
              border-bottom: dashed 1px #132d75;
              width: 100%;
            }
          }
          .spbce-time {
            font-family: Akrobat;
            font-size: 12px;
            font-weight: 600;
            line-height: 0.83;
            letter-spacing: normal;
            text-align: right;
            color: #4a4a4a;
            text-transform: uppercase;
            width: 85px;
          }
        }
        .spbc-button {
          font-family: Akrobat;
          font-size: 10px;
          font-weight: 600;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.2;
          letter-spacing: normal;
          color: #838383;
          text-transform: uppercase;
          margin-top: 5px;
        }
      }
      .spbc-onetag {
        font-family: Akrobat;
        font-size: 10px;
        line-height: 1.5;
        letter-spacing: normal;
        color: #000000;
        border-radius: 13px;
        border: solid 1px #479ccf;
        padding: 3px 10px 2px 22px;
        position: relative;
        width: fit-content;
        margin-bottom: 13px;
        &:before {
          content: "";
          display: block;
          top: 3px;
          left: 3px;
          width: 12px;
          height: 12px;
          position: absolute;
          border: 1px solid #479ccf;
          border-radius: 50%;
        }
        &:after {
          content: "";
          display: block;
          top: 6px;
          left: 6px;
          width: 8px;
          height: 8px;
          position: absolute;
          background: #479ccf;
          border-radius: 50%;
        }
      }
      .spbc-group {
        .spbcg-title {
          font-family: Akrobat;
          font-size: 12px;
          line-height: 1;
          letter-spacing: -0.3px;
          color: #17479e;
          margin-bottom: 10px;
        }
        .spbcg-body {
          display: flex;
          flex-wrap: wrap;
          .spbcgb-tag {
            font-family: Akrobat;
            font-size: 10px;
            line-height: 1.5;
            letter-spacing: normal;
            color: #000000;
            border-radius: 13px;
            border: solid 1px #479ccf;
            padding: 3px 10px 2px 22px;
            position: relative;
            width: fit-content;
            margin-bottom: 13px;
            margin-right: 10px;
            &:before {
              content: "";
              display: block;
              top: 3px;
              left: 3px;
              width: 12px;
              height: 12px;
              position: absolute;
              border: 1px solid #479ccf;
              border-radius: 50%;
            }
            &:after {
              content: "";
              display: block;
              top: 6px;
              left: 6px;
              width: 8px;
              height: 8px;
              position: absolute;
              background: #479ccf;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .speakers-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: #62b5e5;
    color: white;
    text-transform: uppercase;
    text-align: center;
    font-size: 14px;
    padding: 11px 0;
  }
}
.schedulled-content {
  .skittles-days {
    display: flex;
    .sd-item {
      color: #a8a8a8;
      font-size: 14px;
      font-weight: 600;
      width: 100px;
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
          background-size: cover;
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
