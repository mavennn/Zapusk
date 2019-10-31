import AppVue from './AppVue.js'
import Mpage from './Mpage.js'
import Modal from './Modal.js'
import Mfull from './Mfull.js'

export default new class{
	
	constructor(){
		
	}
	
	init(){
		this.initModal();
		this.initAppVue();
		this.initMpage();	
		this.initMfull();
		return Promise.resolve();
	}
	
	initAppVue(){
		App.AppVue = AppVue;
		AppVue.init();
	}
	
	initModal() {	
		App.Modal = Modal;
	}
	
	initMpage(){
		App.Mpage = Mpage;
	}
	
	initMfull(){
		App.Mfull = Mfull;
	}
		
}