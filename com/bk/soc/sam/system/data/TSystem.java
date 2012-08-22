package com.bk.soc.sam.system.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_System")   
public class TSystem 
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	
	private String code;

	private String name;

	private String note;
	
	
	public void setCode(String c)
	{
		this.code=c;
	}
	 public String getCode()
	{
		return this.code;
	}
	
	public void setName(String c)
	{
		this.name=c;
	}

	public String getName()
	{
		return this.name;
	}

	public void setNote(String c)
	{
		this.note=c;
	}

	public String getNote()
	{
		return this.note;
	}
	  
 
	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}
}
