package com.bk.soc.call.smt;

import java.util.List;


import com.bk.soc.call.eve.data.TCallEvent;
import com.bk.soc.sam.shared.data.ViewData;

/**
 * @author shixiangru
 * @version 创建时间：2012-7-19 下午15:33:10
 * @Description
 */
public interface ICallEventService {
	/***
	 * 查询事件
	 * 
	 * @param tCallEvent
	 * @return
	 */
	public ViewData queryCallEvent(String starttime,String endtime,TCallEvent tCallEvent);

	/***
	 * 查询所有部门
	 */
	public List getTOrgz();

	/***
	 * 查询事件类型
	 * 
	 * @return
	 */
	public List getTCallType();

	/***
	 * 查询事件类别
	 * 
	 * @return
	 */
	public List getTCallCategory();

	/**
	 * 查询投诉渠道来源
	 * 
	 * @return
	 */
	public List getTChannel();

	/**
	 * 获取事件表图表数据
	 * 
	 * @return
	 */
	public ViewData getTEventChartData(String starttime,String endtime);
	
	/***
	 * 获取单个部门的事件详细数据
	 * @param orgzCode
	 * @return
	 */
	public List getTeventOrgzData(String orgzCode,String starttime,String endtime);
	/**
	 * 查询一个月的统计数据
	 * @param starttime
	 * @param endtime
	 * @return
	 */
	public ViewData getChartMonthDeatil(String starttime,String endtime);
	
}
