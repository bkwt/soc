package com.bk.soc.sam.idao;

public interface ILoginDAO
{
	public String adminLog(String passWord);
	
	public boolean isAdminMode();
}
