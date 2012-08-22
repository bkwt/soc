package com.bk.soc.sam.shared;

import javax.annotation.Resource;

import org.fdm.core.service.FileResourceService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.fileresource.data.TFileResource;
@Controller("fileResourceService")
public class FileResourceServiceImpl implements
		FileResourceService
{
	@Resource
	private SessionFactory sessionFactory;
	


	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public void setSessionFactory(SessionFactory sf)
	{
		this.sessionFactory = sf;
		
	
	}

	public SessionFactory getSessionFactory()
	{
		return this.sessionFactory;
	}
	
	public boolean deleteFile(Long fileId)
	{
		if(fileId==null)
			return false;
		
		Object file=getSession().get(TFileResource.class, fileId);
		
		if(file!=null)
		{
			getSession().delete(file);
			return true;
		}
		else
		{
			return false;
		}
	}

	public TFileResource getFile(Long fileId)
	{
		return (TFileResource)this.getSession().get(TFileResource.class, fileId);
	}

	public boolean modifyFile(TFileResource file)
	{//TODO
		return false;
	}

}
