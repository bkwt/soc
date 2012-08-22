require('SMS_SelectAddrList');

var selectAddrListWin = null;
var selectAddrListArea= null;
var groupStore = new Ext.data.SimpleStore({
	fields: ['CH']
});
function putInGroups(conditions){
    SMS_SelectAddrList.getGroups(conditions,function(list){
        if(list)
        {
        list.push(['未分组']);
        groupStore.loadData(list);
        }
    });
}
var typeConditions = "_t1.groupType = 'true'";
function showSelectAddrList(e,selectMode,callback,otherConditions,selected,pks)
{
	if(selectAddrListWin==null)
	{
		var typeStore = new Ext.data.SimpleStore({
		fields: ['CH','EN'],
		data : [['个人通讯录','true'],['公共通讯录','false']]
		});
		selectAddrListWin = new WindowUnit('selectAddrListWin');
	    selectAddrListWin.setTitle('通讯录');
		selectAddrListArea=new SelectAreaUnit('selectAddrListArea');
		selectAddrListWin.setTitle('选择联系人');
		selectAddrListArea.setCm([
		{
			header: '姓名',
			dataIndex: 'name',
			width: 80,
			sort: true,
			editor: null
		},
		{
			header: '联系方式',
			dataIndex: 'mobileNo',
			width: 120,
			sort: true,
			editor: null
		},
		{
			header: '性别',
			dataIndex: 'sex',
			width: 36,
			editor: null
		},
		{
			header: '分组名称',
			dataIndex: 'groupName',
			width: 80,
			sort: true,
			editor: null
		},
		{
			header: '单位',
			dataIndex: 'deptCode',
			width: 80,
			sort: true,
			editor: null
		},
		{
			header: '职位',
			dataIndex: 'posCode',
			width: 80,
			editor: null
		},
		{
			header: '其他联系方式',
			dataIndex: 'contactInfo',
			width: 100,
			editor: null
		},
		{
			header: '备注',
			dataIndex: 'mark',
			width: 80,
			editor: null
		}]);
		selectAddrListArea.addToQueryPanel([
		{xtype:'textfield',name:'name',fieldLabel:'姓名',rule:"@NAME@ LIKE '@VALUE@%'"},
		{xtype:'textfield',name:'mobileNo',fieldLabel:'联系方式'},
		{xtype:'combo',name:'addrType',store:typeStore,valueField:'EN',displayField:'CH',fieldLabel:'类别'},
		{xtype:'combo',name:'groupName',store:groupStore,valueField:'CH',displayField:'CH',fieldLabel:'分组'}
		]);
		
		selectAddrListArea.queryFields['addrType'].on('select',function(_combo,_record,_index){
			var gName = _combo.getValue(); 
		        selectAddrListArea.queryFields['groupName'].setValue('');
		        typeConditions = "_t1.groupType = '"+gName+"'";
		        putInGroups(typeConditions);
		    });
		    
		selectAddrListWin.init();
	    selectAddrListWin.add(selectAddrListArea);
	    selectAddrListArea.refreshFor(findAddrLists);
	    selectAddrListWin.on('show',function()
	    {
		    selectAddrListArea.clean();
		    selectAddrListArea.queryFields['addrType'].setValue('true');
		    findAddrLists();
	    });
	}
    selectAddrListArea.setSelectEvent(e);
    selectAddrListArea.setCallBack(callback);
    selectAddrListArea.setSelectMode(selectMode);
    selectAddrListArea.setOtherConditions(otherConditions);
    selectAddrListArea.setSelected(selected,pks);
    selectAddrListWin.show();
}
function findAddrLists(){
    putInGroups(typeConditions);
    SMS_SelectAddrList.findAddrList(selectAddrListArea.getAreaInfo(),selectAddrListArea.getOtherConditions(),function(viewData){
    selectAddrListArea.showViewData(viewData);
    });
}
