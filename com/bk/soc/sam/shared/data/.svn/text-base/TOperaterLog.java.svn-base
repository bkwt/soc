package com.bk.soc.sam.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_OperaterLog") 
public class TOperaterLog
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String componentId;
	
	private String methodName;
	
	private String userID;
	
	private String userName;
	
	private String billId;
	
	private String note;
	
	private Date operaterDate;
	
	private String requestIP;

	public String getRequestIP()
	{
		return requestIP;
	}

	public void setRequestIP(String requestIP)
	{
		this.requestIP = requestIP;
	}

	public String getBillId()
	{
		return billId;
	}

	public void setBillId(String billId)
	{
		this.billId = billId;
	}

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

	public String getMethodName()
	{
		return methodName;
	}

	public void setMethodName(String methodName)
	{
		this.methodName = methodName;
	}

	public String getNote()
	{
		return note;
	}

	public void setNote(String note)
	{
		this.note = note;
	}

	public Date getOperaterDate()
	{
		return operaterDate;
	}

	public void setOperaterDate(Date operaterDate)
	{
		this.operaterDate = operaterDate;
	}

	public String getUserID()
	{
		return userID;
	}

	public void setUserID(String userID)
	{
		this.userID = userID;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

}
