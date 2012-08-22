require('SAM_SystemDefineService');
require('SAM_ComponentService');

loadAreaConfig();

var sysStore = new Ext.data.Store({
	fields: ['CH','EN']
});

SAM_SystemDefineService.getSystems(function(list)
{
	sysStore.loadData(list);
});

var fieldStore = new Ext.data.Store({
	fields: ['name','code']
});

var funcStore = new Ext.data.Store({
	fields: ['name']
});

var cfgTypeStore = Ext.create('Ext.data.Store',{
	fields: ['CH']
});
cfgTypeStore.loadData([['全部'],['编码规则'],['审核流程']]);
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
	width:400,
	renderer:displayBeanCode,
	editor: null
},
{
	header: "名称",
	dataIndex: 'componentName',
	width:400,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}]);

mainArea.addToQueryPanel([
{
	xtype:'textfield',
	name:'componentId',
	fieldLabel:'构件编码',
	rule:'@NAME@ LIKE \'%@VALUE@%\''
},
{
	xtype:'textfield',
	name:'componentName',
	fieldLabel:'构件名称',
	rule:'@NAME@ LIKE \'%@VALUE@%\''
}]);

//var cfgTypeField=mainArea.addToSumPanel({fieldLabel:'导出项',xtype:'combo',name:'operator',width:200,queryMode: 'local',  store: cfgTypeStore,value:'全部',displayField:'CH',valueField:'CH'});
//-------------------------------------------------------
var page2 = new PageUnit('page2');

var detailBeanArea=new DetailAreaUnit('detailBeanArea');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '业务构件编码：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'componentId',width:350});
			
row1.add({tag: 'div', html: '说明：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'componentName',width:120});

detailBeanArea.addToFieldSet(row1);

var pkruleArea=new ListAreaUnit('pkruleArea');

pkruleArea.setCm([
{
	dataIndex: 'componentId',
	hidden:true
},
{
	header: "规则编码",
	dataIndex: 'pkruleCode',
	width: 100,
	editor: null
},
{
	header: "规则名称",
	dataIndex: 'pkruleName',
	width: 120,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "表对象类名",
	dataIndex: 'billtableName',
	width: 280,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "主键名",
	dataIndex: 'billtablePkfield',
	width: 80,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "子系统",
	dataIndex: 'sysCode',
	width: 60,
	editor: new Ext.form.ComboBox(
	{
		store: sysStore,
		valueField:'EN',
		displayField:'CH',
		width:60,
		allowBlank: false
	})
},
{
	header: "备注",
	dataIndex: 'pkruleNote',
	width: 60,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}]);

pkruleArea.setTitle('单据编码规则定义');
//-------------------------------------------------------
var newPKRuleWin=new WindowUnit('newPKRuleWin');
newPKRuleWin.setTitle('新增单据编码规则');

var newPKRuleArea=new DetailAreaUnit('newPKRuleArea');
newPKRuleArea.setTitle('');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '规则编码：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'pkruleCode',width:100,allowBlank: true});
			
row1.add({tag: 'div', html: '规则名称：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'pkruleName',width:100,allowBlank: false});

row1.add({tag: 'div', html: '子系统：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'combo',name:'sysCode',width:100,queryMode: 'local',store: sysStore,valueField:'EN',displayField:'EN',allowBlank: false});
row1.add({xtype:'hidden',name:'hid'});

row1.add({tag: 'div', html: '主键名：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'billtablePkfield',width:100,allowBlank: false});

newPKRuleArea.addToFieldSet(row1);

row2=new Ext.Panel(rowConfig);
						
row2.add({tag: 'div', html: '表对象类名：',bodyStyle:queryLabel+'width:80'});
row2.add({xtype:'textfield',name:'billtableName',width:454,allowBlank: false});
			
row2.add({tag: 'div', html: '备注：',bodyStyle:queryLabel+'width:80'});
row2.add({xtype:'textfield',name:'pkruleNote',width:100});

newPKRuleArea.addToFieldSet(row2);
//-------------------------------------------------------
var page3 = new PageUnit('page3');

var detailPKRuleArea=new DetailAreaUnit('detailPKRuleArea');
//detailPKRuleArea.setTitle('单据编码规则');

var row0=new Ext.Panel(rowConfig);
						
row0.add({tag: 'div', html: '业务构件编码：',bodyStyle:queryLabel+'width:100'});
row0.add({xtype:'textfield',name:'componentId',width:454});

detailPKRuleArea.addToFieldSet(row0);

row1=new Ext.Panel(rowConfig);

row1.add({tag: 'div', html: '子系统：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'sysCode',width:100});
			
row1.add({tag: 'div', html: '规则编码：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'pkruleCode',width:100});
			
row1.add({tag: 'div', html: '规则名称：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'pkruleName',width:100});

row1.add({tag: 'div', html: '主键名：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'billtablePkfield',width:100});

row1.add({xtype:'hidden',name:'hid'});

detailPKRuleArea.addToFieldSet(row1);

row2=new Ext.Panel(rowConfig);
						
row2.add({tag: 'div', html: '表对象类名：',bodyStyle:queryLabel+'width:100'});
row2.add({xtype:'textfield',name:'billtableName',width:454});

row2.add({tag: 'div', html: '备注：',bodyStyle:queryLabel+'width:80'});
row2.add({xtype:'textfield',name:'pkruleNote',width:100});

detailPKRuleArea.addToFieldSet(row2);

var fieldComboBox=new Ext.form.ComboBox(
{
	store: fieldStore,
	valueField:'code',
	displayField:'name',
	autoWidth:true
});

fieldComboBox.on('focus',function()
{
	SAM_ComponentService.getFields(getAppContext('componentId'),getAppContext('pkruleCode'),function(list)
	{
		list.splice(0,0,['(空)',null]);
		fieldStore.loadData(list);
	});
});

var funcComboBox=new Ext.form.ComboBox(
{
	store: funcStore,
	valueField:'name',
	displayField:'name',
	width:150
});

funcComboBox.on('focus',function()
{
	SAM_ComponentService.getFuncs(function(list)
	{
		list.splice(0,0,[null]);
		funcStore.loadData(list);
	});
});


var pkruleChildArea=new ListAreaUnit('pkruleChildArea');
pkruleChildArea.setHeight(400);
pkruleChildArea.setCm([
{
	header: "序号",
	dataIndex: 'seqId',
	width: 80,
	editor: new Ext.form.NumberField(
	{
		allowBlank: false,
		minValue:0
	})
},
{
	header: "属性编码",
	dataIndex: 'fieldCode',
	width: 200,
	editor: fieldComboBox
},
{
	header: "函数名",
	dataIndex: 'pkfuncCode',
	width: 150,
	editor: funcComboBox
},
{
	header: "函数参数",
	dataIndex: 'pkfuncParam',
	width: 100,
	renderer:'htmlEncode',
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "内容",
	dataIndex: 'inRule',
	width: 50,
	renderer:StrUtil.displayYN,
	editor: new Ext.form.ComboBox(
	{
		store: YNStore,
		valueField:'EN',
		displayField:'CH',
		width:50
	})
},
{
	header: "条件",
	dataIndex: 'inCndt',
	width: 50,
	renderer:StrUtil.displayYN,
	editor: new Ext.form.ComboBox(
	{
		store: YNStore,
		valueField:'EN',
		displayField:'CH',
		width:50
	})
},
{
	header: "条件值",
	dataIndex: 'inCndtValue',
	width: 80,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}]);

pkruleChildArea.setTitle('规则明细定义');


var fieldArea=new ListAreaUnit('fieldArea');
fieldArea.setHeight(400);
fieldArea.setCm([
{
	header: "属性编码",
	dataIndex: 'fieldCode',
	width: 150,
	editor: new Ext.form.TextField(
	{
		allowBlank: false,
		minValue:0
	})
},
{
	header: "属性名称",
	dataIndex: 'fieldName',
	width: 150,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "属性说明",
	dataIndex: 'fieldNote',
	width: 250,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "测试值",
	dataIndex: 'fieldTest',
	width: 150,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}]);

fieldArea.setTitle('属性定义');

//-------------------------------------------------------
var newFieldWin=new WindowUnit('newFieldWin');
newFieldWin.setTitle('新增属性');

var newFieldArea=new DetailAreaUnit('newFieldArea');
newFieldArea.setTitle('');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '属性编码：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'fieldCode',width:100,allowBlank: false});
			
row1.add({tag: 'div', html: '属性名称：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'fieldName',width:100,allowBlank: false});

row1.add({tag: 'div', html: '属性说明：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'fieldNote',width:100});

row1.add({tag: 'div', html: '测试值：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'fieldTest',width:100});

row1.add({xtype:'hidden',name:'hid'});

newFieldArea.addToFieldSet(row1);

//-------------------------------------------------------
var newPKRuleDetailWin=new WindowUnit('newPKRuleDetailWin');
newPKRuleDetailWin.setTitle('新增规则明细');

var newPKRuleDetailArea=new DetailAreaUnit('newPKRuleDetailArea');
//newPKRuleDetailArea.setTitle('');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '序号：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'numberfield',name:'seqId',width:150,allowBlank: false,minValue:0});
			
row1.add({tag: 'div', html: '属性编码：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'combo',name:'fieldCode',store: fieldStore,valueField:'code',displayField:'code',width:150}).on('focus',function()
{
	SAM_ComponentService.getFields(getAppContext('componentId'),getAppContext('pkruleCode'),function(list)
	{
		list.splice(0,0,[null]);
		fieldStore.loadData(list);
	});
});

row1.add({xtype:'hidden',name:'hid'});

newPKRuleDetailArea.addToFieldSet(row1);

row2=new Ext.Panel(rowConfig);

row2.add({tag: 'div', html: '函数名：',bodyStyle:queryLabel+'width:100'});
row2.add({xtype:'combo',name:'pkfuncCode',store: funcStore,valueField:'name',displayField:'name',width:150}).on('focus',function()
{
	SAM_ComponentService.getFuncs(function(list)
	{
		list.splice(0,0,[null]);
		funcStore.loadData(list);
	});
});

row2.add({tag: 'div', html: '函数参数：',bodyStyle:queryLabel+'width:100'});
row2.add({xtype:'textfield',name:'pkfuncParam',width:150});

newPKRuleDetailArea.addToFieldSet(row2);

row3=new Ext.Panel(rowConfig);

row3.add({tag: 'div', html: '内容：',bodyStyle:queryLabel+'width:100'});
row3.add({xtype:'combo',name:'inRule',store: YNStore,valueField:'EN',displayField:'CH',width:50,allowBlank: false});

row3.add({tag: 'div', html: '条件：',bodyStyle:queryLabel+'width:100'});
row3.add({xtype:'combo',name:'inCndt',store: YNStore,valueField:'EN',displayField:'CH',width:50,allowBlank: false});

row3.add({tag: 'div', html: '条件值：',bodyStyle:queryLabel+'width:103'});
row3.add({xtype:'textfield',name:'inCndtValue',width:100});

newPKRuleDetailArea.addToFieldSet(row3);

newPKRuleDetailArea.setWidth(600);
//-------------------------------------------------------
//-------------------------------------------------------
var noteStr='01、PKF_CASTDATE  日期转换，将当前的字段值做日期转换。例:<yyyy-MM-dd,MM>表示当前字段值的日期格式为yyyy-MM-dd，要求转换为MM格式，即取两位月份。\n\n'
	+'02、PKF_CURDATE   当前日期，例：<yy-MM-dd>表示将当前的日期按参数中给定的格式生成当前日期，此例的生成结果形如06-09-09。\n\n'
	+'03、PKF_CURVALUE  当前值，即取当前字段值，例：<>，约束：字段编码不可为空。\n\n'
	+'04、PKF_FIXED     固定值，取固定值，例：<JLD>，表示该位置为JLD三个固定字符。约束：字段编码应为空。\n\n'
	+'05、PKF_NULL      空函数，空函数，只需要填写一对尖括号即可，例：<>，程序中不处理它，主要是为了填写一些条件值时使用。\n\n'
	+'06、PKF_PERIOD    取核算期，此函数目前弃用，需要各业务系统自行判断核算期。\n\n'
	+'07、PKF_SEQID     流水号，取流水号。例:<4>，表示选用4位流水号，如果流水不足四位，则用0补齐。约束：字段编码为空。\n\n'
	+'08、PKF_SUBEND    从后截取，将当前的字段值做截取处理。例:<4>，表示从后面开始截取4位，程序处理时，会对中间的数值进行判断，不补足。\n\n'
	+'09、PKF_SUBEND1   从后截取补足，将当前的字段值做截取处理。例:<4,A>，表示从后面开始截取4位，程序处理时，会对中间的数值进行判断，如长度不足四位则使用A补足。\n\n'
	+'10、PKF_SUBSTART  从前截取，将当前的字段值做截取处理。例:<4>，表示从前面开始截取4位，程序处理时，会对中间的数值进行判断，不补足。\n\n'
	+'11、PKF_SUBSTART1 从前截取补足，将当前的字段值做截取处理。例:<4,A>，表示从前面开始截取4位，程序处理时，会对中间的数值进行判断，如长度不足四位则使用A补足。';
//-------------------------------------------------------
function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryBeans);
	//---------------------------------------------
	page2.init();
	
	page2.add(detailBeanArea);
	
	page2.add(pkruleArea);
	
	newPKRuleWin.init();
	newPKRuleWin.add(newPKRuleArea);
	//---------------------------------------------
	page3.init();
	page3.add(detailPKRuleArea);
	
	page3.addTab(pkruleChildArea);
	
	page3.addTab(fieldArea);
	
	page3.addTabItem(new Ext.Panel({title:'函数说明',autoHeight:true,items:[new Ext.form.TextArea({width:787,height:450,readOnly:true,value:noteStr})]}));
	//---------------------------------------------
	newFieldWin.init();
	newFieldWin.add(newFieldArea);
	//---------------------------------------------
	newPKRuleDetailWin.init();
	newPKRuleDetailWin.add(newPKRuleDetailArea);
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
	pkruleArea.queryPKRules();
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

pkruleArea.queryPKRules=function()
{

	SAM_ComponentService.queryPKRules(getAppContext('componentId'),function(viewData)
	{
		pkruleArea.showViewData(viewData);
	});
}

pkruleArea.showNewPKRuleWin=function(constParam)
{
	newPKRuleWin.show(constParam);
}

newPKRuleArea.opAddNewPKRule=function(constParam)
{
	if(!newPKRuleArea.checkFields()) return;
	
	var obj=newPKRuleArea.getValueObject();
	obj.componentId=getAppContext('componentId');
	
	SAM_ComponentService.opAddNewPKRule(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			setAppContext('pkruleCode',viewData.newPrimaryKeys.pkruleCode);
			page3.show(constParam);
			detailPKRuleArea.queryPKRule();
		}
	});
}

pkruleArea.enterPKruleDetail=function(constParam)
{
	var obj=pkruleArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	setAppContext('pkruleCode',obj.pkruleCode);
	page3.show(constParam);
	page3.setActiveTab(fieldArea);
	detailPKRuleArea.queryPKRule();
	pkruleChildArea.queryPKRuleDetails();
	fieldArea.queryFields();
}

detailPKRuleArea.queryPKRule=function()
{
	SAM_ComponentService.queryPKRule(getAppContext('componentId'),getAppContext('pkruleCode'),function(viewData)
	{
		detailPKRuleArea.showViewData(viewData);
	});
}

detailPKRuleArea.backBeanDetail=function()
{
	page2.show();
	pkruleArea.queryPKRules();
}

pkruleChildArea.queryPKRuleDetails=function()
{
	SAM_ComponentService.queryPKRuleDetails(getAppContext('componentId'),getAppContext('pkruleCode'),function(viewData)
	{
		pkruleChildArea.showViewData(viewData);
	});
}

fieldArea.queryFields=function()
{
	SAM_ComponentService.queryFields(getAppContext('componentId'),getAppContext('pkruleCode'),function(viewData)
	{
		fieldArea.showViewData(viewData);
	});
}

fieldArea.showNewFieldWin=function(c)
{
	newFieldWin.show(c);
}

newFieldArea.opAddNewField=function()
{
	if(!newFieldArea.checkFields()) return;
	
	var obj=newFieldArea.getValueObject();
	obj.componentId=getAppContext('componentId');
	obj.pkruleCode=getAppContext('pkruleCode');
	
	SAM_ComponentService.opAddNewField(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			
			fieldArea.queryFields();
			newFieldArea.clean();
		}
	});
}

newFieldArea.opAddNewFieldAndClose=function()
{
	if(!newFieldArea.checkFields()) return;
	
	var obj=newFieldArea.getValueObject();
	obj.componentId=getAppContext('componentId');
	obj.pkruleCode=getAppContext('pkruleCode');
	
	SAM_ComponentService.opAddNewField(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			
			fieldArea.queryFields();
			newFieldWin.close();
		}
	});
}

newFieldArea.close=function()
{
	newFieldWin.close();
}

pkruleChildArea.showNewPKRuleDetailWin=function(c)
{
	newPKRuleDetailWin.show(c);
}

fieldArea.myTestPKRule=function()
{
	SAM_ComponentService.myTestPKRule(getAppContext('pkruleCode'),function(str)
	{
		Ext.alert(str);
	});
}

newPKRuleDetailArea.opAddNewPKRuleDetail=function()
{
	if(!newPKRuleDetailArea.checkFields()) return;
	
	var obj=newPKRuleDetailArea.getValueObject();
	obj.componentId=getAppContext('componentId');
	obj.pkruleCode=getAppContext('pkruleCode');
	
	SAM_ComponentService.opAddNewPKRuleDetail(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			
			pkruleChildArea.queryPKRuleDetails();
			newPKRuleDetailArea.clean();
		}
	});
}

newPKRuleDetailArea.opAddNewPKRuleDetailAndClose=function()
{
	if(!newPKRuleDetailArea.checkFields()) return;
	
	var obj=newPKRuleDetailArea.getValueObject();
	obj.componentId=getAppContext('componentId');
	obj.pkruleCode=getAppContext('pkruleCode');
	
	SAM_ComponentService.opAddNewPKRuleDetail(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			
			pkruleChildArea.queryPKRuleDetails();
			newPKRuleDetailWin.close();
		}
	});
}

newPKRuleDetailArea.close=function()
{
	newPKRuleDetailWin.close();
}

pkruleArea.opDeletePKRules=function()
{
	var list=pkruleArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	Ext.confirm("确认删除编码规则吗?删除编码规则将删除其下的所有编码规则明细及字段信息.",function(btn)
	{
		if(btn=='yes')
		{
			SAM_ComponentService.opDeletePKRules(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					
					pkruleArea.queryPKRules();
				}
			});
		}
	});
}

pkruleArea.opModifyPKRules=function()
{
	if(!pkruleArea.checkFields()) return;
	
	var list=pkruleArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	SAM_ComponentService.opModifyPKRules(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败');
		}
		else
		{
			
			pkruleArea.queryPKRules();
		}
	});
}

fieldArea.opModifyFields=function()
{
	if(!fieldArea.checkFields()) return;
	
	var list=fieldArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	SAM_ComponentService.opModifyFields(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败');
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
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	Ext.confirm("确认删除吗?",function(btn)
	{
		if(btn=='yes')
		{
			SAM_ComponentService.opDeleteFields(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					
					fieldArea.queryFields();
				}
			});
		}
	});
}

pkruleChildArea.opModifyPKRuleDetails=function()
{
	if(!pkruleChildArea.checkFields()) return;
	
	var list=pkruleChildArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	SAM_ComponentService.opModifyPKRuleDetails(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败');
		}
		else
		{
			
			pkruleChildArea.queryPKRuleDetails();
		}
	});
}

pkruleChildArea.opDeletePKRuleDetails=function()
{
	var list=pkruleChildArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	Ext.confirm("确认删除吗?",function(btn)
	{
		if(btn=='yes')
		{
			SAM_ComponentService.opDeletePKRuleDetails(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					
					pkruleChildArea.queryPKRuleDetails();
				}
			});
		}
	});
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

Ext.onReady(appInit);
