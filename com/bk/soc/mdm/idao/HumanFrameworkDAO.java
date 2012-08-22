package com.bk.soc.mdm.idao;

import java.util.List;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;


public interface HumanFrameworkDAO {
	/***
	 * 查询所有部门
	 * 
	 * @return
	 */
	public List getTOrgz();

	/**
	 * 查询部门树
	 */
	public ViewData queryOrgzNodes(String id);

	/**
	 * 树节点点击事件
	 */
	public ViewData queryTOrgz(AreaInfo areaInfo, String id);

	/***
	 * 根据部门查询人员
	 */
	public ViewData queryTPersonAreaData(AreaInfo areaInfo, String id);
}
