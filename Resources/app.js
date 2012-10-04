// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var timerWin = require('timerWin').win;

// セッティングタイムがなければ入れておく
if(!Ti.App.Properties.hasProperty('settingTime')){
	Ti.App.Properties.setInt('settingTime', 10*60);
}

Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);

// create base UI tab and ro
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'タイマー',
    window: timerWin
});
timerWin.containingTab = tab1;
tabGroup.addTab(tab1);  

var AlarmWin = require('alarmWin');
var alarmWin = new AlarmWin();

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'アラーム設定',
    window:alarmWin
});
alarmWin.containingTab = tab3;

var settingWin = require('settingWin').win;

var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'タイマー設定',
    window:settingWin
});
settingWin.containingTab = tab4;

//
//  add tabs
//

tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  

// open tab group
tabGroup.open();
