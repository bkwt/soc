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
@Table(name="SMS.SMS_SendedMsgInfo_v")
public class VSendedMsgInfo
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;
	
	private Long expressLevel;

	private String sender;

	private String receiverMobileNo;
	
	private String msg;

	private Date sendTime;
	
	private String senderName;
	
	private String receiverName;

	public Long getExpressLevel()
	{
		return expressLevel;
	}

	public void setExpressLevel(Long expressLevel)
	{
		this.expressLevel = expressLevel;
	}

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

	public String getReceiverName()
	{
		return receiverName;
	}

	public void setReceiverName(String receiverName)
	{
		this.receiverName = receiverName;
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

	public Date getSendTime()
	{
		return sendTime;
	}

	public void setSendTime(Date sendTime)
	{
		this.sendTime = sendTime;
	}
}
