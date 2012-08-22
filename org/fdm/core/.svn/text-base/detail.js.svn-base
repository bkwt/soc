
function DetailAreaUnit(_id) {
    var id = _id;
    var fid = functionId;
    var mainPanel = null;
    var topPanel = null;
    var dataPanel = null;
    var fieldSet = new Ext.form.Panel({
    });
    
    var titlePanel =new Ext.Panel({
    	border:false
       //id: fid+'__'+id + '__query',
      // region: 'north', 
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
                        p[i].fieldStyle='background:#E6E6E6';
                        row.add(p[i]);
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
                    		labelWidth:60,
                        fieldsPerRow: 4
                    };
                } else
                {
                    if (!layCfg.labelWidth) {
                        layCfg.labelWidth =60;
                    }
                    if (!layCfg.fieldsPerRow) {
                        layCfg.fieldsPerRow = 4;
                    }
                }
                var cw=1;
                if (p.length < layCfg.fieldsPerRow) {
                    cw = 1/p.length;
                }else{
                	cw = 1/layCfg.fieldsPerRow;
                }
                var i = 0;
                while (i < p.length) {
                    var j = 0;
                    var row = new Ext.Panel({xtype: "panel", 
                    	 layout: 'column',
                    	 border:false,
                    	 height: 32,
                      	 defaults:{
                      	margin: "5 5 5 5", 
                      	labelAlign:"right",
                      	 labelWidth: layCfg.labelWidth
                      	}});
                    while (j < layCfg.fieldsPerRow) {
                    	if (i >= p.length) {
                            break;
                        }
                        if (p[i].rowspan && p[i].rowspan > 1) { 
                        	if(p[i].rowspan+j <= layCfg.fieldsPerRow){
                        		p[i].columnWidth= cw*p[i].rowspan;
                        		
                        		if(p[i].height){
                        			row.setHeight(p[i].height+5);
                        		}
                        			
                            	this.fields[p[i].name] =row.add(p[i]);
                            	i++;
                            	j++;
                        	}else{
                        		j=j+p[i].rowspan;
                        	}
                        	                        	//i++;
                        }else{
                        	p[i].columnWidth= cw;
                        	if(p[i].height){
                    			row.setHeight(p[i].height+5);
                    		}
                        	this.fields[p[i].name] =row.add(p[i]);
                        	if(p[i].hidden !=true){
                        		j++;
                        	}
                        	
                            i++;
                        }
                       
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
            var textFields = mainPanel.query('textfield');
            for (; i < textFields.length; ++i) {
                if (!textFields[i].hidden && !textFields[i].disabled && !textFields[i].validate()) {
                    pageUnit.setActiveTab(this);
                    textFields[i].focus();
                    return false;

                }

            }
            var numberFields = mainPanel.query('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                if (!numberFields[i].hidden && !numberFields[i].disabled && !numberFields[i].validate()) {
                    pageUnit.setActiveTab(this);
                    numberFields[i].focus();
                    return false;

                }

            }
            var dateFields = mainPanel.query('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                if (!dateFields[i].hidden && !dateFields[i].disabled && !dateFields[i].validate()) {
                    pageUnit.setActiveTab(this);
                    dateFields[i].focus();
                    return false;

                }

            }
            var combos = mainPanel.query('combo');
            for (i = 0; i < combos.length; ++i) {
                if (!combos[i].hidden && !combos[i].disabled && !combos[i].validate()) {
                    pageUnit.setActiveTab(this);
                    combos[i].focus();
                    return false;

                }

            }
            var triggers = mainPanel.query('trigger');
            for (i = 0; i < triggers.length; ++i) {
                if (!triggers[i].hidden && !triggers[i].disabled && !triggers[i].validate()) {
                    pageUnit.setActiveTab(this);
                    triggers[i].focus();
                    return false;

                }

            }
            var textareas = mainPanel.query('textarea');
            for (i = 0; i < textareas.length; ++i) {
                if (!textareas[i].hidden && !textareas[i].disabled && !textareas[i].validate()) {
                    pageUnit.setActiveTab(this);
                    textareas[i].focus();
                    return false;

                }

            }
            var timeFields = mainPanel.query('timefield');
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
            alert('������һ��');

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
            var textFields = mainPanel.query('textfield');
            for (; i < textFields.length; ++i) {
                var key = textFields[i].getName();
                if (textFields[i].getValue() === '' || textFields[i].getValue() == '�Զ����') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = textFields[i].getValue();

                }

            }
            var numberFields = mainPanel.query('numberfield');
            for (i = 0; i < numberFields.length; ++i) {
                var key = numberFields[i].getName();
                if (numberFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = numberFields[i].getValue();

                }

            }
            var dateFields = mainPanel.query('datefield');
            for (i = 0; i < dateFields.length; ++i) {
                var key = dateFields[i].getName();
                if (dateFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = dateFields[i].getValue();

                }

            }
            var hiddenFields = mainPanel.query('hidden');
            for (i = 0; i < hiddenFields.length; ++i) {
                var key = hiddenFields[i].getName();
                if (hiddenFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = hiddenFields[i].getValue();

                }

            }
            var combos = mainPanel.query('combo');
            for (i = 0; i < combos.length; ++i) {
                var key = combos[i].getName();
                if (combos[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = combos[i].getValue();

                }

            }
            var triggers = mainPanel.query('trigger');
            for (i = 0; i < triggers.length; ++i) {
                var key = triggers[i].getName();
                if (triggers[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = triggers[i].getValue();

                }

            }
            var textareas = mainPanel.query('textarea');
            for (i = 0; i < textareas.length; ++i) {
                var key = textareas[i].getName();
                if (textareas[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = textareas[i].getValue();

                }

            }
            var timeFields = mainPanel.query('timefield');
            for (i = 0; i < timeFields.length; ++i) {
                var key = timeFields[i].getName();
                if (timeFields[i].getValue() === '') {
                    _valueObject[key] = null;

                } else
                {
                    _valueObject[key] = timeFields[i].getValue();

                }

            }
            var htmleditors = mainPanel.query('htmleditor');
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
                height: 45,
                bodyStyle: 'border:0px',
                html: '<div align="center" valign="bottom"><br><input readOnly="true" id="' + id + '__billtitle" size="35" class="x-field-billtitle" value="' + billName + '"/></div>'

            });
            if (billName == null) {
                topPanel.hide();

            }
            dataPanel = new Ext.Panel({
                id: fid + '__' + id + '__data',
                bodyStyle: 'border:0px;padding-left:10px;padding-right:10px;padding-top:10px',
                border: false,
                autoHeight: true,
                items: [titlePanel, fieldSet]

            });
            mainPanel = new Ext.Panel({
                //id: id,
                title: title,
                autoHeight: true,
                header: false,
                items: [topPanel, dataPanel, {
                    xtype: 'panel',
                    layout: 'table',
                    height: 10,
                    border: false

                }],
                tbar: ['-', {
                    text: 'button1',
                    icon:iconPath.add,
                    hidden: false

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
                    hidden: true

                },
                '-', {
                    text: 'button5',
                    icon:iconPath.add,
                    hidden: true

                },
                '-', {
                    text: 'button6',
                    icon:iconPath.add,
                    hidden: true

                },
                '-', {
                    text: 'button7',
                    icon:iconPath.add,
                    hidden: true

                },
                '-', {
                    text: 'button8',
                    icon:iconPath.add,
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
                if (AppConfig[fid] != null) {
                    var areas = AppConfig[fid].getElementsByTagName('Area');
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
                var buttons = mainPanel.getDockedItems()[0];
                for (var i = 8; i > 0; --i) {
                    buttons.getComponent(i * 2 - 1).hide();

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
                            var textFields = dataPanel.query('textfield');
                            for (; n < textFields.length; ++n) {
                            	if(!textFields[n].readOnly)
                            		textFields[n].setReadOnly(false);
                            }
                            var numberFields = dataPanel.query('numberfield');
                            for (n = 0; n < numberFields.length; ++n) {
                            	if(!textFields[n].readOnly)
                            		numberFields[n].setReadOnly(false);
                            }
                            var dateFields = dataPanel.query('datefield');
                            for (n = 0; n < dateFields.length; ++n) {
                            	if(!textFields[n].readOnly)
                            		dateFields[n].setReadOnly(false);

                            }
                            var combos = dataPanel.query('combo');
                            for (n = 0; n < combos.length; ++n) {
                            	if(!textFields[n].readOnly)
                            		combos[n].setReadOnly(false);

                            }
                            var triggers = dataPanel.query('trigger');
                            for (n = 0; n < triggers.length; ++n) {
                            	if(!textFields[n].readOnly)
                            		triggers[n].setReadOnly(false);

                            }
                            var textareas = dataPanel.query('textarea');
                            for (n = 0; n < textareas.length; ++n) {
                            	if(!textFields[n].readOnly)
                            		textareas[n].setReadOnly(false);

                            }
                            var timeFields = dataPanel.query('timefield');
                            for (n = 0; n < timeFields.length; ++n) {
                            	if(!textFields[n].readOnly)
                            		timeFields[n].setReadOnly(false);

                            }

                        } else
                        {
                            var n = 0;
                            var textFields = dataPanel.query('textfield');
                            for (; n < textFields.length; ++n) {
                                textFields[n].setReadOnly(true);
                                textFields[n].setFieldStyle('background:#E6E6E6');
                            }
                            var numberFields = dataPanel.query('numberfield');
                            for (n = 0; n < numberFields.length; ++n) {
                                numberFields[n].setReadOnly(true);
                                textFields[n].setFieldStyle('background:#E6E6E6');
                            }
                            var dateFields = dataPanel.query('datefield');
                            for (n = 0; n < dateFields.length; ++n) {
                                dateFields[n].setReadOnly(true);
                                textFields[n].setFieldStyle('background:#E6E6E6');
                            }
                            var combos = dataPanel.query('combo');
                            for (n = 0; n < combos.length; ++n) {
                                combos[n].setReadOnly(true);
                                textFields[n].setFieldStyle('background:#E6E6E6');
                            }
                            var triggers = dataPanel.query('trigger');
                            for (n = 0; n < triggers.length; ++n) {
                                triggers[n].setReadOnly(true);
                                textFields[n].setFieldStyle('background:#E6E6E6');
                            }
                            var textareas = dataPanel.query('textarea');
                            for (n = 0; n < textareas.length; ++n) {
                                textareas[n].setReadOnly(true);
                                textFields[n].setFieldStyle('background:#E6E6E6');
                            }
                            var timeFields = dataPanel.query('timefield');
                            for (n = 0; n < timeFields.length; ++n) {
                                timeFields[n].setReadOnly(true);
                                textFields[n].setFieldStyle('background:#E6E6E6');
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
                                var typeFields = mainPanel.query(xtype);
                                for (var k = 0; k < typeFields.length; ++k) {
                                    if (name == typeFields[k].getName()) {
                                        if (Fhide.length > 0 && Fhide[0].text == 'true') {
                                            typeFields[k].hide();

                                        }
                                        if (enabled == 'true') {
                                            typeFields[k].setReadOnly(false);
                                            typeFields[k].validate();

                                        } else
                                        {
                                            typeFields[k].setReadOnly(true);

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
                            buttons.getComponent(i * 2).show();
                            buttons.getComponent(i * 2 + 1).setText(text);
                            if (method !== '') {
                            	if(fid==undefined)
                            		eval('buttons.getComponent(' + (i * 2 + 1) + ').setHandler(function(){' + id + '.' + method + '(\'' + constParam + '\');});');
                            	else
                            		eval('buttons.getComponent(' + (i * 2 + 1) + ').setHandler(function(){'+fid+'(\"' + id + '.' + method + '(\'' + constParam + '\');\");'+'});');
                            }
                            buttons.getComponent(i * 2 + 1).show();

                        }
                        for (i++; i < 10; ++i) {
                            buttons.getComponent(i * 2).hide();

                        }
                        if (operaters.length === 0) {
                            buttons.getComponent(0).hide();

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
            	if(document.getElementById(id + '__billtitle') != null){
            		document.getElementById(id + '__billtitle').value = _billName;
                    topPanel.show();

            	}
                
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
                reLogin();
                return;

            }
            var list = viewData.resultList;
            if (list.length == 0) {
                alert('TODO:' + id + 'no data');
                return;

            }
            valueObject = list[0];
            var i = 0;
            var textFields = mainPanel.query('textfield');
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
            var hiddenFields = mainPanel.query('hidden');
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
            var numberFields = mainPanel.query('numberfield');
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
            var dateFields = mainPanel.query('datefield');
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
            var combos = mainPanel.query('combo');
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
            var triggers = mainPanel.query('trigger');
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
            var textareas = mainPanel.query('textarea');
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
            var timeFields = mainPanel.query('timefield');
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
			var htmleditors = mainPanel.query('htmleditor');
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