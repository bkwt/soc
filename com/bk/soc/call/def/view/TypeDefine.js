//加载dwr
require('Call_FoundationDataBaseService');
//2加载配置文件
loadAreaConfig();

//声明panel
var page1 = new PageUnit('page1');
var mainArea = new ListAreaUnit('mainArea');
mainArea.setCm([ {
	header : "类型编码",
	dataIndex : 'code',
	width : 120,
	align : 'center',
	editor : null
}, {
	header : "类型名称",
	dataIndex : 'name',
	flex : 1,
	sort : true,
	editor : new Ext.form.TextField({
		allowBlank : false
	})
} ])
mainArea.addToQueryPanel([ {
	fieldLabel : "类型编码",
	xtype : "textfield",
	name : 'code',
	rule : "@NAME@ LIKE '%@VALUE@%'"
}, {
	fieldLabel : "类型名称",
	xtype : "textfield",
	name : 'name',
	rule : "@NAME@ LIKE '%@VALUE@%'"
} ]);

var newTypeWin = new WindowUnit('newTypeWin');
newTypeWin.setTitle('新增类型')
var detailArea = new DetailAreaUnit('detailArea');
detailArea.setWidth(325);
detailArea.addToFieldSet([ {
	fieldLabel : '类型名称',
	name : 'name',
	xtype : 'textfield',
	allowBlank : false
} ]);

//加载panel
function appInit() {
	page1.init();
	page1.add(mainArea);
	newTypeWin.init();
	newTypeWin.add(detailArea);
	mainArea.refreshFor(mainArea.queryType);
	page1.show(request.getParameter('progParams'));
	mainArea.queryType();
	hideLoading();
}
//按钮
mainArea.queryType = function() {
	Call_FoundationDataBaseService.queryCallType(mainArea.getAreaInfo(), function(
			viewData) {
		mainArea.showViewData(viewData);
	});
}
mainArea.showNewTypeWin = function(constParam) {
	newTypeWin.show(constParam);
}

mainArea.opModifyType = function() {
	var list = mainArea.getSelected();

	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}

	Call_FoundationDataBaseService.opModifyCallType(list, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
			mainArea.queryType();
		}
	});
}

detailArea.opAddNewType = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	Call_FoundationDataBaseService.opAddNewCallType(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryType();
		}
	});
}
detailArea.opAddNewTypeAndClose = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	Call_FoundationDataBaseService.opAddNewCallType(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryType();
			newTypeWin.close();
		}
	});

}
mainArea.opDeleteType = function() {
	var list = mainArea.getSelected();

	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}

	if (Ext.confirm('确认删除吗?', function(btn) {
		if (btn == 'yes') {
			Call_FoundationDataBaseService.opDeleteCallType(list, function(viewData) {
				if (!viewData.isSucceed) {
					Ext.alert('删除失败');
				} else {
					mainArea.queryType();
				}
			});
		}
	}))
		;
}

Ext.onReady(appInit);
