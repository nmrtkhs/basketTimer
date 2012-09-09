/**
 * @author Nomura Takahisa
 */

// 初期化
function EditAlarmWin() {
	var self = Titanium.UI.createWindow({
		//title:'設定',
		title : 'アラームを編集',
		//backgroundColor:'#fff'
		backgroundImage : 'images/TiBgImage.png'
	});

	var picker = Titanium.UI.createPicker();
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
