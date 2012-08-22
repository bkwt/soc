package com.bk.soc.sam.adquery;

import java.util.List;

import com.bk.soc.sam.adquery.data.TField;
import com.bk.soc.sam.adquery.data.TModule;
import com.bk.soc.sam.adquery.data.TTable;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface IAdvancedQueryConfigService
{
	public ViewData queryModules(AreaInfo areaInfo);
	
	public ViewData queryModule(String moduleId);
	
	public ViewData opDeleteModule(TModule bill);  
	
	public ViewData queryTables(String moduleId);
	
	public ViewData queryTable(String moduleId,String tableName);
	
	public ViewData opAddNewTable(TTable bill);
	
	public ViewData opDeleteTables(List<TTable> list); 
	
	public ViewData queryFields(String moduleId,String tableName);
	
	public ViewData opGetFieldInfo(String moduleId, String tableName);
	
	public ViewData opModifyAllFields(List<TField> list);
	
	public ViewData opDeleteFields(List<TField> list);
	
	public ViewData opModifyTable(TTable bill);
	
	public ViewData opAddNewModule(TModule bill);
	
	public ViewData opModifyModule(TModule bill);
	
	public ViewData opExportSQL(String moduleId);
	
	public ViewData opAddNewField(TField bill);
}
