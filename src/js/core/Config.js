global.Config = new class{
	
	constructor(){
		
		this.host;
		this.token;
		this.nodeServer;
		this.mode = global.moduleMode;
		this.modulesUrl = global.modulesUrl;
		this.host = 'm2';
		this.nodeServer = '';
			
	}
	
	url(module, url = '', region = false){
		if(this.modulesUrl[module] == undefined)
			console.error('Неверно задано название модуля');
		return 'http://' + (region ? `r${region}-` : '') + this.modulesUrl[module] + url;
	}

	dev(){
		return (this.mode == 'dev');
	}

	prod(){
		return (this.mode != 'dev');
	}
		
}