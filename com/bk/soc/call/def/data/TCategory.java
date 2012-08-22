package com.bk.soc.call.def.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

/**
 * @author 段尚 E-mail:38763179@qq.com
 * @version 创建时间：2012-7-16 下午2:19:13
 * @Description 类别定义
 */

@DataTransferObject
@Entity
@Table(name = "call.call_category")
public class TCategory {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long hid;
	private Integer stintday;
	private String code;
	private String name;
	private boolean leaf;
	private String supercode;
	private String note;

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

	public boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getSupercode() {
		return supercode;
	}

	public void setSupercode(String supercode) {
		this.supercode = supercode;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Integer getStintday() {
		return stintday;
	}

	public void setStintday(Integer stintday) {
		this.stintday = stintday;
	}

}
