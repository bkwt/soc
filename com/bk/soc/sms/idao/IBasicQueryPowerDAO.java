package com.bk.soc.sms.idao;

import com.bk.soc.sms.querypower.data.TBasicQueryPower;

public interface IBasicQueryPowerDAO 
{
	/**
	 * 根据电话号码查找记录
	 * **/
	public TBasicQueryPower getBasicQueryPower(String templateId,String tel);
}
