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
@Table(name="SAM.SAM_AuditRuleExpression")  
public class TAuditRuleExpression
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String componentId;

	private String flowId;

	private String expression;

	public String getExpression()
	{
		return expression;
	}

	public void setExpression(String expression)
	{
		this.expression = expression;
	}

	public String getComponentId()
	{
		return componentId;
	}

	public void setComponentId(String componentId)
	{
		this.componentId = componentId;
	}

	public String getFlowId()
	{
		return flowId;
	}

	public void setFlowId(String flowId)
	{
		this.flowId = flowId;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String toString()
	{
		return ReflectionToStringBuilder.toString(this);
	}
}