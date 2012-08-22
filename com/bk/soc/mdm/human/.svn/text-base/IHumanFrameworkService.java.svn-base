package com.bk.soc.mdm.human;

import java.util.List;


import com.bk.soc.mdm.human.data.TOrgz;
import com.bk.soc.mdm.human.data.TPerson;
import com.bk.soc.mdm.human.data.TPos;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

public interface IHumanFrameworkService// 企业人力组织机构：人员、部门、岗位。
{

	/**
	 * 部分查询树，仅限部门使用
	 * @param id
	 * @return
	 */
	public ViewData queryOrgNodes(String id);
	/*
	 * 
	 * /*** 查询部门树数据
	 * 
	 * @param id
	 * 
	 * @return
	 */
	public ViewData queryOrgzNodes(String id);

	/***
	 * 根据树节点值查询相应数据
	 * 
	 * @param areaInfo
	 * @param id
	 * @return
	 */
	public ViewData queryTOrgz(AreaInfo areaInfo, String id);

	/***
	 * 增加部门
	 * 
	 * @param bill
	 * @return
	 */
	public ViewData opAddNewTOrgz(TOrgz bill);

	/***
	 * 修改部门
	 * 
	 * @param list
	 * @return
	 */
	public ViewData opModifyTOrgzs(List<TOrgz> list);

	/***
	 * 删除部门
	 * 
	 * @param list
	 * @return
	 */
	public ViewData opDeleteTOrgzs(List<TOrgz> list);

	/***
	 * 部门树取出岗位数据
	 * 
	 * @param areaInfo
	 * @param id
	 * @return
	 */
	public ViewData queryTPosAreaData(AreaInfo areaInfo, String id);

	/**
	 * 增加岗位
	 * 
	 * @param bill
	 * @return
	 */
	public ViewData opAddNewTPos(TPos bill);

	/***
	 * 更新岗位
	 * 
	 * @param list
	 * @return
	 */
	public ViewData opModifyTPos(List<TPos> list);

	/***
	 * 删除岗位
	 * 
	 * @param list
	 * @return
	 */
	public ViewData opDeleteTPos(List<TPos> list);

	/***
	 * 根据部门查询人员
	 * 
	 * @param areaInfo
	 * @param id
	 * @return
	 */
	public ViewData queryTPersonAreaData(AreaInfo areaInfo, String id);

	/***
	 * 增加人员
	 * 
	 * @param bill
	 * @return
	 */
	public ViewData opAddNewPerson(TPerson bill);

	/***
	 * 修改人员
	 * 
	 * @param list
	 * @return
	 */
	public ViewData opModfiyTPerson(TPerson bill);

	/***
	 * 删除人员
	 * 
	 * @param list
	 * @return
	 */
	public ViewData opDeleteTPerson(List<TPerson> list);
	/***
	 * 获取岗位树
	 * @return
	 */
	public List getTPos();
	/***
	 * 查询所有部门
	 * @return
	 */
	public List getTOrgz();
	/**
	 * 根据部门编码查询岗位
	 * @param orgzCode
	 * @return
	 */
	public List getTPosOrgzCode(String orgzCode);
	
	public ViewData queryTPersonAreaDataForm(AreaInfo areaInfo, String id);
	
}
