module.exports = {
	
	isAdmin(req, res, next){
		
		if(!req.User)
			return res.send(erJson('invalid_token'));
		if(req.User.permission != 'admin')
			return res.send(erJson('permission_denied'));
		next();
	},
}