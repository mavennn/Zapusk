global.FileCtrl = class{
	
	constructor(req,res,next){
		this.req = req;
		this.res = res;
		this.next = next;
		this.ags;
		this.extConstructor();
	}
	
	extConstructor(){
		
	}
	
	async run(...ags){
		this.ags = ags;
		try {
			let data = await this.exect();
			if(isJson(data)){
				let nana = ans(data)
				this.res.sendFile(nana.path,{headers: {'x-timestamp': Date.now(),'x-sent': true,'Content-Disposition':`attachment; filename=${nana.filename}`}});
			}else{
				this.res.send(ans(data));
			}
	    }
	    catch(e){
		   if(e instanceof JsonError)
		   		return this.res.send(e.json);
		   console.log(e);
	       return this.res.send(erJson('Техническая ошибка'));
	    }
	}
	
	exect(){
		
	}
	
	parseUser(){
		this.urlUser = this.req.url.split('/')[2];
	}
	
	
	
}