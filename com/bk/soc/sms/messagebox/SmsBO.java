package com.bk.soc.sms.messagebox;

import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.DateUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.idao.ISmsEditSendDAO;
import com.bk.soc.sms.shared.data.TBadOutBox;
import com.bk.soc.sms.shared.data.THistoryMsg;
import com.bk.soc.sms.shared.data.TInBox;
import com.bk.soc.sms.shared.data.TOutBox;
import com.bk.soc.sms.shared.data.TSendedOutBox;
import com.bk.soc.sms.shared.data.VBadMsgInfo;
import com.bk.soc.sms.shared.data.VInMsgInfo;
import com.bk.soc.sms.shared.data.VSendedMsgInfo;
@Controller
@RemoteProxy(name="SMS_SmsService")
public class SmsBO extends BaseBO implements ISmsEditSendDAO,ISmsService
{

	public ViewData opDeleteInBox(List<TInBox> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TInBox t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}

	public ViewData queryInBoxs(AreaInfo areaInfo)
	{
		String hql = "from VInMsgInfo _t1 where 1=1 order by _t1.arrivedTime desc";
		return this.getBaseDAO().findView(areaInfo, hql);
	}
	public ViewData opDeleteOutBox(List<TOutBox> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TOutBox t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}

	public ViewData queryOutBoxs(AreaInfo areaInfo)
	{
		//String hql = "from VOutMsgInfo _t1 where 1=1 and _t1.sender='"+this.getUserSession().getUserID()+"' order by _t1.sendTime desc";
		//String hql = "from VOutMsgInfo _t1 where 1=1  order by _t1.sendTime desc";
		//return this.getBaseDAO().findView(areaInfo, hql);
		
		String hql = "select new map(_t1.hid as hid,_t1.sender as sender,_t1.receiverMobileNo as receiverMobileNo,_t1.msg as msg,_t1.sendTime as sendTime,_t1.senderName as senderName,_t1.receiverName as receiverName) from VOutMsgInfo _t1 where 1=1 order by _t1.sendTime desc";
		
		ViewData viewData=this.getBaseDAO().findView(areaInfo, hql);
		
		List<Map> list=viewData.getResultList();
		
		for (int i = 0; i < list.size(); i++)
		{
			Map m=list.get(i);
			String receiverMobileNo=(String) m.get("receiverMobileNo");
			
			hql="select accountName from TMDMAccount where telNum =? or telNum=?";
			List<String> l1=this.getBaseDAO().find(hql,new Object[]{receiverMobileNo,"+86"+receiverMobileNo});

			if(l1.size()>0)
			{
				m.put("receiverName", l1.get(0));
			}
		}
		
		return viewData;
	}
	public ViewData opDeleteSendedOut(List<TSendedOutBox> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TSendedOutBox t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}

	public ViewData querySendedOuts(AreaInfo areaInfo)
	{
		//String hql = "from VSendedMsgInfo _t1 where 1=1 and _t1.sender='"+this.getUserSession().getUserID()+"' order by _t1.sendTime desc";
		String hql = "select new map(_t1.hid as hid,_t1.sender as sender,_t1.receiverMobileNo as receiverMobileNo,_t1.msg as msg,_t1.sendTime as sendTime,_t1.senderName as senderName,_t1.receiverName as receiverName) from VSendedMsgInfo _t1 where 1=1 order by _t1.sendTime desc";
		
		ViewData viewData=this.getBaseDAO().findView(areaInfo, hql);
		
		List<Map> list=viewData.getResultList();
		
		for (int i = 0; i < list.size(); i++)
		{
			Map m=list.get(i);
			String receiverMobileNo=(String) m.get("receiverMobileNo");
			
			hql="select accountName from TMDMAccount where telNum =? or telNum=?";
			List<String> l1=this.getBaseDAO().find(hql,new Object[]{receiverMobileNo,"+86"+receiverMobileNo});

			if(l1.size()>0)
			{
				m.put("receiverName", l1.get(0));
			}
		}
		
		return viewData;
	}
	public ViewData opDeleteBadOutBox(List<TBadOutBox> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBadOutBox t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}

	public ViewData queryBadOutBoxs(AreaInfo areaInfo)
	{
		//String hql = "from VBadMsgInfo _t1 where 1=1 and _t1.sender='"+this.getUserSession().getUserID()+"' order by _t1.sendTime desc";
		String hql = "from VBadMsgInfo _t1 where 1=1  order by _t1.sendTime desc";
		return this.getBaseDAO().findView(areaInfo, hql);
	}
	public ViewData queryStatistics(AreaInfo areaInfo)
	{
		String hql = "from VStatistic _t1 ";
		return this.getBaseDAO().findView(areaInfo, hql);
	}
	public ViewData queryHistoryMsgs(AreaInfo areaInfo) 
	{
		//String hql="from THistoryMsg _t1 where 1=1 and _t1.uid='"+this.getUserSession().getUserID()+"'";
		String hql="from THistoryMsg _t1 where 1=1 ";
		return this.getBaseDAO().findView(areaInfo,hql);
	}
	public ViewData opDeleteHistory(List<THistoryMsg> list) 
	{
		for (int i = 0; i < list.size(); i++)
		{
			THistoryMsg t = list.get(i);
			this.getBaseDAO().delete(t);
		}
		return new ViewData();
	}
	public ViewData opEdit(VBadMsgInfo bill)
	{
		// TODO Auto-generated method stub
		return null;
	}

	public ViewData opSendAgain(List<VBadMsgInfo> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			VBadMsgInfo t = list.get(i);
			TOutBox tb = new TOutBox();
			tb.setCommPort(new Long("1"));
			tb.setDstPort(new Long("-1"));
			tb.setSrcPort(new Long("-1"));
			tb.setEncoding("U");
			tb.setErrors(new Long("1"));
			tb.setExpressLevel(new Long("1"));
			tb.setFlashSms(new Long("0"));
			tb.setGatewayId("*");
			tb.setIsChinese(true);
			tb.setMsg(t.getMsg());
			tb.setNeedReport(new Long("0"));
			tb.setPriority("N");
			tb.setReceiverMobileNo(t.getReceiverMobileNo());
			tb.setSender(t.getSender());
			tb.setSendTime(DateUtil.getCurrentTime());
			//tb.setSentDate(DateUtil.getCurrentTime());
			tb.setStatus("U");
			this.getBaseDAO().save(tb);
		}
		return new ViewData();
	}
	public ViewData showEditWin(VBadMsgInfo bill)
	{		
		return new ViewData();
	}

	public ViewData showEditWin(VSendedMsgInfo bill)
	{
		return new ViewData();
	}

	public ViewData showEditWin(VInMsgInfo bill)
	{
		return new ViewData();
	}

	public ViewData opEditSend(String phone, String msg)
	{
		String[] p = phone.split(",");
        for(int i=0;i<p.length;i++)
        {
        	TOutBox tb = new TOutBox();
    		tb.setCommPort(new Long("1"));
    		tb.setDstPort(new Long("-1"));
    		tb.setSrcPort(new Long("-1"));
    		tb.setEncoding("U");
    		tb.setErrors(new Long("1"));
    		tb.setExpressLevel(new Long("1"));
    		tb.setFlashSms(new Long("0"));
    		tb.setGatewayId("*");
    		tb.setIsChinese(true);
    		tb.setNeedReport(new Long("0"));
    		tb.setPriority("N");
    		tb.setSendTime(DateUtil.getCurrentTime());
    		//tb.setSentDate(DateUtil.getCurrentTime());
    		tb.setStatus("U");
    		tb.setSender(this.getUserSession().getUserID());
    		tb.setMsg(msg);
        	tb.setReceiverMobileNo(p[i]);
        	this.getBaseDAO().save(tb);
        }
		return new ViewData();
	}

	public ViewData opSaveSend(String phone, String msg)
	{
		THistoryMsg thm = new THistoryMsg();
		thm.setMsg(msg);
		thm.setReceiverMobileNo(phone);
		thm.setUid(this.getUserSession().getUserID());
		this.getBaseDAO().saveView(thm);		
		return this.getBaseDAO().saveView(thm);
	}

	public ViewData opSendAndSave(String savePhone,String phone,String msg)
	{
		String[] p = phone.split(",");
		 for(int i=0;i<p.length;i++)
	        {
	        	TOutBox tb = new TOutBox();
	    		tb.setCommPort(new Long("1"));
	    		tb.setDstPort(new Long("-1"));
	    		tb.setSrcPort(new Long("-1"));
	    		tb.setEncoding("U");
	    		tb.setErrors(new Long("1"));
	    		tb.setExpressLevel(new Long("1"));
	    		tb.setFlashSms(new Long("0"));
	    		tb.setGatewayId("*");
	    		tb.setIsChinese(true);
	    		tb.setNeedReport(new Long("0"));
	    		tb.setPriority("N");
	    		tb.setSendTime(DateUtil.getCurrentTime());
	    		//tb.setSentDate(DateUtil.getCurrentTime());
	    		tb.setStatus("U");
	    		tb.setSender(this.getUserSession().getUserID());
	    		tb.setMsg(msg);
	        	tb.setReceiverMobileNo(p[i]);
	        	this.getBaseDAO().save(tb);
	        }
		 
			THistoryMsg thm = new THistoryMsg();
			thm.setMsg(msg);
			thm.setReceiverMobileNo(savePhone);
			thm.setUid(this.getUserSession().getUserID());
			this.getBaseDAO().saveView(thm);
			
			return this.getBaseDAO().saveView(thm);
	}

	public ViewData opFixedTimeSend(String phone, String msg, String time)
	{
		String[] p = phone.split(",");
		 for(int i=0;i<p.length;i++)
	        {
	        	TOutBox tb = new TOutBox();
	    		tb.setCommPort(new Long("1"));
	    		tb.setDstPort(new Long("-1"));
	    		tb.setSrcPort(new Long("-1"));
	    		tb.setEncoding("U");
	    		tb.setErrors(new Long("1"));
	    		tb.setExpressLevel(new Long("1"));
	    		tb.setFlashSms(new Long("0"));
	    		tb.setGatewayId("*");
	    		tb.setIsChinese(true);
	    		tb.setNeedReport(new Long("0"));
	    		tb.setPriority("N");
	    		System.out.println("###################��ʱ����ʱ��="+time);
	    		tb.setSendTime(DateUtil.String2Date(time,"yyyy-MM-dd HH:mm:ss"));
	    		//tb.setSentDate(DateUtil.getCurrentTime());
	    		tb.setStatus("U");
	    		tb.setSender(this.getUserSession().getUserID());
	    		tb.setMsg(msg);
	        	tb.setReceiverMobileNo(p[i]);
	        	this.getBaseDAO().save(tb);
	        }
		 return new ViewData();
	}

	public ViewData editSend(String phone, String msg)
	{
		return opEditSend(phone,msg);
	}
}
