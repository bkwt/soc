//请求DWR
require('Call_FoundationDataBaseService');
//加载页面配置
loadAreaConfig();
//声明PANEL
var page1 = new PageUnit('page1');
var mainArea=new TreeAreaUnit('mainArea');


mainArea.setCm([
{
	header: "编码",
	dataIndex: 'code',
	width: 80,
	align:'center',
	sort:true
},
{
	header: "名称",
	dataIndex: 'name',
	align:'center',
	width: 120,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header:'备注',
	align:'center',
	dataIndex:'note',
	width:120,
	editor:new Ext.form.TextField({
		
	})
},{
	header:'父',
	dataIndex:'supercode',
	width:120,
	hidden:true
},{
	header:'叶',
	dataIndex:'leaf',
	width:120,
	hidden:true
}]);
mainArea.addToQueryPanel([  
{ fieldLabel: "编码", xtype: "textfield",name: 'code' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "名称", xtype: "textfield",name: 'name',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);

var newCallAdlistWin = new WindowUnit('newCallAdlistWin');  // 声明添加分组的window

newCallAdlistWin.setTitle('新增分组'); // 设置窗口的标题

var detailArea = new DetailAreaUnit('detailArea');　// 声明form 表单
detailArea.addToFieldSet([
 {
	fieldLabel:'名称',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},{
	fieldLabel:'备注',
	name:'note',
	xtype:'textfield',
	allowBlank : true
}]);

/**
 * 页面初始化 加载PANEL
 * @returns
 */
function appInit()
{
	setAppContext("id","");
	page1.init();
	page1.add(mainArea);
	newCallAdlistWin.init();
	newCallAdlistWin.add(detailArea);
	mainArea.refreshFor(mainArea.queryTCallAdlist);
	mainArea.setExpandFunction(mainArea.queryCallAdlists);//tree data
    page1.show(request.getParameter('progParams'));
    mainArea.queryTCallAdlist('root');
    hideLoading();
}
/**
 * 根据树节点值查询相应数据
 */
mainArea.queryTCallAdlist=function(id)
{
	Call_FoundationDataBaseService.queryTCallAdlist(mainArea.getAreaInfo(),id,function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

/**
 * 显示添加的form
 */
mainArea.openAddWindow = function(constParam) {
//	if(getAppContext("id") ==null){
//		Ext.alert('请选择分组');
//		return;
//	}
	newCallAdlistWin.show(constParam);
}
/**
 *  查询tree数据
 */
mainArea.queryCallAdlists = function(id){
    Call_FoundationDataBaseService.queryTCallAdlistNodes(id,function(viewData)
	{
		mainArea.showTreeData(id,viewData);
	});
}

/**
 * 增加分组
 */
detailArea.opInsert = function() {
	if (!detailArea.checkFields())
		return;
	
	var obj = detailArea.getValueObject();
	obj.supercode=getAppContext("id");//设置父id
	Call_FoundationDataBaseService.opAddNewTCallAdlist(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			resetArea();
		}
	});
}
detailArea.opInsertAndClose=function()
{
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.supercode=getAppContext("id");//设置父id
	Call_FoundationDataBaseService.opAddNewTCallAdlist(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			resetArea();
			newCallAdlistWin.close();
		}
	});

}
/**
 * 修改分组
 */
mainArea.opUpdate=function(){
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}
	Call_FoundationDataBaseService.opModifyTCallAdlists(list, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
			mainArea.queryTCallAdlist(getAppContext("id"));
		}
	});
}
/**
 * 删除分组
 */
mainArea.opDelete = function() {
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.Msg.alert('提示', '请勾选记录');
		return;
	}
	if (Ext.MessageBox.confirm('提示', '确认删除吗?', function(btn) {
		if (btn == 'yes') {
			Call_FoundationDataBaseService.opDeleteTCallAdlists(list, function(viewData) {
				if (!viewData.isSucceed) {
					alert('删除失败');
				} else {
					resetArea();
				}
			});
		}
	}));
}
function resetArea(){
	mainArea.removeAllNode("root");
	var id = getAppContext("id");
	if(null == id) {id="root";}
	mainArea.queryTCallAdlist(id);
	mainArea.queryCallAdlists("root");
}
Ext.onReady(appInit);