require('../../app');

global.templates.vue = class {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.title = "WorldSkills Kazan 2019";
    this.description = "Description";
    this.keyWords = "key words";
    this.layout = "vue";
    this.modules_url = {
      base: config.modulesUrl.base,
      admin: config.modulesUrl.admin,
      front: config.modulesUrl.front
    };
    this.cacheDate = "123";
    this.header = "standart"; // main - хэдер для главной
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  setKeyWords(keyWords) {
    this.keyWords = keyWords;
    return this;
  }

  isEnvironmentProd() {
    return config.prod();
  }

  async render(page, options = {}) {
    options = this.completeOptions(options);
    this.res.render(page, options);
  }

  completeOptions(options = {}) {
    options.is_prod = this.isEnvironmentProd();
    options.title = this.title;
    options.header = this.header;
    options.description = this.description;
    options.keyWords = this.keyWords;
    options.layout = this.layout;
    options.cacheDate = this.cacheDate;
    options.modules_url_json = toJson(this.modules_url);
    options.modules_url = this.modules_url;
    options.mode = config.get("host.env");
    return options;
  }
};
