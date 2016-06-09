var ua = window.navigator.userAgent.toLowerCase();
var detector = (function(){
	var ToBeDetect = [
		{property:'isIphone',keyword:'iphone'},
		{property:'isAndroid',keyword:'android'},
		{property:'isChrome',keyword:'chrome',exclude:'chromium'},
		{property:'isFirefox',keyword:'firefox',exclude:'seamonkey'},
		{property:'isSafari',keyword:'safari',exclude:'chrome'},
		{property:'isIE',keyword:'msie'}
	];

	var result = {};
	// （funtion(){ToBeDetect.forEach(UADetector);}）();
	(function(){
		ToBeDetect.forEach(UADetector);
	})();

	function printInfo(){
		console.log(result);
	}

	function UADetector(item){
		var property  = item.property,
			keyword = item.keyword,
			exclude = item.exclude;
		if(ua.indexOf(keyword) > -1 && ua.indexOf(exclude) === -1){
			result[property] = true;
		}else{
			result[property] = false;
		}
	}

	return{
		printInfo:printInfo,
		result:result
	}
})();

//detector.printInfo();

module.exports = detector;