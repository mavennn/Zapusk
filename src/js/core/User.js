export default new (class {
  constructor() {
    this.isAuth = false;
    this.basketToken;
    this.arUser;
    this.token;
    this.userRegion;
    this.arPermission = {
      speaker: "Speaker",
      admin: "Admin",
      user: "User"
    };
    this.AddUserResolve;
  }

  init() {
    console.log("init");
    return this.GetFromLocalStorage();
  }

  GetFromLocalStorage() {
    try {
      let UserProps = parseJson(localStorageProxy.getItem("user"));
      this.token = cookieParse()["token"];
      if (!empty(UserProps)) {
        this.arUser = UserProps;
        this.isAuth = true;
        return Promise.resolve();
      }
      if (!empty(token)) return this.getUser(token);
      return Promise.resolve();
    } catch (e) {
      return Promise.resolve(e);
    }
  }

  getUser(token) {
    if (empty(token)) return Promise.resolve();
    this.arUser = { token };
    return Request.getJson("/api/user/get")
      .then(({ user, region }) => {
        this.arUser = {
          name: user.name,
          sname: user.sname,
          email: user.email,
          permission: user.permission,
          ids: user.ids,
          id: user.id,
          _id: user._id,
          token: user.token
        };
        this.isAuth = true;
        this.setUserToLocalStorage();
      })
      .catch(data => {
        this.arUser = {};
        return Promise.reject();
      });
  }

  regInApp(arUser) {
    this.isAuth = true;
    this.arUser = arUser;
    this.setUserToLocalStorage();
    console.log(this.arUser["token"]);
    Cookies.set("token", this.arUser["token"]);
    location.href = "/";
  }

  createInApp(arUser) {
    this.isAuth = true;
    this.arUser = arUser;
    this.setUserToLocalStorage();
    console.log(this.arUser["token"]);
    Cookies.set("token", this.arUser["token"]);
  }

  setUserToLocalStorage() {
    localStorageProxy.removeItem("user");
    localStorageProxy.setItem("user", toJson(this.arUser));
  }

  login(login, password) {
    if (empty(login)) return swal("Error", "Enter Email", "error");

    if (empty(password)) return swal("Error", "Enter password", "error");

    Load.start();
    return Request.postJson("/api/auth", { login, password }, false, true)
      .then(data => {
        Load.stop();
        this.regInApp(data);
        return suJson();
      })
      .catch(data => {
        swal("Error", data, "error");
        Load.stop();
        return erJson();
      });
  }

  forgot(email) {
    if (empty(email)) return swal("Error", "Enter Email", "error");

    Load.start();
    Request.postJson("/api/forgot", { email }, false, true)
      .then(data => {
        swal("Success", data, "success").then(() => {
          return (location.href = "/");
        });
      })
      .catch(data => {
        swal("Error", data, "error");
        Load.stop();
        return;
      });
  }

  changePass(token, pass) {
    if (empty(token)) return swal("Ошибка", "Введите токен", "error");

    Load.start();
    return Request.postJson("/api/changepass", { token, pass }, false, true)
      .then(data => {
        return (location.href = "/");
      })
      .catch(data => {
        swal("Ошибка", data, "error");
        Load.stop();
        return;
      });
  }

  logout() {
    this.isAuth = false;
    this.arUser = Array();
    localStorageProxy.removeItem("user");
    Cookies.set("token", "");
    location.href = "/";
  }

  getName() {
    return this.arUser.name;
  }

  getSname() {
    return this.arUser.sname;
  }

  getID() {
    return this.arUser.ids;
  }

  getEmail() {
    return this.arUser.email;
  }

  getToken() {
    return this.token;
  }

  getPermission() {
    return this.arUser.permission;
  }

  isAdmin() {
    return Boolean(this.arUser.permission == "admin");
  }

  isSpeaker() {
    return Boolean(this.arUser.permission == "speaker");
  }

  getUserList(
    page = false,
    lPage = false,
    search = false,
    active_role = false
  ) {
    var arPost = {
      arFilter: {},
      lPage: lPage,
      page: page,
      region: App.User.region
    };
    if (search) arPost.arFilter.search = search;

    if (active_role) {
      arPost.arFilter.permission = active_role;
    }

    Load.start();
    return Request.postJson("/api/user/user-list", arPost)
      .then(data => {
        Load.stop();
        return data;
      })
      .catch(this.requestError);
  }

  formatPhone(phone) {
    if (phone.substr(0, 3) == "+7 ") phone = phone.substr(3);

    phone = phone.replace(/\D+/g, "");
    let phoneStr = "+7 ";
    phone = phone.split("");
    phone.forEach(function(val, key) {
      switch (key) {
        case 0:
          phoneStr += "(";
          break;
        case 3:
          phoneStr += ") ";
          break;
        case 6:
          phoneStr += " - ";
          break;
      }
      if (key > 9) return;
      phoneStr += val;
    });
    return phoneStr;
  }
  validEmail(email) {
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    if (!pattern.test(email)) return false;
    else return true;
  }
  createUser(User) {
    if (
      empty(User.name) ||
      empty(User.sname) ||
      empty(User.email) ||
      empty(User.password)
    )
      return Promise.reject("Fill in all the fields.");

    let arUser = {
      name: User.name,
      sname: User.sname,
      email: User.email,
      phone: User.phone,
      password: User.password
    };

    return Request.postJson("/api/reg", arUser, false, true)
      .then(data => {
        Load.stop();
        this.createInApp(data);
        return data;
      })
      .catch(requestError);
  }

  getTags() {
    return Request.post("/api/user/tags/get")
      .then(data => {
        Load.stop();
        return data;
      })
      .catch(requestError);
  }

  editProfile(User) {
    if (empty(User.name) || empty(User.sname) || empty(User.email)) {
      return Promise.reject("Fill in all the fields.");
    }
    return Request.postJson("/api/user/edit", User, false, true)
      .then(data => {
        Load.stop();
        return data;
      })
      .catch(requestError);
  }

  getUserInfo() {
    return Request.getJson("/api/user/get")
      .then(data => {
        Load.stop();
        return data;
      })
      .catch(requestError);
  }
  getUserById(id) {
    return Request.postJson("/api/user/getbyid", { id: id }, false, true)
      .then(data => {
        Load.stop();
        return data;
      })
      .catch(requestError);
  }
  getSchedulle() {
    return Request.post("/api/user/schedule/list", {}, false, true)
      .then(data => {
        console.log(data);
        Load.stop();
        return ans(data);
      })
      .catch(requestError);
  }
})();
