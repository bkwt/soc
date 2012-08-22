package com.bk.soc.sms.smsaudit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.idao.IComponentDAO;
import com.bk.soc.sam.idao.IUserDAO;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sam.user.data.VUser;
import com.bk.soc.sms.smsaudit.data.TSmsAuditPersonConfig;
@Controller
@RemoteProxy(name="SMS_SmsAuditPersonConfigService")
public class SmsAuditPersonConfigBO extends BaseBO implements
		ISmsAuditPersonConfigService 
{
	private IUserDAO userDAO;
	
	private IComponentDAO componentDAO;
	
	public void setComponentDAO(IComponentDAO componentDAO)
	{
		this.componentDAO = componentDAO;
	}
	public ViewData opModifySmsAuditPersonConfigP(String code,List<TSmsAuditPersonConfig>  list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TSmsAuditPersonConfig vp = list.get(i);
			vp.setCode(code);
		}
		String[] billPK = {"code"};
		Object[] billPKValues = {code};
		this.saveBillDetail(list, TSmsAuditPersonConfig.class,billPK, billPKValues);
		return new ViewData();
	}
	public ViewData opModifySmsAuditPersonConfigB(String componentId,List<TSmsAuditPersonConfig>  list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TSmsAuditPersonConfig vp = list.get(i);
			vp.setComponentId(componentId);
		}
		String[] billPK = {"componentId"};
		Object[] billPKValues = {componentId};
		this.saveBillDetail(list, TSmsAuditPersonConfig.class,billPK, billPKValues);
		return new ViewData();
	}
	public ViewData queryBOs(AreaInfo areaInfo) 
	{
		return this.componentDAO.getBeansByAreaInfo(areaInfo);
	}

	public ViewData queryPersons(AreaInfo areaInfo) 
	{		
		ViewData viewData=this.userDAO.getUsersByAreaInfo(areaInfo);
		
		List<Map> list=new ArrayList<Map>();
		
		for (int i = 0; i < viewData.getResultList().size(); i++)
		{
			Map m=new HashMap();
			VUser user=(VUser) viewData.getResultList().get(i);
			m.put("hid", user.getHid());
			m.put("code", user.getUserID());
			m.put("name", user.getUserName());
			list.add(m);
		}
		
		viewData.setResultList(list);
		
		return viewData;
	}

	public ViewData enterDetail(String componentId) 
	{
		return new ViewData();
	}
	public ViewData backToMain() 
	{
		return new ViewData();
	}
	public ViewData queryBOByPerson(String code) 
	{
		String hql = "from VSmsAuditPersonConfig  _t1 where _t1.code='"+code+"' and _t1.type='AUDIT'";
		ViewData viewData=this.getBaseDAO().findView(hql);
		viewData.addNewPrimaryKey("code", code);
		return viewData;
	}

	public ViewData queryPersonByBO(String componentId)
	{
		String hql = "from VSmsAuditPersonConfig  _t1 where _t1.componentId='"+componentId+"' and _t1.type='AUDIT'";
		ViewData viewData=this.getBaseDAO().findView(hql);
		viewData.addNewPrimaryKey("componentId", componentId);
		return viewData;
	}
	public void setUserDAO(IUserDAO userDAO)
	{
		this.userDAO = userDAO;
	}
}
