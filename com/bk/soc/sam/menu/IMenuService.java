package com.bk.soc.sam.menu;

import java.util.List;

import com.bk.soc.sam.menu.data.TMenu;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface IMenuService
{
	public ViewData opAddNewMenu(TMenu menu);

	public ViewData opModifyMenus(List<TMenu> list);

	public ViewData opDeleteMenus(List<TMenu> list);
	
	public ViewData queryMenus(AreaInfo areaInfo);
	
	public ViewData opExportMenuData(AreaInfo areaInfo);
}
