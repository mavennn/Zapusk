global.templates.login = class {
	
	constructor(req,res){
		this.req = req;
		this.res = res;
		this.layout = 'login';
		this.modules_url = {
			auth: config.modulesUrl.auth
		};
	}
	
	setTitle(title){
		this.title = title;
		return this;
	}
	
	setDescription(description){
		this.description = description;
		return this;
	}
	
	render(page, options = {}){
		options = this.completeOptions(options);
		this.res.render(page, options);
	}
	
	completeOptions(options = {}){
		options.layout = this.layout;
		options.modules_url = toJson(this.modules_url);
		options.mode = config.get('host.env');
		return options;
	}
	
	async renderToString(page, options = {}){
		options = this.completeOptions(options);
		let data = await hbs.render(default_views_dir + '/' + page + '.hbs', options);
		return data;
	}
	
}