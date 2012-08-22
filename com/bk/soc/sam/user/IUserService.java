package com.bk.soc.sam.user;

import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sam.user.data.TUser;
import com.bk.soc.sam.user.data.TUserRole;
import com.bk.soc.sam.user.data.VUser;

public interface IUserService
{
	public ViewData queryUsers(AreaInfo areaInfo);
	
	public ViewData opAddNewUser(VUser bill);
	
	//public ViewData opModifyUsers(List list);
	
	public ViewData opDeleteUsers(List<TUser> list);
	
	public ViewData queryUser(String code);
	
	public ViewData opAddNewRoles(List<TUserRole> list);

	public ViewData opDeleteRoles(List<TUserRole> list);
	
	public ViewData queryHasRole(AreaInfo areaInfo,String logID);
	
	public ViewData queryNoHasRole(AreaInfo areaInfo,String logID);
	
	public ViewData opResetPassWord(TUser bill);
	
	public ViewData opBatchSetRole(List<TUser> list,List<String> roleCodeList);
	
	public ViewData queryUserMenus(String logID);
}
