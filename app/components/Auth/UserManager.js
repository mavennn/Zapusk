require('../../../app');

var xlsx = require("node-xlsx");
global.UserManager = new (class {
  constructor() {
    this.arUsers = {};
    this.Users = {};
    this.UsersByID = {};
    this.arPermissionR = {
      admin: 4,
      manager: 3,
      region_manager: 2,
      content: 1
    };
    this.speakersFile = `${rootPath}/file/speakers.xls`;
    this.userFile = `${rootPath}/file/users.xls`;
  }

  async init() {
    this.arUsers = await userModel.find();
    this.Users = this.arUsers.byKey("token");
    this.UsersByID = this.arUsers.byKey("_id");
  }

  addToCache(User) {
    this.Users[User.token] = User;
    this.UsersByID[User.id] = User;
    return User;
  }

  async loadSpeakers() {
    var file = xlsx.parse(this.speakersFile)[0].data; // парсим 1ый лист
    if (!file[0]) {
      return erJson("Нечитаемый файл");
    }

    file.splice(0, 1)[0];
    for (let item of file) {
      if (item[1]) {
        let password = genPass("number", 4);
        let user = {
          ids: await userModel.genToken(),
          email: item[8],
          name: item[1],
          sname: item[2],
          prefname: item[2],
          country: (tagsManager.country.filter(v => v.name === item[3])[0] || {})
            ._id,
          city: item[4],
          phone: item[9],
          prefix: item[0],
          photo: item[12]
            ? "https://getfile.dokpub.com/yandex/get/" + item[12]
            : "",
          presentation: {
            subject: item[10],
            link: item[11]
          },
          organization: {
            name: item[5],
            position: item[6],
            role: item[7]
          },
          password,
          pin: password,
          token: genToken(),
          permission: "speaker",
          active: true,
          recording_status: {
            day1: 1,
            day2: 1
          }
        };
        console.log("user", user);
        let ch = await this.checkUsers(user.email);
        if (!ch) {
          let us = await userModel.create(user);
          this.addToCache(us);
          console.log(us);
        } else {
          console.log("Уже создан");
          ch.country = tagsManager.country.filter(
            v => v.name === item[4]
          )[0]._id;
          ch.photo = item[12]
            ? "https://getfile.dokpub.com/yandex/get/" + item[12]
            : "";
          await ch.save();
          this.addToCache(ch);
        }
      }
    }
  }

  async loadUsers() {
    var file = xlsx.parse(this.userFile)[0].data; // парсим 1ый лист
    if (!file[0]) {
      return erJson("Нечитаемый файл");
    }

    file.splice(0, 1)[0];
    for (let item of file) {
      if (item[2]) {
        let password = genPass("number", 4);
        let user = {
          ids: await userModel.genToken(),
          prefix: item[1],
          name: item[2],
          prefname: item[2],
          sname: item[3],
          country: (tagsManager.country.filter(v => v.name === item[4])[0] || {})
            ._id,
          city: item[5],
          organization: {
            name: item[6],
            position: item[7],
            role: (tagsManager.country.filter(v => v.name === item[8])[0] || {})
              ._id
          },
          email: item[9],
          phone: item[10],
          password,
          pin: password,
          token: genToken(),
          permission: "user",
          active: true
        };
        let ch = await this.checkUsers(user.email);
        if (!ch) {
          let us = await userModel.create(user);
          this.addToCache(us);
          console.log(us);
        } else {
          console.log("Уже создан");
          ch.country = tagsManager.country.filter(
            v => v.name === item[4]
          )[0]._id;
          ch.photo = item[12]
            ? "https://getfile.dokpub.com/yandex/get/" + item[12]
            : "";
          await ch.save();
          this.addToCache(ch);
        }
      }
    }
  }

  async checkUsers(email) {
    if (empty(email)) return false;
    let user = await userModel.findOne({ email });
    if (!empty(user)) return user;
    else return false;
  }

  async checkToken(token) {
    if (empty(token)) return erJson("invalid_token");

    if (this.Users[token] !== undefined) return suJson(this.Users[token]);
    let User = await userModel.findOne({ token: token });
    if (empty(User)) return erJson("invalid_token");
    return suJson(this.addToCache(User));
  }

  async checkAdmin(token) {
    if (empty(token)) return erJson("invalid_token");

    if (this.Users[token] !== undefined)
      if (this.Users[token].permission === "admin")
        return suJson(this.Users[token]);

    let User = await userModel.findOne({ token: token });

    if (User.permission !== "admin") return erJson("invalid_token");
    return suJson(this.addToCache(User));
  }

  async auth(ids, password) {
    if (empty(ids)) return erJson("Enter email");

    if (empty(password)) return erJson("Enter password");

    let User = await userModel.findOne({ ids });

    if (empty(User)) return erJson("User not found");

    if (!User.auth(password)) return erJson("Wrong password");

    if (!User.active)
      return erJson("Unfortunately, your account has been deactivated.");

    return suJson(this.addToCache(User).forAdmin());
  }

  async authCrmAdmin(email, password) {
    if (empty(email)) return erJson("Enter email");

    if (empty(password)) return erJson("Enter password");

    let User = await userModel.findOne({ email });
    if (empty(User)) return erJson("User not found");

    if (User.permission != "admin") return erJson("LoL");

    if (!User.auth(password)) return erJson("Wrong password");

    if (!User.active)
      return erJson("Unfortunately, your account has been deactivated.");

    return suJson(this.addToCache(User).forAdmin());
  }

  async adminAuth(email, muser) {
    if (empty(email)) return erJson("Введите email");

    let emailAns = userModel.validEmail(email);
    if (!isJson(emailAns)) return emailAns;

    email = email.toLowerCase();

    if (muser.permission != "admin") return erJson("Ну перестань");

    let User = await userModel.findOne({ email });

    if (empty(User)) return erJson("Неверный email");

    if (!User.active)
      return erJson("К великому сожалению, данный аккаунт деактивирован.");

    return suJson(this.addToCache(User).forAdmin());
  }

  async registration(arUser) {
    let data = await userModel.regUser(arUser);
    if (!isJson(data)) return data;
    let User = ans(data);
    await this.sendLoginData(User);
    return suJson(this.addToCache(User).forAdmin());
  }

  async edit(id, arUser) {
    //5d5c2a0a4832b09f306441b4

    if (empty(id)) return erJson("User not found");

    let user = await userModel.findOne({ _id: id });

    user.name = arUser.name || user.name;
    user.sname = arUser.sname || user.sname;
    user.prefname = arUser.prefname || user.prefname;
    user.country = arUser.country || user.country;
    user.city = arUser.city || user.city;
    user.prefix = arUser.prefix || user.prefix;
    user.photo = arUser.photo || user.photo;

    if (!empty(arUser.wsrProducts)) user.wsrProducts = arUser.wsrProducts;

    if (!empty(arUser.presentation)) {
      user.presentation = {
        subject: arUser.presentation.subject,
        link: arUser.presentation.link
      };
    }
    if (!empty(arUser.organization)) {
      user.organization = {
        name: arUser.organization.name,
        position: arUser.organization.position,
        role: arUser.organization.role,
        problems: arUser.organization.problems,
        perspectives: arUser.organization.perspectives,
        barriers: arUser.organization.barriers
      };
    }
    if (!empty(arUser.partnership)) {
      user.partnership = {
        country: arUser.partnership.country,
        partnershipMode: arUser.partnership.partnershipMode,
        bestPractice: arUser.partnership.bestPractice,
        industry: arUser.partnership.industry,
        role: arUser.partnership.role
      };
    }
    await user.save();
    this.addToCache(user);
    return suJson("su");
  }

  async add(arUser) {
    //5d5c2a0a4832b09f306441b4

    let user = {};

    let password = genPass("number", 4);
    user.ids = await userModel.genToken();
    user.password = password;
    user.pin = password;
    user.token = genToken();
    user.permission = arUser.permission;
    user.active = true;
    user.name = arUser.name || "";
    user.sname = arUser.sname || "";
    user.prefname = arUser.prefname || "";
    user.country = arUser.country || "";
    user.city = arUser.city || "";
    user.prefix = arUser.prefix || "";
    user.photo = arUser.photo || "";

    if (!empty(arUser.wsrProducts)) user.wsrProducts = arUser.wsrProducts;

    if (!empty(arUser.presentation)) {
      user.presentation = {
        subject: arUser.presentation.subject,
        link: arUser.presentation.link
      };
    }
    if (!empty(arUser.organization)) {
      user.organization = {
        name: arUser.organization.name,
        position: arUser.organization.position,
        role: arUser.organization.role,
        problems: arUser.organization.problems,
        perspectives: arUser.organization.perspectives,
        barriers: arUser.organization.barriers
      };
    }
    if (!empty(arUser.partnership)) {
      user.partnership = {
        country: arUser.partnership.country,
        partnershipMode: arUser.partnership.partnershipMode,
        bestPractice: arUser.partnership.bestPractice,
        industry: arUser.partnership.industry,
        role: arUser.partnership.role
      };
    }

    await userModel.create(user);
    this.addToCache(user);

    await this.sendLoginData(user);

    return suJson("su");
  }

  async sendLoginData(user) {
    if (!user.email) return false;
    this.tmplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
			<meta name="viewport" content="width=device-width" />
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title></title>
			</head>
			<body style="margin:0px; background: #f8f8f8; ">
			<div width="100%" style="background: #f8f8f8; padding: 0px 0px; font-family:arial; line-height:28px; height:100%;  width: 100%; color: #514d6a;">
			<div style="max-width: 700px;  margin: 0px auto; font-size: 14px">
				<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
				</table>
				<div style="padding: 40px; background: #fff;">
				<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
					<tbody>
					<tr>
						<td><b>Dear, ${user.name}</b>
						<p>Your login details:</p>
						<p><b>Login:</b> ${user.ids}</p> 
						<p><b>PIN:</b> ${user.pin}</p>
					</td>
					</tr>
					</tbody>
				</table>
				</div>
			</div>
			</div>
			</body>
			</html>`;
    await Mail.send({ to: user.email, html: this.tmplate });
  }

  async getById(id) {
    if (empty(id)) return false;

    let params;
    if (String(id).length > 6) {
      params = { _id: id };
    } else {
      params = { id };
    }

    let User = await userModel.findOne(params);
    if (empty(User)) return false;

    return this.addToCache(User);
  }

  async passwordRecovery(email) {
    if (empty(email)) return erJson("Не указан email");

    let valem = userModel.validEmail(email);

    if (!isJson(valem)) return valem;

    let User = await userModel.findOne({ email });
    if (empty(User)) return erJson("Пользователь не найден");

    let token = await passRecoveryModel.createToken(User._id);

    if (!isJson(token)) return token;
    else token = ans(token);

    let arPost = {
      to: email,
      html: `<div>Ссылка для восстановления пароля: https://${config.get(
        "host.url"
      )}/recovery/${token}</div>`
    };

    let data = Mail.send(arPost);

    //let data = await postJson(url.noti("/mod/email/send/"),arPost);

    return suJson("Ссылка для восстановления выслана на ваш email");
  }

  async changePassword(token, newpass) {
    let checktok = await passRecoveryModel.checkToken(token);

    if (!isJson(checktok)) return checktok;

    checktok = ans(checktok);

    if (empty(newpass)) return erJson("Не указан пароль");

    let user = await userModel.findOne({ _id: checktok.user_id });

    if (empty(user)) return erJson("Тех ошибка");

    let us = await user.changePass(newpass);

    if (!isJson(us)) return us;

    checktok.active = false;
    checktok.save();

    return suJson("Пароль успешно изменен");
  }

  async getSpeakersShort() {
    let speakers = await userModel.find({ permission: "speaker" });
    speakers = speakers.map(val => {
      let cntr = tagsManager.country.filter(v => v._id == val.country);
      const countryName = cntr.length > 0 ? cntr[0].name : "";
      return {
        _id: val._id,
        name: val.name,
        sname: val.sname,
        organization: val.organization,
        countryName,
        photo: val.photo,
        recording_status: val.recording_status,
        permission: val.permission
      };
    });
    return speakers;
  }

  async setHiddenTags({ userId, tagsId }) {
    if (empty(userId) || empty(tagsId))
      return erJson("User id and tags id is req");

    let user = await userModel.findOne({ _id: userId });
    if (empty(user)) return erJson("User not found");

    let tags = await tagsModel.findOne({ _id: tagsId });
    if (empty(tags)) return erJson("Tags not found");

    if (empty(user.hidden_tags)) user.hidden_tags = [];

    user.hidden_tags.push(tags._id);

    await user.save();

    return suJson("su");
  }

  async getUserList() {
    let users = await userModel.find({ permission: "user" });

    return users.map(val => {
      return val.forClient();
    });
  }
})();
