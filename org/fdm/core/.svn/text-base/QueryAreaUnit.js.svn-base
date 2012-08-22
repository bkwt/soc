//---------------------QueryAreaList.js-------------------------------------------------------
function QueryAreaUnit(_id)
{
	var id=_id;
	
	var mainPanel=null;
	var selectQueryProjectArea = null;
    var sm=null;
    var cm=null;
    var store=null;
    var grid=null;
    var cellEditing=null;
    //归属的PageUnit
    var pageUnit=null;

    var width=700;
    var height=450;
    
    var queryButton=null;
    var resetButton=null;
    
    var completeButton=null;
    var completeButtonHandler=null;
    //----------------------
    var displayFieldName=function(v)
	{
		return fieldNameMap[v];
	};

	var displayRuleName=function(v)
	{
		return ruleNameMap[v];
	};

	var displayRuleValue=function(v)
	{
		if(v&&typeof(v)=='object')
		{
			return v.format('Y-m-d');
		}
		else
		{
			return v;
		}
	};
	
	var displayLogic=function(v)
	{
		if(v=='OR')
		{
			return '或者';
		}
		else if(v=='AND')
		{
			return '并且';
		}
		else
		{
			return '';
		}
	};
//--------------------------------------------------------------
	var fieldList=null;
	var joinFields=null;

	var logicStore = new Ext.data.Store({
		fields: ['CH','EN']
	});
	logicStore.loadData([['并且','AND'],['或者','OR']]);
	var zkhStore = new Ext.data.Store({
		fields: ['EN']
	});
	zkhStore.loadData([[' '],['('],['(('],['(((']]);
	var ykhStore = new Ext.data.Store({
		fields: ['EN']
	});
	ykhStore.loadData([[' '],[')'],['))'],[')))']]);
	var ruleStoreData=[['等于','='],['模糊等于','like'],['大于','>'],['大于等于','>='],['小于','<'],['小于等于','<='],['不等于','<>']];

	var ruleStore = new Ext.data.Store({
		fields: ['CH','EN']
	});
	ruleStore.loadData(ruleStoreData);
	var ruleNameMap={};
	
	var fieldStoreData=[];
	var fieldNameMap={};
	var fieldTypeMap={};
	var fieldTableTypeMap={};

	for(var i=0;i<ruleStoreData.length;++i)
	{
		ruleNameMap[ruleStoreData[i][1]]=ruleStoreData[i][0];
	}

	var fieldStore = new Ext.data.SimpleStore({
		fields: ['CH','EN']
	});

	var fieldNameEditor=new Ext.form.ComboBox({store: fieldStore,queryMode: 'local', valueField:'EN',displayField:'CH'});
	fieldNameEditor.on('select',function(_this)
	{
		
	});

	var charEditor	=new Ext.form.TextField({allowBlank: false});
	var numberEditor=new Ext.form.NumberField({allowBlank: false,allowDecimals:true,allowNegative:true});
	var dateEditor	=new Ext.form.DateField({allowBlank: false});
	
    return {
    	addRecord:function(obj)
    	{
    		obj.hid=null;
    		obj.isSelect=false;
    		var r=new Ext.data.Record(obj,null);
			store.addSorted(r);
    	},
		checkFields:function(recordAll)
		{
			if(!this.needCheckFields)
			{
				this.needCheckFields={};
				for(var i=0;i<cm.getColumnCount();++i)
				{
					var oneCm=cm.getColumnById(cm.getColumnId(i));
					if(oneCm.editor!=null)
					{
						if(oneCm.editor.field.allowBlank==false)
						{
							this.needCheckFields[oneCm.dataIndex]=i+1;
						}
					}
				}
			}

			grid.stopEditing();

			var records=store.getRange();
			if(recordAll)
			{
				//records=store.getRange();
			}
			else
			{
				rs=[];
				for(var i=0;i<records.length;++i)
				{
					if(records[i].data.isSelect)
					{
						rs.push(records[i]);
					}
				}
				records=rs;
			}
			
			for(var i=0;i<records.length;++i)
			{
				if(records[i].data!=null)
				{
					for(var k in this.needCheckFields)
					{
						if(this.needCheckFields[k]&&((records[i].data)[k]===''||(records[i].data)[k]===null||(records[i].data)[k]===undefined))
						{
							sm.selectRow(store.indexOf(records[i]));
							grid.startEditing(store.indexOf(records[i]),this.needCheckFields[k]-1);
							return false;
						}
					}
				}
			}
			
			return true;
		},
		clean:function(allClean)
		{
			store.removeAll();
		},
		close:function()
		{
			mainPanel.hide();
		},
    	getAllObjects:function()
    	{
    		var list=[];
    		
    		var records=store.getRange();
    		
    		for(var i=0;i<records.length;++i)
    		{
    			for(var k in records[i].data)
				{
					var d=(records[i].data)[k];
					if(d==''&&typeof d=='string')
					{
						(records[i].data)[k]=null;
					}
				}
    			list.push(records[i].data);
    		}
    		
    		return list;
    	},
    	getHQLConditions:function()
		{
			var hqlCons='';
			//----------连接条件--------------------
			var joinCons='';
			for(var i=0;i<joinFields.length;++i)
			{
				joinCons+=(' and _t1.'+joinFields[i]+'='+joinFields[i]);
			}
			
			var records=store.getRange();
			
			if(records.length===0)
			{
				return ' 3=3';
			}
			
			var khpd=0;
			
			for(var i=0;i<records.length;++i)
			{
				var logic=records[i].get('logic');
				
				if(i==0)
				{
					logic=' ';
				}
				
				if(!logic)
				{
					Ext.alert('第'+(i+1)+'行逻辑不能为空');
					return;
				}
				
				var zkh=records[i].get('zkh');
				zkh=zkh?zkh:'';
				var fieldName=records[i].get('fieldName');
				if(!fieldName)
				{
					Ext.alert('第'+(i+1)+'行字段不能为空');
					return;
				}
				var rule=records[i].get('rule');
				if(!rule)
				{
					Ext.alert('第'+(i+1)+'行条件不能为空');
					return;
				}
				var ruleValue=records[i].get('ruleValue');
				if(!ruleValue)
				{
					Ext.alert('第'+(i+1)+'行条件值不能为空');
					return;
				}
				
				var ykh=records[i].get('ykh');
				ykh=ykh?ykh:'';
				
				var fieldType=records[i].get('fieldType');
				var tableType=records[i].get('tableType');
				var tableName=records[i].get('tableName');
				
				var dyh='';
				if(fieldType=='char'||fieldType=='date')
				{
					dyh='\'';
				}
				
				if(fieldType=='date')
				{
					if(typeof(ruleValue)!='string')
						ruleValue=ruleValue.format('Y-m-d');
				}
				
				if(tableType=='M')
				{
					hqlCons+=(' '+logic+' '+(zkh)+'_t1.'+fieldName+' '+rule+' '+dyh+ruleValue+dyh+(ykh));
				}
				else
				{
					hqlCons+=(' '+logic+' '+(zkh)+'EXISTS (select '+fieldName+' from '+tableName+' where '+fieldName+' '+rule+' '+dyh+ruleValue+dyh+joinCons+')'+(ykh));
				}
				
				if(zkh)				
				{
					khpd=khpd+zkh.length;
				}
				
				if(ykh)				
				{
					khpd=khpd-ykh.length;
				}
			}
			
			if(khpd!==0)
			{
				Ext.alert('请检查括号匹配');
				return;
			}

			return (hqlCons);
		},
    	getEm:function()
    	{
    		return mainPanel;
    	},
    	getGrid:function()
    	{
    		return grid;
    	},
    	getId:function()
    	{
    		return id;
    	},
    	getPageParam:function()
		{
			if(pageUnit==null)
			{
				alert('nerver add to any PageUnit');
				return '';
			}
			else
			{
				return pageUnit.getPageParam();
			}
		},
		getSigned:function()
		{
			var record=sm.getSelected();
			
			if(record)
			{
    			var obj={};
    			
    			for(var k in record.data)
				{
					var d=(record.data)[k];
					if(d==''&&typeof d=='string')
					{
						d=null;
					}
					
					obj[k]=d;
				}

				return obj;
			}
			else
				return null;
		},
		getStore:function()
    	{
    		return store;
    	},
    	getWidth:function()
		{
			return width;
		},
    	getXType:function()
    	{
    		return 'queryarea';
    	},
		init:function()
		{
			me = this;
			try
			{
				advancedQueryService.getQueryData(functionId,{
					callback:function(queryData)
					{
						me.setQueryData(queryData);
					}
					,
					async:false
				});
			}
			catch(e)
			{
				alert('QueryAreaUnit:not include advancedQueryService.js,init fail');
				return;
			}
			//-----------------------------------------------
			selectQueryProjectWin=new WindowUnit(id+'.selectQueryProjectWin');
			selectQueryProjectWin.setTitle('导入方案');
			selectQueryProjectArea=new SelectAreaUnit(id+'.selectQueryProjectArea');
			selectQueryProjectArea.setWidth(270);
			selectQueryProjectArea.setSelectMode('SINGLE');
			selectQueryProjectArea.setCallBack(function(siteTag,volist)
			{
				if(volist.length==0)
				{
					selectQueryProjectArea.clean();
				}
				else
				{
					selectQueryProjectArea.clean();
					var ruleList=Ext.JSON.decode(volist[0].queryProjectJSON);
					
					for(var i=0;i<ruleList.length;++i)
					{
						eval(id).addRecord(ruleList[i]);
					}
				}
				
				eval(id).getEm().setTitle('条件过滤                 方案:'+volist[0].queryProjectName);
			});
			selectQueryProjectArea.setCm([
			{
				header: "方案名称",
				dataIndex: 'queryProjectName',
				width: 200
			},{
				header: "",
				hidden:true,
				dataIndex: 'queryProjectJSON',
				width: 200
			}]);
			
			selectQueryProjectWin.init();
			selectQueryProjectWin.add(selectQueryProjectArea);
			
			var cleanButton=selectQueryProjectArea.getButtonBar().getComponent(3);
			
			cleanButton.setText('删除方案');
			
			cleanButton.setHandler(function()
			{
				var list=eval(id).selectQueryProjectArea.getSelections();
				if(list.length===0)
				{
					Ext.alert('请选中一行');
					return;
				}
				
				Ext.confirm('确认删除该方案吗?',function(btn)
				{
					if(btn=='yes')
					{
						var obj=list[0].data;
						advancedQueryService.deleteQueryProject(functionId,obj.queryProjectName,function(b)
						{
							if(b)
							{
								eval(id).selectQueryProjectArea.getGrid().getStore().remove(list[0]);
							}
						});
					}
				});
			});
			
			//-----------------------------------------------
			sm = Ext.create('Ext.selection.CheckboxModel');
			
			var ruleField=new Ext.form.ComboBox(
			{
				store: ruleStore,
				queryMode: 'local', 
				valueField:'EN',
				displayField:'CH'
			});
			
			ruleField.on('select',function()
			{
				grid.stopEditing();
			});
			
			cm=[
			{
				header: "逻辑",
				dataIndex: 'logic',
				renderer:displayLogic,
				width:60,
				editor: new Ext.form.ComboBox(
				{
					store: logicStore,
					queryMode: 'local', 
					valueField:'EN',
					displayField:'CH'
				})
			},
			{
				header: "(",
				dataIndex: 'zkh',
				width: 50,
				editor: new Ext.form.ComboBox(
				{
					store: zkhStore,
					queryMode: 'local', 
					valueField:'EN',
					displayField:'EN'
				})
			},
			{
				header: "字段",
				dataIndex: 'fieldName',
				width: 150,
				renderer:displayFieldName,
				editor:fieldNameEditor
			},
			{
				header: "条件",
				dataIndex: 'rule',
				width: 80,
				renderer:displayRuleName,
				editor:ruleField
			},
			{
				header: "条件值",
				dataIndex: 'ruleValue',
				width: 150,
				renderer:displayRuleValue,
				editor: new Ext.form.TextField(
				{
					allowBlank: true
				})
			},
			{
				header: ")",
				dataIndex: 'ykh',
				width: 50,
				editor: new Ext.form.ComboBox(
				{
					store: ykhStore,
					queryMode: 'local', 
					valueField:'EN',
					displayField:'EN'
				})
			}];
			
			store = Ext.create('Ext.data.Store',{
    			fields:['hid','logic','zkh','fieldName','rule','ruleValue','ykh']
    	    });
			
			resetButton=new Ext.Button(
		    {
				//text:'重置',
				icon:iconPath.reset,
				iconCls :'border:0;',
				handler : function()
				{
					eval(id).clean();
				}
			});
			
			resetButton.on('render',function(_this)
			{
				_this.el.dom.getElementsByTagName('button')[0].title='重置';
			});
		    
		    completeButton=new Ext.Button(
		    {
				text:'完成',
				handler:function(){
					completeButtonHandler();
					if(grid.getStore().getRange().length==0)
					eval(id).getEm().setTitle('条件过滤');
				}
			});
		    cellEditing = Ext.create('Ext.grid.plugin.CellEditing',{
            	clicksToEdit: 1
             });
			//------------------------------------------------
			grid = new Ext.grid.Panel({
		        id:id+'__grid',
		        store: store,
                columns: cm,
                selModel: sm,
		        stripeRows:true,
		        width:width-2,
		        height:height,
		        frame:true,
		        border:false,
		        clicksToEdit:1,
		        plugins: [cellEditing],
		        tbar:[
		        '-',
		        {
		        	text:'新增行',
		        	handler:function()
		        	{//alert(id);
		        		store.insert(0,sm); 
		        	}
		        },
		        '-',
		        {
		        	text:'移除行',
		        	handler:function()
		        	{
		        		var record = sm.getSelection();
		                if (record) {
		                    store.remove(record);
		                } else
						{
							Ext.alert('没有选定记录');
						}
		        	}
		        },
		        '-',
		        {
		        	text:'导入查询方案',
		        	handler:function()
		        	{
		        		selectQueryProjectWin.show();
		        		
		        		advancedQueryService.queryProject(functionId,function(viewData)
		        		{
		        			selectQueryProjectArea.showViewData(viewData);
		        		});
		        	}
		        },
		        '-',
		        {
		        	text:'保存为查询方案',
		        	handler:function()
		        	{
		        		var records=store.getRange();
		        				
        				if(records.length===0)
        				{
        					Ext.alert('请填写条件');
        					return;
        				}
		        		
		        		Ext.prompt('方案名称',function(btn1,name)
						{
							if(btn1=='ok')
							{
								if(!name)
								{
									return;
								}
								
				        		var saveList=[];
				        		
				        		for(var i=0;i<records.length;++i)
				        		{
				        			var obj={};
				        			
				        			for(k in records[i].data)
				        			{
				        				obj[k]=records[i].data[k];
				        			}
				        			
				        			for(var i=0;i<fieldList.length;++i)
				        			{
				        				if(fieldList[i].fieldName==obj.fieldName)
				        				{
				        					obj.fieldType=fieldList[i].fieldType;
				        					obj.tableType=fieldList[i].tableType;
				        					obj.tableName=fieldList[i].tableName;
				        					break;
				        				}
				        			}
				        			
				        			alert1(obj);
				        			
				        			if(fieldTypeMap[obj.fieldName]=='date')
				        			{
				        				if(typeof(obj.ruleValue)!='string')
				        					obj.ruleValue=obj.ruleValue.format('Y-m-d');
				        			}
				        			
				        			saveList.push(obj);
				        		}
				        		
				        		advancedQueryService.saveQueryProject(functionId,name,Ext.JSON.encode(saveList),function(b)
				        		{
				        			me.getEm().setTitle('条件过滤                 方案:'+name);
				        			Ext.alert('已保存');
				        		});
							}
						});	
		        	}
		        },
		        '-',
		        completeButton,
		        '-']
		    });
			
		    //----------------------------------------------
		    mainPanel=new Ext.Window(
		    {
		        id:id,
		        title:'条件过滤',
		        //renderTo:document.body,
		        modal:true,
		        width:width,
		        height:500,
		        autoHeight:true,
		 		border:true,
		 		closeAction:'hide',
	            resizable:false,
	            listeners:{"hide":function(){
					completeButtonHandler();
					if(grid.getStore().getRange().length==0)
					eval(id).getEm().setTitle('条件过滤');
				}},
				items:[
					grid
				]
		    });
		    
		    grid.on('beforeedit',function(_e)
			{
				if(_e.field=='ruleValue')
				{
					var fieldName=_e.record.get('fieldName');
					if(fieldName)
					{
						if(fieldTypeMap[fieldName]=='char')
						{
							_e.grid.getColumnModel().setEditor(_e.grid.getColumnModel().findColumnIndex('ruleValue'),(charEditor));
						}
						else if(fieldTypeMap[fieldName]=='number')
						{
							_e.grid.getColumnModel().setEditor(_e.grid.getColumnModel().findColumnIndex('ruleValue'),(numberEditor));
						}
						else if(fieldTypeMap[fieldName]=='date')
						{
							_e.grid.getColumnModel().setEditor(_e.grid.getColumnModel().findColumnIndex('ruleValue'),(dateEditor));
						}
					}
					else
					{
						return false;
					}
				}
				
				return true;
			});
		},
		loadAreaConfig:function()
		{
			
		},
		plug:function(listArea)
		{
			if(listArea.getXType()!='listarea')
			{
				alert('QuickView is only for listarea');
				return;
			}
			
			listArea.showAdQueryButton.show();
			
			listArea.regPlugin(this.getXType(),this);
		},
		removeSignedRecord:function()
		{
			var record=sm.getSelected();
			
			if(record)
			{
				store.remove(record);
			}
			else
			{
				Ext.alert('没有选定记录');
			}
		},
		setCompleteFunction:function(h)
		{
			completeButtonHandler=h;
			//completeButton.setHandler(h);
		},
		setQueryData:function(queryData)
		{
			joinFields=queryData.joinFields;
			fieldList=queryData.fieldList;
			
			for(var i=0;i<fieldList.length;++i)
			{
				var l=[];
				l.push(fieldList[i].fieldText);
				l.push(fieldList[i].fieldName);
				
				fieldStoreData.push(l);
				fieldNameMap[fieldList[i].fieldName]=fieldList[i].fieldText;
				fieldTypeMap[fieldList[i].fieldName]=fieldList[i].fieldType;
				fieldTableTypeMap[fieldList[i].fieldName]=fieldList[i].tableType;
			}
			
			fieldStore.loadData(fieldStoreData);
		},
		setHeight:function(_height)
		{
			height=_height;
		},
		setPageUnit:function(_pageUnit)
		{
			pageUnit=_pageUnit;
		},
		setWidth:function(_width)
		{
			width=_width;
		},
		show:function()
		{
			mainPanel.show();
		}
    };
}
//----------------------------------------------------------------------------