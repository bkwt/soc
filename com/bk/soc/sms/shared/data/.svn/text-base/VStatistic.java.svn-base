package com.bk.soc.sms.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SMS.SMS_Statistic_v")
public class VStatistic
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;
	
	private String code;

	private String name;

	private String telephone;
	
	private String sendNum;

	private String badNum;
	
	private String outNum;

	public String getBadNum()
	{
		return badNum;
	}

	public void setBadNum(String badNum)
	{
		this.badNum = badNum;
	}

	public String getCode()
	{
		return code;
	}

	public void setCode(String code)
	{
		this.code = code;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getOutNum()
	{
		return outNum;
	}

	public void setOutNum(String outNum)
	{
		this.outNum = outNum;
	}

	public String getSendNum()
	{
		return sendNum;
	}

	public void setSendNum(String sendNum)
	{
		this.sendNum = sendNum;
	}

	public String getTelephone()
	{
		return telephone;
	}

	public void setTelephone(String telephone)
	{
		this.telephone = telephone;
	}
	
}
