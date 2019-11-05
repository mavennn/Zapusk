var User = new Schema({
  ids: Number,
  email: String,
  name: String,
  sname: String,
  prefname: String,
  country: String,
  city: String,
  phone: String,
  prefix: String,
  photo: String,
  presentation: {
    subject: String,
    link: String
  },
  organization: {
    name: String,
    position: String,
    role: String,
    problems: String,
    perspectives: String,
    barriers: String
  },
  partnership: {
    country: [], // max - 3
    partnershipMode: [], // max - 3
    bestPractice: [],
    industry: [], // max - 3
    role: [] // max - 3
  },
  wsrProducts: [],
  token: String,
  pin: String,
  hashed_password: String,
  hidden_tags: [],
  salt: String,
  permission: String, //admin, user, speaker
  active: Boolean,
  recording_status: {
    day1: Number, // 0 - nothing, 1 - ready to open, 2 - open, 3 - waiting, 4 - close
    day2: Number // 0 - nothing, 1 - ready to open, 2 - open, 3 - waiting, 4 - close
  }
});

User.statics.validEmail = function(email) {
  var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
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
    validEm = this.validEmail(email);
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
      permission: "user", //admin, user
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
    prefname: this.prefname,
    email: this.email,
    country: this.country,
    city: this.city,
    phone: this.phone,
    prefix: this.prefix,
    photo: this.photo,
    presentation: this.presentation,
    organization: this.organization,
    partnership: this.partnership,
    wsrProducts: this.wsrProducts,
    email: this.email,
    permission: this.permission,
    active: this.active,
    recording_status: this.recording_status
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
