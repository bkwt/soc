function TreeAreaUnit(_id) {   
    var id = _id;
    var fid = functionId;
    var mainPanel = null;
    var treePanel = null;
    var grid = null;
    var topPanel = null;
    var queryPanel = new Ext.Panel({
        id: fid+'__'+id + '__query'
     });
     queryPanel.hide();
    var sumPanel = new Ext.Panel({
    	region: 'south',
        autoHeight: true,
        layout: 'table',
        baseCls: 'x-panel-mc'
    });
    sumPanel.hide();
    var store = null;
    var fields = null;
    var cellEditing = null;
    var root = null;
    var rootId = "root";
    var rootText = 'SOC';
    var rootVisible = true;
    var pageUnit = null;
    var title = '';
    var width = 790;
    var height = 510;
    var cmConfig = null;
    var effectiveCmConfig = null;
    var fieldsRanking = null;
    var expandFunction = null;
    var queryFunction = null;
    var orderField = null;
    var orderDir = 'ASC';
    var selectLeafOnlyFlag = true;
    var cm = null;
    var sm = null;
    var currentPageField = null;
    var pageCountField = null;
    var pageSizeField = null;
    var pageSize = 20;
    var oldPageParam = '';
    var configXML = null;
    var queryPanelExpendButton = null;
    var saveFieldsRankingButton = null;
    var resetFieldsRankingButton = null;
    var queryButton = null;
    var resetButton = null;
    var selectPK = 'root';
    var checkColumn = null;
    var plugins = {};
    var modifiedFlag = false;
    return {
        queryFields: [],
        editors: [],
        addNode: function(pid, obj) {
        	var node = treePanel.getStore().getNodeById(pid);
        	if(node.get('leaf') == true){
        		node.parentNode.replaceChild({id:node.get('id'),text:node.get('text'),leaf:false},node);
        	}if(!node.hasChildNodes())
        			return;
            var newNode = treePanel.getStore().getNodeById(pid).appendChild(obj);
            
            newNode.on('beforeexpand', 
            function(_this, _deep, _anim) {
                if (_this.childNodes.length == 0) {
                    expandFunction(_this.id)
                }
                return true
            });
            newNode.on('click', 
            function(_this) {
                selectPK = _this.id;
                queryFunction(selectPK)
            });
            newNode.on('itemdblclick', 
            function(_this) {
                if (_this.childNodes.length == 0) {
                    _this.expand()
                }
                return true
            });
            return newNode
        },
        addRecord: function(obj) {
            obj.hid = null;
            obj.isSelect = false;
            var r = new Ext.data.Record(obj, null);
            store.addSorted(r)
        },
        addToSumPanel: function(p) {
            sumPanel.show();
            return sumPanel.add(p)
        },
        checkAll: function(_checkbox) {
            var rs = store.getRange();
            for (var i = 0; i < rs.length; ++i) {
                rs[i].set('isSelect', _checkbox.checked)
            }
        },
        checkFields: function(recordAll) {
            if (!this.needCheckFields) {
                this.needCheckFields = {};
                for (var i = 0; i < cm.getColumnCount(); ++i) {
                    var oneCm = cm.getColumnById(cm.getColumnId(i));
                    if (oneCm && oneCm.editor != null) {
                        if (oneCm.editor.field.allowBlank == false) {
                            this.needCheckFields[oneCm.dataIndex] = i + 1
                        }
                    }
                }
            }
            grid.stopEditing();
            var records = store.getRange();
            if (recordAll) {} else {
                rs = [];
                for (var i = 0; i < records.length; ++i) {
                    if (records[i].data.isSelect) {
                        rs.push(records[i])
                    }
                }
                records = rs
            }
            for (var i = 0; i < records.length; ++i) {
                if (records[i].data != null) {
                    for (var k in this.needCheckFields) {
                        if (this.needCheckFields[k] && ((records[i].data)[k] === '' || (records[i].data)[k] === null || (records[i].data)[k] === undefined)) {
                            sm.selectRow(store.indexOf(records[i]));
                            grid.startEditing(store.indexOf(records[i]), this.needCheckFields[k] - 1);
                            return false
                        }
                    }
                }
            }
            return true
        },
        addToQueryPanel: function(p, layCfg) {
            if (queryPanel.hidden) {
                queryPanel.show();
            }
            if (p instanceof Array) {
                if (!layCfg) {
                    layCfg = {
                        labelRate: 60,
                        fieldsPerRow: 4
                    };

                } else
                {
                    if (!layCfg.labelRate) {
                        layCfg.labelRate = 60;

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
                      	 labelWidth: layCfg.labelRate,
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
        clean: function(isCleanRecords) {
            if (isCleanRecords === undefined) {
                isCleanRecords = true
            }
            if (isCleanRecords === true) {
                store.removeAll()
            }
            if (orderDir) {
                var sc = grid.getView().sortClasses;
                //grid.getView().mainHd.select('td').removeClass(sc);
                orderField = null;
                orderDir = null
            }
            if (currentPageField != null) {
                currentPageField.setValue(0);
                pageCountField.setValue(0)
            }
            var i = 0;
            var textFields = queryPanel.query('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].setValue('')
            }
            var hiddenFields = queryPanel.query('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                hiddenFields[i].setValue('')
            }
            var numberFields = queryPanel.query('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].setValue('')
            }
            var dateFields = queryPanel.query('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].setValue('')
            }
            var combos = queryPanel.query('combo');
            for (i = 0; i < combos.length; ++i) {
                combos[i].setValue('')
            }
            var triggers = queryPanel.query('trigger');
            for (i = 0; i < triggers.length; ++i) {
                triggers[i].setValue('')
            }
            var selectAllCheckbox = Ext.fly(id + '_SELECT_ALL');
            if (selectAllCheckbox) {
                selectAllCheckbox.dom.checked = false
            }
        },
        cleanAll: function() {
            root.collapseChildNodes(false);
            root.expand(false, true);
            this.clean();
            selectPK = 'root';
            queryFunction(selectPK)
        },
        findById: function(_id) {
            return mainPanel.findById(_id)
        },
        getEm: function() {
            return mainPanel
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
            
            if (this.tether) {
                var _tether = this.tether;
                _tether = _tether.replace('@userID@', getUserSession().userID);
                _tether = _tether.replace('@orgzCode@', getUserSession().orgzCode);
                _tether = _tether.replace('@posCode@', getUserSession().posCode);
                areaInfo.queryCondition += (' and ' + _tether)
            }
            if (currentPageField != null) {
                areaInfo.currentPage = currentPageField.getValue();
                areaInfo.pageSize = pageSizeField.getValue()
            }
            areaInfo.areaId = id;
            areaInfo.functionId = fid;
            areaInfo.functionProgParam = functionProgParam;
            return areaInfo
        },
        getGrid: function() {
            return grid
        },
        getId: function() {
            return id
        },
        getPageParam: function() {
            if (pageUnit == null) {
                alert('nerver add to any PageUnit');
                return ''
            } else {
                return pageUnit.getPageParam()
            }
        },
        getRootNode: function() {
            return root
        },
        getSelected: function() {
            var selectedVOs = [];
            var records = sm.getSelection(); 
            for (var i = 0; i < records.length; ++i) {
            	var obj = {};
            	for (var k in records[i].data) {
                        var d = (records[i].data)[k];
                        if (d == '' && typeof d == 'string') {
                            d = null;

                        }
                        obj[k] = d;

                    }
                    selectedVOs.push(obj);
                
            }
            return selectedVOs;
        },
        getAllObjects: function() {
            var list = [];
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
                for (var k in records[i].data) {
                    var d = (records[i].data)[k];
                    if (d == '' && typeof d == 'string') { (records[i].data)[k] = null
                    }
                }
                list.push(records[i].data)
            }
            return list
        },
        getSelections: function() {
            return sm.getSelections()
        },
        getSigned: function() {
        	var record=sm.getLastSelected();
            if (record) {
                var obj = {};
                for (var k in record.data) {
                    var d = (record.data)[k];
                    if (d == '' && typeof d == 'string') {
                        d = null
                    }
                    obj[k] = d
                }
                return obj
            } else return null
        },
        getTree: function() {
            return treePanel
        },
        getWidth: function() {
            return width
        },
        getXType: function() {
            return 'selectTreeArea'
        },
        init: function() {
        	me = this;
        	sm = Ext.create('Ext.selection.CheckboxModel');
            if (cmConfig == null) {
                alert('cmConfig is null');
                return
            }
            
            queryPanelExpendButton = new Ext.Button({
                icon: iconPath.collapse,
                iconCls: 'border:0;',
                handler: function() {
                    if (this.icon == iconPath.expand) {
                    	queryPanel.hide();
                        this.icon = iconPath.collapse;
                        this.setIcon(iconPath.collapse);
                    } else {
                    	queryPanel.show();
                        this.icon = iconPath.expand;
                        this.setIcon(iconPath.expand);
                    }
                }
            });
            queryPanelExpendButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '开关查询面板'
            });
            saveFieldsRankingButton = new Ext.Button({
                icon: iconPath.save,
                iconCls: 'border:0;',
                handler: function() {
                    fieldsRanking = [];
                    var count = cm.getColumnCount();
                    for (var i = 0; i < count; ++i) {
                        var f = [];
                        f.push(cm.getDataIndex(i));
                        f.push(cm.getColumnWidth(i));
                        fieldsRanking.push(f)
                    }
                    saveFieldsRanking(getPageURL(), id, eval(id).getPageParam(), fieldsRanking)
                }
            });
            saveFieldsRankingButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '保存我的设置'
            });
            resetFieldsRankingButton = new Ext.Button({
                icon: iconPath.clean,
                iconCls: 'border:0;',
                handler: function() {
                    resetFieldsRanking(getPageURL(), id, eval(id).getPageParam())
                }
            });
            resetFieldsRankingButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '重置我的设置'
            });
            queryButton = new Ext.Button({
                icon: iconPath.query,
                iconCls: 'border:0;',
                handler: function() {
                    if (typeof(queryFunction) == 'function') {
                        queryFunction(selectPK)
                    }
                }
            });
            queryButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '查询'
            });
            resetButton = new Ext.Button({
                icon: iconPath.reset,
                iconCls: 'border:0;',
                handler: function() {
                    if (queryFunction == me.focusRecord) {
                    	me.clean(false)
                    } else {
                    	me.clean();
                        queryFunction(selectPK)
                    }
                }
            });
            resetButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '重置'
            });
            topPanel = new Ext.Panel({
            	region: 'north', 
                bodyStyle: 'border:0px',
                autoHeight: true,
                tbar: ['-', {
                    text: 'button1',
                    icon:iconPath.add,
                    hidden: true
                },
                '-', {
                    text: 'button2',
                    icon:iconPath.add,
                    hidden: true
                },
                '-', {
                    text: 'button3',
                    icon:iconPath.add,
                    hidden: true
                },
                '-', {
                    text: 'button4',
                    icon:iconPath.add,
                    hidden: true
                },
                '-', {
                    text: 'button5',
                    icon:iconPath.add,
                    hidden: true
                },
                '-', {
                    text: 'button6',
                    hidden: true
                },
                '-', {
                    text: 'button7',
                    hidden: true
                },
                '-', {
                    text: 'button8',
                    hidden: true
                },
                '->', '-', queryPanelExpendButton, '-', saveFieldsRankingButton, resetFieldsRankingButton, '-', queryButton, resetButton, '-']
            });
            if (queryPanel.hidden) {
                queryPanelExpendButton.hide();

            }else{
            	topPanel.add(queryPanel);
            	queryPanel.hide();
            }
            
            cellEditing = Ext.create('Ext.grid.plugin.CellEditing',{
            	clicksToEdit: 1
             });
            
            
            treePanel = new Ext.tree.Panel({
                //id: '__tree',
            	region: 'west',
                split: true,
                autoScroll: true,
                containerScroll: true,
                //rootVisible: rootVisible,
                rootVisible: false,
                border : false, 
                width : 212, 
                //collapsible : true, 
                store : Ext.create('Ext.data.TreeStore',{
                	fields:['id','text'],
                	root:{id:'root',text:'SOC'}
                })
            });
            
            store = Ext.create('Ext.data.Store',{
    			fields:fields,
    			listeners:{ add:function(store,record){ 
					        	modifiedFlag = true;
					        },
    				        update:function(store,record){ 
    				        	modifiedFlag = true;
    				        },remove:function(store,record){ 
    				        	modifiedFlag = true;
    				        }
    			}
    	    });
            grid = new Ext.grid.Panel({
                //id: 'tree__grid',
            	region: 'center',
                store: store,
                columns: cmConfig,
                selModel: sm,
                stripeRows: true,
                frame: true,
                border: false,
                //bbar: [],
                clicksToEdit: 1,
                plugins: [cellEditing],
                bbar:[{
                    xtype: 'toolbar',
                    border: false,
                    items: ['']
                }]
            });
            mainPanel = new Ext.Panel({
                //id: id,
                title: title,
                layout: 'border',
                border: false,
                header: false,
                items: [treePanel,topPanel, grid, sumPanel]
            });
            
            mainPanel.on('show', 
            function() {
                grid.getView().refresh()
            });
            store.on('add', 
            function() {
                modifiedFlag = true
            });
            store.on('remove', 
            function() {
                modifiedFlag = true
            });
            store.on('update', 
            function() {
                modifiedFlag = true
            });
            var i = 0;
            var textFields = queryPanel.query('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK)
                    }
                })
            }
            var numberFields = queryPanel.query('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK)
                    }
                })
            }
            var dateFields = queryPanel.query('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK)
                    }
                })
            }
            var triggerFields = queryPanel.query('trigger');
            for (i = 0; i < triggerFields.length; ++i) {
                triggerFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK)
                    }
                })
            }
        },
        loadAreaConfig: function() {
            if (oldPageParam != this.getPageParam()) {
                fieldsRanking = getFieldRanking(getPageURL(), id, this.getPageParam());
                if (fieldsRanking != null) {
                    effectiveCmConfig = [];
                    for (var i = 0; i < fieldsRanking.length; ++i) {
                        for (var j = 0; i < cmConfig.length; ++j) {
                            if (!cmConfig[j]) {
                                alert(SOC_MESSAGE.unknowRankingConfig);
                                break
                            }
                            if (fieldsRanking[i][0] == cmConfig[j].dataIndex) {
                                effectiveCmConfig.push(cmConfig[j]);
                                effectiveCmConfig[effectiveCmConfig.length - 1].width = fieldsRanking[i][1];
                                break
                            }
                        }
                    }
                    cm = new Ext.grid.ColumnModel(effectiveCmConfig);
                    grid.reconfigure(store, cm)
                } else {
                    effectiveCmConfig = cmConfig
                }
            }
            if (configXML == null) {
                if (AppConfig[fid] != null) {
                    var areas = AppConfig[fid].getElementsByTagName('Area');
                    for (var i = 0; i < areas.length; ++i) {
                        if (areas[i].getAttribute('id') == this.getId()) {
                            if (areas[i].getAttribute('type') == 'TreeAreaUnit') {
                                configXML = areas[i];
                                break
                            } else {
                                alert('unknow type :' + areas[i].getAttribute('type'));
                                return
                            }
                        }
                    }
                }
            }
            if (configXML == null) {
                return
            }
            if (oldPageParam != this.getPageParam()) {
                var buttonCount = 16;
                var buttons = topPanel.getDockedItems()[0];
                for (var i = 0; i < buttonCount; ++i) {
                    buttons.getComponent(i).hide()
                }
                var Cases = configXML.getElementsByTagName('Case');
                for (var j = 0; j < Cases.length; ++j) {
                    if (Cases[j].getAttribute('value') == this.getPageParam()) {
                        var Hide = Cases[j].getElementsByTagName('Hide');
                        if (Hide.length > 0 && Hide[0].childNodes[0].nodeValue == 'true') {
                            pageUnit.hideItem(mainPanel);
                            break
                        } else {
                            pageUnit.unhideItem(mainPanel)
                        }
                        grid.nonEditColumns = {};
                        grid.hiddenColumns = {};
                        var ColumnsTag = Cases[j].getElementsByTagName('Columns');
                        if (ColumnsTag.length > 0) {
                            ColumnsTag = ColumnsTag[0];
                            var Columns = ColumnsTag.getElementsByTagName('Column');
                            for (var i = 0; i < Columns.length; ++i) {
                                var Column = Columns[i];
                                var columnEdit = Column.getElementsByTagName('Cedit');
                                if (columnEdit.length > 0) {
                                    if (columnEdit[0].childNodes[0].nodeValue == 'false') {
                                        grid.nonEditColumns[Column.getAttribute('name')] = true
                                    }
                                }
                                var columnHide = Column.getElementsByTagName('Chide');
                                if (columnHide.length > 0) {
                                    if (columnHide[0].childNodes[0].nodeValue == 'true') {
                                        grid.hiddenColumns[Column.getAttribute('name')] = true
                                    }
                                }
                            }
                        }
                        for (var k in grid.hiddenColumns) {
                            if (grid.hiddenColumns[k]) {
                                var cIndex = grid.getColumnModel().findColumnIndex(k);
                                if (cIndex == -1) {
                                    alert('column' + k + 'not exists,please check cfg.xml.')
                                } else {
                                    grid.getColumnModel().setHidden(cIndex, true)
                                }
                            }
                        }
                        var Edit = Cases[j].getElementsByTagName('Edit');
                        if (Edit.length == 0) {
                            Edit = true
                        } else {
                            if (Edit[0].childNodes.length > 0) {
                                Edit = eval(Edit[0].childNodes[0].nodeValue)
                            } else {
                                Edit = false
                            }
                        }
                        if (grid.hasListener('beforeedit')) {
                            grid.un('beforeedit', 
                            function(e) {
                                if (grid.nonEditColumns[e.field]) {
                                    e.cancel = true;
                                    return
                                } else {
                                    return true
                                }
                            });
                            grid.un('beforeedit', 
                            function(e) {
                                e.cancel = true;
                                return
                            })
                        }
                        if (Edit) {
                            {
                                grid.on('beforeedit', 
                                function(e) {
                                    if (grid.nonEditColumns[e.field]) {
                                        e.cancel = true;
                                        return
                                    } else {
                                        return true
                                    }
                                })
                            }
                        } else {
                            grid.on('beforeedit', 
                            function(e) {
                                e.cancel = true;
                                return
                            })
                        }
                        var SelectAble = Cases[j].getElementsByTagName('SelectAble');
                        if (SelectAble.length > 0) {
                            if (SelectAble[0].childNodes.length > 0) {
                                SelectAble = eval(SelectAble[0].childNodes[0].nodeValue)
                            } else {
                                SelectAble = false
                            }
                        } else {
                            SelectAble = false
                        }
                        if (SelectAble) {
                        	sm.setSelectionMode('SIMPLE');
                        } else {
                        	sm.setSelectionMode('MULTI');
                        }
                        var Tether = Cases[j].getElementsByTagName('Tether');
                        if (Tether.length > 0) {
                            alert('dubug:please move Tether from cfg.xml to component.xml')
                        }
                        var NeedAuditPower = Cases[j].getElementsByTagName('NeedAuditPower');
                        if (NeedAuditPower.length > 0) {
                            alert('dubug:please move NeedAuditPower from cfg.xml to component.xml')
                        }
                        var PageSize = Cases[j].getElementsByTagName('PageSize');
                        if (PageSize.length > 0) {
                            pageSizeField.setValue(PageSize[0].childNodes[0].nodeValue)
                        }
                        var OperatersTag = Cases[j].getElementsByTagName('Operaters');
                        if (OperatersTag.length == 0) {
                            alert('can not find Operaters in cfg.xml');
                            return
                        }
                        OperatersTag = OperatersTag[0];
                        var operaters = OperatersTag.getElementsByTagName('Operater');
                        for (var i = 0; i < operaters.length; ++i) {
                            if (i == 8) {
                                alert('operaters full')
                            }
                            var Operater = operaters[i];
                            var text = Operater.getElementsByTagName('Text')[0].childNodes[0].nodeValue;
                            var method = Operater.getElementsByTagName('Method')[0].childNodes[0].nodeValue;
                            var constParam = '';
                            if (Operater.getElementsByTagName('ConstParam')[0].childNodes.length > 0) constParam = Operater.getElementsByTagName('ConstParam')[0].childNodes[0].nodeValue;
                            buttons.getComponent(i * 2).show();
                            buttons.getComponent(i * 2 + 1).setText(text);
                            if (method) {
                            	//eval('buttons.getComponent(' + (i * 2 + 1) + ').setHandler(function(){' + id + '.' + method + '(\'' + constParam + '\');});');
                            	eval('buttons.getComponent(' + (i * 2 + 1) + ').setHandler(function(){'+fid+'(\"' + id + '.' + method + '(\'' + constParam + '\');\");'+'});');
                                
                            }
                            buttons.getComponent(i * 2 + 1).show()
                        }
                        if (i > 0) {
                            buttons.getComponent(i * 2 + 2).show()
                        }
                        if (grid.hasListener('itemdblclick')) {
                            grid.events['itemdblclick'].clearListeners()
                        }
                        var DbClickOperater = OperatersTag.getElementsByTagName('DbClickOperater');
                        if (DbClickOperater.length > 0) {
                            DbClickOperater = DbClickOperater[0];
                            var method = DbClickOperater.getElementsByTagName('Method')[0].childNodes[0].nodeValue;
                            var constParam = '';
                            if (DbClickOperater.getElementsByTagName('ConstParam')[0].childNodes.length > 0) {
                                constParam = DbClickOperater.getElementsByTagName('ConstParam')[0].childNodes[0].nodeValue
                            }
                            eval('grid.on(\'itemdblclick\',function(){'+fid+'(\"' + id + '.' + method + '(\'' + constParam + '\');\");'+'});');
                            grid.on('mouseout', 
                            function(_e) {
                                if (!_e.getTarget().style.cursor) _e.getTarget().style.cursor = 'hand'
                            })
                        }
                        var Title = Cases[j].getElementsByTagName('Title');
                        if (Title.length > 0) {
                            Title = Title[0];
                            if (Title.childNodes.length > 0) {
                                mainPanel.setTitle(Title.childNodes[0].nodeValue);
                            }
                        }
                        var QueryAreaState = Cases[j].getElementsByTagName('QueryAreaState');
                        if (QueryAreaState.length > 0) {
                            QueryAreaState = QueryAreaState[0];
                            if (QueryAreaState.childNodes[0].nodeValue == 'EXPAND') {
                            	queryPanel.show();
                                queryPanelExpendButton.icon = iconPath.expand;
                                queryPanelExpendButton.getEl().dom.getElementsByTagName('button')[0].style.backgroundImage = 'url(' + iconPath.expand + ')'
                            } else if (QueryAreaState.childNodes[0].nodeValue == 'COLLAPSED') {} else if (QueryAreaState.childNodes[0].nodeValue == 'HIDDEN') {
                            	queryPanel.hide();
                                queryPanelExpendButton.hide()
                            }
                        }
                        var Controller = Cases[j].getElementsByTagName('Controller');
                        if (Controller.length > 0) {
                            var Functions = Controller[0].getElementsByTagName('Function');
                            for (var i = 0; i < Functions.length; ++i) {
                                if (Functions[i].childNodes[0].nodeValue && typeof(eval(Functions[i].childNodes[0].nodeValue)) == 'function') {
                                    eval(Functions[i].childNodes[0].nodeValue + '();')
                                }
                            }
                        }
                        grid.getView().refresh(true);
                        break
                    }
                }
                oldPageParam = this.getPageParam()
            }
        },
        on: function(eventName, _f) {
            mainPanel.on(eventName, _f)
        },
        selectLeafOnly: function(_b) {
            selectLeafOnlyFlag = _b
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
                        queryFunction(selectPK)
                    }
                }
            });
            pagingToolbar.add({
                tooltip: '上一页',
                iconCls: "x-tbar-page-prev",
                handler: function() {
                    if (currentPageField.getValue() > 1) {
                        currentPageField.setValue(currentPageField.getValue() - 1);
                        queryFunction(selectPK)
                    }
                }
            });
            currentPageField = new Ext.form.NumberField({
                minValue: 0,
                allowBlank: false,
                hideTrigger: true,
                allowNegative: false,
                allowDecimals: false
            });
            currentPageField.setWidth(28);
            currentPageField.setValue(0);
            currentPageField.on('specialkey', 
            function(_this, _e) {
                if (_e.getKey() == 13) {
                    queryFunction()
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
                        queryFunction(selectPK)
                    }
                }
            });
            pagingToolbar.add({
                tooltip: '最后页',
                iconCls: "x-tbar-page-last",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(pageCountField.getValue());
                        queryFunction(selectPK)
                    }
                }
            });
            if (width > 400) {
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
                pagingToolbar.add('-')
            } else {
                pageSizeField = new Ext.form.Hidden({
                    minValue: 0,
                    allowBlank: false
                })
            }
            var pageSize = Math.round((Ext.getBody().getHeight() - 100) / 25);
            pageSizeField.setValue(pageSize);
            pageSizeField.on('specialkey', 
            function(_this, _e) {
                if (_e.getKey() == 13) {
                    queryFunction()
                }
            });
            grid.on('headerclick', 
            function(g, _columnIndex) {
                if (effectiveCmConfig == null) {
                    effectiveCmConfig = cmConfig
                }
                if (g.getColumnModel().getColumnId(_columnIndex) == 'isSelect') {
                    return
                }
                if (effectiveCmConfig[_columnIndex].sort) {
                    var owner = '_t1';
                    if (effectiveCmConfig[_columnIndex].owner) {
                        owner = effectiveCmConfig[_columnIndex].owner
                    }
                    if (!effectiveCmConfig[_columnIndex].dir) {
                        effectiveCmConfig[_columnIndex].dir = 'ASC'
                    } else if (effectiveCmConfig[_columnIndex].dir == 'ASC') {
                        effectiveCmConfig[_columnIndex].dir = 'DESC'
                    } else {
                        effectiveCmConfig[_columnIndex].dir = 'ASC'
                    }
                    orderField = owner + '.' + effectiveCmConfig[_columnIndex].dataIndex;
                    orderDir = effectiveCmConfig[_columnIndex].dir;
                    var sc = grid.getView().sortClasses;
                    var hds = grid.getView().mainHd.select('td').removeClass(sc);
                    hds.item(_columnIndex).addClass(sc[orderDir == "DESC" ? 1: 0]);
                    queryFunction(selectPK)
                }
            })
        },
        removeNode: function(id) {
        	if(!id) 
        		return;
        	var node = treePanel.getStore().getNodeById(id);
        	var pNode = node.parentNode;
        	if(!pNode){alert(id);
        		treePanel.getStore().getNodeById(id).remove();
        		return;
        	} 
        	treePanel.getStore().getNodeById(id).remove();
        	if(!pNode.hasChildNodes() && pNode.parentNode){
        		pNode.parentNode.replaceChild({id:pNode.get('id'),text:pNode.get('text'),leaf:true},pNode);
        	}
        		
        },
        removeAllNode: function(id) {
        	treePanel.getStore().getNodeById(id).removeAll();
        },
        removeRecord: function(obj) {
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
                var allEquals = true;
                for (var k in obj) {
                    allEquals = allEquals & (records[i].get(k) == obj[k])
                }
                if (allEquals) {
                    store.remove(records[i])
                }
            }
        },
        removeSelectedRecords: function() {
            var selectedFlag = false;
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
                if (records[i].data.isSelect) {
                    store.remove(records[i]);
                    selectedFlag = true
                }
            }
            if (!selectedFlag) {
                Ext.alert(SOC_MESSAGE.noSelectedRecord)
            }
        },
        removeSignedRecord: function() {
            var record = sm.getSelected();
            if (record) {
                store.remove(record)
            } else {
                Ext.alert(SOC_MESSAGE.noSignedRecord)
            }
        },
        setCm: function(_config) {
            cmConfig = _config;
            fields=['hid'];
            Ext.each(cmConfig,function(item){
    			fields.push(item.dataIndex);
    		});
            for (var i = 0; i < cmConfig.length; ++i) {
                if (cmConfig[i].editor) {
                    this.editors[cmConfig[i].dataIndex] = cmConfig[i].editor
                }
            }
         },
        setExpandFunction: function(_expandFunction,_rootId) {
        	if(_rootId !== undefined)
        		rootId = _rootId;
            expandFunction = _expandFunction;
            expandFunction(rootId);
            treePanel.on('itemclick' , function(view,re){ 
            	selectPK = re.get('id');
            	setAppContext('id',selectPK);
	            queryFunction(selectPK);
	            return true
	        });
            treePanel.on('beforeitemexpand' , function(node,obj){ 
	        	if(node.hasChildNodes() == false){
	        		expandFunction(node.get('id'));
	        	}  
	        		
	        });
        },
        setPageUnit: function(_pageUnit) {
            pageUnit = _pageUnit
        },
        setPageSize: function(_pageSize) {
            pageSize = _pageSize
        },
        setRootText: function(_rootText) {
            rootText = _rootText
        },
        setRootId: function(_rootId) {
            rootId = _rootId
        },
        setrootVisible: function(_rootVisible) {
        	rootVisible = _rootVisible
        },
        setTitle: function(_title) {
            title = _title
        },
        showTreeData: function(id,viewData) {
            var list = viewData.resultList;
            
            if(list.length>0){
            	treePanel.getStore().getNodeById(id).appendChild(list);
            	
            }
            
        },
        showViewData: function(viewData) {
            var list = viewData.resultList;
            if (!viewData.isSucceed && viewData.message) {
                reLogin();
                return
            }
            if (list == null) {
                alert('query has exception');
                return
            }
            eval('grid.getView().scrollToTop()');
            store.removeAll();
            if (currentPageField != null) {
                currentPageField.setValue(viewData.currentPage);
                pageCountField.setValue(viewData.pageCount)
            }
            store.loadData(viewData.resultList);
            modifiedFlag = false
        }
    }
}