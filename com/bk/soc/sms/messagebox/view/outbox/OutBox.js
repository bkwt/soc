require('SMS_SmsService');
loadAreaConfig();
//--------------全局变量--------------------------------
var row1,row2,row3;
//---------------store---------------------------------
//-----------------------select-----------------------
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');

mainArea.setCm([
{
	header: "发信人",
	dataIndex: 'senderName',
	width: 100,
	sort:true,
	editor: null
},
{
	header: "收信人号码",
	dataIndex: 'receiverMobileNo',
	width: 120,
	sort:true,
	editor: null
}
,
{
	header: "收信人",
	dataIndex: 'receiverName',
	width: 95,
	sort:true,
	editor: null
}
,
{
	header: "短信内容",
	dataIndex: 'msg',
	width: 270,
	editor: new Ext.form.TextArea(
	{
		readOnly:true
	})
}
,
{
	header: "发送时间",
	dataIndex: 'sendTime',
	width: 130,
	sort:true,
	renderer:DateUtil.formatDateTime,
	editor:null
}
]);

row1=new Ext.Panel(rowConfig);						
row1.add({tag: 'div', html: '发信人：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'senderName',width:100,rule:"@NAME@ LIKE '%@VALUE@%'"});	
row1.add({tag: 'div', html: '收信人：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'receiverName',width:100,rule:"@NAME@ LIKE '%@VALUE@%'"});											
row1.add({tag: 'div', html: '发送时间：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'datefield',name:'sendTime',width:90,readOnly:true,rule:'DATEDIFF(day,@NAME@, \'@VALUE@\')<=0'});		
row1.add({tag: 'div', html: '至：',bodyStyle:queryLabel+'width:40'});
row1.add({xtype:'datefield',name:'sendTime',width:90,readOnly:true,rule:'DATEDIFF(day,@NAME@, \'@VALUE@\')>=0'});				
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
	mainArea.refreshFor(mainArea.queryOutBox);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryOutBox();
	hideLoading();
}
//-----------------------------------------------------
mainArea.queryOutBox=function()
{
	SMS_SmsService.queryOutBoxs(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
mainArea.deleteOutBox=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选短信');
		return;
	}
	Ext.confirm('你确定删除这'+list.length+'条短信吗？',function(btn)
	{
		if(btn=='yes')
		{
			SMS_SmsService.opDeleteOutBox(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{	
								
					mainArea.queryOutBox();			
				}
			});	
		}
	});
}
function test()
{
	alert(0);
}

Ext.onReady(appInit);
