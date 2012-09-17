/**
 * @author Nomura Takahisa
 */

// 初期化
function AlarmWin() {
	// 編集中かどうか
	var isEdit = false;
	var alarmData = [];
	var Util = require('Util');
	var util = new Util();

	var init = function() {
		var db = Titanium.Database.open('mydb');

		//もしテーブルがなかったら初期テーブル作成
		db.execute('CREATE TABLE IF NOT EXISTS D_ALARM (ALARM_DATE INTEGER, VALID BOOL)');

		// 全データ取得
		var rows = db.execute('SELECT * FROM D_ALARM');

		// もしデータがはいってなかったらデータをいれる(1件くらいデータが入ってた方がユーザとしてもわかりやすいので)
		// TODO:2012nomura いずれはとるよ
		if(!rows.isValidRow()) {
			db.execute('INSERT INTO D_ALARM (ALARM_DATE,VALID) VALUES(?,?)', 60 * 9 * 1000, false);
			var rows = db.execute('SELECT * FROM D_ALARM');
		}

		// aalarmDataにデータをいれる
		var i = 0;
		while(rows.isValidRow()) {
			Titanium.API.info('ARAMA DATE=' + rows.fieldByName('alarm_date') + 'FLAG' + rows.fieldByName('valid'));
			alarmData[i] = {
				flag : rows.fieldByName('valid'),
				time : new Date(rows.fieldByName('alarm_date'))
			};
			rows.next(); ++i;
		}

		rows.close();
		db.close();
	}();

	var self = Titanium.UI.createWindow({
		title : 'アラーム',
		backgroundColor : '#fff'
	});

	// tableviewに格納する行データ
	var rowData = [];
	for(var i = 0; i < alarmData.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : 100
		});
		row.color = '#000';
		row.font = {
			fontWeight : 'bold'
		}
		//row.title = util.dateToStr(alarmData[i].time);
		var sw = Ti.UI.createSwitch({
			right : 10,
			value : alarmData[i].flag
		});

		var item = Ti.UI.createLabel({
			color : '#000',
			text : util.dateToStr(alarmData[i].time),
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			},
			top : 3,
			left : 10,
			height : 30,
			width : 100
		});

		var deleteButton = Ti.UI.createButton({
			backgroundImage : '/images/minusDefault.png',
			height : 27,
			width : 27,
			top : Ti.UI.SIZE,
			left : 10,
			visible : true
		});

		row.add(item);
		row.add(sw);
		row.add(deleteButton);
		rowData.push(row);
	}

	var tableView = Ti.UI.createTableView({
		data : rowData,
		//style: Ti.UI.iPhone.TableViewStyle.GROUPED
		//top: 50
	});

	var EditAlarmWin = require('EditAlarmWin')
	var editAlarmWin = new EditAlarmWin();

	tableView.addEventListener('click', function(e) {
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowdata;


		if(isEdit) {
			self.containingTab.open(editAlarmWin, {
				animated : true
			});
		}
	});
	var changeTableViewDisplay = function(isEdit) {
		Ti.API.info("rowdata=" + rowData);
		var buttonTitle = isEdit? "完了" : "編集";
        self.leftNavButton.title = buttonTitle;        

        for(var i = 0; i < rowData.length; i++) {
			Ti.API.info("rowdata["+ i + "]" + rowData[i].children);
			rowData[i].children[0].visible = !isEdit;
			rowData[i].hasChild = isEdit;
			// if(isEdit) {
				// rowData[i].title.animate({
					// right : 10,
					// duration : 100
				// });
			// } else {
				// rowData[i].title.animate({
					// left : 10,
					// duration : 100
				// });
			// }
		}
	};
	// ナビボタン
	var leftButton = Titanium.UI.createButton({
		title: "編集"
        //systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
	});
	self.leftNavButton = leftButton;
	leftButton.addEventListener('click', function() {
		isEdit ? isEdit = false : isEdit = true;
		changeTableViewDisplay(isEdit);
	});
	
	// addボタン
	var rightButton = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
	});
	self.rightNavButton = rightButton;
	rightButton.addEventListener('click', function() {
		isEdit ? isEdit = false : isEdit = true;
		changeTableViewDisplay(isEdit);
	});

	self.add(tableView);
	return self;
};

module.exports = AlarmWin;
