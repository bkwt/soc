package com.bk.soc.sam.menu.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Menu")   
public class TMenu
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String sysCode;

	private String menuCode;

	private String menuName;

	private Integer menuIndex;

	private String menuFather;

	private String progUrl;

	private String progParam;

	private String leafFlag;

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getLeafFlag()
	{
		return leafFlag;
	}

	public void setLeafFlag(String leafFlag)
	{
		this.leafFlag = leafFlag;
	}

	public String getMenuCode()
	{
		return menuCode;
	}

	public void setMenuCode(String menuCode)
	{
		this.menuCode = menuCode;
	}

	public String getMenuFather()
	{
		return menuFather;
	}

	public void setMenuFather(String menuFather)
	{
		this.menuFather = menuFather;
	}

	public Integer getMenuIndex()
	{
		return menuIndex;
	}

	public void setMenuIndex(Integer menuIndex)
	{
		this.menuIndex = menuIndex;
	}

	public String getMenuName()
	{
		return menuName;
	}

	public void setMenuName(String menuName)
	{
		this.menuName = menuName;
	}

	public String getProgParam()
	{
		return progParam;
	}

	public void setProgParam(String progParam)
	{
		this.progParam = progParam;
	}

	public String getProgUrl()
	{
		return progUrl;
	}

	public void setProgUrl(String progUrl)
	{
		this.progUrl = progUrl;
	}

	public String getSysCode()
	{
		return sysCode;
	}

	public void setSysCode(String sysCode)
	{
		this.sysCode = sysCode;
	}

}
