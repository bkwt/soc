package com.bk.soc.sam.servlet;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.SessionFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.bk.soc.sam.message.data.TMessage;

public class FileDownLoad  extends HttpServlet implements javax.servlet.Servlet
{
	private static final long serialVersionUID = -8168860918734006971L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		processRequest(request, response);
	}
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setCharacterEncoding("UTF-8");
		request.setCharacterEncoding("UTF-8");
		
		String messageCode = request.getParameter("messageCode");
		
		ServletContext sc = request.getSession().getServletContext();
		ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(sc);
		
		SessionFactory sessionFactory=(SessionFactory) ac.getBean("sessionFactory");
		
		
		String hql="from TMessage _t1 where messageCode='"+messageCode+"'";		
		List<TMessage> list =sessionFactory.openSession().createQuery(hql).list();
		if(list.size()>0)
		{
			TMessage tr = (TMessage)list.get(0);
			System.out.println(tr.getReceiverName());
			System.out.println(tr.getFileName());
			System.out.println(tr.getFileData());
			if(tr.getFileName()==null || tr.getFileData().length<1)
			{
				response.getOutputStream().println("<script>alert(0);</script>");
			}
			else
			{
				try
				{
					response.reset();
					response.setContentType("application/x-msdownload");
					response.setContentLength(tr.getFileData().length);
					response.setHeader("Content-Disposition",   "attachment;   filename="+URLEncoder.encode(list.get(0).getFileName(),"UTF-8"));
					response.getOutputStream().write(tr.getFileData());
					response.getOutputStream().flush();
					response.getOutputStream().close(); 
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			}
		}
		else
		{
			response.getOutputStream().println("<script>alert(0);</script>");
		}
		response.getOutputStream().close();
	}
}
