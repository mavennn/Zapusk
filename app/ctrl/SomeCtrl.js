require('../../app');

module.exports = class extends AbstractCtrl {
  extConstructor() {}

  //run - запускатьт
  //exect - реализация

  exect() {
    console.log("Ура2");
    return "ура2";
  }
};
