function ViewUnit(_id) {
	var pid = functionId;
    var id = pid + '__' + _id;
    var pPanel = null;
    var cPanel = null;
    var currentArea = null;
    var ownerAreas = {};
    var tabPanel = null;
    var pageParam = '';
    var height = 0;
    return {
        add: function(p) {
        	p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);
            pPanel.add(p.getEm());
        },
        addItem: function(item) {
        	pPanel.add(item);
        },
        addTab: function(p) {
            if (tabPanel == null) {
                tabPanel = new Ext.TabPanel({
                    autoHeight: true,
                    enableTabScroll: true,
                    deferredRender: false,
                    layoutOnTabChange: true

                });
                pPanel.add(tabPanel);

            }
            p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);
            tabPanel.add(p.getEm());
        },
        addTabItem: function(p) {
            if (tabPanel == null) {
                tabPanel = new Ext.TabPanel({
                    autoHeight: true,
                    enableTabScroll: true,
                    deferredRender: false,
                    layoutOnTabChange: true

                });
                pPanel.add(tabPanel);

            }
            tabPanel.add(p);
         },
        addSeparator: function(w) {
            pPanel.add(new Ext.Panel({
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
            if (tabPanel != null && tabPanel.query(item.getId())) {
                tabPanel.hide(item);

            } else
            {
                item.hide();

            }

        },
        init: function() {
            appPages[id] = this;
            pPanel = new Ext.Panel({
                id: id,
                height:Ext.getBody().getHeight()
                //title:functionTitle,
                //closable: true,
               // layout: 'anchor'
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
        	p.init();
            ownerAreas[p.getId()] = p;
            p.setPageUnit(this);

        },
        setActiveTab: function(area) {
            if (tabPanel != null && tabPanel.query(area.getId())) {
                tabPanel.setActiveTab(area.getEm());

            }

        },
        show: function(_pageParam) {
        	var p=0;
        	var a=0;
        	 
        	if (_pageParam) {
                pageParam = _pageParam;
               // this.clean();
        	}
        	for (var k1 in ownerAreas) {
        		a++;
        		currentArea = ownerAreas[k1].getEm(); 
                 ownerAreas[k1].loadAreaConfig();
                
            }
        	for (var k in appPages) {
          	   p++
             }
        	if(Ext.getCmp(pid) !== undefined){
        	    var l = Ext.getCmp(pid).getLayout();   
        		l.setActiveItem(id);  
        		for (var k1 in ownerAreas) {
             	   if(ownerAreas[k1].getXType()=='listarea'){
             		   ownerAreas[k1].getEm().setHeight(Ext.getCmp(pid).getHeight()-height);
             	   }
             	   else
             		   height=ownerAreas[k1].getEm().getHeight();
             	  
                }
        		return;
           }
        	cPanel = Ext.create('Ext.Viewport', { 
        	    layout: 'fit'
            });
        	
        	if(p==1 && a==1){
         	   cPanel.add(currentArea);
         	 }else{
         		card = new Ext.Panel({
                    id: functionId,
                    layout: 'card'
                });
         	   for (var k in appPages) {
         		  card.add(appPages[k].getEm()); 
                }
         	  cPanel.add(card);
         	 card.getLayout().setActiveItem(id); 
                for (var k1 in ownerAreas) {
             	   if(ownerAreas[k1].getXType()=='listarea'){
             		   ownerAreas[k1].getEm().setHeight(card.getHeight()-height);
             	   }
             	   else
             		   height=ownerAreas[k1].getEm().getHeight();
                }
               appPages[functionId] = card;
            }
         },
        unhideItem: function(item) {
            if (tabPanel != null && tabPanel.query(item.getId())) {
                tabPanel.show(item);

            } else
            {
                item.show();

            }

        }

    };

}