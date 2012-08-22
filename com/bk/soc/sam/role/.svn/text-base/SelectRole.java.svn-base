package com.bk.soc.sam.role;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_SelectRole")
public class SelectRole extends BaseBO
{
	public ViewData findRoles(AreaInfo areaInfo)
	{
		String hql = "select new map(_t1.hid as hid,_t1.roleCode as roleCode,_t1.roleName as roleName,_t1.roleNote as roleNote) from TRole _t1 ";
		return this.getBaseDAO().findView(areaInfo,hql);
	}
}
