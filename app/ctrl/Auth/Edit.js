module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
		this.user = this.User
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){

		let user = await UserManager.edit(this.user._id, this.body);
		return user;
	}
	
	
}