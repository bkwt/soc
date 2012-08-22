package com.bk.soc.sam.shared;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.service.AdvancedQueryService;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.QueryData;
import com.bk.soc.sam.shared.data.TQueryProject;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="advancedQueryService")
public class AdvancedQueryServiceImpl implements AdvancedQueryService
{
	@Resource
	private SessionFactory sessionFactory;
	private Session session;

	public void setSessionFactory(SessionFactory sessionFactory)
	{
		this.sessionFactory = sessionFactory;
	}

	public Session getSession()
	{
		if(session == null)
			this.session = sessionFactory.openSession();
		return this.session;
	}
	
	public QueryData getQueryData(String moduleId)
	{
		try {
			QueryData adQueryInfo=new QueryData();
			
			String hql="select new map(_t1.fieldName as fieldName,_t1.fieldText as fieldText,_t1.fieldType as fieldType,_t1.tableName as tableName,_t2.tableType as tableType,_t1.isJoinField as isJoinField) from TField _t1,TTable _t2 where _t1.moduleId=_t2.moduleId and _t1.tableName=_t2.tableName and _t1.moduleId=?";
			Query query  = getSession().createQuery(hql);
			query.setString(0, moduleId);
			List<Map> list = query.list();
			List jionFields=new ArrayList();
			
			for (int i = 0; i < list.size(); i++)
			{
				if(list.get(i).get("isJoinField").equals("Y"))
				{
					jionFields.add(list.get(i).get("fieldName"));
				}
			}
			
			adQueryInfo.setFieldList(list);
			adQueryInfo.setJoinFields(jionFields);

			return adQueryInfo;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}return null;
	}

	public ViewData queryProject(String moduleId)
	{
		String hql="select new map(_t1.queryProjectName as queryProjectName,_t1.queryProjectJSON as queryProjectJSON) from TQueryProject _t1 where moduleId=?";
		Query query  = getSession().createQuery(hql);
		query.setString(0, moduleId);
		List list = query.list();
		
		ViewData viewData=new ViewData();
		viewData.setResultList(list);
		
		return viewData;
	}

	public boolean saveQueryProject(String moduleId,String queryProjectName, String queryProjectJSON)
	{
		try {
			String hql="from TQueryProject _t1 where moduleId=? and queryProjectName=?";
			Query query  = getSession().createQuery(hql);
			query.setString(0, moduleId);
			query.setString(1, queryProjectName);
			List<TQueryProject> list = query.list();
			
			TQueryProject tQueryProject=null;
			
			if(list.size()==0)
				tQueryProject=new TQueryProject();
			else
				tQueryProject=list.get(0);
				
			tQueryProject.setModuleId(moduleId);
			tQueryProject.setQueryProjectName(queryProjectName);
			tQueryProject.setQueryProjectJSON(queryProjectJSON);
			
			this.getSession().saveOrUpdate(tQueryProject);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return true;
	}

	public boolean deleteQueryProject(String moduleId, String queryProjectName)
	{
		String hql="from TQueryProject _t1 where moduleId=? and queryProjectName=?";
		Query query  = getSession().createQuery(hql);
		query.setString(0, moduleId);
		query.setString(1, queryProjectName);
		List<TQueryProject> list = query.list();
		
		if(list.size()>0)
			this.getSession().delete(list.get(0));
		return true;
	}
}
