package com.bk.soc.sam.serverstate;

import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.fdm.state.SOCState;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_ServerStateService")
public class ServerStateBO extends BaseBO implements IServerStateService
{
	public ViewData queryOnlineUsers()
	{
		List<Map> l1=SOCState.getOnlineUsers();
		
		for (int i = 0; i < l1.size(); i++)
		{
			Map m=l1.get(i);
			m.put("hid", i+1);
			String logID=m.get("logID").toString();
			String hql="select distinct new map(_t1.userName as userName,_t3.roleName as roleName) from VUser _t1,TUserRole _t2,TRole _t3 where _t1.logID=_t2.logID and _t2.roleCode=_t3.roleCode and _t1.logID=?";
			List<Map> l2=this.getBaseDAO().find(hql, new Object[]{logID});
			
			for (int j = 0; j < l2.size(); j++)
			{
				if(j==0)
				{
					m.put("userName", l2.get(j).get("userName"));
					m.put("roles", l2.get(j).get("roleName"));
				}
				else
				{
					m.put("roles", m.get("roles").toString()+","+l2.get(j).get("roleName"));
				}
			}
		}
	
		return this.getBaseDAO().castToViewData(l1);
	}
}
