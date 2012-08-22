package com.bk.soc.call.kbm;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.id.BillId;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.kbm.data.TCallKbm;
import com.bk.soc.mdm.idao.ICallCodeBillDao;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

@Controller
@RemoteProxy(name = "call_KbmService")
public class KbmBO extends BaseBO implements KbmService {

	@Resource
	ICallCodeBillDao ccbd;
	
	
	public ICallCodeBillDao getCcbd() {
		return ccbd;
	}

	public void setCcbd(ICallCodeBillDao ccbd) {
		this.ccbd = ccbd;
	}

	public ViewData opDeleteTKbms(List<TCallKbm> list) {

		for (int i = 0; i < list.size(); i++) {
			TCallKbm bill = (TCallKbm) list.get(i);
			this.getBaseDAO().delete(bill);
			String hql = "from TCallKbm _t1 where _t1.supercode='"
					+ bill.getSupercode() + "'";
			List<TCallKbm> listKbm = this.getBaseDAO().find(hql);
			if (listKbm.size() == 0) {
				hql = "from TCallKbm _t1 where _t1.code='" + bill.getSupercode()+ "'";
				List<TCallKbm> listTKbm = this.getBaseDAO().find(hql);
				TCallKbm tKbm = listTKbm.get(0);
				tKbm.setLeaf(true);
				this.getBaseDAO().update(tKbm);
			}
		}

		return new ViewData();
	}

	public ViewData opAddNewTKbm(TCallKbm bill) {
		bill.setCode(ccbd.getBillCode("TCallKbm", bill.getSupercode(), "supercode","000"));
		bill.setPublishtime(new Date());
		bill.setLeaf(true);
		bill.setIstree("false");
		bill.setOrgz(this.getUserSession().getOrgzCode());
		bill.setPersoncode(this.getUserSession().getUserName());
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opModifyTKbms(TCallKbm bill) {
		this.getBaseDAO().update(bill);
		return new ViewData();
	}

	public ViewData querySystems(AreaInfo areaInfo) {
		String hql = "from TCallKbm _t1";
		return this.getBaseDAO().findView(areaInfo, hql);

	}

	public List getParentType() {
		return this.getBaseDAO().find(
				"select new list(code,name) from TCallKbm");
	}

	public ViewData queryTKbmNodes(String id) {
		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as text,_t1.supercode as pid,_t1.leaf as leaf) from TCallKbm _t1 where _t1.supercode = '"+ id + "'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryTPoses(AreaInfo areaInfo, String id) {
		String hql = "from TCallKbm _t1 where (_t1.supercode like '" + id + "%' or _t1.code = '"+id+"') and _t1.istree ='false'";
		try {
			return this.getBaseDAO().findView(areaInfo, hql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}

	/**
	 * 添加知识库目录树
	 */
	public ViewData opAddNewTreeTKbm(TCallKbm bill) {
		
		bill.setCode(ccbd.getBillCode("TCallKbm", bill.getSupercode(), "supercode","0"));
		bill.setPublishtime(new Date());
		bill.setLeaf(false);
		bill.setOrgz(this.getUserSession().getOrgzCode());
		bill.setPersoncode(this.getUserSession().getUserName());
		return this.getBaseDAO().saveView(bill);
	}
	/**
	 * 获取目录菜单
	 */
		public List getIsTree() {
			return this.getBaseDAO().find("select new list(code,name) from TCallKbm _t1 where _t1.istree= 'true'");
		}
}