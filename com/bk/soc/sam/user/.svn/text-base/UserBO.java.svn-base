package com.bk.soc.sam.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.container.ComponentManager;
import org.fdm.container.unit.Function;
import org.fdm.core.base.BaseBO;
import org.fdm.core.service.ImAccountService;
import org.fdm.core.tools.Base64Coder;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.idao.IUserDAO;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sam.user.data.TUser;
import com.bk.soc.sam.user.data.TUserRole;
import com.bk.soc.sam.user.data.VUser;
@Controller("SAM_UserBO")
@RemoteProxy(name="SAM_UserService")
public class UserBO extends BaseBO implements IUserService, IUserDAO
{
	@Resource
	private ComponentManager componentManager;
	//@Resource
	private ImAccountService imAccountService;
	
	public void setImAccountService(ImAccountService imAccountService)
	{
		this.imAccountService = imAccountService;
	}

	public void setComponentManager(ComponentManager componentManager)
	{
		this.componentManager = componentManager;
	}
	
	public UserBO()
	{
		super(true);
	}
	
	public ViewData opAddNewUser(VUser bill)
	{
		try {
			TUser user=new TUser();
			
			user.setLogID(bill.getLogID());
			user.setUserID(bill.getUserID());
			user.setPassWord(Base64Coder.encode(bill.getPassWord()));
			
			this.getBaseDAO().save(user);
		} catch (Exception e) {
			return new ViewData(false,"用户编码已存在");
		}
		
		ViewData viewData=new ViewData();
		
		if(this.imAccountService!=null&&!bill.getLogID().equals("admin"))
		{
			viewData.setIsSucceed(this.imAccountService.createAccount(bill));
		}
		
		return viewData;
	}

	public ViewData opDeleteUsers(List<TUser> list)
	{
		boolean success=true;
		
		for (int i = 0; i < list.size(); i++)
		{
			TUser bill = (TUser) list.get(i);
			
			String hql="from TUserRole where logID=?";
			List l1=this.getBaseDAO().find(hql,new Object[]{bill.getLogID()});
			for (int j = 0; j < l1.size(); j++)
			{
				this.getBaseDAO().delete(l1.get(j));
			}
			
			this.getBaseDAO().delete(bill);
//			if(this.imAccountService!=null)
//			{
//				success=success&this.imAccountService.deleteAccount(bill.getLogID(), Base64Coder.decode(bill.getPassWord()));
//			}
		}
		return new ViewData(success,"");
	}

	public ViewData queryUsers(AreaInfo areaInfo)
	{
		String hql = "from VUser _t1";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData queryUser(String logID)
	{
		String hql = "from VUser _t1 where _t1.logID='"
				+ logID + "'";
		return this.getBaseDAO().findView(hql);
	}

	public List findRoles(String userid)
	{
		String hql = "from TUserRole where logID = '" + userid + "'";
		return this.getBaseDAO().find(hql);
	}

	public ViewData opAddNewRoles(List<TUserRole> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TUserRole bill = (TUserRole) list.get(i);
			this.getBaseDAO().save(bill);
		}
		return new ViewData();
	}

	public ViewData opDeleteRoles(List<TUserRole> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TUserRole bill = (TUserRole) list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	public ViewData queryHasRole(AreaInfo areaInfo, String logID)
	{
		String hql = "select new map(_t1.hid as hid, _t1.logID as logID,_t1.roleCode as roleCode,_t2.roleName as roleName) from TUserRole _t1,TRole _t2 where _t1.roleCode=_t2.roleCode and _t1.logID='"
				+ logID + "'";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData queryNoHasRole(AreaInfo areaInfo, String logID)
	{
		String hql = "select new map(_t1.hid as hid,'"
				+ logID
				+ "' as logID,_t1.roleCode as roleCode,_t1.roleName as roleName) from TRole _t1 where _t1.roleCode not in (select roleCode from TUserRole where logID='"
				+ logID + "')";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData opResetPassWord(TUser bill)
	{
		bill.setPassWord(Base64Coder.encode("123456"));
		return this.getBaseDAO().updateView(bill);
	}

	public ViewData opBatchSetRole(List<TUser> list, List<String> roleCodeList)
	{
		for (int i = 0; i < list.size(); i++)
		{
			for (int j = 0; j < roleCodeList.size(); j++)
			{
				String hql = "from TUserRole where logID=? and roleCode=?";
				List l1 = this.getBaseDAO().find(hql, new Object[] {
						list.get(i).getLogID(), roleCodeList.get(j)
				});
				if (l1.size() == 0)
				{
					TUserRole tUserRole = new TUserRole();
					tUserRole.setLogID(list.get(i).getLogID());
					tUserRole.setRoleCode(roleCodeList.get(j));
					this.getBaseDAO().save(tUserRole);
				}
			}
		}
		return new ViewData();
	}

	public ViewData queryUserMenus(String logID)
	{
		String hql="select new map(_t1.menuCode as menuCode,_t1.menuName as menuName,_t1.menuFather as menuFather) from TMenu _t1 where exists (select roleCode from TRoleMenu _t2 where _t2.functionCount>0 and exists(select roleCode from TUserRole _t3 where logID = ? and _t2.roleCode = _t3.roleCode ) and _t1.menuCode = _t2.menuCode) order by menuIndex";
		List<Map> l1=this.getBaseDAO().find(hql,new Object[]{logID});

		hql="select new map(_t1.functionId as menuCode,_t1.menuCode as menuFather) from TRoleFunction _t1 where exists (select roleCode from TUserRole _t2 where logID = ? and _t1.roleCode = _t2.roleCode )";
		List<Map> l2=this.getBaseDAO().find(hql,new Object[]{logID});
		
		List<Map> l3=new ArrayList<Map>();
		
		for (int i = 0; i < l2.size(); i++)
		{
			Map m=l2.get(i);
			Function function=componentManager.getFunction((String) m.get("menuCode"));
			if(function!=null)
			{
				m.put("menuName", function.getName());
				l3.add(m);
			}
		}
		
		l1.addAll(l3);
		
		return this.getBaseDAO().castToViewData(l1);
	}

	public ViewData getUsersByAreaInfo(AreaInfo areaInfo)
	{
		String hql="from VUser _t1";
		return this.getBaseDAO().findView(areaInfo, hql);
	}
	
	public ViewData getUsersByRole(String roleCole){
		String hql="select new map(_t0.hid as hid,_t0.logID as logID,_t0.userID as userID,_t0.userName as userName,_t0.orgzName as orgzName,_t0.posName as posName) from VUser _t0,TUserRole _t1 where _t0.logID = _t1.logID and _t1.roleCode = '"+ roleCole +"'";
		return this.getBaseDAO().findView(hql);
	}
}
