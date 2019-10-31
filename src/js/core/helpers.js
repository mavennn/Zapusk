import swal from 'sweetalert2'
global.swal = swal;

global.empty = function(data){
	if(data===null)
		return true;
	if(data===undefined)
		return true;
	if(data=='')
		return true;
	if(data==0)
		return true;
	if (typeof data == 'object') {
		for (var property in data)
        	return false;
		return true;
	}
	return false;
}

global.getObjectValues = function(Obj){
	let arVals = [];
	foreach(Obj, (key, val)=>{
		arVals.push(val);
	})
	return arVals;
}

global.isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

global.round = function(numb, pp = 0){
	pp = Math.pow(10, pp);
	return  Math.round(numb*pp)/pp;
}

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

Array.prototype.byKey = function(byKey = 'id'){
	let obj = {};
	this.forEach(val=>{
		obj[val[byKey]] = val;
	})
	return obj;
}

global.cut = function(val, length){
	if (empty(val))
		return;
	var sliced = val.slice(0, +length);
	if (sliced.length < val.length) {
		sliced += '...';
	}
	return sliced;
}

global.genToken = function(type = 'number',conut = 12){
	var result = '';
	var words;
	if(type=='number')
		words = '123456789';
	else
		words = '123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	var max_position = words.length - 1;
		for(let i = 0; i < conut; ++i ) {
			var position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
	return result;
}


global.timer = function(time){
	return new Promise(resolve => {
		setTimeout(()=>resolve(), time*1000);
	})
}



global.foreach = function(object,callback){
	Object.keys(object).map(function(objectKey, index) {
	    callback(objectKey,object[objectKey]);
	});
}

global.toRouteTest = function(link) {
	App.Router.push(link);
}

global.errorSwal = function (logName = false, moreOptions = {}){
	return function(data){
		Load.stop();
		if(typeof data!= 'string'){
			swal('Ошибка','Техническая ошибка','error');
			console.error('Ошибка', data);
		} else 
			swal('Ошибка', data, 'error');
		if (logName) {	
			let arLog = {logName: logName, log:data};
			if (moreOptions) {
				foreach(moreOptions, (key,val)=>{
					arLog[key] = val;
				})
			}
//			Logger.errorLog(arLog);
		}
	}
}

global.erJson = function(data, logName = false, moreOptions = false){ return {TYPE:'ERROR',ANS:data};}
global.suJson = function(data){ return {TYPE:'SUCCESS',ANS:data};}
global.isJson = function(data){ return (data.TYPE=='SUCCESS'?true:false)}
global.ans = function(data){ return data.ANS }
global.toJson = function(data){ return JSON.stringify(data) }
global.parseJson = function (json, defaultVal = false){
	try{
		json = JSON.parse(json);
	}catch(err){
		return defaultVal;
	}
	return json;
}
global.toBase64 = function(file){
	return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
	});
}


global.getVal = function(lastVal, path) {
	try {
		path.split('.').forEach(val => {
			lastVal = lastVal[val];
		})
		return lastVal;
	} catch(e) {
		return undefined;
	}
}


global.Load = new function() {
	this.count = 0;
	this.start = function() {
		if (this.count == 0) {
			//document.querySelector('#loader').classList.remove('hidden');
			//document.querySelector('#loader_back').classList.remove('hidden');
		}
		this.count++;
	}
	this.stop = function(){
		this.count--;
		if (this.count < 0)
			this.count = 0;
		if (this.count == 0) {
			//document.querySelector('#loader').classList.add('hidden');
			//document.querySelector('#loader_back').classList.add('hidden');
		}
		
	}
}

global.scrollToTopAnimate = function(scrollDuration) {
    const scrollHeight = window.scrollY,
    	  scrollStep = Math.PI / ( scrollDuration / 15 ),
		  cosParameter = scrollHeight / 2;
	var scrollCount = 0,
    	scrollMargin,
		scrollInterval = setInterval( function() {
	        if ( window.scrollY != 0 ) {
	        scrollCount = scrollCount + 1;  
	        scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
	        window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
	    } 
	    else clearInterval(scrollInterval); 
	}, 15 );
}


global.isNanDef = function(num, def = 0){
	num = Number(num);
	if(isNaN(num))
		return def;
	return num;
}

global.compareInterval = function(a, b) {
	var dateA = a.tsm.split('_');
	var dateB = b.tsm.split('_');
	if (dateA[0] > dateB[0])
		return 1;
	else if (dateA[0] == dateB[0])
			var a = new Date(dateA[1]);
			var b = new Date(dateB[1]);
			if (a > b)
				return 1;
	else
		return -1;
}

global.ObjectEquals = function( firstObj, secondObject ){
    if ((null==firstObj)||(null==secondObject)) return false;
    if (('object'!=typeof firstObj) && ('object'!=typeof secondObject))  return firstObj==secondObject;
    else if (('object'!=typeof firstObj) || ('object'!=typeof secondObject)) return false;
    if ((firstObj instanceof Date) && (secondObject instanceof Date)) return firstObj.getTime()==secondObject.getTime();
    else if ((firstObj instanceof Date) && (secondObject instanceof Date)) return false;

    var keysFirstObj = Object.keys( firstObj );
    var keysSecondObject = Object.keys( secondObject );
    if ( keysFirstObj.length != keysSecondObject.length ) {return false;}
    return !keysFirstObj.filter(function( key ){
        if ( typeof firstObj[key] == "object" ||  Array.isArray( firstObj[key] ) ) {
            return !Object.equals(firstObj[key], secondObject[key]);
        } else {
            return firstObj[key] !== secondObject[key];
        }
    }).length;
}

global.getJsonLoad = (url) => {
	Load.start();
	Request.getJson(url)
	.then(data => Load.stop())
	.catch(requestError)
}
global.isPositiveNumber = (data) => {
	return isNumber(data) && data >= 0;
}
global.postJsonLoad = (url, data, params) => {
	Load.start();
	Request.postJson(url, data, params)
	.then(data => Load.stop())
	.catch(requestError)
}

global.requestError = data => {	
	Load.stop();
	if(typeof data == 'string')
		return swal('Ошибка', data, 'error');
	swal('Ошибка', 'Техническая ошибка', 'error');
	console.error('requestError Ошибка',data);
}

global.cookieParse = () => {
	return document.cookie.split('; ').map(val=>val.split('=')).reduce((cur, val) => ((cur[val[0]] = val[1]) && cur), {});
}

global.getCorrectPhone = function(phone){
	if(phone.substr(0,3)=='+7 ')
		phone = phone.substr(3)
	phone = phone.replace(/\D+/g,"");
	var phoneStr = '+7 ';
	phone = phone.split('');
	phone.forEach(function(val,key){
		switch(key) {
		  case 0: phoneStr+='('; break;
		  case 3: phoneStr+=') '; break;
		  case 6: phoneStr+=' - '; break;
		}
		if(key>9)
			return;
		phoneStr+=val;
	})
	return phoneStr;
}





global.copyToRam = function(str){

	let tmp   = document.createElement('INPUT'),
	focus = document.activeElement;
	
	tmp.value = str;
	
	document.body.appendChild(tmp);
	tmp.select();
	document.execCommand('copy');
	document.body.removeChild(tmp);
	focus.focus();
	swal('Успешно', 'Название файла скопировано в буфер обмена', 'success');

}


global.swalAsk = (title = 'Подтверждение', text = '', {yes = 'Да', no = 'Нет'} = {}) => {
	
	return swal({
	  title,
	  text,
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonText: yes,
	  cancelButtonText: no,
	}).then( result => (result.value ? '' : Promise.reject()))
	
}


