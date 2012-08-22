package com.bk.soc.sam.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

 

@WebServlet(name="Upload",urlPatterns="/Upload")

@MultipartConfig//标识Servlet支持文件上传

public class FileUpLoad extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		doPost( request,  response);
	}
	

   protected void doPost(HttpServletRequest request, HttpServletResponse response)

            throws ServletException, IOException {
	  

        request.setCharacterEncoding("utf-8");

        response.setCharacterEncoding("utf-8");

        response.setContentType("text/html;charset=utf-8");

         

        //存储路径

        String storePath = request.getServletContext().getRealPath("/");

         
        String name = request.getParameter("name");
        Part part = request.getPart("file");
        //把文件写到指定路径
        part.write(storePath+"upload//"+name);

   }
 

}