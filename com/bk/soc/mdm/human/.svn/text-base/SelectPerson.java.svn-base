package com.bk.soc.mdm.human;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@RemoteProxy(name="MDM_SelectPerson")
public class SelectPerson extends BaseBO
{
	
	public ViewData findPersons(AreaInfo areaInfo,String otherConditions)
	{
		return this.findPersonDetails(areaInfo, "root", otherConditions);
	}
	
	public ViewData findOrgzNode(String id,String otherConditions)
	{
		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.code as code,_t1.name as name,_t1.superCode as pid,_t1.isLeaf as isLeaf,_t1.state as state) from TOrgz _t1 where _t1.superCode='" + id + "')";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		ViewData viewData=this.getBaseDAO().findView(hql);		
		return viewData;
	}
	
	public ViewData findPersonDetails(AreaInfo areaInfo,String id,String otherConditions)
	{
		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.code as code,_t1.name as name,_t1.birthday as birthday,_t1.idcard as idcard,_t1.orgz as orgz,_t1.pos as pos,_t2.name as orgzName,_t3.name as posName,_t1.telephone as telephone,_t1.sex as sex,_t1.state as state) from TPerson _t1,TOrgz _t2,TPos _t3 where _t1.orgz = _t2.code and _t1.pos = _t3.code order by  _t1.code desc";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		if(id!=null&&!"root".equals(id))
		{
			hql+=StrUtil.appendOtherConditions("_t1.orgz like'"+id+"%'");
		}
		return this.getBaseDAO().findView(areaInfo,hql);
	}
}
