package com.bk.soc.sam.role;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.data.DataExporter;
import org.fdm.container.ComponentManager;
import org.fdm.container.unit.Function;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.idao.IUserDAO;
import com.bk.soc.sam.role.data.TRole;
import com.bk.soc.sam.role.data.TRoleFunction;
import com.bk.soc.sam.role.data.TRoleMenu;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

@Controller
@RemoteProxy(name="SAM_RoleService")
public class RoleBO extends BaseBO implements IRoleService
{
	@Resource
	private ComponentManager componentManager;
	
	public ComponentManager getComponentManager()
	{
		return componentManager;
	}

	public void setComponentManager(ComponentManager componentManager)
	{
		this.componentManager = componentManager;
	}

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
	@Resource
	private IUserDAO userDAO;
	
	public IUserDAO getUserDAO()
	{
		return userDAO;
	}

	public void setUserDAO(IUserDAO userDAO)
	{
		this.userDAO = userDAO;
	}
	
	public ViewData opAddNewRole(TRole bill)
	{
		try {
			this.getBaseDAO().saveView(bill);
		} catch (Exception e) {
			return new ViewData(false,"角色编码已存在");
		}
		return new ViewData();
	}

	public ViewData opDeleteRoles(List<TRole> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TRole bill=(TRole) list.get(i);
			
			String hql="from TUserRole where roleCode=?";
			List l1=this.getBaseDAO().find(hql,new Object[]{bill.getRoleCode()});
			for (int j = 0; j < l1.size(); j++)
			{
				this.getBaseDAO().delete(l1.get(j));
			}
			
			hql="from TRoleMenu where roleCode=?";
			List l2=this.getBaseDAO().find(hql,new Object[]{bill.getRoleCode()});
			for (int j = 0; j < l2.size(); j++)
			{
				this.getBaseDAO().delete(l2.get(j));
			}
			
			hql="from TRoleFunction where roleCode=?";
			List l3=this.getBaseDAO().find(hql,new Object[]{bill.getRoleCode()});
			for (int j = 0; j < l3.size(); j++)
			{
				this.getBaseDAO().delete(l3.get(j));
			}
			
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	public ViewData opModifyRole(TRole bill)
	{
		return this.getBaseDAO().updateView(bill);
	}

	public ViewData queryRoles(AreaInfo areaInfo)
	{
		String hql="from TRole _t1";
		return this.getBaseDAO().findView(areaInfo,hql);
	}

	public ViewData queryRole(String roleCode)
	{
		String hql="from TRole _t0 where _t0.roleCode='"+roleCode+"'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryAllUser(String roleCode)
	{
		return userDAO.getUsersByRole(roleCode);
	}
	
	public ViewData opExportMenuData(AreaInfo areaInfo)
	{
		String sqlConditions = areaInfo.getQueryCondition().replace("TUserRole", "SAM.SAM_UserRole");
		sqlConditions = sqlConditions.replace("VUser", "SAM.SAM_User_v");
		this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_Role","SAM.SAM_RoleFunction","SAM.SAM_RoleMenu"}, sqlConditions, "��ɫ���");
		
		return new ViewData();
	}
	
	public ViewData opDeleteUseless(String roleCode)
	{
		String hql="from TRoleFunction where roleCode=?";
			List<TRoleFunction> l1=this.getBaseDAO().find(hql,new Object[]{roleCode});
			
			for (int i = 0; i < l1.size(); i++)
			{
				TRoleFunction t=l1.get(i);
				Function function=this.getComponentManager().getFunction(t.getFunctionId());
				if(function==null)
				{
					this.getBaseDAO().delete(t);
				}
			}
			
			hql="from TRoleMenu where roleCode=?";
			List<TRoleMenu> l2=this.getBaseDAO().find(hql,new Object[]{roleCode});
			
			for (int i = 0; i < l2.size(); i++)
			{
				TRoleMenu t=l2.get(i);
				
				hql="select count(functionId) from TRoleFunction where roleCode=? and menuCode like ?";
				List<Long> l3=this.getBaseDAO().find(hql,new Object[]{roleCode,t.getMenuCode()+"%"});
				
				t.setFunctionCount(l3.get(0).intValue());
				this.getBaseDAO().update(t);
			}
		return new ViewData();
	}
	
	public ViewData queryMenuAndFunctions(String roleCode,String menuCode)
	{
		
		
		
		
		String hql="select new map(_t2.menuCode as id,_t2.menuName as text,'false' as leaf) from TMenu _t2 where _t2.leafFlag='N' and _t2.menuFather=? order by _t2.menuIndex";
		
		List<Map> list=this.getBaseDAO().find(hql,new Object[]{menuCode});
		
		for (int i = 0; i < list.size(); i++)
		{
			hql="select _t1.menuCode from TRoleMenu _t1 where _t1.roleCode=? and _t1.menuCode=? and _t1.functionCount>0";
			List l1=this.getBaseDAO().find(hql, new Object[]{roleCode,list.get(i).get("id")});
			
			if(l1.size()>0)
			{
				list.get(i).put("hasPower", true);
			}
			else
			{
				list.get(i).put("hasPower", false);
			}
		}
		
		hql="select _t1.functionId from TRoleFunction _t1 where _t1.menuCode=? and _t1.roleCode=? order by _t1.functionIndex";
		List<String> list1=this.getBaseDAO().find(hql,new Object[]{menuCode,roleCode});
		
		for (int i = 0; i < list1.size(); i++)
		{
			String functionId=list1.get(i);
			Function function=this.getComponentManager().getFunction(functionId);
			if(function!=null)
			{
				Map m=new HashMap();
				m.put("id", functionId);
				m.put("text", function.getName());
				m.put("leaf",true);
				list.add(m);
			}
		}
		
		return this.getBaseDAO().castToViewData(list);
	}

	public ViewData queryComponents()
	{
		String hql="select new map(code as id ,name as text,'root' as pid) from TSystem";
		
		List list=this.getBaseDAO().find(hql);
		list.addAll(this.getComponentManager().getAllComponents());
		
		return this.getBaseDAO().castToViewData(list);
	}

	public ViewData queryFunctions(String componentId)
	{
		List<Map> list;
		try {
			list = this.getComponentManager().getFunctions(componentId);
			return this.getBaseDAO().castToViewData(list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return new ViewData();
		}
	}

	public ViewData hasFunction(String roleCode, String functionId)
	{
		List<TRoleFunction> list=this.getBaseDAO().find("from TRoleFunction where roleCode=? and functionId=?",new Object[]{roleCode,functionId});
		
		ViewData viewData=new ViewData();
		
		if(list.size()>0)
		{
			viewData.setIsSucceed(true);
			
			List<String> l1=this.getBaseDAO().find("select menuName from TMenu where menuCode=?",new Object[]{list.get(0).getMenuCode()});
			
			assert l1.size()>0:"�˵�������???!!!"+list.get(0).getMenuCode();
			
			viewData.setMessage(l1.get(0));
		}
		else
		{
			viewData.setIsSucceed(false);
		}
		
		return viewData;
	}

	public ViewData opSaveRoleConfig(List<TRoleFunction> list)
	{
		String roleCode=null;
		
		if(list.size()>0)
		{
			roleCode=list.get(0).getRoleCode();
			
			String hql="select menuCode from TMenu where menuCode not in (select menuCode from TRoleMenu where roleCode=?) and leafFlag='N'";
			List<String> menuCodeList=this.getBaseDAO().find(hql,new Object[]{roleCode});
			
			for (int i = 0; i < menuCodeList.size(); i++)
			{
				TRoleMenu tRoleMenu=new TRoleMenu();
				tRoleMenu.setRoleCode(roleCode);
				tRoleMenu.setMenuCode(menuCodeList.get(i));
				this.getBaseDAO().save(tRoleMenu);
			}
		}
		
		
		for (int i = 0; i < list.size(); i++)
		{
			TRoleFunction viewTObject=list.get(i);
			
			String hql="from TRoleFunction where roleCode=? and functionId=?";
			List<TRoleFunction> l1=this.getBaseDAO().find(hql,new Object[]{viewTObject.getRoleCode(),viewTObject.getFunctionId()});
			
			TRoleFunction tRoleFunction=null;
			if(l1.size()>0)//�ڵ��ƶ��˻�ɾ����
			{
				//���²˵�Ȩ��
				tRoleFunction=l1.get(0);
				
				if(viewTObject.getMenuCode()==null)//ɾ����
				{
					//updateRoleMenuFunctionCount(tRoleFunction.getRoleCode(),tRoleFunction.getMenuCode(),-1);
					this.getBaseDAO().delete(tRoleFunction);
				}
				else//�ƶ���
				{
					if(!tRoleFunction.getMenuCode().equals(viewTObject.getMenuCode()))//�����ƶ���ȥ���ƶ�����
					{
						//updateRoleMenuFunctionCount(tRoleFunction.getRoleCode(),tRoleFunction.getMenuCode(),-1);
						//updateRoleMenuFunctionCount(viewTObject.getRoleCode(),viewTObject.getMenuCode(),1);
						tRoleFunction.setMenuCode(viewTObject.getMenuCode());
						this.getBaseDAO().update(tRoleFunction);
					}
				}
			}
			else
			{
				if(viewTObject.getMenuCode()!=null)
				{
					tRoleFunction=viewTObject;
					//updateRoleMenuFunctionCount(tRoleFunction.getRoleCode(),tRoleFunction.getMenuCode(),1);
					this.getBaseDAO().save(tRoleFunction);
				}
			}
		}
		
		if(roleCode!=null)
		{
			String hql="from TRoleMenu where roleCode=?";
			List<TRoleMenu> l2=this.getBaseDAO().find(hql,new Object[]{roleCode});
			
			for (int i = 0; i < l2.size(); i++)
			{
				TRoleMenu t=l2.get(i);
				
				hql="select count(functionId) from TRoleFunction where roleCode=? and menuCode like ?";
				List<Long> l3=this.getBaseDAO().find(hql,new Object[]{roleCode,t.getMenuCode()+"%"});
				
				t.setFunctionCount(l3.get(0).intValue());
				this.getBaseDAO().update(t);
			}
		}
		return new ViewData();
	}
	
	//private Pattern p = Pattern.compile("[a-zA-Z]+");
	
//	private void updateRoleMenuFunctionCount(String roleCode,String menuCode,int step)
//	{
//		String sysCode=new String(menuCode);
//		
//		while(true)
//		{
//			Matcher m = p.matcher(sysCode);
//			if(m.matches())
//			{
//				break;
//			}
//			else
//			{
//				sysCode=sysCode.substring(0,sysCode.length()-2);
//			}
//		}
//
//		String _menuCode=new String(menuCode);
//		
//		while(true)
//		{
//			Matcher m = p.matcher(_menuCode);
//			
//			if(m.matches()&&!_menuCode.equals(sysCode))
//			{
//				break;
//			}
//
//			String hql="from TRoleMenu where roleCode=? and menuCode=?";
//			TRoleMenu roleMenu=(TRoleMenu) this.getBaseDAO().find(hql,new Object[]{roleCode,_menuCode}).get(0);
//			
//			roleMenu.setFunctionCount(roleMenu.getFunctionCount()+step);
//			
//			this.getBaseDAO().update(roleMenu);
//			
//			_menuCode=_menuCode.substring(0,_menuCode.length()-2);
//		}
//	}

	public ViewData findFunctions(AreaInfo areaInfo)
	{
		String hql="select new map(_t1.hid as hid,_t1.functionId as functionId,_t1.functionName as functionName,_t2.componentName as componentName) from TFunction _t1,TComponent _t2 where _t1.componentId=_t2.componentId and _t1.isSelectPage='false'";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData opCopyFromAdmin(String menuCode,String roleCode)
	{
		String hql="select menuCode from TMenu where menuCode not in (select menuCode from TRoleMenu where roleCode=?) and leafFlag='N'";
		List<String> menuCodeList=this.getBaseDAO().find(hql,new Object[]{roleCode});
		
		for (int i = 0; i < menuCodeList.size(); i++)
		{
			TRoleMenu tRoleMenu=new TRoleMenu();
			tRoleMenu.setRoleCode(roleCode);
			tRoleMenu.setMenuCode(menuCodeList.get(i));
			this.getBaseDAO().save(tRoleMenu);
		}
		
		if(roleCode.equals("admin"))
		{
			return new ViewData(false,"����ɫ����admin,��ֻ��ͨ��ѡ�ķ�ʽ��admin��Ȩ.");
		}
		else if(menuCode.equals("root"))
		{
			this.getBaseDAO().execute("delete from TRoleFunction where roleCode='"+roleCode+"'");
			
			hql="from TRoleFunction where roleCode='admin'";
			
			List<TRoleFunction> l1=this.getBaseDAO().find(hql);
			
			for (int i = 0; i < l1.size(); i++)
			{
				TRoleFunction t=new TRoleFunction();
				t.setRoleCode(roleCode);
				t.setMenuCode(l1.get(i).getMenuCode());
				t.setFunctionId(l1.get(i).getFunctionId());
				
				this.getBaseDAO().save(t);
			}
			//----------------------
			hql="from TRoleMenu where roleCode=?";
			List<TRoleMenu> l2=this.getBaseDAO().find(hql,new Object[]{roleCode});
			
			for (int i = 0; i < l2.size(); i++)
			{
				TRoleMenu t=l2.get(i);
				
				hql="select count(functionId) from TRoleFunction where roleCode=? and menuCode like ?";
				List<Long> l3=this.getBaseDAO().find(hql,new Object[]{roleCode,t.getMenuCode()+"%"});
				
				t.setFunctionCount(l3.get(0).intValue());
				this.getBaseDAO().update(t);
			}
			
			return new ViewData();
		}
		else
		{
			this.getBaseDAO().execute("delete from TRoleFunction where roleCode='"+roleCode+"' and menuCode like '"+menuCode+"%'");
			
			hql="from TRoleFunction where roleCode='admin' and menuCode like ?";
			
			List<TRoleFunction> l1=this.getBaseDAO().find(hql, new Object[]{menuCode+"%"});
			
			for (int i = 0; i < l1.size(); i++)
			{
				TRoleFunction t=new TRoleFunction();
				t.setRoleCode(roleCode);
				t.setMenuCode(l1.get(i).getMenuCode());
				t.setFunctionId(l1.get(i).getFunctionId());
				
				this.getBaseDAO().save(t);
			}
			//----------------------
			hql="from TRoleMenu where roleCode=?";
			List<TRoleMenu> l2=this.getBaseDAO().find(hql,new Object[]{roleCode});
			
			for (int i = 0; i < l2.size(); i++)
			{
				TRoleMenu t=l2.get(i);
				
				hql="select count(functionId) from TRoleFunction where roleCode=? and menuCode like ?";
				List<Long> l3=this.getBaseDAO().find(hql,new Object[]{roleCode,t.getMenuCode()+"%"});
				
				t.setFunctionCount(l3.get(0).intValue());
				this.getBaseDAO().update(t);
			}
			
			return new ViewData();
		}
	}

	public ViewData opRemoveFunctions(String menuCode,String roleCode)
	{
		if(menuCode.equals("root"))
			menuCode="";
		
		int count = this.getBaseDAO().execute("delete from TRoleFunction where roleCode='"+roleCode+"' and menuCode like '"+menuCode+"%'");
		if(count==0) this.getBaseDAO().execute("delete from TRoleFunction where roleCode='"+roleCode+"' and functionId like '"+menuCode+"%'");
		String hql="from TRoleMenu where roleCode=?";
		List<TRoleMenu> l2=this.getBaseDAO().find(hql,new Object[]{roleCode});
		
		for (int i = 0; i < l2.size(); i++)
		{
			TRoleMenu t=l2.get(i);
			
			hql="select count(functionId) from TRoleFunction where roleCode=? and menuCode like ?";
			List<Long> l3=this.getBaseDAO().find(hql,new Object[]{roleCode,t.getMenuCode()+"%"});
			
			t.setFunctionCount(l3.get(0).intValue());
			this.getBaseDAO().update(t);
		}
		
		return new ViewData();
	}

	public ViewData opRemoveSelectedFunctions(List list,String roleCode)
	{
		for(int i = 0;i < list.size();i++){
			String functionId = list.get(i).toString();
			this.getBaseDAO().execute("delete from TRoleFunction where roleCode='"+roleCode+"' and functionId like '"+functionId+"%'");
		}
		
		String hql="from TRoleMenu where roleCode=?";
		List<TRoleMenu> l2=this.getBaseDAO().find(hql,new Object[]{roleCode});
		
		for (int i = 0; i < l2.size(); i++)
		{
			TRoleMenu t=l2.get(i);
			
			hql="select count(functionId) from TRoleFunction where roleCode=? and menuCode like ?";
			List<Long> l3=this.getBaseDAO().find(hql,new Object[]{roleCode,t.getMenuCode()+"%"});
			
			t.setFunctionCount(l3.get(0).intValue());
			this.getBaseDAO().update(t);
		}
		return new ViewData();
	}
	public ViewData opUpdateMenuIndex(List<TRoleFunction> list)
	{
		for(int i = 0;i < list.size();i++){
			TRoleFunction t = list.get(i);
			String hql="from TRoleFunction where roleCode=? and functionId=?";
			List<TRoleFunction> l1=this.getBaseDAO().find(hql,new Object[]{t.getRoleCode(),t.getFunctionId()});
			if(l1.size()>0){
				TRoleFunction t1 = l1.get(0);
				t1.setMenuCode(t.getMenuCode());
				t1.setFunctionIndex(t.getFunctionIndex());
				this.getBaseDAO().update(t1);
			}	
		}
//		if(list.size()>0){
//			TRoleFunction t = list.get(0);
//			String hql="from TRoleMenu where roleCode=?";
//			List<TRoleMenu> l2=this.getBaseDAO().find(hql,new Object[]{t.getRoleCode()});
//			for (int j = 0; j < l2.size(); j++)
//			{
//				TRoleMenu t2=l2.get(j);
//				hql="select count(functionId) from TRoleFunction where roleCode=? and menuCode like ?";
//				List<Long> l3=this.getBaseDAO().find(hql,new Object[]{t.getRoleCode(),t2.getMenuCode()+"%"});
//				t2.setFunctionCount(l3.get(0).intValue());
//				this.getBaseDAO().update(t2);
//			}
//		}
		return new ViewData();
	}
}
