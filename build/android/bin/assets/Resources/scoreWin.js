/**
 * @author Nomura Takahisa
 */
var win = Titanium.UI.createWindow({  
    title:'スコア',
    backgroundColor:'#fff'
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win.add(label1);

exports.win = win;
