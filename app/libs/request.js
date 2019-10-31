/*
	
	Example
	Request.postJson( url, arPost ).send();
	
*/


var rp = require('request-promise');

global.Request = class{
	
	
	constructor(url){
		
		this.url = url;
		this.type = 'GET'; // POST/GET
		this.arPost;
		this.useCert;
		this.jsonAns = true;
		this.retry = false;
		this.tryLimit = 30;
		this.timeWait = 1;
		this.onRetryError;
		
	}
	
	static postJson(url, arPost){
		
		let Req = (new Request(url)).setPost(arPost);
		return Req;
	}
	
	static getJson(url){
		
		let Req = (new Request(url));
		return Req;
	}
	
	setRetry({limit = this.tryLimit} = {}, cb){
		this.retry = true;
		this.tryLimit = limit;
		
		if(cb)
			this.onRetryError = cb;
		
		return this;
	}
	
	
	async send(){
		
		let options = {
			method: this.type,
			uri: this.url,
		}
		if(this.type == 'POST')
			options.body = this.arPost;
		
		if(this.jsonAns)
			options.json = true;
		
		let data;
		
		try{
			data = await this.sendExec(options);
		}catch(e){
			data = e;
		}
		
		if(!this.jsonAns)
			return data;
		
		if(data instanceof JsonError)
			return erJson(data.json);
		
		if(data.name == 'StatusCodeError')
			return erJson(data.statusCode);
		
		return data;
		
	}
	
	async sendExec(options, { count = 0 } = {} ){
		if(!this.retry)
			return rp(options);
		
		
		for(let count = 0; count < this.tryLimit; count++  ){
			
			if(count > 0){
				await timer(this.timeWait);
			}
			try{
				let data = await rp(options);
				return data;
			}catch(data){
				if(data.statusCode == 502)
					continue;
				else
					throw data;
			}
		}
		
		if(this.onRetryError)
			this.onRetryError();
		throw new JsonError('not_available');
		
	}
	
	
	setPost(arPost = {}){
		
		this.type = 'POST';
		this.arPost = arPost;
		
		return this;
		
	}
	
	
	
	
	
}