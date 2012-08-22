//加载dwr
require('call_callEventService');
/**************类别选择页***************/
include('SelectCategory');
//选择部门
function selectCate(e)


{
	showSelectCate(e,'SINGLE',setCate,'');
}
function setCate(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	
	if(voList.length==0)
	{
		siteTag.setField('orgz','');
	}
	else
	{
		var name = '';
		var value = '';
		for(var index=0; index<voList.length; index++) {
			name += voList[index].name + ',';
			value += "'" + voList[index].code +"'"+ ',';
		}
		siteTag.setField('callCategory',name.substring(0,name.length-1));
		siteTag.setField('hidcallCategory',value.substring(0,value.length-1));
	}
}

/*************选择页end******************/
// 加载配置文件
loadAreaConfig();
// 声明panel
var page1 = new PageUnit('page1');
var mainArea = new ListAreaUnit('mainArea');
mainArea.setCm([ {
	header : "部门名称",
	dataIndex : 'name',
	flex : 1,
	align : 'center',
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
	renderer : function(a, b, c) {
		return '<font color="green">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "已批转",
	dataIndex : '002',
	align : 'center',
	renderer : function(a, b, c) {
		return '<font color="#D02090">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "正在办理",
	dataIndex : '003',
	align : 'center',
	renderer : function(a, b, c) {
		return '<font color="#CD950C">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "办理完毕",
	dataIndex : '005',
	align : 'center',
	renderer : function(a, b, c) {
		return '<font color="green">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
},{
	header : "重新办理",
	dataIndex : '004',
	align : 'center',
	renderer : function(a, b, c) {
		return '<font color="#B8860B">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
},  {
	header : "逾期未办理",
	dataIndex : '006',
	align : 'center',
	renderer : function(a, b, c) {
		return '<font color="red">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "逾期办理中",
	dataIndex : '007',
	align : 'center',
	renderer : function(a, b, c) {
		return '<font color="#8B5A00">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : "逾期办理完毕",
	dataIndex : '008',
	align : 'center',
	renderer : function(a, b, c) {
		return '<font color="#9932CC">' + a + '</font>'
	},
	summaryType : 'sum',
	summaryRenderer :calculateRecord
}, {
	header : 'orgcode',
	dataIndex : 'orgCode',
	hidden : true
}])

/**
 * 事件类型store
 */

var callTypeStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
});
call_callEventService.getTCallType(function(list) {

	callTypeStore.loadData(list);
});

/**
 * 事件类别store
 */
var callCategoryStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
})
call_callEventService.getTCallCategory(function(list) {
	callCategoryStore.loadData(list);
});

/**
 * 投诉渠道store
 */
var callChannelStore = new Ext.data.Store({
	fields : [ 'code', 'name' ]
})
call_callEventService.getTChannel(function(list) {
	callChannelStore.loadData(list);
});

mainArea.addToQueryPanel([ {
	fieldLabel : "开始时间",
	xtype : "datefield",
	width : 80,
	format : 'Y-m-d',
	name:'starttime'

}, {
	fieldLabel : "结束时间",
	xtype : "datefield",
	name : 'endtime',
	format : 'Y-m-d'
}, {
	fieldLabel : "事件类型",
	xtype : "combo",
	name : 'calltype',
	valueField : 'code',
	queryMode : 'local',
	displayField : 'name',
	emptyText: '--请选事件类型--',
	store : callTypeStore
}, {
	fieldLabel : '事件来源',
	xtype : 'combo',
	name : 'callsource',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	emptyText: '--请选事件来源--',
	store : callChannelStore
}, {
	fieldLabel : "事件类别",
	xtype : "combo",
	name : 'callCategory',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	emptyText: '--请选事件类别--',
	store:callCategoryStore
} ]);
//mainArea.queryFields['callCategory'].onTriggerClick=selectCate;
/**
 * 统计所有部门的事件store
 */
var orgzEventstore = Ext.create('Ext.data.JsonStore', {
	fields : [ 'name', 'data1', 'orgzCode' ]
});
/**
 * 统计单个部门的事件详细store
 */
var orgzEventDetailstore = Ext.create('Ext.data.JsonStore', {
	fields : [ 'name', 'data1' ]
});
var chart = Ext.create('Ext.chart.Chart', {
	xtype : 'chart',
	//id : 'orgzEvent',
	//animate : true,
	width : 300,
	store : orgzEventstore,
	//shadow : true,
	insetPadding : 60,
	//theme : 'Base:gradients',
	series : [ {
		type : 'pie',
		field : 'data1',
		 axis: 'left',
		//showInLegend : true,
		//donut : false,
		tips : {
			trackMouse : true,
			width : 140,
			height : 28,
			renderer : function(storeItem, item) {
				var total = 0;
				orgzEventstore.each(function(rec) {
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
		},
		listeners : {// This Doesnt Work :(
			'itemmouseup' : function(obj) {
				var orgCode = obj.storeItem.data['orgzCode'];
				var starttime=Ext.Date.format(mainArea.queryFields["starttime"].getValue(),'Y-m-d');// 开始时间
				var endtime=Ext.Date.format(mainArea.queryFields["endtime"].getValue(),'Y-m-d');// 结束时间
				call_callEventService.getTeventOrgzData(orgCode,starttime,endtime,function(list) {
					   orgzEventDetailstore.loadData(list);// 加载事件详细的数据源
				});
			}
		}
	} ]
});
var chartdetail = Ext.create('Ext.chart.Chart', {
	xtype : 'chart',
	width : 300,
	id : 'orgzEventDetail',
	animate : true,
	store : orgzEventDetailstore,
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
				var total = 0;
				orgzEventDetailstore.each(function(rec) {
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
		split : true// 是否有分割线
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

/**
 * 以每个月统计图表的数据显示
 */
var chartMonthDeatilStore = Ext.create('Ext.data.JsonStore', {
	fields : [ 'name', 'data1','data2' ]
});

var chartMonthDeatil =Ext.create('Ext.chart.Chart', {
    xtype: 'chart',
    animate: false,
    store: chartMonthDeatilStore,
    insetPadding: 30,
    gradients: [{
      angle: 90,
      id: 'bar-gradient',
      stops: {
          0: {
              color: '#99BBE8'
          },
          70: {
              color: '#77AECE'
          },
          100: {
              color: '#77AECE'
          }
      }
    }],
    axes: [{
        type: 'Numeric',
        minimum: 0,
        maximum: 100,
        position: 'left',
        fields: ['data1'],
        title: false,
        grid: true,
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0'),
            font: '10px Arial'
        }
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: false,
        grid: true,
        label: {
            font: '11px Arial',
            renderer: function(name) {
                return name;
            }
        }
    }],
    series: [{
        type: 'column',
        axis: 'left',
        xField: 'name',
        yField: 'data1',
        style: {
            fill: 'url(#bar-gradient)',
            'stroke-width': 3
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0,
            fill: '#38B8BF',
            stroke: '#38B8BF'
        }
    }, {
        type: 'line',
        axis: 'left',
        xField: 'name',
        yField: 'data2',
        tips: {
            trackMouse: true,
            width: 110,
            height: 25,
            renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('name')+"号共 :"+storeItem.get('data2') + ' 条记录 ');
            }
        },
        style: {
            fill: '#18428E',
            stroke: '#18428E',
            'stroke-width': 3
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0,
            fill: '#18428E',
            stroke: '#18428E'
        }
    }]
});


/**
 * 图表月统计的windows
 */
var showChartWin=Ext.create('Ext.Window', {
    width: 950,
    height: 530,
    closable: true,
    closeAction: 'hide',
    shadow: true,
    maximizable: true,
    bodyStyle:"background-color:#fff",
    title: '显示本月趋势',
    layout: 'fit',
   items: chartMonthDeatil
}); 
/*******************************************************************************
 * 页面初始化
 */
function appInit() {
	page1.init();
	page1.add(mainArea);
	mainArea.refreshFor(mainArea.queryType);
	page1.show(request.getParameter('progParams'));
	mainArea.queryFields["starttime"].setValue(Ext.Date.format(Ext.Date.getFirstDateOfMonth(new Date()),'Y-m-d'));
	mainArea.queryFields["endtime"].setValue(Ext.Date.format(Ext.Date.getLastDateOfMonth(new Date()),'Y-m-d'));
	mainArea.queryType();
	hideLoading();
	 mainArea.getGrid().getStore().getGroups("name");
	mainArea.getGrid().getStore().sort('count', 'DESC');
	var starttime=Ext.Date.format(mainArea.queryFields["starttime"].getValue(),'Y-m-d');// 开始时间
	var endtime=Ext.Date.format(mainArea.queryFields["endtime"].getValue(),'Y-m-d');// 结束时间
	mainArea.getGrid().addListener('cellclick', function(grid, td, cellIndex,record,tr,rowIndex,e,obj) {// gridpane单击事件
		
    	var record = grid.getStore().getAt(rowIndex);   //Get the Record
	    var orgzCode=record.get("orgCode");
	    var state="";
	    switch (cellIndex) {
		case 1://当在部门名称单元格单击时加载图表详细数据
			var starttime=Ext.Date.format(mainArea.queryFields["starttime"].getValue(),'Y-m-d');// 开始时间
			var endtime=Ext.Date.format(mainArea.queryFields["endtime"].getValue(),'Y-m-d');// 结束时间
			call_callEventService.getTeventOrgzData(orgzCode,starttime,endtime,function(list) {
				   orgzEventDetailstore.loadData(list);// 加载事件详细的数据源
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
	    openTab('CALL100','事件查看','VIEW&orgzCode='+orgzCode+'&state='+state);
	})
	panel.setWidth(mainArea.getGrid().getWidth());// 设置图表panel的宽度
	/**
	 * 获取事件表图表数据
	 */
	call_callEventService.getTEventChartData(starttime,endtime,function(list) {
		orgzEventstore.loadData(list.resultList);
		orgzEventstore.sort('data1', 'DESC');
		var record = orgzEventstore.getAt(0);
		if(record==null){
			return;
		}
		var orgCode = record.get('orgzCode')// 获得部门编码
		call_callEventService.getTeventOrgzData(orgCode,starttime,endtime, function(list) {
			orgzEventDetailstore.loadData(list);// 加载事件详细的数据源
		});
	});
	
	/**
	 * 查询一个月的统计数据
	 */
	call_callEventService.getChartMonthDeatil(starttime,endtime,function(list) {
		chartMonthDeatilStore.loadData(list.resultList);// 加载每月的数据
	});
	
}
/**
 * 计算总数
 */
function　 calculateRecord(value) {
	return '<font color=red size=3>' + value+'</font>'
}
// 查询
mainArea.queryType = function() {
	var obj={};
	var starttime=Ext.Date.format(mainArea.queryFields["starttime"].getValue(),'Y-m-d');// 开始时间
	var endtime=Ext.Date.format(mainArea.queryFields["endtime"].getValue(),'Y-m-d');// 结束时间
	obj.calltype=mainArea.queryFields["calltype"].getValue();// 事件类型
	obj.callsource=mainArea.queryFields["callsource"].getValue();// 事件来源
	obj.callcategorylarge=mainArea.queryFields["callCategory"].getValue();// 事件类别
	call_callEventService.queryCallEvent(starttime,endtime,obj, function(viewData) {
		mainArea.showViewData(viewData);
	});
}
mainArea.showChartDetailWin= function()
{
	showChartWin.show();
	
}

Ext.onReady(appInit);
