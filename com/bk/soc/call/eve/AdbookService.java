package com.bk.soc.call.eve;
/**
 * @author xiehongbo
 * @version 创建时间：2012-7-16 下午2:45:27
 * @Description
 */



import java.util.List;

import com.bk.soc.call.def.data.TCallAdlist;
import com.bk.soc.call.eve.data.TCallAdbook;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface AdbookService
{
	public ViewData opAddNewTAdbook(TCallAdbook bill);
	
	public ViewData opModifyTAdbooks(List<TCallAdbook> list);
	
	public ViewData opDeleteTAdbooks(List<TCallAdbook> list);
	
	public ViewData querySystems(AreaInfo areaInfo);
	
	public ViewData queryTAdbookNodes(String id);
	
	public ViewData queryTCallAdbook(AreaInfo areaInfo,String id);
	
	public List getParentType();
	//public ViewData queryAdlist(String id);
	public ViewData queryList(String id);
	
	public ViewData newList(TCallAdlist bill);
	public ViewData queryAdlist(AreaInfo areaInfo,String id);
	public ViewData deleteAdlist(String code);
	public boolean getListCount(String code);
	
	
	
}