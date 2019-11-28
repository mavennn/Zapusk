<template>
  <div class="skittles-meetings">
    <!-- Header -->
    <div class="sm-header">
      <div class="smh-name">
        <div class="smhn-title">ONE-TO-ONE MEETINGS AGENDA</div>
        <div class="smhn-subtitle">Meeting Zone</div>
      </div>
      <div class="smh-date">NOVEMBER 28</div>
    </div>

    <!-- Таблица -->
    <div class="sm-body">
      <ul>
        <li v-for="block in blocks" class="li-class">
          <!-- над таблицей написать номер блока -->
          <!-- в каждом li хранится объект block с имененм, times, и спикерами -->
          <!-- для каждого такого блока надо сделать таблица -->
          <!-- в шапке таблицы будут:  "Спикеры", проитерировать времена-->
          <table class="smb-table">
            <thead>
              <tr>
                <td>Блок {{ block.name }}</td>
                <td v-for="time in block.times">{{ time }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="speaker in speakers">
                <td v-if="speaker.block === block.name">
                  {{speaker.name}}
                  {{speaker.sname}}
                </td>
                <td v-for="s in speaker.sortRequest" v-if="speaker.block === block.name">
                  {{ s.name }} {{ s.sname }}
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <!--      <table class="smb-table">-->
      <!--        <thead>-->
      <!--          <tr>-->
      <!--            <th>SPEAKERS</th>-->
      <!--            <th-->
      <!--              :class="{-->
      <!--                'smbt-current': currentTime(-->
      <!--                  t,-->
      <!--                  times[key + 1] ? times[key + 1] : t-->
      <!--                )-->
      <!--              }"-->
      <!--              v-for="(t, key) in times"-->
      <!--              v-bind:key="'t' + key"-->
      <!--            >-->
      <!--              {{ t }}-->
      <!--            </th>-->
      <!--          </tr>-->
      <!--        </thead>-->
      <!--        <tbody>-->

      <!--          <tr v-for="(speaker, key) in speakers" v-bind:key="'sp' + key">-->
      <!--            <td>{{ getName(speaker.id) }}</td>-->
      <!--            <td-->
      <!--              :class="{-->
      <!--                'smbt-current': currentTime(-->
      <!--                  user.time,-->
      <!--                  speaker.users[key + 1]-->
      <!--                    ? speaker.users[key + 1].time-->
      <!--                    : user.time-->
      <!--                )-->
      <!--              }"-->
      <!--              v-for="(user, key) in speaker.users"-->
      <!--              v-bind:key="'sp' + key"-->
      <!--            >-->
      <!--              {{ user.id ? getName(user.id) : "-" }}-->
      <!--            </td>-->
      <!--          </tr>-->
      <!--        </tbody>-->
      <!--      </table>-->
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      blocks: [],
      times: [],
      speakers: [],
      requests: [],
      names: []
    };
  },
  props: {},
  computed: {},
  created() {
    this.getBlocks();
    this.getRequests();
    this.getSpeakers();
    // this.getSpeakersName({ _id: "5ddebee5ea54b81f3aa392b3"})
    // this.getMeetings();
    // setInterval(() => {
    //   this.getMeetings();
    // }, 10000);
  },
  methods: {
    sortRequests(block) {
      for (let i = 0; i <= 19; i++) {
        for (let j = 1; j <= block.speakers.length; j++) {
          console.log(this.speakers[j].sortedRequest[i]);
          let c = this.speakers[j].sortedRequest[i];
          let prev = this.speakers[j - 1].sortedRequest[i];
          let nextInList = this.speakers[j].sortedRequest[i + 1];
          if (c === prev) {
            let temp = c;
            this.speakers[j].sortedRequest[i] = nextInList;
            nextInList = c;
          }
        }
      }
    },
    getRequestsForSpeaker(speakerId) {
      let requests = this.requests.filter(x => x.speaker === speakerId);
      let sortedRequest = _.orderBy(requests, ["rating"], ["desc"]);
      this.speakers[this.speakers.findIndex(x => x._id === speakerId)].sortRequests = sortedRequest;
      // let speaker = this.speakers[
      //   this.speakers.findIndex(x => x._id === speakerId)
      // ];
      // this.speakers[this.speakers.findIndex(x => x._id === speakerId)] = {
      //   ...speaker,
      //   sortedRequest
      // };

      // return sortedRequest;
    },
    getSpeakerName(speakerId) {
      let speaker = this.speakers.find(x => x._id === speakerId);
      if(speaker.name === undefined || speaker === undefined) speaker.name = "Александр";
      return speaker.name;
    },
    getSpeakerSname(speakerId) {
      let speaker = this.speakers.find(x => x._id === speakerId);
      return speaker.sname;
    },
    getSpeakers() {
      Request.post("/meetings/getSpeakers")
        .then(async data => {
          this.speakers = data;
          this.speakers.map(s => {
            let requests = this.requests.filter(x => x.speaker === s._id);
            let sortedRequest = _.orderBy(requests, ["rating"], ["desc"]);
            s.sortRequest = sortedRequest;
          });
        })
        .catch(err => console.log("err", err));
    },
    getRequests() {
      Request.post("/meetings/getRequests")
        .then(data => {
          this.requests = data;
        })
        .catch(err => console.log("err", err));
    },
    // getSpeakersName(_id) {
    //   Request.post("/meetings/getSpeaker", _id, false, true)
    //     .then(data => {
    //       let { _id, name, sname } = data;
    //
    //       this.blocks.map(block => {
    //         block.speakers = block.speakers.map(speaker => {
    //           if (speaker === _id) {
    //             return { _id, name, sname }
    //           }
    //           return speaker
    //         })
    //       });
    //     })
    //     .catch(error => {
    //       swal("Ошибка", error, "error");
    //     });
    // },
    getBlocks() {
      Request.post("/meetings/getBlocks")
        .then(data => {
          this.blocks = data.blocks;
          const TOTAL_MEETINGS = 20;

          // для каждого блока итерируем время
          this.blocks.map(block => {
            block.times = [];
            block.times[0] = block.timeStart;

            // тут получаем время для каждого блока
            for (let i = 1; i <= TOTAL_MEETINGS - 1; i++) {
              let currentTime = block.times[i - 1];
              let mas = currentTime.split(":");
              let hour = Number(mas[0]);
              let min = Number(mas[1]);

              if (min === 55) {
                hour = hour + 1;
              }

              min = min + 5;

              if (min === 60) {
                min = 0;
              }

              if (min - 10 < 0) {
                min = "0" + min.toString();
              }

              let result = hour.toString() + ":" + min.toString();
              //
              block.times.push(result);
            }
          });
        })
        .catch(err => swal("УПс", "Пока нет встреч", "error"));
    },
    currentTime(curr, nex) {
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      let numval = hour * 100 + min;
      return (
        Number(curr.replace(":", "")) <= numval &&
        numval < Number(nex.replace(":", ""))
      );
    },
    // getName(id) {
    //   if (this.names[id]) {
    //     return `${this.names[id].name} ${this.names[id].sname}`;
    //   } else {
    //     return "-";
    //   }
    // },
    getMeetings() {
      Request.post("/meetings/list")
        .then(data => {
          this.times = [];
          this.speakers = [];
          this.names = data.users;

          // тут заполняется this.times и this.speakers
          data.meetings.forEach(element => {
            if (!this.times.includes(element.time)) {
              this.times.push(element.time);
            }
            if (!this.speakers.includes(element.speaker)) {
              this.speakers.push(element.speaker);
            }
          });

          // тут в this.speakers добавляется users []
          this.speakers = this.speakers.map(item => {
            return { id: item, users: [] };
          });

          this.times.sort((a, b) => {
            return Number(a.replace(":", "")) - Number(b.replace(":", ""));
          });

          this.speakers.forEach((elem, i) => {
            this.times.forEach(tm => {
              elem.users.push({ time: tm, id: "-" });
            });
            elem.users.forEach((us, j) => {
              data.meetings.forEach((meet, k) => {
                if (meet.speaker == elem.id && meet.time == us.time) {
                  us.id = meet.user;
                }
              });
            });
          });
        })
        .catch(err => {
          console.log(err);
          // swal('Error', err, 'error')
        });
    }
  },
  beforeDestroy() {},
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.skittles-meetings {
  min-width: 1440px;
  min-height: 100vh;
  padding: 48px 30px;
  background: #132d75;
  .sm-header {
    border-top: solid 2px #a8a8a8;
    display: flex;
    padding-top: 10px;
    padding-bottom: 59px;
    .smh-name {
      flex: 1;
      .smhn-title {
        font-size: 24px;
        color: #ffffff;
      }
      .smhn-subtitle {
        font-size: 20px;
        color: #c5c3c5;
        line-height: 35px;
      }
    }
    .smh-date {
      font-size: 32px;
      font-weight: bold;
      color: white;
    }
  }
  .sm-body {
    .li-class{
      list-style: none;
    }
    .smb-table {
      border-collapse: collapse;
      color: #ffffff;
      th,
      td {
        width: 120px;
        &:first-child {
          width: 175px;
          text-align: left !important;
        }
        &.smbt-current {
          background: white;
          color: #132d75;
        }
      }
      thead {
        tr {
          th {
            font-size: 18px;
            font-weight: 600;
            height: 34px;
            line-height: 34px;
            border-bottom: solid 1px #a8a8a8;
            padding-bottom: 5px;
            &:first-child {
              text-align: left;
            }
            &.smbt-current {
              border-color: white;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            font-size: 14px;
            line-height: 1.14;
            letter-spacing: normal;
            text-align: center;
            vertical-align: top;
            padding-top: 15px;
            padding-bottom: 15px;
            &:first-child {
              font-size: 14px;
              line-height: 1.14;
              color: #ffffff;
              text-transform: uppercase;
            }
          }
          &:first-child {
            td {
              padding-top: 31px;
            }
          }
        }
      }
    }
  }
}
</style>
