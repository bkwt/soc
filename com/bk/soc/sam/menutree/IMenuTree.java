package com.bk.soc.sam.menutree;

import java.util.List;

public interface IMenuTree
{
	public List findChildren(String logID,String pid);
	
	public List findChildrens(String logID);
}
