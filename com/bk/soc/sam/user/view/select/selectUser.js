
var selectUserWin=null;
var selectUserArea=null;

function showSelectUser(e,selectMode,callback,otherConditions,selected,pks)
{
	if(selectUserWin==null)
	{
		selectUserWin=new WindowUnit('selectUserWin');
		selectUserArea=new SelectAreaUnit('selectUserArea');
		selectUserArea.setCm([
		{
			header: "用户编码",
			dataIndex: 'userID',
			width: 100,
			editor: null
		},
		{
			header: "用户姓名",
			dataIndex: 'userName',
			width: 100,
			editor: null
		},
		{
			header: "所在组织",
			dataIndex: 'orgzName',
			width: 100,
			editor: null
		},
		{
			header: "所在岗位",
			dataIndex: 'posName',
			width: 100,
			editor:null
		}]);
		
		var row1=new Ext.Panel(rowConfig);
								
		row1.add({tag: 'div', html: '用户编码:',bodyStyle:queryLabel+'width:80'});
		row1.add({xtype:'textfield',name:'userID',autoWidth:false,width:120});
				
		row1.add({tag: 'div', html: '用户名称:',bodyStyle:queryLabel+'width:110'});
		row1.add({xtype:'textfield',name:'userName',autoWidth:false,width:120});
		
		var row2=new Ext.Panel(rowConfig);
								
		row2.add({tag: 'div', html: '所在组织:',bodyStyle:queryLabel+'width:80'});
		row2.add({xtype:'textfield',name:'orgzName',autoWidth:false,width:120});
				
		row2.add({tag: 'div', html: '所在岗位:',bodyStyle:queryLabel+'width:110'});
		row2.add({xtype:'textfield',name:'posName',autoWidth:false,width:120});
			
		selectUserArea.addToQueryPanel(row1);
		selectUserArea.addToQueryPanel(row2);
		
		selectUserArea.setWidth(500);
		selectUserWin.setTitle('选择用户');
		
		selectUserWin.init();
		selectUserWin.add(selectUserArea);
		selectUserArea.refreshFor(findUsers);
		
		selectUserWin.on('show',function()
		{
			selectUserArea.clean();//这条有开发人员决定加不加.不加的话弹出的选择页保留上一次调用的查询条件和分页
			findUsers();
		});
	}
	
	selectUserArea.setSelectEvent(e);
	selectUserArea.setOtherConditions(otherConditions);
	selectUserArea.setCallBack(callback);
	selectUserArea.setSelectMode(selectMode);
	selectUserArea.setSelected(selected,pks);
	selectUserWin.show();
}

function findUsers()
{
	SAM_SelectUser.findUsers(selectUserArea.getAreaInfo(),selectUserArea.getOtherConditions(),function(viewData)
	{
		selectUserArea.showViewData(viewData);
	});
}