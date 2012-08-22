package com.bk.soc.sms.addressbook;

import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.addressbook.data.TAddrList;
/**
 * ͨ��¼����
 * ���
 * 2008-10-28
 * */
public interface IAddrListService
{
	/**
	 * ͨ��¼��ѯ
	 * @return ViewData
	 * */
	public ViewData queryAddrLists(AreaInfo areaInfo);
	/**
	 * ͨ��¼��Ϣ�޸�--����
	 * @return ViewData
	 * */
	public ViewData opModifyAddrList(List<TAddrList> list);	
	/**
	 * ͨ��¼��Ϣ����
	 * @return ViewData
	 * */
	public ViewData opAddNewAddrList(String PageParam,TAddrList bill);
	/**
	 * ͨ��¼��Ϣɾ��--����
	 * @return ViewData
	 * */
	public ViewData opDeleteAddrList(List<TAddrList> list);
	/**
	 * ��������ҳ
	 * @return ViewData
	 * @note:
	 */
	public ViewData showAddNewWin();
	/**
	 * ��ѯ�������
	 * */
	public List selectGroupName(String param);
}
