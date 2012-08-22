package com.bk.soc.sam.adquery;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.data.DataExporter;
import org.fdm.core.base.BaseBO;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.adquery.data.TField;
import com.bk.soc.sam.adquery.data.TModule;
import com.bk.soc.sam.adquery.data.TTable;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_AdvancedQueryConfigService")
public class AdvancedQueryConfigBO extends BaseBO implements IAdvancedQueryConfigService,ApplicationContextAware
{
	private ApplicationContext applicationContext;
	@Resource
	private DataExporter dataExporter;
	
	public DataExporter getDataExporter()
	{
		return dataExporter;
	}

	public void setDataExporter(DataExporter dataExporter)
	{
		this.dataExporter = dataExporter;
	}

	public AdvancedQueryConfigBO()
	{
		super(true);
	}
	
	public ViewData queryModule(String moduleId)
	{
		String hql="from TModule _t1 where _t1.moduleId=?";
		return this.getBaseDAO().findView(hql, new Object[]{moduleId});
	}

	public ViewData queryModules(AreaInfo areaInfo)
	{
		String hql="from TModule _t1";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData queryTables(String moduleId)
	{
		String hql="from TTable _t1 where _t1.moduleId=? order by _t1.tableType desc";
		return this.getBaseDAO().findView(hql, new Object[]{moduleId});
	}

	public ViewData queryTable(String moduleId, String tableName)
	{
		String hql="from TTable _t1 where _t1.moduleId=? and _t1.tableName=?";
		return this.getBaseDAO().findView(hql, new Object[]{moduleId,tableName});
	}

	public ViewData opAddNewTable(TTable bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opDeleteTables(List<TTable> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			String hql="from TField where moduleId=? and tableName=?";
			List l1=this.getBaseDAO().find(hql, new Object[]{list.get(i).getModuleId(),list.get(i).getTableName()});
			for (int j = 0; j < l1.size(); j++)
			{
				this.getBaseDAO().delete(l1.get(j));
			}
			this.getBaseDAO().delete(list.get(i));
		}
		return new ViewData();
	}

	public ViewData queryFields(String moduleId, String tableName)
	{
		String hql="from TField _t1 where moduleId=? and tableName=?";
		return this.getBaseDAO().findView(hql,new Object[]{moduleId,tableName});
	}

	public ViewData opGetFieldInfo(final String moduleId, final String tableName)
	{
		String hql="from TField _t1 where moduleId=? and tableName=?";
		List list= this.getBaseDAO().find(hql,new Object[]{moduleId,tableName});
		
		for (int i = 0; i < list.size(); i++)
		{
			this.getBaseDAO().delete(list.get(i));
		}
		
		String[] args=tableName.split("\\.");

		if(args.length!=7)
		{
			return new ViewData(false,"T��������д����:"+tableName);
		}
		
		String sysCode=args[3].toUpperCase();
		String realTableName=(sysCode+"."+sysCode+"_"+args[6].substring(1,args[6].length()));
		
		DataSource ds=(DataSource) applicationContext.getBean("dataSource");
		
		if(ds!=null)
		{
			JdbcTemplate jdbcTemplate=new JdbcTemplate(ds);
			
			jdbcTemplate.query("select * from "+realTableName+" where 1=2", new Object[]{}, new ResultSetExtractor(){

				public Object extractData(ResultSet rset) throws SQLException, DataAccessException
				{
					ResultSetMetaData rsetMetaData = rset.getMetaData();
					
					int columnCount=rsetMetaData.getColumnCount();
					
					for (int i = 0; i < columnCount; i++)
					{
						if(rsetMetaData.getColumnName(i+1).equals("hid"))
							continue;
						
						TField newField=new TField();
						newField.setModuleId(moduleId);
						newField.setTableName(tableName);
						newField.setFieldName(rsetMetaData.getColumnName(i+1));
						
						String fieldType=null;
						String columnTypeName=rsetMetaData.getColumnTypeName(i+1);
						if(columnTypeName.equals("varchar")||columnTypeName.equals("char"))
						{
							fieldType="char";
						}
						else if(columnTypeName.equals("numeric")||columnTypeName.equals("int")||columnTypeName.equals("float"))
						{
							fieldType="number";
						}
						else if(columnTypeName.equals("datetime"))
						{
							fieldType="date";
						}
						else
						{
							fieldType="unknow";
						}
						
						newField.setFieldType(fieldType);
						newField.setIsJoinField("N");
						
						getBaseDAO().save(newField);
					}
					return null;
				}});

			
			return new ViewData();
		}
		else
		{
			return new ViewData(false,"�Ҳ�������dataSource"+sysCode);
		}
	}

	public ViewData opModifyAllFields(List<TField> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			this.getBaseDAO().update(list.get(i));
		}
		
		return new ViewData();
	}

	public ViewData opDeleteFields(List<TField> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			this.getBaseDAO().delete(list.get(i));
		}
		return new ViewData();
	}

	public ViewData opModifyTable(TTable bill)
	{
		return this.getBaseDAO().updateView(bill);
	}

	public ViewData opAddNewModule(TModule bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opModifyModule(TModule bill)
	{
		return this.getBaseDAO().updateView(bill);
	}

	public ViewData opDeleteModule(TModule bill)
	{
		String hql="from TTable where moduleId=?";
		List<TTable> list=this.getBaseDAO().find(hql, new Object[]{bill.getModuleId()});
		
		this.opDeleteTables(list);

		return this.getBaseDAO().deleteView(bill);
	}

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException
	{
		this.applicationContext=applicationContext;
	}

	public ViewData opExportSQL(String moduleId)
	{
		this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_AdvancedQuery_Module","SAM.SAM_AdvancedQuery_Table","SAM.SAM_AdvancedQuery_Field"}, "_t1.moduleId='"+moduleId+"'", "�߼���ѯ"+moduleId);
		return new ViewData();
	}

	public ViewData opAddNewField(TField bill)
	{
		return this.getBaseDAO().saveView(bill);
	}
}
