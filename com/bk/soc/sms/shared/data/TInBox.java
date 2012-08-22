package com.bk.soc.sms.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SMS.SMS_InBox")
public class TInBox
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;
	
	private String sender;

	private String msg;

	private Date arrivedTime;
	
	private Long commPort;

	private String status;

	private String notes;
	
	private Long process;

	private String type;

	private String encoding;
	@Column(name = "message_Date")
	private Date messageDate;
	@Column(name = "gateway_Id")
	private String gatewayId;

	public Date getArrivedTime()
	{
		return arrivedTime;
	}

	public void setArrivedTime(Date arrivedTime)
	{
		this.arrivedTime = arrivedTime;
	}

	public Long getCommPort()
	{
		return commPort;
	}

	public void setCommPort(Long commPort)
	{
		this.commPort = commPort;
	}

	public String getEncoding()
	{
		return encoding;
	}

	public void setEncoding(String encoding)
	{
		this.encoding = encoding;
	}

	public String getGatewayId()
	{
		return gatewayId;
	}

	public void setGatewayId(String gatewayId)
	{
		this.gatewayId = gatewayId;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public Date getMessageDate()
	{
		return messageDate;
	}

	public void setMessageDate(Date messageDate)
	{
		this.messageDate = messageDate;
	}

	public String getMsg()
	{
		return msg;
	}

	public void setMsg(String msg)
	{
		this.msg = msg;
	}

	public String getNotes()
	{
		return notes;
	}

	public void setNotes(String notes)
	{
		this.notes = notes;
	}

	public Long getProcess()
	{
		return process;
	}

	public void setProcess(Long process)
	{
		this.process = process;
	}

	public String getSender()
	{
		return sender;
	}

	public void setSender(String sender)
	{
		this.sender = sender;
	}

	public String getStatus()
	{
		return status;
	}

	public void setStatus(String status)
	{
		this.status = status;
	}

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}
}
