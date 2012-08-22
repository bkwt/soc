require('SMS_SmsService');
include('SelectAddrList');
include('SelectPerson');
include('SelectAccount');
loadAreaConfig();
//--------------全局变量--------------------------------
var row1,row2,row3;
//-----------------------select-----------------------
//通信录信息选择
function selectAddrList(e)
{
	var list=telArea.getAllObjects();
	ArrayUtil.renameFields(list,'receiverTel','mobileNo');
	var pkArray = new Array();
	pkArray[0]='name';
	pkArray[1]='mobileNo';
	showSelectAddrList(e,'COMPLEX',setAddrList,'',list,pkArray);	
}
function setAddrList(siteTag,addList,removeList)
{
	for(var i=0;i<addList.length;++i)
	{
		telArea.addRecord({
			name:addList[i].name,
			receiverTel:addList[i].mobileNo
			})
	}
	if(removeList.length>0)
	{
		var confirmStr='';
		for(var i=0;i<removeList.length;++i)
		{
			confirmStr+=('\n'+removeList[i].name);
		}
		
		Ext.confirm('您确定移除以下人员吗？'+confirmStr,function(btn)
		{
			if(btn=='yes')
			{	
				for(var i=0;i<removeList.length;++i)
				{
					telArea.removeRecord({receiverTel:removeList[i].mobileNo,name:removeList[i].name});
				}
			}
		});
	}
}
//关系人员选择----------------
function selectPerson(e)
{
	var list=telArea.getAllObjects();
	ArrayUtil.renameFields(list,'receiverTel','telephone');
	var pkArray = new Array();
	pkArray[0]='name';
	pkArray[1]='telephone';
	showSelectPerson(e,'COMPLEX',setPerson,'',list,pkArray);	
}
function setPerson(siteTag,addList,removeList)
{
	for(var i=0;i<addList.length;++i)
	{
		telArea.addRecord({
			name:addList[i].name,
			receiverTel:addList[i].telephone
			})
	}
	if(removeList.length>0)
	{
		var confirmStr='';
		for(var i=0;i<removeList.length;++i)
		{
			confirmStr+=('\n'+removeList[i].name);
		}
		
		Ext.confirm('您确定移除以下人员吗？'+confirmStr,function(btn)
		{
			if(btn=='yes')
			{	
				for(var i=0;i<removeList.length;++i)
				{
					telArea.removeRecord({receiverTel:removeList[i].telephone,name:removeList[i].name});
				}
			}
		});
	}
}
function selectAccount(e)
{
	var list=telArea.getAllObjects();
	ArrayUtil.renameFields(list,'receiverTel','telNum');
	ArrayUtil.renameFields(list,'name','accountName');
	var pkArray = new Array();
	pkArray[0]='accountName';
	pkArray[1]='telNum';
	showSelectAccount(e,'COMPLEX',setAccount,'',list,pkArray);	
}
function setAccount(siteTag,addList,removeList)
{
	for(var i=0;i<addList.length;++i)
	{
		telArea.addRecord({
			name:addList[i].accountName,
			receiverTel:addList[i].telNum
			})
	}
	if(removeList.length>0)
	{
		var confirmStr='';
		for(var i=0;i<removeList.length;++i)
		{
			confirmStr+=('\n'+removeList[i].accountName);
		}
		
		Ext.confirm('您确定移除以下企业吗？'+confirmStr,function(btn)
		{
			if(btn=='yes')
			{	
				for(var i=0;i<removeList.length;++i)
				{
					telArea.removeRecord({receiverTel:removeList[i].telNum,name:removeList[i].accountName});
				}
			}
		});
	}
}
function newTel()
{
	telArea.addRecord({name:null,receiverTel:null});
}
function deleteTel()
{
	var list=telArea.getSelected();
	var confirmStr='';
	for(var i=0;i<list.length;++i)
	{
		confirmStr+=('\r'+(list[i].receiverTel==null?'':list[i].receiverTel)+'<'+(list[i].name==null?'':list[i].name)+'>');
	}
	Ext.confirm('您确定移除以下接收人吗？'+confirmStr,function(btn)
	{
		if(btn=='yes')
		{	
			telArea.removeSelectedRecords();
		}
	});
}
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');
var sendArea=new DetailAreaUnit('sendArea');

row3=new Ext.Panel(rowConfig);	
row3.add({tag: 'div', html: '短信内容：',bodyStyle:queryLabel+'width:130'});
var msgField=row3.add({xtype:'textarea',name:'msg',width:500,allowBlank: false,ctCls:'x-form-focus',height:100});					
sendArea.addToFieldSet(row3);

row4=new Ext.Panel(rowConfig);	
row4.add({tag: 'div', html: '你已经写了',bodyStyle:queryLabel+'width:100'});
var wordField=row4.add({xtype:'textfield',name:'wordNum',width:30,allowBlank: true,readOnly:true});
row4.add({tag: 'div', html: '个字符,本内容将分为',bodyStyle:queryLabel+'width:120'});
var numField=row4.add({xtype:'textfield',name:'num',width:30,allowBlank: true,readOnly:true});
row4.add({tag: 'div', html: '条短信发送。',bodyStyle:queryLabel+'width:80'});

row4.add({tag: 'div', html: '定时发送时间：',bodyStyle:queryLabel+'width:100'});
row4.add({xtype:'datefield',name:'sendTime',width:100,allowBlank:true});
row4.add({xtype:'numberfield',name:'sendH',width:30,allowBlank:false,hideTrigger: true,maxValue:23,minValue:0});
row4.add({tag: 'div', html: '时',bodyStyle:queryLabel+'width:20'});
row4.add({xtype:'numberfield',name:'sendS',width:30,allowBlank:false,hideTrigger: true,maxValue:59,minValue:0});
row4.add({tag: 'div', html: '分',bodyStyle:queryLabel+'width:20'});
row4.add({xtype:'numberfield',name:'sendI',width:30,allowBlank:false,hideTrigger: true,maxValue:59,minValue:0});
row4.add({tag: 'div', html: '秒',bodyStyle:queryLabel+'width:20'});
sendArea.addToFieldSet(row4);
//-------------------------------------------------------	
var telArea  = new ListAreaUnit('telArea');
telArea.setHeight(200);
telArea.setTitle("接收人");
telArea.setCm([
{
	header: "接收人",
	dataIndex: 'name',
	width: 200,
	editor: new Ext.form.TextField(
	{
		allowBlank: true
	})
},
{
	header: "电话号码",
	dataIndex: 'receiverTel',
	width: 200,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
}
]);	
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
function appInit()
{
	//----------------------------------------------
	page1.init();	
	page1.add(sendArea);
	page1.addTab(telArea);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	hideLoading();
	
	msgField.getEl().dom.onkeyup=function()
	{
		var wordCount=this.innerText.length;
		wordField.setValue(wordCount);
		var num=0;
		if(wordCount%70==0)
		{
			num = (wordCount/70);
		}
		else
		{
			num = parseInt(wordCount/70)+1;
		}
		numField.setValue(num);

	    
	}
		page1.setActiveTab(telArea);
}
//-----------------------------------------------------
//----发送-----
sendArea.send=function()
{
	if(!sendArea.checkFields(true)) return;
	var obj = sendArea.getValueObject();
	var list = telArea.getAllObjects();
	if(list.length==0)
	{
		Ext.alert('请添加接收人.');
		return;
	}
	if(!telArea.checkFields(true)) return;
	var tel  = '';
	for(var i=0;i<list.length;i++)
	{
		if(list[i].receiverTel!=''&&list[i].receiverTel!=null)
		{
			if(i==0)
			{
				tel = tel+list[i].receiverTel;	
			}
			else
			{
				tel = tel+','+list[i].receiverTel;
			}
		}
	}
	SMS_SmsService.opEditSend(tel,obj.msg,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('发送失败.'+viewData.message);
		}
		else
		{	
			Ext.alert('发送成功.');				
		}
	});	
	
}
//----存草稿------
sendArea.saveSend=function()
{
	if(!sendArea.checkFields(true)) return;
	var obj = sendArea.getValueObject();
	if(!telArea.checkFields(true)) return;
	var list = telArea.getAllObjects();
	var tel  = '';
	for(var i=0;i<list.length;i++)
	{
		if(i==0)
		{
			tel = tel+(list[i].receiverTel==null?'':list[i].receiverTel)+'<'+(list[i].name==null?'':list[i].name)+'>';	
		}
		else
		{
			tel = tel+','+(list[i].receiverTel==null?'':list[i].receiverTel)+'<'+(list[i].name==null?'':list[i].name)+'>';
		}
	}
	SMS_SmsService.opSaveSend(tel,obj.msg,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('保存失败.'+viewData.message);
		}
		else
		{	
			Ext.alert('保存成功.');				
		}
	});	
	
}
//--------保存并发送信息---------
sendArea.sendAndSave=function()
{
	if(!sendArea.checkFields(true)) return;
	var obj = sendArea.getValueObject();
	var list = telArea.getAllObjects();
	if(list.length==0)
	{
		Ext.alert('请添加接收人.');
		return;
	}
	if(!telArea.checkFields(true)) return;
	var tel  = '';
	var saveTel  = '';
	for(var i=0;i<list.length;i++)
	{
		if(i==0)
		{
			tel = tel+list[i].receiverTel;	
			saveTel = saveTel+list[i].receiverTel+'<'+list[i].name+'>';	
		}
		else
		{
			tel = tel+','+list[i].receiverTel;
			saveTel = saveTel+','+list[i].receiverTel+'<'+list[i].name+'>';
		}
	}
	SMS_SmsService.opSendAndSave(saveTel,tel,obj.msg,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('发送失败.'+viewData.message);
		}
		else
		{	
			Ext.alert('发送成功.');				
		}
	});	
	
}
//---------定时发送-------
sendArea.fixedTimeSend=function()
{
	if(!sendArea.checkFields(true)) return;
	var obj = sendArea.getValueObject();
	var time = DateUtil.formatDate(obj.sendTime)+" "+obj.sendH+":"+obj.sendS+":"+obj.sendI;
	var list = telArea.getAllObjects();
	if(list.length==0)
	{
		Ext.alert('请添加接收人.');
		return;
	}	
	if(!telArea.checkFields(true)) return;
	var tel  = '';
	for(var i=0;i<list.length;i++)
	{
		if(list[i].receiverTel!=''&&list[i].receiverTel!=null)
		{
			if(i==0)
			{
				tel = tel+list[i].receiverTel;	
			}
			else
			{
				tel = tel+','+list[i].receiverTel;
			}
		}
	}
	SMS_SmsService.opFixedTimeSend(tel,obj.msg,time,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('发送失败.'+viewData.message);
		}
		else
		{	
			Ext.alert('发送成功.');				
		}
	});	
}
//--------通信录信息------
telArea.openAddrListWindow=function()
{
	selectAddrList(null);
}
//---------关系人员--------
telArea.openPersonWindow=function()
{
	selectPerson(null);
}
telArea.openAccountWindow=function()
{
	selectAccount(null);
}
telArea.openNewWindow=function()
{
	newTel();
}
telArea.deleteTel=function()
{
	deleteTel();
}
function test()
{
	alert(0);
}

Ext.onReady(appInit);