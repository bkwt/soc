package com.bk.soc.sam.user.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_User_v")  
public class VUser
{
	@Id @GeneratedValue(strategy=IDENTITY)
	private Long hid;
	
	private String logID;
	
	private String userID;

	private String userName;
	
	private String passWord;

	private String orgz;
	
	private String orgzName;

	private String pos;
	
	private String posName;

	private String idcard;

	private Date birthday;

	private String sex;
	
	private String telephone;
	
	private String state;
	
	public String getState()
	{
		return state;
	}

	public void setState(String state)
	{
		this.state = state;
	}

	public Date getBirthday()
	{
		return birthday;
	}

	public void setBirthday(Date birthday)
	{
		this.birthday = birthday;
	}

	public String getIdcard()
	{
		return idcard;
	}

	public void setIdcard(String idcard)
	{
		this.idcard = idcard;
	}

	public String getOrgz()
	{
		return orgz;
	}

	public void setOrgz(String orgz)
	{
		this.orgz = orgz;
	}

	public String getPos()
	{
		return pos;
	}

	public void setPos(String pos)
	{
		this.pos = pos;
	}

	public String getSex()
	{
		return sex;
	}

	public void setSex(String sex)
	{
		this.sex = sex;
	}

	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}

	public String getLogID()
	{
		return logID;
	}

	public void setLogID(String logID)
	{
		this.logID = logID;
	}

	public String getOrgzName()
	{
		return orgzName;
	}

	public void setOrgzName(String orgzName)
	{
		this.orgzName = orgzName;
	}

	public String getPosName()
	{
		return posName;
	}

	public void setPosName(String posName)
	{
		this.posName = posName;
	}

	public String getUserID()
	{
		return userID;
	}

	public void setUserID(String userID)
	{
		this.userID = userID;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public String getPassWord()
	{
		return passWord;
	}

	public void setPassWord(String passWord)
	{
		this.passWord = passWord;
	}

	public String getTelephone()
	{
		return telephone;
	}

	public void setTelephone(String telephone)
	{
		this.telephone = telephone;
	}
}
