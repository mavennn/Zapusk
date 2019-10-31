module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){
		if(empty(this.body.email))
			return erJson('Your email?')
			
		if(empty(this.body.mess))
			return erJson('Message?')
			
		const text = `Форма обратной связи:
		
		Email: ${this.body.email}
		
		Text: ${this.body.mess}
		`
		
		await Telegram.info(text)
		
		return suJson('')
	}
	
	
}