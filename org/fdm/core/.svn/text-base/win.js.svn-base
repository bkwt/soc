function WindowUnit(_id) {
	var id = functionId + '__' + _id;
    var win = null;
    var ownerAreas = {};
    var title = ' ';
    var tabPanel = null;
    var width;
    var height;
    var pageParam = '';
    var modal = true;
    return {
        add: function(p) {
            win.setWidth(p.getWidth()+15);
            //p.setWidth(p.getWidth());
            //p.setTitle('');
            p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);
            win.add(p.getEm());
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
        	var fields =[];
            if (_pageParam) pageParam = _pageParam;
            for (var k1 in ownerAreas) {
                ownerAreas[k1].clean();
                ownerAreas[k1].loadAreaConfig();
                if(ownerAreas[k1].getXType() !='selectTreeArea' && ownerAreas[k1].getXType() !='selectArea')
                	fields = ownerAreas[k1].getEm().query('textfield');
            }
            win.show();
            
            if (win.getPosition()[1] <= 0) {
                win.setPosition(win.getPosition()[0], 0);

            }
            for (var i = 0; i < fields.length; ++i){
            	if(fields[i].hidden != true && !fields[i].isDisabled()  && !fields[i].allowBlank){
            		fields[i].focus(false,100);
                	return true;
            	}
            			
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
            	if(Ext.getCmp(id)){
            		Ext.getCmp(id).destroy();
            	}
            			
                win = new Ext.Window({
                	id:id,
                    title: title,
                    width: width,
                    //height: height,
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
