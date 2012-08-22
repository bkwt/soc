package com.bk.soc.sms.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SMS.SMS_HistoryMsg")
public class THistoryMsg
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;
	
	private String uid;
	
	private String receiverMobileNo;
	
	private String msg;

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getMsg()
	{
		return msg;
	}

	public void setMsg(String msg)
	{
		this.msg = msg;
	}

	public String getReceiverMobileNo()
	{
		return receiverMobileNo;
	}

	public void setReceiverMobileNo(String receiverMobileNo)
	{
		this.receiverMobileNo = receiverMobileNo;
	}

	public String getUid()
	{
		return uid;
	}

	public void setUid(String uid)
	{
		this.uid = uid;
	}
}
