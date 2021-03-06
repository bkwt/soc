require('SAM_SelectPageFilterService');
include('SelectFunction');

loadAreaConfig();

function selectFunction(e)
{
	showSelectFunction(e,'COMPLEX',setFunction,'_t1.functionId not in (select targetCode from TQueryPower where componentId=\''+getAppContext('componentId')+'\' and methodName=\''+getAppContext('methodName')+'\' and filterType=\'F\')');
}

function setFunction(siteTag,addList,removeList)
{
	var list=[];
	
	for(var i=0;i<addList.length;++i)
	{
		list.push({componentId:getAppContext('componentId'),methodName:getAppContext('methodName'),targetCode:addList[i].functionId,targetName:addList[i].functionName,filterType:'F',powerConditions:'6=6'});
	}
	
	SAM_SelectPageFilterService.opAddQueryFunctionPowers(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('添加菜单失败.');
		}
		else
		{
			powerArea.queryQueryPowers();
		}
	});
}
//------------------------------------------
var row1,row2,row3;
//-------------------------------------------------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "业务构件编码",
	dataIndex: 'componentId',
	width: 350,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "说明",
	dataIndex: 'componentName',
	width: 390,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}]);

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '业务构件编码：',bodyStyle:queryLabel+'width:300'});
row1.add({xtype:'textfield',name:'componentId',width:260,rule:'@NAME@ LIKE \'%@VALUE@%\''});

mainArea.addToQueryPanel(row1);
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
//-------------------------------------------------------
var methodArea=new ListAreaUnit('methodArea');
methodArea.setCm([
{
	header: "方法名称",
	dataIndex: 'methodName',
	width: 350
},
{
	header: "说明",
	dataIndex: 'methodDesc',
	width: 350
}]);
//-------------------------------------------------------
var page3 = new PageUnit('page3');

var detailMethodArea=new DetailAreaUnit('detailMethodArea');

row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '方法名称：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'methodName',allowBlank:false,regex:/^query[a-zA-z]+s$/,width:300});

row1.add({tag: 'div', html: '说明：',bodyStyle:queryLabel+'width:90'});
row1.add({xtype:'textfield',name:'methodDesc',width:200});
row1.add({xtype:'hidden',name:'hid'});

detailMethodArea.addToFieldSet(row1);

var powerArea=new ListAreaUnit('powerArea');
powerArea.setCm([
{
	header: "目标编码",
	dataIndex: 'targetCode',
	width: 120
},
{
	header: "目标名称",
	dataIndex: 'targetName',
	width: 120
},
{
	header: "条件",
	dataIndex: 'powerConditions',
	width: 400,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
}]);
//-------------------------------------------------------
function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryBeans);
	//---------------------------------------------
	page2.init();
	page2.add(detailBeanArea);
	page2.add(methodArea);
	//methodArea.refreshFor();
	//---------------------------------------------
	page3.init();
	page3.add(detailMethodArea);
	page3.add(powerArea);
	
	//---------------------------------------------
	
	page1.show(request.getParameter('progParams'));

	mainArea.queryBeans();

	hideLoading();
}

mainArea.queryBeans=function()
{
	SAM_SelectPageFilterService.queryBeans(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
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
	methodArea.queryMethods();
}

mainArea.opExportSQL=function()
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	SAM_SelectPageFilterService.opExportSQL(obj.componentId,function(viewData)
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

detailBeanArea.queryBean=function()
{
	SAM_SelectPageFilterService.queryBean(getAppContext('componentId'),function(viewData)
	{
		detailBeanArea.showViewData(viewData);
	});
}

detailBeanArea.backToMain=function()
{
	page1.show();
	//mainArea.queryBeans();
}

methodArea.queryMethods=function()
{
	SAM_SelectPageFilterService.queryMethods(getAppContext('componentId'),function(viewData)
	{
		methodArea.showViewData(viewData);
	});
}

methodArea.enterAddNewMethod=function(c)
{
	page3.show(c);
}

methodArea.enterMethodDetail=function(c)
{
	var obj=methodArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	setAppContext('methodName',obj.methodName);
	
	page3.show(c);
	detailMethodArea.queryMethod();
	powerArea.queryQueryPowers();
}

methodArea.opDeleteMethods=function()
{
	var list=methodArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请您勾选记录');
		return;
	}
	for(var i=0;i<list.length;i++){
		list[i].componentId=getAppContext('componentId');
	}
	Ext.confirm("您确认删除吗?",function(btn)
	{
		if(btn=='yes')
		{
			SAM_SelectPageFilterService.opDeleteMethods(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{
					methodArea.queryMethods();
				}
			});
		}
	});
}

detailMethodArea.backToMain=function()
{
	page2.show();
	//methodArea.queryMethods();
}

powerArea.queryQueryPowers=function()
{
	SAM_SelectPageFilterService.queryQueryPowers(getAppContext('componentId'),getAppContext('methodName'),function(viewData)
	{
		powerArea.showViewData(viewData);
	});
}

detailMethodArea.queryMethod=function()
{
	SAM_SelectPageFilterService.queryMethod(getAppContext('componentId'),getAppContext('methodName'),function(viewData)
	{
		detailMethodArea.showViewData(viewData);
	});
}

detailMethodArea.opSaveQueryPowers=function(c)
{
	if(!detailMethodArea.checkFields()) return;
	
	var obj=detailMethodArea.getValueObject();
	var list=powerArea.getAllObjects();
	
	obj.componentId=getAppContext('componentId');
	
	for(var i=0;i<list.length;++i)
	{
		list[i].componentId=obj.componentId;
		list[i].methodName=obj.methodName;
		if(!list[i].powerConditions)
		{
			list[i].powerConditions='6=6';
		}
	}
	
	SAM_SelectPageFilterService.opSaveQueryPowers(obj,list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			setAppContext('methodName',obj.methodName);
			if(c)
			{
				page3.show(c);
			}
			detailMethodArea.queryMethod();
			powerArea.queryQueryPowers();
		}
	});
}

powerArea.addFunction=function(c)
{
	selectFunction(null);
}

powerArea.opRemoveQueryPowers=function(c)
{
	var list=powerArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	Ext.confirm('确定删除吗?',function(btn)
	{
		if(btn=='yes')
		{
			SAM_SelectPageFilterService.opRemoveQueryPowers(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{
					powerArea.queryQueryPowers();
				}
			});
		}
	});
}

methodArea.opGetMethods=function()
{
	SAM_SelectPageFilterService.opGetMethods(getAppContext('componentId'),function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('获取失败.'+viewData.message);
		}
		else
		{
			methodArea.queryMethods();
		}
	});
}
Ext.onReady(appInit);