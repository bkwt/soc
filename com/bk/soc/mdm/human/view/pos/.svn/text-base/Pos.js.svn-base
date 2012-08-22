require('MDM_HumanFrameworkService');
loadAreaConfig();
var page1 = new PageUnit('page1');
var mainArea=new TreeAreaUnit('mainArea');


mainArea.setCm([
{
	header: "岗位编码",
	dataIndex: 'code',
	width: 120,
	align:'center'
},
{
	header: "岗位名称",
	dataIndex: 'name',
	align:'center',
	width: 320,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},{
	header:'备注',
	align:'center',
	dataIndex:'note',
	flex:1,
	editor:new Ext.form.TextField({
		
	})
},{
	header:'suppercode',
	align:'center',
	dataIndex:'orgzCode',
	width:120,
	hidden:true
}]);
mainArea.addToQueryPanel([  
{ fieldLabel: "岗位编码", xtype: "textfield",name: 'code' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "岗位名称", xtype: "textfield",name: 'name',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);

var newOrgzWin = new WindowUnit('newOrgzWin');  // 声明添加岗位的window

newOrgzWin.setTitle('新增岗位'); // 设置窗口的标题

var detailArea = new DetailAreaUnit('detailArea');　// 声明form 表单
detailArea.setWidth(325);
detailArea.addToFieldSet([  {
	fieldLabel:'岗位名称',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},{
	fieldLabel : '备注',
	name : 'note',
	xtype : 'textfield'
	}],{fieldsPerRow:1});

/**
 * 页面初始化
 * @returns
 */
function appInit()
{
	
	page1.init();
	page1.add(mainArea);
	newOrgzWin.init();
	newOrgzWin.add(detailArea);
	mainArea.refreshFor(mainArea.queryTPosAreaData);//树节点点击查询
	mainArea.setExpandFunction(mainArea.queryOrgzs);//tree data
//    page1.show(request.getParameter('progParams'));
	page1.show("EDIT");
    mainArea.queryTPosAreaData('root');
    hideLoading();
}
/**
 * 根据树节点值查询相应数据
 */
mainArea.queryTPosAreaData=function(id)
{
	if(id == 'root' || id == null) id ="";
	MDM_HumanFrameworkService.queryTPosAreaData(mainArea.getAreaInfo(),id,function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

/**
 * 显示添加的form
 */
mainArea.openAddWindow = function(constParam) {
	if(getAppContext("id") ==null){
		Ext.alert('请选择部门');
		return;
	}
	var leaf = mainArea.getTree().getSelectionModel().getSelection()[0].data.leaf;
	if(leaf == true){
		Ext.alert('请选择部门');
		return;
	}
	newOrgzWin.show(constParam);
}
/**
 *  查询tree数据
 */
mainArea.queryOrgzs = function(id){
    MDM_HumanFrameworkService.queryOrgzNodes(id,function(viewData)
	{
    	mainArea.showTreeData(id,viewData);
	});
}

/**
 * 增加岗位
 */
detailArea.opInsert = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.orgzCode=getAppContext("id");//设置父id
	MDM_HumanFrameworkService.opAddNewTPos(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
//			resetArea();
			mainArea.removeAllNode('root');
			mainArea.queryOrgzs('root');
			mainArea.queryTPosAreaData(getAppContext("id"));
		}
	});
}
detailArea.opInsertAndClose=function()
{
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.orgzCode=getAppContext("id");//设置父id
	MDM_HumanFrameworkService.opAddNewTPos(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
//			mainArea.queryTPosAreaData(getAppContext("id"));
			mainArea.removeAllNode('root');
			mainArea.queryOrgzs('root');
			mainArea.queryTPosAreaData(getAppContext("id"));
			newOrgzWin.close();
			
		}
	});

}
/**
 * 修改岗位
 */
mainArea.opUpdate=function(){
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}
	MDM_HumanFrameworkService.opModifyTPos(list, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
			mainArea.queryTPosAreaData(getAppContext("id"));
		}
	});
}
/**
 * 删除岗位
 */
mainArea.opDelete = function() {
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.alert('提示', '请勾选记录');
		return;
	}
	if (Ext.MessageBox.confirm('提示', '确认删除吗?', function(btn) {
		if (btn == 'yes') {
			MDM_HumanFrameworkService.opDeleteTPos(list, function(viewData) {
				if (!viewData.isSucceed) {
					Ext.alert('删除失败');
				} else {
					resetArea();
				}
			});
		}
	}));
}
function resetArea(){
	var id = getAppContext("id");
	if(null == id) {id="root";}
	mainArea.queryTPosAreaData(id);//重新加载列表区域
}	
Ext.onReady(appInit);