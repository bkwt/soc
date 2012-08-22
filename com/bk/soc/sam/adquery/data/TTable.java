package com.bk.soc.sam.adquery.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_AdvancedQuery_Table")  
public class TTable
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	
	private String moduleId;
	
	private String tableName;
	
	private String tableType;

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getTableName()
	{
		return tableName;
	}

	public void setTableName(String tableName)
	{
		this.tableName = tableName;
	}

	public String getTableType()
	{
		return tableType;
	}

	public void setTableType(String tableType)
	{
		this.tableType = tableType;
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
