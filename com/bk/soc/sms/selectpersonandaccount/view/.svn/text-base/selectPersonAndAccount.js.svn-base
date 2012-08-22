require('MDM_SelectPersonAndAccount');
var selectPersonAndAccountWin = new WindowUnit('selectPersonAndAccountWin');
selectPersonAndAccountWin.setTitle('选择关系人员');

var selectPersonAndAccountWinArea = new SelectAreaUnit('selectPersonAndAccountWinArea');

selectPersonAndAccountWinArea.setCm([
{
	header: "hid",
	dataIndex: 'hid',
	hidden:true,
	editor: null
},
{
	header: "代码",
	dataIndex: 'code',
	width: 100,
	sort: true,
	editor: null
},
{
	header: "名称",
	dataIndex: 'name',
	width: 150,
	editor: null
},
{
	header: "联系方式",
	dataIndex: 'telephone',
	width: 150,
	sort: true,
	editor: null
}]);
selectPersonAndAccountWinArea.addToQueryPanel([
{xtype:'textfield',name:'code',fieldLabel:'代码'},
{xtype:'textfield',name:'name',fieldLabel:'名称'},
{xtype:'textfield',name:'telephone',fieldLabel:'联系方式'}
]);

selectPersonAndAccountWin.setTitle('关系人员');

function showSelectPersonAndAccount(e,selectMode,callback,otherConditions,selected,pks){
    selectPersonAndAccountWinArea.setSelectEvent(e);
    selectPersonAndAccountWinArea.setCallBack(callback);
    selectPersonAndAccountWinArea.setSelectMode(selectMode);
    selectPersonAndAccountWinArea.setOtherConditions(otherConditions);
    selectPersonAndAccountWinArea.setSelected(selected,pks);
    selectPersonAndAccountWin.show();
}

selectPersonAndAccountWinArea.setWidth(446);

Ext.onReady(function(){
	selectPersonAndAccountWin.init();
    selectPersonAndAccountWin.add(selectPersonAndAccountWinArea);
    selectPersonAndAccountWinArea.refreshFor(findPersonAndAccounts);
    selectPersonAndAccountWin.on('show',function(){
    selectPersonAndAccountWinArea.clean();
    findPersonAndAccounts();
    });
});
function findPersonAndAccounts(){
    MDM_SelectPersonAndAccount.findPersonAndAccount(selectPersonAndAccountWinArea.getAreaInfo(),selectPersonAndAccountWinArea.getOtherConditions(),function(viewData){
    selectPersonAndAccountWinArea.showViewData(viewData); 
    });
}
