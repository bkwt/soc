require('SMS_SelectHistoryMsg');
function display(v)
{
  	return '<table cellSpacing=0 cellPadding=0 width="100%"  align=center   border=0   style="word-break:break-all"><tr height=50><td>'+v+'</td></tr></table>';
}
var selectHistoryWin=new WindowUnit('selectHistoryWin');

var selectHistoryArea=new SelectAreaUnit('selectHistoryArea');
selectHistoryArea.setCm([
{
	header: "UID",
	dataIndex: 'uid',
	width: 80,
	editor: null
},
{
	header: "接受短信号码",
	dataIndex: 'receiverMobileNo',
	width: 170,
	renderer:display,
	editor:null
},
{
	header: "短信内容",
	dataIndex: 'msg',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
	width: 200,	
	renderer:display,
	editor: null
}
]);
selectHistoryArea.setWidth(530);
selectHistoryWin.setTitle('历史信息');


function showSelectHistoryMsg(e,selectMode,callback,otherConditions)
{
	selectHistoryArea.setSelectEvent(e);
	selectHistoryArea.setCallBack(callback);
	selectHistoryArea.setSelectMode(selectMode);
	selectHistoryArea.setOtherConditions(otherConditions);
	selectHistoryWin.show();
}
function findHistory()
{
	SMS_SelectHistoryMsg.findHistoryMsg(selectHistoryArea.getAreaInfo(),selectHistoryArea.getOtherConditions(),function(viewData)
	{
		selectHistoryArea.showViewData(viewData);
	});
}
Ext.onReady(function()
{
	selectHistoryWin.init();
	selectHistoryWin.add(selectHistoryArea);
	selectHistoryArea.refreshFor(findHistory);	
	
    var deleteButton=this.selectHistoryArea.getButtonBar().items.get(1);			
    deleteButton.setText('删除');
	deleteButton.setHandler(function()
	{
		var list=selectHistoryArea.getSelected();
		if(list.length===0)
		{
			Ext.alert('请选中一行');
			return;
		}
		
		Ext.confirm('确认删除这'+list.length+'条记录吗?',function(btn)
		{
			if(btn=='yes')
			{
				SMS_SelectHistoryMsg.opDeleteHistory(list,function(viewData)
				{
					if(!viewData.isSucceed)
					{
						Ext.alert('删除失败.'+viewData.message);
					}
					else
					{	
						showSMsg();			
						findHistory();		
					}
				});
			}
		});
	});    
	selectHistoryWin.on('show',function()
	{
		selectHistoryArea.clean();//这条有开发人员决定加不加.不加的话弹出的选择页保留上一次调用的查询条件和分页
		findHistory();
	});
	
});
