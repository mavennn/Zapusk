global.scheduleManager = new (class {
  constructor() {
    this.schedule = [];
    this.scheduleById = {};
  }

  addToCache(schedule) {
    this.schedule[schedule.weight] = schedule;
    this.scheduleById[schedule._id] = schedule;
    return schedule;
  }

  async saveMany(data) {
    console.log("data", data);

    if (!data.length) return erJson("Empty");

    for (let val of data) {
      if (val._id) {
        let sch = await scheduleModel.findOne({ _id: val._id });
        console.log("id", sch);
        if (sch) {
          sch.time = val.time;
          sch.title = val.title;
          sch.speaker = val.speaker;
          sch.type = val.type;
          await sch.save();
        }
      } else {
        let params = {
          day: val.day,
          time: val.time,
          title: val.title,
          speaker: {
            _id: val.speaker._id,
            name: val.speaker.name,
            sname: val.speaker.sname,
            organization: val.speaker.organization
          },
          type: val.type
        };

        await this.create(params);
      }
    }

    return suJson("su");
  }

  async removeItem(id) {
    let sch = await scheduleModel.findOne({ _id: id });
    let sp = await userModel.findOne({ _id: sch.speaker._id });

    if (empty(sp)) return erJson("Speaker not found");

    sp.recording_status = 1;
    let resp = await sp.save();
    console.log("resp", resp);
    if (!sch) return erJson("Not found");
    await sch.remove();
    return suJson("su");
  }

  async create({ day, time, title, speaker, type }) {
    if (empty(day) || day > 2 || day < 0) return erJson("Day?");

    if (empty(time)) return erJson("Time?");

    if (empty(title)) return erJson("Title?");

    if (empty(type) || (type != "speaker" && type != "introductory"))
      return erJson("Type?");

    if (type == "speaker" && !empty(speaker._id)) {
      speaker = await userModel.findOne({
        _id: speaker._id,
        permission: "speaker"
      });
      if (empty(speaker)) return erJson("Speaker not found");
    }

    let params = {
      day,
      time,
      title,
      speaker: {
        _id: speaker._id,
        name: speaker.name,
        sname: speaker.sname,
        companyName: speaker.companyName
      },
      type
    };

    const schedule = await scheduleModel.createNew(params);

    if (empty(schedule)) return erJson("Error with create");

    return suJson(this.addToCache(schedule));
  }

  async remove(id) {
    if (empty(id)) return erJson("Id?");

    await scheduleModel.remove({ _id: id });

    return suJson("sut");
  }
})();
