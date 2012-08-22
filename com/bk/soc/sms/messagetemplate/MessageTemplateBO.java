package com.bk.soc.sms.messagetemplate;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.idao.IBasicQueryPowerDAO;
import com.bk.soc.sms.messagetemplate.data.TMessageTemplate;
import com.bk.soc.sms.querypower.data.TBasicQueryPower;
@Controller
@RemoteProxy(name="SMS_MessageTemplateService")
public class MessageTemplateBO extends BaseBO implements IMessageTemplateService {
	
	private IBasicQueryPowerDAO basicQueryPowerDAO;
	public TMessageTemplate getByTemplateId(String templateId) 
	{
		String sql = "from TMessageTemplate where templateId='"+templateId+"'";
		List list = this.getBaseDAO().find(sql);
		if (list.size() > 0)
			return (TMessageTemplate) list.get(0);
		else
			return null;
	}
	public ViewData deleteBasicQueryMessage(List<TMessageTemplate> list) 
	{
		for (int i = 0; i < list.size(); i++)
		{
			TMessageTemplate t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}
	public ViewData opAddBasicQueryMessage(TMessageTemplate template)
	{
		return this.getBaseDAO().saveView(template);
	}
	public ViewData queryBasicQueryMessages(AreaInfo areaInfo) 
	{
		String sql = " from  TMessageTemplate  _t1";
		return this.getBaseDAO().findView(areaInfo,sql);
	}
	public ViewData opModifyBasicQueryMessage(List<TMessageTemplate> list) 
	{
		for (int i = 0; i < list.size(); i++)
		{
			TMessageTemplate t = list.get(i);
			this.getBaseDAO().update(t);
		}
		return new ViewData();
	}
	public boolean checkQueryPower(String templateId, String phoneNumber)
	{
		TBasicQueryPower tq=this.getBasicQueryPowerDAO().getBasicQueryPower(templateId, phoneNumber);
		if(tq!=null)
		{
			return true;
		}
		else
		{
			return false;
		}		
	}
	public ViewData showAddNewWin()
	{
		return new ViewData();
	}
	public IBasicQueryPowerDAO getBasicQueryPowerDAO()
	{
		return basicQueryPowerDAO;
	}
	public void setBasicQueryPowerDAO(IBasicQueryPowerDAO basicQueryPowerDAO)
	{
		this.basicQueryPowerDAO = basicQueryPowerDAO;
	}

}