require('SMS_MessageTemplateService');

loadAreaConfig();
//--------------全局变量--------------------------------
var row1,row2,row3;
//---------------store---------------------------------

function castNeedImpowerStore(v)
{
	if(v=='N')
		return '否';
	else if (v=='Y')
		return '是';		 
}
//-----------------------select-----------------------
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');

mainArea.setCm([
{
	header: "消息标识",
	dataIndex: 'templateId',
	width: 100,
	sort:true,
	editor: null
},
{
	header: "消息名称",
	dataIndex: 'templateName',
	width: 120,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "子系统",
	dataIndex: 'subSystem',
	width: 60,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}
,
{
	header: "控制权限",
	dataIndex: 'needImpower',
	width: 70,
	sort:true,
	renderer:StrUtil.displayYN,
	editor: new Ext.form.ComboBox(
	{
		store:YNStore,
		displayField:'CH',
		valueField:'EN',
		allowBlank: true
	})
}
,
{
	header: "数据源",
	dataIndex: 'dataSql',
	width: 200,
	editor: new Ext.form.TextArea(
	{
		allowBlank: true
	})
}
,
{
	header: "消息模板",
	dataIndex: 'templateContent',
	width: 200,
	editor: new Ext.form.TextArea(
	{
		allowBlank: true
	})
}
,
{
	header: "参数说明",
	dataIndex: 'paramDesc',
	width: 200,
	editor: new Ext.form.TextArea(
	{
		allowBlank: true
	})
}
]);

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '消息标识：',bodyStyle:queryLabel+'width:150'});
row1.add({xtype:'textfield',name:'templateId',width:120});

row1.add({tag: 'div', html: '消息名称：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'templateName',width:120});	

row1.add({tag: 'div', html: '子系统：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'subSystem',width:120});						
mainArea.addToQueryPanel(row1);

//-------------------------------------------------------
var newWin=new WindowUnit('newWin');
newWin.setTitle('新增');
var newBasicQueryMessageArea=new DetailAreaUnit('newBasicQueryMessageArea');

row1=new Ext.Panel(rowConfig);						
row1.add({tag: 'div', html: '消息标识：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'templateId',width:120,allowBlank: false});			
row1.add({tag: 'div', html: '消息名称：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'templateName',width:120,allowBlank: false});			
row1.add({tag: 'div', html: '子系统：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'subSystem',width:120,allowBlank: false});	
newBasicQueryMessageArea.addToFieldSet(row1);

row2=new Ext.Panel(rowConfig);						
row2.add({tag: 'div', html: '权限控制：',bodyStyle:queryLabel+'width:100'});
row2.add({xtype:'combo',name:'needImpower',width:120,store:YNStore,displayField:'CH',valueField:'EN',allowBlank: false});			
row2.add({tag: 'div', html: '数据源：',bodyStyle:queryLabel+'width:120'});
row2.add({xtype:'textfield',name:'dataSql',width:338,allowBlank: false});	
newBasicQueryMessageArea.addToFieldSet(row2);

row3=new Ext.Panel(rowConfig);		
row3.add({tag: 'div', html: '消息模板：',bodyStyle:queryLabel+'width:100'});
row3.add({xtype:'textarea',name:'templateContent',width:575,allowBlank: false});
newBasicQueryMessageArea.addToFieldSet(row3);	

row4=new Ext.Panel(rowConfig);
row4.add({tag: 'div', html: '参数说明：',bodyStyle:queryLabel+'width:100'});
row4.add({xtype:'textarea',name:'paramDesc',width:575,allowBlank: true,ctCls:'x-form-focus'});	
newBasicQueryMessageArea.addToFieldSet(row4);
		
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
function appInit()
{
	//----------------------------------------------
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryBasicQueryMessages);
	//---------------------------------------------
	newWin.init();
	newWin.add(newBasicQueryMessageArea);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryBasicQueryMessages();
	hideLoading();
}
//-----------------------------------------------------
mainArea.queryBasicQueryMessages=function()
{
	SMS_MessageTemplateService.queryBasicQueryMessages(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

mainArea.opModifyBasicQueryMessage=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	SMS_MessageTemplateService.opModifyBasicQueryMessage(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			
			mainArea.queryBasicQueryMessages();
		}
	});
}
mainArea.showAddNewWin=function(constParam)
{
	SMS_MessageTemplateService.showAddNewWin(function(viewData)
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
newBasicQueryMessageArea.opAddBasicQueryMessage=function()
{
	if(!newBasicQueryMessageArea.checkFields()) return;	
	var obj =newBasicQueryMessageArea.getValueObject(); 
	SMS_MessageTemplateService.opAddBasicQueryMessage(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败.'+viewData.message);
		}
		else
		{	
						
			mainArea.queryBasicQueryMessages();			
		}
	});	
}
mainArea.deleteBasicQueryMessage=function(constParam)
{
	var list=mainArea.getSelected();
	var msg='';
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	if(list.length==1)
	{
		msg=list[0].templateId
	}
	else
	{
		msg='这'+list.length+'个';
	}
	Ext.confirm('你确定删除'+msg+'模板吗？',function(btn)
	{
		if(btn=='yes')
		{
			SMS_MessageTemplateService.deleteBasicQueryMessage(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{	
								
					mainArea.queryBasicQueryMessages();			
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