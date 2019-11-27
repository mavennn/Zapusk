<template>
  <div class="skittles-meetings">
    <div class="sm-header">
      DON’T MISS YOUR MEETING!
    </div>
    <div class="sm-body">
      <div class="smb-current">
        <div class="smbc-head">
          <div class="smbch-title">CURRENT MEETINGS END IN:</div>
          <div class="smbch-time">
            <countdown :time="10 * 60 * 1000">
              <template slot-scope="props"
                >{{ props.minutes }}:{{ props.seconds }}</template
              >
            </countdown>
          </div>
        </div>
        <div class="smbc-content">
          <div
            class="smbcc-row"
            v-for="(sp, key) in speakers"
            v-bind:key="'sp' + key"
          >
            <div class="smbccr-left">{{ getName(sp.id) }}</div>
            <div class="smbccr-right">{{ getName(getCurrent(sp.users)) }}</div>
          </div>
        </div>
      </div>
      <div class="smb-next">
        <div class="smbn-head">
          <div class="smbnh-title">NEXT PARTICIPANTS TO BE READY IN</div>
          <div class="smbnh-time">
            <countdown :time="10 * 60 * 1000">
              <template slot-scope="props"
                >{{ props.minutes }} MINUTES</template
              >
            </countdown>
          </div>
        </div>
        <div
          class="smbn-row"
          v-for="(sp, key) in speakers"
          v-bind:key="'spn' + key"
        >
          {{ getName(getNext(sp.users)) }}
        </div>
      </div>
      <div class="smb-next">
        <div class="smbn-head">
          <div class="smbnh-title">PARTICIPANTS TO BE READY IN</div>
          <div class="smbnh-time">
            <countdown :time="20 * 60 * 1000">
              <template slot-scope="props"
                >{{ props.minutes }} MINUTES</template
              >
            </countdown>
          </div>
        </div>
        <div
          class="smbn-row"
          v-for="(sp, key) in speakers"
          v-bind:key="'span' + key"
        >
          {{ getName(getAfterNext(sp.users)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";

Vue.component(VueCountdown.name, VueCountdown);
export default {
  data() {
    return {
      times: [],
      speakers: [],
      names: [],
      curcount: 0
    };
  },
  props: {},
  computed: {},
  created() {
    this.getMeetings();
  },
  methods: {
    getCurrent(users) {
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      let numval = hour * 100 + min;
      let count = 0;
      this.times.forEach(time => {
        if (numval > Number(time.replace(":", ""))) {
          count++;
        }
      });
      this.curcount = --count;
      return users[--count] ? users[--count].id : null;
    },
    getNext(users) {
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      let numval = hour * 100 + min;
      let count = 0;
      this.times.forEach(time => {
        if (numval > Number(time.replace(":", ""))) {
          count++;
        }
      });
      return users[count] ? users[count].id : null;
    },
    getAfterNext(users) {
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      let numval = hour * 100 + min;
      let count = 0;
      this.times.forEach(time => {
        if (numval > Number(time.replace(":", ""))) {
          count++;
        }
      });
      return users[++count] ? users[++count].id : null;
    },
    getName(id) {
      if (id) {
        return `${this.names[id].name} ${this.names[id].sname}`;
      } else {
        return "-";
      }
    },
    getMeetings() {
      Request.post("/meetings/list")
        .then(data => {
          this.names = data.users;
          data.meetings.forEach(element => {
            if (!this.times.includes(element.time)) {
              this.times.push(element.time);
            }
            if (!this.speakers.includes(element.speaker)) {
              this.speakers.push(element.speaker);
            }
          });
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
  padding: 48px 43px;
  background: #132d75;
  color: white;
  .sm-header {
    font-size: 32px;
    text-align: center;
    padding-bottom: 52px;
  }
  .sm-body {
    display: flex;
    .smb-current {
      border: solid 1px #979797;
      padding: 17px 22px;
      width: 50%;
      .smbc-head {
        padding-bottom: 29px;
        .smbch-title {
          font-size: 18px;
          line-height: 1.89;
          text-align: center;
          color: #ffffff;
        }
        .smbch-time {
          font-size: 28px;
          font-weight: 900;
          text-align: center;
          line-height: 27px;
        }
      }
      .smbc-content {
        .smbcc-row {
          display: flex;
          font-weight: 600;
          margin-bottom: 6px;
          .smbccr-left {
            flex: 1;
            font-size: 20px;
            line-height: 0.8;
            letter-spacing: normal;
            color: #ffffff;
            text-transform: uppercase;
            padding: 17px 0;
          }
          .smbccr-right {
            width: 50%;
            border: solid 1px #979797;
            background-color: #d8d8d8;
            font-size: 20px;
            line-height: 0.8;
            color: #17479e;
            padding: 18px 20px;
          }
        }
      }
    }
    .smb-next {
      width: calc(25% - 40px);
      margin-left: 40px;
      .smbn-head {
        text-align: center;
        padding-top: 16px;
        padding-bottom: 24px;
        .smbnh-title {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.89;
          text-transform: uppercase;
        }
        .smbnh-time {
          font-size: 28px;
          font-weight: 600;
        }
      }
      .smbn-row {
        border: solid 1px #979797;
        font-size: 20px;
        padding: 14px 25px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>