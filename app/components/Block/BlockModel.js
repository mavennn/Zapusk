require("../../../app");

let Block = new Schema({
    name: Number,
    timeStart: String,
    speakers: [],
    introductories: [],
});

global.blockModel = mongoose.model("Block", Block);