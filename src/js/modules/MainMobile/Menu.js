export default new class{
	
	constructor(){
		
	}
	isOpened(){
		return App.AppVue.MainVue.$refs.menu.$data.opened;
	}
	open(){
		App.AppVue.MainVue.$refs.menu.open();
	}
	close(){
		App.AppVue.MainVue.$refs.menu.close();
	}	
	
}