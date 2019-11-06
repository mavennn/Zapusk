require('../../app');

global.templates.empty = class {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.layout = false;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  render(page, options = {}) {
    options = this.completeOptions(options);
    this.res.render(page, options);
  }

  completeOptions(options = {}) {
    options.layout = this.layout;
    return options;
  }

  async renderToString(page, options = {}) {
    options = this.completeOptions(options);
    let data = await hbs.render(
      default_views_dir + "/" + page + ".hbs",
      options
    );
    return data;
  }
};
