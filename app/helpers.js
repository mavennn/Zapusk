global._ = require("lodash");
global.srequire = path => require(`${rootPath}/${path}`);

global.ctrl = new Proxy(
  {},
  {
    get(t, name) {
      let Path = [name];
      let Sproxy = new Proxy(() => {}, {
        get(t, name) {
          Path.push(name);
          return Sproxy;
        },
        apply(t, fn, ags) {
          let en = Path.splice(0, Path.length - 1).reduce(
            (cur, val) => cur[val],
            global.controllers
          );
          return (...reqs) => new en(...reqs)[Path[0]](...ags);
        }
      });
      return Sproxy;
    }
  }
);

global.buildHeader = function(params = false) {
  let headers = {
    "app-token": "",
    "content-type": "application/json"
  };
  if (params !== false) return Object.assign(headers, params);
  return headers;
};

var request = require("request");
global.post = function(url, arPost, params = false) {
  var headers = buildHeader(params);
  return new Promise(function(resolve, reject) {
    request.post(
      {
        url: url,
        body: JSON.stringify(arPost),
        headers: headers
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          resolve(erJson(false));
        }
      }
    );
  });
};

global.get = function(url, arPost) {
  return new Promise(function(resolve, reject) {
    request.get(
      {
        url: url,
        headers: {
          "app-token": ""
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          resolve(erJson(false));
        }
      }
    );
  });
};

global.postJson = function(url, POST, params = false) {
  return new Promise(function(resolve, reject) {
    post(url, POST, params)
      .then(data => {
        if (!(data instanceof Object)) data = parseJson(data);
        if (data === false) {
          resolve(
            erJson("Неверный ответ сервера. Обратитесь к тех поддержке1.")
          );
          return;
        }
        resolve(data);
      })
      .catch(data => {
        resolve(erJson("Неверный ответ сервера. Обратитесь к тех поддержке2."));
      });
  });
};

global.getJson = function(url) {
  return new Promise(function(resolve, reject) {
    get(url)
      .then(data => {
        if (!(data instanceof Object)) data = parseJson(data);
        if (data === false) {
          resolve(
            erJson("Неверный ответ сервера. Обратитесь к тех поддержке1.")
          );
          return;
        }
        resolve(data);
      })
      .catch(data => {
        resolve(erJson("Неверный ответ сервера. Обратитесь к тех поддержке2."));
      });
  });
};

global.erJson = function(data, logName = false, moreOptions = false) {
  if (!logName) return { TYPE: "ERROR", ANS: data };
  let arLog = { ans: data, type: "ERROR" };
  if (moreOptions)
    foreach(moreOptions, (key, val) => {
      arLog[key] = val;
    });
  log[logName](arLog);
  return { TYPE: "ERROR", ANS: data };
};
global.suJson = data => ({ TYPE: "SUCCESS", ANS: data });
global.isJson = data => Boolean(data.TYPE == "SUCCESS");
global.ans = data => data.ANS;
global.toProm = function(data) {
  return new Promise(function(resolve, reject) {
    resolve(data);
  });
};
global.toJson = data => JSON.stringify(data);
global.parseJson = function(json) {
  try {
    json = JSON.parse(json);
  } catch (err) {
    return false;
  }
  return json;
};

global.empty = function(data) {
  if (data === null) return true;
  if (data === undefined) return true;
  if (data == "") return true;
  if (data == 0) return true;

  if (typeof data == "number" && isNaN(data)) return true;

  if (typeof data == "object") {
    for (var property in data) return false;
    return true;
  }
  return false;
};

global.foreach = function(object, callback) {
  Object.keys(object).map(function(objectKey, index) {
    callback(objectKey, object[objectKey]);
  });
};

global.genToken = function(size = 30) {
  return randomString(
    size,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  );
};

global.randomString = function(length, chars) {
  if (!chars) {
    throw new Error("Argument 'chars' is undefined");
  }

  var charsLength = chars.length;
  if (charsLength > 256) {
    throw new Error(
      "Argument 'chars' should not have more than 256 characters" +
        ", otherwise unpredictability will be broken"
    );
  }

  var randomBytes = crypto.randomBytes(length);
  var result = new Array(length);

  var cursor = 0;
  for (var i = 0; i < length; i++) {
    cursor += randomBytes[i];
    result[i] = chars[cursor % charsLength];
  }
  return result.join("");
};

global.genPass = function(type = "number", conut = 6) {
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

Array.prototype.byKey = function(byKey = "id") {
  let obj = {};
  this.forEach(val => {
    obj[val[byKey]] = val;
  });
  return obj;
};

Array.prototype.byKeyArr = function(byKey = "id") {
  let obj = {};
  this.forEach(val => {
    !obj[getVal(val, byKey)] ? (obj[getVal(val, byKey)] = []) : "";
    obj[getVal(val, byKey)].push(val);
  });
  return obj;
};

Array.prototype.unique = function(byKey = "id") {
  let arr = [...new Set(this)];
  return arr;
};

String.prototype.toFixed = function(number = false) {
  return (+this).toFixed(number);
};

global.round = function(numb, pp = 0) {
  pp = Math.pow(10, pp);
  return Math.round(numb * pp) / pp;
};

global.timer = function(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time * 1000);
  });
};

Object.equals = function(firstObj, secondObject) {
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

global.clone = function(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = getDateUTC();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy obj! Its type isn't supported.");
};

let execBash = require("child_process").exec;
global.exec = function(command, dir = false, log_commands = false) {
  return new Promise(resolve => {
    execBash(
      dir ? `(cd ${dir} && ${command})` : command,
      (error, stdout, stderr) => {
        if (error) throw new Error(error);
        if (log_commands) console.log(stdout);
        return resolve(stdout);
      }
    );
  });
};

global.foreachSync = async function(arr, callback, key = 0) {
  if (arr[key] == undefined) return;
  await callback(arr[key], key++);
  return foreachSync(arr, callback, key);
};

/*
global.api = function(groups, url){
	return groups.map(val=> `/api/${val}/${url}`);
}
*/

global.nav = function(page, lpage, elCount) {
  page = Number(page);
  let arReady = {
    pages: []
  };
  arReady.total = elCount;
  let totalpage = Math.ceil(elCount / lpage);
  if (!totalpage) return false;

  if (page == 1) arReady.back = false;
  else arReady.back = page - 1;

  if (page == totalpage) arReady.next = false;
  else arReady.next = page + 1;

  if (totalpage <= 8) {
    for (let i = 1; i <= totalpage; i++) {
      arReady.pages.push({ active: page == i, page: i, name: i });
    }
  } else {
    if (page <= 2 || totalpage - page <= 1) {
      for (let i = 1; i <= 3; i++) {
        arReady.pages.push({ active: page == i, page: i, name: i });
      }
      arReady.pages.push({
        active: false,
        page: Math.ceil(totalpage / 2),
        name: "..."
      });
      for (let i = totalpage - 2; i <= totalpage; i++) {
        arReady.pages.push({ active: page == i, page: i, name: i });
      }
    } else {
      arReady.pages.push({ active: false, page: 1, name: 1 });
      arReady.pages.push({
        active: false,
        page: Math.ceil(page / 2),
        name: "..."
      });
      arReady.pages.push({ active: false, page: page - 1, name: page - 1 });
      arReady.pages.push({ active: true, page: page, name: page });
      arReady.pages.push({ active: false, page: page + 1, name: page + 1 });
      arReady.pages.push({
        active: false,
        page: Math.ceil((totalpage + page) / 2),
        name: "..."
      });
      arReady.pages.push({ active: false, page: totalpage, name: totalpage });
    }
  }
  return arReady;
};

global.isNanDef = function(num, def = 0) {
  num = Number(num);
  if (isNaN(num)) return def;
  return num;
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

global.includeDir = path => {
  items = fs.readdirSync(path);
  items.forEach(val => {
    if (val.substr(-3) != ".js") return;
    require(`${path}/${val}`);
  });
};

global.api = function(groups, url) {
  return groups.map(val => `/api/${val}/${url}`);
};

global.formatPrice = function(price) {
  price = price.toString();
  return price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};

global.isObject = function(data) {
  return typeof data == "object" && !Array.isArray(data);
};

function customizer(objValue, srcValue) {
  if (!_.isUndefined(objValue) && !_.isUndefined(srcValue)) {
    if (isObject(objValue) && isObject(objValue))
      return smartAssign(objValue, srcValue);
    else return srcValue;
  }
  return _.isUndefined(objValue) ? srcValue : objValue;
}

global.smartAssign = _.partialRight(_.assignInWith, customizer);

global.JError = name => {
  throw new JsonError(erJson(name));
};

global.existFile = function(url) {
  return new Promise(function(resolve, reject) {
    if (!url) return resolve(false);
    url = changeUrl(url);
    fs.exists(url, resolve);
  });
};

global.changeUrl = function(url) {
  url = url.replace(rootPath, "");
  if (url[0] != "/") url = "/" + url;
  return `${rootPath}${url}`;
};

global.getDir = function(url) {
  url = changeUrl(url);
  let arDir = url.split("/") || [];
  let last = arDir[arDir.length - 1];
  if (last && last.indexOf(".") != -1) arDir[arDir.length - 1] = "";
  return arDir.join("/");
};

global.existDir = function(url) {
  url = getDir(url);
  return new Promise(function(resolve, reject) {
    if (!url) return resolve(false);
    fs.exists(url, resolve);
  });
};

global.unlinkFile = function(url) {
  url = changeUrl(url);
  return new Promise(function(resolve, reject) {
    existFile(url).then(data => {
      if (!data) return resolve(true);
      url = changeUrl(url);
      fs.unlink(url, err => {
        resolve(empty(err));
      });
    });
  });
};

global.rmDirFile = function(url) {
  return new Promise(function(resolve, reject) {
    if (!url) return resolve(false);
    url = changeUrl(url);
    fs.rmdir(url, err => {
      resolve(empty(err));
    });
  });
};

global.checkUrlPath = function(url) {
  if (!url) return false;
  url = url.replace(rootPath, "");
  if (url[0] != "/") url = "/" + url;
  let arUrl = url.split("/");
  let createUrl = rootPath + "/";
  try {
    arUrl.forEach((val, key) => {
      if (val !== "" && val.indexOf(".") == -1) {
        createUrl = createUrl + val + "/";
        var isPath = fs.existsSync(createUrl);
        if (!isPath) fs.mkdirSync(createUrl);
      }
    });
    return true;
  } catch (e) {
    return false;
  }
};

global.moveFile = function(urlFrom, urlTo) {
  urlFrom = changeUrl(urlFrom);
  urlTo = changeUrl(urlTo);
  return existFile(urlFrom).then(val => {
    if (!val) return Promise.reject();
    checkUrlPath(urlTo);
    return toPromise(fs.rename, false, false)(urlFrom, urlTo);
  });
};

global.toPromise = function(func, context, Jtype = true) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, data) =>
        err
          ? Jtype
            ? resolve(erJson(err))
            : reject(err)
          : Jtype
          ? resolve(suJson(data))
          : resolve(data)
      );
      func.apply(context || this, args);
    });
  };
};
