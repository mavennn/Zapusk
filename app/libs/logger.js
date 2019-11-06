require('../../app');

global.logger = new (function() {
  this.events = {};
  this.send = {};
  this.url = "";
  this.writeStreams = {};
  this.path = rootPath + "/logs/";
  this.send = {
    pay_error: {
      type: "danger"
    },
    error: {
      type: "danger"
    }
  };

  this.write = function(name, data = "") {
    if (this.writeStreams[name] == undefined) this.createStream(name);
    let log = { date: new Date().toISOString(), mes: data };
    this.writeStreams[name].write(toJson(log) + "\n");
    if (this.events[name] != undefined) {
      log.name = name;
      this.events[name].forEach(val => val(log));
    }
    if (this.send[name]) this.sendLog(name, log);
  };

  this.createStream = function(name) {
    let path = this.path + name + ".log";
    this.writeStreams[name] = fs.createWriteStream(path, { flags: "a+" });
    timer(5).then(() => {
      this.writeStreams[name].end();
      delete this.writeStreams[name];
    });
  };

  this.sendLog = function(name, log) {
    let arPost = {
      log: log,
      type: this.send[name].type,
      name: name,
      host: config.get("host.full_name")
    };
    //post(url.monit('/api/mod/logs/add'),arPost)
  };

  this.toJson = function(data = false) {
    if (Array.isArray(data) || typeof data == "object") return JSON.parse(data);
    return String(data);
  };

  this.on = function(name, func) {
    if (this.events[name] == undefined) this.events[name] = [];
    this.events[name].push(func);
  };
})();

global.log = new Proxy(logger, {
  get(target, propKey, receiver) {
    if (logger[propKey] != undefined) return logger[propKey];
    return function(...ags) {
      logger.write(propKey, ...ags);
    };
  }
});

logger.on("error", log => {
  let mess = (log.mes || {}).ans || log.mes;
  Telegram.error(mess);
  return mess;
});
