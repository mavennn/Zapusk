require('../../../app');

module.exports = class extends AbstractCtrl{
	
	extConstructor(){
		this.body = this.req.body;
		this.email = this.body.email
	}
	
	//run - запускатьт
	//exect - реализация
	
	async exect(){
		
		if(!this.email)
			return erJson('Error')
		let user = await userModel.findOne({email: this.email})

		if (!user)
			return erJson('Sorry, but user not found')

			this.tmplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
			<meta name="viewport" content="width=device-width" />
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title></title>
			</head>
			<body style="margin:0px; background: #f8f8f8; ">
			<div width="100%" style="background: #f8f8f8; padding: 0px 0px; font-family:arial; line-height:28px; height:100%;  width: 100%; color: #514d6a;">
			<div style="max-width: 700px;  margin: 0px auto; font-size: 14px">
				<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
				</table>
				<div style="padding: 40px; background: #fff;">
				<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
					<tbody>
					<tr>
						<td><b>Dear, ${user.name}</b>
						<p>You requested a password reset. Your login details.</p>
						<p><b>Login:</b> ${user.ids}</p> 
						<p><b>PIN:</b> ${user.pin}</p>
					</td>
					</tr>
					</tbody>
				</table>
				</div>
			</div>
			</div>
			</body>
			</html>`
		await Mail.send({to: user.email, html: this.tmplate})

		return suJson('Login information sent to your email');
	}
	
	
}