package com.bk.soc.sam.component.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Function")  
public class TFunction
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String functionId;

	private String functionName;
	
	private String componentId;

	private String isSelectPage;

	private String isReport;

	private String url;

	private String progParams;
	
	private String tether;
	
	private String isAudit;
	
	private String note;
	
	private Long timeStamp;

	public Long getTimeStamp()
	{
		return timeStamp;
	}

	public void setTimeStamp(Long timeStamp)
	{
		this.timeStamp = timeStamp;
	}

	public String getComponentId()
	{
		return componentId;
	}

	public void setComponentId(String componentId)
	{
		this.componentId = componentId;
	}

	public String getFunctionId()
	{
		return functionId;
	}

	public void setFunctionId(String functionId)
	{
		this.functionId = functionId;
	}

	public String getFunctionName()
	{
		return functionName;
	}

	public void setFunctionName(String functionName)
	{
		this.functionName = functionName;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getIsAudit()
	{
		return isAudit;
	}

	public void setIsAudit(String isAudit)
	{
		this.isAudit = isAudit;
	}

	public String getIsReport()
	{
		return isReport;
	}

	public void setIsReport(String isReport)
	{
		this.isReport = isReport;
	}

	public String getIsSelectPage()
	{
		return isSelectPage;
	}

	public void setIsSelectPage(String isSelectPage)
	{
		this.isSelectPage = isSelectPage;
	}

	public String getProgParams()
	{
		return progParams;
	}

	public void setProgParams(String progParams)
	{
		this.progParams = progParams;
	}

	public String getTether()
	{
		return tether;
	}

	public void setTether(String tether)
	{
		this.tether = tether;
	}

	public String getUrl()
	{
		return url;
	}

	public void setUrl(String url)
	{
		this.url = url;
	}

	public String getNote()
	{
		return note;
	}

	public void setNote(String note)
	{
		this.note = note;
	}

	
}
