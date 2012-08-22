package com.bk.soc.sam.component;

import java.util.List;

import com.bk.soc.sam.component.data.TBillfieldsdef;
import com.bk.soc.sam.component.data.TBillpkruledef;
import com.bk.soc.sam.component.data.TBillpkruledetail;
import com.bk.soc.sam.shared.data.ViewData;

public interface IComponentPKRuleService
{
	public ViewData queryPKRules(String componentId);
	
	public ViewData opAddNewPKRule(TBillpkruledef bill);
	
	public ViewData queryPKRule(String componentId,String pkruleCode);
	
	public ViewData queryPKRuleDetails(String componentId,String pkruleCode);
	
	public ViewData queryFields(String componentId,String pkruleCode);
	
	public ViewData opAddNewField(TBillfieldsdef bill);
	
	public ViewData opAddNewPKRuleDetail(TBillpkruledetail bill);
	
	public ViewData opModifyPKRules(List<TBillpkruledef> list);
	
	public ViewData opDeletePKRules(List<TBillpkruledef> list);
	
	public ViewData opModifyFields(List<TBillfieldsdef> list);
	
	public ViewData opDeleteFields(List<TBillfieldsdef> list);
	
	public ViewData opModifyPKRuleDetails(List<TBillpkruledetail> list);
	
	public ViewData opDeletePKRuleDetails(List<TBillpkruledetail> list);
	//----------------------------------------------------------
	public String myTestPKRule(String pkruleCode);
	
	public List getFields(String componentId, String pkruleCode);
	
	public List getFuncs();
}
