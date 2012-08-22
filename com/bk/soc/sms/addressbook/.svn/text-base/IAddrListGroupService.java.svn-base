package com.bk.soc.sms.addressbook;

import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.addressbook.data.TAddrListGroup;

public interface IAddrListGroupService
{
	/**
	 * ͨ��¼�����ѯ
	 * @return ViewData
	 * */
	public ViewData queryAddrListGroups(AreaInfo areaInfo,String param);
	/**
	 * ͨ��¼������Ϣ�޸�--����
	 * @return ViewData
	 * */
	public ViewData opModifyAddrListGroup(List<TAddrListGroup> list);	
	/**
	 * ͨ��¼������Ϣ����
	 * @return ViewData
	 * */
	public ViewData opAddNewAddrListGroup(String PageParam,TAddrListGroup bill);
	/**
	 * ͨ��¼������Ϣɾ��--����
	 * @return ViewData
	 * */
	public ViewData opDeleteAddrListGroup(List<TAddrListGroup> list);
	/**
	 * ��������ҳ
	 * @return ViewData
	 * @note:
	 */
	public ViewData showAddNewWin();
}
