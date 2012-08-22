package com.bk.soc.sam.power.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Power_QueryPower")
public class TQueryPower
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String componentId;

	private String methodName;
	
	private String filterType;
	
	private String targetCode;

	private String targetName;

	private String powerConditions;

	public String getComponentId()
	{
		return componentId;
	}

	public void setComponentId(String componentId)
	{
		this.componentId = componentId;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getMethodName()
	{
		return methodName;
	}

	public void setMethodName(String methodName)
	{
		this.methodName = methodName;
	}

	public String getPowerConditions()
	{
		return powerConditions;
	}

	public void setPowerConditions(String powerConditions)
	{
		this.powerConditions = powerConditions;
	}

	public String getFilterType()
	{
		return filterType;
	}

	public void setFilterType(String filterType)
	{
		this.filterType = filterType;
	}

	public String getTargetCode()
	{
		return targetCode;
	}

	public void setTargetCode(String targetCode)
	{
		this.targetCode = targetCode;
	}

	public String getTargetName()
	{
		return targetName;
	}

	public void setTargetName(String targetName)
	{
		this.targetName = targetName;
	}
}
