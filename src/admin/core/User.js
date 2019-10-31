export default new class{
	
	constructor() {
		this.isAuth = true;
		this.basketToken;
		this.arUser;
		this.token;
		this.arPermission = {
			admin: "Админ",
			user: "Пользователь",
		}
		this.addUserPromise = {};
	}
	
	init(){
		return this.GetFromLocalStorage();
		//return Promise.resolve();
	}
	
	
	GetFromLocalStorage(){
		try {
			let UserProps = localStorageProxy.getItem('user');
			let token = cookieParse()['token'];
			this.token = token;
			if (!empty(UserProps)) {
				this.arUser = JSON.parse(UserProps);
				this.isAuth = true;
				return Promise.resolve();
			} else {
				if(!empty(token))
					return this.getUser(token);
				return Promise.resolve();
			}
		} catch(e){
			console.log('e', e);
			return Promise.resolve();
		}
	}
	
	adminLogin(email) {
		if (empty(email))
			return swal('Ошибка', 'Введите Email', 'error');
		Load.start();
		Request.postJson(Request.url.base('/api/crm/admin/auth'), {email}).then(data => {
			Load.stop();
			this.regInAdminApp(data);
		}).catch(requestError)
	}
	
	regInAdminApp(arUser) {
		this.isAuth = true;
		localStorageProxy.setItem('old_user', toJson(this.arUser));
		this.arUser = arUser;
		this.setUserToLocalStorage();
		Cookies.set('token', this.arUser.token);
		location.href = "/admin/";
	}
	
	backToAdmin() {
		this.isAuth = true;
		let oldUser = parseJson(localStorageProxy.getItem('old_user'));
		localStorageProxy.removeItem('old_user');
		this.arUser = oldUser;
		this.setUserToLocalStorage();
		Cookies.set('token', this.arUser.token);
		location.href = "/admin/";
	}
	
	isHeadDep(){
		return this.arUser.permission.header_departament || false
	}
	
	getUser(token) {
		if (empty(token))
			return Promise.resolve();
		this.arUser = {token};
		return Request.getJson(Request.url.base('/api/crm/user/get'))
			.then(data => {
				this.arUser = {
					name: data.name,
					sname: data.sname,
					phone: data.phone,
					email: data.email,
					permission: data.permission,
					id: data.id,
					_id: data._id,
					order_count: data.order_count || 0,
					token: token,
					region_admin: data.region_admin
				};
				this.isAuth = true;
				this.setUserToLocalStorage();
			}).catch(data=>{
				this.arUser = {};
			})
	}
	
	regInApp(arUser){
		this.isAuth = true;
		this.arUser = arUser;
		this.setUserToLocalStorage();
		Cookies.set('token', this.arUser["token"]);
		location.href = "/admin/";
	}
	
	setUserToLocalStorage(){
		localStorageProxy.removeItem('user');
		localStorageProxy.setItem('user', JSON.stringify(this.arUser));
	}

	getUserById(id){
		return Request.postJson('/api/user/getbyid',{id:id}, false, true).then(data=>{
			Load.stop();
			return data
		}).catch(requestError);
	}
	
	getTags(){
		return Request.post('/api/user/tags/get').then(data=>{
			Load.stop();
			return data
		}).catch(requestError);
	}

	editProfile(User){
		return Request.postJson('/api/user/edit', User, false, true).then(data=>{
			Load.stop();
			return data
		}).catch(requestError);
	}

	
	login(email,password){
		if (empty(email) || empty(password))
			return;
		Load.start();
		Request.postJson('/api/auth-admin', {email, password}, false, true).then(data=>{
			Load.stop();
			this.regInApp(data);
			return;	
		}).catch(data=>{
			swal('Ошибка',data,'error');
			Load.stop();
			return;
		})
	}
	
	logout(){
		this.isAuth = false;
		this.arUser = Array();
		localStorageProxy.removeItem("user");
		Cookies.set('token', "");
		location.reload();
	}
	
	getID(){
		return this.isAuth ? this.arUser._id : false;
	}
	
	getName(){
		return (!this.isAuth ? "" : `${this.arUser.name} ${this.arUser.sname || ''}`);
	}
	
	getPhone(){
		return (!this.isAuth ? "" : this.arUser.phone);
	}
	
	getEmail(){
		return (!this.isAuth ? "" : this.arUser.email);
	}
	
	getFullID() {
		return (!this.isAuth ? "" : this.arUser._id);
	}
	
	getForSCard(){
		return {
			print_name: `${this.arUser.sname || ''} ${this.arUser.name || ''}`,
			id: this.arUser._id,
		}
	}
	
	forgot(email){
		if (empty(email))
			return swal('Ошибка', 'Введите Email', 'error');
		Load.start();
		Request.postJson(Request.url.base('/api/forgot'), {email}, false, true).then(data=>{
			swal('Успешно',data,'success').then(()=>{
				return location.href = "/";
			});
		}).catch(data=>{
			swal('Ошибка',data,'error');
			Load.stop();
			return;
		})
	}
	
	getToken(){
		return this.token;
	}
	
	openDetail(id, stack = false){
		if(!stack)
			App.Mpage.closeAll({fast: true});
		timer(0.1).then(() => App.Mpage.open({component:'user-detail', data:{id}, use_header:false}))
	}
	
	getDetail(id){
		return Request.postJson(Request.url.base('/api/crm/users/detail'),{ id: id });
	}	
	
	isAdmin() {
		return this.arUser.permission.admin;
	}
	
	getUserList(page = false, lPage = false, search = false, active_role = false){
		var arPost = {
			arFilter: {},
			lPage: lPage,
			page: page,
		};
		if(search)
			arPost.search = search;
		
		if (active_role) {
			arPost.permission = active_role;
		}
		
		Load.start();
		return Request.postJson(Request.url.base('/api/crm/users/list'), arPost).then(data=>{
			Load.stop();
			return data;
		}).catch(this.requestError);
	}
	
	
	openUserAdd() {
		App.Modal.open({component: 'add-user', min_height: '250px', title: 'Добавить пользователя', can_close: false});
		return new Promise((resolve, reject) => this.addUserPromise = {resolve , reject});
	}
    
    formatPhone(phone){
	    if(phone.substr(0,3)=='+7 ')
	    	phone = phone.substr(3);
	    
	    phone = phone.replace(/\D+/g,"");
	    let phoneStr = '+7 ';
	    phone = phone.split('');
	    phone.forEach(function(val,key){
		    switch(key) {
			  case 0: phoneStr+='('; break;
			  case 3: phoneStr+=') '; break;
			  case 6: phoneStr+=' - '; break;
			}
			if(key>9)
				return;
			phoneStr+=val;
	    })
	    return phoneStr;
    }
    validEmail(email){
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
    }
   
   
   
   changePass(token,pass){

		if(empty(token))
			return swal('Ошибка', 'Введите токен', 'error');

		Load.start();
		
		return Request.postJson(Request.url.base('/api/changepass'), {token,pass}, false, true).then(data=>{
			return location.href = "/";	
		}).catch(data=>{
			swal('Ошибка',data,'error');
			Load.stop();
			return;
		})
	}
   
   
    
    
    createUser(User) {
		if (empty(User.email) || empty(User.name) || empty(User.phone) || (User.phone.length < 19)) 
			return Promise.reject('Заполните корректно все поля');
		if (User.password.length > 0 && User.password.length < 6)
			return Promise.reject('Введите пароль, дина пароля не меннее 6 символов');
		
		let arUser = {
			name: User.name,
			sname: User.sname,
			ssname: User.ssname,
			phone: User.phone,
			email: User.email,
			password: User.password,
			permission: User.permission
		}
			
		if (this.isAdmin())
			arUser.permission = User.permission;
			
		return Request.postJson(Request.url.base('/api/registration'), arUser);
    }
	
}