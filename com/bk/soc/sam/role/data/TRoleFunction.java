package com.bk.soc.sam.role.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_RoleFunction")  
public class TRoleFunction
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String roleCode;

	private String functionId;
	
	private String menuCode;

	private Integer functionIndex;
	
	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getFunctionId()
	{
		return functionId;
	}

	public void setFunctionId(String functionId)
	{
		this.functionId = functionId;
	}

	public String getRoleCode()
	{
		return roleCode;
	}

	public void setRoleCode(String roleCode)
	{
		this.roleCode = roleCode;
	}

	public String getMenuCode()
	{
		return menuCode;
	}

	public void setMenuCode(String menuCode)
	{
		this.menuCode = menuCode;
	}

	public Integer getFunctionIndex()
	{
		return functionIndex;
	}

	public void setFunctionIndex(Integer functionIndex)
	{
		this.functionIndex = functionIndex;
	}

	
}
