require('SAM_AdvancedQueryConfigService');

loadAreaConfig();

function displayTableType(v)
{
	if(v=='M')
	{
		return '主表';
	}
	else if(v=='D')
	{
		return '子表';
	}
}

function displayYN(v)
{
	if(v=='Y')
	{
		return '<font color=red>是</font>';
	}
	else if(v=='N')
	{
		return '否';
	}
}
//-------------------------------------------------------
var tableTypeStore = new Ext.data.SimpleStore({
	fields: ['CH','EN'],
	data : [['主表','M'],['子表','D']]
});

var fieldTypeStore = new Ext.data.SimpleStore({
	fields: ['EN'],
	data : [['char'],['number'],['date']]
});
//--------------------p1-----------------------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "模块编码",
	dataIndex: 'moduleId',
	width: 300
},
{
	header: "说明",
	dataIndex: 'moduleDesc',
	width: 300
}]);

//mainArea.setTitle('高级查询配置定义');

var row1,row2,row3;

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '模块编码：',bodyStyle:queryLabel+'width:300'});
row1.add({xtype:'textfield',name:'moduleId',width:240,rule:'@NAME@ LIKE \'%@VALUE@%\''});

mainArea.addToQueryPanel(row1);

//-------------------------------------------------------
var page2 = new PageUnit('page2');

var detailBeanArea=new DetailAreaUnit('detailBeanArea');
//detailBeanArea.setTitle('高级查询配置');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '模块编码：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'moduleId',allowBlank:false,width:260});

row1.add({tag: 'div', html: '说明：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'moduleDesc',allowBlank:false,width:120});
row1.add({xtype:'hidden',name:'hid'});

detailBeanArea.addToFieldSet(row1);

var itemArea=new ListAreaUnit('itemArea');
itemArea.setHeight(500);
itemArea.setCm([
{
	header: "T对象名称",
	dataIndex: 'tableName',
	width: 450
},
{
	header: "类型",
	dataIndex: 'tableType',
	renderer:displayTableType,
	width: 100
}]);
//-------------------------------------------------------
var page3 = new PageUnit('page3');

var detailTableArea=new DetailAreaUnit('detailTableArea');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: 'T对象名：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'tableName',allowBlank:false,width:370});
			
row1.add({tag: 'div', html: '类型：',bodyStyle:queryLabel+'width:90'});
row1.add({xtype:'combo',name:'tableType',store: tableTypeStore,valueField:'EN',displayField:'CH',allowBlank:false,width:70});
row1.add({xtype:'hidden',name:'hid'});

detailTableArea.addToFieldSet(row1);

var fieldArea=new ListAreaUnit('fieldArea');
fieldArea.setHeight(500);
fieldArea.setCm([
{
	header: "字段名",
	dataIndex: 'fieldName',
	width: 280,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "中文名",
	dataIndex: 'fieldText',
	width: 180,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "字段类型",
	dataIndex: 'fieldType',
	width: 80,
	editor: new Ext.form.ComboBox(
	{
		store: fieldTypeStore,
		valueField:'EN',
		displayField:'EN',
		readOnly:false,
		width:80
	})
},
{
	header: "连接条件?",
	dataIndex: 'isJoinField',
	width: 80,
	renderer:displayYN,
	editor: new Ext.form.ComboBox(
	{
		store: YNStore,
		valueField:'EN',
		displayField:'CH',
		width:100
	})
}]);

var newFieldWin=new WindowUnit('newFieldWin');
newFieldWin.setTitle('新增字段');

var newFieldArea=new DetailAreaUnit('newFieldArea');
row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '字段名称：',bodyStyle:queryLabel+'width:90'});
row1.add({xtype:'textfield',name:'fieldName',allowBlank:false,width:130});

row1.add({tag: 'div', html: '中文名：',bodyStyle:queryLabel+'width:90'});
row1.add({xtype:'textfield',name:'fieldText',allowBlank:false,width:100});

row1.add({tag: 'div', html: '字段类型：',bodyStyle:queryLabel+'width:90'});
row1.add({xtype:'combo',name:'fieldType',store: fieldTypeStore,valueField:'EN',displayField:'EN',allowBlank:false,width:80,readOnly:false});

row1.add({tag: 'div', html: '连接条件?：',bodyStyle:queryLabel+'width:90'});
row1.add({xtype:'combo',name:'isJoinField',store: YNStore,valueField:'EN',displayField:'CH',allowBlank:false,width:50});
row1.add({xtype:'hidden',name:'hid'});

newFieldArea.addToFieldSet(row1);
//-------------------------------------------------------
function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryModules);
	//---------------------------------------------
	page2.init();
	page2.add(detailBeanArea);
	page2.add(itemArea);
	//---------------------------------------------
	page3.init();
	page3.add(detailTableArea);
	page3.add(fieldArea);
	//---------------------------------------------
	newFieldWin.init();
	newFieldWin.add(newFieldArea);
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));

	mainArea.queryModules();

	hideLoading();
}

mainArea.queryModules=function()
{
	SAM_AdvancedQueryConfigService.queryModules(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

mainArea.opDeleteModule=function(c)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行');
		return;
	}
	
	Ext.confirm("确认删除吗,删除将删除其明细信息?",function(btn)
	{
		if(btn=='yes')
		{
			SAM_AdvancedQueryConfigService.opDeleteModule(obj,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					mainArea.queryModules();
				}
			});
		}
	});
}

mainArea.enterDetail=function(c)
{
	var obj=mainArea.getSigned();
	setAppContext('moduleId',obj.moduleId);
	page2.show(c);
	detailBeanArea.queryModule();
	itemArea.queryTables();
}

mainArea.enterAddNew=function(c)
{
	page2.show(c);
}

detailBeanArea.queryModule=function()
{
	SAM_AdvancedQueryConfigService.queryModule(getAppContext('moduleId'),function(viewData)
	{
		detailBeanArea.showViewData(viewData);
	});
}

detailBeanArea.opAddNewModule=function(c)
{
	if(!detailBeanArea.checkFields()) return;
	
	var obj=detailBeanArea.getValueObject();
		
	SAM_AdvancedQueryConfigService.opAddNewModule(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败');
		}
		else
		{
			setAppContext('moduleId',obj.moduleId)
			page2.show(c);
			detailBeanArea.queryModule();
		}
	});
}

detailBeanArea.opModifyModule=function()
{
	var obj=detailBeanArea.getValueObject();
		
	SAM_AdvancedQueryConfigService.opModifyModule(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败');
		}
		else
		{
			detailBeanArea.queryModule();
		}
	});
}

detailBeanArea.backToMain=function()
{
	page1.show();
	mainArea.queryModules();
}

itemArea.queryTables=function()
{
	SAM_AdvancedQueryConfigService.queryTables(getAppContext('moduleId'),function(viewData)
	{
		itemArea.showViewData(viewData);
	});
}

itemArea.enterAddNew=function(c)
{
	page3.show(c);
}

itemArea.enterDetail=function(c)
{
	var obj=itemArea.getSigned();
	
	
	setAppContext('tableName',obj.tableName);
	
	page3.show(c);
	
	detailTableArea.queryTable();
	fieldArea.queryFields();
}

itemArea.opDeleteTables=function()
{
	var list=itemArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	Ext.confirm('确认删除吗?',function(btn)
	{
		if(btn=='yes')
		{
			SAM_AdvancedQueryConfigService.opDeleteTables(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					itemArea.queryTables();
				}
			});
		}
	});
}

detailTableArea.queryTable=function()
{
	SAM_AdvancedQueryConfigService.queryTable(getAppContext('moduleId'),getAppContext('tableName'),function(viewData)
	{
		detailTableArea.showViewData(viewData);
	});
}

detailTableArea.opAddNewTable=function(c)
{
	if(!detailTableArea.checkFields()) return;
	
	var obj=detailTableArea.getValueObject();
	obj.moduleId=getAppContext('moduleId');
	
	SAM_AdvancedQueryConfigService.opAddNewTable(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败');
		}
		else
		{
			setAppContext('tableName',obj.tableName)
			page3.show(c);
			detailTableArea.queryTable();
		}
	});
}

detailTableArea.backToMain=function()
{
	page2.show();
	itemArea.queryTables();
}

detailTableArea.opModifyTable=function()
{
	var obj=detailTableArea.getValueObject();
	
	SAM_AdvancedQueryConfigService.opModifyTable(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败');
		}
		else
		{
			detailTableArea.queryTable();
		}
	});
}

fieldArea.queryFields=function()
{
	SAM_AdvancedQueryConfigService.queryFields(getAppContext('moduleId'),getAppContext('tableName'),function(viewData)
	{
		fieldArea.showViewData(viewData);
	});
}

fieldArea.opGetFieldInfo=function()
{
	Ext.confirm("自动获取将覆盖现有的字段信息,确认吗?",function(btn)
	{
		if(btn=='yes')
		{
			SAM_AdvancedQueryConfigService.opGetFieldInfo(getAppContext('moduleId'),getAppContext('tableName'),function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('获取失败.'+viewData.message);
				}
				else
				{
					fieldArea.queryFields();
				}
			});
		}
	});
}

fieldArea.showAddNewField=function(c)
{
	newFieldWin.show(c);
}

fieldArea.opModifyAllFields=function()
{
	if(!fieldArea.checkFields(true)) return;
	
	var list=fieldArea.getAllObjects();
	
	SAM_AdvancedQueryConfigService.opModifyAllFields(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败.'+viewData.message);
		}
		else
		{
			fieldArea.queryFields();
		}
	});
}

fieldArea.opDeleteFields=function()
{
	var list=fieldArea.getSelected();
	
	Ext.confirm("确认吗?",function(btn)
	{
		if(btn=='yes')
		{
			SAM_AdvancedQueryConfigService.opDeleteFields(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{
					fieldArea.queryFields();
				}
			});
		}
	});
}

mainArea.opExportSQL=function()
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	SAM_AdvancedQueryConfigService.opExportSQL(obj.moduleId,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('导出失败');
		}
		else
		{
			alert('如果是eclipse环境下导出文件在放在了WorkSpace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\webapps\\SOC\\ExportData\\下');
		}
	});
}

newFieldArea.opAddNewField=function()
{
	if(!newFieldArea.checkFields()) return;
	
	var obj=newFieldArea.getValueObject();
	
	obj.moduleId=getAppContext('moduleId');
	obj.tableName=getAppContext('tableName');
	
	SAM_AdvancedQueryConfigService.opAddNewField(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			fieldArea.queryFields();
		}
	});
}

Ext.onReady(appInit);