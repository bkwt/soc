require('Call_FoundationDataBaseService');
var selectCateWin=new WindowUnit('selectCatezWin');
selectCateWin.setTitle('选择类别');
var selectCatezArea=new SelectTreeAreaUnit('selectCatezArea');

selectCatezArea.setCm([
                  	{
                  		header: "类别编码",
                  		dataIndex: 'code',
                  		sort: true,
                  		width: 80
                  	},{
                  		header: "类别名称",
                  		dataIndex: 'name',
                  		width: 80
                  	}]);

selectCatezArea.addToQueryPanel([{ fieldLabel: "类别编码", xtype: "textfield",name: 'code' ,rule:"@NAME@ LIKE '%@VALUE@%'"}]);

selectCateWin.init();
selectCateWin.add(selectCatezArea);

selectCatezArea.setExpandFunction(findCateNodes);
selectCatezArea.refreshFor(findCate);	
selectCateWin.on('show',function()
{
	selectCatezArea.clean();
});

function showSelectCate(e,selectMode,callback,otherConditions,selected,pks)
{
	
    selectCatezArea.setSelectEvent(e);
	selectCatezArea.setCallBack(callback);
	selectCatezArea.setSelectMode(selectMode);
	selectCatezArea.setSelected(selected,pks);
	selectCateWin.getEm().setPosition(0,0);
	if(typeof(otherConditions)=='string')
	{
		selectCatezArea.setOtherConditions(otherConditions);
	}
	else
	{
		selectCatezArea.setOtherConditions(otherConditions.otherConditions);
		selectCatezArea.setTreeConditions(otherConditions.treeConditions);
	}	
	selectCateWin.show();
}

function getCateId(id){
    if(id){
    setAppContext('cateId',id);
    }else{
    id = getAppContext('cateId');
    }return id;
}

function findCateNodes(id){
    Call_FoundationDataBaseService.findCateNodes(getCateId(id),function(viewData){
        selectCatezArea.showTreeDate(id,viewData);
    });
}

function findCate(id){
    Call_FoundationDataBaseService.findCate(selectCatezArea.getAreaInfo(),getCateId(id),function(viewData){
    selectCatezArea.showViewData(viewData);
    });
}
