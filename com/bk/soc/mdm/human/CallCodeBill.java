package com.bk.soc.mdm.human;

import java.util.List;

import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.mdm.idao.ICallCodeBillDao;

/**
 * @author:段尚
 * @email:38763179@qq.com
 * @createtime:2012-7-24
 * @description code自动生成
 **/
@Controller
public class CallCodeBill extends BaseBO implements ICallCodeBillDao {

	public String getBillCode(String tableName, String superCode,
			String superName,String swiftNumber) {
		/**
		 * 默认根节点为root
		 */
		String codeName = "code";
		String root = "root";
		String liucode = swiftNumber; // 级别定义流水号
		List list = null;
		if (null == superCode) {
			// 默认superCode为 root
			superCode = root;
		}
		System.out.println("===========自动生成code starting===============");
		String sql = "select _t1." + codeName + " from " + tableName
				+ " _t1 where _t1." + superName + " = '" + superCode
				+ "' order by _t1." + codeName + " desc";
		System.out.println(sql);
		try {
			list = this.getBaseDAO().find(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String code = "";
		String tempCode = "";
		/******* 流水号999位 start ********/

		// 如果code 里面包含root ，去掉root后+1
		if (list.size() != 0) {
			// 001
			//如果不是跟节点，按照规则，父级节点的长度一定小于子节点的长度
			if (!superCode.equals(root)) {
				if (superCode.length() < list.get(0).toString().length()) {
					tempCode = String.valueOf(Integer.parseInt(list
							.get(0)
							.toString()
							.substring(superCode.length(),
									list.get(0).toString().length())) + 1);

				} else {
					tempCode = String.valueOf(Integer.parseInt(list.get(0)
							.toString()) + 1);
				}
			}else{ //如果是跟节点，另当别论
				tempCode = String.valueOf(Integer.parseInt(list.get(0).toString()) + 1);
			}
			code = list.get(0).toString().substring(0,list.get(0).toString().length() - tempCode.length())+ tempCode;
			// 2
			// 003001001001 002
			
		} else {
			if (!superCode.equals(root)) {
				code = superCode + liucode + 1;
			} else {
				code = liucode + 1;
			}
		}
		System.out.println("===========自动生成code end===============");
		System.out.println("===========code:" + code + "===============");
		/******* 流水号999位 end ********/
		return code;
	}
}
