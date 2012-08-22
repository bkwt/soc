require('MDM_HumanFrameworkService');

include('SelectOrgz');
//include('SelectPerson');
// 2加载配置文件
loadAreaConfig();
// 选择部门

////选择部门
function selectOrgz(e)
{
	showSelectOrgz(e,'SINGLE',setCate,'');
}
function setCate(siteTag,voList)
{
	if(siteTag.getSelectedCount()==0)
	{
		Ext.alert('没有选定的记录');
		return;
	}
	
	if(voList.length==0)
	{
		siteTag.setField('orgz','');
	}
	else
	{
		siteTag.setField('orgzName',voList[0].name);
		siteTag.setField('orgz',voList[0].code);
	}
}

//function selectOrgz(e)
//{
//	var obj=detailArea.getValueObject();
//	var orgz=obj.orgz;
//	var orgzArray=StrUtil.split(orgz,',');
//	showSelectOrgz(e,'COMPLEX',setCate,'',orgzArray,'code');
//}
//function setCate(siteTag,addList,removeList)
//{
//	for(var i=0;i<addList.length;++i)
//	{
//		siteTag.appendField('orgzName',addList[i].name,',');
//		siteTag.appendField('orgz',addList[i].code,',');
//		
//	}
//	
//	for(var i=0;i<removeList.length;++i)
//	{
//		siteTag.removeField('orgzName',removeList[i].name,',');
//		siteTag.removeField('orgz',removeList[i].code,',');
//		
//	}
//}


var page1 = new PageUnit('page1');
var mainArea=new TreeAreaUnit('mainArea');
/**
 * 人员store
 */

var sysStore = new Ext.data.Store({
	fields: ['code','name']
});

var posStore = new Ext.data.Store({
	fields: ['code','name']
});

MDM_HumanFrameworkService.getTPos(function(list) {
		sysStore.loadData(list);
});

var orgzStore = new Ext.data.Store({
	fields: ['code','name']
});



MDM_HumanFrameworkService.getTOrgz(function(list){
		orgzStore.loadData(list);
	});

mainArea.setCm([
{
	header: "人员编码",
	dataIndex: 'code',
	width: 120,
	align:'center'
},

{
	header: "姓名",
	dataIndex: 'name',
	align:'center',
	width: 100
}
,{
	header:'性别',
	align:'center',
	dataIndex:'sex',
	width:60
},
{
	header: "部门",
	align:'center',
	dataIndex:'orgz',
	width: 220,
	renderer : function(value, metadata, record) {
		if(value != null){
			var orgzList = value.split(",");
			var vv = '';
			if(orgzList.length > 1 ){
			for(var i=0;i<orgzList.length;i++){
				var index = orgzStore.findExact('code', orgzList[i],0);
					if (index != -1) {
						vv += orgzStore.getAt(index).data.name + ',';
					}
			}
			vv = vv.substr(0,vv.length - 1);	
		}else{
			var index = orgzStore.findExact('code', value,0);
			if (index != -1) {
				vv = orgzStore.getAt(index).data.name;
			}
		}
		return vv;
		}
	}
},
{
	header: "岗位",
	align:'center',
	dataIndex:'pos',
	width: 120,
	renderer : function(value, metadata, record) {
		if(value != null){
			var posList = value.split(",");
			var vv = '';
			if(posList.length > 1 ){
			for(var i=0;i<posList.length;i++){
				var index = sysStore.find('code', posList[i]);
					if (index != -1) {
						vv += sysStore.getAt(index).data.name + ',';
					}
			}
			vv = vv.substr(0,vv.length - 1);	
		}else{
			var index = sysStore.find('code', value);
			if (index != -1) {
				vv = sysStore.getAt(index).data.name;
			}
		}
		return vv;
		}
	}
},{
	header:'身份证号',
	align:'center',
	dataIndex:'idcard',
	width:150
},{
	header:'入职日期',
	align:'center',
	dataIndex:'birthday',
	width:120,
	renderer:Ext.util.Format.dateRenderer('Y-m-d')
},{
	header:'电话',
	align:'center',
	dataIndex:'telephone',
	width:140
},{
	header:'父',
	dataIndex:'orgz',
	width:120,
	hidden:true
}]);


mainArea.addToQueryPanel([  
{ fieldLabel: "人员编码", 
	xtype: "textfield",
	name: 'code',
	rule:"@NAME@ LIKE '%@VALUE@%'"
},  
{ fieldLabel: "姓名", 
	xtype: "textfield",
	name: 'name',
	rule:"@NAME@ LIKE '%@VALUE@%'"
},
{ fieldLabel: "身份证号", 
	xtype: "textfield",
	name: 'idcard',
	rule:"@NAME@ LIKE '%@VALUE@%'"
}
]);
/** *********框架自带窗体start********** */
var newOrgzWin = new WindowUnit('newOrgzWin');  // 声明添加部门的window
var detailArea = new DetailAreaUnit('detailArea');　// 声明form 表单
detailArea.setWidth(500);


detailArea.addToFieldSet([  
{
	fieldLabel:'姓名',
	name:'name',
	xtype:'textfield',
	allowBlank : false
},{
	fieldLabel:'性别',
	name:'sex',
	xtype:'combo',
	editable : false,
	valueField: 'value',
    displayField: 'display',
    queryMode: 'local',
	store:new Ext.data.ArrayStore({
		fields:['value','display'],
		data:[['男','男'],['女','女']]
	}),
	value:'男'
},{
	fieldLabel:'联系电话',
	name:'telephone',
	xtype:'textfield',
	regex : /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/ ,  
    regexText : '电话号码输入格式输入错误!'
}
,{
	fieldLabel:'身份证号',
	name:'idcard',
	xtype:'textfield',
	regex : /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
	regexText : '输入正确的身份号码'
},
{
	fieldLabel:'入职日期',
	name:'birthday',
	xtype:'datefield',
	format:'Y-m-d'
},
{
	fieldLabel : '部门',
	name : 'orgzName',
	xtype : 'trigger',
	valueField: 'code',
	queryMode: 'local', 
    displayField: 'name',
    store:orgzStore,
    emptyText:'--请选择部门--',
    allowBlank : false,
  　　  editable  : false,  
  　　	triggerAction: 'all',
  	triggerBaseCls :'x-form-searchtrigger'

},
{
	fieldLabel : "岗位",
	xtype : "combo",
	name : "posName",
	emptyText : '--请选择岗位--',
	queryMode : 'local',
	displayField : 'name',
	valueField : 'code',
	allowBlank : false,
	store: posStore
},
{
	xtype : "textfield",
	name : "orgz",
	hidden: true
}
,{
	xtype : "textfield",
	name : "pos",
	hidden: true
}
,{
	fieldLabel : 'hid',
	xtype :"textfield",
	name : "hid",
	hidden:true
},
{
	fieldLabel : '人员编码',
	xtype :"textfield",
	name : "code",
	hidden:true
}
],{fieldsPerRow:2})
/**************文件上传 strat*************/
var FileForm=new Ext.form.Panel({height : 60,layout:'table',border:false,fileUpload:true});
var	fileData = FileForm.add({xtype:'filefield',fieldLabel : '添加附件',id:'file',name:'file',width:400});
/**************文件上传 end******************/
detailArea.addToFieldSet(
FileForm
);
detailArea.fields['orgzName'].onTriggerClick=selectOrgz;
detailArea.fields['orgz'].on('change',function(a,b,c,d){
findChild(b);
});
/** *********框架自带窗体end********** */

/***************下拉树start**********************/

function findChild(parentId)
{
	MDM_HumanFrameworkService.getTPosOrgzCode(parentId,
	{callback:function(list) {
			posStore.loadData(list);
		},
    	async:false
    	});
}
/***********************下拉树end*********************/


/**
 * 页面初始化
 * 
 * @returns
 */
function appInit()
{
	setAppContext("id","")
	page1.init();
	page1.add(mainArea);
	newOrgzWin.init();
	newOrgzWin.add(detailArea);
//	detailArea.add(FileForm);
	mainArea.refreshFor(mainArea.queryTPersonAreaData);
	mainArea.setExpandFunction(mainArea.queryOrgzs);// tree data
    page1.show(request.getParameter('progParams'));
    mainArea.queryTPersonAreaData('root');
    hideLoading();

}
/**
 * 根据树节点值查询相应数据
 */
mainArea.queryTPersonAreaData=function(id)
{
	if(id == 'root' || id == null)
		id ='01';

	MDM_HumanFrameworkService.queryTPersonAreaDataForm(mainArea.getAreaInfo(),id,function(viewData)
	{
		mainArea.showViewData(viewData);
	});
}

/**
 * 显示添加的form
 */
mainArea.openAddWindow = function(constParam) {
	newOrgzWin.show(constParam);
	newOrgzWin.getEm().setTitle("新增人员");
	var selectId= getAppContext("id");
	if(selectId == null){
		return;
	}
	
	//选中节点名称
	var selectName = mainArea.getTree().getSelectionModel().getSelection()[0].data.text;
	//叶子节点
	var leaf = mainArea.getTree().getSelectionModel().getSelection()[0].data.leaf;
	//当前选中节点的父id
	var parentId = mainArea.getTree().getStore().getNodeById(selectId).parentNode.getId();
	//当前选中节点的父名称
	var parentName = mainArea.getTree().getStore().getNodeById(selectId).parentNode.get('text');
	
	if(leaf == false){
		detailArea.fields['orgzName'].setValue(selectName);
		detailArea.fields['orgz'].setValue(selectId);
	}
	else{
		detailArea.fields['orgzName'].setValue(parentName);
		detailArea.fields['orgz'].setValue(parentId);
		detailArea.fields['posName'].setValue(selectName);
		detailArea.fields['pos'].setValue(selectId);
	}
		
}
/**
 * 查询tree数据
 */
mainArea.queryOrgzs = function(id){
    MDM_HumanFrameworkService.queryOrgzNodes(id,function(viewData)
	{
		mainArea.showTreeData(id,viewData);
	});
}

/**
 * 增加人员
 */
detailArea.opInsert = function() {
	
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	if(obj.orgz == null){
		obj.orgz = '01';
	}
	if(obj.pos == null){
		obj.pos = obj.posName;
	}
	MDM_HumanFrameworkService.opAddNewPerson(obj, function(viewData) {
		FileForm.getForm().doAction('submit',
			{
				url:'/SOC/Upload?name='+obj.file,
				method:'post',
				success:function(o,r)
			{
				FileForm.form.getEl().dom.reset();  
			}
		});
		
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryTPersonAreaData(getAppContext("id"));
			detailArea.fields['pos'].setValue('');
		}
	});
}
/**
 * 保存并关闭
 */
detailArea.opInsertAndClose=function()
{
	if (!detailArea.checkFields())
		return;
	var obj = detailArea.getValueObject();
	if(obj.orgz == null){
		obj.orgz = '01';
	}
	if(obj.pos == null){
		obj.pos = obj.posName;
	}
	MDM_HumanFrameworkService.opAddNewPerson(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('保存失败.' + viewData.message);
		} else {
			detailArea.clean();
			mainArea.queryTPersonAreaData(getAppContext("id"));
			detailArea.fields['pos'].setValue('');
			newOrgzWin.close();
		}
	});
}
/**
 * 修改人员
 */
mainArea.openUpdateWindow=function(){
	detailArea.fields['pos'].setValue('');
	var obj = mainArea.getSigned()
	if(obj == null){
		Ext.alert('请选择一条记录');
		return;
	}
    	newOrgzWin.show("UPDATE");
    	newOrgzWin.getEm().setTitle("修改人员");
    	detailArea.fields['hid'].setValue(obj.hid);								//hid
    	detailArea.fields['code'].setValue(obj.code);							//code
    	detailArea.fields['name'].setValue(obj.name);							//姓名
    	detailArea.fields['sex'].setValue(obj.sex);
    	detailArea.fields['orgzName'].setValue(findOrgzName(obj.orgz));			//部门
    	detailArea.fields['telephone'].setValue(obj.telephone);	    			//电话
    	detailArea.fields['idcard'].setValue(obj.idcard);    					//身份证号码
    	detailArea.fields['birthday'].setValue(obj.birthday);    				//入职日期
    	MDM_HumanFrameworkService.getTPos(
    	{callback:function(list) {
			posStore.loadData(list);
		},
    	async:false
    	});
    	detailArea.fields['posName'].setValue(obj.pos);
    	detailArea.fields['orgz'].setValue(obj.orgz);
    	
}

detailArea.opUpdate = function (){
	
	var obj = detailArea.getValueObject();
	obj.pos = obj.posName;
	MDM_HumanFrameworkService.opModfiyTPerson(obj, function(viewData) {
		if (!viewData.isSucceed) {
			Ext.alert('修改失败,' +  viewData.message);
		} else {
			mainArea.queryTPersonAreaData(getAppContext("id"));
			detailArea.fields['pos'].setValue('');
			newOrgzWin.close();
		}
	});
}

/**
 * 删除人员
 */
mainArea.opDelete = function() {
	var list = mainArea.getSelected();
	if (list.length == 0) {
		Ext.Msg.alert('提示', '请勾选记录');
		return;
	}
	if (Ext.confirm('确认删除吗?', function(btn) {
		if (btn == 'yes') {
			MDM_HumanFrameworkService.opDeleteTPerson(list, function(viewData) {
				if (!viewData.isSucceed) {
					alert('删除失败');
				} else {
					mainArea.queryTPersonAreaData(getAppContext("id"));
				}
			});
		}
	}));
}
/**
 * 清空岗位
 */
function resetPos(){
	detailArea.fields['pos'].setValue('');
	detailArea.fields['pos'].getTree().getStore().getNodeById('root').removeAll();
}


function findOrgzName(value) {
		if(value != null){
		var orgzList = value.split(",");
		var vv = '';
		if(orgzList.length > 1 ){
		for(var i=0;i<orgzList.length;i++){
			var index = orgzStore.findExact('code', orgzList[i],0);
				if (index != -1) {
					vv += orgzStore.getAt(index).data.name + ',';
				}
		}
		vv = vv.substr(0,vv.length - 1);	
	}else{
		var index = orgzStore.findExact('code', value,0);
		if (index != -1) {
			vv = orgzStore.getAt(index).data.name;
		}
	}
	return vv;
	}
}
function findPosName(value) {
	
		if(value != null){
			var vv = '';
			var index = sysStore.findExact('code', value,0);
			if (index != -1) {
				vv = sysStore.getAt(index).data.name;
			}
		}
		return vv;
}

Ext.onReady(appInit);
