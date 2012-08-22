//1请求DWR
require('SAM_CompanyService');

//2加载配置文件
loadAreaConfig();

function markInvalid(error)
{
	if(error=='success')
	{
		Ext.alert('成功');
	}
	else if (error=='fileSizeError')
	{
		Ext.alert('文件过大,最大上传限制3M');
	}
	else if (error=='noFileError')
	{
		Ext.alert('找不到上传文件');
	}
	else if (error=='fileExists')
	{
		Ext.alert('文件已存在,请重命名文件或删除已有文件');
	}
	else
	{
		Ext.alert(error);
	}
}

//3声明PANEL
var page1 = new PageUnit('page1');

var detailArea=new DetailAreaUnit('detailArea');
detailArea.addToFieldSet([{
    fieldLabel: '单位编码',
    name: 'companyCode',
    xtype:'textfield'
}, {
    fieldLabel: '名称',
    name: 'companyName',
    xtype:'textfield'
}, {
    fieldLabel: '简称',
    name: 'companyNameBrief',
    xtype:'textfield'
}, {
    fieldLabel: '电话',
    name: 'tel',
    xtype:'textfield'
}, {
    fieldLabel: '地址',
    name: 'addr',
    xtype:'textfield'
}, {
    fieldLabel: '邮编',
    name: 'postCode',
    xtype:'textfield'
}]);

var logoArea=new DetailAreaUnit('logoArea');
var fileForm=new Ext.form.FormPanel({layout:'table',bodyStyle: 'border:0px;padding:10px',border:false,fileUpload:true});
						
fileForm.add({tag: 'div', html: '单位LOGO：',bodyStyle:queryLabel+'width:100'});
var logoField=fileForm.add({xtype:'textfield',autoCreate:{tag: "input", type: "file", size: "40", autocomplete: "off"},name:'fileName',width:220,allowBlank: false});
fileForm.add({tag: 'div', html: '（默认像素为200×75）',bodyStyle:queryLabel+'width:200'});
fileForm.getForm().markInvalid=markInvalid;
logoArea.addToFieldSet(fileForm);


logoArea.addToFieldSet({tag:'div',html:'当前单位LOGO',bodyStyle:queryLabel+'width:192'});
logoArea.addToFieldSet({tag:'div',html:'<img src="/SOC/org/fdm/images/main_logo.jpg"></img>',height:100,bodyStyle:queryLabel+'width:308'});
//-------------------------------------------------------
var fileForm1=new Ext.form.FormPanel({layout:'table',bodyStyle: 'border:0px;padding:10px',border:false,fileUpload:true});
						
fileForm1.add({tag: 'div', html: '报表LOGO：',bodyStyle:queryLabel+'width:100'});
var reportLogoField=fileForm1.add({xtype:'textfield',autoCreate:{tag: "input", type: "file", size: "40", autocomplete: "off"},name:'fileName',width:220,allowBlank: false});
fileForm1.add({tag: 'div', html: '（默认像素为120×60）',bodyStyle:queryLabel+'width:200'});
fileForm1.getForm().markInvalid=markInvalid;
logoArea.addToFieldSet(fileForm1);

logoArea.addToFieldSet({tag:'div',html:'当前报表LOGO',bodyStyle:queryLabel+'width:192'});
logoArea.addToFieldSet({tag:'div',html:'<img src="/SOC/org/fdm/images/report_logo.jpg"></img>',height:100,bodyStyle:queryLabel+'width:230'});
//-------------------------------------------------------
var fileForm2=new Ext.form.FormPanel({layout:'table',bodyStyle: 'border:0px;padding:10px',border:false,fileUpload:true});
						
fileForm2.add({tag: 'div', html: 'Flash：',bodyStyle:queryLabel+'width:100'});
var flashField=fileForm2.add({xtype:'textfield',autoCreate:{tag: "input", type: "file", size: "40", autocomplete: "off"},name:'fileName',width:220,allowBlank: false});
fileForm2.add({tag: 'div', html: '（默认像素为565×65）',bodyStyle:queryLabel+'width:200'});
fileForm2.getForm().markInvalid=markInvalid;
logoArea.addToFieldSet(fileForm2);

logoArea.addToFieldSet({tag:'div',html:'当前Flash',bodyStyle:queryLabel+'width:160'});
logoArea.addToFieldSet({tag:'div',html:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="565" height="65"><param name="movie" value="/SOC/org/fdm/flash/top_flash.swf" /><param name="quality" value="high" /><embed src="/SOC/org/fdm/flash/tl.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="180"></embed></object>',height:100,bodyStyle:queryLabel+'width:674'});
//4加载PANEL
function appInit()
{
	page1.init();
	page1.add(detailArea);
	page1.add(logoArea);
	
	page1.show(request.getParameter('progParams'));
	
	detailArea.queryCompany();
	hideLoading();
}

//5按钮方法
detailArea.queryCompany=function()
{
	SAM_CompanyService.queryMyCompany(function(viewData){
		detailArea.showViewData(viewData);
	});
}

detailArea.opModifyCompany=function(constParam)
{
	var obj=detailArea.getValueObject();
	SAM_CompanyService.opModifyCompany(obj,function(viewData)
	{
		if(!viewData.isSucceed)
		{
			Ext.alert('修改失败.'+viewData.message);
		}
		else
		{
			detailArea.queryCompany();
		}
	});
}
logoArea.opUploadLogo=function()
{
	if(logoField.getValue()=='')
	{
		Ext.alert('请选择企业LOGO文件');
		return;
	} 
	
	fileForm.getForm().doAction('submit',
	{
		url:'/SOC/FileUpLoad?mode=file&savePath=org/fdm/images/&fileName=cinee_logo.jpg',
		method:'post',
		success:function(o)
		{
			//Ext.alert('已上传');
			document.location.reload()
		}
	});
}
logoArea.opUploadReportLogo=function()
{
	if(reportLogoField.getValue()=='')
	{
		Ext.alert('请选择报表LOGO文件');
		return;
	} 
	
	fileForm1.getForm().doAction('submit',
	{
		url:'/SOC/FileUpLoad?mode=file&savePath=org/fdm/images/&fileName=report_logo.jpg',
		method:'post',
		success:function(o)
		{
			//Ext.alert('已上传');
			document.location.reload()
		}
	});
}

logoArea.opUploadFlash=function()
{
	if(flashField.getValue()=='')
	{
		Ext.alert('请选择Flash文件');
		return;
	} 
	
	fileForm2.getForm().doAction('submit',
	{
		url:'/SOC/FileUpLoad?mode=file&savePath=org/fdm/flash/&fileName=top_flash.swf',
		method:'post',
		success:function(o)
		{
			//Ext.alert('已上传');
			document.location.reload()
		}
	});
}

Ext.onReady(appInit);