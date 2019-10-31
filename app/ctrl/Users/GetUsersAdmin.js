module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body
		this.user = this.req.User
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){
		if(empty(this.req.User))
			return erJson('Access denied');	

		if (this.req.User.permission != 'admin')
			return erJson('')
		
		if (!this.req.body.type && this.req.body.type != 'speaker' && this.req.body.type != 'user')
			return erJson('Error')

		let speakers = await userModel.find({ permission: this.req.body.type })
		speakers = speakers.map(val => {
			const cntr = tagsManager.country.filter(v => v._id == val.country)
			const countryName = cntr.length > 0 ? cntr[0].name : ''
			val.countryName = countryName
			return val
		})

		return suJson(speakers)
	}
	
}