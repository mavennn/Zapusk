require('../../app');

global.nodemailer = require("nodemailer");
global.Mail = new (class {
  constructor() {
    this.htmlToText = require("html-to-text");
    this.transport = nodemailer.createTransport({
      host: "mail.nic.ru",
      port: 2525,
      secure: false,
      auth: {
        user: "postmaster@wsk2019.ru",
        pass: "Wsk2019ru"
      }
    });
    this.duplicate = config.market("noti.email.duplicate");
    this.from = '"WSK2019" <postmaster@wsk2019.ru>';
  }

  async sendDoc(attachment, to) {
    let arParams = {
      from: this.from,
      to,
      attachments: [attachment]
    };
    let data = await this.sendMail(arParams);
    return data;
  }

  async send({
    title = "Registration data for WSK2019",
    to = false,
    html = "",
    attachment = false
  } = {}) {
    if (empty(to)) return erJson("Не выбраны отправители");

    if (Array.isArray(to)) to = to.split(", ");
    let arParams = {
      from: this.from,
      to: to,
      subject: title,
      text: this.htmlToText.fromString(html),
      html: html
    };
    let data = await this.sendMail(arParams);
    if (this.duplicate) {
      arParams.to = this.duplicate;
      await this.sendMail(arParams);
    }

    return data;
  }

  sendMail(mailOptions) {
    return new Promise(resolve => {
      this.transport.sendMail(mailOptions, (error, info) => {
        console.log(error);
        if (error) return resolve(erJson("Сообщение не отправлено"));
        return resolve(suJson(info.messageId));
      });
    });
  }
})();
