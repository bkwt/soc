require('SAM_ServerStateService');

loadAreaConfig();

var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "登录ID",
	dataIndex: 'logID',
	width:80,
	sort:true
},
{
	header: "用户名称",
	dataIndex: 'userName',
	width: 80,
	sort:true
},
{
	header: "登录时间",
	dataIndex: 'loginTime',
	width: 150,
	sort:true
},
{
	header: "用户角色",
	dataIndex: 'roles',
	width: 400,
	editor: new Ext.form.TextArea(
	{
		readOnly:true
	})
}]);

mainArea.addToQueryPanel([
{
	xtype:'textfield',
	name:'logID',
	fieldLabel:'登录ID',
	rowspan:2
},
{
	xtype:'textfield',
	name:'userName',
	fieldLabel:'用户名称',
	rowspan:2
}]
);
//-------------------------------------------------------
function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryOnlineUsers);
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	mainArea.queryOnlineUsers();
	hideLoading();
}

mainArea.queryOnlineUsers=function()
{
	SAM_ServerStateService.queryOnlineUsers(function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

Ext.onReady(appInit);