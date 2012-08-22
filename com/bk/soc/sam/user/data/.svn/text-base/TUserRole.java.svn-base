package com.bk.soc.sam.user.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_UserRole")  
public class TUserRole
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;

	private String logID;

	private String roleCode;

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

	public String getRoleCode()
	{
		return roleCode;
	}

	public void setRoleCode(String roleCode)
	{
		this.roleCode = roleCode;
	}


}
