package com.bk.soc.sms.selectpersonandaccount;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="MDM_SelectPersonAndAccount")
public class SelectPersonAndAccount extends BaseBO
{
	/**
	 * ��ѯ��Ա���ͻ���Ϣ
	 * **/
	public ViewData findPersonAndAccount(AreaInfo areaInfo,String otherConditions)
	{
		String hql="from VPersonAndAccount _t1 where 1=1 ";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		return this.getBaseDAO().findView(areaInfo,hql);
	} 
}
