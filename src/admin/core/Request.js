import LostConnection from "@Components/LostConnection.vue";

global.Request = new (class {
  constructor() {
    this.url = {
      base: url => Config.url("base", url),
      front: url => Config.url("front", url)
    };

    this.LCActive = false; // LC - LostConnection
    this.LCVue;
    this.LCPromice;
    this.LCResolve;
    this.oldMode = false;

    if (!global.Headers) this.oldMode = true;
  }

  postJson(url, arData = {}, params = false, no_token = false) {
    return new Promise((resolve, reject) => {
      this.post(url, arData, params, no_token).then(data => {
        if (!(data instanceof Object)) {
          data = parseJson(data);
          if (!data)
            return reject(
              "Неверный ответ сервера. Обратитесь к тех поддержке."
            );
        }
        if (isJson(data)) return resolve(ans(data));
        return reject(ans(data));
      });
    });
  }

  post(url, arData = {}, params = false, no_token = false, count = 0) {
    let Prom;
    if (this.oldMode) Prom = this.postXhr;
    else Prom = this.postFetch;

    return new Promise(res => {
      Promise.resolve()
        .then(data => {
          if (count == 1) return timer(0.8);
          if (count == 2) {
            count = -1;
            return this.lostConnection();
          }
        })
        .then(_ => {
          return Prom(url, arData, params, no_token);
        })
        .then(data => {
          res(data);
        })
        .catch(status => {
          if (status == 404 || status == 502) {
            swal(
              "Ошибка",
              "Наш сервер времено недоступен( повторите запрос позже",
              "error"
            );
            return Promise.reject();
          }
          return this.post(url, arData, params, no_token, ++count);
        })
        .then(data => res(data));
    });
  }

  get(url, params = false, no_token = false, count = 0) {
    let Prom;
    if (this.oldMode) Prom = this.getXhr;
    else Prom = this.getFetch;

    return new Promise(res => {
      Promise.resolve()
        .then(data => {
          if (count == 1) return timer(0.8);
          if (count == 2) {
            count = -1;
            return this.lostConnection();
          }
        })
        .then(_ => {
          return Prom(url, params, no_token);
        })
        .then(data => {
          res(data);
        })
        .catch(status => {
          if (status == 404 || status == 502) {
            swal(
              "Ошибка",
              "Наш сервер времено недоступен( повторите запрос позже",
              "error"
            );
            return Promise.reject();
          }
          return this.get(url, params, no_token, ++count);
        })
        .then(data => res(data));
    });
  }

  postFetch(url, arData, params, no_token) {
    let headers = new Headers();
    if (!no_token) {
      headers.append("App-Token", App.User.getToken());
    }
    headers.append("Content-Type", "application/json");
    if (params) {
      foreach(params, (key, val) => {
        headers.append(key, val);
      });
    }
    let opt = {
      headers: headers,
      mode: "cors",
      method: "POST",
      body: JSON.stringify(arData)
      //credentials: 'include',
    };
    return fetch(url, opt).then(response => {
      if (response.status != 200) return Promise.reject(response.status);
      if (response.headers.get("Content-Type").search("application/json") != -1)
        return response.json();
      return response.text();
    });
  }

  postXhr(url, arData = {}, params = false, no_token = false) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    if (!no_token) {
      xhr.setRequestHeader("App-Token", App.User.getToken());
    }
    if (params)
      foreach(params, (key, val) => {
        xhr.setRequestHeader(key, val);
      });

    xhr.send(toJson(arData));
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (xhr.status != 200) return reject(xhr.status);
        let inJson = parseJson(this.responseText);
        if (inJson) return resolve(inJson);
        resolve(this.responseText);
      };
      xhr.onerror = () => reject("no_connection");
    });
  }

  getJson(url, params = false) {
    return new Promise((resolve, reject) => {
      this.get(url, params).then(data => {
        if (!data instanceof Object) {
          data = parseJson(data);
          if (!data)
            return reject(
              "Неверный ответ сервера. Обратитесь к тех поддержке."
            );
        }
        if (isJson(data)) return resolve(ans(data));
        return reject(ans(data));
      });
    });
  }

  get(url, params = false, no_token = false, count = 0) {
    let Prom;
    if (this.oldMode) Prom = this.getXhr(url, params, no_token);
    else Prom = this.getFetch(url, params, no_token);

    return new Promise(res => {
      Promise.resolve()
        .then(data => {
          if (count == 1) return timer(0.8);
          if (count == 2) {
            count = -1;
            return this.lostConnection();
          }
        })
        .then(_ => {
          return Prom;
        })
        .then(data => {
          res(data);
        })
        .catch(status => {
          if (status == 404 || status == 502) {
            swal(
              "Ошибка",
              "Наш сервер времено недоступен( повторите запрос позже",
              "error"
            );
            return Promise.reject();
          }
          return this.get(url, params, no_token, ++count);
        })
        .then(data => res(data));
    });
  }

  getFetch(url, params = false, no_token = false) {
    let headers = new Headers();
    if (!no_token) {
      headers.append("App-Token", App.User.getToken());
    }
    if (params)
      foreach(params, (key, val) => {
        headers.append(key, val);
      });
    let opt = {
      headers: headers,
      mode: "cors",
      method: "GET"
      //credentials: 'include',
    };
    return fetch(url, opt).then(response => {
      if (response.status != 200) return Promise.reject(response.status);
      if (response.headers.get("Content-Type").search("application/json") != -1)
        return response.json();
      return response.text();
    });
  }

  getXhr(url, params = false, no_token = false) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    if (!no_token) {
      xhr.setRequestHeader("App-Token", App.User.getToken());
    }

    if (params)
      foreach(params, (key, val) => {
        xhr.setRequestHeader(key, val);
      });
    xhr.send();
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (xhr.status != 200) return reject(xhr.status);
        let inJson = parseJson(this.responseText);
        if (inJson) return resolve(inJson);
        resolve(this.responseText);
      };
      xhr.onerror = () => reject("no_connection");
    });
  }

  getNoCredits(url, params = false) {
    return this.get(url, params, true);
  }

  postNoCredits(url, arData = {}, params = false) {
    return this.post(url, arData, params, true);
  }

  lostConnection() {
    if (this.LCPromice) return this.LCPromice;
    return this.createLC();
  }

  createLC() {
    this.LCPromice = new Promise(res => {
      if (this.LCVue) this.LCVue.$data.show = true;
      else this.LCVue = new Vue(LostConnection).$mount("#lost-connection");
      this.LCResolve = res;
    }).then(data => {
      this.LCPromice = false;
      this.LCResolve = false;
      this.LCVue.$data.show = false;

      if (data === false) return Promise.reject();
    });
    return this.LCPromice;
  }
})();
