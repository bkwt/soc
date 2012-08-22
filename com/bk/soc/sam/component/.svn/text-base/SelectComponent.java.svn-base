package com.bk.soc.sam.component;

import org.fdm.core.base.BaseBO;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public class SelectComponent extends BaseBO{
	public ViewData findBeans(AreaInfo areaInfo)
	{
		String hql = "select new map(_t1.hid as hid,_t1.componentId as componentId,_t1.componentName as componentName) from TComponent _t1 ";
		return this.getBaseDAO().findView(areaInfo,hql);
	}
}
