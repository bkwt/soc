require('SMS_SmsService');
include('SelectAddrList');
include('SelectPerson');
include('SelectAccount');
loadAreaConfig();
//--------------全局变量--------------------------------
//---------------store---------------------------------
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
//-----------------------select-----------------------
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var mainArea=new ListAreaUnit('mainArea');

mainArea.setCm([
{
	header: "收信人号码",
	dataIndex: 'receiverMobileNo',
	width: 250,
	sort:true,
	editor: null
}
,
{
	header: "短信内容",
	dataIndex: 'msg',
	width: 464,
	editor: new Ext.form.TextArea(
	{
		allowBlank: true,
		readOnly:true
	})
}
]);
row1=new Ext.Panel(rowConfig);						
row1.add({tag: 'div', html: '收信人号码：',bodyStyle:queryLabel+'width:240'});
row1.add({xtype:'textfield',name:'receiverMobileNo',width:120,rule:"@NAME@ LIKE '%@VALUE@%'"});
row1.add({tag: 'div', html: '短信内容',bodyStyle:queryLabel+'width:120'});
row1.add({xtype:'textfield',name:'msg',width:120,rule:"@NAME@ LIKE '%@VALUE@%'"});			
mainArea.addToQueryPanel(row1);
 
//-------------------------------------------------------
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
row2.add({xtype:'numberfield',name:'sendH',width:30,allowBlank:false,hideTrigger: true,maxValue:23,minValue:0});
row2.add({tag: 'div', html: '时',bodyStyle:queryLabel+'width:20'});
row2.add({xtype:'numberfield',name:'sendS',width:30,allowBlank:false,hideTrigger: true,maxValue:59,minValue:0});
row2.add({tag: 'div', html: '分',bodyStyle:queryLabel+'width:20'});
row2.add({xtype:'numberfield',name:'sendI',width:30,allowBlank:false,hideTrigger: true,maxValue:59,minValue:0});
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
	
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryHistoryMsg);
	//---------------------------------------------
	page2.init();
	page2.add(editArea);
	page2.addTab(telArea);
	//---------------------------------------------
	//---------------------------------------------
	//---------------------------------------------
	page1.show(request.getParameter('progParams'));
	
	mainArea.queryHistoryMsg();
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
mainArea.queryHistoryMsg=function()
{
	SMS_SmsService.queryHistoryMsgs(mainArea.getAreaInfo(),function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
//-----主页面删除
mainArea.deleteHistory=function(constParam)
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
			SMS_SmsService.opDeleteHistory(list,function(viewData)
			{
				if(!viewData.isSucceed)
				{
					Ext.alert('删除失败.'+viewData.message);
				}
				else
				{	
								
					mainArea.queryHistoryMsg();			
				}
			});	
		}
	});
}
//-----主页面编辑按钮
mainArea.toEdit=function(constParam)
{
	var obj=mainArea.getSigned();
	
	if(!obj)
	{
		Ext.alert('请选中一条短信');
		return;
	}
	
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
			//--短信接收人
			var tempTel = obj.receiverMobileNo;			
			var phoneArray = StrUtil.split(tempTel,',');

			if(phoneArray!=''&&phoneArray!=null)
			{
				for(var i=0;i<phoneArray.length;i++)
				{
					while(phoneArray[i].indexOf('\n')!=-1)
					{
						phoneArray[i] = phoneArray[i].replace('\n','')
					}
					while(phoneArray[i].indexOf('\r')!=-1)
					{
						phoneArray[i] = phoneArray[i].replace('\r','')
					}
					if(phoneArray[i].indexOf('<')!=-1)
					{
						var disName =phoneArray[i].substring(phoneArray[i].indexOf('<')+1,phoneArray[i].indexOf('>')); 
						phoneArray[i] = phoneArray[i].substring(0,phoneArray[i].indexOf('<')); 
						if(phoneArray[i]=='null')
						{
							phoneArray[i] = '';
						}
						telArea.addRecord({
						name:disName,
						receiverTel:phoneArray[i]
						})
					}
					else
					{
						phoneArray[i] = phoneArray[i];
						telArea.addRecord({
						name:'',
						receiverTel:phoneArray[i]
						})						
					}
				}
			}					
		
}
//----------编辑页面发送
editArea.editSend=function()
{
	if(!editArea.checkFields(true)) return;	
	var obj = editArea.getValueObject();
	if(!telArea.checkFields(true)) return;
	var list = telArea.getAllObjects();
	if(list.length==0)
	{
		Ext.alert('请添加接收人.');
		return;
	}
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
//----------编辑页面返回
editArea.backToMain=function()
{	
	page1.show();
	mainArea.queryHistoryMsg();
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
Ext.onReady(appInit);