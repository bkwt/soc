require('SAM_SelectRole');

var selectRoleWin=new WindowUnit('selectRoleWin');
var selectRoleArea=new SelectAreaUnit('selectRoleArea');

selectRoleArea.setCm([
{
	header: "角色编码",
	dataIndex: 'roleCode',
	width: 100,
	editor: null
},
{
	header: "角色名称",
	dataIndex: 'roleName',
	width: 100,
	editor: null
},
{
	header: "说明",
	dataIndex: 'roleNote',
	width: 120,
	editor: null
}]);

var row1=new Ext.Panel(rowConfig);
						
row1.add({tag: 'div', html: '角色编码：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'textfield',name:'roleCode',autoWidth:false,width:80});

row1.add({tag: 'div', html: '角色名称：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'roleName',autoWidth:false,width:80});
	
selectRoleArea.addToQueryPanel(row1);

selectRoleArea.setWidth(400);
selectRoleWin.setTitle('选择角色');

selectRoleWin.init();
selectRoleWin.add(selectRoleArea);
selectRoleArea.refreshFor(findRoles);

selectRoleWin.on('show',function()
{
	selectRoleArea.clean();//这条有开发人员决定加不加.不加的话弹出的选择页保留上一次调用的查询条件和分页
	findRoles();
});

function showSelectRole(e,selectMode,callback,otherConditions)
{
	selectRoleArea.setSelectEvent(e);
	selectRoleArea.setCallBack(callback);
	selectRoleArea.setSelectMode(selectMode);
	selectRoleWin.show();
}

function findRoles()
{
	SAM_SelectRole.findRoles(selectRoleArea.getAreaInfo(),function(viewData)
	{
		selectRoleArea.showViewData(viewData);
	});
}