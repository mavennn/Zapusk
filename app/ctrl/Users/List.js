module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
		this.arFilter = this.body.arFilter;
		this.user = this.req.User;
		this.arPermissionFor = {
			admin: ["admin","speaker","user"],
			speaker: ["speaker","user"],
			user: ["speaker"],
		}
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){
		if(empty(this.req.User))
			return this.valivFilter('permission_denied');	
			
		if(empty(this.arFilter))
			this.arFilter = {};
		
		if(!this.arFilter.permission) {
			this.arFilter.permission = this.arPermissionFor[this.user.permission];
		}
		
		let UserAns = await this.getUsers();		
		return suJson(UserAns);
	}

	async getUsers() {
		let arUser = {}, limit, skip , UserAns = {};
		if(!empty(this.req.body.lPage) && !empty(this.req.body.page)){
			let count = await userModel.count(this.arFilter);
			skip = Number((this.req.body.page-1)*this.req.body.lPage);
			limit  = Number(this.req.body.lPage);
			UserAns.arNav = nav(this.req.body.page,limit,count);
		}
		
		UserAns.arUser = await userModel.find(this.arFilter).skip(skip).limit(limit);
		UserAns.arUser = UserAns.arUser.map(val => val.forClient())
		return UserAns;
	}

	
	
	valivFilter(er){
		throw new JsonError(erJson(er));
	}
	
	
}