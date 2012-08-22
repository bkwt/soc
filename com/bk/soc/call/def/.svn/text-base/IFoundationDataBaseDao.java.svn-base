package com.bk.soc.call.def;

import java.util.List;

import com.bk.soc.call.def.data.TCallAdlist;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

/**
 * @author 段尚 E-mail:38763179@qq.com
 * @version 创建时间：2012-8-2 下午1:38:35
 * @Description
 */
public interface IFoundationDataBaseDao {
	/************ 类型start ***************/
	public List getCallType();

	/************ 类型end ***************/

	/************* 投诉渠道定义 start *******************/
	public List getCallChannels();

	/************* 投诉渠道定义 end *******************/

	/************* 类别定义 start *******************/
	/*
	 * 获得大类
	 */
	public List getSuperCode();

	/*
	 * 获得小类
	 */
	public List getNode(String code);
	/*
	 * 获得全部类别
	 */
	public List getCallCategory();
	/*
	 * 根据类别编码获取限制天数
	 */
	public List getCateStintday(String code);

	/************* 类别定义 end *******************/

	/************* 状态维护 start *******************/
	public List getCallState();

	/************* 状态维护 end *******************/

	/************* 通讯录目录 start *******************/
	public ViewData queryTCallAdlistNodes(String id);

	public ViewData opAddNewTCallAdlist(TCallAdlist bill);

	public ViewData queryTCallAdlist(AreaInfo areaInfo, String id);

	public ViewData opDeleteTCallAdlists(List<TCallAdlist> list);

	/************* 通讯录目录 end *******************/

}
