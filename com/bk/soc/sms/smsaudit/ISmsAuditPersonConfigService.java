package com.bk.soc.sms.smsaudit;

import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.smsaudit.data.TSmsAuditPersonConfig;

public interface ISmsAuditPersonConfigService 
{
	/**
	 * ��ѯ���е�ҵ�����
	 * **/
	public ViewData queryBOs(AreaInfo areaInfo);
	/**
	 * ��ѯҵ������¿�ͨ��ҵ�����Ա
	 * **/
	public ViewData queryPersonByBO(String componentId);
	/**
	 * ������ϸ
	 * **/
	public ViewData enterDetail(String componentId);
	
	/**
	 * ��ѯ���е���Ա
	 * **/
	public ViewData queryPersons(AreaInfo areaInfo);
	/**
	 * ��ѯ��Ա��Ӧ��ҵ�����
	 * **/
	public ViewData queryBOByPerson(String code);
	/**
	 * ����
	 * **/
	public ViewData backToMain();
	/**
	 * �޸ı�TSmsAuditPersonConfig
	 * */
	public ViewData opModifySmsAuditPersonConfigP(String id,List<TSmsAuditPersonConfig>  list);
	/**
	 * �޸ı�TSmsAuditPersonConfig
	 * */
	public ViewData opModifySmsAuditPersonConfigB(String id,List<TSmsAuditPersonConfig>  list);
}
