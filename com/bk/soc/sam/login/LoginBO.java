package com.bk.soc.sam.login;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.fdm.core.data.UserSession;
import org.fdm.core.tools.Base64Coder;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.idao.ILoginDAO;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sam.user.data.TUser;
import com.bk.soc.sam.user.data.VUser;
@Controller
@RemoteProxy(name="SAM_LoginService")
public class LoginBO extends BaseBO implements ILoginService, ILoginDAO
{
	private boolean adminMode=false;
	
	public boolean isAdminMode()
	{
		return adminMode;
	}
	
	 public ViewData login(String logID, String passWord)
	{
		WebContext ctx = WebContextFactory.get();
		HttpSession s = ctx.getSession();
		ViewData viewData = new ViewData();
		
		Long count;
		List<Long> l = this.getBaseDAO().find("select count(hid) from VUser");
		if(l==null)
			return new ViewData(false,"软件授权无效，请联系软件提供商。");
		else
			count=(Long)l.get(0);
		if(count==0&&logID.equals("admin"))
		{
			UserSession userSession = new UserSession();
			userSession.setLogID(logID);
			userSession.setUserID("admin");
			userSession.setUserName("admin");
			userSession.setOrgzCode("01");
			userSession.setOrgzName("信息中心");
			userSession.setPosCode("01001");
			userSession.setPosName("信息系统管理员");
			userSession.setPassWord(passWord);
			userSession.setIpAddr(ctx.getHttpServletRequest().getRemoteAddr());

			s.setAttribute("userSession", userSession);
			
			this.adminMode=true;
			
			return viewData;
		}
		else
		{
			this.adminMode=false;
		}
		
		List<?> list = this.getBaseDAO().find("from VUser where logID=? and passWord=?",new Object[]{logID,Base64Coder.encode(passWord)});

		if (list.size() > 0)
		{
			VUser user = (VUser) list.get(0);
			// -------------加入session-------------
			UserSession userSession = new UserSession();
			userSession.setLogID(logID);
			userSession.setUserID(user.getUserID());
			userSession.setUserName(user.getUserName());
			userSession.setOrgzCode(user.getOrgz());
			userSession.setOrgzName(user.getOrgzName());
			userSession.setPosCode(user.getPos());
			userSession.setPosName(user.getPosName());
			userSession.setPassWord(passWord);
			userSession.setIpAddr(ctx.getHttpServletRequest().getRemoteAddr());
			
			s.setAttribute("userSession", userSession);

			viewData.setIsSucceed(true);
		}
		else
		{
			viewData.setIsSucceed(false);
			viewData.setMessage("用户名或密码错误");
		}

		return viewData;
	}

	public ViewData opModifyPassWord(String oldPassWord, String newPassWord)
	{
		UserSession userSession = this.getUserSession();

		ViewData viewData = new ViewData();

		if (userSession == null)
		{
			viewData.setIsSucceed(false);
			viewData.setMessage("会话超时,请您重新登陆");
		}
		else
		{
			List<?> list = this.getBaseDAO().find("from TUser where logID=? and passWord=?",new Object[]{userSession.getLogID(),Base64Coder.encode(oldPassWord)});
			if (list.size() == 0)
			{
				viewData.setIsSucceed(false);
				viewData.setMessage("密码错误");
			}
			else
			{
				TUser t = (TUser) list.get(0);
				t.setPassWord(Base64Coder.encode(newPassWord));
				this.getBaseDAO().update(t);
			}
		}

		return viewData;
	}
	public ViewData getCompanyName()
	{
		String hql = "select companyName from TCompany where companyCode='11'";
		return this.getBaseDAO().findView(hql);
	}

	public String adminLog(String passWord)
	{
		List<?> list = this.getBaseDAO().find("from TUser where logID=? and passWord=?",new Object[]{"admin",Base64Coder.encode(passWord)});
		if (list.size() > 0)
		{
			return "OK";
		}
		else
		{
			return "密码不正确";
		}
	}

	public ViewData logout(String logID)
	{
		WebContext ctx = WebContextFactory.get();
		HttpSession s=ctx.getSession();
		s.invalidate();
		return new ViewData();
	}

	public ViewData historyLogin(String logID, String passWord, String year)
	{
		WebContext ctx = WebContextFactory.get();
		HttpSession s = ctx.getSession();
		s.setAttribute("HISTORY_YEAR", year);
		
		ViewData viewData = new ViewData();

		Long count = (Long) this.getBaseDAO().find("select count(hid) from VUser").get(0);
		
		if(count==0&&logID.equals("admin"))
		{
			UserSession userSession = new UserSession();
			userSession.setLogID(logID);
			userSession.setUserID("admin");
			userSession.setUserName("admin");
			userSession.setOrgzCode("01");
			userSession.setOrgzName("信息中心");
			userSession.setPosCode("01001");
			userSession.setPosName("信息系统管理员");
			userSession.setPassWord(passWord);
			userSession.setIpAddr(ctx.getHttpServletRequest().getRemoteAddr());

			s.setAttribute("userSession", userSession);
			
			this.adminMode=true;
			
			return viewData;
		}
		else
		{
			this.adminMode=false;
		}
		
		List<?> list = this.getBaseDAO().find("from VUser where logID=? and passWord=?",new Object[]{logID,Base64Coder.encode(passWord)});

		if (list.size() > 0)
		{
			VUser user = (VUser) list.get(0);
			// -------------加入session-------------
			UserSession userSession = new UserSession();
			userSession.setLogID(logID);
			userSession.setUserID(user.getUserID());
			userSession.setUserName(user.getUserName());
			userSession.setOrgzCode(user.getOrgz());
			userSession.setOrgzName(user.getOrgzName());
			userSession.setPosCode(user.getPos());
			userSession.setPosName(user.getPosName());
			userSession.setPassWord(passWord);
			userSession.setIpAddr(ctx.getHttpServletRequest().getRemoteAddr());

			s.setAttribute("userSession", userSession);

			viewData.setIsSucceed(true);
		}
		else
		{
			viewData.setIsSucceed(false);
			viewData.setMessage("用户名或密码错误");
		}

		return viewData;
	}
}
