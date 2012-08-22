package com.bk.soc.sam.calendar.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_UserCalendar") 
public class TUserCalendar
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	
	private String userID;
	
	private Date signDate;
	
	private String note;

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getNote()
	{
		return note;
	}

	public void setNote(String note)
	{
		this.note = note;
	}

	public Date getSignDate()
	{
		return signDate;
	}

	public void setSignDate(Date signDate)
	{
		this.signDate = signDate;
	}

	public String getUserID()
	{
		return userID;
	}

	public void setUserID(String userID)
	{
		this.userID = userID;
	}
}
