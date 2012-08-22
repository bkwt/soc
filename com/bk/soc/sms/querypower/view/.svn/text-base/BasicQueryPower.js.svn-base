<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/CERP3x/resources/css/ext-all.css" />
<script type='text/javascript' src='/CERP3x/dwr/engine.js'></script>
<script type="text/javascript" src="/CERP3x/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="/CERP3x/ext-all.js"></script>
<script type='text/javascript' src='/CERP3x/org/fdm/core/cerp-base.js'></script>

<script type='text/javascript' src='/CERP3x/dwr/interface/SMS_BasicQueryPowerService.js'></script>
<script type="text/javascript" src="/CERP3x/org/fdm/core/page/PageUnit.js"></script>
<script type="text/javascript" src="/CERP3x/org/fdm/core/area/ListAreaUnit.js"></script>
<script type="text/javascript" src="/CERP3x/org/fdm/core/area/DetailAreaUnit.js"></script>
<script type="text/javascript" src="/CERP3x/org/fdm/core/area/SelectAreaUnit.js"></script>
<script type="text/javascript" src="/CERP3x/org/fdm/core/window/WindowUnit.js"></script>
<script type="text/javascript" src="/CERP3x/org/fdm/core/tools/util.js"></script>

<script type="text/javascript" src="/CERP3x/view?functionId=SelectPerson"></script>
<script type="text/javascript" src="/CERP3x/com/huiton/cerp/sms/js/selectBasicQueryMessage.js"></script>
  
</head>
<script>

require('SMS_BasicQueryPowerService');
include('SelectPerson');
include('selectBasicQueryMessage');
loadAreaConfig();
//--------------全局变量--------------------------------
var row1,row2,row3;
//---------------store---------------------------------
//-----------------------select-----------------------
//----------选择消息标识-----------
function selectTemplate(e)
{
	showSelectBasicQueryMessage(e,'SINGLE',setTemplate,'');
}
function setTemplate(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	if(voList.length==0)
	{
		siteTag.setField('templateId','');
	}
	else
	{
		siteTag.setField('templateId',voList[0].templateId);
	}
}
//----------选择人员信息-----------
function selectPerson(e)
{
	showSelectPerson(e,'SINGLE',setPerson,'');
}
function setPerson(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	
	if(voList.length==0)
	{
		siteTag.setField('userId','');
		siteTag.setField('userName','');
		siteTag.setField('phoneNumber','');
	}
	else
	{
		siteTag.setField('userId',voList[0].code);
		siteTag.setField('userName',voList[0].name);
		siteTag.setField('phoneNumber',voList[0].telephone);
	}
}
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
var selectTemplateField=new Ext.form.TriggerField({width:120,allowBlank: false});
selectTemplateField.onTriggerClick=selectTemplate;

var selectPersonField=new Ext.form.TriggerField({width:120,allowBlank: false});
selectPersonField.onTriggerClick=selectPerson;

mainArea.setCm([
{
	header: "消息标识",
	dataIndex: 'templateId',
	width: 170,
	editor: selectTemplateField
},
{
	header: "人员编码",
	dataIndex: 'userId',
	width: 170,
	editor: selectPersonField
},
{
	header: "人员名称",
	dataIndex: 'userName',
	width: 170,
	editor: null
},
{
	header: "电话号码",
	dataIndex: 'phoneNumber',
	width: 205,
	editor:null
}
]);

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '模板编号：',bodyStyle:queryLabel+'width:200'});
row1.add({xtype:'textfield',name:'templateId',width:120});

row1.add({tag: 'div', html: '人员名称：',bodyStyle:queryLabel+'width:200'});
row1.add({xtype:'textfield',name:'userName',width:120});						
mainArea.addToQueryPanel(row1);

//-------------------------------------------------------
var newWin=new WindowUnit('newWin');
newWin.setTitle('新增');
var newBasicQueryPowerArea=new DetailAreaUnit('newBasicQueryPowerArea');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '消息标识：',bodyStyle:queryLabel+'width:100'});
var templateIdFeild=row1.add({xtype:'trigger',name:'templateId',width:100,allowBlank: false});
templateIdFeild.onTriggerClick = selectTemplate	
		
row1.add({xtype:'hidden',name:'userId',width:100,allowBlank: false});
row1.add({tag: 'div', html: '人员姓名：',bodyStyle:queryLabel+'width:120'});
var userNameFelid=row1.add({xtype:'trigger',name:'userName',width:100,allowBlank: false});
userNameFelid.onTriggerClick = selectPerson

row1.add({tag: 'div', html: '电话号码：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'phoneNumber',width:120,allowBlank: true});
row1.add({xtype:'hidden',name:'hid',width:120});
newBasicQueryPowerArea.addToFieldSet(row1);
		
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
function appInit()
{
	//----------------------------------------------
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryBasicQueryPower);
	//---------------------------------------------
	newWin.init();
	newWin.add(newBasicQueryPowerArea);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryBasicQueryPower();
	hideLoading();
}
//-----------------------------------------------------
mainArea.queryBasicQueryPower=function()
{
	SMS_BasicQueryPowerService.queryBasicQueryPower(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
mainArea.showAddNewWin=function(constParam)
{
	SMS_BasicQueryPowerService.showAddNewWin(function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			newWin.show(constParam);
		}
	});
}

newBasicQueryPowerArea.opAddNewBasicQueryPower=function()
{
	if(!newBasicQueryPowerArea.checkFields()) return;
	
	var obj=newBasicQueryPowerArea.getValueObject();
	SMS_BasicQueryPowerService.opAddNewBasicQueryPower(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			
			newBasicQueryPowerArea.clean();
			mainArea.queryBasicQueryPower();
		}
	});
}
mainArea.opModifyBasicQueryPower=function()
{
	var list = mainArea.getSelected();
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	SMS_BasicQueryPowerService.opModifyBasicQueryPower(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			mainArea.queryBasicQueryPower();
		}
	});
}
mainArea.opDeleteBasicQueryPower=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	Ext.confirm('你确定删除这'+list.length+'条记录吗？',function(btn)
	{
		if(btn=='yes')
		{
			SMS_BasicQueryPowerService.opDeleteBasicQueryPower(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{
					
					mainArea.queryBasicQueryPower();
				}
			});
		}
	});
}
newBasicQueryPowerArea.close=function()
{
	newWin.close();
}
function test()
{
	alert(0);
}

Ext.onReady(appInit);


//----------------------------------------------------------------------------
</script>
<body>

</body>
</html>