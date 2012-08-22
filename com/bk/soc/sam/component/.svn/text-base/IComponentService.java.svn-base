package com.bk.soc.sam.component;


import com.bk.soc.sam.component.data.TComponent;
import com.bk.soc.sam.component.data.TSmsAuditConfig;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;


public interface IComponentService extends IComponentPKRuleService,IComponentAuditService
{
	public ViewData queryBeans(AreaInfo areaInfo);
	
	public ViewData queryBean(String beanID);
	
	public ViewData opAddNewBean(TComponent bill);
	
	public ViewData opDeleteBean(TComponent bill);
	
	public ViewData opModifyBean(TComponent bill);
	
	public ViewData opExportConfigData(String componentId,String type);
	
	public ViewData opExportAllConfigData(AreaInfo areaInfo,String type);
	
	public ViewData querySmsAuditConfigs(String componentId);
	
	public ViewData opModifySmsAuditConfigs(TSmsAuditConfig bill);
}
