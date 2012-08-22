require('call_KbmService');
loadAreaConfig();
var page1 = new PageUnit('page1');
var mainArea=new TreeAreaUnit('mainArea');

var iststroe = new Ext.data.Store({
	fields : [ 'code', 'name' ]
});
call_KbmService.getIsTree({
	callback : function(list) {
		var obj = {};
		obj.code = 'root';
		obj.name = '根目录';
		list.push(obj);
		iststroe.loadData(list);
	},
	async : false
});
mainArea.setCm([
{
	header: "知识主题",
	dataIndex: 'name',
	align:'center',
	width: 400,
	sort:true,
	renderer: function(a,b,c){
		var v = mainArea.queryFields['name'].getValue();
		return StrUtil.replaceAll(a,v,'<font color="red">' +v+'</font>' );
	}
},
{
	header: "所属部门",
	dataIndex: 'orgz',
	align:'center',
	width: 100,
	sort:true
},
{
	header: "所属类别",
	dataIndex: 'category',
	align:'center',
	width: 100,
	sort:true
},
{
	header: "发布人",
	dataIndex: 'personcode',
	align:'center',
	width: 120,
	sort:true
},{
	header: "发布时间",
	dataIndex: 'publishtime',
	align:'center',
	width: 100,
	sort:true,
	flex:1,
	renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
},
{
	header:'content',
	dataIndex:'content',
	hidden:true,
	renderer:function(a,b,c){
		
	}
},
{
	header:'code',
	dataIndex:'code',
	width:120,
	hidden:true
},{
	header:'supercode',
	dataIndex:'supercode',
	width:120,
	hidden:true
},{
	header:'leaf',
	dataIndex:'leaf',
	width:120,
	hidden:true
},{
	header:'istree',
	dataIndex:'istree',
	width:120,
	hidden:true
},{
	header:'seachcode',
	dataIndex:'seachcode',
	width:120,
	hidden:true
},{
	header:'keyword',
	dataIndex:'keyword',
	width:120,
	hidden:true
}
,{
	header:'isprivate',
	dataIndex:'isprivate',
	width:120,
	hidden:true
}]);
mainArea.addToQueryPanel([  
{ fieldLabel: "知识主题", xtype: "textfield",name: 'name' ,rule:"@NAME@ LIKE '%@VALUE@%'"},  
{ fieldLabel: "关键字", xtype: "textfield",name: 'keyword',rule:"@NAME@ LIKE '%@VALUE@%'"},
{ fieldLabel: "检索码", xtype: "textfield" ,name: 'seachcode',rule:"@NAME@ LIKE '%@VALUE@%'"}
]);


var newKbmWin = new WindowUnit('newKbmWin');  // 声明添加知识的window
//新增内容
var detailArea = new DetailAreaUnit('detailArea');　// 声明form 表单
detailArea.addToFieldSet([
{
	fieldLabel:'知识主题',
	name:'name',
	xtype:'textfield',
	rowspan:2,
	allowBlank : false
},
{
	fieldLabel:'所属类别',
	name:'category',
	xtype:'combo',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	store : iststroe
},
{
	name:'supercode',
	xtype:'textfield',
	hidden:true,
	rowspan:2
},
{
	name:'a',
	xtype:'label',
	hidden:false
},
{
	fieldLabel:'关键字',
	name:'keyword',
	xtype:'textfield'
},
{
	fieldLabel:'检索码',
	name:'seachcode',
	xtype:'textfield'
},
{
	fieldLabel:'图片资料',
	name:'image',
	xtype:'textfield'
},
{
	fieldLabel:'知识共享',
	name:'isprivate',
	xtype:'checkbox',
	checked :true
},
{
	fieldLabel:'知识内容',
	xtype : 'htmleditor',
	name : 'content',
	allowBlank : false,
	height:250,
	rowspan:4
},{
	name:'code',
	xtype:'textfield',
	hidden :true
},{
	name:'hid',
	xtype:'textfield',
	hidden :true
},{
	name:'leaf',
	xtype:'textfield',
	value:'true',
	hidden :true
},{
	name:'istree',
	xtype:'textfield',
	hidden :true
},{
	name:'publishtime',
	xtype:'textfield',
	hidden :true
}],{fieldsPerRow:4});

var newKbmTreeWin = new WindowUnit('newKbmTreeWin');  // 声明添加目录的窗体
var detailAreaTree = new DetailAreaUnit('detailAreaTree');　// 声明form 表单
detailAreaTree.setWidth(300);
detailAreaTree.addToFieldSet([
{
	fieldLabel:'当前目录',
	name:'superName',
	xtype:'combo',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	store : iststroe
},
{
	fieldLabel:'名称',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},
{
	name:'supercode',
	xtype:'textfield',
	hidden : true
}
],{fieldsPerRow:1});
/**
 * 页面初始化
 * @returns
 */
function appInit()
{
	setAppContext("id","");
	page1.init();
	page1.add(mainArea);
	newKbmWin.init();
	newKbmWin.add(detailArea);
	newKbmTreeWin.init();
	newKbmTreeWin.add(detailAreaTree);
	mainArea.refreshFor(mainArea.queryTPoses);
	mainArea.setExpandFunction(mainArea.queryKbms);//tree data
    page1.show(request.getParameter('progParams'));
    mainArea.queryTPoses('root');
    hideLoading();
}
/**
 * 根据树节点值查询相应数据
 */
mainArea.queryTPoses=function(id)
{
	if(id == 'root' || id == null) id ='';
	call_KbmService.queryTPoses(mainArea.getAreaInfo(),id,function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}
/**
 *  查询tree数据
 */
mainArea.queryKbms = function(id){
    call_KbmService.queryTKbmNodes(id,function(viewData)
	{
		mainArea.showTreeData(id,viewData);
	});
}
//显示添加目录的form
mainArea.openAddTreeWindow = function(constParam) {
		newKbmTreeWin.getEm().setTitle("新增目录");
		newKbmTreeWin.show(constParam);
		if(getTreeAttribute('leaf') == false){
			detailAreaTree.fields['superName'].setValue(getTreeAttribute('selectid'));
			detailAreaTree.fields['supercode'].setValue(getTreeAttribute('selectid'));
		}else{
			detailAreaTree.fields['superName'].setValue(getTreeAttribute('parentid'));
			detailAreaTree.fields['supercode'].setValue(getTreeAttribute('parentid'));	
		}
		
}

//新增目录
detailAreaTree.opTreeInsert = function(){
	if (!detailAreaTree.checkFields())
		return;
	var obj = detailAreaTree.getValueObject();
	obj.istree = 'true';
	obj.supercode = obj.superName;
	call_KbmService.opAddNewTreeTKbm(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.removeAllNode('root');
			mainArea.queryKbms('root');
		}
	});
}
detailAreaTree.opTreeInsertAndClose = function(){
	if (!detailAreaTree.checkFields())
		return;
	var obj = detailAreaTree.getValueObject();
	obj.istree = 'true';
	obj.supercode = obj.superName;
	call_KbmService.opAddNewTreeTKbm(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.removeAllNode('root');
			mainArea.queryKbms('root');
			newKbmTreeWin.close();
		}
	});
}

//新增内容
mainArea.openAddContextWindow = function(constParam){
	if(getTreeAttribute('parentname') != 'false'){
		if(getTreeAttribute('selectname') != 'SOC'){
				newKbmWin.getEm().setTitle("新增内容");
				newKbmWin.show(constParam);
			if(getTreeAttribute('leaf') == false){
				detailArea.fields['category'].setValue(getTreeAttribute('selectname'));
				detailArea.fields['supercode'].setValue(getTreeAttribute('selectid'));	
			}else{
				detailArea.fields['category'].setValue(getTreeAttribute('parentname'));
				detailArea.fields['supercode'].setValue(getTreeAttribute('parentid'));	
			}
		}else{
			Ext.alert('请选择一个类别');
			return;
		}
	}
	
	
} 

/**
 * 增加知识
 */
detailArea.opInsert = function() {
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.isprivate = detailArea.fields['isprivate'].getValue();
	alert1(obj);
	call_KbmService.opAddNewTKbm(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryTPoses(getAppContext("id"));
		}
	});
}
detailArea.opInsertAndClose=function()
{
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	obj.isprivate = detailArea.fields['isprivate'].getValue();
	call_KbmService.opAddNewTKbm(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryTPoses(getAppContext("id"));
			newKbmWin.close();
		}
	});

}
/**
 * 修改知识
 */
mainArea.openUpdateWindow=function(){
	var obj = mainArea.getSigned();
	newKbmWin.getEm().setTitle(obj.name);
	newKbmWin.show("ADDNEWCONTEXTUPDATE");
	detailArea.fields['name'].setValue(obj.name);		
	var v = mainArea.queryFields['name'].getValue();
	if(v.trim() != '')obj.content = StrUtil.replaceAll(obj.content,v,'<font color="red">' +v+'</font>' );

	detailArea.fields['content'].setValue(obj.content);	
	detailArea.fields['category'].setValue(obj.category);
	detailArea.fields['keyword'].setValue(obj.keyword);
	detailArea.fields['seachcode'].setValue(obj.seachcode);
	detailArea.fields['supercode'].setValue(obj.supercode);
	detailArea.fields['code'].setValue(obj.code);
	detailArea.fields['hid'].setValue(obj.hid);
	detailArea.fields['leaf'].setValue(obj.leaf);
	detailArea.fields['istree'].setValue(obj.istree);
	detailArea.fields['publishtime'].setValue(obj.publishtime);
}

detailArea.opUpdate = function(){
	var obj = detailArea.getValueObject();
	obj.isprivate = detailArea.fields['isprivate'].getValue();
	call_KbmService.opModifyTKbms(obj,function(viewData){
		if (!viewData.isSucceed) {
			Ext.alert('修改失败,' +  viewData.message);
		} else {
			mainArea.queryTPoses(getAppContext("id"));
			newKbmWin.close();
		}
	});
}
detailArea.opClose = function(){
	detailArea.close();
}
/**
 * 删除知识
 */
mainArea.opDelete = function() {
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.Msg.alert('提示', '请勾选记录');
		return;
	}
	if (Ext.MessageBox.confirm('提示', '确认删除吗?', function(btn) {
		if (btn == 'yes') {
			call_KbmService.opDeleteTKbms(list, function(viewData) {
				if (!viewData.isSucceed) {
					alert('删除失败');
				} else {
					mainArea.queryTPoses(getAppContext("id"));
				}
			});
		}
	}));
}

function getTreeAttribute(selectid){
	var context= getAppContext("id");
	if(context == null){
		context = 'root';
	}
	//选中节点id
	if(selectid == 'selectid'){
		return context;
	}
	//选中节点的名称
	if(selectid == 'selectname'){
		if(context == 'root'){
			return '根目录';
		}else{
			return mainArea.getTree().getSelectionModel().getSelection()[0].data.text;			
		}
	}
	//选中父id
	if(selectid == 'parentid'){
		return mainArea.getTree().getStore().getNodeById(context).parentNode.getId()
	}
	//选中父节点名称
	if(selectid == 'parentname'){
		if(context == 'root'){
			return '根目录';
		}else{
			return mainArea.getTree().getStore().getNodeById(context).parentNode.get('text');
		}
	}
	//叶子属性
	if(selectid == 'leaf'){
		return mainArea.getTree().getSelectionModel().getSelection()[0].data.leaf;
	}
}
Ext.onReady(appInit);