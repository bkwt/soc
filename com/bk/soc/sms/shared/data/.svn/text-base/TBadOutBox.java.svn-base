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
@Table(name="SMS.SMS_BadOutBox")
public class TBadOutBox
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;
	
	private Long expressLevel;

	private String sender;

	private String receiverMobileNo;
	
	private String msg;

	private Date sendTime;

	private String isChinese;
	
	private Long commPort;

	private Long needReport;

	private Long refNo;
	
	private String encoding;

	private Long flashSms;

	private Long srcPort;
	
	private Long dstPort;

	private Date sentDate;

	private String priority;
	
	private String status;

	private Long errors;
	@Column(name = "gateway_Id")
	private String gatewayId;

	public Long getCommPort()
	{
		return commPort;
	}

	public void setCommPort(Long commPort)
	{
		this.commPort = commPort;
	}

	public Long getDstPort()
	{
		return dstPort;
	}

	public void setDstPort(Long dstPort)
	{
		this.dstPort = dstPort;
	}

	public String getEncoding()
	{
		return encoding;
	}

	public void setEncoding(String encoding)
	{
		this.encoding = encoding;
	}

	public Long getErrors()
	{
		return errors;
	}

	public void setErrors(Long errors)
	{
		this.errors = errors;
	}

	public Long getExpressLevel()
	{
		return expressLevel;
	}

	public void setExpressLevel(Long expressLevel)
	{
		this.expressLevel = expressLevel;
	}

	public Long getFlashSms()
	{
		return flashSms;
	}

	public void setFlashSms(Long flashSms)
	{
		this.flashSms = flashSms;
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

	public String getIsChinese()
	{
		return isChinese;
	}

	public void setIsChinese(String isChinese)
	{
		this.isChinese = isChinese;
	}

	public String getMsg()
	{
		return msg;
	}

	public void setMsg(String msg)
	{
		this.msg = msg;
	}

	public Long getNeedReport()
	{
		return needReport;
	}

	public void setNeedReport(Long needReport)
	{
		this.needReport = needReport;
	}

	public String getPriority()
	{
		return priority;
	}

	public void setPriority(String priority)
	{
		this.priority = priority;
	}

	public String getReceiverMobileNo()
	{
		return receiverMobileNo;
	}

	public void setReceiverMobileNo(String receiverMobileNo)
	{
		this.receiverMobileNo = receiverMobileNo;
	}

	public Long getRefNo()
	{
		return refNo;
	}

	public void setRefNo(Long refNo)
	{
		this.refNo = refNo;
	}

	public String getSender()
	{
		return sender;
	}

	public void setSender(String sender)
	{
		this.sender = sender;
	}

	public Date getSendTime()
	{
		return sendTime;
	}

	public void setSendTime(Date sendTime)
	{
		this.sendTime = sendTime;
	}

	public Date getSentDate()
	{
		return sentDate;
	}

	public void setSentDate(Date sentDate)
	{
		this.sentDate = sentDate;
	}

	public Long getSrcPort()
	{
		return srcPort;
	}

	public void setSrcPort(Long srcPort)
	{
		this.srcPort = srcPort;
	}

	public String getStatus()
	{
		return status;
	}

	public void setStatus(String status)
	{
		this.status = status;
	}
}
