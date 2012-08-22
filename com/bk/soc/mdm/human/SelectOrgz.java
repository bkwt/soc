package com.bk.soc.mdm.human;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="MDM_SelectOrgz")
public class SelectOrgz extends BaseBO{
	
	public ViewData findOrgzs(AreaInfo areaInfo,String otherConditions)
	{
		return this.findOrgz(areaInfo, "root", otherConditions);
	}
	
	public ViewData findOrgzNodes(String id,String treeConditions){
		
		String hql="select new map(_t1.hid as hid,_t1.code as id,_t1.name as text ,_t1.superCode as pid,_t1.leaf as leaf) from TOrgz _t1 where _t1.superCode='"+id+"' and 1=1";
		hql+=StrUtil.appendOtherConditions(treeConditions);
		System.out.println(hql);
		return this.getBaseDAO().findView(hql);
	}
	
	public ViewData findOrgz(AreaInfo areaInfo,String id,String otherConditions){
		String hql="select new map(_t1.hid as hid,_t1.code as code,_t1.orgzLevel as orgzLevel,_t1.name as name,_t1.superCode as superCode,_t1.type as type,_t1.note as note,_t1.state as state,_t2.name as superName) from TOrgz _t1,TOrgz _t2 where _t2.code= _t1.superCode and 1=1 order by _t1.code desc";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		if(id!=null&&!"root".equals(id))
		{
			hql+=StrUtil.appendOtherConditions("_t1.superCode like '"+id+"%'");
		}
		return this.getBaseDAO().findView(areaInfo,hql);
	}
}
