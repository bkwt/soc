package com.bk.soc.call.smt;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.def.IFoundationDataBaseDao;
import com.bk.soc.call.def.data.TCallState;
import com.bk.soc.call.eve.data.TCallEvent;
import com.bk.soc.mdm.human.data.TOrgz;
import com.bk.soc.mdm.idao.HumanFrameworkDAO;
import com.bk.soc.sam.shared.data.ViewData;

/**
 * @author shixiangru
 * @version 创建时间：2012-7-19 下午3:56:52
 * @Description
 */
@Controller
@RemoteProxy(name = "call_callEventService")
public class CallEventBO extends BaseBO implements ICallEventService {
	@Resource
	IFoundationDataBaseDao foundDataBase;
	
	public IFoundationDataBaseDao getFoundDataBase() {
		return foundDataBase;
	}

	public void setFoundDataBase(IFoundationDataBaseDao foundDataBase) {
		this.foundDataBase = foundDataBase;
	}
	
	@Resource
	HumanFrameworkDAO hfd;

	public HumanFrameworkDAO getHfd() {
		return hfd;
	}

	public void setHfd(HumanFrameworkDAO hfd) {
		this.hfd = hfd;
	}


	/***
	 * 查询事件
	 */
	public ViewData queryCallEvent(String starttime, String endtime,
			TCallEvent tCallEvent) {
		String hql = "";
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List listState = this.getCallState();// 获得呼叫状态list
		ViewData viewData = new ViewData();
		String code=this.getUserSession().getOrgzCode();
		hql = "from TOrgz _t1 where _t1.code='"+code+"' or _t1.superCode='"+code+"' order by _t1.code desc";
		List listOrgz = this.getBaseDAO().find(hql);// 获得部门list
		for (int i = 0; i < listOrgz.size(); i++) {
			TOrgz tOrgz = (TOrgz) listOrgz.get(i);
			hql="from TCallEvent _t1 where";
			if (tCallEvent.getCalltype() != null&& tCallEvent.getCallsource() != null&& tCallEvent.getCallcategorylarge() != null) {
				hql=hql+"_t1.callorgz='"+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime+ "' and _t1.calltime<='" + endtime+ "' and _t1.calltype='" + tCallEvent.getCalltype()	+ "' and _t1.callsource='" + tCallEvent.getCallsource()+ "' and _t1.callcategorylarge ='"+ tCallEvent.getCallcategorylarge() + "'";
			} else if (tCallEvent.getCalltype() != null	&& tCallEvent.getCallsource() != null) {
				hql= hql+" _t1.callorgz='"	+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime+ "' and _t1.calltime<='" + endtime+ "' and _t1.calltype='" + tCallEvent.getCalltype()	+ "' and _t1.callsource='" + tCallEvent.getCallsource()+ "'";
			} else if (tCallEvent.getCalltype() != null	&& tCallEvent.getCallcategorylarge() != null) {
				hql= hql+" _t1.callorgz='"	+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime	+ "' and _t1.calltime<='" + endtime	+ "' and _t1.calltype='" + tCallEvent.getCalltype()	+ "' and _t1.callcategorylarge='"+ tCallEvent.getCallcategorylarge() + "'";
			} else if (tCallEvent.getCallsource() != null&& tCallEvent.getCallcategorylarge() != null) {
				hql=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime+ "' and _t1.calltime<='" + endtime+ "' and _t1.callsource='" + tCallEvent.getCallsource()	+ "' and _t1.callcategorylarge='"+ tCallEvent.getCallcategorylarge() + "'";
			} else if (tCallEvent.getCalltype() != null) {
				hql=hql+ " _t1.callorgz='"	+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime+ "' and _t1.calltime<='" + endtime	+ "' and _t1.calltype='" + tCallEvent.getCalltype()	+ "'";
			} else if (tCallEvent.getCallsource() != null) {
				hql=hql+ " _t1.callorgz='"	+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime+ "' and _t1.calltime<='" + endtime+ "'  and _t1.callsource='"	+ tCallEvent.getCallsource() + "'";
			} else if (tCallEvent.getCallcategorylarge() != null) {
				hql+=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime+ "' and _t1.calltime<='" + endtime+ "' and  _t1.callcategorylarge ='"+ tCallEvent.getCallcategorylarge() +"'";
			} else {
				hql=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.calltime>='" + starttime+ "' and _t1.calltime<='" + endtime + "'";
			}
			List listTEvent = this.getBaseDAO().find(hql);// 根据部门获取事件数量
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("name", tOrgz.getName());
			map.put("count", listTEvent.size());
			map.put("orgCode", tOrgz.getCode());
			for (int j = 0; j < listState.size(); j++) {
				TCallState tCallState = (TCallState) listState.get(j);
				hql="from TCallEvent _t1 where";
				if (tCallEvent.getCalltype() != null&& tCallEvent.getCallsource() != null&& tCallEvent.getCallcategorylarge() != null) {
					hql= hql+"_t1.callorgz='"+ tOrgz.getCode() + "' and _t1.state='"	+ tCallState.getCode() + "' and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime	+ "' and _t1.calltype='" + tCallEvent.getCalltype()	+ "' and _t1.callsource='"+ tCallEvent.getCallsource()+ "' and _t1.callcategorylarge='"+ tCallEvent.getCallcategorylarge() + "'";
				} else if (tCallEvent.getCalltype() != null	&& tCallEvent.getCallsource() != null) {
					hql=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "'and _t1.state='"+ tCallState.getCode() + "' and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime	+ "' and _t1.calltype='" + tCallEvent.getCalltype()	+ "' and _t1.callsource='"+ tCallEvent.getCallsource() + "'";
				} else if (tCallEvent.getCalltype() != null	&& tCallEvent.getCallcategorylarge() != null) {
					hql=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.state='"+ tCallState.getCode() + "' and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime+ "' and _t1.calltype='" + tCallEvent.getCalltype()+ "' and _t1.callcategorylarge='"+ tCallEvent.getCallcategorylarge() + "'";
				} else if (tCallEvent.getCallsource() != null&& tCallEvent.getCallcategorylarge() != null) {
					hql= hql+" _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.state='"+ tCallState.getCode() + "' and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime	+ "' and _t1.callsource='"+ tCallEvent.getCallsource() + "' and _t1.callcategorylarge='"+ tCallEvent.getCallcategorylarge()+"'";
				} else if (tCallEvent.getCalltype() != null) {
					hql=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.state='"	+ tCallState.getCode() + "' and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime+ "' and _t1.calltype='" + tCallEvent.getCalltype()+ "'";
				} else if (tCallEvent.getCallsource() != null) {
					hql=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "'and _t1.state='"+ tCallState.getCode() + "' and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime+ "'  and _t1.callsource='"+ tCallEvent.getCallsource() + "'";
				} else if (tCallEvent.getCallcategorylarge() != null) {
					hql= hql+" _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.state='"+ tCallState.getCode() + "' and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime+ "' and  _t1.callcategorylarge='"+ tCallEvent.getCallcategorylarge() + "'";
				} else {
					hql=hql+ " _t1.callorgz='"+ tOrgz.getCode() + "' and _t1.state='"+ tCallState.getCode() + "'  and _t1.calltime>='"+ starttime + "' and _t1.calltime<='" + endtime+ "'";
				}
				List listCallState = this.getBaseDAO().find(hql);
				map.put(tCallState.getCode(), listCallState.size());
			}
			list.add(map);
		}
		viewData.setResultList(list);
		return viewData;
	}

	/***
	 * 查询所有部门
	 */
	public List getTOrgz() {
		return hfd.getTOrgz();
	}

	/***
	 * 查询所有类别
	 */
	public List getTCallCategory() {
		return foundDataBase.getSuperCode();
	}

	/**
	 * 查询事件类型
	 */
	public List getTCallType() {

		return foundDataBase.getCallType();
	}

	/**
	 * 查询投诉渠道来源
	 * 
	 * @return
	 */
	public List getTChannel() {
		return foundDataBase.getCallChannels();
	}

	/**
	 * 获取所有状态
	 * 
	 * @return
	 */
	public List getCallState() {
		return foundDataBase.getCallState();
	}

	/**
	 * 获取事件表图表数据
	 * 
	 * @return
	 */
	public ViewData getTEventChartData(String starttime, String endtime) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		ViewData viewData = new ViewData();
		String code=this.getUserSession().getOrgzCode();
		String hql = "from TOrgz _t1 where _t1.code='"+code+"' or _t1.superCode='"+code+"' order by _t1.code desc";
		List listOrgz = this.getBaseDAO().find(hql);// 获得部门list
		for (int i = 0; i < listOrgz.size(); i++) {
			TOrgz tOrgz = (TOrgz) listOrgz.get(i);
			hql = "from TCallEvent _t1 where _t1.callorgz='" + tOrgz.getCode()
					+ "'and _t1.calltime>='" + starttime
					+ "' and _t1.calltime<='" + endtime + "'";
			List listTEvent = this.getBaseDAO().find(hql);// 根据部门获取事件数量
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("name", tOrgz.getName());
			map.put("orgzCode", tOrgz.getCode());
			map.put("data1", listTEvent.size());
			list.add(map);

		}
		viewData.setResultList(list);
		return viewData;
	}

	/**
	 * 获取单个部门的事件详细数据
	 */
	public List getTeventOrgzData(String orgzCode, String starttime,
			String endtime) {
		String hql = "";
		ViewData viewData = new ViewData();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List listState = this.getCallState();// 获得呼叫状态list
		for (int j = 0; j < listState.size(); j++) {
			Map<String, Object> map = new HashMap<String,Object>();
			TCallState tCallState = (TCallState) listState.get(j);
			hql = "from TCallEvent _t1 where _t1.callorgz='" + orgzCode
					+ "' and _t1.state='" + tCallState.getCode()
					+ "' and _t1.calltime>='" + starttime
					+ "' and _t1.calltime<='" + endtime + "'";// 根据部门与状态获取数量
			@SuppressWarnings("rawtypes")
			List listCallState = this.getBaseDAO().find(hql);
			map.put("name", tCallState.getName());
			map.put("data1", listCallState.size());
			list.add(map);
		}

		//viewData.setResultList(list);
		return list;
	}

	/**
	 * 查询一个月的统计数据
	 * 
	 */
	public ViewData getChartMonthDeatil(String starttime, String endtime) {
		String hql = "";
//		Calendar cal = Calendar.getInstance();
//		cal.setTimeInMillis(java.sql.Date.valueOf("2012-07-01").getTime());
//		int monthCount = cal.getActualMaximum(Calendar.DAY_OF_MONTH);// 获取当月天数
		ViewData viewData = new ViewData();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
		String dateStr1 = starttime;
		String dateStr2 = endtime;
		try {
			Date dateBegin = formater.parse(dateStr1);
			Date dateEnd = formater.parse(dateStr2);
			Calendar ca = Calendar.getInstance();
			int k=1;
			while (dateBegin.compareTo(dateEnd) <= 0) {
				
				Map<String, Object> map = new HashMap<String, Object>();
				 hql="from  TCallEvent _t1 where _t1.calltime='"+formater.format(dateBegin)+"'";
				 List listDay=this.getBaseDAO().find(hql);
				 map.put("name",k);
				 map.put("data1", listDay.size());
				 hql="from  TCallEvent _t1 where _t1.calltime='"+formater.format(dateBegin)+"' and _t1.state='005'";
				 List listState=this.getBaseDAO().find(hql);
				 map.put("data2", listState.size());
				 list.add(map);
				 ca.setTime(dateBegin);
				 ca.add(ca.DATE,1);// 把dateBegin加上1天然后重新赋值给date1
				 dateBegin=ca.getTime();
				 k++;
			}

		} catch (Exception e) {
			// TODO: handle exception
		}
		viewData.setResultList(list);
		return viewData;
	}
}
