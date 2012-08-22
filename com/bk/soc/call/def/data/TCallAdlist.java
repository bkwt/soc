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
@Table(name="call.call_adlist")

public class TCallAdlist {

	@Id	@GeneratedValue(strategy=IDENTITY)
	private Long hid;
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
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	private String code;
	private String	name;
	private String note;
	private String supercode;

	public String getSupercode() {
		return supercode;
	}
	public void setSupercode(String supercode) {
		this.supercode = supercode;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	private boolean	leaf;
	
	
	
	

}
