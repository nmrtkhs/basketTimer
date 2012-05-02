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

module.exports = Util;
