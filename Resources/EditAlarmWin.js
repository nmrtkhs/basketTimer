/**
 * @author Nomura Takahisa
 */

// 初期
function EditAlarmWin() {
	var self = Titanium.UI.createWindow({
		title : 'アラームを編集',
		//backgroundColor:'#fff'
		backgroundImage : 'images/TiBgImage.png'
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
    
    self.selectId = -1;
    var selectTime;
    self.addEventListener('focus', function(){
        var db = Ti.Database.open('mydb');

        var rows = db.execute('SELECT ALARM_DATE FROM D_ALARM WHERE ID = ?', self.selectId);
        var selectTime = new Date(rows.fieldByName('alarm_date'));

        picker.setSelectedRow(0, selectTime.getMinutes(), false);
        picker.setSelectedRow(1, selectTime.getSeconds(), false);

        rows.close();
        db.close();
    });

    var rightButton = Titanium.UI.createButton({
	    title: '保存'
    });

    rightButton.addEventListener('click', function() {
        var db = Ti.Database.open('mydb');
      
        var selectedTime = ((picker.getSelectedRow(0).custom_item-1)*60 + picker.getSelectedRow(1).custom_item-1) * 1000;
        db.execute('UPDATE D_ALARM SET ALARM_DATE = ? WHERE ID = ?', selectedTime, self.selectId);

        db.close();
    });

    self.rightNavButton = rightButton;


	// セーブする
	// picker.addEventListener('change', function(e) {
		// var prevSettingTime = Ti.App.Properties.getInt('settingTime');
		// var settingTime = 0;
		// if(e.columnIndex == 0) {
			// settingTime = e.rowIndex * 60 + (prevSettingTime % 60);
		// } else {
			// settingTime = Math.floor(prevSettingTime / 60) * 60 + e.rowIndex;
		// }
		// Titanium.API.info('NewsetTimer:' + settingTime);
		// Ti.App.Properties.setInt('settingTime', settingTime);
	// });
	// // 初期位置設定+セーブしたデータを設定
	// self.addEventListener('focus', function(e) {
		// var settingTime = Ti.App.Properties.getInt('settingTime');
		// Titanium.API.info('settingTime' + settingTime);
		// picker.setSelectedRow(0, Math.floor(settingTime / 60), false);
		// picker.setSelectedRow(1, settingTime % 60, false);
	// });

	self.add(picker);
	return self;
}

module.exports = EditAlarmWin;
