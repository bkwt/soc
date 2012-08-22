package com.bk.soc.sam.adquery.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_AdvancedQuery_Module")  
public class TModule
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	
	private String moduleId;
	
	private String moduleDesc;

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getModuleDesc()
	{
		return moduleDesc;
	}

	public void setModuleDesc(String moduleDesc)
	{
		this.moduleDesc = moduleDesc;
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
