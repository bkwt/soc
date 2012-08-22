package com.bk.soc.call.def;

import java.util.List;

import com.bk.soc.call.def.data.TCallAdlist;
import com.bk.soc.call.def.data.TCallChannel;
import com.bk.soc.call.def.data.TCallState;
import com.bk.soc.call.def.data.TCallType;
import com.bk.soc.call.def.data.TCategory;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

/**
 * @author 段尚 E-mail:38763179@qq.com
 * @version 创建时间：2012-8-2 下午1:50:33
 * @Description
 */
public interface FoundationDataBaseService {
	/************ 类型start ***************/
	public ViewData opDeleteCallType(List<TCallType> list);

	public ViewData opAddNewCallType(TCallType bill);

	public ViewData opModifyCallType(List<TCallType> list);

	public ViewData queryCallType(AreaInfo areaInfo);

	/************ 类型end ***************/

	/************* 投诉渠道定义 start *******************/

	public ViewData opAddNewChannel(TCallChannel bill);

	public ViewData opModifyChannels(List<TCallChannel> list);

	public ViewData opDeleteChannels(List<TCallChannel> list);

	public ViewData queryChannels(AreaInfo areaInfo);

	/************* 投诉渠道定义 end *******************/

	/************* 状态维护 start *******************/
	public ViewData opDeleteCallState(List<TCallState> list);

	public ViewData opAddNewCallState(TCallState bill);

	public ViewData opModifyCallState(List<TCallState> list);

	public ViewData queryCallState(AreaInfo areaInfo);

	/************* 状态维护 end *******************/

	/************* 类别定义 start *******************/
	public ViewData opAddNewTCategory(TCategory bill);

	public ViewData opModifyTCategroys(List<TCategory> list);

	public ViewData opDeleteTCategroy(List<TCategory> list);

	public ViewData queryCategorys(AreaInfo areaInfo);

	public ViewData queryTCategoryNodes(String id);

	public ViewData queryTCategory(AreaInfo areaInfo, String id);

	public ViewData findCate(AreaInfo areaInfo, String id);

	public ViewData findCateNodes(String id);

	/************* 类别定义 end *******************/

	/*************** 通讯录分组 start ***************************/
	public ViewData opAddNewTCallAdlist(TCallAdlist bill);

	public ViewData opModifyTCallAdlists(List<TCallAdlist> list);

	public ViewData opDeleteTCallAdlists(List<TCallAdlist> list);

	public ViewData querySystems(AreaInfo areaInfo);

	public ViewData queryTCallAdlistNodes(String id);

	public ViewData queryTCallAdlist(AreaInfo areaInfo, String id);

	public List getParentType();

	/*************** 通讯录分组 end ***************************************/
}
