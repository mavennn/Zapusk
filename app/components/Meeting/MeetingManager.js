global.meetingManager = new (class {
  constructor() {}

  async calc({ day, time_start, speaker }) {
    if (empty(speaker) || empty(time_start)) return erJson("Time? Speaker?");

    let req = await meetingModel.find({ speaker, day });
    if (!empty(req)) {
      req.forEach(val => {
        val.remove();
      });
    }

    let comp = await userModel.findOne({ _id: speaker, permission: "speaker" });
    if (empty(comp)) return erJson("Speaker not found");

    let time_man = [time_start];
    for (let i = 0; i < 9; i++) {
      if (i % 4 || i == 8 || i == 0)
        time_man.push(
          moment(time_man[i], "HH:mm")
            .add(10, "m")
            .format("HH:mm")
        );
      else
        time_man.push(
          moment(time_man[i], "HH:mm")
            .add(15, "m")
            .format("HH:mm")
        );
    }
    let com = [];
    for (let val of time_man) {
      let param = {
        day,
        speaker,
        time: val,
        status: 0
      };
      let c = await meetingModel.create(param);
      com.push(c);
    }

    return suJson(com);
  }

  async setScheduleRecord({ speakerId, day }) {
    let speaker = await userModel.findOne({
      _id: speakerId,
      permission: "speaker"
    });
    if (empty(speaker)) return erJson("Speaker not found");

    if (speaker.recording_status[`day${this.day}`] == 4)
      return erJson("Recording is already close");

    let requests = await requestModel
      .find({ speaker: speakerId, day: day })
      .sort({ rating: -1 });
    let meetings = await meetingModel.find({ speaker: speakerId, day: day });
    let all_meetings = await meetingModel.find({ day: day });
    let time_checked = {};
    all_meetings.map(val => {
      if (!time_checked[val.time]) time_checked[val.time] = [];
      time_checked[val.time].push(val.user || "");
    });
    let times_today = []; // заполнение временного массива
    for (let tt in time_checked) {
      if (tt != "byKey" && tt != "byKeyArr" && tt != "unique") {
        times_today.push(tt);
      }
    }

    let max_it = 10;
    let status;
    if (requests.length >= 10) {
      status = 4;
    } else {
      status = 3;
      max_it = requests.length;
    }
    if (!requests.length) {
      status = 1;
    }
    for (let key in requests) {
      if (key != "byKey" && key != "byKeyArr" && key != "unique") {
        let needKey;
        let valid = true;
        for (let kek = 0; kek < 10; kek++) {
          valid = true;
          if (empty(meetings[kek])) {
            valid = false;
          }

          if (meetings[kek].status == 1) {
            valid = false;
          }

          if (
            time_checked[meetings[kek].time].indexOf(requests[key].user) >= 0
          ) {
            valid = false;
          }

          if (kek < 9)
            if (
              time_checked[
                times_today[times_today.indexOf(meetings[kek].time) + 1]
              ].indexOf(requests[key].user) >= 0
            ) {
              valid = false;
            }

          if (kek >= 1)
            if (
              time_checked[
                times_today[times_today.indexOf(meetings[kek].time) - 1]
              ].indexOf(requests[key].user) >= 0
            ) {
              valid = false;
            }

          if (valid) {
            needKey = kek;
            break;
          }
        }

        if (valid) {
          let req = requests[key];
          meetings[needKey].user = req.user;
          meetings[needKey].status = 1;
          meetings[needKey].rating = req.rating;
          meetings[needKey].user = req.user;
          req.status = 1;
          await req.save();
          await meetings[needKey].save();
        }
      }
    }

    speaker.recording_status[`day${day}`] = status;
    let resp = await speaker.save();
    console.log("status", resp);
    return suJson("su");
  }
})();
