package com.bk.soc.sam.shared;

import javax.servlet.http.HttpSession;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.data.UserSession;
import org.fdm.state.SOCState;
import org.springframework.beans.BeanUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.bk.soc.sam.shared.data.TUserSession;
@Controller
@RemoteProxy(name="sysInfoService")  
public class SysInfoService implements ISysInfoService
{
	public TUserSession getCurrentUserSession() 
	{
		WebContext ctx = WebContextFactory.get(); 
		HttpSession s=ctx.getSession();
		TUserSession tuserSession = new TUserSession();
		UserSession  userSession = (UserSession)s.getAttribute("userSession");
		if(userSession == null){
			return null;
		}
		BeanUtils.copyProperties(userSession,tuserSession);
		
		return tuserSession;
		
	}
	
	public int getReportServerPort()
	{
		WebContext ctx = WebContextFactory.get(); 
		ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(ctx.getServletContext());
		SOCState state = (SOCState) ac.getBean("SOCState");
		return state.getReportServerPort();
	}
	
	public int getHistoryServerPort()
	{
		WebContext ctx = WebContextFactory.get(); 
		ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(ctx.getServletContext());
		SOCState state = (SOCState) ac.getBean("SOCState");
		return state.getHistoryServerPort();
	}
}
