<template>
    <div>
        <div class="row bg-title">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                <h4 class="page-title">Blocks</h4>
            </div>
            <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                <ol class="breadcrumb">
                    <li><a href="#">Dashboard</a></li>
                    <li class="active">Schedule</li>
                </ol>
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
                            this.getSpeakers();
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
                let sp = this.speakers.find(
                    v => v._id === this.schedule[this.editTab].speaker._id
                );
                this.schedule[this.editTab].speaker.name = sp.name;
                this.schedule[this.editTab].speaker.sname = sp.sname;
                this.schedule[this.editTab].speaker.companyName = sp.companyName;
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
