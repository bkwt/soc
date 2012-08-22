package com.bk.soc.sam.shared.data;

import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
public class QueryData
{
	private List<String> joinFields;
	
	private List<Map> fieldList;

	public List<Map> getFieldList()
	{
		return fieldList;
	}

	public void setFieldList(List<Map> fieldList)
	{
		this.fieldList = fieldList;
	}

	public List<String> getJoinFields()
	{
		return joinFields;
	}

	public void setJoinFields(List<String> joinFields)
	{
		this.joinFields = joinFields;
	}
}
