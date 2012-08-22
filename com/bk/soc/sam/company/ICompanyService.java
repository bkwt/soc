package com.bk.soc.sam.company;

import com.bk.soc.sam.company.data.TCompany;
import com.bk.soc.sam.shared.data.ViewData;

public interface ICompanyService
{
	public ViewData queryMyCompany();
	
	public ViewData opModifyCompany(TCompany bill);

}
