require("../../../app");

let Block = new Schema({
    name: Number,
    timeStart: String,
    speakers: [String],
});

global.blockModel = mongoose.model("Block", Block);