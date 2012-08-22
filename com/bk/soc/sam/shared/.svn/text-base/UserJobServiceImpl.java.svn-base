package com.bk.soc.sam.shared;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.container.ComponentManager;
import org.fdm.container.unit.BusinessComponent;
import org.fdm.container.unit.Function;
import org.fdm.core.data.UserSession;
import org.fdm.core.service.UserJobService;
import org.fdm.core.tools.Clogger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;

import com.bk.soc.sam.component.data.TComponent;
import com.bk.soc.sam.shared.data.TUserJob;
import com.bk.soc.sam.shared.data.ViewData;
@Service("userJobService")
@RemoteProxy(name="userJobDAO")  
public class UserJobServiceImpl implements UserJobService
{
	@Resource
	private SessionFactory sessionFactory;
	private Session session;
	
	@Resource
	private ComponentManager componentManager;
	
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

	public void setComponentManager(ComponentManager componentManager)
	{
		this.componentManager = componentManager;
	}

	public SessionFactory getSessionFactory()
	{
		return sessionFactory;
	}

	public boolean addAuditJob(String componentId, String userID, String billId)
	{
		String hql = "from TUserJob where componentId=? and userID=? and billId=?";

		Query query = getSession().createQuery(hql);
		 query.setString(0, componentId);
		 query.setString(1, userID);
		 query.setString(2, billId);
		 List<TUserJob> l1 = query.list();
		 
		if (l1.size() == 0)
		{

			String beanName = "业务对象名称未定义";

			hql = "from TComponent where componentId=?";
			query = getSession().createQuery(hql);
			 query.setString(0, componentId);
			 List<TComponent> list = query.list();
			 
			if (list.size() > 0)
			{
				TComponent tBean = list.get(0);
				if (tBean.getComponentName() != null)
				{
					beanName = tBean.getComponentName() + "审核";
				}
				else
				{
					Clogger.logError("业务对象无名称");
					return false;
				}
			}
			else
			{
				Clogger.logError("无业务对象定义");
				return false;
			}

			TUserJob tUserJob = new TUserJob();

			tUserJob.setComponentId(componentId);
			tUserJob.setBeanName(beanName);
			tUserJob.setUserID(userID);
			tUserJob.setBillId(billId);
			tUserJob.setJobType("AUDIT");
			tUserJob.setIsComplete("N");

			getSession().save(tUserJob);
		}
		else
		{
			TUserJob tUserJob = l1.get(0);
			tUserJob.setIsComplete("N");
			getSession().update(tUserJob);
		}

		getSession().flush();

		return true;
	}

	public boolean addJob(String componentId, String jobName, String userID, String billId, String jobType)
	{
		String hql = "from TUserJob where componentId=? and userID=? and billId=?";

		Query query = getSession().createQuery(hql);
		 query.setString(0, componentId);
		 query.setString(1, userID);
		 query.setString(2, billId);
		 List<TUserJob> l1 = query.list();
		 
		if (l1.size() == 0)
		{
			TUserJob tUserJob = new TUserJob();

			tUserJob.setComponentId(componentId);
			tUserJob.setBeanName(jobName);
			tUserJob.setUserID(userID);
			tUserJob.setBillId(billId);
			tUserJob.setJobType(jobType);
			tUserJob.setIsComplete("N");

			getSession().save(tUserJob);
		}
		else
		{
			TUserJob tUserJob = l1.get(0);
			tUserJob.setIsComplete("N");
			getSession().update(tUserJob);
		}
		return true;
	}

	public ViewData getUserJobURL(String userID, String componentId, String jobType)
	{
		String hql = "from TUserJob where userID=? and componentId=? and jobType=? and isComplete='N'";
		Query query = getSession().createQuery(hql);
		 query.setString(0, userID);
		 query.setString(1, componentId);
		 query.setString(2, jobType);
		 List<TUserJob> list = query.list();
		 
		if (list.size() == 0)
		{
			return new ViewData(false, "您的待办工作已经过期,可能已由其他人完成.");
		}
		else
		{
			BusinessComponent component= componentManager.getComponent(componentId);
			
			if(component==null)
			{
				return new ViewData(false, "找不到待办事项对应的业务构件配置信息,业务构件可能已经被移除.请和管理员联系.");
			}
			
			List<Function> functions=component.getFunctions();
			
			for (int i = 0; i < functions.size(); i++)
			{
				if(jobType.equals(functions.get(i).getJobType()))
				{
					ViewData viewData = new ViewData();
					viewData.addNewPrimaryKey("menuCode", functions.get(i).getId());
					viewData.addNewPrimaryKey("menuName", functions.get(i).getName());
					viewData.addNewPrimaryKey("url", functions.get(i).getUrl());
					viewData.addNewPrimaryKey("progParams", functions.get(i).getProgParams());
					return viewData;
				}
			}
			
			return new ViewData(false, "业务构件中没有定义该类型的用户任务,任务类型:"+jobType);
			
			
			/*hql = "from TUserJobConfig where componentId=? and jobType=?";
			List<TUserJobConfig> l1 = this.getHibernateTemplate().find(hql, new Object[] {
					componentId, jobType
			});

			if (l1.size() == 0)
			{
				return new ViewData(false, "找不到待办事项对应的业务对象配置信息,请和管理员联系.");
			}
			else
			{
				hql = "from TMenu where menuCode=?";
				List<TMenu> l2 = this.getHibernateTemplate().find(hql, new Object[] {
					l1.get(0).getMenuCode()
				});

				if (l2.size() == 0)
				{
					return new ViewData(false, "待办事项的业务对象配置中所配置的菜单信息无效,请和管理员联系.");
				}
				else
				{
					TMenu tMenu = l2.get(0);
					if (tMenu.getProgUrl() == null)
					{
						return new ViewData(false, "待办事项的业务对象配置中的菜单地址无效,请和管理员联系.");
					}
					else
					{
						ViewData viewData = new ViewData();
						viewData.addNewPrimaryKey("menuCode", tMenu.getMenuCode());
						viewData.addNewPrimaryKey("menuName", tMenu.getMenuName());
						viewData.addNewPrimaryKey("url", tMenu.getProgUrl());
						viewData.addNewPrimaryKey("progParams", tMenu.getProgParam());
						return viewData;
					}
				}

			}*/
		}
	}

	public List getJobs(String  userId)
	{
		String hql = "select new map(count(componentId) as msgCount,userID as userID,componentId as componentId,beanName as beanName,jobType as jobType) from TUserJob where  userID=? and isComplete='N' group by componentId,beanName,userID,jobType";
		Query query = getSession().createQuery(hql);
		query.setString(0, userId);
		return query.list();
		
	}
	
	public List queryWarnings(UserSession userSession)
	{
//		设备润滑任务
		if(userSession==null)
		{
			return new ArrayList();
		}
		
		String hql="select new map(count(componentId) as msgCount,userID as userID,componentId as componentId,beanName as beanName,jobType as jobType) from TUserJob where  userID=? and isComplete='N' and (jobType<>'AUDIT') group by componentId,beanName,userID,jobType";
		
		 Query query = getSession().createQuery(hql);
		 query.setString(0, userSession.getOrgzCode());
		return query.list();
	}

	public boolean setJobComplated(String componentId, String userID, String billId, String jobType)
	{
		String hql = "from TUserJob where componentId=? and userID=? and billId=? and jobType=?";

		Query query = getSession().createQuery(hql);
		query.setString(0, componentId);
		query.setString(1, userID);
		query.setString(2, billId);
		query.setString(3, jobType);
		List<TUserJob> list = query.list();
		if (list.size() > 0)
		{
			getSession().delete(list.get(0));
			getSession().flush();
			return true;
		}
		else
		{
			return false;
		}
	}

	public boolean setAuditJobComplated(String componentId, String userID, String billId)
	{
		return this.setJobComplated(componentId, userID, billId, "AUDIT");
	}

}
