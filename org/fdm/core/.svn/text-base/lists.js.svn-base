function SelectAreaUnit(_id) {
    var id = _id;
    var fid = functionId;
    var mainPanel = null;
    var topPanel = null;
    var queryPanel = new Ext.Panel();
    queryPanel.hide();
    var sumPanel = new Ext.Panel({
    	region: 'south'
    });
    sumPanel.hide();
    var sm = null;
    var cm = null;
    var store = null;
    var fields = null;
    var grid = null;
    var cmConfig = null;
    var currentPageField = null;
    var pageCountField = null;
    var pageSizeField = null;
    var configXML = null;
    var pageSize = 16;
    var queryFunction = null;
    var pageUnit = null;
    var oldPageParam = '';
    var title = '';
    var width = 700;
    var height = 465;
    var callback = null;
    var selectMode = null;
    var selectEvent = null;
    var otherConditions = ' 4=4 ';
    var srcContainer = null;
    var selectedObjects = null;
    var pks = null;
    var addList = [];
    var removeList = [];
    var selectedHids = {};
    var selectedIndex = {};
    var selectedList = [];
    var orderField = null;
    var orderDir = 'ASC';
    var effectiveCmConfig = null;
    
    return {
        queryFields: [],
        addToQueryPanel: function(p, layCfg) {
            if (queryPanel.hidden) {
                queryPanel.show();
            }
            if (p instanceof Array) {
                if (!layCfg) {
                    layCfg = {
                    		labelWidth: 60,
                        fieldsPerRow: 4
                    };

                } else
                {
                    if (!layCfg.labelWidth) {
                        layCfg.labelWidth = 60;

                    }
                    if (!layCfg.fieldsPerRow) {
                        layCfg.fieldsPerRow = 4;

                    }
                }
                var i = 0;
                while (i < p.length) {
                    var j = 0;
                    var row = new Ext.Panel({xtype: 'fieldcontainer',
                    	 layout: 'column',
                    	 border:false,
                    	 height: 32,
                    	 defaults:{
                      	margin: "5 5 5 5", 
                      	labelAlign:"right",
                      	 labelWidth: layCfg.labelWidth,
                      	columnWidth: 1/layCfg.fieldsPerRow
                    }});
                    while (j < layCfg.fieldsPerRow) {
                        if (i == p.length) {
                            break;
                        }
                        this.queryFields[p[i].name] =row.add(p[i]);
                        j++;
                        i++;
                    }
                    
                    queryPanel.add(row);
                }

            } else
            {
                queryPanel.add(p);
            }
        },
        addToSumPanel: function(p) {
            sumPanel.show();
            return sumPanel.add(p);

        },
        clean: function() {
            store.removeAll();
            if (currentPageField != null) {
                currentPageField.setValue(0);
                pageCountField.setValue(0);

            }
            var i = 0;
            var textFields = queryPanel.query('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].setValue('');

            }
            var hiddenFields = queryPanel.query('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                hiddenFields[i].setValue('');

            }
            var numberFields = queryPanel.query('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].setValue('');

            }
            var dateFields = queryPanel.query('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].setValue('');

            }
            var combos = queryPanel.query('combo');
            for (i = 0; i < combos.length; ++i) {
                combos[i].setValue('');

            }
            var triggers = queryPanel.query('trigger');
            for (i = 0; i < triggers.length; ++i) {
                triggers[i].setValue('');

            }
            if (orderDir) {
                orderField = null;
                orderDir = null;

            }
            var selectAllCheckbox = Ext.fly(id + '_SELECT_ALL');
            if (selectAllCheckbox) {
                selectAllCheckbox.dom.checked = false;

            }

        },
        cleanSelected: function() {
            addList = [];
            removeList = [];
            selectedHids = {};

        },
        findById: function(_id) {
            return mainPanel.findById(_id);

        },
        getAreaInfo: function() {
            var areaInfo = {};
            areaInfo.currentPage = 0;
            areaInfo.pageSize = pageSize;
            areaInfo.orderField = orderField;
            areaInfo.orderDir = orderDir;
            areaInfo.queryCondition = ' 2=2';
            var i = 0;
            var textFields = queryPanel.query('textfield');
            for (; i < textFields.length; ++i) {
                var value = textFields[i].getValue();
                if (value != '' && value != null) {
                    var name = textFields[i].getName();
                    var rule = textFields[i].rule;
                    var owner = textFields[i].owner;
                    areaInfo.queryCondition += (' and ' + revokeRule(name,value,rule,owner));
                }

            }
            
            if (currentPageField != null) {
                areaInfo.currentPage = currentPageField.getValue();
                areaInfo.pageSize = pageSizeField.getValue();

            }
            areaInfo.areaId = id;
            areaInfo.functionId = fid;
            areaInfo.functionProgParam = functionProgParam;
            return areaInfo;

        },
        getButtonBar: function() {
            return topPanel.getDockedItems()[0];

        },
        getEm: function() {
            return mainPanel;

        },
        getGrid: function() {
            return grid;

        },
        
        getId: function() {
            return id;

        },
        getOtherConditions: function() {
            return otherConditions;

        },
        getPageParam: function() {
            if (pageUnit == null) {
                alert('nerver add to any PageUnit');
                return '';

            } else
            {
                return pageUnit.getPageParam();

            }

        },
        getSelected: function() {
        	var selectedVOs = [];
            var records = sm.getSelection();
            for (var i = 0; i < records.length; ++i) {
                selectedVOs.push(records[i].data);

            }
            return selectedVOs;
        },
        getSelections: function() {
            return sm.getSelections();

        },
        getWidth: function() {
            return width;

        },
        getXType: function() {
            return 'selectarea';

        },
        init: function() {
        	me = this;
        	sm = Ext.create('Ext.selection.CheckboxModel');
            if (cmConfig === null) {
                alert('cm is null');
                return;

            }
            store = Ext.create('Ext.data.Store',{
    			fields:fields
    	    });
            topPanel = new Ext.Panel({
                bodyStyle: 'border:0px',
                region: 'north', 
                tbar: ['-', {
                    text: '选定'

                },
                '-', {
                    text: '清空',
                    handler: function() {
                        if (callback != null) {
                            callback(new SiteTag(srcContainer), []);
                            mainPanel.ownerCt.hide();

                        }

                    }

                },
                '-', {
                    text: '关闭',
                    handler: function() {
                        mainPanel.ownerCt.hide();

                    }

                },
                '-', '->', {
                    icon: iconPath.save,
                    iconCls: 'border:0;',
                    listeners:{    
	                    "render":function(_this){_this.el.dom.getElementsByTagName('button')[0].title='保存我的设置';} ,
	                    "click":  function(_this){
		                    fieldsRanking=[];
   		
		    				var count=cm.getColumnCount();
		    		
		    				for(var i=0;i<count;++i)
				    		{
				    			var f=[];
				    			f.push(cm.getDataIndex(i));
				    			f.push(cm.getColumnWidth(i));
				    			
				    			fieldsRanking.push(f);
				    		}
				    		
				    		saveFieldsRanking(getPageURL(),id,'',fieldsRanking);
	                     }
	                }
                 	}, {
                    icon: iconPath.clean,
                    iconCls: 'border:0;',
                    listeners:{    
	                    "render":function(_this){_this.el.dom.getElementsByTagName('button')[0].title='重置我的设置';} ,
	                    "click":  function(_this){
		                   resetFieldsRanking(getPageURL(),id,'');
	                     }
	                }
                 	},
                 	'-',{
                    icon: iconPath.query,
                    iconCls: 'border:0;',
                    listeners:{    
	                    "render":function(_this){_this.el.dom.getElementsByTagName('button')[0].title='查询';} ,
	                    "click":  function(_this){if (typeof(queryFunction) == 'function') {
	                            queryFunction();
	
	                        }
	                     }
	                }
                 	},
                	{
                    icon: iconPath.reset,
                    iconCls: 'border:0;',
                    qtip : '查询',
                    listeners:{    
	                    "render":function(_this){_this.el.dom.getElementsByTagName('button')[0].title='重置';} ,
	                    "click":  function(_this){
	                    	me.clean();
	                        if (typeof(queryFunction) == 'function') {
	                            queryFunction();
	
	                        }
						}
					}
                }]

            });
            topPanel.add(queryPanel);
            grid = new Ext.grid.Panel({
            	id: fid + '__' + id + '__grid',
            	height:height,
            	region: 'center',
                store: store,
                columns: cmConfig,
                selModel: sm,
                stripeRows: true,
                frame: true,
                bbar:[{
                    xtype: 'toolbar',
                    border: false,
                    items: ['']
                }]
            });
            mainPanel = new Ext.Panel({
                //id: id,
                title: '',
                width: width,
                height:height,
                layout: 'border',
                //autoHeight: true,
                items: [topPanel, grid, sumPanel]

            });
            mainPanel.on('activate', function() {
            	var columns = grid.query('headercontainer')[0].getGridColumns();
            	if(selectMode== 'SINGLE')
            		columns[0].hide();

            });
            var i = 0;
            var textFields = queryPanel.query('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var numberFields = queryPanel.query('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var dateFields = queryPanel.query('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var triggerFields = queryPanel.query('trigger');
            for (i = 0; i < triggerFields.length; ++i) {
                triggerFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var timeFields = queryPanel.query('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                timeFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            grid.getStore().on('update', 
            function(_grid, _record, _operation) {
                if (selectMode == 'SINGLE') {
                    callback(new SiteTag(srcContainer), [_record.data]);
                    mainPanel.ownerCt.hide();
                    return;

                } else if (selectMode == 'COMPLEX') {
                    var obj = _record.data;
                    if (obj.isSelect) {
                        if (!selectedHids[obj.hid]) {
                            addList.push(obj);

                        } else
                        {
                            for (var i = 0; i < removeList.length; ++i) {
                                if (removeList[i].hid == obj.hid) {
                                    removeList.splice(i, 1);

                                }

                            }

                        }

                    } else
                    {
                        if (!selectedHids[obj.hid]) {
                            for (var i = 0; i < addList.length; ++i) {
                                if (addList[i].hid == obj.hid) {
                                    addList.splice(i, 1);

                                }

                            }

                        } else
                        {
                            removeList.push(obj);

                        }

                    }

                }
				
            });

        },
        loadAreaConfig: function() {
        	me = this;
        	var buttons = topPanel.getDockedItems()[0];
        	fieldsRanking=getFieldRanking(getPageURL(),id,'');;
				
				if(fieldsRanking!=null)
				{
					effectiveCmConfig=[];
					
					for(var i=0;i<fieldsRanking.length;++i)
					{
						for(var j=0;i<cmConfig.length;++j)
						{
							if(!cmConfig[j])
							{
								alert(SOC_MESSAGE.unknowRankingConfig);
								break;
							}
							if(fieldsRanking[i][0]==cmConfig[j].dataIndex)
							{
								effectiveCmConfig.push(cmConfig[j]);
								effectiveCmConfig[effectiveCmConfig.length-1].width=fieldsRanking[i][1];
								break;
							}
						}
					}
					
					 grid.reconfigure(store, effectiveCmConfig);
				}
				else
				{
					effectiveCmConfig=cmConfig;
				}
            if (selectEvent != null) {
                var el = selectEvent.getTarget();
                var tid = el.id;
                while (tid.indexOf('__grid') == -1 && tid.indexOf('__data') == -1 && tid.indexOf('__query') == -1) {
                    el = el.parentNode;
                    tid = el.id;

                }
                for (var k in appPages) {
                    srcContainer = appPages[k].getEm().findById(tid);
                    if (srcContainer != null) {
                        break;

                    }

                }
                if (srcContainer == null) {
                    for (var k in appWindows) {
                        srcContainer = appWindows[k].getEm().findById(tid);
                        if (srcContainer != null) {
                            break;

                        }

                    }

                }

            }
            this.siteTag = new SiteTag(srcContainer);
            var _this = this;
            if (selectMode == 'SINGLE') {
            	buttons.getComponent(1).setHandler(function() {
                    var list = _this.getSelected();
                    if (list.length == 0) {
                        Ext.alert(SOC_MESSAGE.noSignedRecord);

                    } else
                    {
                        callback(_this.siteTag, list);
                        mainPanel.ownerCt.hide();

                    }

                });
            	topPanel.getDockedItems()[0].getComponent(2).show();
            	topPanel.getDockedItems()[0].getComponent(3).show();
            	if (!grid.hasListener('itemdblclick')) {
                    grid.on('itemdblclick', 
                    function(_grid, _rowIndex, _columnIndex, _e) {
                    	var list = _this.getSelected();
                        if (list.length == 0) {
                            Ext.alert(SOC_MESSAGE.noSignedRecord);

                        } else
                        {
                            callback(_this.siteTag, list);
                            mainPanel.ownerCt.hide();

                        }

                    });

                }

            }else if (selectMode == 'COMPLEX') {
                addList = [];
                removeList = [];
                selectedHids = {};
                buttons.getComponent(1).setHandler(function() {
                	var sl = me.getSelected();
                	for (var i = 0; i < sl.length; ++i) {
                    	for (var k in selectedList) {
                        	if(sl[i].hid==selectedList[k].hid){
                        		sl.splice(i,1);
                        		selectedList.splice(k,1);
                        		break;
                        	}
                        }
                    }
	                	addList=sl;
	                	removeList=selectedList;
                    callback(_this.siteTag, addList, removeList);
                    mainPanel.ownerCt.hide();

                });
                buttons.getComponent(2).hide();
                buttons.getComponent(3).hide();

            }

        },
        refreshFor: function(_queryFunction) {
            queryFunction = _queryFunction;
            var pagingToolbar = grid.getDockedItems()[1];
            pagingToolbar.add('-');
            pagingToolbar.add({
                tooltip: '第一页',
                iconCls: "x-tbar-page-first",
                handler: function() {
                    if (currentPageField.getValue() > 1) {
                        currentPageField.setValue(1);
                        queryFunction();

                    }

                }

            });
            pagingToolbar.add({
                tooltip: '上一页',
                iconCls: "x-tbar-page-prev",
                handler: function() {
                    if (currentPageField.getValue() > 1) {
                        currentPageField.setValue(currentPageField.getValue() - 1);
                        queryFunction();

                    }

                }

            });
            currentPageField = new Ext.form.NumberField({
                minValue: 0,
                allowBlank: false,
                allowNegative: false,
                hideTrigger: true,
                allowDecimals: false

            });
            currentPageField.setWidth(28);
            currentPageField.setValue(0);
            currentPageField.on('specialkey', 
            function(_this, _e) {
                if (_e.getKey() == 13) {
                    queryFunction();

                }

            });
            pagingToolbar.add(currentPageField);
            pagingToolbar.add('/');
            pageCountField = new Ext.form.NumberField({
            	hideTrigger: true
            });
            pageCountField.setWidth(28);
            pageCountField.setValue(0);
            pageCountField.disable();
            pagingToolbar.add(pageCountField);
            pagingToolbar.add({
                tooltip: '下一页',
                iconCls: "x-tbar-page-next",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(currentPageField.getValue() + 1);
                        queryFunction();

                    }

                }

            });
            pagingToolbar.add({
                tooltip: '最后页',
                iconCls: "x-tbar-page-last",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(pageCountField.getValue());
                        queryFunction();

                    }

                }

            });
            pagingToolbar.add('-');
            pagingToolbar.add('每页');
            pageSizeField = new Ext.form.NumberField({
                minValue: 0,
                allowBlank: false,
                hideTrigger: true,
                allowNegative: false,
                allowDecimals: false

            });
            pageSizeField.setWidth(28);
            pagingToolbar.add(pageSizeField);
            pagingToolbar.add('行');
            pagingToolbar.add('-');
            pageSizeField.setValue(pageSize);
            pageSizeField.on('specialkey', 
            function(_this, _e) {
                if (_e.getKey() == 13) {
                    queryFunction();

                }

            });
            grid.on('headerclick', 
            function(g, _columnIndex) {
                if (effectiveCmConfig == null) {
                    effectiveCmConfig = cmConfig;

                }
                if (g.getColumnModel().getColumnId(_columnIndex) == 'isSelect') {
                    return;

                }
                if (effectiveCmConfig[_columnIndex].sort) {
                    var owner = '_t1';
                    if (effectiveCmConfig[_columnIndex].owner) {
                        owner = effectiveCmConfig[_columnIndex].owner;

                    }
                    if (!effectiveCmConfig[_columnIndex].dir) {
                        effectiveCmConfig[_columnIndex].dir = 'ASC';

                    } else if (effectiveCmConfig[_columnIndex].dir == 'ASC') {
                        effectiveCmConfig[_columnIndex].dir = 'DESC';

                    } else
                    {
                        effectiveCmConfig[_columnIndex].dir = 'ASC';

                    }
                    orderField = owner + '.' + effectiveCmConfig[_columnIndex].dataIndex;
                    orderDir = effectiveCmConfig[_columnIndex].dir;
                    var sc = grid.getView().sortClasses;
                    var hds = grid.getView().mainHd.select('td').removeClass(sc);
                    hds.item(_columnIndex).addClass(sc[orderDir == "DESC" ? 1: 0]);
                    queryFunction();

                }

            });

        },
        setCallBack: function(_f) {
            callback = _f;

        },
        setCm: function(_config) {
        	cmConfig = _config;
            fields=['hid'];
            Ext.each(cmConfig,function(item){
            	fields.push(item.dataIndex);
    		});

        },
        setHeight: function(_height) {
            height = _height;

        },
        setOtherConditions: function(_con) {
            if (_con) {
                otherConditions = _con;

            } else
            {
                otherConditions = ' 4=4 ';

            }

        },
        setPageSize: function(_pageSize) {
            pageSize = _pageSize;

        },
        setPageUnit: function(_pageUnit) {
            pageUnit = _pageUnit;

        },
        setSelected: function(_selected, _pks) {
            if (_selected) {
                if (typeof(_selected) == 'string') {
                    selectedObjects = _selected.split(',');

                } else if (_selected instanceof Array) {
                    selectedObjects = _selected;

                }
                if (!_pks) {
                    alert('unknow pkField(s)');
                    pks = 'NON_FIELD_NAME';

                } else
                {
                    pks = _pks;

                }

            } else
            {
                selectedObjects = [];

            }

        },
        setSelectEvent: function(e) {
            selectEvent = e;

        },
        setSelectMode: function(m) {
            selectMode = m;

        },
        setStore: function(_config) {
            alert('please remove setStore of ' + id);

        },
        setTitle: function(_title) {
            title = _title;

        },
        showViewData: function(viewData) {
        	eval('grid.getView().scrollToTop()');
            selectedIndex={};
            selectedList=[];
            store.removeAll();
            if (!viewData.isSucceed) {
                reLogin();
                return;

            }
            store.removeAll();
            if (currentPageField != null) {
                currentPageField.setValue(viewData.currentPage);
                pageCountField.setValue(viewData.pageCount);

            }
            var selectedObjectType = null;
            if (selectedObjects && selectedObjects.length > 0) {
                selectedObjectType = typeof(selectedObjects[0]);

            }
            var singlePK = true;
            if (pks instanceof Array) {
                singlePK = false;

            }
            var list = viewData.resultList;
            for (var i = 0; i < list.length; ++i) {
                list[i].isSelect = false;
                list[i].isChecked = false;
                if (selectedHids[list[i].hid] === true) {
                    var findItInRemoveList = false;
                    for (var p = 0; p < removeList.length; ++p) {
                        if (removeList[p].hid == list[i].hid) {
                            findItInRemoveList = true;
                            break;

                        }

                    }
                    if (!findItInRemoveList) {
                        list[i].isSelect = true;

                    }

                } else if (selectedHids[list[i].hid] === false) {
                    var findItInAddList = false;
                    for (var p = 0; p < addList.length; ++p) {
                        if (addList[p].hid == list[i].hid) {
                            list[i].isSelect = true;
                            break;

                        }

                    }

                } else
                {
                    selectedHids[list[i].hid] = false;
                    if (selectedObjectType == 'object') {
                        if (singlePK) {
                            for (var j = 0; j < selectedObjects.length; ++j) {
                                if (selectedObjects[j][pks] == list[i][pks]) {
                                	selectedIndex[i] = list[i];
                                	selectedList.push(list[i]);
                                    break;

                                }

                            }

                        } else
                        {
                            for (var j = 0; j < selectedObjects.length; ++j) {
                                var allEquals = true;
                                for (var k = 0; k < pks.length && allEquals; ++k) {
                                    allEquals = allEquals && (selectedObjects[j][pks[k]] == list[i][pks[k]])

                                }
                                if (allEquals) {
                                	selectedIndex[i] = list[i];
                                	selectedList.push(list[i]);
                                    break;

                                }

                            }

                        }

                    } else if (selectedObjectType == 'string') {
                        if (singlePK) {
                            for (var j = 0; j < selectedObjects.length; ++j) {
                            	if (selectedObjects[j] == list[i][pks]) {
                            		selectedIndex[i] = list[i];
                            		selectedList.push(list[i]);
                                    break;

                                }

                            }

                        } else
                        {
                            alert('selectedObject is string,but has more than one pk field');

                        }

                    }

                }
            }
            store.loadData(viewData.resultList);
            for (var k in selectedIndex) {
            	sm.select(parseInt(k),true);
            }
            modifiedFlag = false;
        },
        setWidth: function(_width) {
            width = _width;

        }

    };

}

