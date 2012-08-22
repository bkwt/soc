require('SAM_SystemDefineService');
require('SAM_ComponentService');

loadAreaConfig();

function selectUser(e)
{
	showSelectUser(e,'SINGLE',setUser,'');
}

function setUser(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	
	if(voList.length==0)
	{
		siteTag.setField('userID','');
		siteTag.setField('userName','');
	}
	else
	{
		siteTag.setField('userID',voList[0].userID);
		siteTag.setField('userName',voList[0].userName);
	}
}
//--------------------------------------------------------
var sysStore = new Ext.data.Store({
	fields: ['CH','EN']
});

SAM_SystemDefineService.getSystems(function(list)
{
	sysStore.loadData(list);
});

var cfgTypeStore = new Ext.data.SimpleStore({
	fields: ['CH'],
	data : [['全部'],['编码规则'],['审核流程']]
});
//--------------------------------------------------------
function displayBeanCode(v,p,r)
{
	if(r.data.valid==null||r.data.valid=='N')
	{
		return '<font color="red">'+v+'</font>';
	}
	
	return v;
}
//--------------------p1-----------------------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "业务构件编码",
	dataIndex: 'componentId',
	width: 350,
	renderer:displayBeanCode,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "名称",
	dataIndex: 'componentName',
	width: 390,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}]);

mainArea.addToQueryPanel([
{
	xtype:'textfield',
	name:'componentId',
	fieldLabel:'业务构件编码',
	rule:'@NAME@ LIKE \'%@VALUE@%\''
},
{
	xtype:'textfield',
	name:'componentName',
	fieldLabel:'业务构件名称',
	rule:'@NAME@ LIKE \'%@VALUE@%\''
}],
{
	labelRate:80
});

var cfgTypeField=mainArea.addToSumPanel({xtype:'combo',name:'operator',width:100,store: cfgTypeStore,value:'全部',valueField:'CH',displayField:'CH'});
//-------------------------------------------------------
var page2 = new PageUnit('page2');

var detailBeanArea=new DetailAreaUnit('detailBeanArea');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '业务构件编码：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'componentId',width:350});
			
row1.add({tag: 'div', html: '说明：',bodyStyle:queryLabel+'width:90'});
row1.add({xtype:'textfield',name:'componentName',width:120});
row1.add({xtype:'hidden',name:'hid'});

detailBeanArea.addToFieldSet(row1);

var flowArea=new ListAreaUnit('flowArea');
flowArea.setHeight(400);
flowArea.setCm([
{
	header: "审核流程编码",
	dataIndex: 'flowId',
	width: 250,
	editor: null
},
{
	header: "审核流程名称",
	dataIndex: 'flowNote',
	width: 370,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "排序",
	dataIndex: 'flowIndex',
	width: 80,
	editor: new Ext.form.NumberField(
	{
		allowBlank: false,
		allowDecimals:false,
		minValue:0
	})
}]);

var testField=flowArea.addToSumPanel({xtype:'textarea',value:'这里添测试的JSON对象',width:795,height:50});
//flowArea.addToSumPanel(testField);
//-------------------------------------------------------
var page4=new PageUnit('page4');

var detailAuditFlowArea=new DetailAreaUnit('detailAuditFlowArea');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '业务构件编码：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'componentId',width:300-2});
row1.add({xtype:'hidden',name:'hid'});			
detailAuditFlowArea.addToFieldSet(row1);

row2=new Ext.Panel(rowConfig);
						
row2.add({tag: 'div', html: '审核流程编码：',bodyStyle:queryLabel+'width:100'});
row2.add({xtype:'textfield',name:'flowId',width:120});
row2.add({tag: 'div', html: '审核流程名称：',bodyStyle:queryLabel+'width:140'});
row2.add({xtype:'textfield',name:'flowNote',width:120});
row2.add({tag: 'div', html: '排序：',bodyStyle:queryLabel+'width:140'});
row2.add({xtype:'numberfield',name:'flowIndex',width:80,allowBlank: false,allowDecimals:false,minValue:0});

detailAuditFlowArea.addToFieldSet(row2);

var auditRuleArea=new DetailAreaUnit('auditRuleArea');

row2=new Ext.Panel(rowConfig);
row2.add({tag: 'div', html: '条件表达式(where后语句)',bodyStyle:queryLabel+'width:240;font-size:20px'});
auditRuleArea.addToFieldSet(row2);
row2=new Ext.Panel(rowConfig);
row2.add({tag: 'div', html: '情况1.所写表达式为非完整sql语句。例(code为字段名)： <font color="red">code=\'admin\'</font>  ',bodyStyle:queryLabel+'width:378;font-size:12px'});
auditRuleArea.addToFieldSet(row2);
row2=new Ext.Panel(rowConfig);
row2.add({tag: 'div', html: '情况2.所写表达式含完整sql语句。例(库存领料业务)：',bodyStyle:queryLabel+'width:300;font-size:12px'});
auditRuleArea.addToFieldSet(row2);
row2=new Ext.Panel(rowConfig);
row2.add({tag: 'div', html: '<font color="red">materialOrder in (select @materialOrder@ from INV.INV_SfcMaterialOrderDetail group by @materialOrder@ having sum(realsum)>200)</font>',bodyStyle:queryLabel+'width:720;font-size:12px'});
auditRuleArea.addToFieldSet(row2);
row2=new Ext.Panel(rowConfig);
row2.add({xtype:'textarea',name:'expression',ctCls:'x-form-focus',width:730,height:200});
auditRuleArea.addToFieldSet(row2);
//-------------------------------------------------
var selectUserField=new Ext.form.TriggerField({allowBlank: false});
selectUserField.onTrigger=selectUser;

var auditStepArea=new ListAreaUnit('auditStepArea');
auditStepArea.setHeight(430);
auditStepArea.setCm([
{
	header: "步骤序号",
	dataIndex: 'step',
	width: 100,
	editor: new Ext.form.NumberField(
	{
		allowBlank: false
	})
},
{
	header: "审核人编码",
	dataIndex: 'userID',
	width: 300,
	editor:selectUserField
},
{
	header: "审核人名称",
	dataIndex: 'userName',
	width: 300,
	editor:  null
}]);
//-------------------------------------------------------
var newAuditStepWin=new WindowUnit('newAuditStepWin');
newAuditStepWin.setTitle('新增审核规则');
var newAuditStepArea=new DetailAreaUnit('newAuditStepArea');
row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '步骤序号：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'numberfield',name:'step',width:120,allowBlank: false});
row1.add({tag: 'div', html: '审核人编码：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'trigger',name:'userID',width:120,allowBlank: false}).onTrigger=selectUser;	
row1.add({tag: 'div', html: '审核人名称：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'userName',width:150});		
newAuditStepArea.addToFieldSet(row1);
//-------------------------------------------------------

//-------------------------------------------------------
function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryBeans);
	//---------------------------------------------
	page2.init();
	
	page2.add(detailBeanArea);
	
	page2.add(flowArea);
	//flowArea.refreshFor(flowArea.queryAuditFlows);
	//---------------------------------------------
	page4.init();
	page4.add(detailAuditFlowArea);
	
	page4.addTab(auditRuleArea);
	page4.addTab(auditStepArea);
	//---------------------------------------------
	newAuditStepWin.init();
	newAuditStepWin.add(newAuditStepArea);
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	mainArea.queryBeans();
	hideLoading();
}

mainArea.queryBeans=function()
{
	SAM_ComponentService.queryBeans(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

mainArea.opExportConfigData=function()
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	SAM_ComponentService.opExportConfigData(obj.componentId,cfgTypeField.getValue(),function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('导出失败');
		}
		else
		{
			alert('如果是eclipse环境下导出文件在放在了WorkSpace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\webapps\\SOC3x\\ExportData\\下');
		}
	});
}

mainArea.enterBeanDetail=function(c)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	setAppContext('componentId',obj.componentId);
	page2.show(c);
	detailBeanArea.queryBean();
	flowArea.queryAuditFlows();
}

detailBeanArea.queryBean=function()
{
	SAM_ComponentService.queryBean(getAppContext('componentId'),function(viewData)
	{
		detailBeanArea.showViewData(viewData);
	});
}

detailBeanArea.backMain=function()
{
	page1.show();
}

flowArea.queryAuditFlows=function()
{
	SAM_ComponentService.queryAuditFlows(getAppContext('componentId'),function(viewData)
	{
		flowArea.showViewData(viewData);
	});
}

flowArea.opModifyAuditFlows=function()
{
	var list=flowArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请您勾选记录');
		return;
	}
	
	SAM_ComponentService.opModifyAuditFlows(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败.'+viewData.message);
		}
		else
		{
			flowArea.queryAuditFlows();
		}
	});
}

flowArea.opDeleteAuditFlows=function()
{
	var list=flowArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请您勾选记录');
		return;
	}
	for(var i=0;i<list.length;i++){
		list[i].componentId=getAppContext('componentId');
	}
	alert1(list);
	Ext.confirm("您确认删除选中的审核流程吗?",function(btn)
	{
		if(btn=='yes')
		{
			Ext.confirm("再次确认?",function(btn1)
			{
				if(btn1=='yes')
				{
					SAM_ComponentService.opDeleteAuditFlows(list,function(viewData)
					{
						if(!viewData.isSucceed)
						{
							Ext.alert('删除失败.'+viewData.message);
						}
						else
						{
							flowArea.queryAuditFlows();
						}
					});
				}
			});
		}
	});
}

flowArea.enterDetail=function(c)
{
	var obj=flowArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	setAppContext('flowId',obj.flowId);
	page4.show(c);
	page4.setActiveTab(auditRuleArea);
	detailAuditFlowArea.queryAuditFlow();
	auditRuleArea.queryAuditRuleExpression();
	auditStepArea.queryAuditSteps();
}

flowArea.enterAddNew=function(c)
{
	page4.show(c);
}

flowArea.opTestAudit=function()
{
	var jsonStr=testField.getValue();
	
	if(!jsonStr)
	{
		Ext.alert('快点填写测试值!!!');
		return;
	}
	var obj=null;
	
	try
	{
		obj=Ext.util.JSON.decode(jsonStr);
	}
	catch(e)
	{
		Ext.alert('测试值写错了!');
		return;
	}
	
	SAM_ComponentService.opTestAudit(getAppContext('componentId'),obj,function(viewData)
	{
		Ext.alert(viewData.message);
	});
}

detailAuditFlowArea.queryAuditFlow=function()
{
	SAM_ComponentService.queryAuditFlow(getAppContext('componentId'),getAppContext('flowId'),function(viewData)
	{
		detailAuditFlowArea.showViewData(viewData);
	});
}

detailAuditFlowArea.backToMain=function()
{
	page2.show();
	flowArea.queryAuditFlows();
}

detailAuditFlowArea.opAddNewAuditFlow=function(c)
{
	if(!detailAuditFlowArea.checkFields()) return;
	
	var obj=detailAuditFlowArea.getValueObject();
	
	SAM_ComponentService.opAddNewAuditFlow(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			setAppContext('flowId',viewData.newPrimaryKeys.flowId);
			detailAuditFlowArea.queryAuditFlow();
			page4.show(c);
		}
	});
}

auditRuleArea.queryAuditRuleExpression=function()
{
	SAM_ComponentService.queryAuditRuleExpression(getAppContext('componentId'),getAppContext('flowId'),function(viewData)
	{
		if(viewData.resultList.length>0)
			auditRuleArea.showViewData(viewData);
	});
}

auditRuleArea.opSaveAuditRuleExpression=function()
{
	var obj=auditRuleArea.getValueObject();
	
	obj.componentId=getAppContext('componentId');
	obj.flowId=getAppContext('flowId');
	
	SAM_ComponentService.opSaveAuditRuleExpression(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			auditRuleArea.queryAuditRuleExpression();
		}
	});
}

auditStepArea.queryAuditSteps=function()
{
	SAM_ComponentService.queryAuditSteps(getAppContext('componentId'),getAppContext('flowId'),function(viewData)
	{
		auditStepArea.showViewData(viewData);
	});
}

auditStepArea.opModifyAuditSteps=function()
{
	var list=auditStepArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请您勾选记录');
		return;
	}
	
	SAM_ComponentService.opModifyAuditSteps(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败.'+viewData.message);
		}
		else
		{
			auditStepArea.queryAuditSteps();
		}
	});
}

auditStepArea.opDeleteAuditSteps=function()
{
	var list=auditStepArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请您勾选记录');
		return;
	}
	
	Ext.confirm("您确认删除吗?",function(btn)
	{
		if(btn=='yes')
		{
			SAM_ComponentService.opDeleteAuditSteps(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{
					auditStepArea.queryAuditSteps();
				}
			});
		}
	});
}

auditStepArea.showAddNew=function(c)
{
	newAuditStepWin.show(c);
}

newAuditStepArea.opAddNewAuditStep=function()
{
	if(!newAuditStepArea.checkFields()) return;
	
	var obj=newAuditStepArea.getValueObject();
	
	obj.componentId=getAppContext('componentId');
	obj.flowId=getAppContext('flowId');
	
	SAM_ComponentService.opAddNewAuditStep(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			auditStepArea.queryAuditSteps();
			newAuditStepArea.clean();
		}
	});
}

newAuditStepArea.opAddNewAuditStepAndClose=function()
{
	if(!newAuditStepArea.checkFields()) return;
	
	var obj=newAuditStepArea.getValueObject();
	
	obj.componentId=getAppContext('componentId');
	obj.flowId=getAppContext('flowId');
	
	SAM_ComponentService.opAddNewAuditStep(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			auditStepArea.queryAuditSteps();
			newAuditStepWin.close();
		}
	});
}

newAuditStepArea.close=function()
{
	newAuditStepWin.close();
}

mainArea.opExportAllConfigData=function()
{
	SAM_ComponentService.opExportAllConfigData(mainArea.getAreaInfo(),cfgTypeField.getValue(),function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('导出失败');
		}
		else
		{
			alert('如果是eclipse环境下导出文件在放在了WorkSpace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\webapps\\SOC3x\\ExportData\\下');
		}
	});
}
//---------------------------------------------------------
Ext.onReady(appInit);