package com.bk.soc.sam.placard;

import java.util.List;

import com.bk.soc.sam.placard.data.TPlacard;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface IPlacardService
{
	public ViewData queryPlacards(AreaInfo areaInfo);
	
	public ViewData queryPlacard(String number);
	
	public ViewData queryTopPlacards();
	
	public ViewData opPublish(TPlacard bill,List<String> orgzCodes);
	
	public ViewData opModify(TPlacard bill,List<String> orgzCodes);
	
	public ViewData opInvalid(TPlacard bill);
	
	public ViewData opDelete(TPlacard bill);
}
