package com.bk.soc.sam.message;

import java.util.List;

import com.bk.soc.sam.message.data.TMessage;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface IMessageService
{
	 public ViewData queryMessages(AreaInfo areaInfo,String id);   //��ѯ��Ϣ
	 public ViewData queryMessageNodes(String id);						   //��ѯ��ϵ��
	 public ViewData queryPersonNodes(String id);						   //��ѯ��ϵ��
	 public String sendMessage(String receiverCode,String receiverName,String message);//����������Ϣ
	 public void updateUser(String state);//ҳ��ע���û�ID
	 public List getOnLineUsers();  //��ѯ�����û�
	 public List getAllOnLineUsers();  //��ѯ�����û�
	 public String changeState(List<TMessage> list);//��ѯδ����Ϣ
	 public List getMessages();
	 public ViewData opDeleteMessages(List<TMessage> list);
}
