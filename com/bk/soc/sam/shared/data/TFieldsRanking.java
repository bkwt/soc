package com.bk.soc.sam.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_AreaConfig_FieldsRanking")   
public class TFieldsRanking
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String pageURL;

	private String areaID;

	private String progParams;

	private String logID;

	private String ranking;

	public String getAreaID()
	{
		return areaID;
	}

	public void setAreaID(String areaID)
	{
		this.areaID = areaID;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getLogID()
	{
		return logID;
	}

	public void setLogID(String logID)
	{
		this.logID = logID;
	}

	public String getPageURL()
	{
		return pageURL;
	}

	public void setPageURL(String pageURL)
	{
		this.pageURL = pageURL;
	}

	public String getProgParams()
	{
		return progParams;
	}

	public void setProgParams(String progParams)
	{
		this.progParams = progParams;
	}

	public String getRanking()
	{
		return ranking;
	}

	public void setRanking(String ranking)
	{
		this.ranking = ranking;
	}

}
