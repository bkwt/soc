require('MDM_HumanFrameworkService');
var selectPersonWin=null;
var selectPersonArea=null;

var orgzStore = new Ext.data.Store({
	fields: ['code','name']
});
MDM_HumanFrameworkService.getTOrgz(function(list){
		orgzStore.loadData(list);
});

var posStore = new Ext.data.Store({
	fields: ['code','name']
});

MDM_HumanFrameworkService.getTPos(function(list) {
		posStore.loadData(list);
});
function showSelectPerson(e,selectMode,callback,otherConditions,selected,pks)
{
	if(selectPersonWin==null)
	{
		selectPersonWin=new WindowUnit('selectPersonWin');
		selectPersonArea=new SelectTreeAreaUnit('selectPersonArea');
		selectPersonArea.setCm([
		{
			header: "人员编码",
			dataIndex: 'code',
			width: 100,
			sort: true,
			editor: null
		},
		{
			header: "姓名",
			dataIndex: 'name',
			width: 100,
			sort: true,
			editor: null
		},
		{
			header: "性别",
			dataIndex: 'sex',
			width: 37,
			editor: null
		},
		{
			header: "部门",
			dataIndex: 'orgzName',
			width: 100,
			sort: true
		},
		{
			header: "岗位",
			dataIndex: 'posName',
			width: 100,
			sort: true
		},{
			header: "电话",
			dataIndex: 'telephone',
			width: 113,
			editor: null
		}]);
selectPersonArea.addToQueryPanel([ 
{
	fieldLabel : "人员编码",
	xtype : "textfield",
	name : 'code',
	rule : "@NAME@ LIKE '%@VALUE@%'"
},                                
 {
	fieldLabel : "姓名",
	xtype : "textfield",
	name : 'name',
	rule : "@NAME@ LIKE '%@VALUE@%'"
},                                
 {
	fieldLabel : "部门",
	xtype : "textfield",
	name : 'name',
	rule : "@NAME@ LIKE '%@VALUE@%'",
	owner: '_t2'
}]);		
		selectPersonArea.setTitle('');
		selectPersonArea.setWidth(710);
		selectPersonWin.setTitle('选择人员');
		
		selectPersonWin.init();
		selectPersonWin.add(selectPersonArea);
	    selectPersonArea.setExpandFunction(findOrgzNode);
		selectPersonArea.refreshFor(findPersonDetails);	
		findPersonDetails("root");
	}
	
	selectPersonArea.setSelectEvent(e);
	selectPersonArea.setCallBack(callback);
	selectPersonArea.setSelectMode(selectMode);
	selectPersonArea.setSelected(selected,pks);
	if(typeof(otherConditions)=='string')
	{
		selectPersonArea.setOtherConditions(otherConditions);
	}
	else
	{
		selectPersonArea.setOtherConditions(otherConditions.otherConditions);
		selectPersonArea.setTreeConditions(otherConditions.treeConditions);
	}	
	selectPersonWin.show();
	findPersonDetails();
}


function findOrgzNode(id)
{
    MDM_HumanFrameworkService.queryOrgzNodes(id,function(viewData){
        selectPersonArea.showTreeDate(id,viewData);
    });
}

function findPersonDetails(id)
{
	if(id == 'root' || id == null)
		id ='01';
	// 判断是否为叶子节点
	MDM_HumanFrameworkService.queryTPersonAreaDataForm(selectPersonArea.getAreaInfo(),id,function(viewData)
	{
		selectPersonArea.showViewData(viewData);
	});
}
