require('SMS_SmsService');
include('SelectAddrList');
include('SelectPerson');
include('SelectAccount');
loadAreaConfig();
//---------------store---------------------------------
var sexStore = new Ext.data.SimpleStore({
	fields: ['sex'],
	data : [['男'],['女']]
});
function reMake(v,p,r)
{
	if (r.get('expressLevel')=='1')
	{
		return v;
	}
	else
	{
		return '';	
	}
}
//-----------------------select-----------------------
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
//--------------全局变量--------------------------------
var row1,row2,row3;
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');

mainArea.setCm([
{
	header: "发信人号码",
	dataIndex: 'sender',
	width: 130,
	sort:true,
	editor: null
},
{
	header: "发信人",
	dataIndex: 'senderName',
	width: 125,
	sort:true,
	editor: null
}
,
{
	header: "短信内容",
	dataIndex: 'msg',
	width: 330,
	editor: new Ext.form.TextArea(
	{
		allowBlank: true,
		readOnly:true
	})
}
,
{
	header: "接收时间",
	dataIndex: 'arrivedTime',
	width: 130,
	sort:true,
	renderer:DateUtil.formatDateTime,
	editor:null
}
]);

row1=new Ext.Panel(rowConfig);						
row1.add({tag: 'div', html: '发信人：',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'senderName',width:100,rule:"@NAME@ LIKE '%@VALUE@%'"});	
row1.add({tag: 'div', html: '发信人号码：',bodyStyle:queryLabel+'width:100'});
row1.add({xtype:'textfield',name:'sender',width:100,rule:"@NAME@ LIKE '%@VALUE@%'"});											
row1.add({tag: 'div', html: '接收时间：',bodyStyle:queryLabel+'width:80'});
row1.add({xtype:'datefield',name:'arrivedTime',width:80,readOnly:true,rule:'DATEDIFF(day,@NAME@, \'@VALUE@\')<=0'});		
row1.add({tag: 'div', html: '至：',bodyStyle:queryLabel+'width:40'});
row1.add({xtype:'datefield',name:'arrivedTime',width:80,readOnly:true,rule:'DATEDIFF(day,@NAME@, \'@VALUE@\')>=0'});				
mainArea.addToQueryPanel(row1);
//----------------------回复---------------------------------
var revertWin=new WindowUnit('revertWin');
var revertArea=new DetailAreaUnit('revertArea');
revertArea.setWidth(600);
row1=new Ext.Panel(rowConfig);		
row1.add({tag: 'div', html: '短信内容：',bodyStyle:queryLabel+'width:100'});   
row1.add({xtype:'textarea',name:'msg',width:400,allowBlank: false,ctCls:'x-form-focus',height:130});
row1.add({xtype:'hidden',name:'hid',width:120});
row1.add({xtype:'hidden',name:'sender',width:600,allowBlank: false,ctCls:'x-form-focus'});		
revertArea.addToFieldSet(row1);		
//---------------------转发----------------------------------
var page2 = new PageUnit('page2');

var editArea=new DetailAreaUnit('editArea'); 
row1=new Ext.Panel(rowConfig);	
row1.add({tag: 'div', html: '短信内容：',bodyStyle:queryLabel+'width:130'});
var msgField=row1.add({xtype:'textarea',name:'msg',width:500,allowBlank: false,ctCls:'x-form-focus',height:100});					
editArea.addToFieldSet(row1);

row2=new Ext.Panel(rowConfig);	
row2.add({tag: 'div', html: '你已经写了',bodyStyle:queryLabel+'width:100'});
var wordField=row2.add({xtype:'textfield',name:'wordNum',width:30,allowBlank: true,readOnly:true});
row2.add({tag: 'div', html: '个字符,本内容将分为',bodyStyle:queryLabel+'width:120'});
var numField=row2.add({xtype:'textfield',name:'num',width:30,allowBlank: true,readOnly:true});
row2.add({tag: 'div', html: '条短信发送。',bodyStyle:queryLabel+'width:80'});

row2.add({tag: 'div', html: '定时发送时间：',bodyStyle:queryLabel+'width:100'});
row2.add({xtype:'datefield',name:'sendTime',width:100,allowBlank:true});
row2.add({xtype:'numberfield',name:'sendH',width:30,allowBlank:false,maxValue:23,minValue:0});
row2.add({tag: 'div', html: '时',bodyStyle:queryLabel+'width:20'});
row2.add({xtype:'numberfield',name:'sendS',width:30,allowBlank:false,maxValue:59,minValue:0});
row2.add({tag: 'div', html: '分',bodyStyle:queryLabel+'width:20'});
row2.add({xtype:'numberfield',name:'sendI',width:30,allowBlank:false,maxValue:59,minValue:0});
row2.add({tag: 'div', html: '秒',bodyStyle:queryLabel+'width:20'});
editArea.addToFieldSet(row2);

//-------------------------------------------------------	
var telArea  = new ListAreaUnit('telArea');
telArea.setHeight(200);
telArea.setTitle("接收人");
telArea.setCm([
{
	header: "接收人",
	dataIndex: 'name',
	width: 200,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: true,
		readOnly: false
	})
},
{
	header: "电话号码",
	dataIndex: 'receiverTel',
	width: 200,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false,
		readOnly: false
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
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryInBox);
	//---------------------------------------------
	page2.init();
	page2.add(editArea);
	page2.addTab(telArea);
	revertWin.init();
	revertWin.add(revertArea);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryInBox();
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
}
//-----------------------------------------------------
//-----主页面查询
mainArea.queryInBox=function()
{
	SMS_SmsService.queryInBoxs(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
//-----主页面删除
mainArea.deleteInBox=function(constParam)
{
	var list=mainArea.getSelected();
	
	if(list.length==0)
	{
		Ext.alert('请勾选短信');
		return;
	}
	Ext.confirm('你确定删除这'+list.length+'条短信吗？',function(btn)
	{
		if(btn=='yes')
		{
			SMS_SmsService.opDeleteInBox(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{	
								
					mainArea.queryInBox();			
				}
			});	
		}
	});
}
//-----主页面转发按钮
mainArea.toEdit=function(constParam)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一条短信');
		return;
	}
	SMS_SmsService.showEditWin(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			page2.show(constParam);
			page2.setActiveTab(telArea);
			//--短信内容
			editArea.showViewData({isSucceed:true,resultList:[obj]});
			//--短信字符和条数
			var wordCount = msgField.getValue().length;
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
			//--短信接收人和电话
			telArea.addRecord({
			name:obj.senderName,
			receiverTel:obj.sender
			})
		}
	});
}
//----------编辑页面发送
editArea.editSend=function()
{
	if(!editArea.checkFields(true)) return;	
	var obj = editArea.getValueObject();
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
//---------定时发送-------
editArea.fixedTimeSend=function()
{
	if(!editArea.checkFields(true)) return;
	var obj = editArea.getValueObject();
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
//----存草稿------
editArea.saveSend=function()
{
	if(!editArea.checkFields(true)) return;
	var obj = editArea.getValueObject();
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
editArea.sendAndSave=function()
{
	if(!editArea.checkFields(true)) return;
	var obj = editArea.getValueObject();
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
//------主页面回复按钮
mainArea.revert=function(constParam)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一条短信');
		return;
	}
	SMS_SmsService.showEditWin(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert(viewData.message);
		}
		else
		{
			obj.msg=''; 
			revertWin.getEm().setTitle('回复');
			revertWin.show(constParam);
			revertArea.showViewData({isSucceed:true,resultList:[obj]});
		}
	});
}
//---------回复页面发送
revertArea.editSend=function()
{
	if(!revertArea.checkFields()) return;	
	var obj = revertArea.getValueObject();
	SMS_SmsService.opEditSend(obj.sender,obj.msg,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('发送失败.'+viewData.message);
		}
		else
		{	
			Ext.alert('发送成功.');		
			mainArea.queryInBox();			
		}
	});	
	
}
//----------编辑页面返回
editArea.backToMain=function()
{	
	page1.show();
	mainArea.queryInBox();
}
//---------回复页面关闭
revertArea.close=function()
{
	revertWin.close();
}
//---------选择通讯录信息
telArea.openAddrListWindow=function()
{
	selectAddrList(null);
}
//---------企业人员
telArea.openPersonWindow=function()
{
	selectPerson(null);
}
//---------关系企业
telArea.openAccountWindow=function()
{
	selectAccount(null);
}
//---------新增
telArea.openNewWindow=function()
{
	newTel();
}
//---------删除
telArea.deleteTel=function()
{
	deleteTel();
}
editArea.close=function()
{
	editWin.close();
}
Ext.onReady(appInit);