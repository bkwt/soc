require('call_eventmanageservice');

include('SelectOrgz');

loadAreaConfig();

// 选择部门
function selectCate(e) {
	var obj = detailConversion.getValueObject();
	var receiveOrgzCodes = obj.orgzCodeHid;

	var receiveOrgzCodeArray = StrUtil.split(receiveOrgzCodes, ',');

	showSelectOrgz(e, 'COMPLEX', setCate, '', receiveOrgzCodeArray, 'code');
}
function setCate(siteTag, addList, removeList) {
	for ( var i = 0; i < addList.length; ++i) {
		siteTag.appendField('orgzDis', addList[i].name, ',');
		siteTag.appendField('orgzCodeHid', addList[i].code, ',');
	}

	for ( var i = 0; i < removeList.length; ++i) {
		siteTag.removeField('orgzDis', removeList[i].name, ',');
		siteTag.removeField('orgzCodeHid', removeList[i].code, ',');
	}
}

/**
 * 部门store
 */
var callOrgzStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
});
call_eventmanageservice.getOrgz({
	callback : function(list) {
		callOrgzStore.loadData(list);
	},
	async : false
});
/*
 * 即办转办
 */
 var typeStore = new Ext.data.Store({
		fields : [ 'name']
	});
 typeStore.loadData([['即办件'],['转办件']]);
/**
 * 事件类型store
 */
var callTypeStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
});
call_eventmanageservice.getTCallType(function(list) {
	callTypeStore.loadData(list);
});
/**
 * 投诉渠道store
 */
var callChannelStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
});
call_eventmanageservice.getTChannel({
	callback:function(list) {
	callChannelStore.loadData(list);
},
	async:false
});
/**
 * 事件状态store
 */
var callStateStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
});
call_eventmanageservice.getTCallState(function(list) {
	callStateStore.loadData(list);
});
/**
 * 查找类别大类
 */
var callCategorylLargeStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
})
call_eventmanageservice.geteCategorylLarge({
	callback : function(list) {
		callCategorylLargeStore.loadData(list);
	},
	async : false
});
/**
 * 查询类别小类
 */
var callCategorylSmallStore = new Ext.data.Store({
	fields : [ 'code', 'name','stintday' ]
})

var page1 = new PageUnit('page1');
var page2 = new PageUnit('page2');

/* page1的内容 */
var mainArea = new ListAreaUnit('mainArea');
mainArea.setCm([ {
	header : "事件编码",
	dataIndex : 'code',
	sort : true
}, {
	header : "事件标题",
	dataIndex : 'calltitle',
	sort : true
},{
	header : '呼叫时间',
	dataIndex : 'calltime',
	width:140,
	sort : true,
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
}, {
	header : '类别大类',
	dataIndex : 'categorylargename',
	sort : true
}, {
	header : '类别小类',
	dataIndex : 'categorysmallname',
	sort : true
}, {
	header : '受理人',
	dataIndex : 'personname',
	sort : true
}, {
	header : '当前办理部门',
	dataIndex : 'turnorgz',
	sort : true,
	renderer : function(value, metadata, record) {
		var index = callOrgzStore.find('code', value);
		if (index != -1) {
			return callOrgzStore.getAt(index).data.name;
		}
		return value;
	}
}, {
	header : '限制天数',
	dataIndex : 'day',
	sort : true,
	renderer:function(value, data, record){
		if(value != null)
		return value+'天';
	}
}, {
	header : '呼叫类型',
	dataIndex : 'typename',
	sort : true
}, {
	header : '事件来源',
	dataIndex : 'channelname',
	sort : true
}, {
	header : '状态',
	dataIndex : 'statename',
	sort : true
}])

/**
 * 查询面板
 */
mainArea.addToQueryPanel([ {
	fieldLabel : "事件编码",
	xtype : "textfield",
	name : 'code',
	rule : "@NAME@ LIKE '%@VALUE@%'"
}, {
	fieldLabel : '事件标题',
	xtype : 'textfield',
	name : 'calltitle'

}, {
	fieldLabel : '开始时间',
	xtype : 'datefield',
	name : 'start',
	format : 'Y-m-d H:i:s',
	rule:'calltime>=\'@VALUE@\''
},{
	fieldLabel : '结束时间',
	xtype : 'datefield',
	name : 'end',
	format : 'Y-m-d H:i:s',
	rule:'calltime<=\'@VALUE@\''
},{
	fieldLabel : '事件内容',
	xtype : 'textfield',
	name : 'content'
}, {
	fieldLabel : "事件状态",
	xtype : "combo",
	name : 'state',
	emptyText : '--请选择状态--',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	store : callStateStore
}, {
	fieldLabel : "部门",
	xtype : "combo",
	emptyText : '--请选择部门--',
	name : 'turnorgz',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	store : callOrgzStore
},{
	fieldLabel : "办件类型",
	xtype : "combo",
	name : 'type',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'name',
	store : typeStore
}, {
	fieldLabel : "类别",
	xtype : "combo",
	emptyText : '--请选择类别--',
	name : 'callcategorylarge',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	store : callCategorylLargeStore
} ]);

var eventManageWin = new WindowUnit('eventManageWin');
eventManageWin.setTitle('新增事件')
/* page1的添加 */
var detailArea = new DetailAreaUnit('detailArea');

detailArea.addToFieldSet([
				{
					fieldLabel : '事件标题',
					name : 'calltitle',
					xtype : 'textfield',
					allowBlank : false,
					enableKeyEvents : true,
					listeners : {
						keypress : function(a, e) {
							if (e.keyCode == 13) {
								detailArea.fields['calltel'].focus(false, 100);
							}
						}
					}
				},
				{
					fieldLabel : '呼叫时间',
					name : 'calltime',
					xtype : 'datefield',
					format : 'Y-m-d H:i:s',
					value : new Date
				},
				{
					fieldLabel : '呼叫电话',
					xtype : 'textfield',
					name : 'calltel',
					regex : /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
					regexText : '电话号码输入格式输入错误!',
					allowBlank : false,
					enableKeyEvents : true,
					listeners : {
						keypress : function(a, e) {
							if (e.keyCode == 13) {
								detailArea.fields['callname'].focus(false, 100);
							}
						}
					}

				},
				{
					fieldLabel : '呼叫人',
					xtype : 'textfield',
					name : 'callname',
					allowBlank : false,
					enableKeyEvents : true,
					listeners : {
						keypress : function(a, e) {
							if (e.keyCode == 13) {
								detailArea.fields['calltype'].focus(false, 100);
								detailArea.fields['calltype'].expand();
							}
						}
					}
				},
				{
					fieldLabel : '事件类型',
					xtype : 'combo',
					name : 'calltype',
					allowBlank : false,
					typeAhead : true,
					forceSelection : true,
					emptyText : '--请选择事件类型--',
					store : callTypeStore,
					valueField : 'code',
					queryMode : 'local',
					displayField : 'name',
					listeners : {
						select : function(a, e, c) {
							detailArea.fields['callcategorylarge'].focus(false,100);
							detailArea.fields['callcategorylarge'].expand();
						}
					}
				},
				{
					fieldLabel : '事件来源',
					xtype : 'combo',
					name : 'callsource',
					allowBlank : false,
					emptyText : '--请选择事件来源--',
					store : callChannelStore,
					valueField : 'code',
					queryMode : 'local',
					displayField : 'name',
					listeners : {
						select : function(a, e, c) {
							detailArea.fields['callcategorylarge'].focus(false,100);
							detailArea.fields['callcategorylarge'].expand();
						}
					}
				},
				{
					fieldLabel : '类别大类',
					xtype : 'combo',
					name : 'callcategorylarge',
					allowBlank : false,
					emptyText : '--请选择类别大类--',
					typeAhead : true,
					forceSelection : true,
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					store : callCategorylLargeStore,
					listeners : {
						select : function(a, b, c) {
							var code = a.getValue();
							call_eventmanageservice.geteCategorylSmall(code,function(list) {
								detailArea.fields['callcategorylsmall'].reset();
								callCategorylSmallStore.loadData(list);
							});
							detailArea.fields['callcategorylsmall'].focus(false, 100);
							detailArea.fields['callcategorylsmall'].expand();
						}
					}
				}, {
					fieldLabel : '类别小类',
					xtype : 'combo',
					name : 'callcategorylsmall',
					queryMode : 'local',
					typeAhead : true,
					forceSelection : true,
					emptyText : '--请选择类别小类--',
					displayField : 'name',
					valueField : 'code',
					store : callCategorylSmallStore,
					listeners : {
						select : function(a, b, c) {
							var code = a.getValue();
							detailArea.fields['day'].setValue(b[0].data.stintday);
							detailArea.fields['content'].focus(false, 100);
						}
					}
				}, {
					xtype : 'textarea',
					name : 'content',
					fieldLabel : '事件描述',
					allowBlank : true,
					height : 250,
					width : 745,
					rowspan : 4
				}, {
					name : 'day',
					xtype : 'textarea',
					hidden:true
				}  ]);
/**
 * 事件名细区域
 */
var detailAreaPageTwo = new DetailAreaUnit('detailAreaPageTwo');

detailAreaPageTwo.addToBillTitle([ {
	xtype : 'combo',
	id : 'detailorgz',
	fieldLabel : '转发部门',
	readOnly : true
}, {
	fieldLabel : '转发人',
	xtype : 'textfield',
	id : 'detailperson',
	readOnly : true

}, {
	fieldLabel : '转发时间',
	xtype : 'textfield',
	id : 'detailtime',
	readOnly : true,
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
}, {
	fieldLabel : "处理天数",
	xtype : "textfield",
	id : 'detailday',
	readOnly : true
} ]);
detailAreaPageTwo.addToFieldSet([
				{
					fieldLabel : '事件标题',
					name : 'calltitle',
					xtype : 'textfield',
					allowBlank : false
				},
				{
					fieldLabel : '呼叫时间',
					name : 'calltime',
					xtype : 'datefield',
					format : 'Y-m-d H:i:s'
				},
				{
					fieldLabel : '呼叫电话',
					xtype : 'textfield',
					name : 'calltel',
					regex : /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
					regexText : '电话号码输入格式输入错误!',
					allowBlank : false
				},
				{
					fieldLabel : '呼叫人',
					xtype : 'textfield',
					name : 'callname',
					allowBlank : false
				},
				{
					fieldLabel : '事件类型',
					xtype : 'combo',
					name : 'calltype',
					allowBlank : false,
					store : callTypeStore,
					typeAhead : true,
					forceSelection : true,
					valueField : 'code',
					queryMode : 'local',
					displayField : 'name'
				},
				{
					fieldLabel : '事件来源',
					xtype : 'combo',
					name : 'callsource',
					allowBlank : false,
					typeAhead : true,
					forceSelection : true,
					store : callChannelStore,
					valueField : 'code',
					queryMode : 'local',
					displayField : 'name'
				},
				{
					fieldLabel : '类别大类',
					xtype : 'combo',
					name : 'callcategorylarge',
					allowBlank : false,
					queryMode : 'local',
					displayField : 'name',
					valueField : 'code',
					typeAhead : true,
					forceSelection : true,
					store : callCategorylLargeStore,
					listeners : {
						select : function(a, b, c) {
							var code = a.getValue();
							call_eventmanageservice.geteCategorylSmall(code,function(list) {
								detailAreaPageTwo.fields['callcategorylsmall'].reset();
								callCategorylSmallStore.loadData(list);
								var record = callCategorylSmallStore.getAt(0);
								var value = record.get('code');//
							});
						}
					}
				},
				{
					fieldLabel : '类别小类',
					xtype : 'combo',
					name : 'callcategorylsmall',
					queryMode : 'local',
					typeAhead : true,
					forceSelection : true,
					displayField : 'name',
					valueField : 'code',
					store : callCategorylSmallStore
				}, {
					xtype : 'textarea',
					name : 'content',
					fieldLabel : '事件描述',
					height : 70,
					width : 745,
					rowspan : 4
				}, {
					fieldLabel : '事件状态',
					name : 'state',
					hidden : true
				}, {
					fieldLabel : '事件编码',
					name : 'code',
					hidden : true

				}, {
					name : 'day',
					hidden:true
				} ]);
/**
 * 显示事件转办的win
 */
var showConversionWin = new WindowUnit('showConversionWin');
showConversionWin.setTitle('转办事件');

var detailConversion = new DetailAreaUnit('detailConversion');
detailConversion.setWidth(325);
detailConversion.addToFieldSet([ {
	fieldLabel : '部门',
	xtype : 'combo',
	name : 'orgzDis',
	allowBlank : false,
	editable : false,
	triggerBaseCls : 'x--searchtrigger'
}, {
	xtype : 'numberfield',
	name : 'day',
	minValue : 1,
	maxValue : 9999,
	allowBlank : false,
	fieldLabel : '办理期限'
}, {
	xtype : 'textarea',
	fieldLabel : '意见',
	height:100,
	name : 'node',
	allowBlank : true
}, {
	xtype : 'textfield',
	name : 'orgzCodeHid',
	hidden : true
} ], {
	fieldsPerRow : 1
});

detailConversion.fields['orgzDis'].onTriggerClick = selectCate;

/* 事件办理步骤 */
var detailAreaConversionPage = new ListAreaUnit('listConversion');
detailAreaConversionPage.setTitle('办理步骤');
detailAreaConversionPage.setCm([ {
	header : '办理步骤',
	dataIndex : 'code'
}, {
	header : '转出部门',
	dataIndex : 'fromorgz',
	renderer : function(value, metadata, record) {
		var index = callOrgzStore.find('code', value);
		if (index != -1) {
			return callOrgzStore.getAt(index).data.name;
		}
		return value;
	}
}, {
	header : "处理意见",
	dataIndex : 'node'
}, {
	header : '转入部门',
	dataIndex : 'toorgz',
	renderer : function(value, metadata, record) {
		var index = callOrgzStore.find('code', value);
		if (index != -1) {
			return callOrgzStore.getAt(index).data.name;
		}
		return value;
	}
}, {
	header : "转办时间",
	dataIndex : 'date',
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
}, {
	header : "办理状态",
	dataIndex : 'state',
	renderer : function(a) {
		var value = "";
		if (a == "end") {
			value = "办结";
		} else {
			value = "办理中";
		}
		return value;
	}
} ]);

/**
 * 回访
 */
var ShowVisitWin = new WindowUnit('ShowVisitWin');
ShowVisitWin.setTitle('回访');

var visitConversion = new ListAreaUnit('visitConversion');
visitConversion.setTitle('回访记录');
visitConversion.setCm([ {
	header : "回访编码",
	dataIndex : 'code'
}, {
	header : "受访者",
	dataIndex : 'visitname'
}, {
	header : "回访意见",
	dataIndex : 'comment'
}, {
	header : "满意度",
	dataIndex : 'gsi'
}, {
	header : "回访时间",
	dataIndex : 'visittime',
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
} ])
/**
 * 回访form
 */
var detailVisit = new DetailAreaUnit('detailVisit');
detailVisit.setWidth(380);
detailVisit.addToFieldSet([ {
	fieldLabel : '回访时间',
	xtype : 'datefield',
	name : 'visittime',
	format : 'Y-m-d H:i:s',
	value : new Date
}, {
	xtype : 'textarea',
	name : 'comment',
	fieldLabel : '回访意见',
	height : 120
}, {
	fieldLabel : '满意度',
	xtype : 'radiogroup',
	name:'gsigroup',
	items : [ {
		boxLabel : '满意',
		name : 'gsi',
		inputValue : '满意',
		checked : true
	}, {
		boxLabel : '良好',
		name : 'gsi',
		inputValue : '良好'
	}, {
		boxLabel : '一般',
		name : 'gsi',
		inputValue : '一般'
	}, {
		boxLabel : '较差',
		name : 'gsi',
		inputValue : '较差'
	}]
}, {
	fieldLabel : '事件编码',
	hidden:true,
	xtype : 'textfield',
	name : 'billid'
}, {
	fieldLabel : '受访者',
	hidden:true,
	xtype : 'textfield',
	name : 'visitname'
} ], {
	fieldsPerRow : 1
});
var smsWin=new WindowUnit('smsWin');
smsWin.setTitle('发送短信');

var smsArea=new DetailAreaUnit('smsArea');
smsArea.addToFieldSet([{
    fieldLabel: '电话号码',
    name: 'tel',
    xtype:'textfield',
    readOnly:false,
    allowBlank: false
}, {
    fieldLabel: '内容',
    name: 'node',
    xtype:'textarea',
    height:100,
    allowBlank: false
}],{fieldsPerRow:1});
smsArea.setWidth(300);

var smsListArea = new ListAreaUnit('smsListArea');
smsListArea.setTitle('短信记录');
smsListArea.setCm([  {
	header : "时间",
	dataIndex : 'smstime',
	width:140,
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
}, {
	header : "内容",
	dataIndex : 'node'
}, {
	header : "状态",
	dataIndex : 'type'
}]);

var jobWin=new WindowUnit('jobWin');
jobWin.setTitle('发送督办单');
var jobArea=new DetailAreaUnit('jobArea');
jobArea.addToFieldSet([ {
    fieldLabel: '内容',
    name: 'node',
    xtype:'textarea',
    height:100,
    allowBlank: false
}],{fieldsPerRow:1});
jobArea.setWidth(300);

var jobListArea = new ListAreaUnit('jobListArea');
jobListArea.setTitle('督办记录');
jobListArea.setCm([  {
	header : "时间",
	dataIndex : 'jobtime',
	width:140,
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
}, {
	header : "内容",
	dataIndex : 'node'
}, {
	header : "类型",
	dataIndex : 'type'
}]);
/**
 * 页面初始化
 */
function appInit() {
	page1.init();
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryEvent);
	
	page2.init();
	page2.add(detailAreaPageTwo);
	page2.addTab(detailAreaConversionPage);
	page2.addTab(visitConversion);
	page2.addTab(smsListArea);
	page2.addTab(jobListArea);
	
	eventManageWin.init();// 事件添加win
	eventManageWin.add(detailArea);
	
	showConversionWin.init();// 事件转办win
	showConversionWin.add(detailConversion);// 事件转办win添加form
	
	ShowVisitWin.init();// 回访win
	ShowVisitWin.add(detailVisit);
	
	smsWin.init();
	smsWin.add(smsArea);
	
	jobWin.init();
	jobWin.add(jobArea);
	
	

	var orgzCode = request.getParameter('orgzCode');
	var state = request.getParameter('state');
	var catecode = request.getParameter('catecode');
	var code = request.getParameter('eventcode');
	var start = request.getParameter('start');
	var end = request.getParameter('end');
	
	mainArea.queryFields['code'].setValue(code);
	mainArea.queryFields['start'].setValue(start);
	mainArea.queryFields['end'].setValue(end);
	mainArea.queryFields['state'].setValue(state);
	mainArea.queryFields['turnorgz'].setValue(orgzCode);
	mainArea.queryFields['callcategorylarge'].setValue(catecode);

	if(code == null){
		page1.show(request.getParameter('progParams'));
		mainArea.queryEvent();
	}else{
		setAppContext('code',code);
		page2.show(request.getParameter('progParams'));
		page2.setActiveTab(detailAreaConversionPage);// 设置tab页默认显示
		detailAreaPageTwo.queryEvent();
		detailAreaConversionPage.queryTurn();
		visitConversion.queryVisit();
		smsListArea.queryCallSms();
		// 获取当前转办的任务数据
		call_eventmanageservice.getTTurn(code, function(list) {
			if (list != null && list != "") {
				Ext.getCmp("detailorgz").setValue(list[0].toorgz);
				Ext.getCmp("detailperson").setValue(list[0].person);
				Ext.getCmp("detailtime").setValue(Ext.util.Format.date(list[0].date, 'Y-m-d H:i:s'));
				Ext.getCmp("detailday").setValue(list[0].day);
			} else {
				Ext.getCmp("detailorgz").setValue("");
				Ext.getCmp("detailperson").setValue("");
				Ext.getCmp("detailtime").setValue("");
				Ext.getCmp("detailday").setValue("");
			}
		});
	}
	

	hideLoading();
}
mainArea.opshowpagetwo = function(c) {
	var obj = mainArea.getSigned();
	if(!obj)
	{
		Ext.alert('请选中一行记录');
		return;
	}

	setAppContext('code',obj.code);
	page2.show(c);
	page2.setActiveTab(detailAreaConversionPage);// 设置tab页默认显示
	detailAreaPageTwo.queryEvent();
	detailAreaConversionPage.queryTurn();
	visitConversion.queryVisit();
	smsListArea.queryCallSms();
	// 获取当前转办的任务数据
	call_eventmanageservice.getTTurn(obj.code, function(list) {
		if (list != null && list != "") {
			Ext.getCmp("detailorgz").setValue(list[0].toorgz);
			Ext.getCmp("detailperson").setValue(list[0].person);
			Ext.getCmp("detailtime").setValue(Ext.util.Format.date(list[0].date, 'Y-m-d H:i:s'));
			Ext.getCmp("detailday").setValue(list[0].day);
		} else {
			Ext.getCmp("detailorgz").setValue("");
			Ext.getCmp("detailperson").setValue("");
			Ext.getCmp("detailtime").setValue("");
			Ext.getCmp("detailday").setValue("");
		}
	});
}
/**
 * 查询所有事件
 */
mainArea.queryEvent = function() {

	call_eventmanageservice.queryEvents(mainArea.getAreaInfo(), function(viewData) {
		mainArea.showViewData(viewData);
	});
}
detailAreaPageTwo.queryEvent = function() {
	call_eventmanageservice.queryEvent(getAppContext('code'), function(viewData) {
		
		detailAreaPageTwo.showViewData(viewData);
	});
}
/**
 * 查询事件办理情况
 */
detailAreaConversionPage.queryTurn = function() {
	call_eventmanageservice.queryTurn(getAppContext('code'), function(viewData) {
		detailAreaConversionPage.showViewData(viewData);
	});
}
/**
 * 显示添加事件的window
 */
mainArea.showNewEventWin = function(constParam) {
	eventManageWin.show(constParam);
	/* 呼叫时间 */
	detailArea.fields['calltime'].setValue(new Date());
	detailArea.fields['callsource'].setValue("0002");
	
}

/**
 * 显示事件转办的win
 * 
 */
detailAreaPageTwo.ShowNewConversionWin = function(constParam) {
	showConversionWin.show("ADDNEWCONN");
	var obj=detailAreaPageTwo.getValueObject();
	detailConversion.fields['day'].setValue(obj.day);
}

/**
 * 返回
 */
detailAreaPageTwo.backToMainPage = function(c) {
	page1.show(c);
	mainArea.queryEvent();
}
/**
 * 退回
 */
detailAreaPageTwo.opRejec = function() {
	Ext.prompt('请填写缘由', function(btn1, reason) {
		if (btn1 == 'ok') {
			Ext.confirm('您确定要退回吗?缘由是：' + (reason ? reason : '无'),
					function(btn2) {
						if (btn2 == 'yes') {
							call_eventmanageservice.opRejec(getAppContext('code'), reason,
									function(viewData) {
										page1.show();
										mainArea.queryEvent();
									});
						}
					});
		}
	});

}
/**
 * 结束
 */
detailAreaPageTwo.opPass = function() {
	Ext.prompt('请填写处理意见', function(btn1, reason) {
		if (btn1 == 'ok') {
			Ext.confirm('您确认结束吗?处理意见是：' + (reason ? reason : '无'), function(
					btn2) {
				if (btn2 == 'yes') {
					var state = detailAreaPageTwo.getValueObject().state;
					call_eventmanageservice.endBill(getAppContext('code'), reason,state ,function(
							viewData) {
						if (!viewData.isSucceed) {
							Ext.alert(viewData.message);
						} else {
							page1.show();
							mainArea.queryEvent();
						}

					});
				}
			});
		}
	},true);

}
/**
 * 回访
 */
detailAreaPageTwo.ShowVisitWin = function(c) {
	ShowVisitWin.show("ADDVISIT");
	detailVisit.fields['visittime'].setValue(new Date());
	detailVisit.fields['visitname'].setValue(detailAreaPageTwo.fields['callname'].getValue());

}
/**
 * 回访method
 */
visitConversion.queryVisit= function() {
	call_eventmanageservice.queryCallVisit(visitConversion.getAreaInfo(), getAppContext('code'),function(viewData) {
		visitConversion.showViewData(viewData);
	});
}
detailVisit.visit = function() {
	var obj = detailVisit.getValueObject();
	obj.gsi = detailVisit.fields['gsigroup'].getValue().gsi;
	obj.billid = getAppContext('code');
	call_eventmanageservice.opAddNewCallVisit(obj,function(){
		visitConversion.queryVisit();
		ShowVisitWin.close();
	});
	
}
/*
 * 短信
 */
detailAreaPageTwo.ShowSmsWin = function(c) {
	smsWin.show('EDIT');
	var obj=detailAreaPageTwo.getValueObject();
	smsArea.fields['tel'].setValue(obj.calltel);
	smsArea.fields['node'].focus(false,100);
}

smsListArea.queryCallSms= function() {
	call_eventmanageservice.queryCallSms(getAppContext('code'),function(viewData) {
		smsListArea.showViewData(viewData);
	});
}

smsArea.send=function()
{
	if(!smsArea.checkFields()) return;
	var obj=smsArea.getValueObject();
	obj.billid= getAppContext('code');
	
	call_eventmanageservice.opSend(obj,function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('发送失败');
		} else {
			smsWin.close();
			smsListArea.queryCallSms();
		}
		
	})
}

/*
 * 督办
 */
detailAreaPageTwo.ShowJobWin = function(c) {
	jobWin.show('EDIT');
}

jobListArea.queryCallJob= function() {
	call_eventmanageservice.queryCallJob(getAppContext('code'),function(viewData) {
		jobListArea.showViewData(viewData);
	});
}

jobArea.opSaveCallJob=function()
{
	if(!jobArea.checkFields()) return;
	var obj=jobArea.getValueObject();
	obj.billid= getAppContext('code');
	
	call_eventmanageservice.opSaveCallJob(obj,function(viewData) {
		jobWin.close();
		jobListArea.queryCallJob();
	})
}
/**
 * 修改事件
 */
detailAreaPageTwo.opModifyEvent = function() {
	var obj = detailAreaPageTwo.getValueObject();
	call_eventmanageservice.opModfiyEvent(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
		}
	});
}
/**
 * 转办
 */
detailConversion.turnBill = function() {
	if (!detailConversion.checkFields())
		return;
	var orgz = detailConversion.fields['orgzCodeHid'].getValue();
	var node = detailConversion.fields['node'].getValue();
	var day = detailConversion.fields['day'].getValue();
	call_eventmanageservice.turnBill(getAppContext('code'), orgz, day, node,
			function(viewData) {
				if (!viewData.isSucceed) {
					Ext.alert(viewData.message);
				} else {
					showConversionWin.close();
					page1.show();
					mainArea.queryEvent();
				}
			});
}
/**
 * 增加事件
 */
detailArea.opAddNewEvent = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.turnorgz = getUserSession().orgzCode;
	call_eventmanageservice.opAddNewEvent(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			detailArea.fields['calltime'].setValue(new Date());
			detailArea.fields['callsource'].setValue("0002");
			mainArea.queryEvent();

		}
	});
}
/**
 * 保存并关闭
 */
detailArea.opAddNewEventAndClose = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.turnorgz = getUserSession().orgzName;
	call_eventmanageservice.opAddNewEvent(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			mainArea.queryEvent();
			eventManageWin.close();
		}
	});
}
/**
 * 删除事件
 */
mainArea.opDeleteEvent = function() {
	var list = mainArea.getSelected();

	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}
	var hids = [];
	for(var i=0;i<list.length;i++){
		var obj = {};
		obj.hid= list[i].hid;
		hids.push(obj);
	}
	if (Ext.confirm('确认删除吗?', function(btn) {
		if (btn == 'yes') {
			call_eventmanageservice.opDeleteEvent(hids, function(viewData) {
				if (!viewData.isSucceed) {
					Ext.alert('删除失败');
				} else {
					mainArea.queryEvent();
				}
			});
		}
	}));
}

Ext.onReady(appInit);
