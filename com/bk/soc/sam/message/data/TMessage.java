package com.bk.soc.sam.message.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Message") 
public class TMessage
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private Long messageCode;

	private String messageText;

	private String messageType;

	private String senderCode;

	private String receiverCode;
	
	private String senderName;

	private String receiverName;

	private Date sendDate;

	private String state;
	
	private String senderDel;
	
	private String receiverDel;
	
	private String fileName;
	
	private byte[] fileData;

	public byte[] getFileData()
	{
		return fileData;
	}

	public void setFileData(byte[] fileData)
	{
		this.fileData = fileData;
	}

	public String getReceiverDel()
	{
		return receiverDel;
	}

	public void setReceiverDel(String receiverDel)
	{
		this.receiverDel = receiverDel;
	}

	public String getSenderDel()
	{
		return senderDel;
	}

	public void setSenderDel(String senderDel)
	{
		this.senderDel = senderDel;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getMessageText()
	{
		return messageText;
	}

	public void setMessageText(String messageText)
	{
		this.messageText = messageText;
	}

	public String getMessageType()
	{
		return messageType;
	}

	public void setMessageType(String messageType)
	{
		this.messageType = messageType;
	}

	public String getReceiverCode()
	{
		return receiverCode;
	}

	public void setReceiverCode(String receiverCode)
	{
		this.receiverCode = receiverCode;
	}

	public String getReceiverName()
	{
		return receiverName;
	}

	public void setReceiverName(String receiverName)
	{
		this.receiverName = receiverName;
	}

	public Date getSendDate()
	{
		return sendDate;
	}

	public void setSendDate(Date sendDate)
	{
		this.sendDate = sendDate;
	}

	public String getSenderCode()
	{
		return senderCode;
	}

	public void setSenderCode(String senderCode)
	{
		this.senderCode = senderCode;
	}

	public String getSenderName()
	{
		return senderName;
	}

	public void setSenderName(String senderName)
	{
		this.senderName = senderName;
	}

	public String getState()
	{
		return state;
	}

	public void setState(String state)
	{
		this.state = state;
	}

	public Long getMessageCode()
	{
		return messageCode;
	}

	public void setMessageCode(Long messageCode)
	{
		this.messageCode = messageCode;
	}

	public String getFileName()
	{
		return fileName;
	}

	public void setFileName(String fileName)
	{
		this.fileName = fileName;
	}

}
