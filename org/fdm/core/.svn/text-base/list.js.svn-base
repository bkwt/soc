  
function ListAreaUnit(_id) {
    var id = _id;
    var fid = functionId;
    var fProgParam = request.getParameter('progParams')
    var mainPanel = null;
    var topPanel = null;
    var queryPanel = new Ext.Panel({
       id: fid+'__'+id + '__query'
    });
    queryPanel.hide();
    var sumPanel = new Ext.Panel({
    	region: 'south',
    	//collapsible : true, 
    	split: true,
        layout: 'fit'//,
    	//height:280
    	//autoHeight: true,
       // layout: 'table',
       // baseCls: 'x-panel-mc'

    });
    sumPanel.hide();
    var sm = null;
    var cm = null;
    var store = null;
    var fields = null;
    var cellEditing=null;
    var grid = null;
    var currentPageField = null;
    var pageCountField = null;
    var pageSizeField = null;
    var configXML = null;
    var queryFunction = null;
    var pageUnit = null;
    var pageSize = 20;
    var oldPageParam = '';
    var title = '';
    var width = 0;
    var height = 0;
    var SelectAble=true;
    var cmConfig = null;
    var effectiveCmConfig = null;
    var orderField = null;
    var orderDir = 'ASC';
    var fieldsRanking = null;
    var queryPanelExpendButton = null;
    var saveFieldsRankingButton = null;
    var resetFieldsRankingButton = null;
    var queryButton = null;
    var resetButton = null;
    
    var plugins = {};
    var modifiedFlag = false;
    var SelectedMemory = false;
    var hidList = [];
    var selectedList = [];
    
    return {
        queryFields: [],
        editors: [],
        addRecord: function(obj) {
        	 store.add(obj);  



        },
        cleanSelected: function() {
            hidList = [];
            selectedList = [];
            sm.deselectAll();
        },
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
        checkAll: function(_checkbox) {
        	sm.selectAll();
        },
        checkFields: function(recordAll) {
            if (!this.needCheckFields) {
                this.needCheckFields = {};
                for (var i = 0; i < cmConfig.length; ++i) {
                    if (cmConfig[i].editor != null) {
                        if (cmConfig[i].editor.allowBlank == false) {
                            this.needCheckFields[cmConfig[i].dataIndex] = i + 1;

                        }

                    }

                }

            }
            var records = store.getRange();
            if (recordAll) {} else
            {
                rs = [];
                for (var i = 0; i < records.length; ++i) {
                    if (records[i].data.isSelect) {
                        rs.push(records[i]);

                    }

                }
                records = rs;

            }
            for (var i = 0; i < records.length; ++i) {
                if (records[i].data != null) {
                    for (var k in this.needCheckFields) {
                        if (this.needCheckFields[k] && ((records[i].data)[k] === '' || (records[i].data)[k] === null || (records[i].data)[k] === undefined)) {
                            pageUnit.setActiveTab(this);
                            
                           //records[i].getFields()[0].beginEdit();
                            
                            //records[i].focus(false,100);
                            //sm.selectRow(store.indexOf(records[i]));
                            //grid.startEditing(store.indexOf(records[i]), this.needCheckFields[k] - 1);
                            return false;

                        }

                    }

                }

            }
            return true;

        },
        clean: function(allClean, cleanOrder) {
            if (allClean === undefined) {
                allClean = true;

            } else
            {
                allClean = false;

            }
            if (cleanOrder === undefined) {
                cleanOrder = true;

            } else
            {
                cleanOrder = false;

            }
            if (allClean) {
                store.removeAll();
                if (currentPageField != null) {
                    currentPageField.setValue(0);
                    pageCountField.setValue(0);

                }

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
            var timeFields = queryPanel.query('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                timeFields[i].setValue('');

            }
            if (orderDir && cleanOrder) {
                orderField = null;
                orderDir = null;

            }
            var selectAllCheckbox = Ext.fly(id + '_SELECT_ALL');
            if (selectAllCheckbox) {
                selectAllCheckbox.dom.checked = false;

            }

        },
        findById: function(_id) {
            return mainPanel.findById(_id);

        },
        focusRecord: function() {
            
        },
        getAllObjects: function() {
            var list = [];
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
                for (var k in records[i].data) {
                    var d = (records[i].data)[k];
                    if (d == '' && typeof d == 'string') { (records[i].data)[k] = null;

                    }

                }
                list.push(records[i].data);

            }
            return list;

        },
        getAreaInfo: function() {
        	me = this;
            var areaInfo = {};
            areaInfo.currentPage = 0;
            areaInfo.pageSize = 20;
            areaInfo.orderField = orderField;
            areaInfo.orderDir = orderDir;
            areaInfo.queryCondition = '2=2';
            areaInfo.needAuditPower = this.needAuditPower;
            areaInfo.needPersonPower = this.needPersonPower;
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
                areaInfo.queryCondition += (' and ' + _tether);
                if (this.tether != ' 3=3' && this.showAdQueryButton.icon == iconPath.set){
	                this.showAdQueryButton.icon = iconPath.set2;
	            	this.showAdQueryButton.getEl().dom.getElementsByTagName('button')[0].style.backgroundImage = 'url(' + iconPath.set2 + ')';
            	}else if (this.tether == ' 3=3' && this.showAdQueryButton.icon == iconPath.set2){
	            	this.showAdQueryButton.icon = iconPath.set;
	            	this.showAdQueryButton.getEl().dom.getElementsByTagName('button')[0].style.backgroundImage = 'url(' + iconPath.set + ')';
            	}
            }
            
            if (currentPageField != null) {
                areaInfo.currentPage = currentPageField.getValue();
                areaInfo.pageSize = pageSizeField.getValue();

            }
            areaInfo.areaId = id;
            areaInfo.functionId = fid;
            areaInfo.functionProgParam = fProgParam;;
            return areaInfo;

        },
        getButtonBar: function() {
            return topPanel.getTopToolbar();

        },
        getEm: function() {
            return mainPanel;

        },
        getGrid: function() {
            return grid;

        },
        getTopPanel: function() {
            return topPanel;

        },
        getId: function() {
            return id;

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
        getQueryPanel: function() {
            return queryPanel;

        },
        getSm: function() {
            return sm;

        },
        getSelected:function() {
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

                
                var index = hidList.indexOf(records[i].data.hid);
				if(index != -1){
					hidList.splice(index, 1);
					selectedList.splice(index, 1);
				}
            }
            for (var i = 0; i < selectedList.length; ++i){
            	selectedVOs.push(selectedList[i]);
            }
            return selectedVOs;
        },
        getSigned:function() {
        	var record=sm.getLastSelected();
            if (record) {
                var obj = {};
                for (var k in record.data) {
                    var d = (record.data)[k];
                    if (d == '' && typeof d == 'string') {
                        d = null;

                    }
                    obj[k] = d;

                }
                return obj;

            } else
            return null;

        },
        getStore: function() {
            return store;

        },
        getCellEditing: function() {
            return cellEditing;

        },
        getWidth: function() {
            return width;

        },
        getXType: function() {
            return 'listarea';

        },
        hideFieldsRankingButtons: function() {
            saveFieldsRankingButton.hide();
            resetFieldsRankingButton.hide();

        },
        init: function() {
        	me = this;
            this.needAuditPower = false;
            this.needPersonPower = false;
            sm = Ext.create('Ext.selection.CheckboxModel');
            if (cmConfig == null) {
                alert('cmConfig is null');
                return;

            }
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
            queryPanelExpendButton = new Ext.Button({
                icon: iconPath.collapse,
                iconCls: 'border:0;',
                handler: function() {
                    if (this.icon == iconPath.expand) {
                        queryPanel.hide();
                        this.icon = iconPath.collapse;
                        this.setIcon(iconPath.collapse);
                    } else
                    {
                        queryPanel.show();
                        this.icon = iconPath.expand;
                        this.setIcon(iconPath.expand);

                    }

                }

            });
            queryPanelExpendButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '开关查询面板';

            });
            saveFieldsRankingButton = new Ext.Button({
                icon: iconPath.save,
                iconCls: 'border:0;',
                handler: function() {
                	var columns = grid.query('headercontainer')[0].getGridColumns();
                	fieldsRanking = [];
                    var count = columns.length;
                    for (var i = 1; i < count; ++i) {
                        var f = [];
                        f.push(columns[i].getSortParam());
                        if(cmConfig[i-1].flex==undefined){
                        	f.push(columns[i].getWidth());
                        }else
                        	f.push(0);
                        fieldsRanking.push(f);

                    }
                    saveFieldsRanking(getPageURL(), id, me.getPageParam(), fieldsRanking);
					
                }

            });
            saveFieldsRankingButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '保存我的设置';

            });
            resetFieldsRankingButton = new Ext.Button({
                icon: iconPath.clean,
                iconCls: 'border:0;',
                handler: function() {
                    resetFieldsRanking(getPageURL(), id,me.getPageParam());

                }

            });
            resetFieldsRankingButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '重置我的设置';

            });
            queryButton = new Ext.Button({
                icon: iconPath.query,
                iconCls: 'border:0;',
                handler: function() {
                    if (typeof(queryFunction) == 'function') {
                        queryFunction();
						
                    }

                }

            });
            queryButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '查询';

            });
            resetButton = new Ext.Button({
                icon: iconPath.reset,
                iconCls: 'border:0;',
                handler: function() {
                    if (queryFunction == me.focusRecord) {
                    	me.clean(false);

                    } else
                    {
                    	me.clean(true, false);
                        queryFunction();

                    }

                }

            });
            resetButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '重置';

            });
            this.showAdQueryButton = new Ext.Button({
                icon: iconPath.set,
                iconCls: 'border:0;',
                hidden: true,
                handler: function() {
                    plugins['queryarea'].show();
                }

            });
            this.showAdQueryButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '高级查询';

            });
            if (false) {
                saveFieldsRankingButton.hide();
                resetFieldsRankingButton.hide();

            }
            topPanel = new Ext.Panel({
                bodyStyle: 'border:0px',
                border:false,
                region: 'north', 
                tbar: ['-', {
                    text: 'button1',
                    hidden: true

                },
                '-', {
                    text: 'button2',
                    hidden: true

                },
                '-', {
                    text: 'button3',
                    hidden: true

                },
                '-', {
                    text: 'button4',
                    hidden: true

                },
                '-', {
                    text: 'button5',
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
                '->', this.showAdQueryButton, '-', queryPanelExpendButton, '-', saveFieldsRankingButton, resetFieldsRankingButton, '-', queryButton, resetButton, '-']

            });
            queryButton.hide();
            resetButton.hide();
            
            
            if (queryPanel.hidden) {
                queryPanelExpendButton.hide();

            }else{
            	topPanel.add(queryPanel);
            	queryPanel.hide();
            }
            
            cellEditing = Ext.create('Ext.grid.plugin.CellEditing',{
            	clicksToEdit: 1
             });
            
            grid = new Ext.grid.Panel({
                id: fid + '__' + id + '__grid',
                region: 'center',
                store: store,
                columns: cmConfig,
                selModel: sm,
                stripeRows: true,
                frame: true,
                border: false,
               // sortableColumns:false,
                enableColumnHide:false,
                clicksToEdit: 1,
                //disableSelection: true,//值为TRUE，表示禁止选择行 
                plugins: [cellEditing],
                features: [{ ftype: 'summary'}], 
                bbar:[{
                    xtype: 'toolbar',
                    border: false,
                    items: ['']
                }]

            });
           
            
            mainPanel = new Ext.Panel({
               // id: fid+'__'+id,
                title: title,
                layout: 'border',
                border: false,
                header: false,
                items: [topPanel, grid, sumPanel]
            });
            if(height != 0)
            	mainPanel.setHeight(height);
            mainPanel.on('afterrender', function() {
            	var columns = grid.query('headercontainer')[0].getGridColumns();
            	if(SelectAble== false)
            		columns[0].hide();

            });
            mainPanel.on('activate', function() {
            	var columns = grid.query('headercontainer')[0].getGridColumns();
            	if(SelectAble== false)
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

        },
        isModified: function() {
            return modifiedFlag;

        },
        loadAreaConfig: function() {
        	me = this;
            if (oldPageParam != this.getPageParam()) {
                fieldsRanking = getFieldRanking(getPageURL(), id, this.getPageParam());
                if (fieldsRanking != null) {
                    effectiveCmConfig = [];
                    for (var i = 0; i < fieldsRanking.length; ++i) {
                        for (var j = 0; i < cmConfig.length; ++j) {
                            if (!cmConfig[j]) {
                                alert(SOC_MESSAGE.unknowRankingConfig);
                                break;

                            }
                            if (fieldsRanking[i][0] == cmConfig[j].dataIndex) {
                                effectiveCmConfig.push(cmConfig[j]);
                                effectiveCmConfig[effectiveCmConfig.length - 1].width = fieldsRanking[i][1];
                                break;
                            }

                        }

                    }
                     grid.reconfigure(store, effectiveCmConfig);

                } else
                {
                    effectiveCmConfig = cmConfig;

                }

            }
            if (configXML == null) {
                if (AppConfig[fid] != null) {
                    var areas = AppConfig[fid].getElementsByTagName('Area');
                    for (var i = 0; i < areas.length; ++i) {
                        if (areas[i].getAttribute('id') == this.getId()) {
                            if (areas[i].getAttribute('type') == 'ListAreaUnit') {
                                configXML = areas[i];
                                break;

                            } else
                            {
                                alert('unknow type :' + areas[i].getAttribute('type'));
                                return;

                            }

                        }

                    }

                }

            }
            if (configXML == null) {
                return;

            }
            if (oldPageParam != this.getPageParam()) {
                var buttonCount = 16;
                var buttons = topPanel.getDockedItems()[0];
                for (var i = 0; i < buttonCount; ++i) {
                    buttons.getComponent(i).hide();

                }
                var Cases = configXML.getElementsByTagName('Case');
                for (var j = 0; j < Cases.length; ++j) {
                    if (Cases[j].getAttribute('value') == this.getPageParam()) {
                        var Hide = Cases[j].getElementsByTagName('Hide');
                        if (Hide.length > 0 && Hide[0].childNodes[0].nodeValue == 'true') {
                            pageUnit.hideItem(mainPanel);
                            break;

                        } else
                        {
                            pageUnit.unhideItem(mainPanel);

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
                                        grid.nonEditColumns[Column.getAttribute('name')] = true;

                                    }

                                }
                                var columnHide = Column.getElementsByTagName('Chide');
                                if (columnHide.length > 0) {
                                    if (columnHide[0].childNodes[0].nodeValue == 'true') {
                                        grid.hiddenColumns[Column.getAttribute('name')] = true;

                                    }

                                }

                            }

                        }
                        for (var k in grid.hiddenColumns) {
                            if (grid.hiddenColumns[k]) {
                                var cIndex = grid.getColumnModel().findColumnIndex(k);
                                if (cIndex == -1) {
                                    alert('column' + k + 'not exists,please check cfg.xml.');

                                } else
                                {
                                    grid.getColumnModel().setHidden(cIndex, true);

                                }

                            }

                        }
                        var Edit = Cases[j].getElementsByTagName('Edit');
                        if (Edit.length == 0) {
                            Edit = true;

                        } else
                        {
                            if (Edit[0].childNodes.length > 0) {
                                Edit = eval(Edit[0].childNodes[0].nodeValue);

                            } else
                            {
                                Edit = false;

                            }

                        }
                        if (grid.hasListener('beforeedit')) {}
                        if (Edit) {
                            grid.on('beforeedit', 
                            function(e) {
                                if (grid.nonEditColumns[e.field]) {
                                    e.cancel = true;
                                    return;

                                } else
                                {
                                    return true;

                                }

                            });

                        } else
                        {
                            grid.on('beforeedit', 
                            function(e) {
                                e.cancel = true;alert(1);
                                return;

                            });

                        }
                        SelectAble = Cases[j].getElementsByTagName('SelectAble');
                        if (SelectAble.length > 0) {
                            if (SelectAble[0].childNodes.length > 0) {
                                SelectAble = eval(SelectAble[0].childNodes[0].nodeValue);
                            } else
                            {
                                SelectAble = true;

                            }

                        } else
                        {
                            SelectAble = true;

                        }
                        
                        SelectedMemory = Cases[j].getElementsByTagName('SelectedMemory');
                        if (SelectedMemory.length > 0) {
                            if (SelectedMemory[0].childNodes.length > 0) {
                                SelectedMemory = eval(SelectedMemory[0].childNodes[0].nodeValue);

                            } else
                            {
                                SelectedMemory = false;

                            }

                        } else
                        {
                            SelectedMemory = false;

                        }
                        var Tether = Cases[j].getElementsByTagName('Tether');
                        if (Tether.length > 0) {
                            alert('dubug:please move Tether from cfg.xml to component.xml');

                        }
                        var NeedAuditPower = Cases[j].getElementsByTagName('NeedAuditPower');
                        if (NeedAuditPower.length > 0) {
                            alert('dubug:please move NeedAuditPower from cfg.xml to component.xml');

                        }
                        var NeedPersonPower = Cases[j].getElementsByTagName('NeedPersonPower');
                        if (NeedPersonPower.length > 0) {
                            alert('dubug:please move NeedPersonPower from cfg.xml to component.xml');

                        }
                        var PageSize = Cases[j].getElementsByTagName('PageSize');
                        if (PageSize.length > 0) {
                            pageSizeField.setValue(PageSize[0].childNodes[0].nodeValue);

                        }
                        var OperatersTag = Cases[j].getElementsByTagName('Operaters');
                        if (OperatersTag.length == 0) {
                            alert('can not find Operaters in cfg.xml');
                            return;

                        }
                        OperatersTag = OperatersTag[0];
                        var operaters = OperatersTag.getElementsByTagName('Operater');
                        
                        for (var i = 0; i < operaters.length; ++i) {
                            if (i == 8) {
                                alert('operaters full');

                            }
                            var Operater = operaters[i];
                            var text = Operater.getElementsByTagName('Text')[0].childNodes[0].nodeValue;
                            var method = Operater.getElementsByTagName('Method')[0].childNodes[0].nodeValue;
                            var icon=null;
                            if(Operater.getElementsByTagName('Icon')[0] != undefined)
                            	icon = Operater.getElementsByTagName('Icon')[0].childNodes[0].nodeValue;
                            var constParam = '';
                            if (Operater.getElementsByTagName('ConstParam')[0].childNodes.length > 0) constParam = Operater.getElementsByTagName('ConstParam')[0].childNodes[0].nodeValue;
                            buttons.getComponent(i * 2).show();
                            buttons.getComponent(i * 2 + 1).setText(text);
                            if (method) {
                            	//eval('buttons.getComponent(' + (i * 2 + 1) + ').setHandler(function(){' + id + '.' + method + '(\'' + constParam + '\');});');
                            	eval('buttons.getComponent(' + (i * 2 + 1) + ').setHandler(function(){'+fid+'(\"' + id + '.' + method + '(\'' + constParam + '\');\");'+'});');
                            }
                            if (icon && icon.indexOf('iconPath') != -1) {
                            	buttons.getComponent(i * 2 + 1).icon = eval(icon);
                            }else{
                            	buttons.getComponent(i * 2 + 1).icon = icon;
                            }
                            buttons.getComponent(i * 2 + 1).show();

                        }
                        if (i > 0) {
                            buttons.getComponent(i * 2 + 2).show();

                        }
                        if (grid.hasListener('itemdblclick')) {
                            grid.events['itemdblclick'].clearListeners();

                        }
                        var DbClickOperater = OperatersTag.getElementsByTagName('DbClickOperater');
                        if (DbClickOperater.length > 0) {
                            DbClickOperater = DbClickOperater[0];
                            var method = DbClickOperater.getElementsByTagName('Method')[0].childNodes[0].nodeValue;
                            var constParam = '';
                            if (DbClickOperater.getElementsByTagName('ConstParam')[0].childNodes.length > 0) {
                                constParam = DbClickOperater.getElementsByTagName('ConstParam')[0].childNodes[0].nodeValue;

                            }
                            eval('grid.on(\'itemdblclick\',function(){'+fid+'(\"' + id + '.' + method + '(\'' + constParam + '\');\");'+'});');
                            grid.on('mouseout', 
                            function(_e) {
                                if (!_e.getTarget().style.cursor) _e.getTarget().style.cursor = 'hand';

                            });

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
                             } else if (QueryAreaState.childNodes[0].nodeValue == 'COLLAPSED') {} else if (QueryAreaState.childNodes[0].nodeValue == 'HIDDEN') {
                                queryPanel.hide();
                                queryPanelExpendButton.hide();
                                queryButton.hide();
                                resetButton.hide();

                            }

                        }
                        var Controller = Cases[j].getElementsByTagName('Controller');
                        if (Controller.length > 0) {
                            var Functions = Controller[0].getElementsByTagName('Function');
                            for (var i = 0; i < Functions.length; ++i) {
                                if (Functions[i].childNodes[0].nodeValue && typeof(eval(Functions[i].childNodes[0].nodeValue)) == 'function') {
                                    setTimeout(Functions[i].childNodes[0].nodeValue + '();', 0);

                                }

                            }

                        }
                        var DefaultSortField = Cases[j].getElementsByTagName('DefaultSortField');
                        if (DefaultSortField.length > 0) {
                            if (queryFunction != this.focusRecord) {
                                var dir = DefaultSortField[0].getAttribute('dir');
                                var owner = DefaultSortField[0].getAttribute('owner');
                                DefaultSortField = DefaultSortField[0].childNodes[0].nodeValue;
                                if (!dir) {
                                    dir = 'ASC';

                                }
                                if (!owner) {
                                    owner = '_t1';

                                }
                                orderField = owner + '.' + DefaultSortField;
                                orderDir = dir;
                                var columnIndex = cm.findColumnIndex(DefaultSortField);
                                effectiveCmConfig[columnIndex].dir = orderDir;
                                var sc = grid.getView().sortClasses;
                                var hds = grid.getView().mainHd.select('td').removeClass(sc);
                                hds.item(columnIndex).addClass(sc[orderDir == "DESC" ? 1: 0]);

                            }

                        }
                        var QueryOnShow = Cases[j].getElementsByTagName('QueryOnShow');
                        if (QueryOnShow.length > 0) {
                            QueryOnShow = QueryOnShow[0].childNodes[0].nodeValue;;
                            if (QueryOnShow == 'true' && (queryFunction != this.focusRecord)) {
                                queryFunction();

                            }

                        }
                        break;

                    }

                }
                oldPageParam = this.getPageParam();

            }

        },
        on: function(eventName, _f) {
            mainPanel.on(eventName, _f);

        },
        refreshFor: function(_queryFunction) {
            queryButton.show();
            resetButton.show();
            if (_queryFunction === undefined) {
                queryFunction = this.focusRecord;
                grid.on('headerclick', 
                function(g, _columnIndex) {
                    if (effectiveCmConfig == null) {
                        effectiveCmConfig = cmConfig;

                    }
                    if (g.getColumnModel().getColumnId(_columnIndex) == 'isSelect') {
                        return;

                    }
                    if (effectiveCmConfig[_columnIndex].sort) {
                        if (!effectiveCmConfig[_columnIndex].dir) {
                            effectiveCmConfig[_columnIndex].dir = 'ASC';

                        } else if (effectiveCmConfig[_columnIndex].dir == 'ASC') {
                            effectiveCmConfig[_columnIndex].dir = 'DESC';

                        } else
                        {
                            effectiveCmConfig[_columnIndex].dir = 'ASC';

                        }
                        var fieldName = effectiveCmConfig[_columnIndex].dataIndex;
                        var records = g.getStore().getRange();
                        for (var i = 1; i < records.length; ++i) {
                            var j = i,
                            nowRecord = records[i];
                            while (j > 0 && (effectiveCmConfig[_columnIndex].dir == 'DESC' ? (records[j - 1].get(fieldName) < nowRecord.get(fieldName)) : (records[j - 1].get(fieldName) > nowRecord.get(fieldName)))) {
                                records[j] = records[j - 1]; --j;

                            }
                            records[j] = nowRecord;

                        }
                        g.getStore().removeAll();
                        g.getStore().add(records);
                        orderField = effectiveCmConfig[_columnIndex].dataIndex;
                        orderDir = effectiveCmConfig[_columnIndex].dir;
                        var sc = grid.getView().sortClasses;
                        var hds = grid.getView().mainHd.select('td').removeClass(sc);
                        hds.item(_columnIndex).addClass(sc[orderDir == "DESC" ? 1: 0]);

                    }

                });
                return;

            } else
            {
                queryFunction = _queryFunction;

            }
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
                hideTrigger: true,
                allowNegative: false,
                allowDecimals: false

            });
            currentPageField.setWidth(34);
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
            pageCountField.setWidth(34);
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
            if (true) {
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

            } else
            {
                pageSizeField = new Ext.form.Hidden({
                    minValue: 0,
                    allowBlank: false

                });

            }
            pageSizeField.setValue(pageSize);
            pageSizeField.on('specialkey', 
            function(_this, _e) {
                if (_e.getKey() == 13) {
                    queryFunction();

                }

            });
            pagingToolbar.add('->');
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
                    var sc = g.getView().sortClasses;
                    var hds = g.getView().mainHd.select('td').removeClass(sc);
                    hds.item(_columnIndex).addClass(sc[orderDir == "DESC" ? 1: 0]);
                    queryFunction();

                }

            });

        },
        regPlugin: function(pluginxtype, plugin) {
            plugins[pluginxtype] = plugin;

        },
        removeRecord: function(obj) {
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
                var allEquals = true;
                for (var k in obj) {
                    allEquals = allEquals & (records[i].get(k) == obj[k]);

                }
                if (allEquals) {
                    store.remove(records[i]);

                }

            }

        },
        removeSelectedRecords: function() {
            store.remove(store.getRange());
        },
        removeSignedRecord: function() {
            var record = sm.getSelected();
            if (record) {
                store.remove(record);

            } else
            {
                Ext.alert(SOC_MESSAGE.noSignedRecord);

            }

        },
        setButtonTop: function() {},
        setCm: function(_config) {
            cmConfig = _config;
            fields=['hid'];
            Ext.each(cmConfig,function(item){
            	if(!item.align)
            		item.align='center';
            	if(!item.width && !item.flex)
            		item.flex=1;
            	fields.push(item.dataIndex);
    		});
            for (var i = 0; i < cmConfig.length; ++i) {
                if (cmConfig[i].editor) {
                    this.editors[cmConfig[i].dataIndex] = cmConfig[i].editor;

                }

            }
         },
        setHeight: function(_height) {
            height = _height;

        },
        setPageSize: function(_pageSize) {
            pageSize = _pageSize;

        },
        setPageUnit: function(_pageUnit) {
            pageUnit = _pageUnit;

        },
        setStore: function(_config) {
            alert('please remove setStore of ' + id);

        },
        setTitle: function(_title) {
            title = _title;

        },
        setWidth: function(_width) {
            width = _width;

        },
        showViewData: function(viewData) {
            var list = viewData.resultList;
            if (!viewData.isSucceed && viewData.message) {
                Ext.alert(viewData.message);
                if (viewData.message == SOC_MESSAGE.sessionTimeout) {
                    reLogin();

                }
                return;

            }
            if (list == null) {
                alert('query has exception');
                return;

            }
            eval('grid.getView().scrollToTop()');
            if(SelectedMemory == true){
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
            	var index = hidList.indexOf(records[i].data.hid);
                if(index != -1){
                	hidList.splice(index, 1);
                	selectedList.splice(index, 1);
                } 
                if (records[i].data.isSelect == true) {
                    hidList.push(records[i].data.hid);
                	selectedList.push(records[i].data);
							}
						}
						}
            store.removeAll();
            if (currentPageField != null) {
                currentPageField.setValue(viewData.currentPage);
                pageCountField.setValue(viewData.pageCount);

            }
            store.loadData(viewData.resultList);
            modifiedFlag = false;
            
        }

    };

}
