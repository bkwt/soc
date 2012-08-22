require('SAM_RoleService');
loadAreaConfig();

var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "角色编码",
	dataIndex: 'roleCode',
	flex: 1,
	sort:true
},
{
	header: "角色名称",
	dataIndex: 'roleName',
	flex: 1,
	sort:true
},
{
	header: "备注",
	dataIndex: 'roleNote',
	flex: 1
}]);
mainArea.addToQueryPanel([  
{ fieldLabel: "角色编码", xtype: "textfield",name: 'roleCode' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "角色名称", xtype: "textfield",name: 'roleName',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);

var page2 = new PageUnit('page2');

var detailArea=new DetailAreaUnit('detailArea');
detailArea.addToFieldSet([{
    fieldLabel: '角色编码',
    name: 'roleCode',
    xtype:'textfield',
    allowBlank: false
    
}, {
    fieldLabel: '角色名称',
    name: 'roleName',
    xtype:'textfield',
    allowBlank: false
}, {
    fieldLabel: '备注',
    name: 'roleNote',
    xtype:'textfield'
}]);

var buttomPanel=new Ext.Panel(
{
			height:450,
			bodyStyle: panelBodyStyle,
			layout: 'column',
			autoHeight:true
});
var menuTree = new Ext.tree.Panel({
    split: true,
    autoScroll: true,
    containerScroll: true,
    rootVisible: false,
    border : true, 
    width:400,
	height:450,
	viewConfig: {plugins: { ptype: 'treeviewdragdrop', appendOnly: true },
		 listeners:{
	            beforedrop: function(node,data,m){
	            	var obj = data.records[0].data;
	            	if(obj.leaf==true){
	            		var id = menuTree.getStore().getNodeById(obj.id);
	            		if(id !== undefined){
	            			Ext.alert('该构件功能已经在['+m.get('text')+']下存在.');
	            			return false;
	            		}
	            		changeList.push({roleCode:getAppContext('roleCode'),functionId:obj.id,menuCode:m.get('id')});
	            		return true;
	            	}else{
	            		return false;
	            	}
	            }
	        }
	},
    store : Ext.create('Ext.data.TreeStore',{
    	fields:['id','text']
    }),
    listeners : { 
    	'beforeitemexpand': function(node,obj){ 
        	if(node.hasChildNodes() == false)
        		queryMenus(getAppContext('roleCode'),node.get('id'));
        }  
    }  
});
var componentTree=new Ext.tree.Panel({
	split: true,
    autoScroll: true,
    containerScroll: true,
    rootVisible: false,
    border : true, 
    enableDrag:true,
    width:400,
	height:450,
	viewConfig: {plugins: { ptype: 'treeviewdragdrop', appendOnly: true } },
	store : Ext.create('Ext.data.TreeStore',{
    	fields:['id','text']
    }),
    listeners : {  
        'beforeitemexpand': function(node,obj){ 
        	if(node.hasChildNodes() == false)
        		queryFunctions(node.get('id'));
        }  
    }  
});

var changeList=[];
function appInit()
{
	page1.init();
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryRoles);
	
	
	page2.init();
	page2.add(detailArea);

	buttomPanel.add(menuTree);
	buttomPanel.add(new Ext.Panel({width:0,bodyStyle: 'border-color:#eef4ff;',layout:'table',height:0}));
	buttomPanel.add(componentTree);
	
	page2.addItem(buttomPanel);
	
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryRoles();
	hideLoading();
}

mainArea.showNewRoleWin  = function(constParam)
{
	page2.show(constParam);
	detailArea.fields['roleCode'].focus(false,100);
	changeList=[];
	setAppContext('roleCode','');
	menuTree.getStore().getNodeById('root').removeAll();
		
	queryMenus(getAppContext('roleCode'),'root');
	queryComponents('root');
}

mainArea.queryRoles=function()
{
	SAM_RoleService.queryRoles(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
detailArea.opAddNewRole=function()
{
	if(!detailArea.checkFields()) return;
	var obj=detailArea.getValueObject();
	
	for(var i=0;i<changeList.length;i++){
		changeList[i].roleCode=obj.roleCode;
	}
	
	SAM_RoleService.opAddNewRole(obj,{callback:function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			setAppContext('roleCode',obj.roleCode);
		}
	},
	async:false});
	if(getAppContext('roleCode')=='' || getAppContext('roleCode')==null) return;
	SAM_RoleService.opSaveRoleConfig(changeList,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('保存失败');
				}
				else
				{
					changeList=[];
					
					page2.show('EDIT');
				}
			});
}

mainArea.opDeleteRoles=function()
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	Ext.confirm('确认删除吗?',function(btn)
	{
		if(btn=='yes')
		{
			SAM_RoleService.opDeleteRoles(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					
					mainArea.queryRoles();
				}
			});
		}
	});
}
mainArea.enterDetail=function(constParam)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	setAppContext('roleCode',obj.roleCode);
	
	page2.show(constParam);
	
	detailArea.queryRole();

	changeList=[];
	
	menuTree.getStore().getNodeById('root').removeAll();
		
	
	queryMenus(getAppContext('roleCode'),'root');
	queryComponents('root');
}
detailArea.queryRole=function()
{
	SAM_RoleService.queryRole(getAppContext('roleCode'),function(viewData)
	{
		detailArea.showViewData(viewData);
	});
}
detailArea.backToMain=function()
{
	if(changeList.length===0)
	{
		page1.show();
	}
	else
	{
		Ext.confirm('角色授权未保存,您想保存后退出吗？',function(btn)
		{
			if(btn=='yes')
			{
				SAM_RoleService.opSaveRoleConfig(changeList,function(viewData)
				{
					if(!viewData.isSucceed)
					{
						Ext.alert('保存失败');
					}
					else
					{
						changeList=[];
						page1.show();
						mainArea.queryRoles();
					}
				});
			}
			else
			{
				page1.show();
			}
		});
	}
}
detailArea.opSaveRoleConfig=function()
{
	if(!detailArea.checkFields()) return;
	var obj=detailArea.getValueObject();
	
	SAM_RoleService.opModifyRole(obj,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('修改失败');
				}
				else
				{
				}
			});
	SAM_RoleService.opSaveRoleConfig(changeList,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败');
		}
		else
		{
			changeList=[];
		}
	});
}

detailArea.removeFunctionFromMenu=function()
{
	var records=menuTree.getSelectionModel().getSelection();
	
	if(!records)
	{
		Ext.alert("请选中菜单树上的一个构件功能节点.");
		return;
	}
	
	node = records[0].data;
	if(node.leaf ==false)
	{
		Ext.alert("请选中菜单树上的一个构件功能节点.");
		return;
	}
	
	var foundIt=false;
	
	for(var i=0;i<changeList.length;++i)
	{
		if(node.id==changeList[i].functionId)
		{
			changeList[i].menuCode=null;
			foundIt=true;
			break;
		}
	}
	if(!foundIt)
	{
		changeList.push({roleCode:getAppContext('roleCode'),functionId:node.id,menuCode:null});
	}
	
	records[0].remove();
}
function queryMenus(roleCode,id)
{
	if(roleCode == null) roleCode = '';
	SAM_RoleService.queryMenuAndFunctions(roleCode,id,function(viewData)
		{
			if(!viewData.isSucceed) return;
			
			var list=viewData.resultList;
			if(list.length>0)
			menuTree.getStore().getNodeById(id).appendChild(list); 
			
		}
	);
}
function queryComponents(id)
{
	if(componentTree.getStore().getNodeById(id).hasChildNodes()==false)
	{
		SAM_RoleService.queryComponents(function(viewData)
		{
			if(!viewData.isSucceed) return;
			
			var list=viewData.resultList;
			
			for(var i=0;i<list.length;i++){
				var node = componentTree.getStore().getNodeById(list[i].pid);
				if(node)
					node.appendChild(list[i]);
			}
			
		});
	}
}
function queryFunctions(id)
{
	SAM_RoleService.queryFunctions(id,
	{
		callback:function(viewData)
		{
			var list=viewData.resultList;
			if(list != null && list.length > 0)
				componentTree.getStore().getNodeById(id).appendChild(list); 
		},
		async:false
	});
}
Ext.onReady(appInit);
