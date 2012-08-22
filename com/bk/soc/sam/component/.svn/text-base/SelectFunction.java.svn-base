package com.bk.soc.sam.component;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.StrUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_SelectFunction")
public class SelectFunction extends BaseBO
{
	public ViewData findFunctions(AreaInfo areaInfo, String otherConditions)
	{
		String hql = "select new map(_t1.hid as hid,_t1.functionId as functionId,_t1.functionName as functionName,_t1.componentId as componentId,_t2.componentName as componentName) from TFunction _t1,TComponent _t2 where _t1.componentId=_t2.componentId";
		hql += StrUtil.appendOtherConditions(otherConditions);
		return this.getBaseDAO().findView(areaInfo, hql);
	}
}