package com.bk.soc.sam.log;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.data.DataExporter;
import org.fdm.core.base.BaseBO;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_LogManagerService")
public class LogManagerBO extends BaseBO implements ILogManagerService
{
	@Resource
	private DataExporter dataExporter;
	
	public void setDataExporter(DataExporter dataExporter)
	{
		this.dataExporter = dataExporter;
	}
	
	public ViewData queryOperaterLogs(AreaInfo areaInfo)
	{
		String hql="select new map(_t1.hid as hid,_t1.componentId as componentId,_t2.componentName as componentName,_t1.methodName as methodName,_t1.billId as billId,_t1.userName as userName,_t1.operaterDate as operaterDate,_t1.note as note,_t1.requestIP as requestIP) from TOperaterLog _t1,TComponent _t2 where _t1.componentId=_t2.componentId order by _t1.operaterDate DESC";
		return this.getBaseDAO().findBigView(areaInfo, hql);
	}

	public ViewData opExportLog(Date untilDate)
	{
		DateTime udate=new DateTime(untilDate);
		
		DateTimeFormatter dtf=DateTimeFormat.forPattern("yyyy-MM-dd");
		
		this.dataExporter.exportDataToSQL("SAM.SAM_OperaterLog", "DATEDIFF(day,operaterDate,'"+udate.toString(dtf)+"')>0", "��־���");
		
		String hql="delete from TOperaterLog _t1 where DATEDIFF(day,_t1.operaterDate,'"+udate.toString(dtf)+"')>0";
		this.getBaseDAO().execute(hql);
		return new ViewData();
	}
	
	public List getSystems()
	{
		return this.getBaseDAO().find("select new list(code,name) from TSystem");
	}
}
