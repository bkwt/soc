package com.bk.soc.call.eve;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.id.BillId;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.def.IFoundationDataBaseDao;
import com.bk.soc.call.def.data.TCallAdlist;
import com.bk.soc.call.eve.data.TCallAdbook;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

@Controller
@RemoteProxy(name = "call_AdbookService")
public class AdbookBO extends BaseBO implements AdbookService {

	@Resource
	IFoundationDataBaseDao qu;

	public IFoundationDataBaseDao getQu() {
		return qu;
	}

	public void setQu(IFoundationDataBaseDao qu) {
		this.qu = qu;
	}

	public ViewData opDeleteTAdbooks(List<TCallAdbook> list) {

		for (int i = 0; i < list.size(); i++) {
			TCallAdbook bill = (TCallAdbook) list.get(i);
			this.getBaseDAO().delete(bill);
			String hql = "from TCallAdbook _t1 where _t1.supercode='"
					+ bill.getSupercode() + "'";
			List<TCallAdbook> listAdbook = this.getBaseDAO().find(hql);
			if (listAdbook.size() == 0) {
				hql = "from TCallAdbook _t1 where _t1.code='"
						+ bill.getSupercode() + "'";
				List<TCallAdbook> listTAdbook = this.getBaseDAO().find(hql);
				TCallAdbook tAdbook = listTAdbook.get(0);
				tAdbook.setLeaf(true);
				this.getBaseDAO().update(tAdbook);
			}
		}

		return new ViewData();
	}

	public ViewData opAddNewTAdbook(TCallAdbook bill) {
		BillId bi = this.getBillId();
		Map m = bi.getMapFromBean(bill);
		bi.put(m);
		String billNum = bi.nextBillId();
		bill.setCode(billNum);
		if (null == bill.getSupercode()) {
			bill.setSupercode("root");
		} else {
			String hql = "from TCallAdbook _t1 where _t1.code='"
					+ bill.getSupercode() + "'";
			List<TCallAdbook> listAdbook = this.getBaseDAO().find(hql);
			TCallAdbook tAdbook = listAdbook.get(0);
			tAdbook.setLeaf(false);
			this.getBaseDAO().update(tAdbook);
			bill.setLeaf(true);
		}
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opModifyTAdbooks(List<TCallAdbook> list) {
		for (int i = 0; i < list.size(); i++) {
			TCallAdbook bill = (TCallAdbook) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	public ViewData querySystems(AreaInfo areaInfo) {
		String hql = "from TCallAdbook _t1";
		return this.getBaseDAO().findView(areaInfo, hql);

	}

	public List getParentType() {
		return this.getBaseDAO().find(
				"select new list(code,name) from TCallAdbook");
	}

	public ViewData queryTAdbookNodes(String id) {
		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,_t1.supercode as pid,_t1.leaf as leaf) from TCallAdbook _t1 where _t1.supercode = '"
				+ id + "'";
		// String hql =
		// "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,_t1.supercode as pid,_t1.leaf as leaf) from TCallAdbook";
		return this.getBaseDAO().findView(hql);
	}

	// public ViewData queryTCallAdbook(AreaInfo areaInfo, String id) {
	// String hql = "from TCallAdbook _t1 where _t1.supercode like '" + id +
	// "%'";
	// return this.getBaseDAO().findView(areaInfo, hql);
	// }
	public ViewData queryTCallAdbook(AreaInfo areaInfo, String id) {
		String hql = "";
		if (null == id) {
			hql = "from TCallAdbook _t1 order by _t1.code";
		} else {
			hql = "from TCallAdbook _t1 where _t1.listcode like '" + id
					+ "%' order by _t1.code";

			List<TCallAdbook> list = this.getBaseDAO().find(hql);
			if (null != list && list.size() == 0) {
				hql = "from TCallAdbook _t1 where _t1.code like '" + id
						+ "%' order by _t1.code";
			}
		}
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public boolean getListCount(String code) {
		boolean flag;
		String hql = "from TCallAdbook _t1 where _t1.listcode like'" + code
				+ "%' order by _t1.code";
		List l = this.getBaseDAO().find(hql);
		if (l.size() == 0) {
			flag = false;
		} else {
			flag = true;
		}
		return flag;
	}

	public ViewData deleteAdlist(String code) {
		String hql = "from TCallAdlist _t1 where _t1.code = '" + code + "'";
		List l = this.getBaseDAO().find(hql);
		TCallAdlist t = (TCallAdlist) l.get(0);
		this.getBaseDAO().delete(t);
		return new ViewData();
	}

	public ViewData queryList(String id) {
		return qu.queryTCallAdlistNodes(id);
	}

	public ViewData newList(TCallAdlist bill) {
		return qu.opAddNewTCallAdlist(bill);
	}

	public ViewData queryAdlist(AreaInfo areaInfo, String id) {
		return qu.queryTCallAdlist(areaInfo, id);
	}

	public ViewData deleteAdlist(List<TCallAdlist> list) {
		return qu.opDeleteTCallAdlists(list);

	}

}