package com.bk.soc.mdm.idao;
/**
 *@author:Jim
 *@email:38763179@qq.com
 *@createtime:2012-7-24
 *@description
 **/
public interface ICallCodeBillDao {

	/**
	 * 树形目录自动获取编码
	 * @param tableName T类
	 * @param superCode 父级id
	 * @param superName 父级字段名称
	 * @param swiftNumber 流水号
	 * @return
	 */
	public String getBillCode(String TName,String superCode,String superName,String swiftNumber);
	
}
