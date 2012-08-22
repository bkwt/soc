package com.bk.soc.sam.role;

import java.util.List;

import com.bk.soc.sam.role.data.TRole;
import com.bk.soc.sam.role.data.TRoleFunction;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;


public interface IRoleService
{
	public ViewData queryRoles(AreaInfo areaInfo);
	
	public ViewData queryRole(String roleCode);
	//�������
	public ViewData opExportMenuData(AreaInfo areaInfo);
	//��ѯĳһ��ɫ�������û�
	public ViewData queryAllUser(String roleCode);
	//�Ƴ�û�м��صĹ���
	public ViewData opDeleteUseless(String roleCode);
	
	public ViewData opAddNewRole(TRole bill);
	
	public ViewData opModifyRole(TRole bill);
	
	public ViewData opDeleteRoles(List<TRole> list);
	
	public ViewData queryMenuAndFunctions(String roleCode,String menuCode);
	
	public ViewData queryComponents();
	
	public ViewData queryFunctions(String componentId);
	
	public ViewData hasFunction(String roleCode,String functionId);
	
	public ViewData opSaveRoleConfig(List<TRoleFunction> list);
	
	public ViewData findFunctions(AreaInfo areaInfo);
	
	public ViewData opCopyFromAdmin(String menuCode,String roleCode);
	
	public ViewData opRemoveFunctions(String menuCode,String roleCode);
	//�Ƴ�ѡ�в˵�
	public ViewData opRemoveSelectedFunctions(List list,String roleCode);
	//����˵�˳��
	public ViewData opUpdateMenuIndex(List<TRoleFunction> list);
}
