package com.bk.soc.sam.component.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_AuditProcess")  
public class TAuditProcess
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String componentId;

	private String billId;

	private Integer auditTime;

	private String userID;

	private Integer step;

	private Date auditDate;

	private String auditReason;
	
	private String flowId;
	
	private String flowNote;

	public String getFlowId()
	{
		return flowId;
	}

	public void setFlowId(String flowId)
	{
		this.flowId = flowId;
	}

	public String getFlowNote()
	{
		return flowNote;
	}

	public void setFlowNote(String flowNote)
	{
		this.flowNote = flowNote;
	}

	public String getAuditReason()
	{
		return auditReason;
	}

	public void setAuditReason(String auditReason)
	{
		this.auditReason = auditReason;
	}

	public Date getAuditDate()
	{
		return auditDate;
	}

	public void setAuditDate(Date auditDate)
	{
		this.auditDate = auditDate;
	}

	public String toString()
	{
		return ReflectionToStringBuilder.toString(this);
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

	public String getUserID()
	{
		return userID;
	}

	public void setUserID(String userID)
	{
		this.userID = userID;
	}

	public Integer getStep()
	{
		return step;
	}

	public void setStep(Integer step)
	{
		this.step = step;
	}
}