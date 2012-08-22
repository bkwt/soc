package com.bk.soc.sam.menutree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.container.ComponentManager;
import org.fdm.container.unit.Function;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.idao.ILoginDAO;
@Controller
@RemoteProxy(name="SAM_MenuTreeService")
public class MenuTreeBO extends BaseBO implements IMenuTree
{
	@Resource
	private ComponentManager componentManager;
	@Resource
	private ILoginDAO loginDAO;

	public void setLoginDAO(ILoginDAO loginDAO)
	{
		this.loginDAO = loginDAO;
	}

	public ComponentManager getComponentManager()
	{
		return componentManager;
	}

	public void setComponentManager(ComponentManager componentManager)
	{
		this.componentManager = componentManager;
	}

	public List findChildren(String logID, String pid)
	{
		if (loginDAO.isAdminMode())
		{
			List list=new ArrayList();
			
			if(pid.equals("root"))
			{
				Map sam=new HashMap();
				sam.put("id", "SAM");
				sam.put("text", "系统管理");
				sam.put("leaf", "false");
				list.add(sam);
			}
			else if(pid.equals("SAM"))
			{
				String [] functionIds=new String[]{"SAM0001","SAM0002","SAM0003_1","SAM0004","SAM0005","SAM0008","SAM0009","SAM0011","SAM0012","MDMB0101","MDMB0102","MDMB0201","MDMB0202","MDMB0301","MDMB0302"};
				
				for (int i = 0; i < functionIds.length; i++)
				{
					Function function = this.getComponentManager().getFunction(functionIds[i]);
					if (function != null)
					{
						Map m = new HashMap();
						m.put("id", function.getId());
						m.put("text", function.getName());
						m.put("leaf", "false");
						m.put("progUrl", function.getUrl());
						m.put("progParam", function.getProgParams());
						list.add(m);
					}
				}
			}
			return list;
		}
		else
		{

			String hql = "select new map(_t1.menuCode as id,_t1.menuName as text,'false' as leaf) from TMenu _t1 where _t1.menuFather='"
					+ pid
					+ "' and _t1.menuCode in (select DISTINCT menuCode from TRoleMenu where roleCode in (select roleCode from TUserRole where logID='"
					+ logID
					+ "') and functionCount>0) and leafFlag='N' order by _t1.menuIndex";
			List<Map> list = this.getBaseDAO().find(hql);
		
			hql = "select DISTINCT new map(functionIndex as functionIndex,functionId as functionId) from TRoleFunction _t1 where _t1.menuCode='"
					+ pid
					+ "' and _t1.roleCode in (select roleCode from TUserRole where logID='"
					+ logID + "') order by functionIndex,functionId";
			List<Map> l1 = this.getBaseDAO().find(hql);
			
			for (int i = 0; i < l1.size(); i++)
			{
				String functionId = l1.get(i).get("functionId").toString();
				Function function = this.getComponentManager().getFunction(functionId);
				if (function != null)
				{
					Map m = new HashMap();
					m.put("id", functionId);
					m.put("text", function.getName());
					m.put("leaf", "true");
					m.put("progUrl", function.getUrl());
					m.put("progParam", function.getProgParams());
					list.add(m);
				}
			}

			return list;
		}
	}

	public List findChildrens(String logID) {
		String hql = "select new map(_t1.menuCode as id,_t1.menuName as text,'false' as leaf) from TMenu _t1 where _t1.menuFather='"
				+ "root' and _t1.menuCode in (select DISTINCT menuCode from TRoleMenu where roleCode in (select roleCode from TUserRole where logID='"
				+ logID
				+ "') and functionCount>0) and leafFlag='N' order by _t1.menuIndex";
		List<Map> list = this.getBaseDAO().find(hql);
		hql = "select DISTINCT new map(functionIndex as functionIndex,functionId as functionId ,menuCode as menuCode) from TRoleFunction _t1 where "
				+" _t1.roleCode in (select roleCode from TUserRole where logID='"
				+ logID + "') order by functionIndex,functionId";
		List<Map> l1 = this.getBaseDAO().find(hql);
		for (int k = 0; k < list.size(); k++){
			List<Map> l2 = new ArrayList<Map>();
			for (int i = 0; i < l1.size(); i++)
			{
				if(list.get(k).get("id").equals(l1.get(i).get("menuCode"))){
					String functionId = l1.get(i).get("functionId").toString();
					Function function = this.getComponentManager().getFunction(functionId);
					if (function != null)
					{
						Map m = new HashMap();
						m.put("id", functionId);
						m.put("name", function.getName());
						m.put("thumb", functionId+".png");
						m.put("progUrl", function.getUrl());
						m.put("progParam", function.getProgParams());
						l2.add(m);
					}
				}
				
			}
			list.get(k).put("child", l2);
		}
		

		return list;
	}

}
