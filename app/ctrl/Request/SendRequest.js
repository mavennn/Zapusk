require("../../../app");

module.exports = class extends AbstractCtrl {
  extConstructor() {
    this.body = this.req.body;
    this.user = this.req.User;
    this.speakerId = this.req.body.speakerId;
    this.feedback = this.req.body.feedback;
  }

  //run - запускатьт
  //exect - реализация
  // проверяем открыта ли запись
  // если статус открыта сохраняем заявку со статусом 1 - принята
  // если статус ожидает сохраняем заявку со статусом 1 - принята и добавляем пользователя в список митингов.
  // 		если место в митингах закончилось, то изменяем статус
  // если статус закрыта кидаем фидбэк, сохраняем
  async exect() {
    if (!this.user) return erJson("Not auth");

    if (empty(this.speakerId)) return erJson("Speaker ID?");

    let speaker = await userModel.findOne({ _id: this.speakerId });
    if (empty(speaker)) return erJson("Speaker not found");

    let sched = await scheduleModel.findOne({ "speaker._id": speaker._id });
    this.day = 1; // ВТОРОЙ ДЕНЬ

    let checkMeck = await requestModel.findOne({
      speaker: this.speakerId,
      user: this.user._id,
      day: this.day
    });
    if (checkMeck) return erJson("You have already submitted an application");
    /*
		if (!this.day)
			return erJson('Day?')
*/

    if (speaker.recording_status[`day${this.day}`] == 1) {
      return erJson("fuck");
    }

    if (speaker.recording_status[`day${this.day}`] == 4) {
      if (this.feedback) {
        let params = {
          speaker: this.speakerId,
          user: this.user._id,
          day: this.day,
          status: 3, // 1 - подана, 2 - принята, 3 - отклонена
          feedback: this.feedback
        };
        await requestModel.create(params);
        return suJson("su");
      } else {
        return erJson("feedback");
      }
    }

    if (speaker.recording_status[`day${this.day}`] == 2) {
      return await requestManager.create({
        userId: this.user._id,
        speakerId: this.speakerId,
        day: this.day
      });
    }

    /*
		if (speaker.recording_status[`day${this.day}`] == 3) {
			let meetings = await meetingModel.find({speaker: this.speakerId, day: this.day, status: 0})
			let params = {
				speaker: this.speakerId,
				user: this.user._id,
				day: this.day,
				status: 2, // 1 - подана, 2 - принята, 3 - отклонена
			}
			let req = await requestModel.create(params)
			if (!empty(meetings[0])) {
				meetings[0].user = req.user;
				meetings[0].status = 1;
				await meetings[0].save()
				if (meetings.length == 1) {
					speaker.recording_status[`day${this.day}`] = 4
					await speaker.save()
				}
				return suJson('su')
			}
		}
*/

    if (speaker.recording_status[`day${this.day}`] == 3) {
      let params = {
        speaker: this.speakerId,
        user: this.user._id,
        day: this.day,
        status: 2 // 1 - подана, 2 - принята, 3 - отклонена
      };
      let request = await requestModel.create(params);
      let meetings = await meetingModel.find({
        speaker: this.speakerId,
        day: this.day
      });
      let all_meetings = await meetingModel.find({ day: this.day });
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

        if (time_checked[meetings[kek].time].indexOf(request.user) >= 0) {
          valid = false;
        }

        if (kek < 9)
          if (
            time_checked[
              times_today[times_today.indexOf(meetings[kek].time) + 1]
            ].indexOf(request.user) >= 0
          ) {
            valid = false;
          }

        if (kek >= 1)
          if (
            time_checked[
              times_today[times_today.indexOf(meetings[kek].time) - 1]
            ].indexOf(request.user) >= 0
          ) {
            valid = false;
          }

        if (valid) {
          needKey = kek;
          break;
        }
        console.log("valid", valid);
      }

      if (valid) {
        let req = request;
        meetings[needKey].user = req.user;
        meetings[needKey].status = 1;
        meetings[needKey].rating = req.rating;
        meetings[needKey].user = req.user;
        request.status = 1;
        await req.save();
        await meetings[needKey].save();
        return suJson("su");
      } else {
        return erJson(
          "Sorry, you signed up for the maximum number of appointments"
        );
      }
    }
  }
};
