package com.bk.soc.sam.component.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_SmsAuditConfig")  
public class TSmsAuditConfig
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String componentId;

	private String smsSend;

	private String templateContent;

	private String replyFlag;

	private String smsAudit;

	private String type;

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

	public String getReplyFlag()
	{
		return replyFlag;
	}

	public void setReplyFlag(String replyFlag)
	{
		this.replyFlag = replyFlag;
	}

	public String getSmsAudit()
	{
		return smsAudit;
	}

	public void setSmsAudit(String smsAudit)
	{
		this.smsAudit = smsAudit;
	}

	public String getTemplateContent()
	{
		return templateContent;
	}

	public void setTemplateContent(String templateContent)
	{
		this.templateContent = templateContent;
	}

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}

	public String getSmsSend()
	{
		return smsSend;
	}

	public void setSmsSend(String smsSend)
	{
		this.smsSend = smsSend;
	}
}
