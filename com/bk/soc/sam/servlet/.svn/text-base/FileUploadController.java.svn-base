package com.bk.soc.sam.servlet;

import java.io.File;
import java.util.Date;

import javax.servlet.ServletContext;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Controller //声明该类为控制器类
public class FileUploadController implements ServletContextAware{ //实现ServletContextAware接口，获取本地路径

 private ServletContext servletContext;

 public void setServletContext(ServletContext servletContext) { //实现接口中的setServletContext方法
  this.servletContext = servletContext;
 }

 @RequestMapping(value = "/upload", method = RequestMethod.POST) //将文件上传请求映射到该方法
 public String handleFormUpload(@RequestParam("name") String name, //设置请求参数的名称和类型
   @RequestParam("file") CommonsMultipartFile mFile) { //请求参数一定要与form中的参数名对应
  if (!mFile.isEmpty()) {
   String path = this.servletContext.getRealPath("/tmp/");  //获取本地存储路径
   File file = new File(path + new Date().getTime() + ".jpg"); //新建一个文件
   try {
    mFile.getFileItem().write(file); //将上传的文件写入新建的文件中
   } catch (Exception e) {
    e.printStackTrace();
   }
   
   return "redirect:uploadSuccess"; //返回成功视图
  }else {
   return "redirect:uploadFailure"; //返回失败视图
  }
 }
}


 