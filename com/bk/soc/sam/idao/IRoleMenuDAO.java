package com.bk.soc.sam.idao;

import java.util.List;

public interface IRoleMenuDAO
{
	public List findRoles(String nodeCode);

	public List findMenus(String roleCode);
}
