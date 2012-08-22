package com.bk.soc.sam.company.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Company")
public class TCompany
{
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;

	private String companyCode;

	private String companyName;

	private String tel;

	private String fax;

	private String mail;

	private String addr;

	private String postCode;

	private String currencyCode;

	private String companyNameBrief;

	private String companyCodeFather;

	private String gm;

	private String cfo;

	private String bankName;

	private String bankAccount;

	private String dns;

	private String url;

	private String companyNameEn;

	private String AddrEn;

	private String companyNameBriefEn;

	private String tax;
	
	public String getAddr()
	{
		return addr;
	}

	public void setAddr(String addr)
	{
		this.addr = addr;
	}

	public String getAddrEn()
	{
		return AddrEn;
	}

	public void setAddrEn(String addrEn)
	{
		AddrEn = addrEn;
	}

	public String getBankAccount()
	{
		return bankAccount;
	}

	public void setBankAccount(String bankAccount)
	{
		this.bankAccount = bankAccount;
	}

	public String getBankName()
	{
		return bankName;
	}

	public void setBankName(String bankName)
	{
		this.bankName = bankName;
	}

	public String getCfo()
	{
		return cfo;
	}

	public void setCfo(String cfo)
	{
		this.cfo = cfo;
	}

	public String getCompanyCode()
	{
		return companyCode;
	}

	public void setCompanyCode(String companyCode)
	{
		this.companyCode = companyCode;
	}

	public String getCompanyCodeFather()
	{
		return companyCodeFather;
	}

	public void setCompanyCodeFather(String companyCodeFather)
	{
		this.companyCodeFather = companyCodeFather;
	}

	public String getCompanyName()
	{
		return companyName;
	}

	public void setCompanyName(String companyName)
	{
		this.companyName = companyName;
	}

	public String getCompanyNameBrief()
	{
		return companyNameBrief;
	}

	public void setCompanyNameBrief(String companyNameBrief)
	{
		this.companyNameBrief = companyNameBrief;
	}

	public String getCompanyNameBriefEn()
	{
		return companyNameBriefEn;
	}

	public void setCompanyNameBriefEn(String companyNameBriefEn)
	{
		this.companyNameBriefEn = companyNameBriefEn;
	}

	public String getCompanyNameEn()
	{
		return companyNameEn;
	}

	public void setCompanyNameEn(String companyNameEn)
	{
		this.companyNameEn = companyNameEn;
	}

	public String getCurrencyCode()
	{
		return currencyCode;
	}

	public void setCurrencyCode(String currencyCode)
	{
		this.currencyCode = currencyCode;
	}

	public String getDns()
	{
		return dns;
	}

	public void setDns(String dns)
	{
		this.dns = dns;
	}

	public String getFax()
	{
		return fax;
	}

	public void setFax(String fax)
	{
		this.fax = fax;
	}

	public String getGm()
	{
		return gm;
	}

	public void setGm(String gm)
	{
		this.gm = gm;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getMail()
	{
		return mail;
	}

	public void setMail(String mail)
	{
		this.mail = mail;
	}

	public String getPostCode()
	{
		return postCode;
	}

	public void setPostCode(String postCode)
	{
		this.postCode = postCode;
	}

	public String getTax()
	{
		return tax;
	}

	public void setTax(String tax)
	{
		this.tax = tax;
	}

	public String getTel()
	{
		return tel;
	}

	public void setTel(String tel)
	{
		this.tel = tel;
	}

	public String getUrl()
	{
		return url;
	}

	public void setUrl(String url)
	{
		this.url = url;
	}
}
