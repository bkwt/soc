package com.bk.soc.sam.power;

import java.io.File;
import java.io.FileFilter;
import java.lang.reflect.Method;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.data.DataExporter;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.power.data.TMethod;
import com.bk.soc.sam.power.data.TQueryPower;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_SelectPageFilterService")
public class SelectPageFilterBO extends BaseBO implements
		SelectPageFilterService
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

	public ViewData opAddNewMethod(TMethod bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opDeleteMethods(List<TMethod> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			String hql = "from TQueryPower where componentId=? and methodName=?";
			List<TQueryPower> l1 = this.getBaseDAO().find(hql, new Object[] {
					list.get(i).getComponentId(), list.get(i).getMethodName()
			});
			for (int j = 0; j < l1.size(); j++)
			{
				this.getBaseDAO().delete(l1.get(j));
			}
			this.getBaseDAO().delete(list.get(i));
		}
		return new ViewData();
	}

	public ViewData opSaveQueryPowers(TMethod bill, List<TQueryPower> list)
	{
		this.getBaseDAO().saveOrUpdateView(bill);

		this.saveBillDetail(list, TQueryPower.class, new String[] {
				"componentId", "methodName"
		}, new Object[] {
				bill.getComponentId(), bill.getMethodName()
		});

		return new ViewData();
	}

	public ViewData queryBean(String componentId)
	{
		String hql = "from TComponent _t1 where _t1.componentId=?";
		return this.getBaseDAO().findView(hql, new Object[] {
			componentId
		});
	}

	public ViewData queryBeans(AreaInfo areaInfo)
	{
		String hql = "from TComponent _t1 where _t1.valid='Y'";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData queryMethod(String componentId, String methodName)
	{
		String hql = "from TMethod _t1 where _t1.componentId=? and _t1.methodName=?";
		return this.getBaseDAO().findView(hql, new Object[] {
				componentId, methodName
		});
	}

	public ViewData queryMethods(String componentId)
	{
		String hql = "from TMethod _t1 where _t1.componentId=? and methodName like 'find%s'";
		return this.getBaseDAO().findView(hql, new Object[] {
			componentId
		});
	}

	public ViewData queryQueryPowers(String componentId, String methodName)
	{
		// String hql="select new map(_t1.hid as hid,_t1.userID as
		// userID,_t2.userName as userName,_t1.powerConditions as
		// powerConditions)from TQueryPower _t1,VUser _t2 where
		// _t1.userID=_t2.userID and _t1.componentId=? and _t1.methodName=?";
		String hql = "from TQueryPower _t1 where _t1.componentId=? and _t1.methodName=?";
		return this.getBaseDAO().findView(hql, new Object[] {
				componentId, methodName
		});
	}

	public ViewData opExportSQL(String componentId)
	{
		this.getDataExporter().exportDataToSQL(new String[] {
				"SAM.SAM_Power_Method", "SAM.SAM_Power_QueryPower"
		}, "_t1.componentId='" + componentId + "'", "Ȩ������"
				+ componentId.substring(componentId.lastIndexOf(".") + 1, componentId.length())
				+ ".");
		return new ViewData();
	}

	public ViewData opAddQueryFunctionPowers(List<TQueryPower> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			this.getBaseDAO().save(list.get(i));
		}
		return new ViewData();
	}

	public ViewData opRemoveQueryPowers(List<TQueryPower> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			this.getBaseDAO().delete(list.get(i));
		}
		return new ViewData();
	}

	public ViewData opGetMethods(String componentId)
	{
		WebContext ctx = WebContextFactory.get();
		HttpSession s = ctx.getSession();
		String rootPath = s.getServletContext().getRealPath("/")
				+ "WEB-INF\\classes\\";

		String packagePath = rootPath + componentId.replaceAll("\\.", "\\\\");

		File packageDir = new File(packagePath);

		File[] bos = packageDir.listFiles(new FileFilter()
		{
			public boolean accept(File pathname)
			{
				if (pathname.getName().endsWith("class")&&pathname.getName().startsWith("Select"))
					return true;
				else
					return false;
			}
		});
		
		try
		{
			for (int i = 0; i < bos.length; i++)
			{
				String boClass = (componentId + "." + bos[i].getName().replace(packagePath, "").replace(".class", ""));
				Method[] ms=Class.forName(boClass).getDeclaredMethods();

				for (int j = 0; j < ms.length; j++)
				{
					if(ms[j].getName().startsWith("find")&&ms[j].getName().endsWith("s")&&ms[j].getParameterTypes().length>0&&ms[j].getParameterTypes()[0].isInstance(new AreaInfo()))
					//if(ms[j].getName().startsWith("find"))
					{
						String hql="select hid from TMethod where componentId=? and methodName=?";
						
						List l1=this.getBaseDAO().find(hql, new Object[]{componentId,ms[j].getName()});
						
						if(l1.size()==0)
						{
							TMethod method=new TMethod();
							method.setComponentId(componentId);
							method.setMethodName(ms[j].getName());
							this.getBaseDAO().save(method);
						}
					}
				}
			}
		}
		catch (SecurityException e)
		{
			e.printStackTrace();
			return new ViewData(false,e.getMessage());
		}
		catch (ClassNotFoundException e)
		{
			e.printStackTrace();
			return new ViewData(false,e.getMessage());
		}

		return new ViewData();
	}

}
