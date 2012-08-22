Ext.define('TreeComboBox',{
 extend : 'Ext.form.field.ComboBox',
 alias: 'widget.treecombo',  
 margin: "5 5 5 5",
 store : new Ext.data.ArrayStore({fields:[],data:[[]]}),
 editable : false,
 //resizable:true,
 //minWidth:100,
 labelAlign:'right',
 readOnly:false,
 editable:false,
 _idValue : '',
 _txtValue : null,
 callback : Ext.emptyFn,  
 treeObj : null,
 expandFunction:null,
 initComponent : function(){
  
  var combo = this;
  this.callParent(arguments);
  this.treeRenderId = Ext.id();
   this.tpl = new Ext.XTemplate('<tpl for="."><div style="height:150' + 'px;"><div id="' + this.treeRenderId+ '"></div></div></tpl>');
   this.callParent(arguments); 
   this.treeObj=new Ext.tree.Panel({  
       border : false,  
       height : 150,  
       //width : 350,  
       autoScroll : true,  
       rootVisible: false,  
       store:  Ext.create('Ext.data.TreeStore',{
   	   	fields:['id','text','leaf']
	   	})
   });
   this.on({  
	               'expand' : function(){  
	                   if(!this.treeObj.rendered&&this.treeObj&&!this.readOnly){  
	                       Ext.defer(function(){  
	                           this.treeObj.render(this.treeRenderId);  
	                       },300,this);  
	                       this.expandFunction('root');
	                  }  
	                   this.reflash();
	               }  
	           });  
	           this.treeObj.on('itemclick',function(view,rec){ 
	               //if(rec && rec.get('checked')==null){  
	                   this.setValue(rec.get('text'));
	                   this._idValue =node.get('id');
	               //}  
	               
	           },this);  
	           this.treeObj.on('checkchange',function(node, checked){ 
	        	   if(checked == true){
	        		   this._idValue = StrUtil.append(this._idValue,node.get('id'),',');
	        		   this.setValue(StrUtil.append(this.getValue(),node.get('text'),','));
	        	   }
	        		   
	        		else{
	        			this._idValue = StrUtil.remove(this._idValue,node.get('id'),',');
	        			this.setValue(StrUtil.remove(this.getValue(),node.get('text'),','));
	        		}
	        			
	           },this);
	           this.treeObj.on('beforeitemexpand',function(node,obj){ 
	        	   if(node.hasChildNodes() == false)
	        		   this.expandFunction(node.get('id'));
	           },this);

 },
 getTree : function(){
	         return this.treeObj;  
	     },  
	     getTextValue : function(){//鑾峰彇text鍊? 
	         return this._txtValue;  
	     },  
	     getIdValue : function(txt,id){//璁惧€? 
	         return this._idValue  ;
	     } ,
	     setIdValue : function(id){//璁惧€? 
	         this._idValue = id;
	     } ,
//	     setLocalValue : function(txt,id){//璁惧€? 
//	         this._idValue = id;  
//	         this.setValue(this._txtValue = txt);  
//	     }  ,
	     reflash : function(){
	    	var list=[];
 			var obj={};
 			obj.id='0';
 			list.push(obj);
 			this.treeObj.getStore().getNodeById('root').appendChild(list); 
 			this.treeObj.getStore().getNodeById('0').remove();
	     },
	     showTreeData : function(id,list){
	    		if(list.length>0){
	    			var values = StrUtil.split(this.getValue(),',');
	    			
	    			for(var i=0;i<list.length;i++){
	    				if(list[i].leaf && list[i].leaf=='true'){
	    					list[i].leaf=true;
	    				}
	    				if(list[i].checked && list[i].checked=='true'){
	    					list[i].checked=true;
	    				}else if(list[i].checked && list[i].checked=='false'){
	    					list[i].checked=false;
	    				}
	    				if(values != undefined && list[0].checked == false){
		    				for(var j=0;j<values.length;j++){
		    					if(list[i].text == values[j])
		    						list[i].checked=true;
		    				}
		    			}
	    				
	    			}
	    			this.treeObj.getStore().getNodeById(id).appendChild(list);  
	    		}
	    		
	    	}

}
);

