package com.bk.soc.sam.component.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_AuditBillInfo")  
public class TAuditBillInfo
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String componentId;

	private String billId;

	private Long billHid;

	private Integer auditTime;

	private Integer nowStep;
	
	private String makeUserID;


	public String getMakeUserID()
	{
		return makeUserID;
	}

	public void setMakeUserID(String makeUserID)
	{
		this.makeUserID = makeUserID;
	}

	public Integer getAuditTime()
	{
		return auditTime;
	}

	public void setAuditTime(Integer auditTime)
	{
		this.auditTime = auditTime;
	}

	public String getComponentId()
	{
		return componentId;
	}

	public void setComponentId(String componentId)
	{
		this.componentId = componentId;
	}

	public String getBillId()
	{
		return billId;
	}

	public void setBillId(String billId)
	{
		this.billId = billId;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public Integer getNowStep()
	{
		return nowStep;
	}

	public void setNowStep(Integer nowStep)
	{
		this.nowStep = nowStep;
	}

	public String toString()
	{
		return ReflectionToStringBuilder.toString(this);
	}

	public Long getBillHid()
	{
		return billHid;
	}

	public void setBillHid(Long billHid)
	{
		this.billHid = billHid;
	}

}