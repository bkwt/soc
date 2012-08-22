package com.bk.soc.call.kbm.data;

/**
 * @author xiehongbo
 * @version 创建时间：2012-7-16 下午2:19:25
 * @Description
 */

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject
@Entity
@Table(name = "Call.Call_kbm")
public class TCallKbm {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long hid;
	private String code;
	private String name;
	private boolean leaf;
	private String supercode;
	private String note;
	private String content;
	private String orgz;
	private String istree;
	private String category;
	private String keyword;
	private Date   publishtime;
	private String image;
	private String seachcode;
	private String personcode;
	private String isprivate;

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

	public boolean isLeaf() {
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getOrgz() {
		return orgz;
	}

	public void setOrgz(String orgz) {
		this.orgz = orgz;
	}

	public String getIstree() {
		return istree;
	}

	public void setIstree(String istree) {
		this.istree = istree;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public Date getPublishtime() {
		return publishtime;
	}

	public void setPublishtime(Date publishtime) {
		this.publishtime = publishtime;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getSeachcode() {
		return seachcode;
	}

	public void setSeachcode(String seachcode) {
		this.seachcode = seachcode;
	}

	public String getPersoncode() {
		return personcode;
	}

	public void setPersoncode(String personcode) {
		this.personcode = personcode;
	}

	public String getIsprivate() {
		return isprivate;
	}

	public void setIsprivate(String isprivate) {
		this.isprivate = isprivate;
	}

}
