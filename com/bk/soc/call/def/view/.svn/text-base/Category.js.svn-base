require('Call_FoundationDataBaseService');
loadAreaConfig();
var page1 = new PageUnit('page1');
var mainArea=new TreeAreaUnit('mainArea');


mainArea.setCm([
{
	header: "类别编码",
	dataIndex: 'code',
	width: 120,
	align:'center'
},
{
	header: "类别名称",
	dataIndex: 'name',
	align:'center',
	width: 300,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
}, 
{
	header: "限制天数",
	dataIndex: 'stintday',
	align:'center',
	width: 100,
	editor: new Ext.form.NumberField(
	{
		step:1,
		minValue:1,
		maxValue:31,
		allowBlank: false
	})
},
{
	header:'备注',
	align:'center',
	dataIndex:'note',
	flex: 1,
	editor:new Ext.form.TextField({
		
	})
},{
	header:'父',
	dataIndex:'supercode',
	hidden:true
},{
	header:'叶',
	dataIndex:'leaf',
	hidden:true
}]);
mainArea.addToQueryPanel([  
{ fieldLabel: "类别编码", xtype: "textfield",name: 'code' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "类别名称", xtype: "textfield",name: 'name',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);
var newCategoryWin = new WindowUnit('newCategoryWin');  // 声明添加部门的window

newCategoryWin.setTitle('新增类别'); // 设置窗口的标题

var detailArea = new DetailAreaUnit('detailArea');　// 声明form 表单
detailArea.setWidth(325);
detailArea.addToFieldSet([
{
	fieldLabel:'类别名称',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},{
	fieldLabel:'限制天数',
	name :'stintday',
	xtype :'numberfield',
	value : 5,
	step:1,
	minValue:1,
	maxValue:31,
	readOnly:false,
	allowBlank:false
}
,{
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
	newCategoryWin.init();
	newCategoryWin.add(detailArea);
	mainArea.refreshFor(mainArea.queryTCategory);
	mainArea.setExpandFunction(mainArea.queryCategorys);//tree data
    page1.show(request.getParameter('progParams'));
    mainArea.queryTCategory("");
    hideLoading();
}
/**
 * 根据树节点值查询相应数据
 */
mainArea.queryTCategory=function(id)
{
	if(id == 'root' || id == null) id ="";
	Call_FoundationDataBaseService.queryTCategory(mainArea.getAreaInfo(),id,function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

/**
 * 显示添加的form
 */
mainArea.openAddWindow = function(constParam) {
	newCategoryWin.show(constParam);
}
/**
 *  查询tree数据
 */
mainArea.queryCategorys = function(id){
    Call_FoundationDataBaseService.queryTCategoryNodes(id,function(viewData)
	{
		mainArea.showTreeData(id,viewData);
	});
}

/**
 * 增加类别
 */
detailArea.opInsert = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.supercode= getAppContext("id");//设置父id
	if(obj.supercode == 'root')obj.supercode = null;
	Call_FoundationDataBaseService.opAddNewTCategory(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
//			mainArea.addNode();
			mainArea.removeAllNode('root');
			mainArea.queryCategorys('root');
			mainArea.queryTCategory(getAppContext("id"));
		}
	});
}
detailArea.opInsertAndClose=function()
{
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.supercode= getAppContext("id");//设置父id
	if(obj.supercode == 'root')obj.supercode = null;
	Call_FoundationDataBaseService.opAddNewTCategory(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.removeAllNode('root');
			mainArea.queryCategorys('root');
			mainArea.queryTCategory(getAppContext("id"));
			newCategoryWin.close();
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
	Call_FoundationDataBaseService.opModifyTCategroys(list, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
			mainArea.queryTCategory(getAppContext("id"));
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
			Call_FoundationDataBaseService.opDeleteTCategroy(list, function(viewData) {
				if (!viewData.isSucceed) {
					Ext.alert(viewData.message);
				} else {
					for(var i=0;i<list.length;i++){
						mainArea.removeNode(list[i].code);
					}
					resetArea();
				}
			});
		}
	}));
}

function resetArea(){
			var id = getAppContext("id");
			if(null == id) {id="root";}
			mainArea.queryTCategory(id);
			//mainArea.queryCategorys("root");
}
Ext.onReady(appInit);