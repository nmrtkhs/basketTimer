/**
 * @author Nomura Takahisa
 */
var started = new Date().getTime();
var bStartedTimer = false;
var timerId = 0;
var pauseTime = 0;

// 設定時間のリセット。設定ウインドウで設定された時間を設定し直す
var getSettingTime = function(){
 	var settingTime = Ti.App.Properties.getInt('settingTime');	
	if(!settingTime){
		settingTime = new Date( 10 * 60 * 1000);
	}
	return settingTime;
}

var settingTime = getSettingTime();

var dateToStr = function(fromDate) {
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

var win = Titanium.UI.createWindow({
	title : 'タイマー',
	//backgroundColor : '#fff',
	backgroundImage : 'images/TiBgImage.png'
});

var label1 = Titanium.UI.createLabel({
	color : '#999',
	backgroundColor : '#fcc',
	text : dateToStr(settingTime),
	font : {
		fontSize : 60,
		fontFamily : 'Helvetica Neue'
	},
	height : '80dp',
	textAlign : 'center',
	top : '10dp',
	width : 'auto'
});

var startBt = Titanium.UI.createButton({
	title : 'start',
	top : '200dp',
	height : '30dp',
	width : '100dp'
});

var resetBt = Titanium.UI.createButton({
	title : 'reset',
	top : '300dp',
	height : '30dp',
	width : '100dp'
});

var updateTimer = function() {
	var elTime = new Date(settingTime-(new Date().getTime() - started + pauseTime));

	label1.text = dateToStr(elTime);
};

startBt.addEventListener('click', function(e) {
	// タイマーが動作しているか判定して、しかるべき処理をする
	if(bStartedTimer) {
		pauseTime += new Date().getTime() - started;
		Titanium.API.info(pauseTime);
		clearInterval(timerId);
		startBt.title = 'start';
		bStartedTimer = false;
	} else {
		started = new Date();
		timerId = setInterval(updateTimer, 10);
		startBt.title = 'stop';
		bStartedTimer = true;
	}

});

resetBt.addEventListener('click', function(e) {
	pauseTime = 0;
	started = new Date();
	settingTime = getSettingTime();
	label1.text = dateToStr(settingTime);
});

win.add(startBt);
win.add(resetBt)
win.add(label1);

exports.win = win;
