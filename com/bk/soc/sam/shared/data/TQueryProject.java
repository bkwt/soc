package com.bk.soc.sam.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_advancedquery_queryproject")
public class TQueryProject
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	
	private String moduleId;
	
	private String queryProjectName;
	
	private String queryProjectJSON;

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getQueryProjectJSON()
	{
		return queryProjectJSON;
	}

	public void setQueryProjectJSON(String queryProjectJSON)
	{
		this.queryProjectJSON = queryProjectJSON;
	}

	public String getQueryProjectName()
	{
		return queryProjectName;
	}

	public void setQueryProjectName(String queryProjectName)
	{
		this.queryProjectName = queryProjectName;
	}

	public String getModuleId()
	{
		return moduleId;
	}

	public void setModuleId(String moduleId)
	{
		this.moduleId = moduleId;
	}
}
