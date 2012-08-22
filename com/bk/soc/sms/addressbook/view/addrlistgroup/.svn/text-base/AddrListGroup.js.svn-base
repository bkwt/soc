require('SMS_AddrListGroupService');
loadAreaConfig();

var sexStore = new Ext.data.SimpleStore({
	fields: ['sex'],
	data : [['男'],['女']]
});

var billName = '分组信息';

//--------------全局变量-------------------------------
var row1,row2,row3;
//---------------store--------------------------------
//-----------------------select-----------------------
//-----------------------page1------------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');

mainArea.setCm([
{
	header: "分组编码",
	dataIndex: 'groupCode',
	width: 120,
	sort:true,
	editor: null
},{
	header: "分组名称",
	dataIndex: 'groupName',
	width: 230,
	editor: null
},{
	header: "分组定义说明",
	dataIndex: 'mark',
	width: 360,
	editor: new Ext.form.TextField(
	{
	    maxLength:256,
		allowBlank: true
	})
},{
	dataIndex: 'uid',
	hidden:true,
	editor: null
},{
	dataIndex: 'groupType',
	hidden:true,
	editor: null
}]);

mainArea.addToQueryPanel([
{xtype:'textfield',name:'groupCode',fieldLabel:'分组编码'},
{xtype:'textfield',name:'groupName',fieldLabel:'分组名称'}
]);
//-------------------------------------------------------
var newWin=new WindowUnit('newWin');
newWin.setTitle('新增');
var newAddrListGroupArea=new DetailAreaUnit('newAddrListGroupArea');

row1=new Ext.Panel(rowConfig);						
row1.add({tag: 'div', html: '分组编码：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'groupCode',width:120,allowBlank: false});			
row1.add({tag: 'div', html: '分组名称：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'groupName',maxLength:64,width:120,allowBlank: false});		
row1.add({tag: 'div', html: '分组定义说明：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'mark',maxLength:256,width:140,allowBlank: true});		
newAddrListGroupArea.addToFieldSet(row1);
//-------------------------------------------------------

function appInit()
{
	//----------------------------------------------
	page1.init();
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryAddrListGroup);
	//---------------------------------------------
	newWin.init();
	newWin.add(newAddrListGroupArea);
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryAddrListGroup();
	hideLoading();
}
//-----------------------------------------------------
mainArea.queryAddrListGroup=function()
{
	SMS_AddrListGroupService.queryAddrListGroups(mainArea.getAreaInfo(),request.getParameter('progParams'),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

mainArea.opModifyAddrListGroup=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	SMS_AddrListGroupService.opModifyAddrListGroup(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{
			mainArea.queryAddrListGroup();
		}
	});
}
mainArea.showAddNewWin=function(constParam)
{
	SMS_AddrListGroupService.showAddNewWin(function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			newWin.show(constParam); 
		}
	});
}
newAddrListGroupArea.opAddNew=function(constParam)
{
    var close = false;
    if(constParam.split('*').length>1){
         constParam = constParam.split('*')[0];
         close = true;
    }
	if(!newAddrListGroupArea.checkFields())return;	
	var obj =newAddrListGroupArea.getValueObject(); 
//	alert(close);
	SMS_AddrListGroupService.opAddNewAddrListGroup(constParam,obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{		
			mainArea.queryAddrListGroup();
			if(close == true){newWin.close();}	
			newAddrListGroupArea.clean();		
		}
	});	
}

newAddrListGroupArea.close =function(param){
if(newAddrListGroupArea.isModified()){
      Ext.confirm('数据没有保存，您想要保存后关闭吗?',function(btn)
	  {
		if(btn=='yes')
		{
			newAddrListArea.opAddNew(param);
		}else{
		    newWin.close();
		}		
	  });}else{
	        newWin.close();
	}
}

mainArea.deleteAddrListGroup=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	Ext.confirm('你确定删除这'+list.length+'条'+billName+'吗？',function(btn)
	{
		if(btn=='yes')
		{
			SMS_AddrListGroupService.opDeleteAddrListGroup(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{			
					mainArea.queryAddrListGroup();			
				}
			});	
		}
	});
}

Ext.onReady(appInit);