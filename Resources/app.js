// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var timerWin = require('timerWin').win;

// セッティングタイムがなければ入れておく
if(!Ti.App.Properties.hasProperty('settingTime')){
	Ti.App.Properties.setInt('settingTime', 10*60);
}

// create base UI tab and ro
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window: timerWin
});
timerWin.containingTab = tab1;
tabGroup.addTab(tab1);  


var recordWin = require('recorderWin').win;

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:recordWin
});
recordWin.containingTab = tab2;

var AlarmWin = require('alarmWin');
var alarmWin = new AlarmWin();

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:alarmWin
});
alarmWin.containingTab = tab3;

var settingWin = require('settingWin').win;

var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:settingWin
});
settingWin.containingTab = tab4;

//
//  add tabs
//

tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  

// open tab group
tabGroup.open();
