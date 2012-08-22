//加载dwr
require('Call_FoundationDataBaseService');
//加载配置文件
loadAreaConfig();
//include('selectPerson');
//选择人员
//function selectPerson(e)
//{
//	showSelectPerson(e,'SINGLE',setPerson,'');
//}
//function setPerson(siteTag,voList)
//{
//	if(siteTag.getSelectedCount()==0)
//	{
//		Ext.alert('没有选定的记录');
//		return;
//	}
//	
//	if(voList.length==0)
//	{
//		siteTag.setField('perosnz','');
//	}
//	else
//	{
//		siteTag.setField('perosnz',voList[0].code);
//	}
//}

//声明panel
var page1 = new PageUnit('page1');
var mainArea = new ListAreaUnit('mainArea');
mainArea.setCm([ {
	header : "状态编码",
	dataIndex : 'code',
	align : 'center',
	width : 120
}, {
	header : "状态名称",
	dataIndex : 'name',
	flex : 1,
	editor : new Ext.form.TextField({
		allowBlank : false
	})
} ])
mainArea.addToQueryPanel([ {
	fieldLabel : "状态编码",
	xtype : "textfield",
	name : 'code',
	rule : "@NAME@ LIKE '%@VALUE@%'"
}, {
	fieldLabel : "状态名称",
	xtype : "textfield",
	name : 'name',
	rule : "@NAME@ LIKE '%@VALUE@%'"
}
//{
//	fieldLabel : "人员名称",
//	xtype : "combo",
//	name : 'perosnz',
//	queryMode : 'local',
//	displayField : 'name',
//	valueField : 'code',
////	store: callPersonzStore,
//	rule : "@NAME@ LIKE '%@VALUE@%'"
//}
]);
//调用选择页方法
//mainArea.queryFields['perosnz'].onTriggerClick=selectPerson;

var newTypeWin = new WindowUnit('newTypeWin');
newTypeWin.setTitle('新增状态')
var detailArea = new DetailAreaUnit('detailArea');
detailArea.setWidth(325);
detailArea.addToFieldSet([  {
	fieldLabel : '状态名称',
	name : 'name',
	xtype : 'textfield',
	allowBlank : false
} ], {
	fieldsPerRow : 1
});
//加载panel
function appInit() {
	page1.init();
	page1.add(mainArea);
	newTypeWin.init();
	newTypeWin.add(detailArea);
	mainArea.refreshFor(mainArea.queryState);
	page1.show(request.getParameter('progParams'));
	mainArea.queryState();
	hideLoading();
}
//按钮
mainArea.queryState = function() {
	Call_FoundationDataBaseService.queryCallState(mainArea.getAreaInfo(), function(
			viewData) {
		mainArea.showViewData(viewData);
	});
}
mainArea.showNewStateWin = function(constParam) {
	newTypeWin.show(constParam);
}

mainArea.opModifyState = function() {
	var list = mainArea.getSelected();

	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}

	Call_FoundationDataBaseService.opModifyCallState(list, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
			mainArea.queryState();
		}
	});
}

detailArea.opAddNewState = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	Call_FoundationDataBaseService.opAddNewCallState(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败,' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryState();
		}
	});
}
detailArea.opAddNewStateAndClose = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	Call_FoundationDataBaseService.opAddNewCallState(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryState();
			newTypeWin.close();
		}
	});
}
mainArea.opDeleteState = function() {
	var list = mainArea.getSelected();

	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}

	if (Ext.confirm('确认删除吗?', function(btn) {
		if (btn == 'yes') {
			Call_FoundationDataBaseService.opDeleteCallState(list, function(viewData) {
				if (!viewData.isSucceed) {
					Ext.alert('删除失败');
				} else {
					mainArea.queryState();
				}
			});
		}
	}))
		;
}

Ext.onReady(appInit);
