package com.bk.soc.sam.log;

import java.util.Date;
import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface ILogManagerService
{
	public ViewData queryOperaterLogs(AreaInfo areaInfo);
	
	public ViewData opExportLog(Date untilDate);
	
	public List getSystems();
}
