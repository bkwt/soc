package com.bk.soc.sam.system;

import java.util.List;

import javax.annotation.Resource;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.container.ComponentManager;
import org.fdm.core.base.BaseBO;
import org.fdm.core.service.UserJobService;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sam.system.data.TSystem;
@Controller
@RemoteProxy(name="SAM_SystemDefineService")
public class SystemDefineBO extends BaseBO implements ISystemDefineService
{
	@Resource
	private UserJobService userJobService;
	
	public void setUserJobService(UserJobService userJobService)
	{
		this.userJobService = userJobService;
	}
	
	public ViewData opDeleteSystems(List<TSystem> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TSystem bill = (TSystem) list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	public ViewData opAddNewSystem(TSystem bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opModifySystems(List<TSystem> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TSystem bill = (TSystem) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}
	
	public ViewData querySystems(AreaInfo areaInfo)
	{
		String hql = "from TSystem _t1";
		return this.getBaseDAO().findView(areaInfo,hql);
		
	}
	
	public ViewData querySystem(String code)
	{
		String hql = "from TSystem _t1 where _t1.code = '" + code + "'";
		return this.getBaseDAO().findView(hql);
		
	}
	
	public List getSystems()
	{
		return this.getBaseDAO().find("select new list(code,name) from TSystem");
	}

	@RequestMapping("/aa") 
	public List test() { 
		System.out.println("aaaaaaaaaaaaaaaaaaa");
		 return this.getBaseDAO().find("select new list(code,name) from TSystem");  
	   }  
	  
	
	public ViewData opTest()
	{
		WebContext ctx = WebContextFactory.get(); 
		ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(ctx.getServletContext());
		DriverManagerDataSource dataSource = (DriverManagerDataSource) ac.getBean("dataSource");
		dataSource.setUrl("jdbc:jtds:sqlserver://172.16.44.240:1443/SOC");
		dataSource.setUsername("sam_user");
		dataSource.setPassword("huitonsampass");
		return new ViewData();
	}

	
	
	
}
