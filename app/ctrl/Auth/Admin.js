module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){
		let user = await UserManager.authCrmAdmin(this.body.email, this.body.password);
		return user;
	}
	
	
}