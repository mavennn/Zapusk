import swal from "sweetalert2";
global.swal = swal;

global.empty = function(data) {
  if (data === null) return true;
  if (data === undefined) return true;
  if (data == "") return true;
  if (data == 0) return true;
  if (typeof data == "object") {
    for (var property in data) return false;
    return true;
  }
  return false;
};

global.getObjectValues = function(Obj) {
  let arVals = [];
  foreach(Obj, (key, val) => {
    arVals.push(val);
  });
  return arVals;
};

global.isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

global.round = function(numb, pp = 0) {
  pp = Math.pow(10, pp);
  return Math.round(numb * pp) / pp;
};

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("-");
};

Array.prototype.byKey = function(byKey = "id") {
  let obj = {};
  this.forEach(val => {
    obj[val[byKey]] = val;
  });
  return obj;
};

global.cut = function(val, length) {
  if (empty(val)) return;
  var sliced = val.slice(0, +length);
  if (sliced.length < val.length) {
    sliced += "...";
  }
  return sliced;
};

Array.prototype.byKeyArr = function(byKey = "id") {
  let obj = {};
  this.forEach(val => {
    !obj[getVal(val, byKey)] ? (obj[getVal(val, byKey)] = []) : "";
    obj[getVal(val, byKey)].push(val);
  });
  return obj;
};

global.genToken = function(type = "number", conut = 12) {
  var result = "";
  var words;
  if (type == "number") words = "123456789";
  else words = "123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  var max_position = words.length - 1;
  for (let i = 0; i < conut; ++i) {
    var position = Math.floor(Math.random() * max_position);
    result = result + words.substring(position, position + 1);
  }
  return result;
};

global.timer = function(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time * 1000);
  });
};
/*

global.buildHeader = function(params = false){
	let headers = {
		'App-Token' : App.Auth.getToken(),
		'stock' : App.Region.stock || App.Region.defaultStock
	};
	if (params != false)
		return Object.assign(headers, params);
	return headers;
}
*/

global.foreach = function(object, callback) {
  Object.keys(object).map(function(objectKey, index) {
    callback(objectKey, object[objectKey]);
  });
};

global.toRouteTest = function(link) {
  App.Router.push(link);
};

global.errorSwal = function(logName = false, moreOptions = {}) {
  return function(data) {
    Load.stop();
    if (typeof data != "string") {
      swal("Ошибка", "Техническая ошибка", "error");
      console.error("Ошибка", data);
    } else swal("Ошибка", data, "error");
    if (logName) {
      let arLog = { logName: logName, log: data };
      if (moreOptions) {
        foreach(moreOptions, (key, val) => {
          arLog[key] = val;
        });
      }
      //			Logger.errorLog(arLog);
    }
  };
};

global.erJson = function(data, logName = false, moreOptions = false) {
  return { TYPE: "ERROR", ANS: data };
};
global.suJson = function(data) {
  return { TYPE: "SUCCESS", ANS: data };
};
global.isJson = function(data) {
  return data.TYPE == "SUCCESS" ? true : false;
};
global.ans = function(data) {
  return data.ANS;
};
global.toJson = function(data) {
  return JSON.stringify(data);
};
global.parseJson = function(json, defaultVal = false) {
  try {
    json = JSON.parse(json);
  } catch (err) {
    return defaultVal;
  }
  return json;
};

global.findAddAddress = function(query, withoutHome = false) {
  return new Promise((resolve, reject) => {
    Request.postNoCredits(
      `https://dadata.ru/api/v2/suggest/address`,
      {
        query,
        count: 1,
        restrict_value: false,
        locations: JSON.parse('[{"region":"Москва"},{"kladr_id":50}]')
        //App.Region.regionConfig.dadata.reduce((cur,val) => (cur.push(val.locations) && cur), []),
      },
      { Authorization: "Token 6880e8d1a4b08bc66466b4401ccc16f89e2c8cdf" }
    )
      .then(data => {
        let suggestion = Object.assign(
          {},
          data.suggestions[0] ? data.suggestions[0].data : {}
        );

        if (!withoutHome)
          if (typeof suggestion.house == "object")
            reject("Введите адрес до дома!");
        if (empty(suggestion.geo_lat) && empty(suggestion.geo_lon))
          reject("Не получается подтвердить адрес");

        let ModalAddress = {
          name: data.suggestions[0].value,
          street: suggestion.street_with_type,
          house: suggestion.house,
          city_district: suggestion.city_district || false,
          city: suggestion.city,
          block:
            `${suggestion.block_type || ""}${suggestion.block || ""}` || false,
          canContinue: true,
          coords: {
            lat: suggestion.geo_lat,
            lon: suggestion.geo_lon
          }
        };
        resolve(ModalAddress);
      })
      .catch(data => {
        reject(data);
      });
  });
};

global.getDays = function() {
  let arDates = {
    0: {
      dateName: "Вчера",
      date: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    },
    1: {
      dateName: "Сегодня",
      date: moment().format("YYYY-MM-DD")
    },
    2: {
      dateName: "Завтра",
      date: moment()
        .add(1, "days")
        .format("YYYY-MM-DD")
    }
  };
  for (let i = 2; i < 6; i++) {
    let date = moment().add(i, "days");
    arDates[i + 1] = {
      dateName: date.format("DD MMMM"),
      date: date.format("YYYY-MM-DD")
    };
  }
  return arDates;
};

global.getVal = function(lastVal, path) {
  try {
    path.split(".").forEach(val => {
      lastVal = lastVal[val];
    });
    return lastVal;
  } catch (e) {
    return undefined;
  }
};

global.Load = new (function() {
  this.count = 0;
  this.start = function() {
    if (this.count == 0) {
      document.querySelector("#loader").classList.remove("hidden");
      document.querySelector("#loader_back").classList.remove("hidden");
    }
    this.count++;
  };
  this.stop = function() {
    this.count--;
    if (this.count < 0) this.count = 0;
    if (this.count == 0) {
      document.querySelector("#loader").classList.add("hidden");
      document.querySelector("#loader_back").classList.add("hidden");
    }
  };
})();

global.scrollToTopAnimate = function(scrollDuration) {
  const scrollHeight = window.scrollY,
    scrollStep = Math.PI / (scrollDuration / 15),
    cosParameter = scrollHeight / 2;
  var scrollCount = 0,
    scrollMargin,
    scrollInterval = setInterval(function() {
      if (window.scrollY != 0) {
        scrollCount = scrollCount + 1;
        scrollMargin =
          cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else clearInterval(scrollInterval);
    }, 15);
};

global.isNanDef = function(num, def = 0) {
  num = Number(num);
  if (isNaN(num)) return def;
  return num;
};

global.compareInterval = function(a, b) {
  var dateA = a.tsm.split("_");
  var dateB = b.tsm.split("_");
  if (dateA[0] > dateB[0]) return 1;
  else if (dateA[0] == dateB[0]) var a = new Date(dateA[1]);
  var b = new Date(dateB[1]);
  if (a > b) return 1;
  else return -1;
};

global.ObjectEquals = function(firstObj, secondObject) {
  if (null == firstObj || null == secondObject) return false;
  if ("object" != typeof firstObj && "object" != typeof secondObject)
    return firstObj == secondObject;
  else if ("object" != typeof firstObj || "object" != typeof secondObject)
    return false;
  if (firstObj instanceof Date && secondObject instanceof Date)
    return firstObj.getTime() == secondObject.getTime();
  else if (firstObj instanceof Date && secondObject instanceof Date)
    return false;

  var keysFirstObj = Object.keys(firstObj);
  var keysSecondObject = Object.keys(secondObject);
  if (keysFirstObj.length != keysSecondObject.length) {
    return false;
  }
  return !keysFirstObj.filter(function(key) {
    if (typeof firstObj[key] == "object" || Array.isArray(firstObj[key])) {
      return !Object.equals(firstObj[key], secondObject[key]);
    } else {
      return firstObj[key] !== secondObject[key];
    }
  }).length;
};

global.printPDF = function(type, orderId, params = {}) {
  if (empty(type) || empty(orderId))
    return swal("Ошибка", "Техническая ошибка", "error");
  let printParams = Object.assign(params, {
    type: type,
    orderId: orderId
  });
  Load.start();
  return Request.postJson(
    Request.url.orders("/api/operator/order/" + orderId + "/print-pdf"),
    printParams
  )
    .then(data => {
      location.href = "http://" + data;
      Load.stop();
    })
    .catch(data => {
      Load.stop();
      swal("Ошибка", data, "error");
    });
};

global.getJsonLoad = url => {
  Load.start();
  Request.getJson(url)
    .then(data => Load.stop())
    .catch(requestError);
};
global.isPositiveNumber = data => {
  return isNumber(data) && data >= 0;
};
global.postJsonLoad = (url, data, params) => {
  Load.start();
  Request.postJson(url, data, params)
    .then(data => Load.stop())
    .catch(requestError);
};

global.requestError = data => {
  Load.stop();
  if (typeof data == "string") return swal("Ошибка", data, "error");
  swal("Ошибка", "Техническая ошибка", "error");
  console.error("requestError Ошибка", data);
};

global.cookieParse = () => {
  return document.cookie
    .split("; ")
    .map(val => val.split("="))
    .reduce((cur, val) => (cur[val[0]] = val[1]) && cur, {});
};

global.getCorrectPhone = function(phone) {
  if (phone.substr(0, 3) == "+7 ") phone = phone.substr(3);
  phone = phone.replace(/\D+/g, "");
  var phoneStr = "+7 ";
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
};

global.copyToRam = function(str) {
  let tmp = document.createElement("INPUT"),
    focus = document.activeElement;

  tmp.value = str;

  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand("copy");
  document.body.removeChild(tmp);
  focus.focus();
  swal("Успешно", "Название файла скопировано в буфер обмена", "success");
};

global.swalAsk = (
  title = "Подтверждение",
  text = "",
  { yes = "Да", no = "Нет" } = {}
) => {
  return swal({
    title,
    text,
    type: "warning",
    showCancelButton: true,
    confirmButtonText: yes,
    cancelButtonText: no
  }).then(result => (result.value ? "" : Promise.reject()));
  //dismiss
};

global.swalAskText = (
  title = "Подтверждение",
  text = "",
  { yes = "Да", no = "Нет", can_empty = false } = {}
) => {
  return swal({
    title,
    text,
    input: "text",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: yes,
    cancelButtonText: no,
    preConfirm: text => {
      if (!can_empty && empty(text)) return Promise.reject("Заполните поле");

      return Promise.resolve(text);
    }
  }).then(result => (!result.dismiss ? result.value : Promise.reject()));
};

/*
swal({
  title: 'Submit your Github username',
  input: 'text',
  showCancelButton: true,
  confirmButtonText: 'Look up',
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
		return Promise.reject('errr')
  }
})
*/

global.getPricesRange = (from, to, skip) => {
  let a = [];
  for (let cur = from; cur <= to; cur += skip) {
    a.push(cur);
  }
  return a;
};
