function Util() {
};

Util.prototype.dateToStr = function(fromDate) {
	var msec = Math.floor(fromDate.getMilliseconds() / 10);
	if(msec < 10)
		msec = '0' + msec;

	var sec = fromDate.getSeconds();
	if(sec < 1)
		sec = '00';
	else if(sec < 10)
		sec = '0' + sec;

	var min = fromDate.getMinutes();
	if(min < 1)
		min = '00';
	else if(min < 10)
		min = '0' + min;

	return min + ':' + sec + ':' + msec;
};

Util.prototype.windowHeight = Titanium.Platform.displayCaps.platformHeight - 44 - 48 - 20;
Util.prototype.windowWidth = Titanium.Platform.displayCaps.platformWidth;

module.exports = Util;
