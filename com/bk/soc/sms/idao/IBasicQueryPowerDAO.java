package com.bk.soc.sms.idao;

import com.bk.soc.sms.querypower.data.TBasicQueryPower;

public interface IBasicQueryPowerDAO 
{
	/**
	 * ���ݵ绰������Ҽ�¼
	 * **/
	public TBasicQueryPower getBasicQueryPower(String templateId,String tel);
}
