require("../../../app");
require("../../libs/autoincrement");

// var User = new Schema({
//   ids: Number,
//   email: String,
//   name: String,
//   sname: String,
//   prefname: String,
//   country: String,
//   city: String,
//   phone: String,
//   prefix: String,
//   photo: String,
//   presentation: {
//     subject: String,
//     link: String
//   },
//   organization: {
//     name: String,
//     position: String,
//     role: String,
//     problems: String,
//     perspectives: String,
//     barriers: String
//   },
//   partnership: {
//     country: [], // max - 3
//     partnershipMode: [], // max - 3
//     bestPractice: [],
//     industry: [], // max - 3
//     role: [] // max - 3
//   },
//   wsrProducts: [],
//   hardSkills: [],
//   softSkills: [],
//   token: String,
//   pin: String,
//   hashed_password: String,
//   hidden_tags: [],
//   salt: String,
//   permission: String, // admin, user, speaker
//   active: Boolean,
//   recording_status: {
//     day1: Number, // 0 - nothing, 1 - ready to open, 2 - open, 3 - waiting, 4 - close
//     day2: Number // 0 - nothing, 1 - ready to open, 2 - open, 3 - waiting, 4 - close
//   }
// });

var User = new Schema({

  /* общие поля */
  ids: Number,
  name: String,
  sname: String,
  email: String,
  phone: String,
  photo: String,
  hardSkills: [],
  softSkills: [],
  token: String,
  pin: String,
  hashed_password: String,
  hidden_tags: [],
  salt: String,
  permission: String, // admin, user, speaker
  active: Boolean,
  prefname: String,
  country: String,
  city: String,
  prefix: String,

  /* поля юзера */
  birthday: String,
  university: String,
  speciality: String,
  endingYear: String,
  questionsForUser: {
    digital: String,
    english: String,
    anotherLanguage: String,
    isHackaton: String,
    isWorldSkills: String,
    courses: String,
    enoughMoney: String,
    achievements: String,
    isWorking: String
  },

  /* поля спикера */
  companyName: String,
  companyUrl: String,
  vacanciesUrl: String,
  businessSphere: String,
  questionsForSpeaker: {
    yourProduct: String,
    companyTasks: String,
    positions: String,
    candidatsTasks: String,
    intership: String,
  },
  block: Number,
  recording_status: Number,
});


User.statics.validEmail = function(email) {
  var pattern = /^([a-z0-9_\.-])+@[a-z0-9]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
  if (!pattern.test(email)) return erJson("Email не верен");
  return suJson("su");
};

User.methods.makeSalt = function() {
  return Math.round(new Date().valueOf() * Math.random()) + "";
};

User.methods.encryptPassword = function(password) {
  return crypto
    .createHmac("sha1", this.salt)
    .update(String(password))
    .digest("hex");
};

User.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

User.methods.auth = function(plainText) {
  if (this.active !== true) return false;
  return this.encryptPassword(plainText) === this.hashed_password;
};

User.statics.genToken = async function() {
  let ids = genPass("number", 4);
  let user = await userModel.findOne({ ids });
  if (empty(user)) {
    return Number(ids);
  } else {
    return await this.genToken();
  }
};

User.statics.regUser = async function({ name, sname, email, password, phone }) {
  try {
    if (empty(name)) return erJson("Enter your name");

    if (empty(password)) password = genPass("number", 4);

    if (empty(email)) return erJson("Please enter your email");

    let ids = await this.genToken();
    let validEm = this.validEmail(email);
    if (!isJson(validEm)) return validEm;

    email = email.toLowerCase();

    let userFounded = await userModel.findOne({ email });
    if (!empty(userFounded))
      return erJson("This email is already taken. Contact administrators");

    let params = {
      ids,
      email,
      name,
      sname,
      phone,
      token: genToken(),
      password,
      pin: password,
      permission: "user", // admin, user
      active: true
    };

    let User = await userModel.create(params);
    return suJson(UserManager.addToCache(User));
  } catch (e) {
    console.log(e);
    //log.user_create_error(e.toString());
    return erJson("Server error");
  }
};

User.methods.setPassword = async function(password) {
  if (empty(password)) return erJson("Password?");
  this.password = password;
  await this.save();
  return suJson("Password changed successfully");
};

User.methods.changePass = async function(pass) {
  let dataPass = await this.setPassword(pass);
  if (!isJson(dataPass)) return dataPass;

  return dataPass;
};

User.methods.forClient = function() {
  return {
    id: this.id,
    _id: this._id,
    name: this.name,
    sname: this.sname,
    email: this.email,
    email: this.email,
    country: this.country, //
    city: this.city, //
    phone: this.phone,
    prefix: this.prefix, //
    photo: this.photo, //
    hardSkills: this.hardSkills,
    softSkills: this.softSkills,
    permission: this.permission, //
    active: this.active,

    /* user */
    birthday: this.birthday,
    university: this.university,
    speciality: this.speciality,
    endingYear: this.endingYear,
    questionsForUser: {
      digital: this.questionsForUser.digital,
      english: this.questionsForUser.english,
      anotherLanguage: this.questionsForUser.anotherLanguage,
      isHackaton: this.questionsForUser.isHackaton,
      isWorldSkills: this.questionsForUser.isWorldSkills,
      courses: this.questionsForUser.courses,
      enoughMoney: this.questionsForUser.enoughMoney,
      achievements: this.questionsForUser.achievements,
      isWorking: this.questionsForUser.isWorking,
    },

    /* speaker */
    companyName: this.companyName,
    companyUrl: this.companyUrl,
    vacanciesUrl: this.vacanciesUrl,
    businessSphere: this.businessSphere,
    questionsForSpeaker: {
      yourProduct: this.questionsForSpeaker.yourProduct,
      companyTasks: this.questionsForSpeaker.companyTasks,
      positions: this.questionsForSpeaker.positions,
      candidatsTasks: this.questionsForSpeaker.candidatsTasks,
      intership: this.questionsForSpeaker.intership,
    },
    recording_status: this.recording_status,
  };
};

User.methods.forAdmin = function() {
  return {
    id: this.id,
    ids: this.ids,
    _id: this._id,
    name: this.name,
    sname: this.sname,
    token: this.token,
    email: this.email,
    phone: this.phone,
    permission: this.permission,
    active: this.active
  };
};

AutoInc.create(User, "users", "id");
global.userModel = mongoose.model("users", User);
