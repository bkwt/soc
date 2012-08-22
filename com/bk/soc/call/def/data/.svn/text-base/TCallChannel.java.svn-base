package com.bk.soc.call.def.data;
/**
 * @author xiehongbo
 * @version 创建时间：2012-7-16 下午2:19:25
 * @Description
 */


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.directwebremoting.annotations.DataTransferObject;
import static javax.persistence.GenerationType.IDENTITY; 

@DataTransferObject 
@Entity  
@Table(name="Call.Call_channel")   
public class TCallChannel 
{
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	private String code;
	private String name;
	private String note;
	
	
	
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public void setName(String c)
	{
		this.name=c;
	}

	public String getName()
	{
		return this.name;
	}
	public Long getHid()
	{
		return hid;
	}

	public void setHid(Long hid)
	{
		this.hid = hid;
	}
}