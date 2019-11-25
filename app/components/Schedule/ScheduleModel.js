require('../../../app');

var Schedule = new Schema({
  day: Number,
  time: String,
  title: String,
  speaker: {
    _id: String,
    name: String,
    sname: String,
    companyName: String
  },
  type: String, //speaker, introductory
  active: Boolean
});

Schedule.statics.createNew = async function({
  day,
  time,
  title,
  speaker,
  type,
  weight
}) {
  try {
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
      type,
      active: true
    };

    const schedule = await scheduleModel.create(params);
    return suJson(scheduleManager.addToCache(schedule));
  } catch (e) {
    console.log(e);
    //log.user_create_error(e.toString());
    return erJson("Server error");
  }
};

AutoInc.create(Schedule, "schedule", "id");
global.scheduleModel = mongoose.model("Schedule", Schedule);
