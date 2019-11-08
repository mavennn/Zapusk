<template>
  <div>
    <div class="row bg-title">
      <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
        <h4 class="page-title">Schedule</h4>
      </div>
      <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
        <ol class="breadcrumb">
          <li><a href="#">Dashboard</a></li>
          <li class="active">Schedule</li>
        </ol>
      </div>
    </div>
    <div class="col-md-12">
      <div class="white-box">
        <section class="m-t-40">
          <div class="sttabs tabs-style-linebox">
            <nav>
              <ul>
                <li class="" :class="{ 'tab-current': day === 1 }">
                  <a href="#" @click.prevent="day = 1"><span>Day 1</span></a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Title</th>
                <th>Type</th>
                <th>Name</th>
                <th>Sname</th>
                <th>Organization</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="form-material"
                v-for="(val, key) in schedule"
                :key="key"
                v-if="val.day === day"
              >
                <td>
                  <span v-if="editTab !== key">{{ val.time }}</span>
                  <input
                    placeholder="00:00"
                    v-else
                    type="text"
                    v-model="val.time"
                    class="form-control form-control-line input-sm"
                  />
                </td>
                <td>
                  <span v-if="editTab !== key">{{ val.title }}</span>
                  <input
                    placeholder="Title"
                    v-else
                    type="text"
                    v-model="val.title"
                    class="form-control form-control-line input-sm"
                  />
                </td>
                <td>
                  <span v-if="editTab !== key">{{ val.type }}</span>
                  <select v-else v-model="val.type" class="form-control">
                    <option value="speaker">speaker</option>
                    <option value="introductory">introductory</option>
                  </select>
                </td>
                <td v-if="val.type === 'speaker'" :colspan="3">
                  <span v-if="editTab !== key"
                    ><a href="#" @click.prevent="detailSpeak(val.speaker._id)"
                      >{{ val.speaker.sname }} {{ val.speaker.name }},
                      {{ val.speaker.organization }}</a
                    ></span
                  >
                  <select
                    v-else
                    v-model="val.speaker._id"
                    @change="setSpeaker"
                    class="form-control"
                  >
                    <option
                      v-for="speak in speakers"
                      :key="speak._id"
                      :value="speak._id"
                    >
                      {{ speak.sname }} {{ speak.name }},
                      {{ speak.organization.name }}
                    </option>
                  </select>
                </td>
                <td v-if="val.type === 'introductory'">
                  <span v-if="editTab !== key">{{ val.speaker.name }}</span>
                  <input
                    placeholder="Speaker name"
                    v-else
                    type="text"
                    v-model="val.speaker.name"
                    class="form-control form-control-line input-sm"
                  />
                </td>
                <td v-if="val.type === 'introductory'">
                  <span v-if="editTab !== key">{{ val.speaker.sname }}</span>
                  <input
                    v-else
                    type="text"
                    placeholder="Speaker sname"
                    v-model="val.speaker.sname"
                    class="form-control form-control-line input-sm"
                  />
                </td>
                <td v-if="val.type === 'introductory'">
                  <span v-if="editTab !== key">{{val.speaker.organization}}</span>
                  <input
                    v-else
                    type="text"
                    placeholder="Speaker organization"
                    v-model="val.speaker.organization"
                    class="form-control form-control-line input-sm"
                  />
                </td>
                <td class="text-right">
<!--                  <button type="button" class="btn btn-primary btn-circle" v-if="editTab != key" @click="toDown(val, key)"><i class="fa fa-long-arrow-down"></i> </button>-->
<!--                  <button type="button" class="btn btn-info btn-circle" v-if="editTab != key" @click="toUp(val, key)"><i class="fa fa-long-arrow-up"></i> </button>-->
                  <span
                    v-if="
                        val.type === 'speaker' &&
                        speakersById[val.speaker._id] &&
                        editTab !== key
                    "
                  >
                    <button
                      class="fcbtn btn btn-success btn-outline btn-1d"
                      @click="openRegistration(val.speaker._id)"
                      v-if="speakersById[val.speaker._id].recording_status === 1"
                    >
                      Открыть запись
                    </button>
                    <button
                      class="fcbtn btn btn-warning btn-outline btn-1d"
                      @click="closeRegistration(val.speaker._id)"
                      v-if="speakersById[val.speaker._id].recording_status[`day${day}`] === 2"
                    >
                      Закрыть запись
                    </button>
                    <button
                      class="fcbtn btn btn-primary btn-outline btn-1d"
                      v-if="speakersById[val.speaker._id].recording_status[`day${day}`] === 3"
                    >
                      Запись продолжается
                    </button>
                    <button
                      class="fcbtn btn btn-danger btn-outline btn-1d"
                      v-if="speakersById[val.speaker._id].recording_status[`day${day}`] === 4"
                    >
                      Запись закрыта
                    </button>
                  </span>
<!--                  <span-->
<!--                          v-if="val.type === 'speaker' && editTab !== key"-->
<!--                  >-->
<!--                    <button-->
<!--                            class="fcbtn btn btn-warning btn-outline btn-1d"-->
<!--                    >-->
<!--                      CROC-->
<!--                    </button>-->
<!--                  </span>-->
                  <button
                    type="button"
                    class="btn btn-warning btn-circle"
                    v-if="editTab !== key"
                    @click="editTab = key"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success btn-circle"
                    v-if="editTab === key"
                    @click="save"
                  >
                    <i class="fa fa-check"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-circle"
                    @click="remove(key)"
                  >
                    <i class="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="btn btn-block btn-outline btn-rounded btn-info"
          @click="addBlock"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "schedule",
  data() {
    return {
      day: 1,
      editTab: -1,
      schedule: [],
      speakers: {},
      speakersById: {}
    };
  },
  props: {},
  computed: {},
  watch: {},
  created() {
    this.getSpeakers();
    this.getSchedule();
  },
  methods: {
    openRegistration(speakerId) {
      Request.postJson("/api/admin/meetings/register/open", {
        speakerId,
        day: this.day
      })
        .then(data => {
          swal("Success", "Запись открыта", "success");
          this.getSpeakers();
        })
        .catch(err => {
          swal("Error", err, "error");
        });
    },
    closeRegistration(speakerId) {
      Request.postJson("/api/admin/meetings/register/close", {
        speakerId,
        day: this.day
      })
        .then(data => {
          swal("Success", "Запись закрыта", "success");
          this.getSpeakers();
        })
        .catch(err => {
          swal("Error", err, "error");
        });
    },
    getSpeakers() {
      Request.postJson("/api/user/getSpeakerList").then(data => {
        debugger;
        this.speakers = data;
        this.speakersById = data.byKey("_id");
      });
    },
    getSchedule() {
      return Request.postJson("/api/user/schedule/list").then(data => {
        data.sort((a, b) => {
          return a.time.split(":").join("") - b.time.split(":").join("");
        });
        this.schedule = data;
      });
    },
    addBlock() {
      this.save().then(() => {
        this.schedule.push({
          day: this.day,
          time: "",
          title: "",
          speaker: {
            _id: "",
            name: "",
            sname: "",
            organization: ""
          },
          type: "introductory"
        });
        this.editTab = this.schedule.length - 1;
      });
    },
    remove(id) {
      if (this.schedule[id]._id)
        Request.postJson("/api/admin/schedule/remove", {
          id: this.schedule[id]._id
        })
          .then(data => {
            this.getSchedule();
          })
          .catch(err => {
            console.log(err);
          });

      this.schedule.splice(id, 1);
    },
    save() {
      this.editTab = -1;
      return Request.postJson("/api/admin/schedule/save", {
        schedule: this.schedule
      })
        .then(data => {
          return this.getSchedule();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setSpeaker(val) {
      let sp = this.speakers.find(v => v._id === this.schedule[this.editTab].speaker._id);
      this.schedule[this.editTab].speaker.name = sp.name;
      this.schedule[this.editTab].speaker.sname = sp.sname;
      this.schedule[this.editTab].speaker.organization = sp.organization.name;
    },
    detailSpeak(id) {
      App.Mpage.open({ component: "speaker-detail", data: id });
    },
    toUp(val, key) {
      if (key == 0) return false;
      let time = val.time;
      let temp = this.schedule[key - 1];
      this.schedule[key - 1] = this.schedule[key];
      this.schedule[key] = one.time;
      this.schedule[key] = one;
      this.schedule[key].time = time;
      //this.save()
    },
    toDown(val, key) {
      if (key == this.schedule.filter(v => v.day == this.day).length - 1)
        return false;
      let time = val.time;
      let one = this.schedule[key + 1];
      let two = val;
      this.schedule[key + 1] = val;
      this.schedule[key + 1].time = val.time;
      this.schedule[key] = one;
      this.schedule[key].time = time;
      //this.save()
    }
  },
  beforeDestroy() {},
  components: {}
};
</script>
