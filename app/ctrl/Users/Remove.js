require('../../../app');

module.exports = class extends AbstractCtrl {
    extConstructor() {
        this.body = this.req.body;
        this.user = this.req.User;
    }

    //run - запускатьт
    //exect - реализация

    async exect() {
        if (empty(this.req.User)) return erJson("Access denied");

        if (empty(this.req.body)) return erJson("Some data?");

        let user = this.body;

        return await UserManager.remove(user);
    }
};
