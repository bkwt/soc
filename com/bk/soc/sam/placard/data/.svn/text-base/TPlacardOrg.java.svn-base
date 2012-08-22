package com.bk.soc.sam.placard.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_PlacardOrg") 
public class TPlacardOrg
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private Integer number;

	private String orgzCode;

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

	public String getOrgzCode()
	{
		return orgzCode;
	}

	public void setOrgzCode(String orgzCode)
	{
		this.orgzCode = orgzCode;
	}
}
