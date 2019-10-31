module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){
		let user = await UserManager.registration(this.body); // { name, sname, email, password, phone }
		return user;
	}
	
	
}