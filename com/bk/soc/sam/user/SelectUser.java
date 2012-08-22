package com.bk.soc.sam.user;


import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_SelectUser")
public class SelectUser extends BaseBO
{
	public ViewData findUsers(AreaInfo areaInfo,String otherConditions)
	{
		String hql = "select new map(_t1.hid as hid,_t1.logID as logID,_t1.userID as userID,_t1.userName as userName,_t1.orgzName as orgzName,_t1.posName as posName) from VUser _t1 where 1=1";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		return this.getBaseDAO().findView(areaInfo,hql);
	}
	/*
	public ViewData findUserNode(String id,String otherConditions)
	{
		List l1=this.getOrgzDAO().findOrgzNodes(id, otherConditions);
		
		String hql="select new map(_t1.code as id,_t1.code as code ,_t1.name as name ,_t1.orgz as pid,1 as isLeaf,_t1.logID as logID) from VUser _t1 where _t1.orgz='"+id+"'";
		hql+=StrUtil.appendOtherConditions(otherConditions);
		
		List l2=this.getBaseDAO().find(hql);
		
		l1.addAll(l2);
		
		ViewData viewData=new ViewData();
		viewData.setResultList(l1);
		
		return viewData;
	}*/
}
