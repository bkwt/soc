require('SAM_MenuService');
require('SAM_SystemDefineService');

loadAreaConfig();

var sysStore = new Ext.data.Store({
	fields: ['EN','CH']
});
SAM_SystemDefineService.getSystems(function(list)
		{
			sysStore.loadData(list);
		});
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "系统编码",
	dataIndex: 'sysCode',
	flex: 1,
	sort:true,
	editor: new Ext.form.ComboBox(
	{
		store: sysStore,
		queryMode: 'local', 
		valueField:'EN',
		displayField:'CH',
		
		width:100
	})
},
{
	header: "菜单编码",
	dataIndex: 'menuCode',
	flex: 1,
	sort:true,
	editor: null//,
	//summaryType: 'count',
	//summaryRenderer: function(value){return '系统总数：'+value    }
},
{
	header: "菜单名称",
	dataIndex: 'menuName',
	flex: 1,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "序号",
	dataIndex: 'menuIndex',
	flex: 1,
	editor: new Ext.form.NumberField(
	{
		allowBlank: false
	})
},
{
	header: "父菜单",
	dataIndex: 'menuFather',
	flex: 1,
	editor: null
}]);
mainArea.addToQueryPanel([
{xtype:'combo',name:'sysCode',fieldLabel:'系统编码1',editable:false,queryMode: 'local',store: sysStore,valueField:'EN',displayField:'CH'},
{xtype:'textfield',name:'menuCode',fieldLabel:'菜单编码'},
{xtype:'textfield',name:'menuName',fieldLabel:'菜单名称'}]
);

var newMenuWin=new WindowUnit('newMenuWin');
newMenuWin.setTitle('新增菜单');

var newMenuArea=new DetailAreaUnit('newMenuArea');

newMenuArea.addToFieldSet([
{xtype:'combo',name:'sysCode',fieldLabel:'系统编码',queryMode: 'local',editable:false,store: sysStore,valueField:'EN',displayField:'CH',allowBlank: false},
{xtype:'textfield',name:'menuCode',fieldLabel:'菜单编码'},
{xtype:'numberfield',name:'menuIndex',fieldLabel:'序号',allowBlank: false,minValue:1},
{xtype:'textfield',name:'menuFather',fieldLabel:'父菜单',allowBlank: false},
{xtype:'textfield',name:'menuName',fieldLabel:'菜单名称',allowBlank:false}]
);


function appInit()
{
	page1.init();
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryMenus);
	
	newMenuWin.init();
	newMenuWin.add(newMenuArea);
	
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryMenus();
	hideLoading();
	
}


mainArea.queryMenus=function()
{
	SAM_MenuService.queryMenus(mainArea.getAreaInfo(),function(viewData)
			{
				mainArea.showViewData(viewData);
			})
}
mainArea.showNewMenuWin = function(constParam)
{
	newMenuWin.show(constParam); 
}

mainArea.opModifyMenus=function()
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	SAM_MenuService.opModifyMenus(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败');
		}
		else
		{
			mainArea.queryMenus();
		}
	});
}

newMenuArea.opAddNewMenu=function()
{
	if(!newMenuArea.checkFields()) return;
	var obj=newMenuArea.getValueObject();
	SAM_MenuService.opAddNewMenu(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			newMenuArea.clean();
			mainArea.queryMenus();
		}
	});
}
	
mainArea.opDeleteMenus=function()
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	if(Ext.confirm('确认删除吗?',function(btn)
	{
		if(btn=='yes')
		{
			SAM_MenuService.opDeleteMenus(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					mainArea.queryMenus();
				}
			});
		}
	})); 
}

mainArea.opExportMenuData=function()
{
	SAM_MenuService.opExportMenuData(mainArea.getAreaInfo(),function(viewData)
	{
		Ext.alert('已导出到SOC3x\\ExportData下');
	});
}
Ext.onReady(appInit);