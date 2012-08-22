package com.bk.soc.sam.idao;

import java.util.List;

public interface IToolConfigDAO 
{
	/**
	 * 根据areaCode查询对应区域的按钮操作记录
	 * **/
	public List getOpList(String beanCode,String areaCode);
	/**
	 * 根据areaCode查询对应区域的字段的初始值
	 * **/
	public List getFieldInit(String beanCode,String areaCode);
	/**
	 * 根据areaCode查询对应区域的controller方法
	 * **/
	public List getController(String beanCode,String areaCode);
	/**
	 * 根据beanCode业务对象信息
	 * **/
	public List getBeans(String beanCode);
}
