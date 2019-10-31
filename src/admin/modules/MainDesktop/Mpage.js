export default new class{
	
	constructor(){
			
	}
	
	isOpened(){
		return App.AppVue.MainVue.$refs.mpage.$data.opened;
	}
	
	open(options){
		App.AppVue.MainVue.$refs.mpage.open(options);
	}
	getPages(){
		return App.AppVue.MainVue.$refs.mpage.$data.pages;
	}
	getCount(){
		return App.AppVue.MainVue.$refs.mpage.$data.counter;
	}
	closeAll({fast = false} = {}){
		App.AppVue.MainVue.$refs.mpage.closeAll({fast});
	}
	closeLast(){
		App.AppVue.MainVue.$refs.mpage.closeLast();
	}
	closePath({to, from, next}){
/*
		if(!this.isOpened())
			return false;
		
		this.closeLast();
		
		if(this.getCount()>0)
			return true;
*/
		
	}
}