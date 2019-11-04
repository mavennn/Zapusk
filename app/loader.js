

module.exports = new class {
	
	constructor(){
		
	}
	
	Component(name){
		srequire(`app/components/${name}/index.js`);
	}
	
	Controllers(){
		
		this.Class('AbstractCtrl');
		this.Class('FileCtrl');
		
		global.controllers = {};
		let arCtrl = fs.readdirSync(`${rootPath}/app/ctrl/`);
		
		arCtrl.forEach(name => {
			let cname = name.substr(0, name.length - 3);
			if(fs.lstatSync(`./ctrl/${name}`).isDirectory()){
				global.controllers[name] = {};
				fs.readdirSync(`${rootPath}/app/ctrl/${name}`).forEach(sname => {
					global.controllers[name][( sname.substr(0, sname.length - 3) )] = srequire(`app/ctrl/${name}/${sname}`);
				})
				return;
			}
			
			if(name.substr(-3)!='.js')
				return
			
			global.controllers[cname] = srequire(`app/ctrl/${name}`);
			
		})
	}
	
	Templates(name){
		global.templates = {};
		let arCtrl = fs.readdirSync(`${rootPath}/app/templates/`);
		arCtrl.forEach(name => {
			srequire(`app/templates/${name}`);
		})
	}
	
	Middleware(name){
		return srequire(`app/middleware/${name}.js`);
	}
	
	Errors(name){
		srequire(`app/errors/${name}.js`);
	}
	
	Lib(name){
		srequire(`app/libs/${name}.js`);
	}
	
	Route(name){
		srequire(`app/routes/${name}.js`);
	}
	
	Class(name){
		srequire(`app/class/${name}.js`);
	}
	
	Models(name){
		global.ctrls = {};
		let arCtrl = fs.readdirSync(`${rootPath}/app/models/`);
		arCtrl.forEach(name => {
			srequire(`app/models/${name}`);
		})
		
	}
	
}