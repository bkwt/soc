package com.bk.soc.sam.placard.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Placard") 
public class TPlacard
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private Integer number;

	private String title;

	private String text;

	private Date publishDate;

	private String publishPersonCode;

	private String publishPersonName;
	
	private String state;
	
	public String getState()
	{
		return state;
	}

	public void setState(String state)
	{
		this.state = state;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public Integer getNumber()
	{
		return number;
	}

	public void setNumber(Integer number)
	{
		this.number = number;
	}

	public Date getPublishDate()
	{
		return publishDate;
	}

	public void setPublishDate(Date publishDate)
	{
		this.publishDate = publishDate;
	}

	public String getPublishPersonCode()
	{
		return publishPersonCode;
	}

	public void setPublishPersonCode(String publishPersonCode)
	{
		this.publishPersonCode = publishPersonCode;
	}

	public String getPublishPersonName()
	{
		return publishPersonName;
	}

	public void setPublishPersonName(String publishPersonName)
	{
		this.publishPersonName = publishPersonName;
	}

	public String getText()
	{
		return text;
	}

	public void setText(String text)
	{
		this.text = text;
	}

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	
}
