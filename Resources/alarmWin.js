/**
 * @author Nomura Takahisa
 */

// 初期化
function AlarmWin() {
	var isEdit = false; // 編集中かどうか
	var alarmData = [];
	var Util = require('Util');
	var util = new Util();
	
	var init = function() {
		// SQLiteでデータを取ってきて、もしなければ初期データをいれる
		Titanium.API.info('好きでよかった');
		var db = Titanium.Database.open('mydb');
		db.execute('CREATE TABLE IF NOT EXISTS D_ALARM (ALARM_DATE INTEGER, VALID BOOL)');

		var rows = db.execute('SELECT * FROM D_ALARM');
		// もしデータがはいってなかったらデータをいれる
		if(!rows.isValidRow()) {
			Titanium.API.info('きー');
			db.execute('INSERT INTO D_ALARM (ALARM_DATE,VALID) VALUES(?,?)', 60 * 9 * 1000, false);
			Titanium.API.info('DateInsert');
		} else {
			Titanium.API.info('ほいさっさ');
			var i=0;
			while(rows.isValidRow()) {
				Titanium.API.info('ARAMA DATE=' + rows.fieldByName('alarm_date') + 'FLAG' + rows.fieldByName('valid'));
				alarmData[i] = {flag:rows.fieldByName('valid'), time:new Date(rows.fieldByName('alarm_date'))};
				rows.next();
				++i;
			}
		}

		rows.close();
		db.close();
	}();

	var self = Titanium.UI.createWindow({
		title : 'アラーム',
		backgroundColor : '#fff'
	});

	// var label1 = Titanium.UI.createLabel({
	// color:'#999',
	// text:'I am Window 2',
	// font:{fontSize:20,fontFamily:'Helvetica Neue'},
	// textAlign:'center',
	// width:'auto'
	// });
	var rowData = [];

	// var row1 = Ti.UI.createTableViewRow({
		// height : 50
	// });
	// var sw1 = Ti.UI.createSwitch({
		// right : 10,
		// value : false
	// });
	// row1.add(sw1);
// 
	// var button1 = Ti.UI.createButton({
		// //style: Ti.UI.iPhone.SystemButton.DISCLOSURE,
		// left : 10
	// });
	// //row1.add(button1);
	// row1.className = 'control';
	// var row2 = Ti.UI.createTableViewRow({
		// height : 50
	// });
// 	
	for (var i = 0; i < alarmData.length; i++ ) {
		Ti.API.info("眠い稲");
		var row =  Ti.UI.createTableViewRow({height : 50});
		 row.color = '#000'; 
		row.font = {fontWeight:'bold'} 
		row.title = util.dateToStr(alarmData[i].time);
		var sw = Ti.UI.createSwitch({
			right : 10,
			value : alarmData[i].flag
		});
		row.add(sw);
		rowData.push(row);
	}	
	// rowData.push(row1);
	// rowData.push(row2);

	var tableView = Ti.UI.createTableView({
		data : rowData,
		//style: Ti.UI.iPhone.TableViewStyle.GROUPED
		//top: 50
	});
	

	var scoreWin = require('scoreWin').win;

	tableView.addEventListener('click', function(e) {
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowdata;
		// Titanium.UI.currentWindow.animate({
		// view: recordWin,
		// transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		// });
		// var childWin = Titanium.UI.createWindow({
		// title:'webwindow',
		// backgroundColor:'#333'
		// });

		self.containingTab.open(scoreWin, {
			animated : true
		});
		// Titanium.UI.currentTab.open(scoreWin, {
		// animated : true
		// });
		//childWin.open(true, {animated:true});

		//クリックで子画面を開く
		//navGrp.open(childWin, {animated:true});
	});
	
	var changeTableViewDisplay = function(isEdit){
		//if(isEdit){
			for (var i = 0; i < rowData.length; i++ ) {				
				rowData[i].children[0].visible = !isEdit;
				rowData[i].hasChild = isEdit;
			}	
		//}
	};
	
	// ナビボタン
	var rightButton = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
	});
	self.leftNavButton = rightButton;
	rightButton.addEventListener('click', function() {
		isEdit? isEdit=false:isEdit=true;
		changeTableViewDisplay(isEdit);
	});
	self.add(tableView);
	return self;
};

module.exports = AlarmWin;
