//1请求DWR
require('call_CategoryStatisService');
//include('SelectOrgz');
//include('selectPerson');
// 2加载配置文件
loadAreaConfig();

////选择部门
//function selectCate(e)
//{
//	showSelectOrgz(e,'SINGLE',setCate,'');
//}
//function setCate(siteTag,voList)
//{
//	if(siteTag.getSelectedCount()==0)
//	{
//		Ext.alert('没有选定的记录');
//		return;
//	}
//	
//	if(voList.length==0)
//	{
//		siteTag.setField('orgz','');
//	}
//	else
//	{
//		var name = '';
//		var value = '';
//		for(var index=0; index<voList.length; index++) {
//			name += voList[index].name + ',';
//			value += "'" + voList[index].code +"'"+ ',';
//		}
//		siteTag.setField('orgz',name.substring(0,name.length-1));
//		siteTag.setField('hidOrgz',value.substring(0,value.length-1));
//	}
//}


//选择人员
//function selectPeople(e)
//{
//	showSelectPerson(e,'SINGLE',setPeople,'');
//}
//function setPeople(siteTag,voList)
//{
//	if(siteTag.getSelectedCount()==0)
//	{
//		Ext.alert('没有选定的记录');
//		return;
//	}
//	
//	if(voList.length==0)
//	{
//		siteTag.setField('peoplesource','');
//	}
//	else
//	{
//		var name = '';
//		var value = '';
//		for(var index=0; index<voList.length; index++) {
//			name += voList[index].name + ',';
//			value += "'" + voList[index].code +"'"+ ',';
//		}
//		siteTag.setField('peoplesource',name.substring(0,name.length-1));
//		siteTag.setField('hidPeople',value.substring(0,value.length-1));
//	}
//}



// 3声明PANEL
var page1 = new PageUnit('page1');

var mainArea = new ListAreaUnit('mainArea');
mainArea.setCm([ {
	header : "类别名称",
	dataIndex : 'name',
	flex:1,
	align : 'center',
	sort : true,
	summaryType : 'sum',
	summaryRenderer : function(value) {
		return '<font color=red size=3>合计</font>'
	}
}, {
	header : "事件数量",
	dataIndex : 'count',
	align : 'center',
	sort : true,
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "已受理",
	dataIndex : '001',
	align : 'center',
	renderer : function(value) {
		return '<font color="green">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "已批转",
	dataIndex : '002',
	align : 'center',
	renderer : function(value) {
		return '<font color="#D02090">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "正在办理",
	dataIndex : '003',
	align : 'center',
	renderer : function(value) {
		return '<font color="#CD950C">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "办理完毕",
	dataIndex : '005',
	align : 'center',
	renderer : function(value) {
		return '<font color="green">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "重新办理",
	dataIndex : '004',
	align : 'center',
	renderer : function(value) {
		return '<font color="#B8860B">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "逾期未办理",
	dataIndex : '006',
	align : 'center',
	renderer : function(value) {
		return '<font color="red">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "逾期办理中",
	dataIndex : '007',
	align : 'center',
	renderer : function(value) {
		return '<font color="#8B5A00">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "逾期办理完毕",
	dataIndex : '008',
	align : 'center',
	renderer : function(value) {
		return '<font color="#9932CC">' + value + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
},{
	header : 'catecode',
	dataIndex : 'catecode',
	hidden : true
}
]);

function　 calculateRecord(value) {
	return '<font color=red size=3>' + value+'</font>'
}

/**
 * 加载事件类型
 */
var callTypeStore = new Ext.data.Store({
	fields : [ 'code', 'name']
})
call_CategoryStatisService.getCallType(function(list) {
	callTypeStore.loadData(list);
});

/**
 * 加载部门名称
 */
//var callOrgzStore = new Ext.data.Store({
//	fields : [ 'code', 'name' ]
//})
//call_CategoryStatisService.getOrgz(function(list) {
//	callOrgzStore.loadData(list);
//});

/**
 * 加载事件渠道
 */
var callChannel = new Ext.data.Store({
	fields : [ 'code', 'name' ]
})
call_CategoryStatisService.getCallChannel(function(list) {
	callChannel.loadData(list);
});	
var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'catecode']
});	
	
mainArea.addToQueryPanel([
{
	fieldLabel : "起始时间",
	xtype : "datefield",
	name : 'startdate',
	format : 'Y-m-d'
}, {
	fieldLabel : "结束时间",
	xtype : "datefield",
	name : 'enddate',
	format : 'Y-m-d'
}
//,{
//	fieldLabel : "部门名称",
//	xtype : "combo",
//	name : 'orgz',
//	emptyText : '--请选择部门名称--',
//	triggerBaseCls :'x-form-searchtrigger'
//}
,{
	fieldLabel : "事件类型",
	xtype : "combo",
	name :'eventype',
	emptyText : '--请选择事件类型--',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	store: callTypeStore
},{
	fieldLabel : "投诉渠道",
	xtype : "combo",
	name : "eventsource",
	emptyText : '--请选择投诉渠道--',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	store: callChannel
}
//,{
//	fieldLabel : "人员选择",
//	xtype : "combo",
//	name : "peoplesource",
//	emptyText : '--请选择人员--'
//}
,{
	xtype : "textfield",
	name : "hidOrgz",
	hidden:true
}
//,{
//	xtype : "textfield",
//	name : "hidPeople",
//	hidden:true
//}

]);
//mainArea.queryFields['orgz'].onTriggerClick=selectCate;
//mainArea.queryFields['peoplesource'].onTriggerClick=selectPeople;
var chart = Ext.create('Ext.chart.Chart', {
	id	: 'cateEvent',
    xtype: 'chart',
    width : 300,
    height : 400,
    animate: true,
    store: store,
    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        field: 'data1',
        showInLegend: true,
        donut: false,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            //calculate percentage.
            var total = 0;
            store.each(function(rec) {
                total += rec.get('data1');
            });
            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
          }
        },
        highlight: {
          segment: {
            margin: 20
          }
        },
        listeners : {// This Doesnt Work :(
			itemmouseup : function(obj) {
				var catecode = obj.storeItem.data['catecode'];
				call_CategoryStatisService.getTeventCategoryData(catecode,
						function(list) {
						cateStatisEventDetailstore.loadData(list.resultList);// 加载事件详细的数据源
						});
			}
		}
    }]
});

var cateStatisEventDetailstore = Ext.create('Ext.data.JsonStore', {
	fields : [ 'name', 'data1' ]
});

var chartdetail = Ext.create('Ext.chart.Chart', {
	id	: 'cateEventDetail',
	xtype : 'chart',
	width : 300,
	animate : true,
	store : cateStatisEventDetailstore,
	shadow : true,
	legend : {
		position : 'right'
	},
	insetPadding : 60,
	theme : 'Base:gradients',
	series : [ {
		type : 'pie',
		field : 'data1',
		showInLegend : true,
		donut : false,
		tips : {
			trackMouse : true,
			width : 140,
			height : 28,
			renderer : function(storeItem, item) {
				// calculate percentage.
				var total = 0;
				cateStatisEventDetailstore.each(function(rec) {
					total += rec.get('data1');
				});
				this.setTitle(storeItem.get('name') + ': '
						+ Math.round(storeItem.get('data1') / total * 100)
						+ '%');
			}
		},
		highlight : {
			segment : {
				margin : 20
			}
		}
	} ]
});


var panel = Ext.create('Ext.Panel', {
	layout : 'column',
	border:false,
	defaults : {
		split : true //是否有分割线
	},
	items : [ {
		columnWidth : .5,
		border:true,
		height : 280,
		layout : 'fit',
		items : chart
	}, {
		columnWidth : .5,
		border:true,
		xtype : "panel",
		height : 280,
		layout : 'fit',
		items : chartdetail
	} ]
});
mainArea.addToSumPanel(panel);
///*******************************************************************************/

// 4加载PANEL
function appInit() {
	page1.init();
	page1.add(mainArea);

	mainArea.refreshFor(mainArea.queryCategoryStatis);

	page1.show(request.getParameter('progParams'));


	mainArea.queryFields["startdate"].setValue(Ext.Date.format(Ext.Date
			.getFirstDateOfMonth(new Date()), 'Y-m-d'));
	mainArea.queryFields["enddate"].setValue(Ext.Date.format(Ext.Date
			.getLastDateOfMonth(new Date()), 'Y-m-d'));

	mainArea.queryCategoryStatis();
	hideLoading();
	
	/**
	 * 加载图表数据源(类别整个统计)
	 */
	var startdate = Ext.Date.format(mainArea.queryFields["startdate"].getValue(),'Y-m-d');
	var enddate = Ext.Date.format(mainArea.queryFields["enddate"].getValue(),'Y-m-d');
	call_CategoryStatisService.getTEventChartData(startdate,enddate,function(list) {
		store.loadData(list.resultList);
		var record = store.getAt(0);
		var catecode = record.get('catecode')//获得部门编码
		call_CategoryStatisService.getTeventCategoryData(catecode, function(list) {
				cateStatisEventDetailstore.loadData(list.resultList);// 加载事件详细的数据源
			});
		
	});
	
	/**
	 * gridpane单击事件
	 */
	mainArea.getGrid().addListener('cellclick', function(grid, td, cellIndex,record,tr,rowIndex,e,obj) {
		var record=grid.getStore().getAt(rowIndex);
		var catecode =record.get("catecode");// 获取部门编码
		 switch (cellIndex) {
			case 1:	
				call_CategoryStatisService.getTeventCategoryData(catecode, function(list) {
					cateStatisEventDetailstore.loadData(list.resultList);// 加载事件详细的数据源
				});	
				return;
				break;
			case 2:
				state='';
				break;
			case 3:
				state='001';
				break;
			case 4:
				state='002';
				break;
			case 5:
				state='003';
				break;
			case 6:
				state='005';
				break;
			case 7:
				state='004';
				break;
			case 8:
				state='006';
				break;
			case 9:
				state='007';
				break;
			case 10:
				state='008';
				break;
			default:
				break;
			}
		 
		 closeTab('CALL100');
		 openTab('CALL100','事件查看','VIEW&catecode='+catecode+'&state='+state);
	})

	panel.setWidth(mainArea.getGrid().getWidth());// 设置图表panel的宽度
	
}

// 5按钮方法
mainArea.queryCategoryStatis = function() {
//	var orgzs = mainArea.queryFields["orgz"].getValue();
	var startdate = Ext.Date.format(mainArea.queryFields["startdate"].getValue(),'Y-m-d');
	var enddate = Ext.Date.format(mainArea.queryFields["enddate"].getValue(),'Y-m-d');
	var orgz = mainArea.queryFields["hidOrgz"].getValue();
	var eventype = mainArea.queryFields["eventype"].getValue();
	var eventsource = mainArea.queryFields["eventsource"].getValue();
//	if(orgzs == null){
//		orgz =null;
//	}
//	alert(startdate +","+enddate+","+orgz+","+eventype+","+eventsource);
	call_CategoryStatisService.queryCategoryStatis(mainArea.getAreaInfo(),startdate,enddate,orgz,eventype,eventsource,
			function(viewData) {
				mainArea.showViewData(viewData);
			});
}
Ext.onReady(appInit);
