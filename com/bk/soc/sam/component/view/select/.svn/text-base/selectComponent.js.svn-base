
var selectBeanWin=null;
var selectBeanArea=null;

function showSelectBean(e,selectMode,callback,otherConditions,selected,pks)
{
	if(selectBeanWin==null)
	{
		selectBeanWin=new WindowUnit('selectBeanWin');
		selectBeanArea=new SelectAreaUnit('selectBeanArea');
		selectBeanArea.setCm([
		{
			header: "业务构件编码",
			dataIndex: 'componentId',
			width: 400,
			editor: null
		},
		{
			header: "名称",
			dataIndex: 'componentName',
			width: 200,
			editor: null
		}]);
		
		var row1=new Ext.Panel(rowConfig);						
		row1.add({tag: 'div', html: '业务构件名称：',bodyStyle:queryLabel+'width:200'});
		row1.add({xtype:'textfield',name:'componentName',autoWidth:false,width:200,rule:'@NAME@ LIKE \'%@VALUE@%\''});	
		selectBeanArea.addToQueryPanel(row1);
		
		selectBeanArea.setWidth(500);
		selectBeanWin.setTitle('选择业务构件');
		
		selectBeanWin.init();
		selectBeanWin.add(selectBeanArea);
		selectBeanArea.refreshFor(findBeans);
		
		selectBeanWin.on('show',function()
		{
			selectBeanArea.clean();//这条有开发人员决定加不加.不加的话弹出的选择页保留上一次调用的查询条件和分页
			findBeans();
		});
	}
	
	selectBeanArea.setSelectEvent(e);
	selectBeanArea.setCallBack(callback);
	selectBeanArea.setSelectMode(selectMode);
	selectBeanArea.setOtherConditions(otherConditions);
	selectBeanArea.setSelected(selected,pks);
	selectBeanWin.show();
}

function findBeans()
{
	SAM_SelectComponent.findBeans(selectBeanArea.getAreaInfo(),function(viewData)
	{
		selectBeanArea.showViewData(viewData);
	});
}