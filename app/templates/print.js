global.templates.print = class {
	
	constructor(req,res){
		this.req = req;
		this.res = res;
		this.id = req.params.id
		this.layout = 'print';
	}
	
	setTitle(title){
		this.title = title;
		return this;
	}
	
	setDescription(description){
		this.description = description;
		return this;
	}
	
	async render(page, options = {}){
		options = await this.completeOptions(options);
		this.res.render(page, options);
	}
	
	async completeOptions(options = {}){
		options.layout = this.layout;
		let user = await userModel.findOne({_id: this.id})
		console.log(user)
		let country
		if( user.country){
			country = await tagsManager.getTagById(user.country)
		if (country) {
			options.country_name = (user.city ? user.city + ', ' : '') + (!empty(country.name) ? country.name : '')
		} else 
			options.country_name = ''
		} 
		options.user = user
		return options;
	}
	
	async renderToString(page, options = {}){
		options = this.completeOptions(options);
		let data = await hbs.render(default_views_dir + '/' + page + '.hbs', options);
		return data;
	}
	
}