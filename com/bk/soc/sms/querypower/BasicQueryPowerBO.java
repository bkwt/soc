package com.bk.soc.sms.querypower;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.idao.IBasicQueryPowerDAO;
import com.bk.soc.sms.querypower.data.TBasicQueryPower;
@Controller
@RemoteProxy(name="SMS_BasicQueryPowerService")
public class BasicQueryPowerBO extends BaseBO implements IBasicQueryPowerService,IBasicQueryPowerDAO 
{

	public ViewData opDeleteBasicQueryPower(List<TBasicQueryPower> list) 
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBasicQueryPower t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}
	public ViewData opModifyBasicQueryPower(List<TBasicQueryPower> list) 
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBasicQueryPower t = list.get(i);
			this.getBaseDAO().update(t);
		}
		return new ViewData();
	}
	public ViewData queryBasicQueryPower(AreaInfo areaInfo) 
	{
		String hql = "from TBasicQueryPower _t1";
		return this.getBaseDAO().findView(areaInfo, hql);
	}
	public ViewData opAddNewBasicQueryPower(TBasicQueryPower bill)
	{
//		String hql="from TBasicQueryPower _t1 where _t1.templateId='"+bill.getTemplateId()+"' and _t1.userId='"+bill.getUserId()+"'";
//		List list=this.getBaseDAO().find(hql);
//		if(list.size()>0)
//		{
//			ViewData vd = new ViewData();
//			vd.setIsSucceed(false);
//			vd.setMessage("������¼�Ѿ�����!");
//			return vd;		
//		}
//		else
//		{
			return this.getBaseDAO().saveView(bill);
//		}
	}

	public ViewData showAddNewWin()
	{
		return new ViewData();
	}
	public TBasicQueryPower getBasicQueryPower(String templateId,String tel) 
	{
		String hql="from TBasicQueryPower _t1 where _t1.templateId='"+templateId+"' and _t1.phoneNumber='"+tel+"'";
		List list=this.getBaseDAO().find(hql);
		if(list.size()>0)
		{
			TBasicQueryPower tq = (TBasicQueryPower)list.get(0);
			return tq;
		}
		else
		{
			return null;
		}
	}
}
