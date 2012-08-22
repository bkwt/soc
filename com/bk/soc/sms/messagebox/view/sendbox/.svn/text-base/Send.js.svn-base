require('SMS_SmsService');
include('SelectAddrList');
include('SelectPerson');
include('SelectAccount');
loadAreaConfig();
//--------------全局变量--------------------------------
var row1,row2,row3;
//-----------------------select-----------------------
//历史信息选择
function selectHistoryMsg(e)
{
	showSelectHistoryMsg(e,'SINGLE',setHistoryMsg,'');	
}
function setHistoryMsg(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	
	if(voList.length==0)
	{
		siteTag.setField('receiverMobileNo','');	
		siteTag.setField('msg','');			
	}
	else
	{
		phoneField.setValue(voList[0].receiverMobileNo);
		msgField.setValue(voList[0].msg);
		wordField.setValue(voList[0].msg.length);
		var num=0;
		if(voList[0].msg.length%70==0)
		{
			num = (voList[0].msg.length/70);
		}
		else
		{
			num = parseInt(voList[0].msg.length/70)+1;
		}
		numField.setValue(num);
		
	}
}
//通信录信息选择
function selectAddrList(e)
{alert('TODO');return;
	var phoneStr =  phoneField.getValue();
	var phoneArray = StrUtil.split(phoneStr,',');
	showSelectAddrList(e,'COMPLEX',setAddrList,'',phoneArray,'mobileNo');	
}
function setAddrList(siteTag,addList,removeList)
{
	siteTag=new SiteTag(sendArea.findById('sendArea__data'));
	for(var i=0;i<addList.length;i++)
	{
		if(addList[i].mobileNo!=''&&addList[i].mobileNo!=null)
		{
			siteTag.appendField('receiverMobileNo',addList[i].mobileNo,',');
		}	
	}
	for(var i=0;i<removeList.length;i++)
	{		
		siteTag.removeField('receiverMobileNo',removeList[i].mobileNo,',');	
	}
}
//关系人员选择----------------
function selectPersonAccount(e)
{alert('TODO');return;
	var phoneStr =  phoneField.getValue();
	var phoneArray = StrUtil.split(phoneStr,',');
	showSelectPersonAndAccount(e,'COMPLEX',setPersonAccount,'',phoneArray,'telephone');	
}
function setPersonAccount(siteTag,addList,removeList)
{
	siteTag=new SiteTag(sendArea.findById('sendArea__data'));
	for(var i=0;i<addList.length;i++)
	{
		if(addList[i].telephone!=''&&addList[i].telephone!=null)
		{
			siteTag.appendField('receiverMobileNo',addList[i].telephone,',');
		}	
	}
	for(var i=0;i<removeList.length;i++)
	{		
		siteTag.removeField('receiverMobileNo',removeList[i].telephone,',');	
	}
}
//-----------------------page1-----------------------
var page1 = new PageUnit('page1');

var sendArea=new DetailAreaUnit('sendArea');

row1=new Ext.Panel(rowConfig);						
row1.add({tag: 'div', html: '接收短信号码：',bodyStyle:queryLabel+'width:100'});
var phoneField=row1.add({xtype:'textarea',name:'receiverMobileNo',width:600,allowBlank: false,readOnly:false,ctCls:'x-form-focus'});		
sendArea.addToFieldSet(row1);

row2=new Ext.Panel(rowConfig);	
row2.add({tag: 'div', html: '<font color="blue">注：输入的手机号码请用半角的逗号隔开</font>',bodyStyle:queryLabel+'width:260'});		
row2.add({xtype:'hidden',name:'hid',width:120});		
sendArea.addToFieldSet(row2);

row3=new Ext.Panel(rowConfig);	
row3.add({tag: 'div', html: '短信内容：',bodyStyle:queryLabel+'width:100'});
var msgField=row3.add({xtype:'textarea',name:'msg',width:600,allowBlank: false,ctCls:'x-form-focus'});					
sendArea.addToFieldSet(row3);

row4=new Ext.Panel(rowConfig);	
row4.add({tag: 'div', html: '你已经写了',bodyStyle:queryLabel+'width:100'});
var wordField=row4.add({xtype:'textfield',name:'wordNum',width:30,allowBlank: true,readOnly:true});
row4.add({tag: 'div', html: '个字符,本内容将分为',bodyStyle:queryLabel+'width:120'});
var numField=row4.add({xtype:'textfield',name:'num',width:30,allowBlank: true,readOnly:true});
row4.add({tag: 'div', html: '条短信发送.',bodyStyle:queryLabel+'width:70'});
sendArea.addToFieldSet(row4);

row5=new Ext.Panel(rowConfig);	
row5.add({tag: 'div', html: '定时发送时间：',bodyStyle:queryLabel+'width:100'});
row5.add({xtype:'datefield',name:'sendTime',width:100,allowBlank:true});
row5.add({xtype:'numberfield',name:'sendH',width:30,allowBlank:false,maxValue:23,minValue:0});
row5.add({tag: 'div', html: '时',bodyStyle:queryLabel+'width:20'});
row5.add({xtype:'numberfield',name:'sendS',width:30,allowBlank:false,maxValue:59,minValue:0});
row5.add({tag: 'div', html: '分',bodyStyle:queryLabel+'width:20'});
row5.add({xtype:'numberfield',name:'sendI',width:30,allowBlank:false,maxValue:59,minValue:0});
row5.add({tag: 'div', html: '秒',bodyStyle:queryLabel+'width:20'});
sendArea.addToFieldSet(row5);
//-------------------------------------------------------		
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------
function appInit()
{
	//----------------------------------------------
	page1.init();	
	page1.add(sendArea);
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
}
//-----------------------------------------------------
//----发送-----
sendArea.send=function()
{
	if(!sendArea.checkFields()) return;
	var obj = sendArea.getValueObject();
	SMS_SmsService.opEditSend(obj.receiverMobileNo,obj.msg,function(viewData)
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
//----保存发送信息------
sendArea.saveSend=function()
{
	if(!sendArea.checkFields()) return;
	var obj = sendArea.getValueObject();
	SMS_SmsService.opSaveSend(obj.receiverMobileNo,obj.msg,function(viewData)
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
	if(!sendArea.checkFields()) return;
	var obj = sendArea.getValueObject();
	SMS_SmsService.opSendAndSave(obj.receiverMobileNo,obj.msg,function(viewData)
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
	if(!sendArea.checkFields()) return;
	var obj = sendArea.getValueObject();
	var time = obj.sendTime+" "+obj.sendH+":"+sendS+":"+sendI
	SMS_SmsService.opFixedTimeSend(obj.receiverMobileNo,obj.msg,time,function(viewData)
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
//-----提取历史信息-------
sendArea.openHistoryWindow=function()
{
	selectHistoryMsg(null);
}
//--------通信录信息------
sendArea.openAddrListWindow=function()
{
	selectAddrList(null);
}
//---------关系人员--------
sendArea.openPersonWindow=function()
{
	selectPersonAccount(null);
}
function test()
{
	alert(0);
}

Ext.onReady(appInit);