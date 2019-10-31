export default new class{
	constructor(){
		
	}
	open(options){
		return new Promise((res, rej) => {
			options.prom = {res, rej};
			App.AppVue.MainVue.$refs.modal.open(options);
		})	
	}
	close(){
		App.AppVue.MainVue.$refs.modal.close();
	}
	closePath(){
		return false		
	}
}