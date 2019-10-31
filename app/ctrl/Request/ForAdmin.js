module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
		this.user = this.req.User
		this.day = this.body.day
		this.speakerId = this.body.speakerId
	}
	
	//run - запускатьт
	//exect - реализация
	async exect(){
		if (this.user.permission != 'admin')
			return erJson('Not auth')

		let requests = await requestModel.find({ speaker: this.speakerId, day: this.day })
		if (empty(requests))
			return erJson('err')
			
		let users = {}

		for (let reqs of requests) {
			if(!empty(reqs.user)) {
				let sp = await userModel.findOne({_id: reqs.user})
				if (sp) {
					users[sp._id] = sp
				}
			}
		}
		
		return suJson({ requests, users })

	}
	
	
}