function ChatAreaUnit(_id)
{
	var treePanel=null;
	var logPanel=null;
	var fileForm=null;
	var fileData=null;
	
	var chatWin=null;
	var isHide=true;
	//根节点
	var root=null;
	var root2=null;
	var flag = true;//全局变量，用来标识是否设置为自动滚动条
	
	var maxSize = 10 * 1024 * 1024;// 设置上传文件最大为 10M
	//展开方法
	var expandFunction=function(id)
		{
			SAM_MessageService.queryPersonNodes(id,function(viewData)
			{
				chatArea.showTreeData(id,viewData);
			});
		};
	var showUserTreeData=function()
		{
			SAM_MessageService.getAllOnLineUsers(function(list)
			{
				if(list.length == 0) return;
				var users=[];
				for(var i=0;i<list.length;++i){
					var obj={};
					obj.id = list[i].userID;
					obj.text = list[i].userName;
					obj.leaf = 'true';
					users.push(obj);
				}
				tree2Panel.getStore().getNodeById('root').removeAll();
				tree2Panel.getStore().getNodeById('root').appendChild(users);
			});
		}
		//判断是否有子结点被选中 
         var childHasChecked = function(node) 
        { 
              var childNodes = node.childNodes; 

	        if(childNodes || childNodes.length>0){ 
	
	        for(var i=0;i<childNodes.length;i++){ 
	
	            if(childNodes[i].getUI().checkbox.checked) 
	
	                return true; 
	
	            } 
              } 
             return false; 
         } 

    //级联选中父节点 
          var parentCheck = function(node ,checked){ 

        var checkbox = node.getUI().checkbox; 

        if(typeof checkbox == 'undefined') 

            return false; 

        if(!(checked ^ checkbox.checked)) 

            return false; 

        if(!checked && childHasChecked(node)) 

            return false; 

        checkbox.checked = checked; 
               node.attributes.checked = checked; 
               node.getUI().checkbox.indeterminate = checked; //半选中状态 

        node.getOwnerTree().fireEvent('check', node, checked); 

        var parentNode = node.parentNode; 

        if( parentNode !== null){ 

            parentCheck(parentNode,checked); 

        } 

    } 
	//获取新增复选框树的值 
         function onItemClick(){ 

        var checkedNodes = treePanel.getChecked();//tree必须事先创建好.这里要标识识获取那个treepanel的 id 

        var checkedIds = []; 

        for(var i=0;i<checkedNodes.length;i++) 
               { 

                 if( checkedNodes[i].hasChildNodes()) 
                         { 
                                //这里只是获取节点为子节点的id ，如果不需要可以删除。 
                         } 
                          else 
                          { 
                                checkedIds.push(checkedNodes[i].id); 
                           }           

        } 
                        return checkedIds.join(','); 

    }; 	
   
	var autoScollTop = function(){
		if(flag){
			//让滚动条一直呆在最下面
			var publicChatDiv = document.getElementById('publicChat');
			publicChatDiv.parentNode.scrollTop = publicChatDiv.parentNode.scrollHeight;
		} else{
		}
	}
	return {
		getIsHide:function()
		{
			return isHide;
		},
		changeState:function(list)
		{
			SAM_MessageService.changeState(list);
		},
		setObj:function(_obj)
		{
			if(_obj.name != '群体'){
			logPanel.setTitle('与 '+_obj.name+' 聊天中...');
			setAppContext('id',_obj.id);
			setAppContext('name',_obj.name);
			}
			document.getElementById('publicChat').innerHTML = document.getElementById('publicChat').outerHTML+_obj.msg;
		},
		setTitle:function(id,name)
		{
			logPanel.setTitle('与 '+name+' 聊天中...');
			setAppContext('id',id);
			setAppContext('name',name);
		},
		setIsLine:function(list)
		{
			if(list[0] == 'on')
			{
				var node = treePanel.getStore().getNodeById(list[1]);
				if(node != null && node.text.indexOf('<') == -1) node.setText('<font color="blue">'+node.text+'</font>');
				if(tree2Panel.getStore().getNodeById(list[1]) == null) {
					tree2Panel.getStore().getNodeById('root').appendChild({id:list[1],text:list[2],leaf:true});
				}
			}
			else{
				var node = treePanel.getStore().getNodeById(list[1]);
				if(node != null && node.text.indexOf('<') != -1) node.setText(node.text.substring(node.text.indexOf('>')+1,node.text.lastIndexOf('<')));
				node = tree2Panel.getStore().getNodeById(list[1]);
				if(node != null) {
					tree2Panel.getStore().getNodeById('root').removeChild(node);
				}
			}
			
		},
		receiveMessages:function(messages) {
			var chatlog = "";
			var senderName,receiverName;
			for (var i=0;i<messages.length;i++) {
				if(getUserSession().userID == messages[i].senderCode) senderName='你';
				else senderName='<a href="#" onclick="chatArea.setTitle(\''+messages[i].senderCode+'\',\''+messages[i].senderName+'\');">'+messages[i].senderName+'</a>';
				if(messages[i].receiverCode.indexOf(getUserSession().userID) != -1) receiverName='你';
				else if(messages[i].receiverName == '群体') receiverName='群体';
				else receiverName='<a href="#" onclick="chatArea.setTitle(\''+messages[i].receiverCode+'\',\''+messages[i].receiverName+'\');">'+messages[i].receiverName+'</a>';
				
				chatlog = "<div style='margin:20px 5px 10px 5px'> &nbsp;&nbsp;"
							+ DateUtil.formatDateTime(messages[i].sendDate) + " <b>"
							+ senderName + "</b> 对 <b> "
							+ receiverName + "</b> 说:"
							+ messages[i].messageText + "</div>" + chatlog;
			}
			if(document.getElementById('publicChat') != null){
				document.getElementById('publicChat').innerHTML = document.getElementById('publicChat').outerHTML+chatlog;
			}
			autoScollTop();
			if(isHide==false && receiverName=='你'){
		    		SAM_MessageService.changeState(messages);
		    }
		},
		showTreeData:function(id,viewData)
		{
			var list=viewData.resultList;
			if(list.length>0){
				treePanel.getStore().getNodeById(id).appendChild(list);
            }
		},
		show:function(){
			chatWin.show();
			fileForm.collapse(false);
			document.getElementById('publicChat').innerHTML = '';
		},
    	init:function()
    	{
    	dwr.engine.setActiveReverseAjax(true); 
    	dwr.engine.setNotifyServerOnPageUnload(true);
    	
		treePanel = new Ext.tree.Panel({
			id : 'im-tree',
			deferredRender : false,
			collapsed:true,
			title : '所有用户',
			border : false,
			rootVisible : false,
			lines : false,
			autoScroll : true,
			enableDD : false,
			animate : false,
			split : true,
			width : 200,
			collapsible : false,
			
			store : Ext.create('Ext.data.TreeStore',{
		    	fields:['id','text']
		    }),
		    listeners : {  
		    	        'itemclick' : function(view,re){ 
		    	        	//if(re.get('leaf') == true)
		    	        		//openTab(re.get('id'),re.get('text'),re.get('progParam'));
		    	        }  ,
		    	        'beforeitemexpand': function(node,obj){ 
		    	        	if(node.hasChildNodes() == false)
		    	        		expandFunction(node.get('id'));
		    	        }  
		    	    }  
		});
	
		
//增加checkchange监听 

   treePanel.on('checkchange', function(node, checked) {
			if(checked == true)  logPanel.setTitle('群发消息');
			else logPanel.setTitle('聊天记录');
            var parentNode = node.parentNode; 

            if(parentNode !== null) {   
                        parentCheck(parentNode,checked);   
                   } 

           node.expand(); 

           node.attributes.checked = checked;     

           node.eachChild(function(child) 
                 {     

                  child.ui.toggleCheck(checked);    
                         child.attributes.checked = checked;     
                         child.fireEvent('checkchange', child, checked); 

           });     

    }, treePanel); 
	 
	tree2Panel = new Ext.tree.Panel({
		id : 'user-tree',
		deferredRender : false,
		region : 'west',
		title : '在线用户',
		border : false,
		rootVisible : false,
		lines : false,
		autoScroll : true,
		enableDD : false,
		animate : false,
		split : true,
		width : 200,
		collapsible : false,
		store : Ext.create('Ext.data.TreeStore',{
	    	fields:['id','text']
	    })
	});
	treePanel.on('itemclick', function(view,re) {
		logPanel.setTitle('与 '+re.get('text')+' 聊天中...');
		setAppContext('id',re.get('id'));
		setAppContext('name',re.get('text'));
	});
	tree2Panel.on('itemclick', function(view,re) {
		logPanel.setTitle('与 '+re.get('text')+' 聊天中...');
		setAppContext('id',re.get('id'));
		setAppContext('name',re.get('text'));
	});
	
	var chatPanel = new Ext.Panel({
				region : 'center',
				title : ' ',
				layout : 'fit',
				autoScroll : false,
				collapsible : false,
				margins : '0 0 0 0',
				items : {
					xtype : 'form',
					baseCls : 'x-plain',
					autoHeight : false,
					autoWidth : false,
					autoScroll : true,
					bodyStyle : 'padding:0 0px 0;',
					items : [{
								xtype : 'htmleditor',
								id : 'htmleditor',
								hideLabel : true,
								enableSourceEdit:false,
								enableLists:false,
								//fontFamilies :[' 宋体 ',' 隶书 ',' 黑体 '],   
								//defaultFont:' 宋体 ',
                                width: 480, 
                                height: 128,
                                nchor : '0-50'
                             }]
				},
				bbar : [{
							text : '发送(Ctrl+Enter)',
							handler : function() {
								sendMsg();
							}
						}, 
						'-', {
							text : '清除',
							handler : function() {
								Ext.getCmp("htmleditor").reset();
								fileForm.form.getEl().dom.reset();   
							}
						}]});
	
	Ext.getCmp("htmleditor").onEditorEvent = function(e) {
		this.updateToolbar();
		var keyCode = (document.layers) ? keyStroke.which : e.keyCode;
		if (keyCode == 13 && e.ctrlKey)
			sendMsg(); 
	}
	
	fileForm=new Ext.form.FormPanel({region : 'south',height : 60,layout:'table',title : '添加附件',collapsible : true,bodyStyle: 'border:0px;padding:10px',border:false,fileUpload:true});
	fileData = fileForm.add({xtype:'filefield',id:'fileData',width:400});
	fileForm.getForm().markInvalid=function(error)
	{
		if(error=='success')
		{
			Ext.alert('成功');
		} 
		else if (error=='fileSizeError')
		{
			//Ext.alert('文件过大,最大上传限制10M');
		}
		else if (error=='noFileError')
		{
			Ext.alert('找不到上传文件');
		}
		else
		{
			Ext.alert(error);
		}
		fileForm.form.getEl().dom.reset();  
	}
	logPanel = new Ext.Panel({
				region : 'north',
				title : '聊天记录',
				border:false,
				id : 'history_panel',
				height : 210,
				autoScroll : true,
				html : '<div id=publicChat></div>',
				tbar : ['->',{
							id : 'openMsgPage',
							xtype : 'button',
							text : '历史消息',
							handler : function() {
								parent.openTab('SAM0052','消息管理','EDIT');
							}
						},'-', {
							id : 'changScoll',
							xtype : 'button',
							text : '锁定滚动条',
							handler : function() {
								if (flag) {
									flag = false;
								} else {
									flag = true;
								}
								this.setText(flag ? '锁定滚动条' : '恢复自动滚动');
							}
						}]
			});
	chatWin=new Ext.Window({
		title:'聊天窗口',
		region : 'center',
		layout : 'border',
		closeAction:'hide',
		maximizable : true,
		width : 700,
		height : 450,
		listeners:{    
                    "show":function(){isHide=false},    
                    "hide":function(){isHide=true},    
                    "close":function(){} ,
                    "maximize":function(){logPanel.setHeight(500);Ext.getCmp("htmleditor").setHeight(160);Ext.getCmp("htmleditor").setWidth(800);chatWin.doLayout();},
                    "restore":function(){logPanel.setHeight(210);Ext.getCmp("htmleditor").setHeight(125);Ext.getCmp("htmleditor").setWidth(465);chatWin.doLayout();}
                    }, 
		items : [{region:"west",
			width:200,
			layout:"accordion",
			items:[treePanel,
			tree2Panel
			]}, {
				region : 'center',
				layout : 'border',
				items : [
				         logPanel,chatPanel,fileForm
				         ]
					}
				]
		});
		
		
			
        expandFunction('root');
        
       
		showUserTreeData();		
		
		}
		
    };
 function sendMsg(){
 
		var content_value = Ext.getCmp("htmleditor").getValue();
								var str = delHtmlTag(content_value);
								var fileName = Ext.getCmp('fileData').getValue();
								Ext.getCmp("history_panel").focus();
								var userID,userName;
								if(logPanel.title == '群发消息'){
									userID = onItemClick();
									userName='群体';
									if(userID == ''){
										Ext.Msg.alert("消息提示", "您没有选择发送人！");
										return;
									}
								}else{
									userID= getAppContext('id');
									userName=getAppContext('name');
								}
								if(logPanel.title == '聊天记录'){
									Ext.Msg.alert("消息提示", "您没有选择发送人！",function(){Ext.getCmp("htmleditor").focus();});
									return;
								}
								if (str.trim() == '' && fileName == '') {
									Ext.Msg.alert("消息提示", "您没有输入消息文本内容！",function(){Ext.getCmp("htmleditor").focus();});
									return;
								}
								if(fileName!=''){
								 content_value += '<br><a href="/SOC/IMFileDownLoad?messageCode=@messageCode@">'+fileName.substring(fileName.lastIndexOf('\\')+1)+'</a>';
								}
								
								SAM_MessageService.sendMessage(userID,userName,content_value,function(messageCode){
									if(messageCode == SOC_MESSAGE.sessionTimeout) {
										parent.reLogin();
										return;
									}
									Ext.getCmp("htmleditor").setValue('');
									Ext.getCmp("htmleditor").focus(true);
									if(fileName=='') return;
									fileForm.getForm().doAction('submit',
									{
										url:'/SOC/IMFileUpLoad?messageCode='+messageCode,
										method:'post',
										success:function(o,r)
										{
										 	fileForm.form.getEl().dom.reset();  
										}
									});
								});
	}				   
	function delHtmlTag(str) {
		var s = str.replace(/<[^>]+>/g, '');
		return s.replace(/(^(\s|&nbsp;)*)|((\s|&nbsp;)*$)/g, "");
	}
	
}

//----------------------------------------------------------------------------