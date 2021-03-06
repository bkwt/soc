//1请求DWR
require('Call_FoundationDataBaseService');

//2加载配置文件
loadAreaConfig();

//3声明PANEL
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');
mainArea.setCm([
{
	header: "渠道编码",
	dataIndex: 'code',
	width:120,
	align:'center',
	sort:true,
	editor: null
},
{
	header: "渠道名称",
	dataIndex: 'name',
	align:'center',
	width:320,
	editor: new Ext.form.TextField(
			{
				allowBlank: false
			})
},
{
	header: "备注",
	dataIndex: 'note',
	align:'center',
	flex: 1,
	editor: new Ext.form.TextField(
	{
			allowBlank:true
	})
}]);

mainArea.addToQueryPanel([  
{ fieldLabel: "渠道编码", xtype: "textfield",name: 'code' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "渠道名称", xtype: "textfield",name: 'name',rule:"@NAME@ LIKE '%@VALUE@%'"}
//{ fieldLabel: "备注", xtype: "textfield" ,name: 'note',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);

var newChannelWin=new WindowUnit('newChannelWin');
newChannelWin.setTitle('新增投诉渠道');


var detailArea=new DetailAreaUnit('detailArea');
detailArea.setWidth(325);
detailArea.addToFieldSet([{
    fieldLabel: '名称',
    name: 'name',
    xtype:'textfield',
    allowBlank: false
    
}, {
    fieldLabel: '备注',
    name: 'note',
    xtype:'textfield'
}],{fieldsPerRow:1});
//4加载PANEL
function appInit()
{
	page1.init();
	page1.add(mainArea);
	
	
	newChannelWin.init();
	newChannelWin.add(detailArea);

	mainArea.refreshFor(mainArea.queryChannels);

	page1.show(request.getParameter('progParams'));
	
	mainArea.queryChannels();
	hideLoading();
}

//5按钮方法
mainArea.queryChannels=function()
{
	Call_FoundationDataBaseService.queryChannels(mainArea.getAreaInfo(),function(viewData){
		mainArea.showViewData(viewData);
	});
}

mainArea.showNewChannelWin = function(constParam)
{
	newChannelWin.show(constParam); 
}

mainArea.opModifyChannels=function()
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	Call_FoundationDataBaseService.opModifyChannels(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败');
		}
		else
		{
			mainArea.queryChannels();
		}
	});
}

detailArea.opAddNewChannel=function()
{

	if(!detailArea.checkFields()) return;
	var obj=detailArea.getValueObject();
	Call_FoundationDataBaseService.opAddNewChannel(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			detailArea.clean();
			mainArea.queryChannels();
		}
	});
}
detailArea.opAddNewChannelAndClose=function()
{
	if(!detailArea.checkFields()) return;
	var obj=detailArea.getValueObject();
	Call_FoundationDataBaseService.opAddNewChannel(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			detailArea.clean();
			mainArea.queryChannels();
			newChannelWin.close();
		}
	});



}
mainArea.opDeleteChannels=function()
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
			Call_FoundationDataBaseService.opDeleteChannels(list,function(viewData)
			{
				//alert1(viewData);
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败');
				}
				else
				{
					mainArea.queryChannels();
				}
			});
		}
	})); 
}

//mainArea.opTest=function(){
//	Ext.alert("测试");
//}

Ext.onReady(appInit);
