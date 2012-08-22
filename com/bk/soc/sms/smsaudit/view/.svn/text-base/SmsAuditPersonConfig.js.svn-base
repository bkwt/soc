require('SMS_SmsAuditPersonConfigService');
include('SelectPerson');
include('SelectComponent');
loadAreaConfig();

//--------------全局变量--------------------------------
var row1,row2,row3;
//---------------store---------------------------------
var typeStore = new Ext.data.SimpleStore({
	fields: ['CH','EN'],
	data : [['审核','AUDIT']]
});
function castType(v)
{
	if(v=='AUDIT')
		return '审核';	
}
//-----------------------select-----------------------
function selectPerson(e)
{
	var list =boTabArea.getAllObjects();
	showSelectPerson(e,'COMPLEX',setPerson,"",list,'code');
}
function setPerson(siteTag,addList,removeList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	for(var i=0;i<addList.length;++i)
	{
		boTabArea.addRecord({code:addList[i].code,name:addList[i].name,type:'AUDIT'});	
	}
    if(removeList.length>0)
    {   	
    	for(var i=0;i<removeList.length;i++)
    	{
    		boTabArea.removeRecord({code:removeList[i].code});
    	}
    }	
}
function selectComponent(e)
{
	var list =personTabArea.getAllObjects();
	showSelectBean(e,'COMPLEX',setBean,"",list,'componentId');
}
function setBean(siteTag,addList,removeList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	for(var i=0;i<addList.length;++i)
	{
		personTabArea.addRecord({componentId:addList[i].componentId,componentName:addList[i].componentName,type:'AUDIT'});	
	}
    if(removeList.length>0)
    {   	
    	for(var i=0;i<removeList.length;i++)
    	{
    		personTabArea.removeRecord({componentId:removeList[i].componentId});
    	}
    }	
}
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var boArea=new ListAreaUnit('boArea');
boArea.setHeight(560);
//--------------按业务构件---------------------------
boArea.setCm([
{
	header: "业务构件编码",
	dataIndex: 'componentId',
	width: 350,
	sort:true,
	editor:null
},
{
	header: "构件名称",
	dataIndex: 'componentName',
	width: 300,
	editor: null
}]);

row1=new Ext.Panel(rowConfig);
row1.add({tag: 'div', html: '构件编码：',bodyStyle:queryLabel+'width:140'});
row1.add({xtype:'textfield',name:'componentId',width:200});
row1.add({tag: 'div', html: '构件名称：',bodyStyle:queryLabel+'width:140'});
row1.add({xtype:'textfield',name:'componentName',width:200});	
						
boArea.addToQueryPanel(row1);
//---------------按人员------------------------
var personArea=new ListAreaUnit('personArea');
personArea.setHeight(560);
personArea.setCm([
{
	header: "人员编码",
	dataIndex: 'code',
	width: 200,
	editor: null
},
{
	header: "人员名称",
	dataIndex: 'name',
	width: 300,
	editor:null
}]);

row1=new Ext.Panel(rowConfig);
row1.add({tag: 'div', html: '人员编码：',bodyStyle:queryLabel+'width:200'});
row1.add({xtype:'textfield',name:'code',width:100});						
row1.add({tag: 'div', html: '人员名称：',bodyStyle:queryLabel+'width:150'});
row1.add({xtype:'textfield',name:'name',width:100});
personArea.addToQueryPanel(row1);
//-------------------------------------------------------
var page2 = new PageUnit('page2');

var boDetailArea = new DetailAreaUnit('boDetailArea');
row1=new Ext.Panel(rowConfig);	
row1.add({tag: 'div', html: '业务构件编码：',bodyStyle:queryLabel+'width:120'});
var componentIdFeild=row1.add({xtype:'textfield',name:'componentId',width:300});	
row1.add({tag: 'div', html: '构件名称：',bodyStyle:queryLabel+'width:80'});
var componentNameFeild=row1.add({xtype:'textfield',name:'componentName',width:150});						
boDetailArea.addToFieldSet(row1);

var boTabArea = new ListAreaUnit('boTabArea');
boTabArea.setHeight(460);
boTabArea.setCm([
{
	header: "人员编码",
	dataIndex: 'code',
	width: 150,
	editor:null
},
{
	header: "人员名称",
	dataIndex: 'name',
	width: 150,
	editor: null
}
/*,
{
	header: "订阅类型",
	dataIndex: 'type',
	width: 100,
	renderer:castType,
	editor: new Ext.form.ComboBox(
	{
		store:typeStore,
		displayField:'CH',
		valueField:'EN',
		allowBlank: false
	})
}*/
]);
row1=new Ext.Panel(rowConfig);
row1.add({tag: 'div', html: '人员编码：',bodyStyle:queryLabel+'width:200'});
row1.add({xtype:'textfield',name:'code',width:100});						
row1.add({tag: 'div', html: '人员名称：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'name',width:100});
boTabArea.addToQueryPanel(row1);	
//-------------------------------------------------------
var page3 = new PageUnit('page3');

var personDetailArea = new DetailAreaUnit('personDetailArea');
row1=new Ext.Panel(rowConfig);						
row1.add({tag: 'div', html: '人员编码：',bodyStyle:queryLabel+'width:180'});
var codeFeild=row1.add({xtype:'textfield',name:'code',width:120});	
row1.add({tag: 'div', html: '人员名称：',bodyStyle:queryLabel+'width:100'});
var nameFeild=row1.add({xtype:'textfield',name:'name',width:120});										
personDetailArea.addToFieldSet(row1);

var personTabArea = new ListAreaUnit('personTabArea');
personTabArea.setHeight(460);
personTabArea.setCm([
{
	header: "业务构件编码",
	dataIndex: 'componentId',
	width: 370,
	editor:null
},
{
	header: "构件名称",
	dataIndex: 'componentName',
	width: 180,
	editor: null
}
/*,
{
	header: "订阅类型",
	dataIndex: 'type',
	width: 80,
	renderer:castType,
	editor: new Ext.form.ComboBox(
	{
		store:typeStore,
		displayField:'CH',
		valueField:'EN',
		allowBlank: false
	})
}*/
]);
row1=new Ext.Panel(rowConfig);
row1.add({tag: 'div', html: '构件名称：',bodyStyle:queryLabel+'width:265'});
row1.add({xtype:'textfield',name:'componentName',width:200,rule:'@NAME@ LIKE \'%@VALUE@%\''});	
personTabArea.addToQueryPanel(row1);
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
function appInit()
{
	//----------------------------------------------
	page1.init();
	
	page1.addTab(boArea);
	boArea.refreshFor(boArea.queryBOs)
	page1.addTab(personArea);
	personArea.refreshFor(personArea.queryPersons)

	//---------------------------------------------
	page2.init();
	page2.add(boDetailArea);
	page2.addTab(boTabArea);
	boTabArea.refreshFor()
	//---------------------------------------------
	page3.init();
	page3.add(personDetailArea);
	page3.addTab(personTabArea);
	personTabArea.refreshFor()
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	boArea.queryBOs();
	personArea.queryPersons();
	hideLoading();
}
//-----------------------------------------------------
boArea.queryBOs=function()
{
	SMS_SmsAuditPersonConfigService.queryBOs(boArea.getAreaInfo(),function(viewData)
	{
		boArea.showViewData(viewData);
		page1.setActiveTab(boArea);
	});
}
personArea.queryPersons=function()
{
	SMS_SmsAuditPersonConfigService.queryPersons(personArea.getAreaInfo(),function(viewData)
	{
		personArea.showViewData(viewData);
	});
}
boArea.enterDetailBO=function(constParam)
{
	var obj = boArea.getSigned();
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	SMS_SmsAuditPersonConfigService.enterDetail(obj.componentId,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			page2.show(constParam);	
			componentIdFeild.setValue(obj.componentId);
			componentNameFeild.setValue(obj.componentName);
			boTabArea.queryPersonByBO(obj.componentId);
			page2.setActiveTab(boTabArea);	
		}
	});
}
personArea.enterDetailPerson=function(constParam)
{
	var obj = personArea.getSigned();
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}
	SMS_SmsAuditPersonConfigService.enterDetail(obj.code,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			page3.show(constParam);	
			codeFeild.setValue(obj.code);
			nameFeild.setValue(obj.name);
			personTabArea.queryBOByPerson(obj.code);
			page3.setActiveTab(personTabArea);	
		}
	});
}
boTabArea.queryPersonByBO=function(componentId)
{
	componentId = componentIdFeild.getValue();
	SMS_SmsAuditPersonConfigService.queryPersonByBO(componentId,function(viewData)
	{
		boTabArea.showViewData(viewData);
	});
}
personTabArea.queryBOByPerson=function(code)
{
	code = codeFeild.getValue();
	SMS_SmsAuditPersonConfigService.queryBOByPerson(code,function(viewData)
	{
		personTabArea.showViewData(viewData);
	});
}
personDetailArea.backToPerson=function(c)
{
	SMS_SmsAuditPersonConfigService.backToMain(function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			page1.show();	
			//page1.setActiveTab(personArea);	
			//boArea.queryBOs();
	        //personArea.queryPerson();

		}
	});
}
boDetailArea.backToBO=function(c)
{
	SMS_SmsAuditPersonConfigService.backToMain(function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			page1.show();	
			//boArea.queryBOs();
	        //personArea.queryPerson();
			//page1.setActiveTab(boArea);	
		}
	});
}
boTabArea.addNewPerson=function(constParam)
{  
   selectPerson(null);
}
boDetailArea.updateBO=function(constParam)
{  
	if(!boTabArea.checkFields(true)) return;  //true可检查全部列表，如果没有就只检选中行
	var obj=boDetailArea.getValueObject();	
	var list=boTabArea.getAllObjects();	    //getAllObjects选中所有行
	SMS_SmsAuditPersonConfigService.opModifySmsAuditPersonConfigB(obj.componentId,list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert("修改失败"+viewData.message);
		}
		else
		{
			page2.show(constParam);	
			componentIdFeild.setValue(obj.componentId);
			boTabArea.queryPersonByBO(obj.componentId);
			page2.setActiveTab(boTabArea);	
		}
	});	
}
personTabArea.addNewBO=function(constParam)
{  
   selectComponent(null);
}
personDetailArea.updatePerson=function(constParam)
{  
	if(!personTabArea.checkFields(true)) return;  //true可检查全部列表，如果没有就只检选中行
	var obj=personDetailArea.getValueObject();	
	var list=personTabArea.getAllObjects();	    //getAllObjects选中所有行
	SMS_SmsAuditPersonConfigService.opModifySmsAuditPersonConfigP(obj.code,list,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert("修改失败"+viewData.message);
		}
		else
		{
			page3.show(constParam);	
			codeFeild.setValue(obj.code);
			personTabArea.queryBOByPerson(obj.code);
			page3.setActiveTab(personTabArea);	
		}
	});	
}
Ext.onReady(appInit);