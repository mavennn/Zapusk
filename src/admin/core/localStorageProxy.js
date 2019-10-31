global.localStorageProxy = new class{
	
	constructor(){
		this.isBlock = false;
	}
	
	block(){
		this.isBlock = true;
	}
	
	unblock(){
		this.isBlock = false;
	}
	
	isBlocked(){
		return this.isBlock;
	}
	
	setItem(key, val){
		if(this.isBlock)
			return;
		
		return localStorage.setItem(key, val);
		
	}
	
	removeItem(key){
		if(this.isBlock)
			return;
		
		localStorage.removeItem(key);
	}
	
	getItem(key){
		
		return localStorage.getItem(key);
		
	}
	
	
}