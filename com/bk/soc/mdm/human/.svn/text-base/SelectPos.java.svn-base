package com.bk.soc.mdm.human;

import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public class SelectPos extends BaseBO
{
	
	public ViewData findPoses(AreaInfo areaInfo,String otherConditions)
	{
		return this.findPos(areaInfo, "root", otherConditions);
	}
	
	public ViewData findPosNode(String id,String otherConditions)
	{
		String hql = "select new map(_t1.hid as hid,_t1.code as id,_t1.name as name,_t1.superCode as pid,_t1.isLeaf as isLeaf) from TOrgz _t1 where _t1.superCode='" + id + "'and 1=1";
		hql+=StrUtil.appendOtherConditions(otherConditions);	
		return this.getBaseDAO().findView(hql);
	}
	
	public ViewData findPos(AreaInfo areaInfo,String id,String otherConditions)
	{
		String hql="select new map(_t1.hid as hid, _t1.code as code ,_t1.name as name ,_t1.orgzCode as orgzCode,_t2.name as orgzName ,_t1.note as note ,_t1.state as state) from TPos _t1,TOrgz _t2 where 1=1 and _t1.orgzCode=_t2.code order by _t1.code desc";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		if(id!=null&&!id.equals("root")){
			hql+=StrUtil.appendOtherConditions("_t1.orgzCode like'"+id+"%'");
		}
		return this.getBaseDAO().findView(areaInfo,hql);
	}
}
