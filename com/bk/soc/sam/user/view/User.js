require('SAM_UserService');
include('SelectPerson');
loadAreaConfig();

function selectPerson(e)
{
	showSelectPerson(e,'SINGLE',setPerson,'_t1.code not in (select userID from TUser)');
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
		siteTag.setField('userID','');
		siteTag.setField('userName','');
		siteTag.setField('orgzName','');
		siteTag.setField('posName','');
	}
	else
	{
		siteTag.setField('userID',voList[0].code);
		siteTag.setField('userName',voList[0].name);
		siteTag.setField('orgzName',voList[0].orgzName);
		siteTag.setField('posName',voList[0].posName);
	}
}

function selectRole(e)
{
	showSelectRole(e,'COMPLEX',setRole,'');
}

function setRole(siteTag,addList)
{
	if(addList.length==0)
	{
		return;
	}
	
	var list=mainArea.getSelected();
	
	var roleCodeList=[];
	
	for(var i=0;i<addList.length;++i)
	{
		roleCodeList.push(addList[i].roleCode);
	}
	
	SAM_UserService.opBatchSetRole(list,roleCodeList,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('分配失败');
		}
		else
		{

		}
	});
}

function hiddenPassWord()
{
	return '********';
}

var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "用户编码",
	dataIndex: 'logID',
	flex: 1,
	sort:true,
	editor: null
},
{
	header: "人员编码",
	dataIndex: 'userID',
	flex: 1,
	sort:true,
	editor:null
},
{
	header: "人员姓名",
	dataIndex: 'userName',
	flex: 1,
	editor:null
},
{
	header: "所属组织",
	dataIndex: 'orgzName',
	flex: 1,
	editor:null
},
{
	header: "所属岗位",
	dataIndex: 'posName',
	flex: 1,
	editor: null
}]);


mainArea.addToQueryPanel([  
{ fieldLabel: "用户编码", xtype: "textfield",name: 'logID' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "人员编码", xtype: "textfield",name: 'userID',rule:"@NAME@ LIKE '%@VALUE@%'"},
{ fieldLabel: "人员姓名", xtype: "textfield" ,name: 'userName',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);




var page2 = new PageUnit('page2');

var detailArea=new DetailAreaUnit('detailArea');
detailArea.setTitle('分配角色');
detailArea.addToFieldSet([
{xtype:'trigger',name:'userName',fieldLabel:'人员姓名',editable:false,triggerBaseCls :'x-form-searchtrigger',allowBlank:false},
{xtype:'textfield',name:'logID',fieldLabel:'用户编码',allowBlank: false},
{xtype:'textfield',name:'passWord',fieldLabel:'登陆密码',inputType:'password',allowBlank:false},
{xtype:'hidden',name:'userID',fieldLabel:'人员编码'}]
);
detailArea.fields['userName'].onTriggerClick=selectPerson;

var buttomPanel=new Ext.Panel(
{
	height:700,
	bodyStyle:panelBodyStyle,
	layout:'table',
	autoHeight:true
});

var hasRoleArea=new ListAreaUnit('hasRoleArea');
hasRoleArea.setTitle('已有角色');
hasRoleArea.setWidth(375);
hasRoleArea.setHeight(400);
hasRoleArea.setCm([
{
	header: "角色编码",
	dataIndex: 'roleCode',
	width: 130,
	sort:true,
	editor: null
},
{
	header: "角色名称",
	dataIndex: 'roleName',
	width: 130,
	editor: null
}]);

var noHasRoleArea=new ListAreaUnit('noHasRoleArea');
noHasRoleArea.setTitle('待增角色');
noHasRoleArea.setWidth(375);
noHasRoleArea.setHeight(400);
noHasRoleArea.setCm([
{
	header: "角色编码",
	dataIndex: 'roleCode',
	width: 130,
	editor: null
},
{
	header: "角色名称",
	dataIndex: 'roleName',
	width: 130,
	sort:true,
	editor: null
}]);

function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryUsers);
	//---------------------------------------------
	page2.init();
	page2.add(detailArea);
	
	//page2.addSeparator(20);
	
	page2.regUnit(hasRoleArea);
	page2.regUnit(noHasRoleArea);
	
	buttomPanel.add(hasRoleArea.getEm());
	buttomPanel.add(new Ext.Panel({width:40,bodyStyle: 'border-color:#eef4ff;',layout:'table',height:0}));
	buttomPanel.add(noHasRoleArea.getEm());
	
	page2.addItem(buttomPanel);
	
	hasRoleArea.refreshFor(hasRoleArea.queryHasRole);
	noHasRoleArea.refreshFor(noHasRoleArea.queryNoHasRole);
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	hasRoleArea.getEm().setWidth(375);
	hasRoleArea.getEm().setHeight(400);
	noHasRoleArea.getEm().setWidth(375);
	noHasRoleArea.getEm().setHeight(400);
	mainArea.queryUsers();
	hideLoading();
}

mainArea.queryUsers=function()
{
	SAM_UserService.queryUsers(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
mainArea.opDeleteUsers=function()
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
			SAM_UserService.opDeleteUsers(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					
					mainArea.queryUsers();
				}
			});
		}
	});
	
	
}

mainArea.showNewUserWin=function(constParam)
{
	page2.show(constParam);
	hasRoleArea.queryHasRole();
	noHasRoleArea.queryNoHasRole();
}

detailArea.opResetPassWord=function()
{
	var obj=detailArea.getValueObject();

	Ext.confirm('确认重置密码吗?<p>重置后密码将变为</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;123456</p>',function(btn)
	{
		if(btn=='yes')
		{
			SAM_UserService.opResetPassWord(obj,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('重置失败');
				}
				else
				{
					Ext.alert('重置成功');
				}
			});
		}
	});
	
	
}

mainArea.opBatchSetRole=function(c)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	selectRole(null);
}

mainArea.enterSetRole=function(constParam)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}

	setAppContext('logID',obj.logID);
	
	page2.show(constParam);
	detailArea.queryUser();
	hasRoleArea.queryHasRole();
	noHasRoleArea.queryNoHasRole();
}
//显示报表页面
mainArea.openPrintView=function()
{
	var list=mainArea.getSelected();
	var conditions = " and a.logID in ('";
	
	for(var i=0;i<list.length;i++)
	{
		conditions += list[i].logID + "','"; 
	}
	conditions += "')";
	if(list.length == 0) conditions = ' and 1=1';
	
	var pp=window.open('/SOC/view?functionId=SAM0053&conditions='+conditions,'','location=no,scrollbars=no,menubar=no,resizable=yes,status=no,width=760,height=800,left=0,top=0');
	pp.focus();
}

detailArea.opAddNewUser=function(c)
{
	if(!detailArea.checkFields()) return;
	
	var obj=detailArea.getValueObject();

	SAM_UserService.opAddNewUser(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			page2.show(c);
		}
	});
}

detailArea.backToMain=function()
{
	page1.show();
}

detailArea.queryUser=function()
{
	SAM_UserService.queryUser(getAppContext('logID'),function(viewData)
	{
		detailArea.showViewData(viewData);
	});
}


detailArea.queryUserMenus=function()
{
	SAM_UserService.queryUserMenus(getAppContext('logID'),function(viewData)
	{
		if(viewData.resultList.length>150)
		{
			alert('菜单数量较多,请您稍等待一下处理过程.');
		}
		
		var menuArray=["<font style=\"font-size:12px\">=======================================================================</font>"];
		
		addToMenuArray(menuArray,viewData.resultList,'root');
		
		var htmlStr='';
		
		menuArray.length=menuArray.length-1;
		
		for(var i=0;i<menuArray.length;++i)
		{
			htmlStr+=('<p>'+menuArray[i]+'</p>');
		}
		
		var menuWin=new Ext.Window({
            title:getAppContext('logID')+'的菜单',
            renderTo:document.body,
            width:600,
            height:500,
            modal:true,
            html:htmlStr,
            autoScroll:true,
            resizable:false
       	});
       	
       	menuWin.show();
	});
}

var level=-1;

var nbspArray=["&nbsp;&nbsp;&nbsp;&nbsp;","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"];

function addToMenuArray(menuArray,allMenus,menuCode)
{
	level++;
	
	for(var i=0;i<allMenus.length;++i)
	{
		var menu=allMenus[i];
		
		if(!menu.c&&menu.menuFather==menuCode)
		{
			//menuArray.push(kg[level]+"<font size='"+(4-level)+"'>"+node.get("name")+"</font>");
			menuArray.push(nbspArray[level]+"<font style=\"font-size:12px\">("+menu.menuCode+")"+menu.menuName+"</font>");
			menu.c=1;
			addToMenuArray(menuArray,allMenus,menu.menuCode);
		}
	}
	
	if(level<=1)
		menuArray.push("<font style=\"font-size:12px\">=======================================================================</font>");
	else if(level<=2)
		menuArray.push("<font style=\"font-size:12px\">&nbsp;</font>");
	
	level--;
}

noHasRoleArea.manageRole=function()
{
	var obj=noHasRoleArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行');
		return;
	}
	
	parent.closeTab('SAM0003');
	parent.openTab('SAM0003','角色定义','SET&roleCode='+obj.roleCode);
}

noHasRoleArea.queryNoHasRole=function()
{
	SAM_UserService.queryNoHasRole(noHasRoleArea.getAreaInfo(),getAppContext('logID'),function(viewData)
	{
		noHasRoleArea.showViewData(viewData);
	});
}

noHasRoleArea.opAddNewRoles=function()
{
	var list=noHasRoleArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	for(var i=0;i<list.length;i++){
		list[i].logID = getAppContext('logID');
	}
	SAM_UserService.opAddNewRoles(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('新增失败');
		}
		else
		{
			
			noHasRoleArea.queryNoHasRole();
			hasRoleArea.queryHasRole();
		}
	});
}

hasRoleArea.manageRole=function()
{
	var obj=hasRoleArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行');
		return;
	}
	closeTab('SAM0003');
	openTab('SAM0003','角色定义','EDIT');
}

hasRoleArea.queryHasRole=function()
{
	SAM_UserService.queryHasRole(hasRoleArea.getAreaInfo(),getAppContext('logID'),function(viewData)
	{
		hasRoleArea.showViewData(viewData);
	});
}

hasRoleArea.opDeleteRoles=function()
{
	var list=hasRoleArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	SAM_UserService.opDeleteRoles(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('移除失败');
		}
		else
		{
			
			noHasRoleArea.queryNoHasRole();
			hasRoleArea.queryHasRole();
		}
	});
}
Ext.onReady(appInit);
