require('MDM_HumanFrameworkService');
var selectOrgzWin = new WindowUnit('selectOrgzWin');
selectOrgzWin.setTitle('选择部门');
var selectOrgzArea = new SelectTreeAreaUnit('selectOrgzArea');

selectOrgzArea.setCm([ {
	header : "部门编码",
	dataIndex : 'code',
	sort : true,
	width : 150
}, {
	header : "部门名称",
	dataIndex : 'name',
	flex: 1,
	editor : new Ext.form.TextField({
		allowBlank : false
	})
} ]);

selectOrgzArea.addToQueryPanel([ 
{
	fieldLabel : "部门编码",
	xtype : "textfield",
	name : 'code',
	rule : "@NAME@ LIKE '%@VALUE@%'"
},                                
 {
	fieldLabel : "部门名称",
	xtype : "textfield",
	name : 'name',
	rule : "@NAME@ LIKE '%@VALUE@%'"
} ]);

selectOrgzWin.init();
selectOrgzWin.add(selectOrgzArea);
//selectOrgzArea.refreshFor(findOrgzs);

selectOrgzArea.setExpandFunction(findOrgzNodes);
selectOrgzArea.refreshFor(findOrgz);
selectOrgzWin.on('show', function() {
	selectOrgzArea.clean();
	//findOrgzs();
});

function showSelectOrgz(e, selectMode, callback, otherConditions, selected, pks) {
	selectOrgzArea.setSelectEvent(e);
	selectOrgzArea.setCallBack(callback);
	selectOrgzArea.setSelectMode(selectMode);
	selectOrgzArea.setSelected(selected, pks);
	//selectOrgzWin.getEm().setPosition(0, 0);
	if (typeof (otherConditions) == 'string') {
		selectOrgzArea.setOtherConditions(otherConditions);
	} else {
		selectOrgzArea.setOtherConditions(otherConditions.otherConditions);
		selectOrgzArea.setTreeConditions(otherConditions.treeConditions);
	}
	findOrgz('root');
	selectOrgzWin.show();
}

function getOrgzId(id) {
	if (id) {
		setAppContext('orgzId', id);
	} else {
		id = getAppContext('orgzId');
	}
	return id;
}

function findOrgzNodes(id) {
	MDM_HumanFrameworkService.queryOrgNodes(id,function(viewData) {
		selectOrgzArea.showTreeDate(id, viewData);
	});
}

function findOrgz(id) {
	MDM_HumanFrameworkService.queryTOrgz(selectOrgzArea.getAreaInfo(),
			getOrgzId(id), function(
					viewData) {
				selectOrgzArea.showViewData(viewData);
			});
}
