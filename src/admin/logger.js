/*
global.UserBrowser = (() => {
    var ua = navigator.userAgent;

    var bName = function () {
        if (ua.search(/Edge/) > -1) return "edge";
        if (ua.search(/MSIE/) > -1) return "ie";
        if (ua.search(/Trident/) > -1) return "ie11";
        if (ua.search(/Firefox/) > -1) return "firefox";
        if (ua.search(/Opera/) > -1) return "opera";
        if (ua.search(/OPR/) > -1) return "operaWebkit";
        if (ua.search(/YaBrowser/) > -1) return "yabrowser";
        if (ua.search(/Chrome/) > -1) return "chrome";
        if (ua.search(/Safari/) > -1) return "safari";
        if (ua.search(/Maxthon/) > -1) return "maxthon";
    }();

    var version;
    switch (bName) {
        case "edge":
            version = (ua.split("Edge")[1]).split("/")[1];
            break;
        case "ie":
            version = (ua.split("MSIE ")[1]).split(";")[0];
            break;
        case "ie11":
            bName = "ie";
            version = (ua.split("; rv:")[1]).split(")")[0];
            break;
        case "firefox":
            version = ua.split("Firefox/")[1];
            break;
        case "opera":
            version = ua.split("Version/")[1];
            break;
        case "operaWebkit":
            bName = "opera";
            version = ua.split("OPR/")[1];
            break;
        case "yabrowser":
            version = (ua.split("YaBrowser/")[1]).split(" ")[0];
            break;
        case "chrome":
            version = (ua.split("Chrome/")[1]).split(" ")[0];
            break;
        case "safari":
            version = (ua.split("Version/")[1]).split(" ")[0];
            break;
        case "maxthon":
            version = ua.split("Maxthon/")[1];
            break;
    }

    var platform = 'desktop';
    if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';

    var browsrObj;

    try {
        browsrObj = {
            platform: platform,
            browser: bName,
            versionFull: version,
            versionShort: version.split(".")[0]
        };
    } catch (err) {
        browsrObj = {
            platform: platform,
            browser: 'unknown',
            versionFull: 'unknown',
            versionShort: 'unknown'
        };
    }

    return browsrObj;
})()





global.Logger = new function(){
	//alert('hi');
	this.arSave = [];
	this.saveRecord = false;
	
	this.sendLogs = function() {
		this.post('https://logger.antimarket24.ru/log/add', {log: this.arSave});
		this.arSave = [];
		this.saveRecord = false;
	}
	
	this._addLog = function({logName = 'без имени', log = '', type = 'error', module = false} = {}){
		if (!global.App || global.App.Config.dev())
			return;	
		let arAdd = {
			logName: logName,
			log: log,
			type: type,
			region: Region.regionID,
			user: {
				id: User.getID() || false,
				sid: localStorage.getItem('sid') || false
			},
			date: new Date().toISOString(),
			module: module,
			browser: UserBrowser,
			host: 'front'
		}
		this.arSave.push(arAdd);
		if (this.saveRecord)
			return;
		timer(5).then(() => this.sendLogs());
		this.saveRecord = true;
	}


	this.errorLog = function(arParams) {
		arParams.type = 'error';
		this._addLog(arParams);
	}
	
	this.warningLog = function(arParams) {
		arParams.type = 'warning';
		this._addLog(arParams);
	}
	
	this.infoLog = function() {
		arParams.type = 'info';
		this._addLog(arParams);
	}
	
	this.post = function(url, body){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true)
		xhr.setRequestHeader("Content-Type", "application/json");
		let test = toJson(body);
		xhr.send(test);
	}
	window.onerror = (message, source, lineno, colno, error) => {
		this.errorLog({logName: 'JS Uncaught Error', log: message});	
	}
	

}
*/
