global.mongoose = require('mongoose');
let connection = mongoose.connect('mongodb://' + config.get('db.host') + ':' + config.get('db.port') + '/' + config.get('db.name') + '' , { useNewUrlParser: true });
mongoose.Promise = global.Promise;
global.Float = require('mongoose-float').loadType(mongoose);

global.Schema = new Proxy(function(){},{
  construct(target, ags){
	ags[1] = ags[1] || {};
	ags[1].usePushEach = true; 
    return new mongoose.Schema(...ags);
  },
  get(target, property){
	  return mongoose.Schema[property];
  }
});


//mongoose.set('debug', true);