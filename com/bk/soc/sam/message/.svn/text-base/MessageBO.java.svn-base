package com.bk.soc.sam.message;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.fdm.core.service.InstantMessageService;
import org.fdm.state.SOCState;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.message.data.TMessage;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_MessageService")  
public class MessageBO extends BaseBO implements IMessageService
{
	@Resource
	private InstantMessageService instantMessageService;
	
	public InstantMessageService getInstantMessageService()
	{
		return instantMessageService;
	}

	public void setInstantMessageService(InstantMessageService instantMessageService)
	{
		this.instantMessageService = instantMessageService;
	}
	
	public ViewData queryMessages(AreaInfo areaInfo,String id)
		{
			String userID = this.getUserSession().getUserID();
			String hql = "select new map(_t1.hid as hid,_t1.messageCode as messageCode,_t1.messageText as messageText,_t1.senderName as senderName,_t1.receiverCode as receiverCode,_t1.receiverName as receiverName,_t1.sendDate as sendDate,_t1.messageType as messageType,_t1.state as state) from TMessage _t1 where ((senderCode = '"+userID+"' and Charindex('"+id+"',_t1.receiverCode) != 0) or (senderCode = '"+id+"' and Charindex('"+userID+"',_t1.receiverCode) != 0)) and Charindex('"+userID+"',isnull(_t1.senderDel,'')) = 0 order by sendDate desc";
			if(id==null||id.equals("root")) hql = "select new map(_t1.hid as hid,_t1.messageCode as messageCode,_t1.messageText as messageText,_t1.senderName as senderName,_t1.receiverCode as receiverCode,_t1.receiverName as receiverName,_t1.sendDate as sendDate,_t1.messageType as messageType,_t1.state as state) from TMessage _t1 where (senderCode = '"+userID+"' or  Charindex('"+userID+"',_t1.receiverCode) != 0) and Charindex('"+userID+"',isnull(_t1.senderDel,'')) = 0 order by sendDate desc";
			
			return this.getBaseDAO().findView(areaInfo, hql);
		}

		public String sendMessage(String toUserCode,String toUserName,String msg) 
		{	
			if(getUserSession().getUserID() == null) return "会话超时,请您重新登陆";
			return instantMessageService.sendMsg(getUserSession().getUserID(), getUserSession().getUserName(), toUserCode, toUserName, "个人消息", msg);
		}
		
		public List getMessages(){ 
			String userID = getUserSession().getUserID();
			String hql = "select new map(_t1.hid as hid,_t1.messageCode as messageCode,_t1.messageText as messageText,_t1.senderCode as senderCode,_t1.senderName as senderName,_t1.receiverCode as receiverCode,_t1.receiverName as receiverName,_t1.sendDate as sendDate,_t1.messageType as messageType,_t1.state as state) from TMessage _t1 where " +
					"_t1.receiverCode like '%"+userID+"%' and (_t1.state = '未读' or (_t1.state != '未读' and _t1.state != '已读')) order by _t1.sendDate desc";
			return this.getBaseDAO().find(hql);
		}
		public List getOnLineUsers()
		{
			List<Map> l1=SOCState.getOnlineUsers();
			List onLineList = new ArrayList();
			for (int i = 0; i < l1.size(); i++)
			{
				Map m=l1.get(i);
				m.put("hid", i+1);
				String logID=m.get("logID").toString();
				String hql="select distinct new map(_t1.userID as userID,_t1.userName as userName) from VUser _t1,TUserRole _t2,TRole _t3 where _t1.logID=_t2.logID and _t2.roleCode=_t3.roleCode and _t1.logID=?";
				List<Map> l2=this.getBaseDAO().find(hql, new Object[]{logID});
				
				for (int j = 0; j < l2.size(); j++)
				{
					m.put("userID", l2.get(j).get("userID"));
					m.put("userName", l2.get(j).get("userName"));
					onLineList.add(l2.get(j).get("userID"));
					//onLineList.add(m);
				}
			}
			return onLineList;
		}

		public List getAllOnLineUsers()
		{
			List<Map> l1=SOCState.getOnlineUsers();
			List onLineList = new ArrayList();
			for (int i = 0; i < l1.size(); i++)
			{
				Map m=l1.get(i);
				m.put("hid", i+1);
				String logID=m.get("logID").toString();
				String hql="select distinct new map(_t1.userID as userID,_t1.userName as userName) from VUser _t1,TUserRole _t2,TRole _t3 where _t1.logID=_t2.logID and _t2.roleCode=_t3.roleCode and _t1.logID=?";
				List<Map> l2=this.getBaseDAO().find(hql, new Object[]{logID});
				
				for (int j = 0; j < l2.size(); j++)
				{
					m.put("userID", l2.get(j).get("userID"));
					m.put("userName", l2.get(j).get("userName"));
					//onLineList.add(l2.get(j).get("userID"));
					onLineList.add(m);
				}
			}
			return onLineList;
		}
		
		public ViewData queryMessageNodes(String id)
		{
			String userID = getUserSession().getUserID();
			String hql = "select distinct new map(_t1.senderCode as id,_t1.senderName as name,'root' as pid,'false' as isLeaf) from TMessage _t1 where _t1.receiverCode like '%"+userID+"%' and Charindex('"+userID+"',isnull(_t1.senderDel,'')) = 0";
			ViewData viewData = this.getBaseDAO().findView(hql);
			String hql2 = "select distinct new map(_t1.receiverCode as id,_t1.receiverName as name,'root' as pid,'false' as isLeaf) from TMessage _t1 where senderCode = '"+userID+"' and Charindex('"+userID+"',isnull(_t1.senderDel,'')) = 0";
			List<Map> list2 = this.getBaseDAO().find(hql2);
			List<Map> list = viewData.getResultList();
			for (int i = 0; i < list2.size(); i++){
				if(!list.contains(list2.get(i))){
					list.add(list2.get(i));
				}
			}
			return viewData;
		}

		public ViewData queryPersonNodes(String id)
		{
			String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,'false' as leaf) from TOrgz _t1 where _t1.superCode='"+ id + "'";
			List list = this.getBaseDAO().find(hql);
			
			hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,'true' as leaf) from TPerson _t1 where _t1.orgz='"
					+ id + "'";
			List list2 = this.getBaseDAO().find(hql);
			list.addAll(list2); 
			ViewData viewData = new ViewData();
			viewData.setResultList(list);
			return viewData;
		}
		
		public void updateUser(String state)
		{
			instantMessageService.updateUser(state);
		}

		public String changeState(List<TMessage> list)
		{
			try {
				for(int i=0;i<list.size();i++){
					TMessage t = list.get(i);
					//if(t.getHid() == null){
						String hql = "from TMessage _t1 where _t1.messageCode="+t.getMessageCode();
						List<TMessage> l1 = this.getBaseDAO().find(hql);
						if(l1.size()>0){
							t = l1.get(0);
						}
					//}
					if(t.getReceiverCode().indexOf(",") != -1) {
						if(t.getState().indexOf("未读") != -1) 
							t.setState(getUserSession().getUserID());
						else
							t.setState(t.getState()+","+getUserSession().getUserID());
					}else 
						t.setState("已读");
					
					this.getBaseDAO().update(t);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return null;
		}

		public ViewData opDeleteMessages(List<TMessage> list)
		{
			for(int i=0;i<list.size();i++){
				TMessage t = list.get(i);
				t.setSenderDel(t.getSenderDel()+","+this.getUserSession().getUserID());
				this.getBaseDAO().update(t);
			}
			return new ViewData();
		}


}  
