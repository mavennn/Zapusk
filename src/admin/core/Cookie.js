global.Cookies = new function(){
	
	this.get = function(name) {
		if(empty(name))
			return undefined;
	  var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	
	// options - объект с свойствами cookie (expires, path, domain, secure)
	this.set = function(name, value, options) {
	  options = options || {domain: location.host, path:'/'};
	
	  var expires = options.expires;
	
	  if (typeof expires == "number" && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires * 1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }
	
	  value = encodeURIComponent(value);
	
	  var updatedCookie = name + "=" + value;
	
	  for (var propName in options) {
	    updatedCookie += "; " + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }
	
	  document.cookie = updatedCookie;
	}
	
	this.delete = function(name) {
	  setCookie(name, "", {
	    expires: -1
	  })
	}	
}
