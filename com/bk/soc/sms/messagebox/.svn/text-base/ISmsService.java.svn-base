package com.bk.soc.sms.messagebox;

import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.shared.data.TBadOutBox;
import com.bk.soc.sms.shared.data.THistoryMsg;
import com.bk.soc.sms.shared.data.TInBox;
import com.bk.soc.sms.shared.data.TOutBox;
import com.bk.soc.sms.shared.data.TSendedOutBox;
import com.bk.soc.sms.shared.data.VBadMsgInfo;
import com.bk.soc.sms.shared.data.VInMsgInfo;
import com.bk.soc.sms.shared.data.VSendedMsgInfo;
public interface ISmsService
{
	/**
	 * ���ն���Ϣ��ѯ
	 * @return ViewData
	 * */
	public ViewData queryInBoxs(AreaInfo areaInfo);
	/**
	 * ���ն���Ϣɾ��--����
	 * @return ViewData
	 * */
	public ViewData opDeleteInBox(List<TInBox> list);
	/**
	 * �����Ϣ��ѯ
	 * @return ViewData
	 * */
	public ViewData queryOutBoxs(AreaInfo areaInfo);
	/**
	 * �����Ϣɾ��--����
	 * @return ViewData
	 * */
	public ViewData opDeleteOutBox(List<TOutBox> list);
	/**
	 * �ѷ�����Ϣ��ѯ
	 * @return ViewData
	 * */
	public ViewData querySendedOuts(AreaInfo areaInfo);
	/**
	 * �ѷ�����Ϣɾ��--����
	 * @return ViewData
	 * */
	public ViewData opDeleteSendedOut(List<TSendedOutBox> list);
	/**
	 * ʧ�ܶ���Ϣ��ѯ
	 * @return ViewData
	 * */
	public ViewData queryBadOutBoxs(AreaInfo areaInfo);
	/**
	 * ʧ�ܶ���Ϣɾ��--����
	 * @return ViewData
	 * */
	public ViewData opDeleteBadOutBox(List<TBadOutBox> list);
	/**
	 * ��ʷ��Ϣ��ѯ
	 * @return ViewData
	 * */
	public ViewData queryHistoryMsgs(AreaInfo areaInfo);
	/**
	 * ��ʷ��Ϣɾ��--����
	 * @return ViewData
	 * */
	public ViewData opDeleteHistory(List<THistoryMsg> list);
	/**
	 * ͳ�Ʋ�ѯ
	 * @return ViewData
	 * */
	public ViewData queryStatistics(AreaInfo areaInfo);
	/**
	 * ����
	 * @return ViewData
	 * */
	public ViewData opSendAgain(List<VBadMsgInfo> list);
	/**
	 * ����ת��ҳ��
	 * @return ViewData
	 * */
	public ViewData showEditWin(VBadMsgInfo bill);
	public ViewData showEditWin(VSendedMsgInfo bill);
	public ViewData showEditWin(VInMsgInfo bill);
	/**
	 * ����
	 * **/
	public ViewData opEditSend(String phone,String msg);
	/**
	 * ���淢����Ϣ
	 * **/
	public ViewData opSaveSend(String phone,String msg);
	/**
	 * ���Ͳ�����
	 * **/
	public ViewData opSendAndSave(String savePhone,String phone,String msg);
	/**
	 * ��ʱ����
	 * **/
	public ViewData opFixedTimeSend(String phone,String msg,String time);

}
