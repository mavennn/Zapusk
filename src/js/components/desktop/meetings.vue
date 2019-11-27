<template>
  <div class="skittles-meetings">
    <div class="sm-header">
      <div class="smh-name">
        <div class="smhn-title">ONE-TO-ONE MEETINGS AGENDA</div>
        <div class="smhn-subtitle">Meeting Zone</div>
      </div>
      <div class="smh-date">NOVEMBER 28</div>
    </div>
    <div class="sm-body">
      <table class="smb-table">
        <thead>
          <tr>
            <th>SPEAKERS</th>
            <th
              :class="{
                'smbt-current': currentTime(
                  t,
                  times[key + 1] ? times[key + 1] : t
                )
              }"
              v-for="(t, key) in times"
              v-bind:key="'t' + key"
            >
              {{ t }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(speaker, key) in speakers" v-bind:key="'sp' + key">
            <td>{{ getName(speaker.id) }}</td>
            <td
              :class="{
                'smbt-current': currentTime(
                  user.time,
                  speaker.users[key + 1]
                    ? speaker.users[key + 1].time
                    : user.time
                )
              }"
              v-for="(user, key) in speaker.users"
              v-bind:key="'sp' + key"
            >
              {{ user.id ? getName(user.id) : "-" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: [],
      speakers: [],
      names: []
    };
  },
  props: {},
  computed: {},
  created() {
    this.getMeetings();
    setInterval(() => {
      this.getMeetings();
    }, 10000);
  },
  methods: {
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
    getName(id) {
      if (this.names[id]) {
        return `${this.names[id].name} ${this.names[id].sname}`;
      } else {
        return "-";
      }
    },
    getMeetings() {
      Request.post("/meetings/list")
        .then(data => {
          console.log(data);

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

          console.log(this.speakers);
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
