let empty = function (data){ if(data===null) return true; if(data===undefined) return true; if(data=='') return true; if(data==0) return true; if (typeof data == 'object') { for (var property in data) return false; return true;}return false;}


/*
	NJ_HOST_PORT
	NJ_MODE
	NJ_DB_HOST
	NJ_DB_PORT
	NJ_DB_NAME
*/

global.config = new class{
	
	constructor(){
		
		
		
		this.config = {};
		let path = rootPath + '/config/default.json';
		if (fs.existsSync(path))
		    this.config = require(path);
		
		//this.marketConf = require(this.config.market_file);
		
		this.modulesCofig();
		this.loadEnv();
		
	}
	
	get(path){
		
		try{
			let lastVal = this.config;
			path.split('.').forEach(val=>{
				lastVal = lastVal[val];
			})
			return lastVal;
		}catch(e){
			return undefined;
		}
		
	}
	
	modulesCofig(){

		this.modulesUrl = {
			admin: 'admin.' + this.market('url'),
			front:  this.market('url'),
			base: 'base.' + this.market('url'),
		};
		
		let path = rootPath + '/config/modules.json';
		if (!fs.existsSync(path))
			return;
		
		let arModulesModifid = require(path);
		
		Object.keys(arModulesModifid).map((key, index)=>{
			this.modulesUrl[key] = arModulesModifid[key];
		});

	}
	
	
	url(module, url, region = false){
		if(this.modulesUrl[module] == undefined)
			throw new Error('Неверно задано название модуля');
		return 'http://' + (region ? `r${region}-` : '' ) + this.modulesUrl[module] + url;
	}
	
	module(name, url){
		
	}
	
	dev(){
		return (this.config.mode=='dev');
	}
	
	prod(){
		return (this.config.mode!='dev');
	}
	
	loadEnv(){
		
		let env = process.env;
		
		if(!empty(env.NJ_HOST_PORT)){
			if(empty(this.config.host))
				this.config.host = {};
			this.config.host.port = env.HOST_PORT;
		}
		
		if(!empty(process.env.NJ_MODE))
			this.config.mode = env.NJ_MODE;
		
		if(empty(this.config.db))
			this.config.db = {};
		
		if(!empty(env.NJ_DB_HOST))
			this.config.db.host = env.NJ_DB_HOST;
		
		if(!empty(env.NJ_DB_PORT))
			this.config.db.port = env.NJ_DB_PORT;
		
		if(!empty(env.NJ_DB_NAME))
			this.config.db.db_name = env.NJ_DB_NAME;
		
	}
	
	market(path){
		
		try{
			let lastVal = this.marketConf;
			path.split('.').forEach(val=>{
				lastVal = lastVal[val];
			})
			return lastVal;
		}catch(e){
			return undefined;
		}
		
	}
	
}

global.url = new Proxy({}, {
    get(target, propKey){
        return function(url, region = false){
	    	return config.url(propKey, url, region);
        }
    }
}); 


