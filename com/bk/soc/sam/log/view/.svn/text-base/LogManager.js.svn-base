require('SAM_LogManagerService');

loadAreaConfig();

function displaySys(v)
{
	var rArray=v.split('.');
	return sysMap[rArray[3]]?sysMap[rArray[3]]:'';
}

//----------------------------------------------------
var sysStore = new Ext.data.SimpleStore({
	fields: ['EN','CH']
});

var sysMap={};

SAM_LogManagerService.getSystems(
{
	callback:function(list)
	{
		sysStore.loadData(list);
		
		for(var i=0;i<list.length;++i)
		{
			sysMap[list[i][0].toLowerCase()]=list[i][1];
		}
	},
	async:false
});


//----------------------------------------------------
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
		siteTag.setField('userName','');
	}
	else
	{
		siteTag.setField('userName',voList[0].userName);
	}
}
//--------------------p1-----------------------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "子系统",
	dataIndex: 'componentId',
	width:120,
	renderer:displaySys,
	sort:true,
	editor: null
},
{
	header: "构件名称",
	dataIndex: 'componentName',
	width:150,
	sort:true,
	editor: null
},
{
	header: "操作",
	dataIndex: 'methodName',
	width: 100,
	editor: null
},
{
	header: "单据编号",
	dataIndex: 'billId',
	width: 100,
	editor: null
},
{
	header: "操作人",
	dataIndex: 'userName',
	width: 100,
	editor: null
},
{
	header: "操作日期",
	dataIndex: 'operaterDate',
	renderer:DateUtil.formatDateTime,
	width: 150,
	editor: null
},
{
	header: "IP",
	dataIndex: 'requestIP',
	width: 100,
	editor: null
},
{
	header: "备注",
	dataIndex: 'note',
	width: 300,
	editor: null
}]);

mainArea.addToQueryPanel([
{
	xtype:'combo',
	name:'componentId',
	fieldLabel:'子系统',
	store: sysStore,
	valueField:'EN',
	displayField:'CH',
	rule:'@NAME@ LIKE \'%.@VALUE@.%\''
},
{
	xtype:'textfield',
	name:'componentName',
	fieldLabel:'构件名称',
	owner:'_t2',
	rule:'@NAME@ LIKE \'%@VALUE@%\''
},
{
	xtype:'textfield',
	name:'billId',
	fieldLabel:'单据编码'
},
{
	xtype:'textfield',
	name:'methodName',
	fieldLabel:'操作'
},
{
	xtype:'trigger',
	name:'userName',
	readOnly:false,
	fieldLabel:'操作人'
},
{
	xtype:'textfield',
	name:'requestIP',
	fieldLabel:'IP'
}]);

mainArea.queryFields['userName'].onTrigger=selectUser;
//-------------------------------------------------------
var exportWin=new WindowUnit('exportWin');
exportWin.setTitle('导出设置');

var exportArea=new DetailAreaUnit('exportArea');
exportArea.addToFieldSet([{
    fieldLabel: '截止到',
    name: 'untilDate',
    xtype:'datefield',
    allowBlank: false
    
}]);

//-------------------------------------------------------
function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryOperaterLogs);
	//---------------------------------------------
	exportWin.init();
	exportWin.add(exportArea);
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	mainArea.queryOperaterLogs();
	hideLoading();
}

mainArea.queryOperaterLogs=function()
{
	SAM_LogManagerService.queryOperaterLogs(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

mainArea.showExportWin=function(c)
{
	exportWin.show(c);
}

exportArea.opExportLog=function()
{
	if(!exportArea.checkFields()) return;
	
	var obj=exportArea.getValueObject();
	
	Ext.confirm('您确认导出<p>'+DateUtil.formatDate(obj.untilDate)+'之前的日志吗?导出后日志将被删除.</p>',function(btn)
	{
		if(btn=='yes')
		{
			SAM_LogManagerService.opExportLog(obj.untilDate,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('导出失败');
				}
				else
				{
					
					exportWin.close();
					mainArea.queryOperaterLogs();
				}
			});
		}
	});
}

Ext.onReady(appInit);