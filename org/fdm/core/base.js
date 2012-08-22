/********************************************************
 *  包含文件列表
 *
 *  PageUnit
 *  WindowUnit
 *  ListAreaUnit
 *  DetailAreaUnit
 *  SelectAreaUnit
 *  SelectTreeAreaUnit
 *  FieldsRanking
 *  SOC-base.js
 *  util.js
 
 *******************************************************/
function PageUnit(_id) {
    var id = _id;
    var pPanel = null;
    var ownerAreas = {};
    var tabPanel = null;
    var pageParam = '';
    var height = 0;
    return {
        add: function(p) {
        	for (var k in ownerAreas) {
            	 if(ownerAreas[k].getXType()=='detailarea' && height == 0){
            	 	height += Ext.get(ownerAreas[k].getId()).getHeight();
            	 }
            }
        	if(p.getXType()=='listarea'){
        		p.setWidth(Ext.getBody().getWidth()-21);
				p.setHeight(Ext.getBody().getHeight()-150-height);
				p.setPageSize(Math.round((Ext.getBody().getHeight()-140-height)/25));
			}
			if(p.getXType()=='detailarea'){
				p.setWidth(Ext.getBody().getWidth()-21);
			}
            p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);
            pPanel.findById('centerPanel').add(p.getEm());
            pPanel.doLayout();

        },
        addItem: function(item) {
            pPanel.findById('centerPanel').add(item);
            pPanel.doLayout();

        },
        addTab: function(p) {
            if (tabPanel == null) {
                tabPanel = new Ext.TabPanel({
                    autoHeight: true,
                    enableTabScroll: true,
                    deferredRender: false,
                    layoutOnTabChange: true

                });
                pPanel.findById('centerPanel').add(tabPanel);

            }
            for (var k in ownerAreas) {
            	 if(ownerAreas[k].getXType()=='detailarea' && height == 0){
            	 	height = Ext.get(ownerAreas[k].getId()).getHeight();
            	 	break;
            	 }
            }
            if(p.getXType()=='listarea'){
        		p.setWidth(Ext.getBody().getWidth()-21);
				p.setHeight(Ext.getBody().getHeight()-160-height);
			}
			if(p.getXType()=='detailarea')
				p.setWidth(Ext.getBody().getWidth()-21);
            p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);
            tabPanel.add(p.getEm());
            pPanel.doLayout();

        },
        addTabItem: function(p) {
            if (tabPanel == null) {
                tabPanel = new Ext.TabPanel({
                    //width: 790,
                    autoHeight: true,
                    enableTabScroll: true,
                    deferredRender: false,
                    layoutOnTabChange: true

                });
                pPanel.findById('centerPanel').add(tabPanel);

            }
            tabPanel.add(p);
            pPanel.doLayout();

        },
        addSeparator: function(w) {
            pPanel.findById('centerPanel').add(new Ext.Panel({
                height: w,
                bodyStyle: panelBodyStyle

            }));

        },
        clean: function() {
            for (var k in ownerAreas) {
                ownerAreas[k].clean();

            }
            if (tabPanel != null) {
                for (var i = 0; i < tabPanel.items.length; ++i) {
                    tabPanel.items.get(i).hide();

                }
                tabPanel.setActiveTab(null);

            }

        },
        getEm: function() {
            return pPanel;

        },
        getId: function() {
            return id;

        },
        getPageParam: function() {
            return pageParam;

        },
        getXType: function() {
            return 'pageunit';

        },
        hide: function() {
            pPanel.hide();

        },
        hideItem: function(item) {
            if (tabPanel != null && tabPanel.findById(item.getId())) {
                tabPanel.hideTabStripItem(item);

            } else
            {
                item.hide();

            }

        },
        init: function() {
            appPages[id] = this;
            pPanel = new Ext.Panel({
                id: id,
                closable: true,
                layout: 'column',
                renderTo: document.body,
                autoHeight: true,
                //bodyStyle: panelBodyStyle,
                items: [{
                    bodyStyle: 'border-color:#eef4ff;',
                    //columnWidth: .5,
                    width:0,
                    layout: 'table',
                    height: 0

                },
                {
                    id: 'centerPanel',
                    bodyStyle: panelBodyStyle,
                    autoHeight: true

                },
                {
                    bodyStyle: 'border-color:#eef4ff;',
                    //columnWidth: .5,
                    width:0,
                    layout: 'table',
                    height: 0

                }]

            });

        },
        isModified: function() {
            for (var k in ownerAreas) {
                if (ownerAreas[k].isModified()) {
                	
                    return true;

                }

            }
            return false;

        },
        regUnit: function(p) {
        	for (var k in ownerAreas) {
            	 if(ownerAreas[k].getXType()=='detailarea'){
            	 	height = Ext.get(ownerAreas[k].getId()).getHeight();
            	 	break;
            	 }
            }
        	if(p.getXType()=='listarea'){
        p.setWidth((Ext.getBody().getWidth()-21)/2);
				p.setHeight(Ext.getBody().getHeight()-180-height);
				}
				if(p.getXType()=='detailarea'){
        p.setWidth((Ext.getBody().getWidth()-21)/2);
				}
            p.init();
            
        	
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);

        },
        setActiveTab: function(area) {
            if (tabPanel != null && tabPanel.findById(area.getId())) {
                tabPanel.setActiveTab(area.getEm());

            }

        },
        show: function(_pageParam) {
            if (_pageParam) {
                pageParam = _pageParam;
                this.clean();

            }
            for (var k in appWindows) {
                appWindows[k].getEm().hide();

            }
            for (var k in appPages) {
                if (k == id) {
                    this.getEm().show();
                    for (var k1 in ownerAreas) {
                    	ownerAreas[k1].loadAreaConfig();
                        if(ownerAreas[k1].getXType()=='listarea')
							ownerAreas[k1].cleanSelected();
                        
                    }

                } else
                {
                    appPages[k].hide();
                 }

            }

        },
        unhideItem: function(item) {
            if (tabPanel != null && tabPanel.findById(item.getId())) {
                tabPanel.unhideTabStripItem(item);

            } else
            {
                item.show();

            }

        }

    };

}

function WindowUnit(_id) {
    var id = _id;
    var win = null;
    var ownerAreas = {};
    var title = ' ';
    var tabPanel = null;
    var width = 515;
    var height = 10;
    var pageParam = '';
    var modal = true;
    return {
        add: function(p) {
            win.setWidth(p.getWidth());
            p.setWidth(p.getWidth() - 15);
            p.setTitle('');
            p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);
            win.add(p.getEm());
            win.doLayout();

        },
        addTab: function(p) {
            if (tabPanel == null) {
                tabPanel = new Ext.TabPanel({
                    width: 790,
                    autoHeight: true,
                    deferredRender: false,
                    layoutOnTabChange: true

                });
                win.add(tabPanel);

            }
            p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);
            tabPanel.add(p.getEm());
            win.doLayout();

        },
        close: function() {
            win.hide();

        },
        setActiveTab: function(area) {
            if (tabPanel != null) {
                tabPanel.setActiveTab(area.getEm());

            }

        },
        setTitle: function(_title) {
            title = _title;

        },
        show: function(_pageParam) {
            if (_pageParam) pageParam = _pageParam;
            for (var k1 in ownerAreas) {
                ownerAreas[k1].clean();
                ownerAreas[k1].loadAreaConfig();

            }
            win.show();
            if (win.getPosition()[1] <= 0) {
                win.setPosition(win.getPosition()[0], 0);

            }

        },
        getEm: function() {
            return win;

        },
        getPageParam: function() {
            return pageParam;

        },
        hideItem: function(item) {},
        init: function(config) {
            appWindows[id] = this;
            if (config) {
                win = new Ext.Window(config);

            } else
            {
                win = new Ext.Window({
                    title: title,
                    renderTo: document.body,
                    width: width,
                    height: height,
                    autoHeight: true,
                    modal: modal,
                    closeAction: 'hide',
                    resizable: false

                });

            }
            win.on('move', 
            function(_this, _x, _y) {
                var x = _x < 0 ? 0: _x;
                var y = _y < 0 ? 0: _y;
                var el = this.getPositionEl();
                el.setLeftTop(x, y)

            });

        },
        on: function(eName, f) {
            win.on(eName, f);

        },
        setModal: function(_modal) {
            modal = _modal;

        },
        unhideItem: function(item) {}

    };

}


function ListAreaUnit(_id) {
    var id = _id;
    var mainPanel = null;
    var topPanel = null;
    var queryPanel = new Ext.Panel({
        id: id + '__query',
        bodyStyle: 'border:0px;',
        autoHeight: true

    });
    queryPanel.hide();
    var sumPanel = new Ext.Panel({
        height: 0,
        autoHeight: true,
        layout: 'table',
        baseCls: 'x-panel-mc'

    });
    sumPanel.hide();
    var sm = null;
    var cm = null;
    var store = null;
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
    var width = 790;
    var height = 500;
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
    var checkColumn = new Ext.grid.CheckColumn({
        id: 'isSelect',
        header: (indent == 0 ? "&nbsp;&nbsp;": "&nbsp;") + "<input type=checkbox style=\"height:15\" id=\"" + id + "_SELECT_ALL\"  onclick=\"" + id + ".checkAll(this);\">",
        fixed: true,
        dataIndex: 'isSelect',
        width: 40

    });
    var plugins = {};
    var modifiedFlag = false;
    var SelectedMemory = false;
    var hidList = [];
    var selectedList = [];
    return {
        queryFields: [],
        editors: [],
        addRecord: function(obj) {
            obj.hid = null;
            obj.isSelect = false;
            var r = new Ext.data.Record(obj, null);
            store.addSorted(r);

        },
        cleanSelected: function() {
            hidList = [];
            selectedList = [];
            var rs = store.getRange();
            for (var i = 0; i < rs.length; ++i) {
                //rs[i].set('isSelect',false);
			}
        },
        addToQueryPanel: function(p, layCfg) {
            if (queryPanel.hidden) {
                queryPanel.show();

            }
            if (p instanceof Array) {
                if (!layCfg) {
                    layCfg = {
                        labelRate: 0.45,
                        fieldsPerRow: 4

                    };

                } else
                {
                    if (!layCfg.labelRate) {
                        layCfg.labelRate = 0.5;

                    }
                    if (!layCfg.fieldsPerRow) {
                        layCfg.fieldsPerRow = 4;

                    }

                }
                var fieldWidth = parseInt((width - 30) / layCfg.fieldsPerRow);
                var labelWidth = parseInt(fieldWidth * layCfg.labelRate);
                var valueWidth = fieldWidth - labelWidth;
                var i = 0;
                while (i < p.length) {
                    var j = 0;
                    var row = new Ext.Panel(rowConfig);
                    while (j < layCfg.fieldsPerRow) {
                        if (i == p.length) {
                            break;

                        }
                        if (p[i] != EMPTY_SITE) {
                            if (p[i].xtype == 'hidden') {
                                this.queryFields[p[i].name] = row.add(p[i]);
                                i++;
                                continue;

                            }
                            var label = row.add({
                                tag: 'div',
                                html: (p[i].fieldLabel ? p[i].fieldLabel: '') + '：',
                                bodyStyle: queryLabel + 'width:' + (labelWidth)

                            });
                            if (p[i].rowspan && p[i].rowspan > 1) {
                                p[i].width = valueWidth + (p[i].rowspan - 1) * fieldWidth - (indent * (p[i].rowspan - 1));
                                j = j + (p[i].rowspan - 1);

                            } else
                            {
                                p[i].width = valueWidth;

                            }
                            this.queryFields[p[i].name] = row.add(p[i]);
                            this.queryFields[p[i].name].label = label;

                        } else
                        {
                            row.add({
                                tag: 'div',
                                html: '',
                                bodyStyle: queryLabel + 'width:' + (fieldWidth - indent)

                            });

                        }
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
            var rs = store.getRange();
            for (var i = 0; i < rs.length; ++i) {
                rs[i].set('isSelect', _checkbox.checked);

            }

        },
        checkFields: function(recordAll) {
            if (!this.needCheckFields) {
                this.needCheckFields = {};
                for (var i = 0; i < cm.getColumnCount(); ++i) {
                    var oneCm = cm.getColumnById(cm.getColumnId(i));
                    if (oneCm && oneCm.editor != null) {
                        if (oneCm.editor.field.allowBlank == false) {
                            this.needCheckFields[oneCm.dataIndex] = i + 1;

                        }

                    }

                }

            }
            grid.stopEditing();
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
                            sm.selectRow(store.indexOf(records[i]));
                            grid.startEditing(store.indexOf(records[i]), this.needCheckFields[k] - 1);
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
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].setValue('');

            }
            var hiddenFields = queryPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                hiddenFields[i].setValue('');

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].setValue('');

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].setValue('');

            }
            var combos = queryPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                combos[i].setValue('');

            }
            var triggers = queryPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                triggers[i].setValue('');

            }
            var timeFields = queryPanel.findByType('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                timeFields[i].setValue('');

            }
            if (orderDir && cleanOrder) {
                var sc = grid.getView().sortClasses;
                grid.getView().mainHd.select('td').removeClass(sc);
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
            var fieldValues = {};
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                var value = textFields[i].getValue();
                if (value != '') {
                    var name = textFields[i].getName();
                    var rule = textFields[i].rule;
                    rule = rule.replace('@NAME@', '');
                    rule = rule.replace('@VALUE@', value);
                    rule = rule.replace(/[']/g, '');
                    rule = rule.replace('LIKE', '');
                    rule = rule.replace('=', '');
                    rule = rule.replace(/[ ]/g, '');
                    fieldValues[name] = rule;

                }

            }
            var hiddenFields = queryPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                var value = hiddenFields[i].getValue();
                if (value != '') {
                    var name = hiddenFields[i].getName();
                    fieldValues[name] = value;

                }

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                var value = numberFields[i].getValue();
                if (value + '') {
                    var name = numberFields[i].getName();
                    fieldValues[name] = value;

                }

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                var value = dateFields[i].getValue();
                if (value) {
                    var name = dateFields[i].getName();
                    fieldValues[name] = value;

                }

            }
            var combos = queryPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                var value = combos[i].getValue();
                if (value != '') {
                    var name = combos[i].getName();
                    fieldValues[name] = value;

                }

            }
            var triggers = queryPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                var value = triggers[i].getValue();
                if (value != '') {
                    var name = triggers[i].getName();
                    fieldValues[name] = value;

                }

            }
            var timeFields = queryPanel.findByType('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                var value = timeFields[i].getValue();
                if (value != '') {
                    var name = timeFields[i].getName();
                    fieldValues[name] = value;

                }

            }
            var records = store.getRange();
            var nowRecord = sm.getSelected();
            var nowRecordIndex = -1;
            if (nowRecord) {
                nowRecordIndex = store.indexOf(nowRecord);
                i = nowRecordIndex + 1;

            } else
            {
                nowRecordIndex = 0;
                i = nowRecordIndex;

            }
            var findIt = false;
            var recordSize = records.length;
            while (true) {
                for (; i < recordSize; ++i) {
                    var allEquals = true;
                    for (var k in fieldValues) {
                        if (!allEquals) {
                            break;

                        }
                        if (records[i].get(k) === null) {
                            var allEquals = false;
                            break;

                        } else
                        {
                            var fieldType = typeof(fieldValues[k]);
                            if (fieldType == 'string') {
                                if (/^%/.test(fieldValues[k]) && /%$/.test(fieldValues[k])) {
                                    var onlyValue = fieldValues[k].replace(/[%]/g, '');
                                    var pattern = eval('/' + encodeURIComponent(onlyValue) + '/');
                                    allEquals = allEquals & (pattern.test(encodeURIComponent(records[i].get(k))));

                                } else if (/%$/.test(fieldValues[k])) {
                                    var onlyValue = fieldValues[k].replace(/[%]/, '');
                                    var pattern = eval('/^' + encodeURIComponent(onlyValue) + '/');
                                    allEquals = allEquals & (pattern.test(encodeURIComponent(records[i].get(k))));

                                } else if (/^%/.test(fieldValues[k])) {
                                    var onlyValue = fieldValues[k].replace(/[%]/, '');
                                    var pattern = eval('/' + encodeURIComponent(onlyValue) + '$/');
                                    allEquals = allEquals & (pattern.test(encodeURIComponent(records[i].get(k))));

                                } else
                                {
                                    var onlyValue = fieldValues[k].replace(/[%]/, '');
                                    var pattern = eval('/^' + encodeURIComponent(onlyValue) + '$/');
                                    allEquals = allEquals & (pattern.test(encodeURIComponent(records[i].get(k))));

                                }

                            } else if (fieldType == 'number') {
                                allEquals = allEquals & (fieldValues[k] == records[i].get(k));

                            } else if (fieldType == 'object') {
                                allEquals = allEquals & ((fieldValues[k].dateFormat('Ymd')) == (records[i].get(k).dateFormat('Ymd')));

                            }

                        }

                    }
                    var scrollerDom = grid.getView().scroller.dom;
                    if (allEquals) {
                        sm.selectRecords([records[i]]);
                        var scrollTop = 20 * i;
                        if (scrollTop > (scrollerDom.scrollHeight - scrollerDom.clientHeight)) {
                            scrollTop = scrollerDom.scrollHeight - scrollerDom.clientHeight;

                        }
                        if (scrollerDom) {
                            scrollerDom.scrollTop = scrollTop;

                        }
                        findIt = true;
                        break;

                    }

                }
                if (!findIt && nowRecordIndex == -1) {
                    sm.selectRecords([]);
                    if (scrollerDom) {
                        scrollerDom.scrollTop = 0;

                    }
                    break;

                } else if (!findIt && nowRecordIndex > 0) {
                    i = 0;
                    recordSize = nowRecordIndex + 1;
                    nowRecordIndex = -2;

                } else if (!findIt) {
                    sm.selectRecords([]);
                    if (scrollerDom) {
                        scrollerDom.scrollTop = 0;

                    }
                    break;

                } else
                {
                    break;

                }

            }

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
            var areaInfo = {};
            areaInfo.currentPage = 0;
            areaInfo.pageSize = 20;
            areaInfo.orderField = orderField;
            areaInfo.orderDir = orderDir;
            areaInfo.queryCondition = '2=2';
            areaInfo.needAuditPower = this.needAuditPower;
            areaInfo.needPersonPower = this.needPersonPower;
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                var value = textFields[i].getValue();
                if (value != '') {
                    var name = textFields[i].getName();
                    var rule = textFields[i].rule;
                    var owner = textFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and (' + rule + ')');

                }

            }
            var hiddenFields = queryPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                var value = hiddenFields[i].getValue();
                if (value != '') {
                    var name = hiddenFields[i].getName();
                    var rule = hiddenFields[i].rule;
                    var owner = hiddenFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and (' + rule + ')');

                }

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                var value = numberFields[i].getValue();
                if (value + '') {
                    var name = numberFields[i].getName();
                    var rule = numberFields[i].rule;
                    var owner = numberFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and (' + rule + ')');

                }

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                var value = dateFields[i].getValue();
                if (value) {
                    value = value.dateFormat(dateFields[i].format);
                    var name = dateFields[i].getName();
                    var rule = dateFields[i].rule;
                    var owner = dateFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and (' + rule + ')');

                }

            }
            var combos = queryPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                var value = combos[i].getValue();
                if (value != '') {
                    var name = combos[i].getName();
                    var rule = combos[i].rule;
                    var owner = combos[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and (' + rule + ')');

                }

            }
            var triggers = queryPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                var value = triggers[i].getValue();
                if (value != '') {
                    var name = triggers[i].getName();
                    var rule = triggers[i].rule;
                    var owner = triggers[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and (' + rule + ')');

                }

            }
            var timeFields = queryPanel.findByType('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                var value = timeFields[i].getValue();
                if (value != '') {
                    var name = timeFields[i].getName();
                    var rule = timeFields[i].rule;
                    var owner = timeFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and (' + rule + ')');

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
            areaInfo.functionId = functionId;
            areaInfo.functionProgParam = functionProgParam;
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
        getSelected:function() {
            var selectedVOs = [];
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
                if (records[i].data.isSelect) {
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
            var record = sm.getSelected();
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
            this.needAuditPower = false;
            this.needPersonPower = false;
            sm = new Ext.grid.RowSelectionModel({
                singleSelect: true
            });
            if (cmConfig == null) {
                alert('cmConfig is null');
                return;

            }
            cm = new Ext.grid.ColumnModel(cmConfig);
            store = new Ext.data.SimpleStore({
                fields: [{
                    name: 'hid'

                }]
            });
            queryPanelExpendButton = new Ext.Toolbar.Button({
                icon: iconPath.collapse,
                iconCls: 'border:0;',
                handler: function() {
                    if (this.icon == iconPath.expand) {
                        queryPanel.collapse(true);
                        this.icon = iconPath.collapse;
                        this.el.dom.getElementsByTagName('button')[0].style.backgroundImage = 'url(' + iconPath.collapse + ')';

                    } else
                    {
                        queryPanel.expand(true);
                        this.icon = iconPath.expand;
                        this.el.dom.getElementsByTagName('button')[0].style.backgroundImage = 'url(' + iconPath.expand + ')';

                    }

                }

            });
            queryPanelExpendButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '开关查询面板';

            });
            saveFieldsRankingButton = new Ext.Toolbar.Button({
                icon: iconPath.save,
                iconCls: 'border:0;',
                handler: function() {
                    fieldsRanking = [];
                    var count = cm.getColumnCount();
                    for (var i = 0; i < count; ++i) {
                        var f = [];
                        f.push(cm.getDataIndex(i));
                        f.push(cm.getColumnWidth(i));
                        fieldsRanking.push(f);

                    }
                    saveFieldsRanking(getPageURL(), id, eval(id).getPageParam(), fieldsRanking);
					
                }

            });
            saveFieldsRankingButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '保存我的设置';

            });
            resetFieldsRankingButton = new Ext.Toolbar.Button({
                icon: iconPath.clean,
                iconCls: 'border:0;',
                handler: function() {
                    resetFieldsRanking(getPageURL(), id, eval(id).getPageParam());

                }

            });
            resetFieldsRankingButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '重置我的设置';

            });
            queryButton = new Ext.Toolbar.Button({
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
            resetButton = new Ext.Toolbar.Button({
                icon: iconPath.reset,
                iconCls: 'border:0;',
                handler: function() {
                    if (queryFunction == eval(id).focusRecord) {
                        eval(id).clean(false);

                    } else
                    {
                        eval(id).clean(true, false);
                        queryFunction();

                    }

                }

            });
            resetButton.on('render', 
            function(_this) {
                _this.el.dom.getElementsByTagName('button')[0].title = '重置';

            });
            this.showAdQueryButton = new Ext.Toolbar.Button({
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
                autoHeight: true,
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

            }
            topPanel.add(queryPanel);
            grid = new Ext.grid.EditorGridPanel({
                id: id + '__grid',
                store: store,
                cm: cm,
                sm: sm,
                stripeRows: true,
                width: width,
                height: height,
                //autoHeight: true,
                frame: true,
                border: false,
                clicksToEdit: 1,
                bbar: []

            });
            checkColumn.init(grid);
            
            mainPanel = new Ext.Panel({
                id: id,
                title: title,
                //width: width,
                //height: height+200,
                autoHeight: true,
                autoWidth:true,
                border: true,
                header: true,
                items: [topPanel, grid, sumPanel]

            });
            mainPanel.on('show', 
            function() {
                grid.getView().refresh();

            });
            store.on('add', 
            function() {
                modifiedFlag = true;

            });
            store.on('remove', 
            function() {
                modifiedFlag = true;

            });
            store.on('update',function(_grid, _record, _operation) {
                modifiedFlag = true;
                
            });
            
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var triggerFields = queryPanel.findByType('trigger');
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
                    cm = new Ext.grid.ColumnModel(effectiveCmConfig);
                    grid.reconfigure(store, cm);

                } else
                {
                    effectiveCmConfig = cmConfig;

                }

            }
            if (configXML == null) {
                if (AppConfig != null) {
                    var areas = AppConfig.getElementsByTagName('Area');
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
                var buttons = topPanel.getTopToolbar().items;
                for (var i = 0; i < buttonCount; ++i) {
                    buttons.get(i).hide();

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
                                e.cancel = true;
                                return;

                            });

                        }
                        var SelectAble = Cases[j].getElementsByTagName('SelectAble');
                        if (SelectAble.length > 0) {
                            if (SelectAble[0].childNodes.length > 0) {
                                SelectAble = eval(SelectAble[0].childNodes[0].nodeValue);

                            } else
                            {
                                SelectAble = false;

                            }

                        } else
                        {
                            SelectAble = false;

                        }
                        if (SelectAble) {
                            cm.setHidden(cm.getIndexById('isSelect'), false);

                        } else
                        {
                            cm.setHidden(cm.getIndexById('isSelect'), true);

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
                            var constParam = '';
                            if (Operater.getElementsByTagName('ConstParam')[0].childNodes.length > 0) constParam = Operater.getElementsByTagName('ConstParam')[0].childNodes[0].nodeValue;
                            buttons.get(i * 2).show();
                            buttons.get(i * 2 + 1).setText(text);
                            if (method) {
                                eval('topPanel.getTopToolbar().items.get(' + (i * 2 + 1) + ').setHandler(function(){' + id + '.' + method + '(\'' + constParam + '\');' + id + '.cleanSelected();});');

                            }
                            buttons.get(i * 2 + 1).show();

                        }
                        if (i > 0) {
                            buttons.get(i * 2 + 2).show();

                        }
                        if (grid.hasListener('rowdblclick')) {
                            grid.events['rowdblclick'].clearListeners();

                        }
                        var DbClickOperater = OperatersTag.getElementsByTagName('DbClickOperater');
                        if (DbClickOperater.length > 0) {
                            DbClickOperater = DbClickOperater[0];
                            var method = DbClickOperater.getElementsByTagName('Method')[0].childNodes[0].nodeValue;
                            var constParam = '';
                            if (DbClickOperater.getElementsByTagName('ConstParam')[0].childNodes.length > 0) {
                                constParam = DbClickOperater.getElementsByTagName('ConstParam')[0].childNodes[0].nodeValue;

                            }
                            eval('grid.on(\'rowdblclick\',function(){' + id + '.' + method + '(\'' + constParam + '\');});');
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
                        queryPanel.show();
                        queryPanel.collapse(false);
                        var QueryAreaState = Cases[j].getElementsByTagName('QueryAreaState');
                        if (QueryAreaState.length > 0) {
                            QueryAreaState = QueryAreaState[0];
                            if (QueryAreaState.childNodes[0].nodeValue == 'EXPAND') {
                                queryPanel.expand(false);
                                queryPanelExpendButton.icon = iconPath.expand;
                                queryPanelExpendButton.getEl().dom.getElementsByTagName('button')[0].style.backgroundImage = 'url(' + iconPath.expand + ')';

                            } else if (QueryAreaState.childNodes[0].nodeValue == 'COLLAPSED') {} else if (QueryAreaState.childNodes[0].nodeValue == 'HIDDEN') {
                                queryPanel.hide();
                                queryPanelExpendButton.hide();
                                topPanel.getTopToolbar().items.get(20).hide();
                                topPanel.getTopToolbar().items.get(23).hide();
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
            var pagingToolbar = grid.getBottomToolbar();
            pagingToolbar.add('-');
            pagingToolbar.addButton({
                tooltip: '第一页',
                iconCls: "x-tbar-page-first",
                handler: function() {
                    if (currentPageField.getValue() > 1) {
                        currentPageField.setValue(1);
                        queryFunction();

                    }

                }

            });
            pagingToolbar.addButton({
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
            pagingToolbar.addField(currentPageField);
            pagingToolbar.addText('/');
            pageCountField = new Ext.form.NumberField();
            pageCountField.setWidth(34);
            pageCountField.setValue(0);
            pageCountField.disable();
            pagingToolbar.addField(pageCountField);
            pagingToolbar.addButton({
                tooltip: '下一页',
                iconCls: "x-tbar-page-next",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(currentPageField.getValue() + 1);
                        queryFunction();

                    }

                }

            });
            pagingToolbar.addButton({
                tooltip: '最后页',
                iconCls: "x-tbar-page-last",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(pageCountField.getValue());
                        queryFunction();

                    }

                }

            });
            if (width > 400) {
                pagingToolbar.add('-');
                pagingToolbar.addText('每页');
                pageSizeField = new Ext.form.NumberField({
                    minValue: 0,
                    allowBlank: false,
                    allowNegative: false,
                    allowDecimals: false

                });
                pageSizeField.setWidth(28);
                pagingToolbar.addField(pageSizeField);
                pagingToolbar.addText('行');
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
            var selectedFlag = false;
            var records = store.getRange();
            for (var i = 0; i < records.length; ++i) {
                if (records[i].data.isSelect) {
                    store.remove(records[i]);
                    selectedFlag = true;

                }

            }
            if (!selectedFlag) {
                Ext.alert(SOC_MESSAGE.noSelectedRecord);

            }

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
            for (var i = 0; i < cmConfig.length; ++i) {
                if (cmConfig[i].editor) {
                    this.editors[cmConfig[i].dataIndex] = cmConfig[i].editor;

                }

            }
            cmConfig.splice(0, 0, checkColumn);

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
                    parent.reLogin(document);

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
            for (var i = 0; i < list.length; ++i) {
                if (list[i].hid) {
                    list[i]['isSelect'] = false;
                    var index = hidList.indexOf(list[i].hid);
                    if(index != -1) list[i]['isSelect'] = true;
                    var r = new Ext.data.Record(list[i], list[i].hid);
                    store.addSorted(r);

                } else
                {
                    alert('in showViewData:value object has a null identifier (hid)');

                }

            }
            modifiedFlag = false;

        }

    };

}


function DetailAreaUnit(_id) {
    var id = _id;
    var mainPanel = null;
    var topPanel = null;
    var dataPanel = null;
    var fieldSet = new Ext.form.FieldSet({
        bodyStyle: 'border:0px;padding:10px;',
        autoHeight: true,
        height: 0

    });
    var titlePanel = new Ext.Panel({
        bodyStyle: 'border:0px;padding:0px;',
        autoHeight: true,
        height: 0

    });
    var pageUnit = null;
    var configXML = null;
    var oldPageParam = '';
    var title = '';
    var billName = null;
    var width = 790;
    
    var defaults = {};
    var queryFunction = null;
    var valueObject = {};
    
    var fieldsRanking=null;
    return {
        fields: [],
        addToBillTitle: function(p, layCfg) {
            if (p instanceof Array) {
                if (!layCfg) {
                    layCfg = {
                        labelRate: 0.45,
                        fieldsPerRow: 4

                    };

                } else
                {
                    if (!layCfg.labelRate) {
                        layCfg.labelRate = 0.5;

                    }
                    if (!layCfg.fieldsPerRow) {
                        layCfg.fieldsPerRow = 4;

                    }

                }
                var fieldWidth = parseInt((width - 70) / layCfg.fieldsPerRow);
                var labelWidth = parseInt(fieldWidth * layCfg.labelRate);
                var valueWidth = fieldWidth - labelWidth;
                var i = 0;
                while (i < p.length) {
                    var j = 0;
                    var row = new Ext.Panel(rowConfig);
                    row.add({
                        tag: 'div',
                        html: '',
                        bodyStyle: queryLabel + 'width:12'

                    });
                    while (j < layCfg.fieldsPerRow) {
                        if (i == p.length) {
                            break;

                        }
                        if (p[i] != EMPTY_SITE) {
                            if (p[i].xtype == 'hidden') {
                                this.fields[p[i].name] = row.add(p[i]);
                                i++;
                                continue;

                            }
                            var label = row.add({
                                tag: 'div',
                                html: (p[i].fieldLabel ? p[i].fieldLabel: '') + '：',
                                bodyStyle: queryLabel + 'width:' + (labelWidth)

                            });
                            if (p[i].rowspan && p[i].rowspan > 1) {
                                p[i].width = valueWidth + (p[i].rowspan - 1) * fieldWidth - (indent * (p[i].rowspan - 1));
                                j = j + (p[i].rowspan - 1);

                            } else
                            {
                                p[i].width = valueWidth;

                            }
                            this.fields[p[i].name] = row.add(p[i]);
                            this.fields[p[i].name].label = label;

                        } else
                        {
                            row.add({
                                tag: 'div',
                                html: '',
                                bodyStyle: queryLabel + 'width:' + (fieldWidth - indent)

                            });

                        }
                        j++;
                        i++;

                    }
                    titlePanel.add(row);

                }

            } else
            {
                titlePanel.add(p);

            }

        },
        addToFieldSet: function(p, layCfg) {
            if (p instanceof Array) {
                if (!layCfg) {
                    layCfg = {
                        labelRate: 0.45,
                        fieldsPerRow: 4

                    };

                } else
                {
                    if (!layCfg.labelRate) {
                        layCfg.labelRate = 0.5;

                    }
                    if (!layCfg.fieldsPerRow) {
                        layCfg.fieldsPerRow = 4;

                    }

                }
                var fieldWidth = parseInt((width - 70) / layCfg.fieldsPerRow);
                var labelWidth = parseInt(fieldWidth * layCfg.labelRate);
                var valueWidth = fieldWidth - labelWidth;
                var i = 0;
                while (i < p.length) {
                    var j = 0;
                    var row = new Ext.Panel(rowConfig);
                    while (j < layCfg.fieldsPerRow) {
                        if (i == p.length) {
                            break;

                        }
                        if (p[i] != EMPTY_SITE) {
                            if (p[i].xtype == 'hidden') {
                                this.fields[p[i].name] = row.add(p[i]);
                                i++;
                                continue;

                            }
                            var label = row.add({
                                tag: 'div',
                                html: (p[i].fieldLabel ? p[i].fieldLabel: '') + '：',
                                bodyStyle: queryLabel + 'width:' + (labelWidth)

                            });
                            if (p[i].rowspan && p[i].rowspan > 1) {
                                p[i].width = valueWidth + (p[i].rowspan - 1) * fieldWidth - (indent * (p[i].rowspan - 1));
                                j = j + (p[i].rowspan - 1);

                            } else
                            {
                                p[i].width = valueWidth;

                            }
                            this.fields[p[i].name] = row.add(p[i]);
                            this.fields[p[i].name].label = label;

                        } else
                        {
                            row.add({
                                tag: 'div',
                                html: '',
                                bodyStyle: queryLabel + 'width:' + (fieldWidth - indent)

                            });

                        }
                        j++;
                        i++;

                    }
                    fieldSet.add(row);

                }

            } else
            {
                fieldSet.add(p);

            }

        },
        checkFields: function() {
            var i = 0;
            var textFields = mainPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                if (!textFields[i].hidden && !textFields[i].disabled && !textFields[i].validate()) {
                    pageUnit.setActiveTab(this);
                    textFields[i].focus();
                    return false;

                }

            }
            var numberFields = mainPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                if (!numberFields[i].hidden && !numberFields[i].disabled && !numberFields[i].validate()) {
                    pageUnit.setActiveTab(this);
                    numberFields[i].focus();
                    return false;

                }

            }
            var dateFields = mainPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                if (!dateFields[i].hidden && !dateFields[i].disabled && !dateFields[i].validate()) {
                    pageUnit.setActiveTab(this);
                    dateFields[i].focus();
                    return false;

                }

            }
            var combos = mainPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                if (!combos[i].hidden && !combos[i].disabled && !combos[i].validate()) {
                    pageUnit.setActiveTab(this);
                    combos[i].focus();
                    return false;

                }

            }
            var triggers = mainPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                if (!triggers[i].hidden && !triggers[i].disabled && !triggers[i].validate()) {
                    pageUnit.setActiveTab(this);
                    triggers[i].focus();
                    return false;

                }

            }
            var textareas = mainPanel.findByType('textarea');
            for (i = 0; i < textareas.length; ++i) {
                if (!textareas[i].hidden && !textareas[i].disabled && !textareas[i].validate()) {
                    pageUnit.setActiveTab(this);
                    textareas[i].focus();
                    return false;

                }

            }
            var timeFields = mainPanel.findByType('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                if (!timeFields[i].hidden && !timeFields[i].disabled && !timeFields[i].validate()) {
                    pageUnit.setActiveTab(this);
                    timeFields[i].focus();
                    return false;

                }

            }
            return true;

        },
        clean: function() {
            this.showViewData({
                isSucceed: true,
                resultList: [{}]

            });

        },
        findById: function(_id) {
            return mainPanel.findById(_id);

        },
        getButtons: function() {
            alert('来找闫一夫');

        },
        getEm: function() {
            return mainPanel;

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
        getValueObject: function() {
            var _valueObject = {};
            for (var k in valueObject) {
                _valueObject[k] = valueObject[k];

            }
            var i = 0;
            var textFields = mainPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                var key = textFields[i].getName();
                if (textFields[i].getValue() === '' || textFields[i].getValue() == '自动生成') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = textFields[i].getValue();

                }

            }
            var numberFields = mainPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                var key = numberFields[i].getName();
                if (numberFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = numberFields[i].getValue();

                }

            }
            var dateFields = mainPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                var key = dateFields[i].getName();
                if (dateFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = dateFields[i].getValue();

                }

            }
            var hiddenFields = mainPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                var key = hiddenFields[i].getName();
                if (hiddenFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = hiddenFields[i].getValue();

                }

            }
            var combos = mainPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                var key = combos[i].getName();
                if (combos[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = combos[i].getValue();

                }

            }
            var triggers = mainPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                var key = triggers[i].getName();
                if (triggers[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = triggers[i].getValue();

                }

            }
            var textareas = mainPanel.findByType('textarea');
            for (i = 0; i < textareas.length; ++i) {
                var key = textareas[i].getName();
                if (textareas[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = textareas[i].getValue();

                }

            }
            var timeFields = mainPanel.findByType('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                var key = timeFields[i].getName();
                if (timeFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = timeFields[i].getValue();

                }

            }
            var htmleditors = mainPanel.findByType('htmleditor');
            for (i = 0; i < htmleditors.length; ++i) {
                var key = htmleditors[i].getName();
                if (htmleditors[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = htmleditors[i].getValue();

                }

            }
            if (typeof _valueObject.hid == 'undefined') {
                _valueObject.hid = null;

            }
            return _valueObject;

        },
        getWidth: function() {
            return width;

        },
        getXType: function() {
            return 'detailarea';

        },
        init: function() {
        	topPanel = new Ext.Panel({
                height: 55,
                bodyStyle: 'border:0px',
                html: '<div align="center" valign="bottom"><br><input readOnly="true" id="' + id + '__billtitle" size="45" class="x-field-billtitle" value="' + billName + '"/></div>'

            });
            if (billName == null) {
                topPanel.hide();

            }
            dataPanel = new Ext.Panel({
                id: id + '__data',
                bodyStyle: 'border:0px;padding-left:10px;padding-right:10px;padding-top:10px',
                border: false,
                autoHeight: true,
                items: [titlePanel, fieldSet]

            });
            mainPanel = new Ext.Panel({
                id: id,
                title: title,
                width:width,
                height: 500,
                autoHeight: true,
                header: true,
                items: [topPanel, dataPanel, {
                    xtype: 'panel',
                    layout: 'table',
                    height: 10,
                    border: false

                }],
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
                '-', {
                    text: 'button9',
                    hidden: true

                },
                '-', {
                    text: 'button10',
                    hidden: true

                }]

            });

        },
        isModified: function() {
            var isEmpty = true;
            for (var k in valueObject) {
                isEmpty = false;
                break;

            }
            var obj = this.getValueObject();
            if (isEmpty) {
                for (var k in obj) {
                    if (obj[k]) {
                    	return true;
					}

                }
                return false;

            } else
            {
                for (var k in valueObject) {
                    if (obj[k] !== undefined && defaults[k] === undefined) {
                        if (valueObject[k] instanceof Date) {
                            if (valueObject[k].format('Ymd') != obj[k].format('Ymd')) {
                                return true;

                            }

                        } else
                        {   
                        	var isNull = valueObject[k] == '' && obj[k] == null;
                        	if (valueObject[k] != obj[k] && !isNull) {
                                return true;

                            }

                        }

                    }

                }
                return false;

            }

        },
        loadAreaConfig: function() {
            if (configXML == null) {
                if (AppConfig != null) {
                    var areas = AppConfig.getElementsByTagName('Area');
                    for (var i = 0; i < areas.length; ++i) {
                        if (areas[i].getAttribute('id') == this.getId()) {
                            if (areas[i].getAttribute('type') == 'DetailAreaUnit') {
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
                defaults = {};
                var buttons = mainPanel.getTopToolbar().items;
                for (var i = buttons.getCount() / 2; i > 0; --i) {
                    buttons.get(i * 2 - 1).hide();

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
                        if (Edit) {
                            var n = 0;
                            var textFields = dataPanel.findByType('textfield');
                            for (; n < textFields.length; ++n) {
                                textFields[n].setDisabled(false);

                            }
                            var numberFields = dataPanel.findByType('numberfield');
                            for (n = 0; n < numberFields.length; ++n) {
                                numberFields[n].setDisabled(false);

                            }
                            var dateFields = dataPanel.findByType('datefield');
                            for (n = 0; n < dateFields.length; ++n) {
                                dateFields[n].setDisabled(false);

                            }
                            var combos = dataPanel.findByType('combo');
                            for (n = 0; n < combos.length; ++n) {
                                combos[n].setDisabled(false);

                            }
                            var triggers = dataPanel.findByType('trigger');
                            for (n = 0; n < triggers.length; ++n) {
                                triggers[n].setDisabled(false);

                            }
                            var textareas = dataPanel.findByType('textarea');
                            for (n = 0; n < textareas.length; ++n) {
                                textareas[n].setDisabled(false);

                            }
                            var timeFields = dataPanel.findByType('timefield');
                            for (n = 0; n < timeFields.length; ++n) {
                                timeFields[n].setDisabled(false);

                            }

                        } else
                        {
                            var n = 0;
                            var textFields = dataPanel.findByType('textfield');
                            for (; n < textFields.length; ++n) {
                                textFields[n].setDisabled(true);

                            }
                            var numberFields = dataPanel.findByType('numberfield');
                            for (n = 0; n < numberFields.length; ++n) {
                                numberFields[n].setDisabled(true);

                            }
                            var dateFields = dataPanel.findByType('datefield');
                            for (n = 0; n < dateFields.length; ++n) {
                                dateFields[n].setDisabled(true);

                            }
                            var combos = dataPanel.findByType('combo');
                            for (n = 0; n < combos.length; ++n) {
                                combos[n].setDisabled(true);

                            }
                            var triggers = dataPanel.findByType('trigger');
                            for (n = 0; n < triggers.length; ++n) {
                                triggers[n].setDisabled(true);

                            }
                            var textareas = dataPanel.findByType('textarea');
                            for (n = 0; n < textareas.length; ++n) {
                                textareas[n].setDisabled(true);

                            }
                            var timeFields = dataPanel.findByType('timefield');
                            for (n = 0; n < timeFields.length; ++n) {
                                timeFields[n].setDisabled(true);

                            }

                        }
                        var FieldsTag = Cases[j].getElementsByTagName('Fields');
                        if (FieldsTag.length > 0) {
                            FieldsTag = FieldsTag[0];
                            var fields = FieldsTag.getElementsByTagName('Field');
                            for (var i = 0; i < fields.length; ++i) {
                                var name = fields[i].getAttribute('name');
                                var xtype = fields[i].getAttribute('xtype');
                                var enabled = fields[i].getElementsByTagName('Enabled')[0].childNodes[0].nodeValue;
                                var def = '';
                                if (fields[i].getElementsByTagName('Default')[0].childNodes.length > 0) {
                                    def = fields[i].getElementsByTagName('Default')[0].childNodes[0].nodeValue;

                                }
                                var Fhide = fields[i].getElementsByTagName('Fhide');
                                var typeFields = mainPanel.findByType(xtype);
                                for (var k = 0; k < typeFields.length; ++k) {
                                    if (name == typeFields[k].getName()) {
                                        if (Fhide.length > 0 && Fhide[0].text == 'true') {
                                            typeFields[k].hide();

                                        }
                                        if (enabled == 'true') {
                                            typeFields[k].setDisabled(false);
                                            typeFields[k].validate();

                                        } else
                                        {
                                            typeFields[k].setDisabled(true);

                                        }
                                        if (def !== '') {
                                            defaults[name] = def;
                                            typeFields[k].setValue(eval(def));

                                        }
                                        break;

                                    }

                                }

                            }

                        }
                        var OperatersTag = Cases[j].getElementsByTagName('Operaters');
                        if (OperatersTag.length == 0) {
                            alert('can not find Operaters in cfg.xml');
                            return;

                        }
                        OperatersTag = OperatersTag[0];
                        var operaters = OperatersTag.getElementsByTagName('Operater');
                        for (var i = 0; i < operaters.length; ++i) {
                            if (i == 10) {
                                alert('operaters full');

                            }
                            var Operater = operaters[i];
                            var text = Operater.getElementsByTagName('Text')[0].childNodes[0].nodeValue;
                            var method = Operater.getElementsByTagName('Method')[0].childNodes[0].nodeValue;
                            var constParam = '';
                            if (Operater.getElementsByTagName('ConstParam')[0].childNodes.length > 0) {
                                constParam = Operater.getElementsByTagName('ConstParam')[0].childNodes[0].nodeValue;

                            }
                            buttons.get(i * 2).show();
                            buttons.get(i * 2 + 1).setText(text);
                            if (method !== '') {
                                eval('mainPanel.getTopToolbar().items.get(' + (i * 2 + 1) + ').setHandler(function(){' + id + '.' + method + '(\'' + constParam + '\')});');

                            }
                            buttons.get(i * 2 + 1).show();

                        }
                        for (i++; i < 10; ++i) {
                            buttons.get(i * 2).hide();

                        }
                        if (operaters.length === 0) {
                            buttons.get(0).hide();

                        }
                        var Title = Cases[j].getElementsByTagName('Title');
                        if (Title.length > 0) {
                            Title = Title[0];
                            if (Title.childNodes.length > 0) mainPanel.setTitle(Title.childNodes[0].nodeValue);

                        }
                        var BillName = Cases[j].getElementsByTagName('BillName');
                        if (BillName.length > 0) {
                            BillName = BillName[0];
                            if (BillName.childNodes.length > 0) {
                                this.setBillName(BillName.childNodes[0].nodeValue);

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
                        break;

                    }

                }
                oldPageParam = this.getPageParam();

            }

        },
        refreshFor: function(_queryFunction) {
            queryFunction = _queryFunction;

        },
        setBillName: function(_billName) {
            if (topPanel == null) {
                billName = _billName;

            } else
            {
                document.getElementById(id + '__billtitle').value = _billName;
                topPanel.show();

            }

        },
        setButtonTop: function() {},
        setPageUnit: function(_pageUnit) {
            pageUnit = _pageUnit;

        },
        setTitle: function(_title) {
            title = _title;

        },
        setWidth: function(_width) {
            width = _width;

        },
        showViewData: function(viewData) {
            if (!viewData.isSucceed) {
                parent.reLogin(document);
                return;

            }
            var list = viewData.resultList;
            if (list.length == 0) {
                alert('TODO:' + id + 'no data');
                return;

            }
            valueObject = list[0];
            var i = 0;
            var textFields = mainPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                var key = textFields[i].getName();
                if (defaults[key]) {
                    textFields[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined") {
                    if (typeof(textFields[i].renderer) == 'function') {
                        textFields[i].setValue(textFields[i].renderer(valueObject[key], valueObject));

                    } else
                    {
                        textFields[i].setValue(valueObject[key]);

                    }

                } else
                {
                    textFields[i].setValue('');

                }

            }
            var hiddenFields = mainPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                var key = hiddenFields[i].getName();
                if (defaults[key]) {
                    hiddenFields[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined") {
                    hiddenFields[i].setValue(valueObject[key]);

                } else
                {
                    hiddenFields[i].setValue('');

                }

            }
            var numberFields = mainPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                var key = numberFields[i].getName();
                if (defaults[key]) {
                    numberFields[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined" && valueObject[key] != null) {
                    numberFields[i].setValue(valueObject[key]);

                } else
                {
                    numberFields[i].setValue('');

                }

            }
            var dateFields = mainPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                var key = dateFields[i].getName();
                if (defaults[key]) {
                    dateFields[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (valueObject[key]) {
                    dateFields[i].setValue(valueObject[key]);

                } else
                {
                    dateFields[i].setValue('');

                }

            }
            var combos = mainPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                var key = combos[i].getName();
                if (defaults[key]) {
                    combos[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined") {
                    combos[i].setValue(valueObject[key]);

                } else
                {
                    combos[i].setValue('');

                }

            }
            var triggers = mainPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                var key = triggers[i].getName();
                if (defaults[key]) {
                    triggers[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined") {
                    triggers[i].setValue(valueObject[key]);

                } else
                {
                    triggers[i].setValue('');

                }

            }
            var textareas = mainPanel.findByType('textarea');
            for (i = 0; i < textareas.length; ++i) {
                var key = textareas[i].getName();
                if (defaults[key]) {
                    textareas[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined") {
                    textareas[i].setValue(valueObject[key]);

                } else
                {
                    textareas[i].setValue('');

                }

            }
            var timeFields = mainPanel.findByType('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                var key = timeFields[i].getName();
                if (defaults[key]) {
                    timeFields[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined") {
                    timeFields[i].setValue(valueObject[key]);

                } else
                {
                    timeFields[i].setValue('');

                }

            }
			var htmleditors = mainPanel.findByType('htmleditor');
            for (i = 0; i < htmleditors.length; ++i) {
                var key = htmleditors[i].getName();
                if (defaults[key]) {
                    htmleditors[i].setValue(eval(defaults[key]));
                    continue;

                }
                if (typeof valueObject[key] != "undefined") {
                    htmleditors[i].setValue(valueObject[key]);

                } else
                {
                    htmleditors[i].setValue('');

                }

            }
        }

    };

}


function SelectAreaUnit(_id) {
    var id = _id;
    var mainPanel = null;
    var topPanel = null;
    var queryPanel = new Ext.Panel({
        id: id + '__queryPanel',
        bodyStyle: 'border:0px;',
        height: 0,
        border: false,
        autoHeight: true

    });
    queryPanel.hide();
    var sumPanel = new Ext.Panel({
        height: 0,
        autoHeight: true,
        layout: 'table',
        baseCls: 'x-panel-mc'

    });
    sumPanel.hide();
    var sm = null;
    var cm = null;
    var store = null;
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
    var orderField = null;
    var orderDir = 'ASC';
    var effectiveCmConfig = null;
    var checkColumn = new Ext.grid.CheckColumn({
        id: 'isSelect',
        header: "&nbsp;<input type=checkbox style=\"height:15\" id=\"" + id + "_SELECT_ALL\"  onclick=\"" + id + ".checkAll(this);\">",
        fixed: true,
        dataIndex: 'isSelect',
        width: 40

    });
    var radioColumn = new Ext.grid.RadioColumn({
        id: 'isChecked',
        header: '',
        fixed: true,
        dataIndex: 'isChecked',
        width: 30

    });
    return {
        queryFields: [],
        addToQueryPanel: function(p, layCfg) {
            if (queryPanel.hidden) {
                queryPanel.show();

            }
            if (p instanceof Array) {
                if (!layCfg) {
                    layCfg = {
                        labelRate: 0.45,
                        fieldsPerRow: 4

                    };

                } else
                {
                    if (!layCfg.labelRate) {
                        layCfg.labelRate = 0.45;

                    }
                    if (!layCfg.fieldsPerRow) {
                        layCfg.fieldsPerRow = 4;

                    }

                }
                var fieldWidth = parseInt((width - 30) / layCfg.fieldsPerRow);
                var labelWidth = parseInt(fieldWidth * layCfg.labelRate);
                var valueWidth = fieldWidth - labelWidth;
                var i = 0;
                while (i < p.length) {
                    var j = 0;
                    var row = new Ext.Panel(rowConfig);
                    while (j < layCfg.fieldsPerRow) {
                        if (i == p.length) {
                            break;

                        }
                        if (p[i] != EMPTY_SITE) {
                            if (p[i].xtype == 'hidden') {
                                this.queryFields[p[i].name] = row.add(p[i]);
                                i++;
                                continue;

                            }
                            var label = row.add({
                                tag: 'div',
                                html: (p[i].fieldLabel ? p[i].fieldLabel: '') + '：',
                                bodyStyle: queryLabel + 'width:' + (labelWidth)

                            });
                            if (p[i].rowspan && p[i].rowspan > 1) {
                                p[i].width = valueWidth + (p[i].rowspan - 1) * fieldWidth - (indent * (p[i].rowspan - 1));
                                j = j + (p[i].rowspan - 1);

                            } else
                            {
                                p[i].width = valueWidth;

                            }
                            this.queryFields[p[i].name] = row.add(p[i]);
                            this.queryFields[p[i].name].label = label;

                        } else
                        {
                            row.add({
                                tag: 'div',
                                html: '',
                                bodyStyle: queryLabel + 'width:' + (fieldWidth - indent)

                            });

                        }
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
            var rs = store.getRange();
            for (var i = 0; i < rs.length; ++i) {
                rs[i].set('isSelect', _checkbox.checked);

            }

        },
        clean: function() {
            store.removeAll();
            if (currentPageField != null) {
                currentPageField.setValue(0);
                pageCountField.setValue(0);

            }
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].setValue('');

            }
            var hiddenFields = queryPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                hiddenFields[i].setValue('');

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].setValue('');

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].setValue('');

            }
            var combos = queryPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                combos[i].setValue('');

            }
            var triggers = queryPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                triggers[i].setValue('');

            }
            if (orderDir) {
                var sc = grid.getView().sortClasses;
                grid.getView().mainHd.select('td').removeClass(sc);
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
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                var value = textFields[i].getValue();
                if (value != '') {
                    var name = textFields[i].getName();
                    var rule = textFields[i].rule;
                    var owner = textFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var hiddenFields = queryPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                var value = hiddenFields[i].getValue();
                if (value != '') {
                    var name = hiddenFields[i].getName();
                    var rule = hiddenFields[i].rule;
                    var owner = hiddenFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                var value = numberFields[i].getValue();
                if (value + '') {
                    var name = numberFields[i].getName();
                    var rule = numberFields[i].rule;
                    var owner = numberFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                var value = dateFields[i].getValue();
                if (value) {
                    //value = value.dateFormat('Y-m-d');
                    value = value.dateFormat(dateFields[i].format);
                    var name = dateFields[i].getName();
                    var rule = dateFields[i].rule;
                    var owner = dateFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var combos = queryPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                var value = combos[i].getValue();
                if (value != '') {
                    var name = combos[i].getName();
                    var rule = combos[i].rule;
                    var owner = combos[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var triggers = queryPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                var value = triggers[i].getValue();
                if (value != '') {
                    var name = triggers[i].getName();
                    var rule = triggers[i].rule;
                    var owner = triggers[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            if (currentPageField != null) {
                areaInfo.currentPage = currentPageField.getValue();
                areaInfo.pageSize = pageSizeField.getValue();

            }
            areaInfo.areaId = id;
            areaInfo.functionId = functionId;
            areaInfo.functionProgParam = functionProgParam;
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
            var records = sm.getSelections();
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
            sm = new Ext.grid.CheckboxSelectionModel({
                singleSelect: true
            });
            if (cmConfig === null) {
                alert('cm is null');
                return;

            }
            cm = new Ext.grid.ColumnModel(cmConfig);
            store = new Ext.data.SimpleStore({
                fields: [{
                    name: 'hid'

                }]

            });
            topPanel = new Ext.Panel({
                bodyStyle: 'border:0px',
                height: 0,
                autoHeight: true,
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
	                    	eval(id).clean();
	                        if (typeof(queryFunction) == 'function') {
	                            queryFunction();
	
	                        }
						}
					}
                }]

            });
            topPanel.add(queryPanel);
            grid = new Ext.grid.GridPanel({
                id: id + '__grid',
                store: store,
                cm: cm,
                sm: sm,
                stripeRows: true,
                width: width,
                height: height,
                frame: true,
                bbar: []

            });
            checkColumn.init(grid);
            radioColumn.init(grid);
            mainPanel = new Ext.Panel({
                id: id,
                title: '',
                width: width,
                autoHeight: true,
                items: [topPanel, grid, sumPanel],
                tools: []

            });
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var triggerFields = queryPanel.findByType('trigger');
            for (i = 0; i < triggerFields.length; ++i) {
                triggerFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction();

                    }

                });

            }
            var timeFields = queryPanel.findByType('timefield');
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
					
					cm=new Ext.grid.ColumnModel(effectiveCmConfig);
					
					grid.reconfigure(store,cm);
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
                cm.setHidden(cm.getIndexById('isSelect'), true);
                cm.setHidden(cm.getIndexById('isChecked'), false);
                topPanel.getTopToolbar().items.get(1).setHandler(function() {
                    var list = _this.getSelected();
                    if (list.length == 0) {
                        Ext.alert(SOC_MESSAGE.noSignedRecord);

                    } else
                    {
                        callback(_this.siteTag, list);
                        mainPanel.ownerCt.hide();

                    }

                });
                topPanel.getTopToolbar().items.get(2).show();
                topPanel.getTopToolbar().items.get(3).show();
                if (!grid.hasListener('celldblclick')) {
                    grid.on('celldblclick', 
                    function(_grid, _rowIndex, _columnIndex, _e) {
                        var r = grid.getStore().getAt(_rowIndex);
                        var list = [];
                        list.push(r.data);
                        callback(_this.siteTag, list);
                        mainPanel.ownerCt.hide();

                    });

                }

            } else if (selectMode == 'SINGLES') {
                cm.setHidden(cm.getIndexById('isSelect'), true);
                cm.setHidden(cm.getIndexById('isChecked'), true);
                topPanel.getTopToolbar().items.get(1).setHandler(function() {
                    var list = _this.getSelected();
                    if (list.length == 0) {
                        Ext.alert(SOC_MESSAGE.noSignedRecord);

                    } else
                    {
                        callback(_this.siteTag, list);
                        mainPanel.ownerCt.hide();

                    }

                });
                topPanel.getTopToolbar().items.get(2).show();
                topPanel.getTopToolbar().items.get(3).show();
                if (!grid.hasListener('celldblclick')) {
                    grid.on('celldblclick', 
                    function(_grid, _rowIndex, _columnIndex, _e) {
                        var r = grid.getStore().getAt(_rowIndex);
                        var list = [];
                        list.push(r.data);
                        callback(_this.siteTag, list);

                    });

                }

            } else if (selectMode == 'COMPLEX') {
                addList = [];
                removeList = [];
                selectedHids = {};
                cm.setHidden(cm.getIndexById('isSelect'), false);
                cm.setHidden(cm.getIndexById('isChecked'), true);
                topPanel.getTopToolbar().items.get(1).setHandler(function() {
                    callback(_this.siteTag, addList, removeList);
                    mainPanel.ownerCt.hide();

                });
                topPanel.getTopToolbar().items.get(2).hide();
                topPanel.getTopToolbar().items.get(3).hide();

            }

        },
        refreshFor: function(_queryFunction) {
            queryFunction = _queryFunction;
            var pagingToolbar = grid.getBottomToolbar();
            pagingToolbar.add('-');
            pagingToolbar.addButton({
                tooltip: '第一页',
                iconCls: "x-tbar-page-first",
                handler: function() {
                    if (currentPageField.getValue() > 1) {
                        currentPageField.setValue(1);
                        queryFunction();

                    }

                }

            });
            pagingToolbar.addButton({
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
            pagingToolbar.addField(currentPageField);
            pagingToolbar.addText('/');
            pageCountField = new Ext.form.NumberField();
            pageCountField.setWidth(28);
            pageCountField.setValue(0);
            pageCountField.disable();
            pagingToolbar.addField(pageCountField);
            pagingToolbar.addButton({
                tooltip: '下一页',
                iconCls: "x-tbar-page-next",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(currentPageField.getValue() + 1);
                        queryFunction();

                    }

                }

            });
            pagingToolbar.addButton({
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
            pagingToolbar.addText('每页');
            pageSizeField = new Ext.form.NumberField({
                minValue: 0,
                allowBlank: false,
                allowNegative: false,
                allowDecimals: false

            });
            pageSizeField.setWidth(28);
            pagingToolbar.addField(pageSizeField);
            pagingToolbar.addText('行');
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
            cmConfig.splice(0, 0, checkColumn);
            cmConfig.splice(0, 0, radioColumn);

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
            if (!viewData.isSucceed) {
                parent.reLogin(document);
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
                                    list[i].isSelect = true;
                                    selectedHids[list[i].hid] = true;
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
                                    list[i].isSelect = true;
                                    selectedHids[list[i].hid] = true;
                                    break;

                                }

                            }

                        }

                    } else if (selectedObjectType == 'string') {
                        if (singlePK) {
                            for (var j = 0; j < selectedObjects.length; ++j) {
                                if (selectedObjects[j] == list[i][pks]) {
                                    list[i].isSelect = true;
                                    selectedHids[list[i].hid] = true;
                                    break;

                                }

                            }

                        } else
                        {
                            alert('selectedObject is string,but has more than one pk field');

                        }

                    }

                }
                var r = new Ext.data.Record(list[i], list[i].hid);
                store.addSorted(r);

            }

        },
        setWidth: function(_width) {
            width = _width;

        }

    };

}


function SelectTreeAreaUnit(_id) {
    var id = _id;
    var mainPanel = null;
    var treePanel = null;
    var grid = null;
    var topPanel = null;
    var queryPanel = new Ext.Panel({
        id: id + '__queryPanel',
        bodyStyle: 'border:0px;',
        height: 0,
        border: false,
        autoHeight: true

    });
    
    queryPanel.hide();
    var sumPanel = new Ext.Panel({
        height: 0,
        autoHeight: true,
        layout: 'table',
        baseCls: 'x-panel-mc'

    });
    sumPanel.hide();
    var store = null;
    var root = null;
    var rootText = 'SOC';
    var pageUnit = null;
    var title = '';
    var width = 700;
    var height = 410;
    var callback = null;
    var selectMode = null;
    var selectEvent = null;
    var otherConditions = ' 4=4';
    var treeConditions = ' 5=5';
    var srcContainer = null;
    var selectPK = null;
    var expandFunction = null;
    var queryFunction = null;
    var selectLeafOnlyFlag = true;
    var cm = null;
    var sm = null;
    var currentPageField = null;
    var pageCountField = null;
    var pageSizeField = null;
    var pageSize = 20;
    var selectedObjects = null;
    var pks = null;
    var addList = [];
    var removeList = [];
    var selectedHids = {};
    var orderField = null;
    var orderDir = 'ASC';
    var fieldsRanking=null;
    var cmConfig=null;
    var effectiveCmConfig = null;
    var checkColumn = new Ext.grid.CheckColumn({
        id: 'isSelect',
        header: "&nbsp;<input type=checkbox style=\"height:15\" id=\"" + id + "_SELECT_ALL\" onclick=\"" + id + ".checkAll(this);\">",
        fixed: true,
        dataIndex: 'isSelect',
        width: 40

    });
    var radioColumn = new Ext.grid.RadioColumn({
        id: 'isChecked',
        header: '',
        fixed: true,
        dataIndex: 'isChecked',
        width: 30

    });
    return {
        queryFields: [],
        checkAll: function(_checkbox) {
            var rs = store.getRange();
            for (var i = 0; i < rs.length; ++i) {
                rs[i].set('isSelect', _checkbox.checked);

            }

        },
        addToQueryPanel: function(p, layCfg) {
            if (queryPanel.hidden) {
                queryPanel.show();

            }
            if (p instanceof Array) {
                if (!layCfg) {
                    layCfg = {
                        labelRate: 0.45,
                        fieldsPerRow: 4

                    };

                } else
                {
                    if (!layCfg.labelRate) {
                        layCfg.labelRate = 0.45;

                    }
                    if (!layCfg.fieldsPerRow) {
                        layCfg.fieldsPerRow = 4;

                    }

                }
                var fieldWidth = parseInt((width - 30) / layCfg.fieldsPerRow);
                var labelWidth = parseInt(fieldWidth * layCfg.labelRate);
                var valueWidth = fieldWidth - labelWidth;
                var i = 0;
                while (i < p.length) {
                    var j = 0;
                    var row = new Ext.Panel(rowConfig);
                    while (j < layCfg.fieldsPerRow) {
                        if (i == p.length) {
                            break;

                        }
                        if (p[i] != EMPTY_SITE) {
                            if (p[i].xtype == 'hidden') {
                                this.queryFields[p[i].name] = row.add(p[i]);
                                i++;
                                continue;

                            }
                            var label = row.add({
                                tag: 'div',
                                html: (p[i].fieldLabel ? p[i].fieldLabel: '') + '：',
                                bodyStyle: queryLabel + 'width:' + (labelWidth)

                            });
                            if (p[i].rowspan && p[i].rowspan > 1) {
                                p[i].width = valueWidth + (p[i].rowspan - 1) * fieldWidth - (indent * (p[i].rowspan - 1));
                                j = j + (p[i].rowspan - 1);

                            } else
                            {
                                p[i].width = valueWidth;

                            }
                            this.queryFields[p[i].name] = row.add(p[i]);
                            this.queryFields[p[i].name].label = label;

                        } else
                        {
                            row.add({
                                tag: 'div',
                                html: '',
                                bodyStyle: queryLabel + 'width:' + (fieldWidth - indent)

                            });

                        }
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
        clean: function(isCleanRecords) {
            if (isCleanRecords === undefined) {
                isCleanRecords = true;

            }
            if (isCleanRecords === true) {
                store.removeAll();

            }
            if (currentPageField != null) {
                currentPageField.setValue(0);
                pageCountField.setValue(0);

            }
            if (orderDir) {
                var sc = grid.getView().sortClasses;
                grid.getView().mainHd.select('td').removeClass(sc);
                orderField = null;
                orderDir = null;

            }
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].setValue('');

            }
            var hiddenFields = queryPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                hiddenFields[i].setValue('');

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].setValue('');

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].setValue('');

            }
            var combos = queryPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                combos[i].setValue('');

            }
            var triggers = queryPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                triggers[i].setValue('');

            }
            var selectAllCheckbox = Ext.fly(id + '_SELECT_ALL');
            if (selectAllCheckbox) {
                selectAllCheckbox.dom.checked = false;

            }

        },
        cleanAll: function() {
            root.collapseChildNodes(false);
            root.expand(false, true);
            this.clean();
            selectPK = 'root';
            queryFunction(selectPK);

        },
        findById: function(_id) {
            return mainPanel.findById(_id);

        },
        getEm: function() {
            return mainPanel;

        },
        getAreaInfo: function() {
            var areaInfo = {};
            areaInfo.currentPage = 0;
            areaInfo.pageSize = pageSize;
            areaInfo.orderField = orderField;
            areaInfo.orderDir = orderDir;
            areaInfo.queryCondition = ' 2=2';
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                var value = textFields[i].getValue();
                if (value != '') {
                    var name = textFields[i].getName();
                    var rule = textFields[i].rule;
                    var owner = textFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var hiddenFields = queryPanel.findByType('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                var value = hiddenFields[i].getValue();
                if (value != '') {
                    var name = hiddenFields[i].getName();
                    var rule = hiddenFields[i].rule;
                    var owner = hiddenFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                var value = numberFields[i].getValue();
                if (value + '') {
                    var name = numberFields[i].getName();
                    var rule = numberFields[i].rule;
                    var owner = numberFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                var value = dateFields[i].getValue();
                if (value) {
                    value = value.dateFormat('Y-m-d');
                    var name = dateFields[i].getName();
                    var rule = dateFields[i].rule;
                    var owner = dateFields[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var combos = queryPanel.findByType('combo');
            for (i = 0; i < combos.length; ++i) {
                var value = combos[i].getValue();
                if (value != '') {
                    var name = combos[i].getName();
                    var rule = combos[i].rule;
                    var owner = combos[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            var triggers = queryPanel.findByType('trigger');
            for (i = 0; i < triggers.length; ++i) {
                var value = triggers[i].getValue();
                if (value != '') {
                    var name = triggers[i].getName();
                    var rule = triggers[i].rule;
                    var owner = triggers[i].owner;
                    rule = rule.replace('@NAME@', owner + '.' + name);
                    rule = rule.replace('@VALUE@', value);
                    areaInfo.queryCondition += (' and ' + rule);

                }

            }
            if (currentPageField != null) {
                areaInfo.currentPage = currentPageField.getValue();
                areaInfo.pageSize = pageSizeField.getValue();

            }
            areaInfo.areaId = id;
            areaInfo.functionId = functionId;
            areaInfo.functionProgParam = functionProgParam;
            return areaInfo;

        },
        getId: function() {
            return id;

        },
        getOtherConditions: function() {
            return otherConditions;

        },
        getTree: function() {
            return treePanel;

        },
        getTreeConditions: function() {
            return treeConditions;

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
        getRootNode: function() {
            return root;

        },
        getSelected: function() {
            var selectedVOs = [];
            var records = sm.getSelections();
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
            return 'selectTreeArea';

        },
        init: function() {
            sm = new Ext.grid.CheckboxSelectionModel({
                singleSelect: true

            });
            if (cm == null) {
                alert('cm is null');
                return;

            }
            topPanel = new Ext.Panel({
                height: 0,
                autoHeight: true,
                columnWidth: .7,
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
                    handler: function() {
                        if (typeof(queryFunction) == 'function') {
                            queryFunction(selectPK);

                        }

                    }

                },
                {
                    icon: iconPath.reset,
                    iconCls: 'border:0;',
                    handler: function() {
                        eval(id).clean();
                        if (typeof(queryFunction) == 'function') {
                            queryFunction(selectPK);

                        }

                    }

                }]

            });
            topPanel.add(queryPanel);
            treePanel = new Ext.tree.TreePanel({
                autoScroll: true,
                containerScroll: true,
                columnWidth: .3,
                rootVisible: false,
                height: height

            });
            root = new Ext.tree.TreeNode({
                expandable: true,
                id: 'root',
                text: rootText,
                draggable: false

            });
            treePanel.setRootNode(root);
            store = new Ext.data.SimpleStore({
                fields: [{
                    name: 'hid'

                }]

            });
            grid = new Ext.grid.GridPanel({
                id: id + '__grid',
                store: store,
                cm: cm,
                sm: sm,
                stripeRows: true,
                frame: true,
                bbar: [],
                columnWidth: .7,
                height: height - 21

            });
            checkColumn.init(grid);
            radioColumn.init(grid);
            mainPanel = new Ext.Panel({
                id: id,
                title: title,
                width: width,
                autoHeight: true,
                items: [topPanel, {
                    xtype: 'panel',
                    layout: 'column',
                    width: width - 4,
                    bodyStyle: 'border:0px;',
                    items: [treePanel,grid]
				}, sumPanel],
                tools: []

            });
            var i = 0;
            var textFields = queryPanel.findByType('textfield');
            for (; i < textFields.length; ++i) {
                textFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK);

                    }

                });

            }
            var numberFields = queryPanel.findByType('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                numberFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK);

                    }

                });

            }
            var dateFields = queryPanel.findByType('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                dateFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK);

                    }

                });

            }
            var triggerFields = queryPanel.findByType('trigger');
            for (i = 0; i < triggerFields.length; ++i) {
                triggerFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK);

                    }

                });

            }
            var timeFields = queryPanel.findByType('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                timeFields[i].on('specialkey', 
                function(_this, _e) {
                    if (_e.getKey() == 13 && queryFunction != null) {
                        queryFunction(selectPK);

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
        	fieldsRanking=getFieldRanking(getPageURL(),id,'');
				
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
					
					cm=new Ext.grid.ColumnModel(effectiveCmConfig);
					
					grid.reconfigure(store,cm);
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
                cm.setHidden(cm.getIndexById('isSelect'), true);
                cm.setHidden(cm.getIndexById('isChecked'), false);
                topPanel.getTopToolbar().items.get(1).setHandler(function() {
                    var list = _this.getSelected();
                    if (list.length == 0) {
                        Ext.alert(SOC_MESSAGE.noSignedRecord);

                    } else
                    {
                        callback(_this.siteTag, list);
                        mainPanel.ownerCt.hide();

                    }

                });
                topPanel.getTopToolbar().items.get(2).show();
                topPanel.getTopToolbar().items.get(3).show();
                if (!grid.hasListener('celldblclick')) {
                    grid.on('celldblclick', 
                    function(_grid, _rowIndex, _columnIndex, _e) {
                        var r = grid.getStore().getAt(_rowIndex);
                        var list = [];
                        list.push(r.data);
                        callback(_this.siteTag, list);
                        mainPanel.ownerCt.hide();

                    });

                }

            } else if (selectMode == 'SINGLES') {
                cm.setHidden(cm.getIndexById('isSelect'), true);
                cm.setHidden(cm.getIndexById('isChecked'), true);
                topPanel.getTopToolbar().items.get(1).setHandler(function() {
                    var list = _this.getSelected();
                    if (list.length == 0) {
                        Ext.alert(SOC_MESSAGE.noSignedRecord);

                    } else
                    {
                        callback(_this.siteTag, list);
                        mainPanel.ownerCt.hide();

                    }

                });
                topPanel.getTopToolbar().items.get(2).show();
                topPanel.getTopToolbar().items.get(3).show();
                if (!grid.hasListener('celldblclick')) {
                    grid.on('celldblclick', 
                    function(_grid, _rowIndex, _columnIndex, _e) {
                        var r = grid.getStore().getAt(_rowIndex);
                        var list = [];
                        list.push(r.data);
                        callback(_this.siteTag, list);

                    });

                }

            } else if (selectMode == 'COMPLEX') {
                addList = [];
                removeList = [];
                selectedHids = {};
                cm.setHidden(cm.getIndexById('isSelect'), false);
                cm.setHidden(cm.getIndexById('isChecked'), true);
                topPanel.getTopToolbar().items.get(1).setHandler(function() {
                    callback(_this.siteTag, addList, removeList);
                    mainPanel.ownerCt.hide();

                });
                topPanel.getTopToolbar().items.get(2).hide();
                topPanel.getTopToolbar().items.get(3).hide();

            }

        },
        selectLeafOnly: function(_b) {
            selectLeafOnlyFlag = _b;

        },
        refreshFor: function(_queryFunction) {
            queryFunction = _queryFunction;
            var pagingToolbar = grid.getBottomToolbar();
            pagingToolbar.add('-');
            pagingToolbar.addButton({
                tooltip: '第一页',
                iconCls: "x-tbar-page-first",
                handler: function() {
                    if (currentPageField.getValue() > 1) {
                        currentPageField.setValue(1);
                        queryFunction(selectPK);

                    }

                }

            });
            pagingToolbar.addButton({
                tooltip: '上一页',
                iconCls: "x-tbar-page-prev",
                handler: function() {
                    if (currentPageField.getValue() > 1) {
                        currentPageField.setValue(currentPageField.getValue() - 1);
                        queryFunction(selectPK);

                    }

                }

            });
            currentPageField = new Ext.form.NumberField({
                minValue: 0,
                allowBlank: false,
                allowNegative: false,
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
            pagingToolbar.addField(currentPageField);
            pagingToolbar.addText('/');
            pageCountField = new Ext.form.NumberField();
            pageCountField.setWidth(28);
            pageCountField.setValue(0);
            pageCountField.disable();
            pagingToolbar.addField(pageCountField);
            pagingToolbar.addButton({
                tooltip: '下一页',
                iconCls: "x-tbar-page-next",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(currentPageField.getValue() + 1);
                        queryFunction(selectPK);

                    }

                }

            });
            pagingToolbar.addButton({
                tooltip: '最后页',
                iconCls: "x-tbar-page-last",
                handler: function() {
                    if (currentPageField.getValue() < pageCountField.getValue()) {
                        currentPageField.setValue(pageCountField.getValue());
                        queryFunction(selectPK);

                    }

                }

            });
            if (width > 400) {
                pagingToolbar.add('-');
                pagingToolbar.addText('每页');
                pageSizeField = new Ext.form.NumberField({
                    minValue: 0,
                    allowBlank: false,
                    allowNegative: false,
                    allowDecimals: false

                });
                pageSizeField.setWidth(28);
                pagingToolbar.addField(pageSizeField);
                pagingToolbar.addText('行');
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
                    queryFunction(selectPK);

                }

            });

        },
        setCallBack: function(_f) {
            callback = _f;

        },
        setCm:function(_config)
		{
			cmConfig=_config;
            cm = new Ext.grid.ColumnModel(cmConfig);
            cmConfig.splice(0, 0, checkColumn);
            cmConfig.splice(0, 0, radioColumn);

        },
        setExpandFunction: function(_expandFunction) {
            expandFunction = _expandFunction;
            expandFunction('root');
            root.on('beforeexpand', 
            function(_this, _deep, _anim) {
                if (_this.childNodes.length == 0) {
                    expandFunction(_this.id);

                }
                return true;

            });
            root.on('click', 
            function(_this) {
                selectPK = _this.id;
                queryFunction(selectPK);
                return true;

            });
            root.on('dblclick', 
            function(_this) {
                if (_this.childNodes.length == 0) {
                    _this.expand();

                }
                return true;

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
        setTreeConditions: function(_con) {
            if (_con) {
                treeConditions = _con;

            } else
            {
                treeConditions = ' 5=5 ';

            }

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
        setPageUnit: function(_pageUnit) {
            pageUnit = _pageUnit;

        },
        setPageSize: function(_pageSize) {
            pageSize = _pageSize;

        },
        setRootText: function(_rootText) {
            rootText = _rootText;

        },
        setSelectEvent: function(e) {
            selectEvent = e;

        },
        setSelectMode: function(m) {
            selectMode = m;

        },
        setTitle: function(_title) {
            title = _title;

        },
        showTreeDate: function(viewData) {
            var list = viewData.resultList;
            for (var i = 0; i < list.length; ++i) {
                var obj = list[i];
                if (!obj.id || !obj.pid) {
                    alert('can not find id or pid');

                } else
                {
                    var newNode = treePanel.getNodeById(obj.pid);
                    if (newNode != null) {
                        var childNode = newNode.appendChild(new Ext.tree.TreeNode({
                            id: obj.id,
                            text: obj.name + '  (' + obj.id + ')',
                            expandable: !obj.isLeaf

                        }));
                        childNode.on('beforeexpand', 
                        function(_this, _deep, _anim) {
                            if (_this.childNodes.length == 0) {
                                expandFunction(_this.id);

                            }
                            return true;

                        });
                        childNode.on('click', 
                        function(_this) {
                            currentPageField.setValue(0);
                            pageCountField.setValue(0);
                            selectPK = _this.id;
                            queryFunction(selectPK);
                            return true;

                        });
                        childNode.on('dblclick', 
                        function(_this) {
                            if (_this.childNodes.length == 0) {
                                _this.expand();

                            }
                            return true;

                        });

                    }

                }

            }

        },
        showViewData: function(viewData) {
            eval('grid.getView().scrollToTop()');
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
            if (list == null) {
                alert('query has exception');
                return;

            }
            for (var i = 0; i < list.length; ++i) {
                list[i].isSelect = false;
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
                                    list[i].isSelect = true;
                                    selectedHids[list[i].hid] = true;
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
                                    list[i].isSelect = true;
                                    selectedHids[list[i].hid] = true;
                                    break;

                                }

                            }

                        }

                    } else if (selectedObjectType == 'string') {
                        if (singlePK) {
                            for (var j = 0; j < selectedObjects.length; ++j) {
                                if (selectedObjects[j] == list[i][pks]) {
                                    list[i].isSelect = true;
                                    selectedHids[list[i].hid] = true;
                                    break;

                                }

                            }

                        } else
                        {
                            alert('selectedObject is string,but has more than one pk field');

                        }

                    }

                }
                var r = new Ext.data.Record(list[i], list[i].hid);
                store.addSorted(r);

            }

        },
        setWidth: function(_width) {
            width = _width;

        }

    };

}

function FieldsRanking(_id) {
    var id = _id;
    return {
        init: function() {},
        getXType: function() {
            return 'fieldsranking';

        },
        plug: function(listArea) {
            if (listArea.getXType() != 'listarea') {
                alert('FieldsRanking is only for listarea');
                return;

            }
            listArea.regPlugin(this.getXType(), this);

        }

    };

}

var showLoading = function() {}
var hideLoading = function() {}

if (parent && parent.pageId)
 {
    showLoading = parent.showLoading;
    hideLoading = parent.hideLoading;

    dwr.engine.setPreHook(showLoading);
    dwr.engine.setPostHook(hideLoading);


}

//-----------------------------------------------------------------
function getFieldRanking(functionId, areaID, pageParam)
 {
    if(parent.fieldsRankingBuff)
    {
    	var ranking = parent.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam];
        if (ranking)
        {
            return Ext.util.JSON.decode(ranking);
		}
        else
        {
            return null;
		}
	}
    else
    {
        var ranking = opener.parent.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam];
        if (ranking)
        {
            return Ext.util.JSON.decode(ranking);
		}
        else
        {
            return null;
		}
	}
}

function saveFieldsRanking(functionId, areaID, pageParam, ranking)
 {
 	var _ranking = Ext.util.JSON.encode(ranking);
 	
    if (parent.fieldsRankingBuff)
    {
        parent.fieldsRankingService.saveFieldsRankingConfig(functionId, areaID, pageParam, getUserSession().logID, _ranking, 
        {
            callback: function(b)
            {
                Ext.alert(SOC_MESSAGE.rankingSaved);
                parent.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = _ranking;
			}
            ,
            async: false
		});
	}else
	{
        opener.parent.fieldsRankingService.saveFieldsRankingConfig(functionId, areaID, pageParam, opener.getUserSession().logID, _ranking, 
        {
            callback: function(b)
            {
            }
            ,
            async: false
		});
		Ext.alert(SOC_MESSAGE.rankingSaved);
        opener.parent.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = _ranking;
	}
}

function resetFieldsRanking(functionId, areaID, pageParam)
 {
    if (parent.fieldsRankingBuff)
    {
        parent.fieldsRankingService.resetFieldsRankingConfig(functionId, areaID, pageParam, getUserSession().logID, 
        {
            callback: function(b)
            {
                Ext.alert(SOC_MESSAGE.rankingReseted);
                parent.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = null;
			}
            ,
            async: false
		});
	}else
	{
        opener.parent.fieldsRankingService.resetFieldsRankingConfig(functionId, areaID, pageParam, opener.getUserSession().logID, 
        {
            callback: function(b)
            {
            }
            ,
            async: false
		});
		Ext.alert(SOC_MESSAGE.rankingReseted);
        opener.parent.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = null;
	}
}
//-----------------------pageurl-----------------------------------
var pageURL = null;

function getPageURL()
 {
    return functionId;


}
//-----------------------------session-------------------------------
function getUserSession()
 {
    if (parent)
    {
        var u = parent.userSession;
        return u;


    }
    else
    {
        return userSession;


    }


}
//-------------------全局变量----------------
var queryLabel = 'border:0px;font-size:12px;text-align:right;';
//css
var panelBodyStyle = 'border:0px;background:eef4ff;';

var indent = 3;
var browser = navigator.appName;
if (browser == 'Internet Explorer')
 {
    indent = 3;


}
 else if (browser == 'Netscape')
 {
    indent = 0;


}

var iconPath = 
{
    collapse: '/SOC3x/org/fdm/images/button/collapse.gif',
    expand: '/SOC3x/org/fdm/images/button/expand.gif',
    query: '/SOC3x/org/fdm/images/button/query.gif',
    reset: '/SOC3x/org/fdm/images/button/reset.gif',
    save: '/SOC3x/org/fdm/images/button/save.gif',
    clean: '/SOC3x/org/fdm/images/button/clean.gif',
    set: '/SOC3x/org/fdm/images/button/set.gif',
	set2: '/SOC3x/org/fdm/images/button/set2.gif'
};

var rowConfig = {
    layout: 'table',
    bodyStyle: 'border:0px;padding:3px',
    border: false

};

var EMPTY_SITE = 'EMPTY_SITE';

var appPages = {};
//记录app中的page

var appWindows = {};
//记录app中的win

var AppContext = {};

function setAppContext(key, obj)
 {
    AppContext[key] = obj;


}

function getAppContext(key)
 {
    if (AppContext[key])
    {
        return AppContext[key];


    }
    else
    {
        return null;


    }


}

//---------sMsg-----------------------------
function showSMsg(_t)
 {
    alert('debug:remove showSMsg');


}
//------------------------------------------------------------
var request = 
{
    getParameter: function(val)
    {
        var uri = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);


    }


};
//------------------------------------------------------------
var AppConfig = null;

var functionId = request.getParameter('functionId');
var functionProgParam = request.getParameter('progParams')

 if (functionId)
 loadAreaConfig();

function loadAreaConfig(xmlURL)
 {
    if (!xmlURL)
    {
        var xmlURL = '/SOC3x/view?functionId=' + functionId + '&type=CFGXML';


    }

    var xmlHttp = null;
    try
    {
        xmlHttp = new ActiveXObject('Msxml2.xmlHttp');


    }
    catch(e)
    {
        try
        {
            xmlHttp = new ActiveXObject('Microsoft.xmlHttp');


        }
        catch(e2)
        {
            xmlHttp = null;


        }


    }

    if (!xmlHttp)
    {
        xmlHttp = new XMLHttpRequest();


    }

    xmlHttp.open('POST', xmlURL, false);
    //TODO:url
    xmlHttp.setRequestHeader("Content-Type", "text/xml");
    xmlHttp.onreadystatechange = function() {
        setConfig(xmlHttp);

    };
    xmlHttp.send();


}

function setConfig(xmlHttp)
 {
    if (xmlHttp.readyState == 4)
    {
        if (xmlHttp.status == 200)
        {
            var responseXML = xmlHttp.responseXML;
            //if(responseXML.xml)
            {
                AppConfig = responseXML.getElementsByTagName('AppConfig')[0];


            }


        }
        else if (xmlHttp.status == 404)
        {
            //alert (xmlHttp.status+'  '+xmlURL+' URL is not found.');
            }
        else if (xmlHttp.status == 403)
        {
            alert('Access denied.');


        }
        else
        {
            alert('status is ' + xmlHttp.status);


        }


    }


}

Ext.onReady(function()
 {
    //document.body.style.background = 'eef4ff';


});

//Ext.util.CSS.swapStyleSheet("theme","/SOC3x/resources/css/xtheme-gray.css");

var DateUtil = {
    formatDate: function(date)
    {
        return date ? date.dateFormat('Y-m-d') : '';


    },
    formatDateTime: function(date)
    {
        return date ? date.dateFormat('Y-m-d H:i:s') : '';


    },
    castToPeriod: function(date)
    {
        return date ? date.dateFormat('Ym') : '';


    },
    getToday: function()
    {
        return new Date().dateFormat('Y-m-d');


    },
    getDate: function()
    {
        return new Date();


    }


};

var MoneyUtil={
	formatCnMoney:function(nStr)
	{
		nStr += '';   
        if (nStr.length == 0)   
        return '';   
        x = nStr.split('.');   
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';   
        var rgx = /(\d+)(\d{3})/;   
        while (rgx.test(x1)) {   
            x1 = x1.replace(rgx,'$1' + ',' + '$2');   
        }
        if(x1=='null') return '';
        return x1 + x2;  
	}
};

var StrUtil = {
    displayYN: function(v)
    {
        if (v == 'Y')
        {
            return '是';


        }
        else if (v == 'N')
        {
            return '否';


        }
        else
        {
            return '';


        }


    },
    displayTF: function(v)
    {
        if (v == 'T')
        {
            return '是';


        }
        else if (v == 'F')
        {
            return '否';


        }
        else
        {
            return '';


        }


    },
    displayMF: function(v)
    {
        if (v == 'M')
        {
            return '男';


        }
        else if (v == 'F')
        {
            return '女';


        }
        else
        {
            return '未知';


        }


    },
    convertFieldToConStr: function(f)
    {
        if (f == null || f === '')
        {
            return '(\'NERVER_BE\')';


        }
        else
        {
            var array = f.split(',');
            for (var i = 0; i < array.length; ++i)
            {
                array[i] = '\'' + array[i] + '\'';


            }

            return '(' + array.join(',') + ')';


        }


    },
    formatNumber: function(v, d)
    {
        if (!d)
        {
            d = 0;


        }

        if (d > 6)
        {
            d = 4;


        }

        if (!v && v != 0)
        {
            return '';


        }
        else
        {
            var fn = v.toString();

            var i = fn.indexOf('.');
            if (i == -1)
            {
                if (d > 0)
                {
                    fn += '.';
                    for (var j = 0; j < d; ++j)
                    {
                        fn += '0';


                    }


                }

                return fn;


            }
            else
            {
                var afterDao = fn.substring(i + 1, fn.length).length;
                if (afterDao > d)
                {
                    fn = fn.substring(0, i + d + 1 + (d === 0 ? -1: 0));

                    return fn;


                }
                else
                {
                    for (var j = afterDao; j < d; ++j)
                    {
                        fn += '0';


                    }

                    return fn;


                }


            }


        }


    },
    split: function(str, separator)
    {
        if (!str || str.trim() === '')
        {
            return


        }
        else
        {
            return str.split(separator);


        }


    },
    cjkEncode: function(text)
    {
        if (text == null)
        {
            return "";


        }

        text = text.toString();

        var newText = "";
        for (var i = 0; i < text.length; i++)
        {
            var code = text.charCodeAt(i);
            if (code >= 128 || code == 91 || code == 93)
            {
                //91 is "[", 93 is "]".   
                newText += "[" + code.toString(16) + "]";


            }
            else
            {
                newText += text.charAt(i);


            }


        }
        return newText;


    },
    cjkDecode: function(text)
    {
        if (text == null)
        {
            return "";


        }
        //查找没有 "[", 直接返回.
        if (text.indexOf('[') == -1)
        {
            return text;


        }

        var newText = "";
        for (var i = 0; i < text.length; i++)
        {
            var ch = text.charAt(i);
            if (ch == '[')
            {
                var rightIdx = text.indexOf(']', i + 1);
                if (rightIdx > i + 1)
                {
                    var subText = text.substring(i + 1, rightIdx);

                    if (subText.length > 0)
                    {
                        ch = String.fromCharCode(eval("0x" + subText));


                    }
                    i = rightIdx;


                }


            }
            newText += ch;


        }
        return newText;


    }


};

var YNStore = new Ext.data.SimpleStore({
    fields: ['CH', 'EN'],
    data: [['是', 'Y'], ['否', 'N']]


});

var ArrayUtil = {
    renameFields: function(list, oldFields, newFields)
    {
        if (oldFields instanceof Array)
        {
            if (! (newFields instanceof Array))
            {
                alert('oldFields is an Array');
                return;


            }
            else if (oldFields.length != newFields.length)
            {
                alert('oldFields.length!=newFields.length');
                return;


            }
            else
            {
                for (var i = 0; i < list.length; ++i)
                {
                    for (var j = 0; j < oldFields.length; ++j)
                    {
                        list[i][newFields[j]] = list[i][oldFields[j]];


                    }


                }

                return list;


            }


        }
        else if (typeof(oldFields) == 'string' && typeof(newFields) == 'string')
        {
            for (var i = 0; i < list.length; ++i)
            {
                list[i][newFields] = list[i][oldFields];


            }

            return list;


        }
        else
        {
            alert('in ArrayUtil:args error');


        }


    }


};

//--------------------选择页工具----------------
function SiteTag(_em)
 {
    var em = _em;

    var xtype = null;

    return {
        getSelectedCount: function()
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                if (sm == null)
                {
                    alert('the grid has a null sm');
                    return 0;


                }
                var records = sm.getSelections();

                return records.length;


            }
            else if (xtype == 'panel')
            {
                return 1;


            }


        },
        setField: function(name, value)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                var records = sm.getSelections();

                if (records.length > 0)
                {
                    records[0].set(name, value);
                    em.stopEditing();
                    records[0].set(name, value);


                }


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var tempValue = '';
                if (value != null && typeof value != 'undefined')
                {
                    tempValue = value;


                }

                var triggers = em.findByType('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        triggers[i].setValue(tempValue);

                        if (triggers[i].getValue() != tempValue)
                        {
                            triggers[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var hiddenFields = em.findByType('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        hiddenFields[i].setValue(tempValue);

                        if (hiddenFields[i].getValue() != tempValue)
                        {
                            hiddenFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var textFields = em.findByType('textfield');
                for (i = 0; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        textFields[i].setValue(tempValue);

                        if (textFields[i].getValue() != tempValue)
                        {
                            textFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var numberFields = em.findByType('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        numberFields[i].setValue(tempValue);

                        if (numberFields[i].getValue() != tempValue)
                        {
                            numberFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var dateFields = em.findByType('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        dateFields[i].setValue(tempValue);

                        if (dateFields[i].getValue() != tempValue)
                        {
                            dateFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var combos = em.findByType('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        combos[i].setValue(tempValue);

                        if (combos[i].getValue() != tempValue)
                        {
                            combos[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var textAreas = em.findByType('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        textAreas[i].setValue(tempValue);

                        if (textAreas[i].getValue() != tempValue)
                        {
                            textAreas[i].setValue(tempValue);


                        }

                        return;


                    }


                }


            }


        },
        getField: function(name)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (xtype == 'editorgrid')
            {
                alert('can not getField in grid');


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var textFields = em.findByType('textfield');
                for (; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        return textFields[i].getValue();


                    }


                }

                var hiddenFields = em.findByType('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        return hiddenFields[i].getValue();


                    }


                }

                var numberFields = em.findByType('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        return numberFields[i].getValue();


                    }


                }

                var dateFields = em.findByType('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        return dateFields[i].getValue();


                    }


                }

                var combos = em.findByType('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        return combos[i].getValue();


                    }


                }

                var triggers = em.findByType('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        return triggers[i].getValue();


                    }


                }

                var textAreas = em.findByType('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        return textAreas[i].getValue();


                    }


                }


            }


        },
        appendField: function(name, value, fg)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                var records = sm.getSelections();

                if (records.length > 0)
                {
                    if (records[0].get(name))
                    {
                        records[0].set(name, (records[0].get(name) ? records[0].get(name) : '') + ((fg && records[0].get(name)) ? fg: '') + value);
                        em.stopEditing();


                    }
                    else
                    {
                        records[0].set(name, value);
                        em.stopEditing();
                        records[0].set(name, value);


                    }


                }
                else
                {
                    alert('no selection record');


                }


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var tempValue = '';
                if (value != null && typeof value != 'undefined')
                {
                    tempValue = value;


                }

                var textFields = em.findByType('textfield');
                for (; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        textFields[i].setValue(textFields[i].getValue() + ((fg && textFields[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }

                var hiddenFields = em.findByType('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        hiddenFields[i].setValue(hiddenFields[i].getValue() + ((fg && hiddenFields[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }

                var numberFields = em.findByType('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a numberfield');
                        return;


                    }


                }

                var dateFields = em.findByType('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a datefield');
                        return;


                    }


                }

                var combos = em.findByType('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a combo');
                        return;


                    }


                }

                var triggers = em.findByType('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        triggers[i].setValue(triggers[i].getValue() + ((fg && triggers[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }

                var textAreas = em.findByType('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        textAreas[i].setValue(textAreas[i].getValue() + ((fg && textAreas[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }


            }


        },
        removeField: function(name, value, fg)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (fg === undefined)
            {
                fg = '';


            }


            function removeValue(v, sv, fg)
            {
                if (v)
                {
                    var vArray = v.split(fg);

                    for (var i = vArray.length - 1; i >= 0; --i)
                    {
                        //有\n的字符串split后需要trim一下
                        vArray[i] = vArray[i].trim();
                        if (vArray[i] == sv)
                        {
                            vArray.splice(i, 1);
                            break;


                        }


                    }

                    return vArray.join(fg);


                }
                else
                {
                    alert('fieldValue is null');


                }


            };

            var tempValue = '';
            if (value != null && typeof value != 'undefined')
            {
                tempValue = value;


            }

            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                var records = sm.getSelections();

                for (var i = 0; i < records.length; ++i)
                {
                    //records[i].set(name,(records[i].get(name)?records[i].get(name):'')+((fg&&records[i].get(name))?fg:'')+value);
                    records[i].set(name, removeValue(records[i].get(name), tempValue, fg));


                }


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var textFields = em.findByType('textfield');
                for (; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        textFields[i].setValue(removeValue(textFields[i].getValue(), tempValue, fg));
                        return;


                    }


                }

                var hiddenFields = em.findByType('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        hiddenFields[i].setValue(removeValue(hiddenFields[i].getValue(), tempValue, fg));
                        return;


                    }


                }

                var numberFields = em.findByType('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a numberfield');
                        return;


                    }


                }

                var dateFields = em.findByType('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a datefield');
                        return;


                    }


                }

                var combos = em.findByType('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a combo');
                        return;


                    }


                }

                var triggers = em.findByType('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        triggers[i].setValue(removeValue(triggers[i].getValue(), tempValue, fg));
                        return;


                    }


                }

                var textAreas = em.findByType('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        textAreas[i].setValue(removeValue(textAreas[i].getValue(), tempValue, fg));
                        return;


                    }


                }


            }


        }


    };


}

function openPrintPage(cptUrl)
 {
    var pp = window.open('/SOC3x/org/fdm/fr/printCpt.jsp?url=' + encodeURIComponent(cptUrl), 'PRINT_PAGE', "width=350,height=100");
    pp.focus();


}

function openViewPage(cptUrl, w, h)
 {
    if (!w)
    {
        w = 800;


    }

    if (!h)
    {
        h = 600;


    }

    var pp = window.open('/SOC3x' + cptUrl, 'VIEW_PAGE', 'location=no,scrollbars=no,menubar=no,resizable=1,width=' + w + ',height=' + h);
    pp.focus();


}

function alert1(obj)
 {
    alert(Ext.util.JSON.encode(obj));


}

function alert2(obj)
 {
    for (var k in obj) alert(k + '        ' + obj[k]);;


}

function downloadFile(fileId)
 {
    if (parent)
    {
        parent.document.getElementById('DOWNLOAD_FRAME').src = '/SOC3x/FileDownLoad?fileId=' + fileId;


    }
    else
    {
        document.getElementById('DOWNLOAD_FRAME').src = '/SOC3x/FileDownLoad?fileId=' + fileId;


    }


}

function deleteFile(fileId)
 {
    if (parent)
    {
        parent.document.getElementById('DOWNLOAD_FRAME').src = '/SOC3x/FileDownLoad?fileId=' + fileId + '&operater=remove';


    }
    else
    {
        document.getElementById('DOWNLOAD_FRAME').src = '/SOC3x/FileDownLoad?fileId=' + fileId + '&operater=remove';


    }


}

Ext.alert = function(msg)
 {
    Ext.MessageBox.alert(SOC_MESSAGE.msg, msg);


}

Ext.confirm = function(msg, fn)
 {
    Ext.MessageBox.confirm(SOC_MESSAGE.confirm, msg, fn);


}

Ext.prompt = function(msg, fn)
 {
    Ext.MessageBox.prompt(SOC_MESSAGE.input, msg, fn);


}

var SOC_MESSAGE = {
    rankingSaved: '设置已保存',
    rankingReseted: '设置已重置,重新进入本模块将使用默认设置',
    unknowRankingConfig: '系统监测到列配置信息与实际的不符合,请点击\'重置我的设置\'再试',
    noSelectedRecord: '没有勾选记录',
    noSignedRecord: '没有选定记录',
    sessionTimeout: '会话超时,请您重新登陆',
    msg: '消息',
    confirm: '确认',
    input: '填写',
    fileNotFound: '文件未找到'


};
window.onresize=function(){
	if(Ext.get("page1")){
		if(Ext.get("page2")){
			if(Ext.get("mainArea__grid")){
				Ext.getCmp("mainArea__grid").setHeight(Ext.getBody().getHeight()-140);
				Ext.getCmp("mainArea__grid").setWidth(Ext.getBody().getWidth()-21);
				Ext.getCmp("mainArea__grid").getBottomToolbar().hide();
				Ext.getCmp("mainArea__grid").getBottomToolbar().show();
			}
			Ext.getCmp("page2").setWidth(Ext.getBody().getWidth()-21);
		}	
		
		var width = 0;
		Ext.getCmp("page1").setWidth(Ext.getBody().getWidth()-21);
		var subPanels = Ext.getCmp("centerPanel").findByType("panel");
		for (var i=0; i < subPanels.length; ++i) {
               if(subPanels[i].id.indexOf('-') == -1 && subPanels[i].id.indexOf('__') == -1){
               		if(Ext.get(subPanels[i].id+"__grid")){
               			if(width == Ext.getCmp(subPanels[i].id+"__grid").width*2)
               				Ext.getCmp(subPanels[i].id+"__grid").setWidth((Ext.getBody().getWidth()-21)/2);
               			else
               				Ext.getCmp(subPanels[i].id+"__grid").setWidth(Ext.getBody().getWidth()-21);
               			 
               		}
               		else {
	               		if(Ext.get("tree__grid")){
							//Ext.getCmp("__grid").setHeight(Ext.getBody().getHeight()-100);
							Ext.getCmp("tree__grid").setWidth(Ext.getBody().getWidth()-245);
							
						}else{
	               			Ext.getCmp(subPanels[i].id).setWidth(Ext.getBody().getWidth()-21);
	               			width = Ext.getCmp(subPanels[i].id).width;
	               		}
               		}
               }
		}
		Ext.getCmp("centerPanel").doLayout(); 
	}	
};

//Ext.QuickTips.init();