package com.bk.soc.sms.addressbook;

import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.id.BillId;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.addressbook.data.TAddrListGroup;
@Controller
@RemoteProxy(name="SMS_AddrListGroupService")
public class AddrListGroupBO extends BaseBO implements IAddrListGroupService
{
	public ViewData opAddNewAddrListGroup(String PageParam,TAddrListGroup bill)
	{
		String con="";
		if("PUBLIC".equals(PageParam))
		{
			con="False";
		}
		else if("PRIVATE".equals(PageParam))
		{
			con="True";
		}
		else
		{
			ViewData vd = new ViewData();
			vd.setIsSucceed(false);
			vd.setMessage("δȡ���������");
			return vd;				
		}
		bill.setGroupType(con);
		//��ɱ��
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String groupCode = bi.nextBillId();
		bill.setGroupCode(groupCode);
		
		bill.setUid(this.getUserSession().getUserID());
		
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opDeleteAddrListGroup(List<TAddrListGroup> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TAddrListGroup t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}

	public ViewData opModifyAddrListGroup(List<TAddrListGroup> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TAddrListGroup t =(TAddrListGroup)list.get(i);
			this.getBaseDAO().update(t);
		}
		return new ViewData();
	}

	public ViewData queryAddrListGroups(AreaInfo areaInfo,String PageParam)
	{		
		String hql = "from TAddrListGroup _t1 ";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData showAddNewWin()
	{
		return new ViewData();
	}

}
