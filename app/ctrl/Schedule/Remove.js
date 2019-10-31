module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body
		this.user = this.req.User
	}
	
	async exect(){
		if (!this.user)
			return erJson('Not auth')

		if (empty(this.body.id))
			return erJson('ID?')

		if (this.user.permission != 'admin')
			return erJson('Permission problems')
		
		return await scheduleManager.removeItem(this.body.id)

	}
	
	
}