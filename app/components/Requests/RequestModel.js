var Request = new Schema({
	speaker: String,
	user: String,
	day: Number,
	rating: Number,
	status: Number, // 1 - подана, 2 - принята, 3 - отклонена
	feedback: String,
});

AutoInc.create(Request, 'Request', 'id');
global.requestModel = mongoose.model('Request', Request);