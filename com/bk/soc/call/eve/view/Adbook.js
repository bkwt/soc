//请求DWR
require('call_AdbookService');
//加载页面配置
loadAreaConfig();
//声明PANEL
var page1 = new PageUnit('page1');
var mainArea=new TreeAreaUnit('mainArea');
//var listStore = new Ext.data.Store({
//	fields: ['code','name']
//});

mainArea.setCm([
{
	header: "编码",
	dataIndex: 'code',
	width: 50,
	align:'center',
	sort:true
},
{
	header: "姓名",
	dataIndex: 'name',
	align:'center',
	width: 80,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header:'性别',
	align:'center',
	dataIndex:'sex',
	width:80,
	editor:new Ext.form.ComboBox({
		displayField:'display',  
        valueField:'display',  
		store:new Ext.data.ArrayStore({
			fields:['value','display'],
			data:[['男','男'],['女','女']]
		})
	})
},
{
	header: "年龄",
	dataIndex: 'age',
	align:'center',
	width: 80,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header:'出生日期',
	align:'center',
	dataIndex:'birthday',
	width:120,
	renderer:Ext.util.Format.dateRenderer('Y-m-d'), 
	editor:new Ext.form.TextField({
		
	})
},
{
	header: "电话",
	dataIndex: 'tel',
	align:'center',
	width: 120,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "单位",
	dataIndex: 'orgz',
	align:'center',
	width: 120,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
//{
//	header: "分组",
//	dataIndex: 'listcode',
//	align:'center',
//	width: 120,
//	sort:true,
//	editor: new Ext.form.TextField(
//	{
//		allowBlank: false
//	})
//	renderer : function(value, metadata, record) {
//	var index = listStore.find('code', value);
//	if (index != -1) {
//		return listStore.getAt(index).data.name;
//	}
//	return value;
//	}
//},
{
	header: "邮件",
	dataIndex: 'email',
	align:'center',
	width: 120,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "QQ",
	dataIndex: 'qq',
	align:'center',
	width: 120,
	sort:true,
	editor: new Ext.form.TextField(
	{
		allowBlank: false
	})
},
{
	header: "地址",
	dataIndex: 'ad',
	align:'center',
	width: 240,
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
	width:240,
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
{ fieldLabel: "名称", xtype: "textfield",name: 'name',rule:"@NAME@ LIKE '%@VALUE@%'"},
{ fieldLabel: "分组", xtype: "textfield" ,name: 'listcode',rule:"@NAME@ LIKE '%@VALUE@%'"},
{ fieldLabel: "部门", xtype: "textfield" ,name: 'orgz',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);

var newAdbookWin = new WindowUnit('newAdbookWin');  // 声明添加联系人的window
var newAdlistWin = new WindowUnit('newAdlistWin');

newAdbookWin.setTitle('新增联系人'); // 设置窗口的标题
newAdlistWin.setTitle('新增分组');

var detailArea = new DetailAreaUnit('detailArea');　// 声明form 表单
detailArea.addToFieldSet([
//{
//	fieldLabel : '编码',
//	name : 'code',
//	xtype : 'numberfield',
//	step:1,
//	minValue:1,
//	maxValue:9999,
//	readOnly:false,
//	allowBlank:false
//
//}, 
{
	fieldLabel:'名称',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},
{
	fieldLabel:'性别',
	name:'sex',
	xtype:'combo',
	allowBlank : false,
	valueField: 'value',
    displayField: 'display',
    mode: 'local',
	store:new Ext.data.ArrayStore({
		fields:['value','display'],
		data:[['男','男'],['女','女']]
	}),
	value:'男'
},
{
	fieldLabel:'年龄',
	name:'age',
	xtype:'textfield',
	allowBlank : false
},
{
	fieldLabel:'出生日期',
	name:'birthday',
	xtype:'datefield',
	format:'Y-m-d'
},
{
	fieldLabel:'电话',
	name:'tel',
	xtype:'textfield',
	allowBlank : false
},
{
	fieldLabel:'单位',
	name:'orgz',
	xtype:'textfield',
	allowBlank : false
},
{
	fieldLabel:'邮件',
	name:'email',
	xtype:'textfield',
	allowBlank : true
},
{
	fieldLabel:'QQ',
	name:'qq',
	xtype:'textfield',
	allowBlank : true
},

{
	fieldLabel:'地址',
	name:'ad',
	xtype:'textfield',
	allowBlank : true
},{
	fieldLabel:'备注',
	name:'note',
	xtype:'textfield',
	allowBlank : true
}]);



var detailArea1 = new DetailAreaUnit('detailArea1');　// 声明form 表单
detailArea1.addToFieldSet([
{
	fieldLabel : '编码',
	name : 'code',
	xtype : 'numberfield',
	step:1,
	minValue:1,
	maxValue:9999,
	readOnly:false,
	allowBlank:false

}, {
	fieldLabel:'名称',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},
{
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
	newAdbookWin.init();
	newAdbookWin.add(detailArea);
	
	newAdlistWin.init();
	newAdlistWin.add(detailArea1);
	
	mainArea.refreshFor(mainArea.queryTCallAdbook);
	//mainArea.refreshFor(mainArea.queryAdList);
	
	mainArea.setExpandFunction(mainArea.queryAdbooks);//tree data
    page1.show(request.getParameter('progParams'));
    mainArea.queryTCallAdbook('root');
    hideLoading();
}
/**
 * 根据树节点值查询相应数据
 */
mainArea.queryTCallAdbook=function(id)
{
	call_AdbookService.queryTCallAdbook(mainArea.getAreaInfo(),id,function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

/**
 * 显示添加的form
 */


mainArea.openAddWindow = function(constParam) {
	if(getAppContext("id") ==null){
		Ext.alert('请选择分组');
		return;
	}
	newAdbookWin.show(constParam);
	detailArea.fields['sex'].setValue("女");
	//detailArea.fields['birthday'].setValue(new Date());
}

mainArea.openaddAdlist = function(constParam){
	
	newAdlistWin.show(constParam);
}


/**
 *  查询tree数据
 */

mainArea.queryAdbooks = function(id){
	call_AdbookService.queryList(id,function(viewData)
	{
		mainArea.showTreeData(id,viewData);
	});
//    call_AdbookService.queryTAdlistNodes(id,function(viewData)
//	{
//		mainArea.showTreeData(id,viewData);
//	});
}

/**
 * 增加联系人
 */
detailArea.opInsert = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.listcode=getAppContext("id");//设置父id
	call_AdbookService.opAddNewTAdbook(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryTCallAdbook(getAppContext("id"));
		}
	});
}
detailArea.opInsertAndClose=function()
{
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.listcode=getAppContext("id");//设置父id
	call_AdbookService.opAddNewTAdbook(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryTCallAdbook(getAppContext("id"));
			newAdbookWin.close();
		}
	});

}
/**
 * 增加分组
 */

detailArea1.opListInsert = function() {
	if (!detailArea1.checkFields())
		return;
	var obj = detailArea1.getValueObject();
	
	//obj.supercode=getAppContext("id");//设置父id
	call_AdbookService.newList(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea1.clean();
			//mainArea.queryAdlist(getAppContext("id"));
		}
	});
}
detailArea1.opListInsertAndClose=function()
{
	if (!detailArea1.checkFields())
		return;
	var obj = detailArea1.getValueObject();
	//obj.supercode=getAppContext("id");//设置父id
	call_AdbookService.newList(ob4j, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea1.clean();
			//mainArea.queryAdlist(getAppContext("id"));
			newCallAdlistWin.close();
		}
	});

}

/**
 * 修改联系人
 */
mainArea.opUpdate=function(){
	if(list.size())
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.alert('请勾选记录');
		return;
	}
	call_AdbookService.opModifyTAdbooks(list, function(viewData) {
		alert1(list);
		if (!viewData.isSucceed) {
			Ext.alert('修改失败');
		} else {
			mainArea.queryTCallAdbook(getAppContext("id"));
		}
	});
}
/**
 * 删除联系人
 */
mainArea.opDelete = function() {
	
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.Msg.alert('提示', '请勾选记录');
		return;
	}
	
	if (Ext.MessageBox.confirm('提示', '确认删除吗?', function(btn) {
		if (btn == 'yes') {
			call_AdbookService.opDeleteTAdbooks(list, function(viewData) {
				if (!viewData.isSucceed) {
					alert('删除失败');
				} else {
					mainArea.queryTCallAdbook(getAppContext("id"));
				}
			});
		}
	}));
}

//删除分组
mainArea.opDeleteAdlist = function(){
	
	
	//var count = getAppContext("id");
	//var flag = call_AdbookService.getListCount("id")
//	alert(call_AdbookService.getListCount(getAppContext("id")));
//	var list = mainArea.getSelected();
//	if (list.length == 0) {
//		Ext.Msg.alert('提示', '请选择你要删除的分组');
//		return;
//	}
	
	call_AdbookService.getListCount(getAppContext("id") ,function(b){
		if(b)
		{
			Ext.Msg.alert('提示', '内有联系人，无法删除！');
			return;
		}else{
			if (Ext.MessageBox.confirm('提示', '确认删除吗?', function(btn) {
			if (btn == 'yes') {
				call_AdbookService.deleteAdlist(getAppContext("id"),function(viewData) {
					if (!viewData.isSucceed) {
						alert('删除失败');
					} else {
						mainArea.queryTCallAdbook(getAppContext("id"));
					}
				});
				}
				}));
			}
		});
}
Ext.onReady(appInit);