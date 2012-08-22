package com.bk.soc.sam.shared.data;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
public final class TUserSession
{
	private String userID;
	
	private String userName;
	
	private String logID;
	
	private String passWord;
	
	private String orgzCode;
	
	private String orgzName;
	
	private String posCode;
	
	private String posName;
	
	private String ipAddr;
	
	public String getLogID()
	{
		return logID;
	}

	public void setLogID(String logID)
	{
		this.logID = logID;
	}

	public String getOrgzCode()
	{
		return orgzCode;
	}

	public void setOrgzCode(String orgzCode)
	{
		this.orgzCode = orgzCode;
	}

	public String getOrgzName()
	{
		return orgzName;
	}

	public void setOrgzName(String orgzName)
	{
		this.orgzName = orgzName;
	}

	public String getPosCode()
	{
		return posCode;
	}

	public void setPosCode(String posCode)
	{
		this.posCode = posCode;
	}

	public String getPosName()
	{
		return posName;
	}

	public void setPosName(String posName)
	{
		this.posName = posName;
	}

	public String getUserID()
	{
		return userID;
	}

	public void setUserID(String userID)
	{
		this.userID = userID;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public String getPassWord()
	{
		return passWord;
	}

	public void setPassWord(String passWord)
	{
		this.passWord = passWord;
	}

	public String getIpAddr()
	{
		return ipAddr;
	}

	public void setIpAddr(String ipAddr)
	{
		this.ipAddr = ipAddr;
	}

}
