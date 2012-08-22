package com.bk.soc.call.kbm;
/**
 * @author xiehongbo
 * @version 创建时间：2012-7-16 下午2:45:27
 * @Description
 */



import java.util.List;

import com.bk.soc.call.kbm.data.TCallKbm;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;



public interface KbmService
{
	//新增内容
	public ViewData opAddNewTKbm(TCallKbm bill);
	//新增树形
	public ViewData opAddNewTreeTKbm(TCallKbm bill);
	
	public ViewData opModifyTKbms(TCallKbm bill);
	
	public ViewData opDeleteTKbms(List<TCallKbm> list);
	
	public ViewData querySystems(AreaInfo areaInfo);
	
	public ViewData queryTKbmNodes(String id);
	
	public ViewData queryTPoses(AreaInfo areaInfo,String id);
	
	public List getParentType();
	
	public List getIsTree();
}