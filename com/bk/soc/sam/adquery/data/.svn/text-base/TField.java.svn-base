package com.bk.soc.sam.adquery.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_AdvancedQuery_Field")  
public class TField
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	
	private String moduleId;
	
	private String tableName;
	
	private String fieldName;
	
	private String fieldText;
	
	private String fieldType;
	
	private String isJoinField;

	public String getIsJoinField()
	{
		return isJoinField;
	}

	public void setIsJoinField(String isJoinField)
	{
		this.isJoinField = isJoinField;
	}

	public String getModuleId()
	{
		return moduleId;
	}

	public void setModuleId(String moduleId)
	{
		this.moduleId = moduleId;
	}

	public String getFieldName()
	{
		return fieldName;
	}

	public void setFieldName(String fieldName)
	{
		this.fieldName = fieldName;
	}

	public String getFieldText()
	{
		return fieldText;
	}

	public void setFieldText(String fieldText)
	{
		this.fieldText = fieldText;
	}

	public String getFieldType()
	{
		return fieldType;
	}

	public void setFieldType(String fieldType)
	{
		this.fieldType = fieldType;
	}

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
}
