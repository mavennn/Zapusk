module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.user = this.req.User;
    this.body = this.req.body;
  }

  //run - запускатьт
  //exect - реализация

  async exect() {
    if (!this.user) return erJson("n");

    if (this.user.permission != "admin") return erJson("no");

    // количество участников всего
    let count_users = await userModel.count();
    let count_meetings = await meetingModel.count({ status: "1" });
    let count_request = await requestModel.count();

    let speakers = await userModel.find({ permission: "speaker" }).lean();
    let speakersById = speakers.byKey("_id");
    let meetings = await meetingModel.find({ status: "1" }).lean();
    let meetingsById = meetings.byKey("_id");
    let requests = await requestModel.find({}).lean();
    let reqById = requests.byKey("_id");
    let users = await userModel.find({ permission: "user" }).lean();
    users = users.byKey("_id");

    let usersids = [];

    /*
		speakers = speakers.map(val => {
			if (!val.meetings)
				val.meetings = []
			val.meetings.push(meetingsById[val.speaker])
		})
*/

    meetings.map(val => {
      if (!speakersById[val.speaker].meetings)
        speakersById[val.speaker].meetings = [];
    });
    requests.map(val => {
      if (empty(speakersById[val.speaker].requests))
        speakersById[val.speaker].requests = [];

      speakersById[val.speaker].requests.push(val);
    });

    requests.map(val => {
      // проверка, есть ли митинг
    });
    let users_not_in = [];
    for (let val of requests) {
      if (!empty(val.user) && !empty(val.speaker)) {
        let meet = await meetingModel.findOne({
          user: val.user,
          speaker: val.speaker
        });
        if (empty(meet)) {
          let usni = users[val.user];
          usni.speaker =
            speakersById[val.speaker].name +
            " " +
            speakersById[val.speaker].sname;
          console.log(usni.speaker);
          users_not_in.push(usni);
        }
      }
    }

    console.log(users_not_in);

    let tags = tagsManager.tagsById;

    return suJson({
      speakersById,
      speakers,
      count_users,
      count_meetings,
      users,
      tags,
      users_not_in
    });
  }
};
