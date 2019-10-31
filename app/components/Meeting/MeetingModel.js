
var Meeting = new Schema({
	day: String,
	time: String,
	speaker: String,
	user: String,
	rating: Number,
	status: String,  // 0 - пустая, 1 - занята
	feedback: String, 
});

global.meetingModel = mongoose.model('Meeting', Meeting);