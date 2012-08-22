require('SMS_SelectBasicQueryMessage');
var selectBasicQueryMessageWin=null;
var selectBasicQueryMessageArea=null;

function showSelectBasicQueryMessage(e,selectMode,callback,otherConditions)
{
	if(selectBasicQueryMessageWin==null)
	{
		selectBasicQueryMessageWin=new WindowUnit('selectBasicQueryMessageWin');		
		selectBasicQueryMessageArea=new SelectAreaUnit('selectBasicQueryMessageArea');	
		selectBasicQueryMessageArea.setCm([
		{
			header: "消息标识",
			dataIndex: 'templateId',
			width: 80,
			editor: null
		},
		{
			header: "消息名称",
			dataIndex: 'templateName',
			width: 80,
			editor: null
		},
		{
			header: "子系统",
			dataIndex: 'subSystem',
			width: 100,
			editor: null
		},
		{
			header: "权限控制",
			dataIndex: 'needImpower',
			width: 100,
			renderer:StrUtil.displayYN,
			editor: new Ext.form.ComboBox(
			{
				store:YNStore,
				displayField:'CH',
				valueField:'EN',
				allowBlank: true
			})
		},
		{
			header: "数据源",
			dataIndex: 'dataSql',
			width: 100,
			editor:null
		}
		,
		{
			header: "消息模板",
			dataIndex: 'templateContent',
			width: 100,
			editor:null
		}
		,
		{
			header: "参数说明",
			dataIndex: 'paramDesc',
			width: 100,
			editor:null
		}
		
		]);
		
		var row1=new Ext.Panel(rowConfig);
		
		row1.add({tag: 'div', html: '消息标识：',bodyStyle:queryLabel+'width:180'});
		row1.add({xtype:'textfield',name:'templateId',autoWidth:false,width:100});						
		row1.add({tag: 'div', html: '子系统：',bodyStyle:queryLabel+'width:100'});
		row1.add({xtype:'textfield',name:'subSystem',autoWidth:false,width:100});
					
		selectBasicQueryMessageArea.addToQueryPanel(row1);
		
		selectBasicQueryMessageArea.setWidth(600);
		selectBasicQueryMessageWin.setTitle('选择简单消息模板');
		
		selectBasicQueryMessageWin.init();
		selectBasicQueryMessageWin.add(selectBasicQueryMessageArea);
		selectBasicQueryMessageArea.refreshFor(findBasicQueryMessages);
		
		selectBasicQueryMessageWin.on('show',function()
		{
			selectBasicQueryMessageArea.clean();//这条有开发人员决定加不加.不加的话弹出的选择页保留上一次调用的查询条件和分页
			findBasicQueryMessages();
		});
	}
	selectBasicQueryMessageArea.setSelectEvent(e);
	selectBasicQueryMessageArea.setCallBack(callback);
	selectBasicQueryMessageArea.setSelectMode(selectMode);
	selectBasicQueryMessageArea.setOtherConditions(otherConditions);
	selectBasicQueryMessageWin.show();
}

function findBasicQueryMessages()
{
	SMS_SelectBasicQueryMessage.findBasicQueryMessages(selectBasicQueryMessageArea.getAreaInfo(),selectBasicQueryMessageArea.getOtherConditions(),function(viewData)
	{  
		selectBasicQueryMessageArea.showViewData(viewData);
	});
}