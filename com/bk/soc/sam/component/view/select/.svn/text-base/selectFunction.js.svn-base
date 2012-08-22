require('SAM_SelectFunction');

var selectFunctionWin=new WindowUnit('selectFunctionWin');
var selectFunctionArea=new SelectAreaUnit('selectFunctionArea');
selectFunctionWin.setTitle('选择菜单');

selectFunctionArea.setCm([
                  		{
                  			header: "菜单编码",
                  			dataIndex: 'functionId',
                  			width: 150,
                  			editor: null
                  		},
                  		{
                  			header: "菜单名称",
                  			dataIndex: 'functionName',
                  			width: 150,
                  			editor: null
                  		},
                  		{
                  			header: "所属构件编码",
                  			dataIndex: 'componentId',
                  			width: 200,
                  			editor: null
                  		},
                  		{
                  			header: "所属构件名称",
                  			dataIndex: 'componentName',
                  			width: 150,
                  			editor: null
                  		}]);
selectFunctionArea.addToQueryPanel([
                            		{xtype:'textfield',name:'functionId',fieldLabel:'菜单编码'},
                            		{xtype:'textfield',name:'functionName',fieldLabel:'菜单名称'},
                            		{xtype:'textfield',name:'componentId',fieldLabel:'所属构件编码'},
                            		{xtype:'textfield',name:'componentName',fieldLabel:'所属构件名称',owner:'_t2'}
                            		],
                            		{
										labelWidth:80,
                            			fieldsPerRow:2
                            		});
                            		
                            		selectFunctionWin.init();
                            		selectFunctionWin.add(selectFunctionArea);
                            		selectFunctionArea.refreshFor(findFunctions);
                            		
                            		selectFunctionWin.on('show',function()
                            		{
                            			selectFunctionArea.clean();//这条有开发人员决定加不加.不加的话弹出的选择页保留上一次调用的查询条件和分页
                            			findFunctions();
                            		});
                          		
function showSelectFunction(e,selectMode,callback,otherConditions,selected,pks)
{
	selectFunctionArea.setSelectEvent(e);
	selectFunctionArea.setCallBack(callback);
	selectFunctionArea.setSelectMode(selectMode);
	selectFunctionArea.setOtherConditions(otherConditions);
	selectFunctionArea.setSelected(selected,pks);
	selectFunctionWin.show();  
}

function findFunctions()
{
	SAM_SelectFunction.findFunctions(selectFunctionArea.getAreaInfo(),selectFunctionArea.getOtherConditions(),function(viewData)
	{
		selectFunctionArea.showViewData(viewData);
	});
}