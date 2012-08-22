package com.bk.soc.sms.selecthistorymsg;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.shared.data.THistoryMsg;
@Controller
@RemoteProxy(name="SMS_SelectHistoryMsg")
public class SelectHistoryMsg extends BaseBO
{
	/**
	 * ��ʷ��Ϣ��ѯ
	 * **/
	public ViewData findHistoryMsg(AreaInfo areaInfo,String otherConditions)
	{
		String hql="from THistoryMsg _t1 where 1=1 ";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		return this.getBaseDAO().findView(areaInfo,hql);
	} 
	/**
	 * ��ʷ��Ϣɾ��
	 * **/
	public ViewData opDeleteHistory(List<THistoryMsg> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			THistoryMsg t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}
}
