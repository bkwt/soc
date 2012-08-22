package com.bk.soc.sms.idao;

import com.bk.soc.sam.shared.data.ViewData;

public interface ISmsEditSendDAO
{
	/**
	 * ��ݵ绰���뷢�Ͷ���
	 * **/
	public ViewData editSend(String phone,String msg);
}
