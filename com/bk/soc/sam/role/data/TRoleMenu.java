package com.bk.soc.sam.role.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_RoleMenu")  
public class TRoleMenu
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String roleCode;

	private String menuCode;
	
	private Integer functionCount=0;

	public Integer getFunctionCount()
	{
		return functionCount;
	}

	public void setFunctionCount(Integer functionCount)
	{
		this.functionCount = functionCount;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getMenuCode()
	{
		return menuCode;
	}

	public void setMenuCode(String menuCode)
	{
		this.menuCode = menuCode;
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
