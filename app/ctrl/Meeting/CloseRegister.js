require('../../../app');

module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.speakerId = this.req.body.speakerId;
		this.day = this.req.body.day
		this.user = this.req.User
	}
	
	//run - запускатьт
	//exect - реализация
	// если записалось больше 10, тогда назначаем всем время и закрываем запись
	// если записалось меньше, тогда ставим статус 3 - waiting, назначаем всем время
	async exect(){
		if (!this.user) 
			return erJson('Not authorized')

		if (this.user.permission != 'admin')
			return erJson('Admin?')

		return await meetingManager.setScheduleRecord({speakerId: this.speakerId, day: this.day})
	}
	
	
}