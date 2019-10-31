let timer = (time) => {
	return new Promise(res=>{
		setTimeout(res, time*1000)
	})
}


export default new class{
	
	
	constructor(){
		
		this.loadedComponents = {};
		this.loadedComponentsResolve = {};
		this.loadedModules = {};
		
	}
	
	
	Component(name, recurse = 0){
		console.log('Load Component', name);
		if(!name)
			throw new Error('Load Component no name');
		
		if(this.loadedComponents[name] && !recurse)
			return this.loadedComponents[name];
		
		
		this.loadedComponents[name] = new Promise( res => {
			if(!this.loadedComponentsResolve[name] )
				this.loadedComponentsResolve[name] = res;
			this.loadedComponents[name] = import(`@Components/${name}.vue`).then(Comp=>{
				this.loadedComponents[name] = Promise.resolve(Comp.default);
				this.loadedComponentsResolve[name](Comp.default);
				this.loadedComponentsResolve[name] = false;
			}).catch(data=>{
				recurse++;
				console.warn(`Повторная загрузка ${name}`);
				if(recurse >= 3)
					this.loadedComponents[name] = Request.lostConnection().then(()=>{
						return this.Component(name, 1);
					})
				else
					this.loadedComponents[name] = this.Component(name, recurse);
				
				
				
			})
		})
		
		return this.loadedComponents[name];
		
	}
	
	ComponentLoading(name){
		Load.start();
		return this.Component(name).then(data=>{
			Load.stop();
			return data;
		})
	}
	
	Module(name){
		if(!name)
			throw new Error('Load Component no name');
		
		if(this.loadedModules[name])
			return this.loadedModules[name];
		
		this.loadedModules[name] = import(`@Modules/${name}`).then(data=>{
			this.loadedModules[name] = data.default;
			return this.loadedModules[name];
		})
		
		return this.loadedModules[name];
		
	}
	
	
	
	
	
}