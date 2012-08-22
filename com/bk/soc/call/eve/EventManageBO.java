package com.bk.soc.call.eve;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.id.BillId;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.def.IFoundationDataBaseDao;
import com.bk.soc.call.eve.data.TCallEvent;
import com.bk.soc.call.eve.data.TCallJob;
import com.bk.soc.call.eve.data.TCallSms;
import com.bk.soc.call.eve.data.TCallVisit;
import com.bk.soc.mdm.idao.HumanFrameworkDAO;
import com.bk.soc.sam.shared.dao.ITurnDAO;
import com.bk.soc.sam.shared.dao.ITurnService;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.TTurn;
import com.bk.soc.sam.shared.data.ViewData;
import com.bk.soc.sms.idao.ISmsEditSendDAO;

/**
 * @author shixiangru
 * @version 创建时间：2012-7-24 下午4:23:59
 * @Description
 */
@Controller
@RemoteProxy(name = "call_eventmanageservice")
public class EventManageBO extends BaseBO implements IEventManagerService,
		ITurnService,IEventManageDao {
	@Resource
	ISmsEditSendDAO ismsdao;
	
	public void setIsmsdao(ISmsEditSendDAO ismsdao) {
		this.ismsdao = ismsdao;
	}
	@Resource
	IFoundationDataBaseDao ifdbdao;
	
	public IFoundationDataBaseDao getIfdbdao() {
		return ifdbdao;
	}

	public void setIfdbdao(IFoundationDataBaseDao ifdbdao) {
		this.ifdbdao = ifdbdao;
	}

	@Resource
	HumanFrameworkDAO hfd;

	public HumanFrameworkDAO getHfd() {
		return hfd;
	}

	public void setHfd(HumanFrameworkDAO hfd) {
		this.hfd = hfd;
	}

	@Resource
	private ITurnDAO iTurnDAO;// 事件转办
	

	public ITurnDAO getiTurnDAO() {
		return iTurnDAO;
	}

	public void setiTurnDAO(ITurnDAO iTurnDAO) {
		this.iTurnDAO = iTurnDAO;
	}

	/**
	 * 增加事件
	 */
	public ViewData opAddNewEvent(TCallEvent bill) {
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String billNum = bi.nextBillId();
		bill.setCode(billNum);
		bill.setState("001");
		bill.setCallorgz(this.getUserSession().getOrgzCode());
		bill.setCallperson(this.getUserSession().getUserID());
		bill.setType("即办件");
		this.getBaseDAO().saveView(bill);
		ViewData viewData=new ViewData();
		viewData.setMessage(billNum);
		return viewData;
	}

	/**
	 * 修改事件
	 */
	public ViewData opModfiyEvent(TCallEvent bill) {
		bill.setCallorgz(this.getUserSession().getOrgzCode());
		bill.setCallperson(this.getUserSession().getUserID());
		return this.getBaseDAO().updateView(bill);
	}

	/**
	 * 删除事件
	 */
	public ViewData opDeleteEvent(List<TCallEvent> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallEvent TCallEvent = list.get(i);
			this.getBaseDAO().delete(TCallEvent);
		}
		return new ViewData();
	}

	/**
	 * 查询事件
	 * 前缀是query后面加s是权限控制
	 */
	public ViewData queryEvents(AreaInfo areaInfo) {
		String hql = "from VCallEvent _t1  order by _t1.calltime desc";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData queryEvent(String billCode) {
		String hql = "from VCallEvent _t1  where _t1.code = '"+billCode+"'";
		return this.getBaseDAO().findView(hql);
	}
	
	public ViewData queryCallSms(String billid) {
		String hql = "select new map(_t1.tel as tel,_t1.smstime as smstime,_t1.node as node,_t1.type as type) from TCallSms _t1  where _t1.billid = '"+billid+"'";
		List<Map> list = this.getBaseDAO().find(hql);
		if(list.size()>0){
			hql = "select new map(_t1.sender as tel,_t1.arrivedTime as smstime,_t1.notes as node,'接收' as type) from TInBox _t1  where _t1.sender = '"+"+86"+list.get(0).get("tel")+"'";
			List<Map> list1 = this.getBaseDAO().find(hql);
			if(list1.size()>0){
				list.addAll(list1);
			}
		}
		ViewData viewData = new ViewData();
		viewData.setResultList(list);
		return viewData;
	}
	
	public ViewData opSend(TCallSms bill) {
		bill.setSmstime(new Date());
		bill.setType("发送");
		ismsdao.editSend(bill.getTel(), bill.getNode());
		return this.getBaseDAO().saveView(bill);
	}
	
	public ViewData queryCallJob(String billid) {
		String hql = "from TCallJob _t1  where _t1.billid = '"+billid+"'";
		return this.getBaseDAO().findView(hql);
	}
	
	public ViewData opSaveCallJob(TCallJob bill){
		bill.setJobtime(new Date());
		bill.setType("督办");
		return this.getBaseDAO().saveView(bill);
	}
	/**
	 * 查询事件类型
	 */
	public List getTCallType() {

		return ifdbdao.getCallType();
	}

	/**
	 * 查询投诉渠道来源
	 * 
	 * @return
	 */
	public List getTChannel() {
		return ifdbdao.getCallChannels();
	}

	/**
	 * 查询事件状态
	 */
	public List getTCallState() {
		return ifdbdao.getCallState();
	}

	/**
	 * 查询全部类别
	 */
	public List getCallCategorys(){
		return ifdbdao.getCallCategory();
	}
	
	/**
	 * 查询类别大类
	 */
	public List geteCategorylLarge() {
		return ifdbdao.getSuperCode();
	}

	/**
	 * 查询类别小类
	 */
	public List geteCategorylSmall(String code) {
		return ifdbdao.getNode(code);
	}

	/**
	 * 获取部门　
	 */
	public List getOrgz() {
		return hfd.getTOrgz();
	}

	/**
	 * 开始转办
	 */
	public void startTurn(String billId) {
		String hql = "from TCallEvent _t1 where _t1.code='" + billId + "'";
		List<TCallEvent> listEvent = this.getBaseDAO().find(hql);
		if (listEvent.size() > 0) {
			TCallEvent tCallEvent = listEvent.get(0);
			String  state =tCallEvent.getState();
			if(state!=null&&state.equals("001")){
				tCallEvent.setState("002");
			}else if(state!=null&&state.equals("002")){
				tCallEvent.setState("003");
			}
			this.getBaseDAO().update(tCallEvent);
		}

	}

	/**
	 * 结束转办
	 */
	public void endTurn(String billId) {
		String hql = "from TCallEvent _t1 where _t1.code='" + billId + "'";
		List<TCallEvent> listEvent = this.getBaseDAO().find(hql);
		if (listEvent != null && listEvent.size() > 0) {
			TCallEvent tCallEvent = listEvent.get(0);
			String state=tCallEvent.getState();
			if(state!=null&&state.equals("003")){
				tCallEvent.setState("005");
			}else if(state!=null&&state.equals("007")){
				tCallEvent.setState("008");
			}else{
				tCallEvent.setState("005");
			}
			this.getBaseDAO().update(tCallEvent);
		}
	}

	/**
	 * 逾期转办
	 */

	/**
	 * 结束
	 * 
	 * @param billId
	 * @param orgz
	 * @param node
	 * @return
	 */
	public ViewData endBill(String billId,String node,String state) {
		try {
			String hql = "from TCallEvent _t1 where code = '"+billId+"'";
			List<TCallEvent> list = this.getBaseDAO().find(hql);
			if(list.size() > 0){
				TCallEvent t = list.get(0);
				t.setTurnorgz("");
				if(state.equals("001"))
					t.setDay(null);
				this.getBaseDAO().update(t);
			}
			return iTurnDAO.endBill(this, billId, node);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ViewData();
	}

	/**
	 * 查询事件办理
	 * 
	 * @param iTurnService
	 * @param code
	 * @return
	 */
	public ViewData queryTurn(String code) {
		return iTurnDAO.queryTurn(this, code);
	}

	/**
	 * 转办
	 * 
	 * @param billId
	 * @param orgz
	 * @param node
	 * @return
	 */
	public ViewData turnBill(String billId, String orgz, int day, String node) {
		String hql = "from TCallEvent _t1 where code = '"+billId+"'";
		List<TCallEvent> list = this.getBaseDAO().find(hql);
		if(list.size() > 0){
			TCallEvent t = list.get(0);
			t.setDay(day);
			t.setTurnorgz(orgz);
			t.setType("转办件");
			this.getBaseDAO().update(t);
		}
		return iTurnDAO.turnBill(this, billId, orgz, day, node);
	}

	public Object getBill(String billId) {
		// TODO Auto-generated method stub
		return null;
	}


	/**
	 * 退回
	 */
	public ViewData opRejec(String billId, String node) {
		List<TTurn> listTurn = iTurnDAO.getTurn(this, billId);
	
		if (null != listTurn && listTurn.size() > 0) {
			TTurn tTrun = listTurn.get(0);
			String orgz = tTrun.getFromorgz();
			Integer day = tTrun.getDay();
			String hql = "from TCallEvent _t1 where code = '"+billId+"'";
			List<TCallEvent> list = this.getBaseDAO().find(hql);
			if(list.size() > 0){
				TCallEvent t = list.get(0);
				t.setDay(day);
				t.setTurnorgz(orgz);
				this.getBaseDAO().update(t);
			}
			return iTurnDAO.turnBill(this, billId, orgz, day, node);
		} else {
			ViewData viewData = new ViewData();
			viewData.setIsSucceed(false);
			viewData.setMessage("无法退回！");
		}
		return new ViewData();
	}
	/**
	 *  获取事件状态为已批转与正在办理
	 */
	public List<TCallEvent> getCallEventState() {
		String hql="from TCallEvent _t1 where _t1.state in(002,003)";
		return this.getBaseDAO().find(hql);
	}
	/**
	 * 获取事件办理的明细
	 */
	public List<TTurn> getTTurn(String code) {
		return iTurnDAO.getTurn(this, code);
	}
	
	//查询回访记录	
	public ViewData queryCallVisit(AreaInfo areaInfo,String billid) {
		String hql = "from TCallVisit _t1 where _t1.billid = '"+billid+"' order by _t1.code desc";
		return this.getBaseDAO().findView(areaInfo, hql);

	}
 //新增回访记录
	public ViewData opAddNewCallVisit(TCallVisit bill) {
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String billNum = bi.nextBillId();

		bill.setCode(billNum);
		return this.getBaseDAO().saveView(bill);
	}

	public List getEvents(String start,String end) {
		
		String hql = "select new map(_t1.calltitle as calltitle,_t1.calltime as calltime,_t1.calltel as calltel,_t1.code as code,_t2.name as callperson) from TCallEvent _t1,TPerson _t2 where _t1.callperson=_t2.code and _t1.state='001' and _t1.calltime>='"+start+"' and _t1.calltime<='"+end+"'  order by _t1.calltime desc";
		//String hql = "from TCallEvent _t1  where (_t1.state='002' or _t1.state='003' or _t1.state='007') and _t1.code in "
		//+"(select billId from TTurn where state = 'start' and toorgz ='"+this.getUserSession().getOrgzCode()+"')";
		return this.getBaseDAO().find(hql);
	}
	
	public List getAllEvents() {
		//String hql = "select new map (_t1.code as code,_t1.calltitle as calltitle,_t2.name as callorgz,_t1.state as state,_t2.name as toorgz,'' as node) from TCallEvent _t1,TOrgz _t2 where _t1.callorgz=_t2.code and _t1.state != '001'";
		//List<Map> list = this.getBaseDAO().find(hql);
		List<Map> list2 = null;
		List list = null;
		try{
		String hql = "select new map (_t1.code as code,_t1.calltitle as calltitle,'"+this.getUserSession().getOrgzName()+"' as callorgz,_t1.state as state,_t3.name as toorgz,_t2.node as node) from TCallEvent _t1 ,TTurn _t2,TOrgz _t3 where _t1.code=_t2.billId and _t2.toorgz=_t3.code";
//		String sql = "select t1.code as code ,t1.calltitle as calltitle,t1.name as callorgz,t1.state,t2.name as toorgz,t2.node as node from (select _t1.code,_t1.calltitle,_t1.callorgz,_t3.name,_t1.state from TCallEvent _t1,TOrgz _t3 where _t1.callorgz = _t3.code ) t1,(select _t1.code,_t3.name,_t2.node from TCallEvent _t1,TTurn _t2,TOrgz _t3 where _t2.toorgz=_t3.code and _t1.code=_t2.billid) t2 where t1.code = t2.code";
//		list = this.getBaseDAO().find(sql);
//		String hql = "select new map (t1.code as code ,t1.calltitle as calltitle,t1.name as callorgz,t1.state,t2.name as toorgz,t2.node as node) from (select _t1.code,_t1.calltitle,_t1.callorgz,_t3.name,_t1.state from TCallEvent _t1,TOrgz _t3 where _t1.callorgz = _t3.code ) t1,(select _t1.code,_t3.name,_t2.node from TCallEvent _t1,TTurn _t2,TOrgz _t3 where _t2.toorgz=_t3.code and _t1.code=_t2.billid) t2 where t1.code = t2.code";
		list2 = this.getBaseDAO().find(hql);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		//list.addAll(list2);
		return list2;
		
	}
}
