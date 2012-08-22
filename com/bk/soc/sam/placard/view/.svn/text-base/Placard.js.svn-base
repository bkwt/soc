require('SAM_PlacardService');
include('SelectOrgz');
loadAreaConfig();

function selectOrgz(e)
{
	var obj=detailArea.getValueObject();
	
	var receiveOrgzCodes=obj.receiveOrgzCodes;
	
	var receiveOrgzCodeArray=StrUtil.split(receiveOrgzCodes,',');
	
	showSelectOrgz(e,'COMPLEX',setOrgz,'_t1.state=\'COMMIT\'',receiveOrgzCodeArray,'code');
}

function setOrgz(siteTag,addList,removeList)
{
	for(var i=0;i<addList.length;++i)
	{
		siteTag.appendField('receiveOrgzs',addList[i].name,',');
		siteTag.appendField('receiveOrgzCodes',addList[i].code,',');
	}
	
	for(var i=0;i<removeList.length;++i)
	{
		siteTag.removeField('receiveOrgzs',removeList[i].name,',');
		siteTag.removeField('receiveOrgzCodes',removeList[i].code,',');
	}
}

function displayState(v)
{
	if(v=='PUB')
	{
		return '发布';
	}
	else if(v=='DEL')
	{
		return '作废';
	}
	else
	{
		return '';
	}
}

var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "序号",
	dataIndex: 'number',
	width:60,
	sort:true,
	editor: null
},
{
	header: "标题",
	dataIndex: 'title',
	width: 450,
	editor:null
},
{
	header: "发布时间",
	dataIndex: 'publishDate',
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
	width: 100,
	editor: null
},
{
	header: "发布人",
	dataIndex: 'publishPersonName',
	width: 100,
	editor: null
},
{
	header: "状态",
	dataIndex: 'state',
	renderer:displayState,
	width: 60,
	editor: null
}
]);

var page2 = new PageUnit('page2');

var detailArea=new DetailAreaUnit('detailArea');
detailArea.addToFieldSet([{
    fieldLabel: '标题',
    name: 'title',
    xtype:'textfield',
    allowBlank: false
    
}, {
    fieldLabel: '内容',
    name: 'text',
    xtype:'textfield',
    allowBlank: false
}, {
    fieldLabel: '有效部门',
    name: 'receiveOrgzs',
    xtype:'trigger'
}, {
    fieldLabel: '发布时间',
    name: 'publishDate',
    xtype:'datefield'
}, {
    fieldLabel: '发布人',
    name: 'publishPersonName',
    xtype:'textfield'
}, {
    name: 'receiveOrgzCodes',
    xtype:'hidden'
}]);
detailArea.fields['receiveOrgzs'].onTriggerClick=selectOrgz;

function appInit()
{
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryPlacards);
	//---------------------------------------------
	page2.init();
	page2.add(detailArea);
	//-----------------------------------
	page1.show(request.getParameter('progParams'));
	mainArea.queryPlacards();
	hideLoading();
}

mainArea.queryPlacards=function()
{
	SAM_PlacardService.queryPlacards(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

mainArea.showDetail=function(c)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	
	setAppContext('number',obj.number);
	
	page2.show(c);
	detailArea.queryPlacard();
}

mainArea.showNewDetail=function(c)
{
	page2.show(c);
}

detailArea.queryPlacard=function()
{
	SAM_PlacardService.queryPlacard(getAppContext('number'),function(viewData)
	{
		detailArea.showViewData(viewData);
	});
}

detailArea.opPublish=function(c)
{
	if(!detailArea.checkFields()) return;
	
	Ext.confirm('您确认发布吗?',function(btn)
	{
		if(btn=='yes')
		{
			var obj=detailArea.getValueObject();
	
			var orgzCodes=obj.receiveOrgzCodes;
			
			SAM_PlacardService.opPublish(obj,orgzCodes.split(','),function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('发布失败.'+viewData.message);
				}
				else
				{
					detailArea.clean();
				}
			});
		}
	});
}

detailArea.opInvalid=function(c)
{
	Ext.confirm('您确认作废吗?',function(btn)
	{
		if(btn=='yes')
		{
			var obj=detailArea.getValueObject();
	
			SAM_PlacardService.opInvalid(obj,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('作废失败.'+viewData.message);
				}
				else
				{
					page1.show();
					mainArea.queryPlacards();
				}
			});
		}
	});
}

detailArea.opDelete=function(c)
{
	Ext.confirm('您确认删除吗?',function(btn)
	{
		if(btn=='yes')
		{
			var obj=detailArea.getValueObject();
	
			SAM_PlacardService.opDelete(obj,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{
					page1.show();
					mainArea.queryPlacards();
				}
			});
		}
	});
}

detailArea.goBack=function()
{
	page1.show();
	mainArea.queryPlacards();
}

Ext.onReady(appInit);