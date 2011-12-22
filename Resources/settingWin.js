/**
 * @author Nomura Takahisa
 */
var win = Titanium.UI.createWindow({  
    title:'設定',
    backgroundColor:'#fff'
});

// var label1 = Titanium.UI.createLabel({
	// color:'#999',
	// text:'I am Window 2',
	// font:{fontSize:20,fontFamily:'Helvetica Neue'},
	// textAlign:'center',
	// width:'auto'
// });
var rowData = [];

var row1 = Ti.UI.createTableViewRow({height:50});
var sw1 = Ti.UI.createSwitch({
	right:10,
	value:false
});
row1.add(sw1);

var button1 = Ti.UI.createButton({
	//style: Ti.UI.iPhone.SystemButton.DISCLOSURE,
	left: 10
});
//row1.add(button1);
row1.className = 'control';
var row2 = Ti.UI.createTableViewRow({height:50});
rowData.push(row1);
rowData.push(row2);

var tableView = Ti.UI.createTableView({
	data: rowData,
	//style: Ti.UI.iPhone.TableViewStyle.GROUPED
	//top: 50
});

tableView.addEventListener('click', function(e){
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowdata;
});

win.add(tableView);

exports.win = win;
