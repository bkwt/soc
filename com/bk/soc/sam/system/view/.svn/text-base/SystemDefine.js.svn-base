var cPanel = Ext.create('Ext.Panel', {

    title: '容器面板',
id:'a',
closable: true,
   layout: 'absolute'


});
var item = null;
var flag = false;
functionPanel.add(cPanel);
functionPanel.setActiveTab(cPanel);
hideLoading();
Ext.get('a').on('click',function(e,t){
	if(flag == true){
		if(item.getValue() == ''){
			cPanel.remove(item);
		}
		
		flag = false;
		return;
	}
		
	if(t.id != 'a-body'){
		//var id = t.id.substr(0,t.id.indexOf('-'));
		//Ext.getCmp(id).focus(false,100);
		return;
	}
	item = Ext.create('Ext.form.field.TextArea', {
		draggable:true,
		id:'b',
		width: 200,
		height: 100,
		x:e.getX()-208,
		y:e.getY()-80
	}); 
	
	cPanel.add(item);
	item.focus(false,100);
	flag = true;
});
