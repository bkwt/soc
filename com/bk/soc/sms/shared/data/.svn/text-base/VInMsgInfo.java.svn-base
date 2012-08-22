package com.bk.soc.sms.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SMS.SMS_InMsgInfo_v")
public class VInMsgInfo
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;

	private String sender;
	
	private String msg;

	private Date arrivedTime;
	
	private String senderName;
	

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

	public String getSender()
	{
		return sender;
	}

	public void setSender(String sender)
	{
		this.sender = sender;
	}

	public String getSenderName()
	{
		return senderName;
	}

	public void setSenderName(String senderName)
	{
		this.senderName = senderName;
	}

	public Date getArrivedTime()
	{
		return arrivedTime;
	}

	public void setArrivedTime(Date arrivedTime)
	{
		this.arrivedTime = arrivedTime;
	}

}
