package com.bk.soc.call.def;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.id.BillId;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.def.data.TCallAdlist;
import com.bk.soc.call.def.data.TCallChannel;
import com.bk.soc.call.def.data.TCallState;
import com.bk.soc.call.def.data.TCallType;
import com.bk.soc.call.def.data.TCategory;
import com.bk.soc.mdm.idao.ICallCodeBillDao;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

/**
 * @author 段尚 E-mail:38763179@qq.com
 * @version 创建时间：2012-8-2 下午1:35:53
 * @Description 基础数据 构件
 */
@Controller
@RemoteProxy(name = "Call_FoundationDataBaseService")
public class FoundationDataBaseBO extends BaseBO implements
		FoundationDataBaseService, IFoundationDataBaseDao {

	@Resource
	ICallCodeBillDao billDao;

	public ICallCodeBillDao getBillDao() {
		return billDao;
	}

	public void setBillDao(ICallCodeBillDao billDao) {
		this.billDao = billDao;
	}

	/************* 类型定义 start *******************/
	// 删除类型
	public ViewData opDeleteCallType(List<TCallType> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallType bill = (TCallType) list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	// 添加类型
	public ViewData opAddNewCallType(TCallType bill) {
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String billNum = bi.nextBillId();

		bill.setCode(billNum);

		return this.getBaseDAO().saveView(bill);
	}

	// 修改类型
	public ViewData opModifyCallType(List<TCallType> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallType bill = (TCallType) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	// 查询类型
	public ViewData queryCallType(AreaInfo areaInfo) {
		String hql = "from TCallType _t1 order by _t1.code desc";
		return this.getBaseDAO().findView(areaInfo, hql);

	}

	// 提高外部查询类型
	public List getCallType() {
		return this.getBaseDAO().find(
				"select new list(code,name) from TCallType ");
	}

	/************* 类型定义 end *******************/

	/************* 投诉渠道定义 start *******************/
	// 删除投诉渠道
	public ViewData opDeleteChannels(List<TCallChannel> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallChannel bill = (TCallChannel) list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	// 新增投诉渠道
	public ViewData opAddNewChannel(TCallChannel bill) {
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String billNum = bi.nextBillId();

		bill.setCode(billNum);
		return this.getBaseDAO().saveView(bill);
	}

	// 修改投诉渠道
	public ViewData opModifyChannels(List<TCallChannel> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallChannel bill = (TCallChannel) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	// 查询投诉渠道
	public ViewData queryChannels(AreaInfo areaInfo) {
		String hql = "from TCallChannel _t1 order by _t1.code desc";
		return this.getBaseDAO().findView(areaInfo, hql);

	}

	// 提供外部查询方法
	public List getCallChannels() {
		return this.getBaseDAO().find(
				"select new list(code,name) from TCallChannel");
	}

	/************* 投诉渠道定义 end *******************/

	/************* 状态维护 start *******************/
	// 删除状态
	public ViewData opDeleteCallState(List<TCallState> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallState bill = (TCallState) list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	// 添加状态
	public ViewData opAddNewCallState(TCallState bill) {
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String billNum = bi.nextBillId();

		bill.setCode(billNum);
		return this.getBaseDAO().saveView(bill);
	}

	// 修改状态
	public ViewData opModifyCallState(List<TCallState> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallState bill = (TCallState) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	// 查询状态
	public ViewData queryCallState(AreaInfo areaInfo) {
		String hql = "from TCallState _t1 order by _t1.code desc";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	// 提供外部查询
	public List getCallState() {
		String hql = "from  TCallState";
		return this.getBaseDAO().find(hql);
	}

	/************* 状态维护 end *******************/

	/************* 类别定义 start *******************/


	public ViewData opDeleteTCategroy(List<TCategory> list) {
		for(int i = 0; i<list.size();i++){
			TCategory bill = (TCategory) list.get(i);
			if(isDelCategoryOk(bill)){
				String supercode = bill.getSupercode();
				this.getBaseDAO().delete(bill);
				String hql = "from TCategory _t1 where _t1.supercode='" + supercode+ "'";
				List<TCategory> listCategorys = this.getBaseDAO().find(hql);
				if (listCategorys.size() < 0) { // 表示下面还有子节点
					hql = "from TCategory _t1 where _t1.code='" + supercode + "'";
					List<TCategory> listCategory = this.getBaseDAO().find(hql);
					TCategory t = listCategory.get(0);
					t.setLeaf(true);
					this.getBaseDAO().update(t);
				}
			}else{
				 ViewData vd = new ViewData();
				 vd.setIsSucceed(false);
				 vd.setMessage("请先删除小类");
				 return vd;
			}
		}
		return new ViewData();
	}
	
	public boolean isDelCategoryOk(TCategory bill){
		boolean falg = false;
		if(bill.getLeaf() == true){
			falg = true;
		}else{
			String hql = "from TCategory _t1 where _t1.supercode='" + bill.getCode() + "'";
			List<TCategory> listCategorys = this.getBaseDAO().find(hql);
			if(listCategorys.size() > 0){
				falg = false;
			}else{
				falg = true;
			}
		}
		return falg;
	}

	// 添加类别
	public ViewData opAddNewTCategory(TCategory bill) {
		System.out.println(bill.getName());
		/********* 自动生成code start ************/
		bill.setCode(billDao.getBillCode("TCategory", bill.getSupercode(),"supercode","0"));
		/********* 自动生成code end ************/
		if (null == bill.getSupercode()) {
			bill.setSupercode("root");
			bill.setLeaf(true);
		} else {
			String hql = "from TCategory _t1 where _t1.code='"
					+ bill.getSupercode() + "'";
			List<TCategory> listOrgz = this.getBaseDAO().find(hql);
			TCategory tOrgz = listOrgz.get(0);
			tOrgz.setLeaf(false);
			this.getBaseDAO().update(tOrgz);
			bill.setLeaf(true);
		}
		return this.getBaseDAO().saveView(bill);
	}

	// 修改类别
	public ViewData opModifyTCategroys(List<TCategory> list) {
		for (int i = 0; i < list.size(); i++) {
			TCategory bill = (TCategory) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	// 查询类别
	public ViewData queryCategorys(AreaInfo areaInfo) {
		String hql = "from TCategory _t1";
		return this.getBaseDAO().findView(areaInfo, hql);

	}

	// 提供外部查询类别
	public List getCallCategory() {
		return this.getBaseDAO().find(
				"select new list(code,name) from TCategory");
	}

	/**
	 * 查询树
	 */
	public ViewData queryTCategoryNodes(String id) {

		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,_t1.supercode as pid,_t1.leaf as leaf) from TCategory _t1 where _t1.supercode = '"
				+ id + "'";
		return this.getBaseDAO().findView(hql);
	}

	/**
	 * 点击事件查询
	 */
	public ViewData queryTCategory(AreaInfo areaInfo, String id) {
		String hql = "from TCategory _t1  where (_t1.supercode like '"+id+"%' or  _t1.code ='"+id+"' ) order by _t1.code desc";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	/************* 选择页 start *******************/
	public ViewData findCateNodes(String id) {

		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text ,_t1.supercode as pid,_t1.leaf as leaf) from TCategory _t1 where _t1.supercode='"
				+ id + "' and 1=1";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData findCate(AreaInfo areaInfo, String id) {
		String hql = "from TCategory _t1 where  _t1.supercode like '" + id
				+ "%'";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	/************* 选择页 end *******************/

	/**
	 * 获得类别大类
	 */
	public List getSuperCode() {
		String hql = "from TCategory _t1 where  _t1.supercode ='root'";
		return this.getBaseDAO().find(hql);
	}

	/**
	 * 获得类别小类
	 */
	public List getNode(String code) {
		String hql = "from TCategory _t1 where  _t1.supercode = '" + code + "'";
		return this.getBaseDAO().find(hql);
	}

	/**
	 * 获得限制天数
	 */
	public List getCateStintday(String code) {
		String hql = "from TCategory _t1 where  _t1.code = '" + code + "'";
		return this.getBaseDAO().find(hql);
	}

	/************* 类别定义 end *******************/

	/****************** 通讯录分组 start **********************************/

	// 删除通讯录分组
	public void deleteTreeCallAdlist(String id) {
		String hql = "from TCallAdlist _t1 where _t1.supercode='" + id + "'";
		List<TCallAdlist> listCategorys = this.getBaseDAO().find(hql);
		for (int i = 0; i < listCategorys.size(); i++) {
			TCallAdlist t = listCategorys.get(i);
			deleteTreeCallAdlist(t.getCode());
		}
		hql = "from TCallAdlist _t1 where _t1.code='" + id + "'";
		List<TCallAdlist> listCategory = this.getBaseDAO().find(hql);
		if(listCategory.size() > 0){
			this.getBaseDAO().delete(listCategory.get(0));
		}
		
	}

	public ViewData opDeleteTCallAdlists(List<TCallAdlist> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallAdlist bill = (TCallAdlist) list.get(i);
			String supercode = bill.getSupercode();
			deleteTreeCallAdlist(bill.getCode());
			String hql = "from TCallAdlist _t1 where _t1.supercode='"
					+ supercode + "'";
			List<TCallAdlist> listCategorys = this.getBaseDAO().find(hql);
			if (listCategorys.size() < 0) { // 表示下面还有子节点
				hql = "from TCallAdlist _t1 where _t1.code='" + supercode + "'";
				List<TCallAdlist> listCategory = this.getBaseDAO().find(hql);
				TCallAdlist t = listCategory.get(0);
				t.setLeaf(true);
				this.getBaseDAO().update(t);
			}
		}
		return new ViewData();
	}

	// 添加通讯录
	public ViewData opAddNewTCallAdlist(TCallAdlist bill) {
		bill.setCode(billDao.getBillCode("TCallAdlist", bill.getSupercode(),"supercode","0"));

		if (null == bill.getSupercode()) {
			bill.setSupercode("root");
		} else {
			String hql = "from TCallAdlist _t1 where _t1.code='"
					+ bill.getSupercode() + "'";
			List<TCallAdlist> listCallAdlist = this.getBaseDAO().find(hql);
			TCallAdlist tCallAdlist = listCallAdlist.get(0);
			tCallAdlist.setLeaf(false);
			this.getBaseDAO().update(tCallAdlist);
			bill.setLeaf(true);
		}
		return this.getBaseDAO().saveView(bill);
	}

	// 修改通讯通
	public ViewData opModifyTCallAdlists(List<TCallAdlist> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallAdlist bill = (TCallAdlist) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	// 查询通讯录
	public ViewData querySystems(AreaInfo areaInfo) {
		String hql = "from TCallAdlist _t1";
		return this.getBaseDAO().findView(areaInfo, hql);

	}

	public List getParentType() {
		return this.getBaseDAO().find(
				"select new list(code,name) from TCallAdlist");
	}

	public ViewData queryTCallAdlistNodes(String id) {
		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,_t1.supercode as pid,_t1.leaf as leaf) from TCallAdlist _t1 where _t1.supercode = '"
				+ id + "'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryTCallAdlist(AreaInfo areaInfo, String id) {
		String hql = "";
		if (null == id) {
			hql = "from TCallAdlist _t1 order by _t1.code";
		} else {
			hql = "from TCallAdlist _t1 where _t1.supercode like '" + id
					+ "%' order by _t1.code";

			List<TCallAdlist> list = this.getBaseDAO().find(hql);
			if (null != list && list.size() == 0) {
				hql = "from TCallAdlist _t1 where _t1.code like '" + id
						+ "%' order by _t1.code";
			}
		}
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	/****************** 通讯录分组 end **********************************/

}
