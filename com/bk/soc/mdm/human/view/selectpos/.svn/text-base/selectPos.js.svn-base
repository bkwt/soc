document.write("<" + "script src=\"" +"/CERP3x/dwr/interface/MDM_SelectPos.js"+ "\"></" + "script>");

    var selectPosWin=null;
	var selectPosArea=null;

function showSelectPos(e,selectMode,callback,otherConditions,selected,pks)
{
    if(!selectPosWin){
    selectPosWin=new WindowUnit('selectPosWin');
	selectPosArea=new SelectTreeAreaUnit('selectPosArea');
	selectPosArea.setCm([
	{
		header: "岗位编码",
		dataIndex: 'code',
		sort: true,
		width: 120	
	},
	{
		header: "岗位名称",
		dataIndex: 'name',
		sort: true,
		width: 150
	}, 
	{
		header: "所属部门名称",
		dataIndex: 'orgzName',
		width: 150
	}]);
	
	var row1=new Ext.Panel(rowConfig);
							
	row1.add({tag: 'div', html: '岗位编码：',bodyStyle:queryLabel+'width:93'});
	row1.add({xtype:'textfield',name:'code',autoWidth:false,width:120,rule:"@NAME@ LIKE '@VALUE@%'"});
	
	row1.add({tag: 'div', html: '岗位名称：',bodyStyle:queryLabel+'width:93'});
	row1.add({xtype:'textfield',name:'name',autoWidth:false,width:120});
	
	row1.add({tag: 'div', html: '所属部门名称：',bodyStyle:queryLabel+'width:114'});
	row1.add({xtype:'textfield',name:'name',autoWidth:false,owner:'_t2',width:120});
	
	selectPosArea.addToQueryPanel(row1);	
	
	selectPosArea.setTitle('');
	selectPosArea.setWidth(710);
	selectPosWin.setTitle('选择岗位');
	
	selectPosWin.init();
	selectPosWin.add(selectPosArea);
//	selectPosArea.refreshFor(findPoses);
    selectPosArea.setExpandFunction(findPosNode);
	selectPosArea.refreshFor(findPos);
	selectPosWin.on('show',function()
	{
		selectPosArea.clean();//这条有开发人员决定加不加.不加的话弹出的选择页保留上一次调用的查询条件和分页
		selectPosArea.showTreeDate({resultList:[{hid:'root',id:'root',name:'部门',pid:'root',isLeaf:0}]});
		findPoses();
	});
    }
	selectPosArea.setSelectEvent(e);
	selectPosArea.setCallBack(callback);
	selectPosArea.setSelectMode(selectMode);
	selectPosArea.setSelected(selected,pks);
	selectPosWin.getEm().setPosition(0,0);
	if(typeof(otherConditions)=='string')
	{
		selectPosArea.setOtherConditions(otherConditions);
	}
	else
	{
		selectPosArea.setOtherConditions(otherConditions.otherConditions);
		selectPosArea.setTreeConditions(otherConditions.treeConditions);
	}	
	selectPosWin.show();
}

function getPosId(id){
    if(id){
    setAppContext('idP',id);
    }else{
    id = getAppContext('idP');
    }return id;
}

function findPosNode(id){
    id = getPosId(id);
    MDM_SelectPos.findPosNode(id,selectPosArea.getTreeConditions(),function(viewData)
	{
		selectPosArea.showTreeDate(viewData);
	});
}

function findPos(id){
    id = getPosId(id);
    MDM_SelectPos.findPos(selectPosArea.getAreaInfo(),id,selectPosArea.getOtherConditions(),function(viewData)
	{
		selectPosArea.showViewData(viewData);
	});
}

function findPoses()
{
	MDM_SelectPos.findPoses(selectPosArea.getAreaInfo(),selectPosArea.getOtherConditions(),function(viewData)
	{
		selectPosArea.showViewData(viewData);
	});
}