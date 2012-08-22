package com.bk.soc.sam.role.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Role")  
public class TRole
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String roleCode;

	private String roleName;

	private String roleNote;

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getRoleCode()
	{
		return roleCode;
	}

	public void setRoleCode(String roleCode)
	{
		this.roleCode = roleCode;
	}

	public String getRoleName()
	{
		return roleName;
	}

	public void setRoleName(String roleName)
	{
		this.roleName = roleName;
	}

	public String getRoleNote()
	{
		return roleNote;
	}

	public void setRoleNote(String roleNote)
	{
		this.roleNote = roleNote;
	}

	
}
