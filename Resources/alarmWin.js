/**
 * @author Nomura Takahisa
 */

// 初期化
function AlarmWin() {
	// 編集中かどうか
	var isEdit = false;
    var isDelete = false;
    var isClickMinusBt = false;
    var deleteRow = -1;
	var alarmData = [];
	var Util = require('Util');
	var util = new Util();

	var init = function() {
		var db = Titanium.Database.open('mydb');

		//もしテーブルがなかったら初期テーブル作成
		db.execute('CREATE TABLE IF NOT EXISTS D_ALARM (ID INTEGER, ALARM_DATE INTEGER, VALID BOOL)');

		// 全データ取得
		var rows = db.execute('SELECT * FROM D_ALARM');

		// もしデータがはいってなかったらデータをいれる(1件くらいデータが入ってた方がユーザとしてもわかりやすいので)
		// TODO:2012nomura いずれはとるよ
		if(!rows.isValidRow()) {
			db.execute('INSERT INTO D_ALARM (ID,ALARM_DATE,VALID) VALUES(?,?,?)', 1, 60 * 9 * 1000, false);
			var rows = db.execute('SELECT * FROM D_ALARM');
		}

		// aalarmDataにデータをいれる
		var i = 0;
        alarmData = [];
		while(rows.isValidRow()) {
			Titanium.API.info('ARAMA DATE=' + rows.fieldByName('alarm_date') + 'FLAG' + rows.fieldByName('valid'));
			alarmData[i] = {
                id: rows.fieldByName('id'),
				flag : rows.fieldByName('valid'),
				time : new Date(rows.fieldByName('alarm_date'))
			};
			rows.next(); ++i;
		}

		rows.close();
		db.close();
	};
    init();

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
			left : 10,
			height : 30,
			width : 100
		});
        
        var deleteButton = Ti.UI.createButton({
             title  : "消去",
             height : 44,
             width  : 88,
             top    : Ti.UI.SIZE,
             right  : 10,
             visible : true,
             opacity : 0
         });

		var minusButton = Ti.UI.createButton({
			backgroundImage : '/images/minusDefault.png',
			height : 27,
			width : 27,
			top : Ti.UI.SIZE,
			left : -20,
			visible : true,
            opacity : 0
		});

        minusButton.addEventListener('click', function(e) {
            var index = i;
            return function(e){
                isDelete = !isDelete;
                isClickMinusBt = true;
                changeDeleteCellDisplay(index);
            }
        }());

         var changeDeleteCellDisplay = function(index){
             var rotate = 0;
             var opacity = 0;
             var visible = false;
             var rightPos = -10;
             deleteRow = -1;
             
             if (isDelete){
                 rotate = -90;
                 opacity = 100;
                 visible = true;
                 rightPos = 20;
                 deleteRow = index;
             }

             minusButton.animate({
                 transform : Ti.UI.create2DMatrix().rotate(rotate)
             });

             deleteButton.animate({
                 right   : rightPos,
                 opacity : opacity,
                 duration : 300 
             });
         }
         
		row.add(item);
		row.add(sw);
        row.add(deleteButton);
		row.add(minusButton);
		rowData.push(row);
	}

	var tableView = Ti.UI.createTableView({
		data : rowData,
		//style: Ti.UI.iPhone.TableViewStyle.GROUPED
		//top: 50
	});

    var initTableViewTitle = function(){
        for (var i = 0; i < alarmData.length; ++i) {
            rowData[i].children[0].text = util.dateToStr(alarmData[i].time);
        }
    };

    self.addEventListener('focus', function(){
        init();  
        initTableViewTitle();
    });

	var EditAlarmWin = require('EditAlarmWin')
	var editAlarmWin = new EditAlarmWin();

	tableView.addEventListener('click', function(e) {
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowdata;

		if (isEdit) {
            if (!isDelete && !isClickMinusBt) {
                editAlarmWin.selectId = alarmData[index].id;
                editAlarmWin.open();
            }
        }
        isClickMinusBt = false;
	});

    self.addEventListener("blur", function() {
        isEdit = false;
        changeTableViewDisplay(isEdit);
    });

	var changeTableViewDisplay = function(isEdit) {
		Ti.API.info("rowdata=" + rowData);
		var buttonTitle = isEdit? "完了" : "編集";
        self.leftNavButton.title = buttonTitle;        
        if(!isEdit){
            isDelete = isClickMinusBt = false;
        }
        for(var i = 0; i < rowData.length; i++) {
			Ti.API.info("rowdata["+ i + "]" + rowData[i].children);
			//rowData[i].children[0].visible = !isEdit;
			//rowData[i].hasChild = isEdit;
			 if(isEdit) {
				 rowData[i].children[0].animate({
			        left : 40,
				    duration : 300
			     });
                 rowData[i].children[1].animate({
			        right : 40,
				    duration : 300,
                    opacity : 0,
			     });

                 rowData[i].children[3].animate({
			        left : 10,
                    opacity : 1.0,
				    duration : 300
                    //transform : Ti.UI.create.create2DMatrix().rotate(90)
			     });
                			 
             } else {
				 rowData[i].children[0].animate({
			        left : 10,
				    duration : 300
			     });
                 rowData[i].children[1].animate({
			        right : 10,
				    duration : 300,
                    opacity : 1
			     });
                 rowData[i].children[3].animate({
			        left : -20,
                    opacity : 0,
				    duration : 300
                    //transform : Ti.UI.create.create2DMatrix().rotate(-90)
			     });
               
                if (deleteRow == i) {
                    rowData[i].children[3].animate({
                        transform : Ti.UI.create2DMatrix().rotate(0),
                        opacity : 0
                    });
                    rowData[i].children[2].animate({
                        right   : -10, 
                        opacity : 0
                    });
                    deleteRow = -1;
                 }
			 }
		}
	};

	// ナビボタン
	var leftButton = Titanium.UI.createButton({
		title: "編集"
	});
	self.leftNavButton = leftButton;
	leftButton.addEventListener('click', function() {
		isEdit = !isEdit;
        changeTableViewDisplay(isEdit);
	});
	
	// addボタン
	var rightButton = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.ADD
	});
    
    var AddAlarmWin = require('AddAlarmWin')
	var addAlarmWin = new AddAlarmWin();

	self.rightNavButton = rightButton;
	rightButton.addEventListener('click', function() {
	    addAlarmWin.open();
    });

	self.add(tableView);
	return self;
};

module.exports = AlarmWin;
