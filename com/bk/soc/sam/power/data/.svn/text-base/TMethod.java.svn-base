package com.bk.soc.sam.power.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Power_Method") 
public class TMethod
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String componentId;

	private String methodName;

	private String methodDesc;

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

	public String getMethodDesc()
	{
		return methodDesc;
	}

	public void setMethodDesc(String methodDesc)
	{
		this.methodDesc = methodDesc;
	}

	public String getMethodName()
	{
		return methodName;
	}

	public void setMethodName(String methodName)
	{
		this.methodName = methodName;
	}

}
