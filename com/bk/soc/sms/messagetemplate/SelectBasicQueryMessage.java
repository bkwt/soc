package com.bk.soc.sms.messagetemplate;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SMS_SelectBasicQueryMessage")
public class SelectBasicQueryMessage extends BaseBO
{
	/**
	 * ����Ϣģ���ѯ
	 * **/
	public ViewData findBasicQueryMessages(AreaInfo areaInfo,String otherConditions)
	{
		String hql="from TMessageTemplate _t1 where 1=1 ";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		
		return this.getBaseDAO().findView(areaInfo,hql);
	} 
}
