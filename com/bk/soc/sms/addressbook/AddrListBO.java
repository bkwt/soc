package com.bk.soc.sms.addressbook;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.addressbook.data.TAddrList;

@Controller
@RemoteProxy(name="SMS_AddrListService")
public class AddrListBO extends BaseBO implements IAddrListService
{

	public ViewData opAddNewAddrList(String PageParam,TAddrList bill)
	{
		String con="";
		if("PUBLIC".equals(PageParam))
		{
			con="false";
		}
		else if("PRIVATE".equals(PageParam))
		{
			con="true";
		}
		else
		{
			ViewData vd = new ViewData();
			vd.setIsSucceed(false);
			vd.setMessage("未取到程序参数！");
			return vd;				
		}
		bill.setAddrType(con);
		bill.setUid(this.getUserSession().getUserID());
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opDeleteAddrList(List<TAddrList> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TAddrList t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}

	public ViewData opModifyAddrList(List<TAddrList> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TAddrList t = list.get(i);
			this.getBaseDAO().update(t);
		}
		return new ViewData();
	}

	public ViewData queryAddrLists(AreaInfo areaInfo)
	{
		String hql = "from TAddrList _t1 ";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData showAddNewWin()
	{
		return new ViewData();
	}

	public List selectGroupName(String param)
	{
		
		String con="";
		if("PUBLIC".equals(param))
		{
			con="False";
		}
		else if("PRIVATE".equals(param))
		{
			con="True";
		}
		String hql = "select new list(_t1.groupName)from TAddrListGroup _t1 where _t1.groupType='"+con+"'";
		return this.getBaseDAO().find(hql);
	}


}
