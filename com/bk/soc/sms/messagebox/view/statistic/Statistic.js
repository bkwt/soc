require('SMS_SmsService');

loadAreaConfig();
var sexStore = new Ext.data.SimpleStore({
	fields: ['sex'],
	data : [['男'],['女']]
});
function reMake(v,p,r)
{
	if (r.get('expressLevel')=='1')
	{
		return v;
	}
	else
	{
		return '';	
	}
}
//--------------全局变量--------------------------------
var row1,row2,row3;
//---------------store---------------------------------
//-----------------------select-----------------------
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');

mainArea.setCm([
{
	header: "发信人ID",
	dataIndex: 'code',
	width: 111,
	sort:true,
	editor: null
},
{
	header: "发信人",
	dataIndex: 'name',
	width: 111,
	sort:true,
	editor: null
}
,
{
	header: "已发短信数",
	dataIndex: 'sendNum',
	width: 165,
	sort:true,
	editor: null
}
,
{
	header: "待发短信数",
	dataIndex: 'outNum',
	width: 165,
	sort:true,
	editor: null
}
,
{
	header: "发送失败数",
	dataIndex: 'badNum',
	width: 165,
	sort:true,
	editor:null
}
]);

row1=new Ext.Panel(rowConfig);	
row1.add({tag: 'div', html: '发信人ID：',bodyStyle:queryLabel+'width:230'});
row1.add({xtype:'textfield',name:'code',width:100});						
row1.add({tag: 'div', html: '发信人：',bodyStyle:queryLabel+'width:180'});
row1.add({xtype:'textfield',name:'name',width:100});			
mainArea.addToQueryPanel(row1);
//-------------------------------------------------------		
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
function appInit()
{
	//----------------------------------------------
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryStatistic);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryStatistic();
	hideLoading();
}
//-----------------------------------------------------
mainArea.queryStatistic=function()
{
	SMS_SmsService.queryStatistics(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
function test()
{
	alert(0);
}

Ext.onReady(appInit);