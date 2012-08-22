package com.bk.soc.call.eve;

import java.util.List;

import com.bk.soc.call.eve.data.TCallEvent;
import com.bk.soc.call.eve.data.TCallJob;
import com.bk.soc.call.eve.data.TCallSms;
import com.bk.soc.call.eve.data.TCallVisit;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.TTurn;
import com.bk.soc.sam.shared.data.ViewData;

/**
 * @author shixiangru
 * @version 创建时间：2012-7-24 下午4:20:13
 * @Description
 */
public interface IEventManagerService{
	/**
	 * 增加事件
	 * @return
	 */
	public ViewData opAddNewEvent(TCallEvent bill);
	/***
	 * 修改事件
	 * @param list
	 * @return
	 */
	public ViewData opModfiyEvent(TCallEvent bill);
	/**
	 * 删除事件
	 * @param list
	 * @return
	 */
	public ViewData opDeleteEvent(List<TCallEvent> list);
	/**
	 * 查询事件
	 * @param areaInfo
	 * @return
	 */
	public ViewData queryEvents(AreaInfo areaInfo);
	/**
	 * 查询事件
	 * @param areaInfo
	 * @return
	 */
	public ViewData queryEvent(String billCode);
	/**
	 * 查询事件类型
	 * @return
	 */
	public List getTCallType();
	/**
	 * 查询投诉渠道来源
	 * @return
	 */
	public List getTChannel();
	
	/**
	 * 查询事件状态
	 * @return
	 */
	public List getTCallState();
	/**
	 * 查询所有类别
	 * @return
	 */
	public List getCallCategorys();
	/**
	 * 查询类别大类
	 * @return
	 */
	public List geteCategorylLarge();
	/**
	 * 查询类别小类
	 * @return
	 */
	public List geteCategorylSmall(String code);
	/**
	 * 获取部门　
	 * @return
	 */
	public List getOrgz();
	/**
	 * 查询
	 * @param iTurnService
	 * @param code
	 * @return
	 */
	public ViewData queryTurn(String code);
	/**
	 * 转办
	 * @param billId
	 * @param orgz
	 * @param node
	 * @param day
	 * @return
	 */
	public ViewData turnBill(String billId, String orgz, int day,String node);
	/**
	 * 逾期办理
	 * @param billId
	 */
//	public void overTurn(String billId);
	/**
	 * 开始转办
	 * @param billId
	 */
	public void startTurn(String billId);
	/**
	 * 结束转办
	 * @param billId
	 * @param node
	 * @return
	 */
	public ViewData endBill(String billId,String node,String state);
	
	/**
	 * 退回
	 * @param billId
	 * @return
	 */
	public ViewData opRejec(String billId,String node);
	/**
	 * 获取事件状态为已批转与正在办理
	 * @return
	 */
	public List<TCallEvent> getCallEventState();
	/**
	 * 获取事件办理的明细
	 * @return
	 */
	public List<TTurn> getTTurn(String code);
	/**
	 * 获得回访记录
	 * @param  areaInfo
	 * @return
	 */
	public ViewData queryCallVisit(AreaInfo areaInfo,String billid);
	/**
	 * 添加回访记录
	 * @param bill
	 * @return
	 */
	public ViewData opAddNewCallVisit(TCallVisit bill);
	
	
	/**
	 * 主页用查询待办事件
	 */
	public List getEvents(String start,String end);
	
	/**
	 * 主页用查询所有事件
	 */
	public List getAllEvents();
	/**
	 * 发送短信
	 */
	public ViewData opSend(TCallSms bill);
	/**
	 * 查询短信
	 */
	public ViewData queryCallSms(String billid);
	/**
	 * 发送督办单
	 */
	public ViewData opSaveCallJob(TCallJob bill);
	/**
	 * 查询督办单
	 */
	public ViewData queryCallJob(String billid);
}
