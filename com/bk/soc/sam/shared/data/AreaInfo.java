package com.bk.soc.sam.shared.data;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
public class AreaInfo
{
	private int currentPage;
	
	private int pageSize;
	
	private String queryCondition;
	
	private String orderField;
	
	private String orderDir;
	
	private boolean needAuditPower=false;
	
	private boolean needPersonPower=false;
	
	private String powerConditions="3=4";
	
	private String areaId;
	
	private String functionId;
	
	private String functionProgParam;
	
	private String componentId;
	
	private String userID;
	
	public String getUserID()
	{
		return userID;
	}

	public void setUserID(String userID)
	{
		this.userID = userID;
	}

	public String getAreaId()
	{
		return areaId;
	}

	public void setAreaId(String areaId)
	{
		this.areaId = areaId;
	}

	public String getFunctionId()
	{
		return functionId;
	}

	public void setFunctionId(String functionId)
	{
		this.functionId = functionId;
	}

	public boolean needPersonPower()
	{
		return needPersonPower;
	}

	public void setNeedPersonPower(boolean needPersonPower)
	{
		this.needPersonPower = needPersonPower;
	}

	public AreaInfo()
	{
		queryCondition=" 1=1 ";
	}
	
	public String getOrderDir()
	{
		return orderDir;
	}

	public void setOrderDir(String orderDir)
	{
		this.orderDir = orderDir;
	}

	public String getOrderField()
	{
		return orderField;
	}

	public void setOrderField(String orderField)
	{
		this.orderField = orderField;
	}

	public int getPageSize()
	{
		return pageSize;
	}

	public void setPageSize(int pageSize)
	{
		this.pageSize = pageSize;
	}

	public int getCurrentPage()
	{
		return currentPage;
	}

	public void setCurrentPage(int currentPage)
	{
		this.currentPage = currentPage;
	}

	public String getQueryCondition()
	{
		return queryCondition;
	}

	public void setQueryCondition(String queryCondition)
	{
		this.queryCondition = queryCondition;
	}

	public boolean needAuditPower()
	{
		return needAuditPower;
	}

	public void setNeedAuditPower(boolean needAuditPower)
	{
		this.needAuditPower = needAuditPower;
	}

	public String getPowerConditions()
	{
		return powerConditions;
	}

	public void setPowerConditions(String powerConditions)
	{
		this.powerConditions = powerConditions;
	}

	public String getFunctionProgParam()
	{
		return functionProgParam;
	}

	public void setFunctionProgParam(String functionProgParam)
	{
		this.functionProgParam = functionProgParam;
	}

	public String getComponentId()
	{
		return componentId;
	}

	public void setComponentId(String componentId)
	{
		this.componentId = componentId;
	}
}
