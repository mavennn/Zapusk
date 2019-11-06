require('../../app');
/*
	
	AutoInc.create(SomeSchema, 'tablename', 'aid');
	
	Установить индекс
	SomeSchema.getAutoInc().setLastIndex(1);
	
	Для InsertMany
	SomeSchema.getAutoInc().getMany(10);
	
*/

var AutoIncSchema = new Schema({
  collect: String,
  last: Number
});

const autoIncModel = mongoose.model("autoinc", AutoIncSchema);

const AutoIncEn = class {
  constructor(Schema, name, prop = "aid") {
    if (!name) throw new Error("AutoInc не указано name");

    if (prop == "id") Schema.set("id", false);
    //{ id: false }
    //	throw new Error('AutoInc prop не должен быть равен id');

    this.Schema = Schema;
    this.Schema.add({ [prop]: { type: Number, index: { unique: false } } });
    this.name = name;
    this.prop = prop;
    this.collect;

    let that = this;
    Schema.pre("save", async function(next) {
      if (!this.isNew) return next();

      let collect = await that.collect;

      this[prop] = ++collect.last;
      await collect.save();
      next();
    });

    Schema.statics.getAutoInc = () => this;

    this.collect = AutoInc.getOrCreate(name);
    this.collect.then(collect => {
      this.collect = Promise.resolve(collect);
    });
  }

  async setLastIndex(id) {
    let collect = await this.collect;
    collect.last = id;
    await collect.save();
    return suJson("su");
  }

  async getMany(count = 1) {
    count = isNanDef(count, 0);
    if (count < 1) throw new Error("AutoIncEn getMany должно быть больше 0");
    let collect = await this.collect;
    let arIds = [];
    for (let i = 1; i <= count; i++) {
      arIds.push(++collect.last);
    }
    await collect.save();
    return arIds;
  }
};

global.AutoInc = new (class {
  constructor() {
    this.collections = {};
    this.readyEnd = this.init();
    this.ready = false;
  }

  async init() {
    let arCollections = await autoIncModel.find();
    this.collections = arCollections.byKey("collect");
    this.ready = true;
  }

  async getOrCreate(name) {
    if (!this.ready) await this.readyEnd;
    if (!this.collections[name])
      this.collections[name] = await autoIncModel.create({
        collect: name,
        last: 0
      });
    return this.collections[name];
  }

  create(Schema, name, prop = "aid") {
    new AutoIncEn(Schema, name, prop);
  }
})();
