package com.bk.soc.sam.fileresource.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_System")   
public class TFileResource
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String fileName;

	private byte[] fileContext;
	
	private String sign;

	private Integer userCount;

	public byte[] getFileContext()
	{
		return fileContext;
	}

	public void setFileContext(byte[] fileContext)
	{
		this.fileContext = fileContext;
	}

	public String getFileName()
	{
		return fileName;
	}

	public void setFileName(String fileName)
	{
		this.fileName = fileName;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getSign()
	{
		return sign;
	}

	public void setSign(String sign)
	{
		this.sign = sign;
	}

	public Integer getUserCount()
	{
		return userCount;
	}

	public void setUserCount(Integer userCount)
	{
		this.userCount = userCount;
	}
}