/**
 * @author Nomura Takahisa
 */

// 初期
function AddAlarmWin() {
	var self = Titanium.UI.createWindow({
		title : 'アラームを編集',
        modal : true,
        navBarHidden : false,
		backgroundImage : 'images/TiBgImage.png'
	});
    
    // ナビボタン
	var leftButton = Titanium.UI.createButton({
		title: "キャンセル"
	});
	self.leftNavButton = leftButton;
	leftButton.addEventListener('click', function() {
        self.close();
	});   

    var picker = Titanium.UI.createPicker({
        width: '176dp'
    });
	var column1 = Titanium.UI.createPickerColumn();

	for(var i = 0; i < 60; ++i) {
		column1.addRow(Titanium.UI.createPickerRow({
			title : i + '分',
			custom_item : i + 1
        }));
	}

	var column2 = Titanium.UI.createPickerColumn();
	for(var i = 0; i < 60; ++i) {
		column2.addRow(Titanium.UI.createPickerRow({
			title : i + '秒',
			custom_item : i + 1
		}));
	}
	picker.add([column1, column2]);
	picker.selectionIndicator = true;
    picker.setSelectedRow(0, 10, false);
    picker.setSelectedRow(1, 0, false);
    
    var rightButton = Titanium.UI.createButton({
	    title: '保存'
    });

    rightButton.addEventListener('click', function() {
        var db = Ti.Database.open('mydb');
        
        var rows  = db.execute('SELECT ID FROM D_ALARM');
        var maxId = 0;
        while (rows.isValidRow()) {
            maxId = Math.max(maxId, rows.fieldByName('id'));
            rows.next();
        }
        var selectedTime = ((picker.getSelectedRow(0).custom_item-1)*60 + picker.getSelectedRow(1).custom_item-1) * 1000;
        Ti.API.info(maxId);
        maxId++;
        Ti.API.info(selectedTime);
        db.execute('INSERT INTO D_ALARM (ID,ALARM_DATE,VALID) VALUES(?,?,?)', maxId, selectedTime, false);

        db.close();
        self.close();
    });

    self.rightNavButton = rightButton;

	self.add(picker);
	return self;
}

module.exports = AddAlarmWin;
