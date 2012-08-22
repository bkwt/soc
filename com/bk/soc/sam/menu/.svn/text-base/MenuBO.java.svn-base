package com.bk.soc.sam.menu;

import java.util.List;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.data.DataExporter;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.menu.data.TMenu;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_MenuService")
public class MenuBO extends BaseBO //implements IMenuService,IMenuDAO
{
	@Resource
	private DataExporter dataExporter;
	
	public DataExporter getDataExporter()
	{
		return dataExporter;
	}

	public void setDataExporter(DataExporter dataExporter)
	{
		this.dataExporter = dataExporter;
	}

	public List findChildMenu(String nodeCode)
	{
		String hql = "from TMenu where menuFather = '"
				+ nodeCode + "' order by menuIndex";
		return this.getBaseDAO().find(hql);
	}

	public ViewData opAddNewMenu(TMenu menu)
	{
		String hql="select menuCode from TMenu where menuCode=?";
		List list=this.getBaseDAO().find(hql, new Object[]{menu.getMenuFather()});
		
		if(list.size()==0)
		{
			return new ViewData(false,"父菜单不存在");
		}
		
		if(menu.getMenuFather().toLowerCase().equals("root"))
		{
			hql="select menuCode from TMenu where menuCode=?";
			List list1=this.getBaseDAO().find(hql, new Object[]{menu.getSysCode()});
			if(list1.size() >0)
				return new ViewData(false,"系统菜单已存在");
			menu.setMenuCode(menu.getSysCode());
		}
		else
		{
			hql="select max(menuCode) from TMenu where menuCode like ?";
			List<String> l1=this.getBaseDAO().find(hql,new Object[]{menu.getMenuFather()+"__"});
			
			String newMenuCode=l1.get(0);
			
			if(newMenuCode==null)
			{
				newMenuCode=menu.getMenuFather()+"11";
			}
			else
			{
				newMenuCode=(menu.getSysCode()+(Integer.parseInt(newMenuCode.replace(menu.getSysCode(), ""))+1));
			}
			
			menu.setMenuCode(newMenuCode);
		}
		
		menu.setLeafFlag("N");
		return this.getBaseDAO().saveView(menu);
	}

	public ViewData opModifyMenus(List<TMenu> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TMenu bill=(TMenu) list.get(i);
			bill.setLeafFlag("N");
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	public ViewData opDeleteMenus(List<TMenu> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TMenu bill=(TMenu) list.get(i);
			
			String hql="from TRoleMenu where menuCode=?";
			
			List l1=this.getBaseDAO().find(hql,new Object[]{bill.getMenuCode()});
			for (int j = 0; j < l1.size(); j++)
			{
				this.getBaseDAO().delete(l1.get(j));
			}
			
			hql="from TRoleFunction where menuCode=?";
			List l2=this.getBaseDAO().find(hql,new Object[]{bill.getMenuCode()});
			for (int j = 0; j < l2.size(); j++)
			{
				this.getBaseDAO().delete(l2.get(j));
			}
			
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}
	
	public ViewData queryMenus(AreaInfo areaInfo)
	{
		String hql="from TMenu _t1";
		return this.getBaseDAO().findView(areaInfo,hql);
	}

	public ViewData opExportMenuData(AreaInfo areaInfo)
	{
		this.getDataExporter().exportDataToSQL("SAM.SAM_Menu", areaInfo.getQueryCondition(), "菜单数据");
		return new ViewData();
	}
}
