require('../../../app');

module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
		this.user = this.req.User;
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){
		
		let user = await UserManager.adminAuth(this.body.email,this.user);
		return user;
	}
	
	
}