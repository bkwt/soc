package com.bk.soc.sam.shared.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Turn") 
public class TTurn {
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	private String code;
	private String billId;
	private String componentId;
	private String fromorgz;
	private String toorgz;
	private String person;
	private Date date;
	private String node;
	private String state;
	private Integer day;
	public Long getHid() {
		return hid;
	}
	public void setHid(Long hid) {
		this.hid = hid;
	}
	
	
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	public String getComponentId() {
		return componentId;
	}
	public void setComponentId(String componentId) {
		this.componentId = componentId;
	}
	
	public String getFromorgz() {
		return fromorgz;
	}
	public void setFromorgz(String fromorgz) {
		this.fromorgz = fromorgz;
	}
	
	public String getToorgz() {
		return toorgz;
	}
	public void setToorgz(String toorgz) {
		this.toorgz = toorgz;
	}
	public String getPerson() {
		return person;
	}
	public void setPerson(String person) {
		this.person = person;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getNode() {
		return node;
	}
	public void setNode(String node) {
		this.node = node;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Integer getDay() {
		return day;
	}
	public void setDay(Integer day) {
		this.day = day;
	}
	
}
