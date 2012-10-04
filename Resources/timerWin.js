/**
 * @author Nomura Takahisa
 */
var started = new Date().getTime();
var bStartedTimer = false;
var timerId = 0;
var pauseTime = 0;
var endFlag = false;
var alarmData = [];
var Util = require('Util');
var util = new Util();

// 設定時間のリセット。設定ウインドウで設定された時間を設定し直す
var getSettingTime = function(){
 	var settingTime = Ti.App.Properties.getInt('settingTime');	
 	Titanium.API.info('settingTime:' + settingTime);
 	Titanium.API.info('hazprop'+Ti.App.Properties.hasProperty('settingTime'));
	if(!settingTime){
		settingTime = new Date( 10 * 60 * 1000);
	}else{
		settingTime = new Date(settingTime*1000);
	}
	
	// アラーム情報セット
	var db = Titanium.Database.open('mydb');
	db.execute('CREATE TABLE IF NOT EXISTS D_ALARM (ALARM_DATE INTEGER, VALID BOOL)');	
	var rows = db.execute('SELECT * FROM D_ALARM');
	var i=0;
	while(rows.isValidRow()){
		Titanium.API.info('ARAMA DATE=' + rows.fieldByName('alarm_date') + 'FLAG' +  rows.fieldByName('valid'));
		alarmData[i] = {flag:false, time:new Date(rows.fieldByName('alarm_date'))};
		rows.next();
		i++;
	}		
	rows.close();
	db.close();
	//alarmData = [{flag:false,time:new Date(9*60*1000)},{flag:false, time:new Date(8*60*1000)}];
	return settingTime;
}
var settingTime = getSettingTime();

var win = Titanium.UI.createWindow({
	title : 'タイマー',
	//backgroundColor : '#fff',
	backgroundImage : 'images/TiBgImage.png'
});

var label1 = Titanium.UI.createLabel({
	color : '#999',
	text : util.dateToStr(settingTime),
	font : {
		fontSize : 60,
		fontFamily : 'Helvetica Neue'
	},
	height : '80dp',
	textAlign : 'center',
	top : '100dp',
	width : Titanium.UI.SIZE
});

var startBt = Titanium.UI.createButton({
	title : 'スタート',
	top : util.windowHeight - 44 * 3 - 22 + 'dp',
	height : '44dp',
	width : '264dp'
});

Ti.API.info(util.windowHeight - 44 * 3);
var resetBt = Titanium.UI.createButton({
	title : 'リセット',
	top : util.windowHeight - 44 * 2 + 'dp',
	height : '44dp',
	width : '264dp'
});

var updateTimer = function() {
	var elTime = settingTime-(new Date().getTime() - started + pauseTime);
	//var elTime = new Date(settingTime-(new Date().getTime() - started + pauseTime));
	if(elTime <= 0){
		elTime = 0;
		if(!endFlag){
			endFlag = true;
			Ti.API.info("BOOO!");	
		}		
	}	
	
	for(var i=0; i < alarmData.length; ++i){
		if(!alarmData[i].flag && elTime <= alarmData[i].time.getTime()){
			Ti.API.info(i + ":BOOO!");
			alarmData[i].flag = true;
		}
	}

	label1.text = util.dateToStr(new Date(elTime));
};

startBt.addEventListener('click', function(e) {
	// タイマーが動作しているか判定して、しかるべき処理をする
	if(bStartedTimer) {
		pauseTime += new Date().getTime() - started;
		Titanium.API.info(pauseTime);
		clearInterval(timerId);
		startBt.title = 'スタート';
		bStartedTimer = false;
	} else {
		started = new Date();
		timerId = setInterval(updateTimer, 10);
		startBt.title = 'ストップ';
		bStartedTimer = true;
	}

});

resetBt.addEventListener('click', function(e) {
	pauseTime = 0;
	started = new Date();
	settingTime = getSettingTime();
	label1.text = util.dateToStr(settingTime);
	endFlag = false;
});

win.add(startBt);
win.add(resetBt)
win.add(label1);

exports.win = win;
