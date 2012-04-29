/**
 * @author Nomura Takahisa
 */

// 初期化
function AlarmWin() {
	var status;
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
			while(rows.isValidRow()) {
				Titanium.API.info('ARAMA DATE=' + rows.fieldByName('alarm_date') + 'FLAG' + rows.fieldByName('valid'));
				rows.next();
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

	var row1 = Ti.UI.createTableViewRow({
		height : 50
	});
	var sw1 = Ti.UI.createSwitch({
		right : 10,
		value : false
	});
	row1.add(sw1);

	var button1 = Ti.UI.createButton({
		//style: Ti.UI.iPhone.SystemButton.DISCLOSURE,
		left : 10
	});
	//row1.add(button1);
	row1.className = 'control';
	var row2 = Ti.UI.createTableViewRow({
		height : 50
	});
	rowData.push(row1);
	rowData.push(row2);

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
	
	// ナビボタン
	var rightButton = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
	});
	self.leftNavButton = rightButton;
	rightButton.addEventListener('click', function() {
		Ti.API.info("iine");
	});
	self.add(tableView);
	return self;
};

module.exports = AlarmWin;
