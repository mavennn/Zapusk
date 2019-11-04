console.time('appstart')
const path = require('../app');
global.fs = require('fs');
require('./helpers.js');

srequire('config/index.js');
global.Load = srequire('app/loader.js');
global.rp = require('request-promise');
global.sharp = require('sharp');
global.moment = require('moment');
global.crypto = require('crypto');
moment.locale('ru');

Load.Errors('json');

Load.Lib('mongo');
Load.Lib('http');
Load.Lib('handlebars');
Load.Lib('request');
Load.Lib('autoincrement');
Load.Lib('nodemailer');
Load.Class('Mail');

Load.Component('Auth');
Load.Component('Tags');
Load.Component('Schedule');
Load.Component('Meeting');
Load.Component('Requests');


Load.Controllers();
Load.Templates();

Load.Route('index');


global.App = new class{
	
	constructor(){
		
	}
	
	async init(){
		await HttpServer.listern(config.get('host.port'))
		await tagsManager.init()
		await UserManager.init()
		console.timeEnd('appstart')
		console.log('listening on *:' + config.get('host.port'));
	}
}

App.init();
