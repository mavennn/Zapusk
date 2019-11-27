global.requestManager = new (class {
  constructor() {}

  async create({ userId, speakerId, day }) {

    if (empty(userId)) return erJson("Auth?");

    if (empty(speakerId)) return erJson("Speaker?");

    let checked = await requestModel.findOne({
      speaker: speakerId,
      user: userId,
      day
    });
    if (!empty(checked)) return erJson("You have already submitted a request");

    let user = await userModel.findOne({
      _id: userId,
      permission: ["user", "admin"]
    });

    if (empty(user)) return erJson("Auth not found");

    let speaker = await userModel.findOne({
      _id: speakerId,
      permission: "speaker"
    });

    if (empty(speaker)) return erJson("Speaker not found");

    let rating = 0;

    // if (!empty(speaker.hardSkills) && speaker.partnership.country.length) {
    //   if (speaker.partnership.country.indexOf(user.country) >= 0) {
    //     const tag = tagsManager.getTagById(user.country);
    //     rating = rating + tag.weight;
    //   }
    // }

    // if (
    //   !empty(speaker.partnership) &&
    //   speaker.partnership.role.length &&
    //   !empty(user.organization)
    // ) {
    //   if (speaker.partnership.role.indexOf(user.organization.role) >= 0) {
    //     const tag = tagsManager.getTagById(user.organization.role);
    //     rating = rating + tag.weight;
    //   }
    // }

    // if (
    //   !empty(speaker.partnership) &&
    //   speaker.partnership.partnershipMode.length &&
    //   user.partnership.partnershipMode.length
    // ) {
    //   speaker.partnership.partnershipMode.map(val => {
    //     if (user.partnership.partnershipMode.indexOf(val) >= 0) {
    //       const tag = tagsManager.getTagById(val);
    //       rating = rating + tag.weight;
    //     }
    //   });
    // }


    //requestManager.create({userId: '5d5c2a0a4832b09f306441b4', speakerId: '', 1})
    // if (
    //   !empty(speaker.partnership) &&
    //   speaker.partnership.industry.length &&
    //   user.partnership.industry.length
    // ) {
    //   speaker.partnership.industry.map(val => {
    //     if (user.partnership.industry.indexOf(val) >= 0) {
    //       const tag = tagsManager.getTagById(val);
    //       rating = rating + tag.weight;
    //     }
    //   });
    // }

    // if (
    //   !empty(speaker.bestPractice) &&
    //   speaker.partnership.bestPractice.length &&
    //   user.partnership.bestPractice.length
    // ) {
    //   speaker.partnership.bestPractice.map(val => {
    //     if (user.partnership.bestPractice.indexOf(val) >= 0) {
    //       const tag = tagsManager.getTagById(val);
    //       rating = rating + tag.weight;
    //     }
    //   });
    // }

    let speakerTags = speaker.hardSkills.concat(speaker.softSkills);
    let userTags = user.hardSkills.concat(user.softSkills);


    // это нужная реализация

    // if (speaker.wsrProducts.length && user.wsrProducts.length) {
    //   speaker.wsrProducts.map(val => {
    //     if (user.wsrProducts.indexOf(val) >= 0) {
    //       const tag = tagsManager.getTagById(val);
    //       rating = rating + tag.weight;
    //     }
    //   });
    // }


    // проставляются рейтинги тегам
    // если у спикера и юзера есть одинаковые теги, этому тегу + 1 к рейтингу
    if (speakerTags.length && userTags.length) {
      speakerTags.map(val => {
        if (userTags.indexOf(val) >= 0) {
          const tag = tagsManager.getTagById(val);
          rating = rating + tag.weight;
        }
      });
    }

    // if (speaker.hidden_tags.indexOf(user.country) >= 0) {
    //   rating = rating + 3;
    // }

    let params = {
      speaker: speakerId,
      user: userId,
      day,
      rating,
      status: 1
    };

    if (speaker.recording_status == 4) {
      params.status = 3;
    }


    // создается заявка
    return suJson(await requestModel.create(params));
  }
})();
