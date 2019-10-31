var xlsx = require('node-xlsx')
global.tagsManager = new class{

	constructor(){
		this.country
		this.role
		this.wsrProducts
		this.partnershipMode
		this.industry
		this.bestPractice
		this.tagsById
		this.tags
		this.tagsFile = `${rootPath}/file/tags.xls`
	}

	async init() {
		this.tags = await tagsModel.find()
		this.tagsById = this.tags.byKey('_id')
		this.country = this.tags.filter(v => v.type == 'country')
		this.role = this.tags.filter(v => v.type == 'role')
		this.partnershipMode = this.tags.filter(v => v.type == 'partnershipMode')
		this.industry = this.tags.filter(v => v.type == 'industry')
		this.bestPractice = this.tags.filter(v => v.type == 'bestPractice')
		this.wsrProducts = this.tags.filter(v => v.type == 'wsrProducts')
	}

	addToCache(tag) {
		this.tags.push(tag)
		this.tagsById[tag._id] = tag
	}
	
	async create({name, type, weight, hidden = false}){
		if (empty(name))
			return erJson('name?')
		
		if (empty(type))
			return erJson('type?')
		
		if (empty(weight))
			return erJson('weight?')
	
		let params = {
			name,
			type,
			weight,
			hidden,
		}
		
		let tags = await tagsModel.create(params);
		this.addToCache(tags)
		return suJson(tags);
	}

	async loadTags(){
		var file = xlsx.parse(this.tagsFile)[0].data; // парсим 1ый лист
		if (!file[0]){ 
			return erJson("Нечитаемый файл")
		}
		
		file.splice(0,1)[0]
		for(let item of file){
			if(item[1]){
				let tag = {
					type: item[0],
					name: item[1],
					weight: 1,
					hidden: false,
				}
				let ch = await this.checkTags(tag.name);
				if(!ch){
					let us = await this.create(tag);
					console.log(us);
				}else{
					console.log("Уже создан");
				}
			}
		}

	}

	async checkTags(name) {
		if (!empty(this.tags.filter(val => val.name == name)))
			return true
		else
			return false
	}

	getTagById(id) {
		return this.tagsById[id]
	}
}
