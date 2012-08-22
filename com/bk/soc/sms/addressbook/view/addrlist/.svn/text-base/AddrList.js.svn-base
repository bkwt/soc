require('SMS_AddrListService');
loadAreaConfig();
var progParams = request.getParameter('progParams');
var sexStore = new Ext.data.SimpleStore({
	fields: ['sex'],
	data : [['男'],['女']]
});

var billName = '通讯录信息';

var groupStore = new Ext.data.SimpleStore({
	fields: ['groupName']
});
//--------------全局变量------------------------------
var row1,row2,row3;
//---------------store-------------------------------

function castNeedImpowerStore(v)
{
	if(v=='N')
		return '否';
	else if (v=='Y')
		return '是';		
}
//-----------------------select----------------------
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');

mainArea.setCm([
{
	header: "姓名",
	dataIndex: 'name',
	width: 80,
	sort:true,
	editor: null
},{
	header: "性别",
	dataIndex: 'sex',
	width: 40,
	sort:true,
	editor: new Ext.form.ComboBox(
	{
		store:sexStore,
		displayField:'sex',
		valueField:'sex',
		allowBlank: false
	})
},{
	header: "分组名称",
	dataIndex: 'groupName',
	width: 100,
	sort:true,
	editor: new Ext.form.ComboBox(
	{
		store:groupStore,
		queryMode: 'local', 
		displayField:'groupName',
		valueField:'groupName',
		allowBlank: false
	})
},{
	header: "单位",
	dataIndex: 'corpCode',
	width: 100,
	sort:true,
	editor: new Ext.form.TextField(
	{
	    maxLength:64,
		allowBlank: true
	})
},{
	header: "部门",
	dataIndex: 'deptCode',
	width: 100,
	sort:true,
	editor: new Ext.form.TextField(
	{
	    maxLength:64,
		allowBlank: true
	})
},{
	header: "职位",
	dataIndex: 'posCode',
	width: 100,
	sort:true,
	editor: new Ext.form.TextField(
	{
	    maxLength:64,
		allowBlank: true
	})
},{
	header: "联系方式",
	dataIndex: 'mobileNo',
	width: 100,
	sort:true,
	editor: new Ext.form.TextField(
	{
	    maxLength:64,
		allowBlank: false
	})
},{
	header: "邮箱",
	dataIndex: 'email',
	width: 200,
	sort:true,
	editor: new Ext.form.TextField(
	{
	    maxLength:64,
		allowBlank: true
	})
},{
	header: "联系方式",
	dataIndex: 'contactInfo',
	width: 100,
	editor: new Ext.form.TextField(
	{
	    maxLength:64,
		allowBlank: true
	})
},{
	header: "备注",
	dataIndex: 'mark',
	width: 100,
	editor: new Ext.form.TextField(
	{
	    maxLength:64,
		allowBlank: true
	})
},{
	dataIndex: 'addrType',
	hidden:true,
	editor: null
},{
	dataIndex: 'uid',
	hidden:true,
	editor: null
}]);

mainArea.addToQueryPanel([
{xtype:'textfield',name:'name',fieldLabel:'姓名'},
{xtype:'textfield',name:'mobileNo',fieldLabel:'手机'},
{xtype:'textfield',name:'corpCode',fieldLabel:'单位'}
]);

//-------------------------------------------------------
var newWin=new WindowUnit('newWin');
newWin.setTitle('新增通讯录');
var newAddrListArea=new DetailAreaUnit('newAddrListArea');

//gn.on('focus',function()
//{mainArea.selectGroupName();});			

newAddrListArea.addToFieldSet([
{xtype:'textfield',name:'name',fieldLabel:'姓名',allowBlank: false},
{xtype:'textfield',name:'mobileNo',fieldLabel:'手机',allowBlank: false},
{xtype:'textfield',name:'email',fieldLabel:'邮箱',allowBlank: true},
{xtype:'combo',name:'sex',fieldLabel:'性别',store:sexStore,displayField:'sex',valueField:'sex',allowBlank: false},
{xtype:'combo',name:'groupName',fieldLabel:'分组名称',store:groupStore,queryMode: 'local', valueField:'groupName',displayField:'groupName',readOnly:true,allowBlank: false},
{xtype:'textfield',name:'corpCode',fieldLabel:'单位',width:200,allowBlank: true},
{xtype:'textfield',name:'deptCode',fieldLabel:'部门',allowBlank: true},
{xtype:'textfield',name:'posCode',fieldLabel:'职位',allowBlank: true},
{xtype:'textfield',name:'contactInfo',fieldLabel:'联系方式',allowBlank: true,rowspan:2},
{xtype:'textfield',name:'mark',fieldLabel:'备注',allowBlank: true,rowspan:2}
],
{
	LabelRate:0.5,
	fieldsPerRow:4
});
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
function appInit()
{
	//----------------------------------------------
	page1.init();
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryAddrList);
	//---------------------------------------------
	newWin.init();
	newWin.add(newAddrListArea);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));

	mainArea.queryAddrList();
	hideLoading();
}
//-----------------------------------------------------
mainArea.queryAddrList=function()
{
	SMS_AddrListService.queryAddrLists(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.selectGroupName();
		mainArea.showViewData(viewData);
		async:false;
	});
}
mainArea.selectGroupName=function()
{
	SMS_AddrListService.selectGroupName(progParams,function(list)
			{
			    list.push(['未分组']);
				groupStore.loadData(list);
			});
}

mainArea.opModifyAddrList=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	
	SMS_AddrListService.opModifyAddrList(list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败!'+viewData.message);
		}
		else
		{
			mainArea.queryAddrList();
		}
	});
}
mainArea.showAddNewWin=function(constParam)
{
	SMS_AddrListService.showAddNewWin(function(viewData)
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
newAddrListArea.opAddNew=function(param)
{
	if(!newAddrListArea.checkFields())return;	
	var obj = newAddrListArea.getValueObject(); 
	
	SMS_AddrListService.opAddNewAddrList(progParams,obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{		
			mainArea.queryAddrList();
			if(param&&param=='CLOSE'){
			newWin.close();
			}			
		}
	});	
}

newAddrListArea.close = function(){
    if(newAddrListArea.isModified()){
      Ext.confirm('数据没有保存，您想要保存后关闭吗?',function(btn)
	  {
		if(btn=='yes')
		{
			newAddrListArea.opAddNew('CLOSE');
		}else{
		    newWin.close();
		}		
	  });}else{
	        newWin.close();
	}  
}

mainArea.deleteAddrList=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选记录');
		return;
	}
	Ext.confirm('你确定删除这'+list.length+'条'+billName+'吗?',function(btn)
	{
		if(btn=='yes')
		{
			SMS_AddrListService.opDeleteAddrList(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败!'+viewData.message);
				}
				else
				{			
					mainArea.queryAddrList();			
				}
			});	
		}
	});
}
/*
mainArea.select = function(){
    selectAddrList(null);
}

mainArea.selected = function(){
    selectPersonAndAccount(null);
}

function selectAddrList(e)
{
	showSelectAddrList(e,'SINGLE',setAddrList,'');
}

function setAddrList(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	
	if(voList.length==0)
	{
		siteTag.setField('name','');
	}
	else
	{
		siteTag.setField('name',voList[0].name);
	}
}

function selectPersonAndAccount(e)
{
	showSelectPersonAndAccount(e,'SINGLE',setPersonAndAccount,'');
}

function setPersonAndAccount(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	
	if(voList.length==0)
	{
		siteTag.setField('name','');
	}
	else
	{
		siteTag.setField('name',voList[0].name);
	}
}
*/

Ext.onReady(appInit);