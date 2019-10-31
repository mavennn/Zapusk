module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
	}
	
	async exect(){

		let schedule = await scheduleModel.find({})

		return suJson(schedule)

	}
	
	
}