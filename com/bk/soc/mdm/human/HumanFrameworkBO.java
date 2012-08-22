package com.bk.soc.mdm.human;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.id.BillId;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.def.data.TCategory;
import com.bk.soc.mdm.human.data.TOrgz;
import com.bk.soc.mdm.human.data.TPerson;
import com.bk.soc.mdm.human.data.TPos;
import com.bk.soc.mdm.idao.HumanFrameworkDAO;
import com.bk.soc.mdm.idao.ICallCodeBillDao;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

@Controller
@RemoteProxy(name = "MDM_HumanFrameworkService")
public class HumanFrameworkBO extends BaseBO implements IHumanFrameworkService,
		HumanFrameworkDAO {
	@Resource
	ICallCodeBillDao billDao;
	

	public ICallCodeBillDao getBillDao() {
		return billDao;
	}

	public void setBillDao(ICallCodeBillDao billDao) {
		this.billDao = billDao;
	}

	/**
	 * 查询部门树
	 */
	public ViewData queryOrgNodes(String id) {
		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,_t1.superCode as pid,_t1.leaf as leaf,_t1.state as state) from TOrgz _t1 where _t1.superCode='"
				+ id + "'";
		System.out.println(hql);
		return this.getBaseDAO().findView(hql);
	}
	
	/**
	 * 查询部门树
	 */
	public ViewData queryOrgzNodes(String id) {
		ViewData viewData;
		try {
			String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,_t1.superCode as pid,'false' as leaf,_t1.state as state) from TOrgz _t1 where _t1.superCode='"+ id + "'";
			List list = this.getBaseDAO().find(hql);
			//查询岗位
			hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,'true' as leaf) from TPos _t1 where _t1.orgzCode='"
					+ id + "'";
			List list2 = this.getBaseDAO().find(hql);
			list.addAll(list2); 
			viewData = new ViewData();
			viewData.setResultList(list);
			return viewData;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 树节点点击事件
	 */
	public ViewData queryTOrgz(AreaInfo areaInfo, String id) {
		String hql = "";
		if (id.equals("root")) {
			hql = "from TOrgz _t1 order by _t1.code desc";
		} else {
			hql = "from TOrgz _t1 where  _t1.superCode like '" + id
					+ "%' order by _t1.code desc";
			List<TOrgz> list = this.getBaseDAO().find(hql);
			if (null != list && list.size() == 0) {
				hql = "from TOrgz _t1 where _t1.code like '" + id
						+ "%' order by _t1.code desc";
			}
		}
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	/**
	 * 删除部门
	 */
	public ViewData opDeleteTOrgzs(List<TOrgz> list) {
		for(int i = 0; i<list.size();i++){
			TOrgz bill = (TOrgz) list.get(i);
			if(isDelOrgzOk(bill)){
				String supercode = bill.getSuperCode();
				this.getBaseDAO().delete(bill);
				String hql = "from TOrgz _t1 where _t1.superCode='" + supercode+ "'";
				List<TOrgz> listTOrgzs = this.getBaseDAO().find(hql);
				if (listTOrgzs.size() < 0) { // 表示下面还有子节点
					hql = "from TOrgz _t1 where _t1.code='" + supercode + "'";
					List<TOrgz> listOrgz = this.getBaseDAO().find(hql);
					TOrgz t = listOrgz.get(0);
					t.setLeaf("true");
					this.getBaseDAO().update(t);
				}
			}else{
				 ViewData vd = new ViewData();
				 vd.setIsSucceed(false);
				 vd.setMessage("请先删除子部门");
				 return vd;
			}
		}
		return new ViewData();
	}
	
	public boolean isDelOrgzOk(TOrgz bill){
		boolean falg = false;
		if(bill.getLeaf().equals("true")){
			falg = true;
		}else{
			String hql = "from TOrgz _t1 where _t1.superCode='" + bill.getCode() + "'";
			List<TOrgz> listOrgzs = this.getBaseDAO().find(hql);
			if(listOrgzs.size() > 0){
				falg = false;
			}else{
				falg = true;
			}
		}
		return falg;
	}
	

	/**
	 * 修改部门
	 */
	public ViewData opModifyTOrgzs(List<TOrgz> list) {
		for (int i = 0; i < list.size(); i++) {
			TOrgz bill = (TOrgz) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	/**
	 * 增加部门
	 */
	public ViewData opAddNewTOrgz(TOrgz bill) {

		bill.setCode(billDao.getBillCode("TOrgz", bill.getSuperCode(), "superCode","0"));

		if (null == bill.getSuperCode()) {
			bill.setSuperCode("root");
			bill.setLeaf("true");
		} else {
			String hql = "from TOrgz _t1 where _t1.code='"
					+ bill.getSuperCode() + "'";
			List<TOrgz> listOrgz = this.getBaseDAO().find(hql);
			TOrgz tOrgz = listOrgz.get(0);
			tOrgz.setLeaf("false");
			this.getBaseDAO().update(tOrgz);
			bill.setLeaf("true");
		}
		return this.getBaseDAO().saveView(bill);
	}

	/***
	 * 根据部门查询岗位
	 */
	public ViewData queryTPosAreaData(AreaInfo areaInfo, String id) {
		String hql = "from TPos _t1  where (_t1.orgzCode like '"+id+"%' or  _t1.code ='"+id+"' ) order by _t1.code desc";
//		if (null != id && !id.equals("root")) {
//			String hql = "from TPos _t1  where  _t1.orgzCode='" + id + "'"
//					+ "order by _t1.code desc";
//			return this.getBaseDAO().findView(areaInfo, hql);
//		} else {
//			String hql = "from TPos _t1 order by _t1 desc";
			return this.getBaseDAO().findView(areaInfo, hql);
//		}
	}

	/***
	 * 增加岗位
	 */
	public ViewData opAddNewTPos(TPos bill) {
		bill.setCode(billDao.getBillCode("TPos", bill.getOrgzCode(), "orgzCode","000"));
		return this.getBaseDAO().saveView(bill);
	}

	/**
	 * 修改岗位
	 */
	public ViewData opModifyTPos(List<TPos> list) {
		for (int i = 0; i < list.size(); i++) {
			TPos tPos = list.get(i);
			this.getBaseDAO().update(tPos);
		}
		return new ViewData();
	}

	/**
	 * 删除岗位
	 */
	public ViewData opDeleteTPos(List<TPos> list) {
		for (int i = 0; i < list.size(); i++) {
			TPos bill = list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}
	
	
	/***
	 * 根据部门查询人员
	 */
	public ViewData queryTPersonAreaDataForm(AreaInfo areaInfo, String id) {
//		"select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,'true' as leaf) from TPos _t1 where _t1.orgzCode='"
		
//		String hql = "from TPerson _t1  where (_t1.orgz like '"+id+"%' or  _t1.pos ='"+id+"' ) order by _t1.code desc";
		String hql = "select distinct new map (_t1.code as code,_t1.hid as hid,_t1.name as name,_t1.orgz as orgz,_t2.name as orgzName,_t1.pos as pos,_t3.name as posName,_t1.idcard as idcard,_t1.birthday as birthday,_t1.sex as sex,_t1.telephone as telephone) from TPerson _t1,TOrgz _t2,TPos _t3 where (_t1.orgz=_t2.code and _t1.pos=_t3.code) and (_t1.orgz like '"+id+"%' or  _t1.pos ='"+id+"') order by _t1.code,_t1.hid,_t1.name,_t1.orgz,_t2.name,_t1.pos,_t3.name,_t1.idcard,_t1.birthday,_t1.sex,_t1.telephone";
		return this.getBaseDAO().findView(areaInfo, hql);
	}


	/***
	 * 添加人员
	 */
	public ViewData opAddNewPerson(TPerson bill) {
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String billNum = bi.nextBillId();
		bill.setCode(billNum);
		
		return this.getBaseDAO().saveView(bill);
	}

	/***
	 * 修改人员
	 */
	public ViewData opModfiyTPerson(TPerson bill) {
		this.getBaseDAO().update(bill);
		return new ViewData();
	}

	/***
	 * 删除人员
	 */
	public ViewData opDeleteTPerson(List<TPerson> list) {
		for (int i = 0; i < list.size(); i++) {
			TPerson bill = list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	/***
	 * 获取岗位树
	 */
	public List getTPos() {

		return this.getBaseDAO().find("select new list(code,name) from TPos ");
	}

	/***
	 * 查询所有部门
	 */
	public List getTOrgz() {
		return this.getBaseDAO().find("select new list(code,name) from TOrgz");
	}
	/**
	 * 根据部门编码查询岗位
	 */
	public List getTPosOrgzCode(String orgzCode) {
		String hql = "select new list(code,name) from TPos _t1 where _t1.orgzCode= '"+orgzCode+"'";
		return this.getBaseDAO().find(hql);
	}
	/***
	 * 根据部门查询人员
	 */
	public ViewData queryTPersonAreaData(AreaInfo areaInfo, String id) {
		String hql = "";
		if (null != id && id != "") {
			if (id.equals("root")) {
				hql = "from TPerson _t1 order by _t1.code desc ";
			} else {
					hql = "from TPerson _t1 where  _t1.orgz ='" + id + "' order by _t1.code desc ";
			}
		} else {
			hql = "from TPerson _t1 order by _t1.code desc ";
		}

		return this.getBaseDAO().findView(areaInfo, hql);
	}
	
}
