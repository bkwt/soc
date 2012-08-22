new Ext.Window({
	
			title:"添加人员",
	
			width:500,
	height:350,
	plain:true,
	layout:"form",
	labelWidth:59,
	defaultType:"textfield",
	defaults:{anchor:"95%"},
	items:[{
		xtype:"panel",
		baseCls:"x-plain",
		style:"padding:5px",
		layout:"column",
		items:[{
			columnWidth:5,
			layout:"form",
			labelWidth:55,
			defaultType:"textfield",
			defaults:{width:160},
			baseCls:"x-plain",
			items:[{
					fieldLabel:"姓名"
			}，{
					fieldLabel:"年龄"，
					value:28,
					readOnly:true
				},{
					xtype:"datefield",
					format:"Y-m-d",
					value:"1981-10-18",
					readOnly:true,
					fieldLabel:"出生日期",
					listeners:{
						"blur":function(_df){
							var _age = _df.ownerCt.findByType("textfield")[1];
							_age.setValue(new Date().getFullYear() -_df.getValue().getFullYear()+1);
						}
					}	
						},{
							fieldLabel:"联系电话"				
							},{
							fieldLabel:"手机号码"				
							},{
							fieldLabel:"电子邮件"				
							}，{
								xtype:"combo",
								fieldLabel:"性别",
								mode:"local",
								displayField:"sex",
								readOnly:true,
								triggerAction:"all",
								value:"男"
								store:new Ext.data.SimpleStore({
											fields:["sex"],
											data:[["男"],["女"]]
										})
							}]
							},{
								columnWidth:.5,
								layout:"form",
								labelWidth:55,
								baseCls:"x-plain",
								items:{
									xtype:"textfield",
									fieldLabel:"个人照片",
									width:170,
									height:177,
									inputType:"image"
									}
												}]
				},{
					fieldLabel:"身份证号",
					width:400
					}，{
					fieldLabel:"具体地址",
					width：400
				},{
				fieldLabel:"职位"
				}],
				showLock:false,
				listeners:{
					"show":function(_window){
									if(!_window["showLock"]){
										_window.findByType("textfield")[7.getEl().dom.src = 
										"default_pic.gif";
												_window["showLock"] = true;
										
										
										}
									}
				
				
					},
					buttons:[{
						text:"确定",
						handler:function(){
							alert(this.ownerCt.buttons[1].text);
							
						}
					},{
						text:"取消"
					
					}]
				
				}).show();
			});
		
		
		}]
	
	
	}]



})