package com.bk.soc.call.def.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

/**
 * @author 段尚 E-mail:38763179@qq.com
 * @version 创建时间：2012-7-20 下午2:17:29
 * @Description
 */
@DataTransferObject
@Entity
@Table(name = "call.call_state")
public class TCallState {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long hid;
	private String code;
	private String name;

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

}
