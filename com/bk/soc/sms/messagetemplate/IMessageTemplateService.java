package com.bk.soc.sms.messagetemplate;

import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.messagetemplate.data.TMessageTemplate;

/**
 * ����Ϣģ��
 * **/
public interface IMessageTemplateService {	
	/**
	 * ��ѯĳ����Ϣ����ϸ��Ϣ
	 * **/
	public TMessageTemplate getByTemplateId(String templateId);
	/**
	 * ɾ���¼��Ϣ
	 * **/
	public ViewData deleteBasicQueryMessage(List<TMessageTemplate> list);
	/**
	 * ������¼��Ϣ
	 * **/
	public ViewData opAddBasicQueryMessage(TMessageTemplate template);
	/**
	 * �޸���Ϣ��Ϣ
	 * **/
	public ViewData opModifyBasicQueryMessage(List<TMessageTemplate> list); 
	/**
	 * ��ѯ���е���Ϣ��Ϣ
	 * **/
	public ViewData queryBasicQueryMessages(AreaInfo areaInfo);
	/**
	 * ��ת����������
	 * **/
	public ViewData showAddNewWin();
	//public PageData queryForPage(String condition);
	public boolean checkQueryPower(String templateId,String phoneNumber);
}
