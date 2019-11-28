require("../../../app");

module.exports = class extends AbstractCtrl {
    extConstructor() {
        this.body = this.req.body;
    }

    //run - запускать
    //exect - реализация

    async exect() {
        let user = await UserManager.add(this.body);
        return user;
    }
};
