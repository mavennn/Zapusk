var Tag = new Schema({
  name: String,
  type: String, //country,
  weight: Number,
  hidden: Boolean
});

AutoInc.create(Tag, "Tag", "id");
global.tagsModel = mongoose.model("tag", Tag);
