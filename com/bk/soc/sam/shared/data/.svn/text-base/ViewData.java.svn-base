package com.bk.soc.sam.shared.data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.DataTransferObject;
import org.fdm.core.data.AbstractData;
@DataTransferObject 
public class ViewData extends AbstractData
{
	private List resultList;// ��ݼ�

	private int currentPage;// ��ǰҳ

	private Long recordCount;// ����
	
	private int pageCount;// ��ҳ��
	
	private Map<String, String> newPrimaryKeys;

	public ViewData()
	{
		super();
		newPrimaryKeys=new HashMap<String, String>();
	}
	
	public ViewData(boolean isSucceed,String message)
	{
		super();
		this.setIsSucceed(isSucceed);
		this.setMessage(message);
		newPrimaryKeys=new HashMap<String, String>();
	}
	
	public void appendResultList(List list)
	{
		assert list!=null:"����list��ӦΪ��";
		if(this.resultList==null)
		{
			this.resultList=list;
		}
		else
		{
			this.resultList.addAll(list);
		}
	}
	
	public void setResultList(List list)
	{
		this.resultList = list;
	}

	public List getResultList()
	{
		return this.resultList;
	}

	public void setCurrentPage(int cp)
	{
		this.currentPage = cp;
	}

	public int getCurrentPage()
	{
		return this.currentPage;
	}

	public void setPageCount(int pc)
	{
		this.pageCount = pc;
	}

	public int getPageCount()
	{
		return this.pageCount;
	}

	public Map getNewPrimaryKeys()
	{
		return newPrimaryKeys;
	}
	
	public void setNewPrimaryKeys(Map pk)
	{
		this.newPrimaryKeys = pk;
	}
	
	public void addNewPrimaryKey(String key,String value)
	{
		newPrimaryKeys.put(key, value);
	}

	public Long getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(Long recordCount) {
		this.recordCount = recordCount;
	}
	
}

