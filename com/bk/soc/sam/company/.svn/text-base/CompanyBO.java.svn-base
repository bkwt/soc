package com.bk.soc.sam.company;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.company.data.TCompany;
import com.bk.soc.sam.idao.ICompanyDAO;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SAM_CompanyService")
public class CompanyBO extends BaseBO implements ICompanyDAO,ICompanyService
{
	public CompanyBO()
	{
		super(true);
	}
	
	public ViewData opModifyCompany(TCompany bill)
	{
		return this.getBaseDAO().saveOrUpdateView(bill);
	}

	public ViewData queryMyCompany()
	{
		String hql="from TCompany _t0 where _t0.companyCode='11'";
		return this.getBaseDAO().findView(hql);
	}

	public String getCompanyName(String code)
	{
		String hql="from TCompany _t0 where _t0.companyCode='"+code+"'";
		String companyName=null;
		
		List list=this.getBaseDAO().find(hql);
		if(list.size()>0)
		{
			TCompany t=(TCompany) list.get(0);
			companyName=t.getCompanyName();
		}
		return companyName;
	}

}
