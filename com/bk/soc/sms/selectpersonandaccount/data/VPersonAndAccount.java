package com.bk.soc.sms.selectpersonandaccount.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="MDM.MDM_PersonAndAccount_v") 
public class VPersonAndAccount 
{
	  @Id @GeneratedValue(strategy=IDENTITY) 
	  private Long hid;

	private String code;

	private String name;
	
	private String telephone;

	public Long getHid() {
		return hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}


}
