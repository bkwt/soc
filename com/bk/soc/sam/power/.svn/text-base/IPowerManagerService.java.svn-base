package com.bk.soc.sam.power;

import java.util.List;

import com.bk.soc.sam.power.data.TMethod;
import com.bk.soc.sam.power.data.TQueryPower;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface IPowerManagerService
{
	public ViewData queryBeans(AreaInfo areaInfo);
	
	public ViewData queryBean(String componentId);
	
	public ViewData queryMethods(String componentId);
	
	public ViewData queryMethod(String componentId,String methodName);
	
	public ViewData opAddNewMethod(TMethod bill);
	
	public ViewData opDeleteMethods(List<TMethod> List);
	
	public ViewData queryQueryPowers(String componentId,String methodName);
	
	public ViewData opSaveQueryPowers(TMethod bill,List<TQueryPower> List);
	
	public ViewData opExportSQL(String componentId);
	
	public ViewData opAddQueryPersonPowers(List<TQueryPower> list);
	
	public ViewData opRemoveQueryPowers(List<TQueryPower> list);
	
	public ViewData opAddQueryOrgzPower(TQueryPower bill,boolean isIncludeChildren);
	
	public ViewData opGetMethods(String componentId);
}
