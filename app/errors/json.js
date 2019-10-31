var util = require('util');
JsonError = function(json) {
	
  Error.apply(this, arguments);
  Error.captureStackTrace(this, JsonError);
  this.name = json;
  this.json = json;
}

util.inherits(JsonError, Error);

JsonError.prototype.name = 'JsonError';

global.JsonError = JsonError;
