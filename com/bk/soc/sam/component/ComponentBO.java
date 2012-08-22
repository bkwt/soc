package com.bk.soc.sam.component;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.data.DataExporter;
import org.fdm.bill.id.BillId;
import org.fdm.bill.id.BillIdDBTest;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.component.data.TAuditFlow;
import com.bk.soc.sam.component.data.TAuditRuleExpression;
import com.bk.soc.sam.component.data.TAuditStep;
import com.bk.soc.sam.component.data.TBillfieldsdef;
import com.bk.soc.sam.component.data.TBillpkruledef;
import com.bk.soc.sam.component.data.TBillpkruledetail;
import com.bk.soc.sam.component.data.TComponent;
import com.bk.soc.sam.component.data.TSmsAuditConfig;
import com.bk.soc.sam.idao.IComponentDAO;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller("SAM_ComponentBO")
@RemoteProxy(name="SAM_ComponentService")
public class ComponentBO extends BaseBO implements IComponentService,IComponentDAO
{
	@Resource
	private BillIdDBTest billIdTest;
	@Resource
	private DataExporter dataExporter;
	
	
	public DataExporter getDataExporter()
	{
		return dataExporter;
	}

	public void setDataExporter(DataExporter dataExporter)
	{
		this.dataExporter = dataExporter;
	}
	
	
	
	public ViewData opAddNewBean(TComponent bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opDeleteBean(TComponent bill)
	{
		String hql="from TBillpkruledef where componentId=?";
		List<TBillpkruledef> l1=this.getBaseDAO().find(hql,new Object[]{bill.getComponentId()});
		this.opDeletePKRules(l1);
		
		hql="from TAuditFlow where componentId=?";
		List<TAuditFlow> l2=this.getBaseDAO().find(hql,new Object[]{bill.getComponentId()});
		this.opDeleteAuditFlows(l2);
		
		hql="from TSmsAuditConfig _t1 where _t1.componentId=?";
		List<TSmsAuditConfig> l4=this.getBaseDAO().find(hql,new Object[]{bill.getComponentId()});
		for (int i = 0; i < l4.size(); i++)
		{
			this.getBaseDAO().delete(l4.get(i));
		}
		
		return this.getBaseDAO().deleteView(bill);
	}

	public ViewData opModifyBean(TComponent bill)
	{
		return this.getBaseDAO().updateView(bill);
	}

	public ViewData queryBean(String componentId)
	{
		String hql = "from TComponent _t1 where _t1.componentId='" + componentId + "'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryBeans(AreaInfo areaInfo)
	{
		String hql = "from TComponent _t1 where valid='Y'";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData queryPKRules( String componentId)
	{
		String hql = "from TBillpkruledef _t1 where _t1.componentId='"
				+ componentId + "'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData opAddNewPKRule(TBillpkruledef bill)
	{
		BillId bi = this.getBillId();
			
			String tName=bill.getBilltableName();
			tName=tName.substring(tName.lastIndexOf(".")+1,tName.length());
			
			Map m = bi.getMapFromBean(bill);
			m.put("tName", tName);
			m.put("billType", "PKRule");
			bi.put(m);
			String pkruleCode = bi.nextBillId();
			bill.setPkruleCode(pkruleCode);
		
		
		ViewData viewData=this.getBaseDAO().saveView(bill);
		
		viewData.addNewPrimaryKey("pkruleCode", pkruleCode);
		
		return viewData;
	}

	public ViewData queryPKRule(String componentId, String pkruleCode)
	{
		String hql = "from TBillpkruledef _t1 where _t1.componentId='"
				+ componentId + "' and _t1.pkruleCode='" + pkruleCode + "'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryPKRuleDetails( String componentId, String pkruleCode)
	{
		String hql = "from TBillpkruledetail _t1 where _t1.componentId='"
				+ componentId + "' and _t1.pkruleCode='" + pkruleCode + "' order by _t1.seqId";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryFields( String componentId, String pkruleCode)
	{
		String hql = "from TBillfieldsdef _t1 where _t1.componentId='"
				+ componentId + "' and _t1.pkruleCode='" + pkruleCode + "'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData opAddNewField(TBillfieldsdef bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public List getFields(String componentId, String pkruleCode)
	{
		List list = this.getBaseDAO().find("select new list(fieldName,fieldCode) from TBillfieldsdef where componentId='"
				+ componentId + "' and pkruleCode='" + pkruleCode + "'");
		 System.out.println(list.size());
		 return list;
	}

	public List getFuncs()
	{
		return this.getBaseDAO().find("select new list(pkfuncCode) from TBillpkfuncdef");
	}

	public String myTestPKRule(String pkruleCode)
	{
		try
		{
			return getBillIdTest().check(pkruleCode);
		}
		catch (RuntimeException e)
		{
			e.printStackTrace();
			return null;
		}
	}

	public BillIdDBTest getBillIdTest()
	{
		return billIdTest;
	}

	public void setBillIdTest(BillIdDBTest billIdTest)
	{
		this.billIdTest = billIdTest;
	}

	public ViewData opAddNewPKRuleDetail(TBillpkruledetail bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opDeletePKRules(List<TBillpkruledef> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBillpkruledef bill=(TBillpkruledef) list.get(i);
			
			String hql="from TBillpkruledetail where componentId='"+bill.getComponentId()+"' and pkruleCode='"+bill.getPkruleCode()+"'";
			System.out.println(1);
			List l1=this.getBaseDAO().find(hql);
			for (int j = 0; j < l1.size(); j++)
			{
				this.getBaseDAO().delete(l1.get(j));
			}
			
			hql="from TBillfieldsdef where componentId='"+bill.getComponentId()+"' and pkruleCode='"+bill.getPkruleCode()+"'";
			List l2=this.getBaseDAO().find(hql);
			for (int j = 0; j < l2.size(); j++)
			{
				this.getBaseDAO().delete(l2.get(j));
			}
			
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	public ViewData opModifyPKRules(List<TBillpkruledef> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBillpkruledef bill=(TBillpkruledef) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	public ViewData opDeleteFields(List<TBillfieldsdef> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBillfieldsdef bill=(TBillfieldsdef) list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	public ViewData opModifyFields(List<TBillfieldsdef> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBillfieldsdef bill=(TBillfieldsdef) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	public ViewData opDeletePKRuleDetails(List<TBillpkruledetail> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBillpkruledetail bill=(TBillpkruledetail) list.get(i);
			this.getBaseDAO().delete(bill);
		}
		return new ViewData();
	}

	public ViewData opModifyPKRuleDetails(List<TBillpkruledetail> list)
	{
		for (int i = 0; i < list.size(); i++)
		{
			TBillpkruledetail bill=(TBillpkruledetail) list.get(i);
			this.getBaseDAO().update(bill);
		}
		return new ViewData();
	}

	public ViewData queryCheckFlowKind(String componentId, String checkFlowId)
	{
		String hql="from TAuditCheckFlowKind _t1 where _t1.componentId='"+componentId+"' and _t1.checkFlowId='"+checkFlowId+"'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryCheckFlowKinds(String componentId, AreaInfo areaInfo)
	{
		String hql="from TAuditCheckFlowKind _t1 where _t1.componentId='"+componentId+"'";
		return this.getBaseDAO().findView(areaInfo,hql);
	}

	public ViewData queryCheckFlows(String componentId, String checkFlowId, AreaInfo areaInfo)
	{
		String hql="from TAuditCheckFlow _t1 where _t1.componentId='"+componentId+"' and _t1.checkFlowId='"+checkFlowId+"'";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData opAddNewAuditStep(TAuditStep bill)
	{
		return this.getBaseDAO().saveView(bill);
	}

	public ViewData opAddNewAuditFlow(TAuditFlow bill)
	{
		BillId bi=this.getBillId();
		
		Map m=bi.getMapFromBean(bill);
		m.put("billType", "AuditFlow");
		m.put("beanSimpleName", bill.getComponentId().substring(bill.getComponentId().lastIndexOf(".")+1,bill.getComponentId().length()));
		bi.put(m);
		
		bill.setFlowId(bi.nextBillId());
		
		ViewData viewData=this.getBaseDAO().saveView(bill);
		
		viewData.addNewPrimaryKey("flowId", bill.getFlowId());
		
		return viewData;
	}

	public ViewData opDeleteAuditSteps(List<TAuditStep> list)
	{
		return this.getBaseDAO().deleteView(list, TAuditStep.class);
	}

	public ViewData opDeleteAuditFlows(List<TAuditFlow> list)
	{
		try {
			for (int i = 0; i < list.size(); i++)
			{System.out.println(list.get(i));
				String hql="from TAuditStep where componentId=? and flowId=?";
				List l1=this.getBaseDAO().find(hql, new Object[]{list.get(i).getComponentId(),list.get(i).getFlowId()});
				this.opDeleteAuditSteps(l1);
				
				hql="delete from TAuditRuleExpression where componentId='"+list.get(i).getComponentId()+"' and flowId='"+list.get(i).getFlowId()+"'";
				this.getBaseDAO().execute(hql);
				
				this.getBaseDAO().delete(list.get(i));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return new ViewData();
	}

	public ViewData opModifyAuditSteps(List<TAuditStep> list)
	{
		return this.getBaseDAO().updateView(list, TAuditStep.class);
	}

	public ViewData opModifyAuditFlows(List<TAuditFlow> list)
	{
		return this.getBaseDAO().updateView(list, TAuditFlow.class);
	}

	public ViewData opSaveAuditRuleExpression(TAuditRuleExpression bill)
	{
		if(bill.getExpression()==null||bill.getExpression().equals(""))
		{
			String hql="delete from TAuditRuleExpression where componentId='"+bill.getComponentId()+"' and flowId='"+bill.getFlowId()+"'";
			this.getBaseDAO().execute(hql);
		}
		else
		{
			this.getBaseDAO().saveOrUpdate(bill);
		}
		
		return new ViewData();
	}

	public ViewData queryAuditRuleExpression(String componentId, String flowId)
	{
		String hql="from TAuditRuleExpression _t1 where _t1.componentId='"+componentId+"' and _t1.flowId='"+flowId+"'";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryAuditSteps( String componentId, String flowId)
	{
		String hql="select new map(_t1.hid as hid,_t1.componentId as componentId,_t1.flowId as flowId,_t1.step as step ,_t1.userID as userID,_t2.userName as userName) from TAuditStep _t1,VUser _t2 where _t1.userID=_t2.userID and _t1.componentId='"+componentId+"' and _t1.flowId='"+flowId+"' order by _t1.step";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData queryAuditFlow(String componentId, String flowId)
	{
		String hql="from TAuditFlow _t1 where _t1.componentId=? and _t1.flowId=?";
		return this.getBaseDAO().findView(hql,new Object[]{componentId,flowId});
	}

	public ViewData queryAuditFlows( String componentId)
	{
		String hql="from TAuditFlow _t1 where _t1.componentId='"+componentId+"' order by _t1.flowIndex";
		return this.getBaseDAO().findView(hql);
	}

	public ViewData opTestAudit(String componentId,Map bill)
	{
		return new ViewData(true,this.getAuditDAO().testAudit(componentId, bill));
	}

	public ViewData opExportConfigData(String componentId,String type)
	{
		if(type.equals("全部"))
		{
			this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_AreaConfig_PK_BillFieldsDef","SAM.SAM_AreaConfig_PK_BillPKRuleDef","SAM.SAM_AreaConfig_PK_BillPKRuleDetail","SAM.SAM_AuditFlow","SAM.SAM_AuditRuleExpression","SAM.SAM_AuditStep"}, "_t1.componentId='"+componentId+"'", "业务对象数据"+componentId.substring(componentId.lastIndexOf(".")+1,componentId.length())+".");
		}
		else if(type.equals("编码规则"))
		{
			this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_AreaConfig_PK_BillFieldsDef","SAM.SAM_AreaConfig_PK_BillPKRuleDef","SAM.SAM_AreaConfig_PK_BillPKRuleDetail"}, "_t1.componentId='"+componentId+"'", "编码规则"+componentId.substring(componentId.lastIndexOf(".")+1,componentId.length())+".");
		}
		else if(type.equals("审核流程"))
		{
			this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_AuditFlow","SAM.SAM_AuditRuleExpression","SAM.SAM_AuditStep"}, "_t1.componentId='"+componentId+"'", "审核流程"+componentId.substring(componentId.lastIndexOf(".")+1,componentId.length())+".");
		}
			
		return new ViewData();
	}

	public ViewData queryUserJobConfigs(String componentId)
	{
		String hql="select new map(_t1.hid as hid,_t1.componentId as componentId,_t1.effective as effective,_t1.jobType as jobType,_t1.menuCode as menuCode,_t1.otherParam as otherParam) from TUserJobConfig _t1 where  _t1.componentId=?";
		
		List<Map> list=this.getBaseDAO().find(hql, new Object[]{componentId});
		
		for (int i = 0; i < list.size(); i++)
		{
			Map m=list.get(i);
			hql="select menuName from TMenu where menuCode=?";
			List l1=this.getBaseDAO().find(hql, new Object[]{m.get("menuCode")});
			if(l1.size()>0)
			{
				m.put("menuName", l1.get(0));
			}
		}
		
		ViewData viewData=new ViewData();
		viewData.setResultList(list);
		
		return viewData;
	}
	public ViewData querySmsAuditConfigs(String componentId)
	{
		String hql="from TSmsAuditConfig _t1 where _t1.componentId='"+componentId+"'";
		return this.getBaseDAO().findView(hql);
	}
	public ViewData opModifySmsAuditConfigs(TSmsAuditConfig bill)
	{
		String hql="from TSmsAuditConfig _t1 where _t1.replyFlag='"+bill.getReplyFlag()+"' and hid<>"+bill.getHid()+"";
		List list = this.getBaseDAO().find(hql);
		if(list.size()>0)
		{
			ViewData vd = new ViewData();
			vd.setIsSucceed(false);
			vd.setMessage("该回复标识已存在，请修改后保存！");
			return vd;	
		}
		else
		{
			bill.setType("AUDIT");		
			return this.getBaseDAO().saveOrUpdateView(bill);			
		}
	}

	public ViewData getBeansByAreaInfo(AreaInfo areaInfo)
	{
		String hql="from TComponent  _t1";
		return this.getBaseDAO().findView(areaInfo, hql);
	}

	public ViewData opExportAllConfigData(AreaInfo areaInfo, String type)
	{
		if(type.equals("全部"))
		{
			this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_AreaConfig_PK_BillFieldsDef","SAM.SAM_AreaConfig_PK_BillPKRuleDef","SAM.SAM_AreaConfig_PK_BillPKRuleDetail","SAM.SAM_AuditFlow","SAM.SAM_AuditRuleExpression","SAM.SAM_AuditStep"}, areaInfo.getQueryCondition(), "业务对象数据.");
		}
		else if(type.equals("编码规则"))
		{
			this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_AreaConfig_PK_BillFieldsDef","SAM.SAM_AreaConfig_PK_BillPKRuleDef","SAM.SAM_AreaConfig_PK_BillPKRuleDetail"}, areaInfo.getQueryCondition(), "编码规则.");
		}
		else if(type.equals("审核流程"))
		{
			this.getDataExporter().exportDataToSQL(new String[]{"SAM.SAM_AuditFlow","SAM.SAM_AuditRuleExpression","SAM.SAM_AuditStep"}, areaInfo.getQueryCondition(), "审核流程.");
		}
			
		return new ViewData();
	}
}
