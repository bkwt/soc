require('MDM_HumanFrameworkService');
loadAreaConfig();
var page1 = new PageUnit('page1');
var mainArea=new TreeAreaUnit('mainArea');


mainArea.setCm([
{
	header: "部门编码",
	dataIndex: 'code',
	width:190,
	align:'center'
},
{
	header: "部门名称",
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
	header:'父',
	dataIndex:'superCode',
	width:120,
	hidden:true
},{
	header:'叶',
	dataIndex:'leaf',
	width:120,
	hidden:true
}]);
mainArea.addToQueryPanel([  
{ fieldLabel: "部门编码", xtype: "textfield",name: 'code' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "部门名称", xtype: "textfield",name: 'name',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);

var newOrgzWin = new WindowUnit('newOrgzWin');  // 声明添加部门的window

newOrgzWin.setTitle('新增部门'); // 设置窗口的标题

var detailArea = new DetailAreaUnit('detailArea');　// 声明form 表单
detailArea.setWidth(325);
detailArea.addToFieldSet([{
	fieldLabel:'部门名称',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},{
	fieldLabel:'备注',
	name:'note',
	xtype:'textfield'
}],{fieldsPerRow:1});

/**
 * 页面初始化
 * @returns
 */
function appInit()
{
	setAppContext("id","");
	page1.init();
	page1.add(mainArea);
	newOrgzWin.init();
	newOrgzWin.add(detailArea);
	mainArea.refreshFor(mainArea.queryTOrgz);
	mainArea.setExpandFunction(mainArea.queryOrgzs);//tree data
    page1.show(request.getParameter('progParams'));
    mainArea.queryTOrgz('root');
    hideLoading();
}
/**
 * 根据树节点值查询相应数据
 */
mainArea.queryTOrgz=function(id)
{
	if(id == 'root' || id == null) id ="";
	MDM_HumanFrameworkService.queryTOrgz(mainArea.getAreaInfo(),id,function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

/**
 * 显示添加的form
 */
mainArea.openAddWindow = function(constParam) {
	mainArea.addNode('010101',{id:1,text:2,leaf:false});
	return;
	newOrgzWin.show(constParam);
}
/**
 *  查询tree数据
 */
mainArea.queryOrgzs = function(id){
    MDM_HumanFrameworkService.queryOrgNodes(id,function(viewData)
	{
    	//mainArea.getTree().getStore().
		mainArea.showTreeData(id,viewData);
	});
}

/**
 * 增加部门
 */
detailArea.opInsert = function() {
	
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.superCode=getAppContext("id");//设置父id
	if(obj.superCode == 'root')obj.superCode = null;
	MDM_HumanFrameworkService.opAddNewTOrgz(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.removeAllNode('root');
			mainArea.queryOrgzs('root');
			mainArea.queryTOrgz(getAppContext("id"));
		}
	});
}
detailArea.opInsertAndClose=function()
{
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.superCode= getAppContext("id");//设置父id
	if(obj.superCode == 'root')obj.superCode = null;
	MDM_HumanFrameworkService.opAddNewTOrgz(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.removeAllNode('root');
			mainArea.queryOrgzs('root');
			mainArea.queryTOrgz(getAppContext("id"));
			newOrgzWin.close();//关闭弹出窗口
		}
	});


}
/**
 * 修改部门
 */
mainArea.opUpdate=function(){
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}
	MDM_HumanFrameworkService.opModifyTOrgzs(list, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
			mainArea.queryTOrgz(getAppContext("id"));
		}
	});
}
/**
 * 删除部门
 */
mainArea.opDelete = function() {
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.Msg.alert('提示', '请勾选记录');
		return;
	}
	if (Ext.MessageBox.confirm('提示', '确认删除吗?', function(btn) {
		if (btn == 'yes') {
			MDM_HumanFrameworkService.opDeleteTOrgzs(list, function(viewData) {
				if (!viewData.isSucceed) {
					Ext.alert(viewData.message);
				} else {
					for(var i=0;i<list.length;i++){
						mainArea.removeNode(list[i].code);
					}
					resetMainArea();
				}
			});
		}
	}));
}

function resetMainArea(){
	var id = getAppContext("id");
	if(null == id) {id="root";}
	mainArea.queryTOrgz(id);//重新加载列表区域
}


Ext.onReady(appInit);