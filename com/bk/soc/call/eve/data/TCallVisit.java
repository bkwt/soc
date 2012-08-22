package com.bk.soc.call.eve.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject
@Entity
@Table(name = "call.call_visit")
public class TCallVisit {
 private Long hid;
 private String code;
 private String billid;//事件编号
 private String visitname;//受访名称
 private Date visittime;//受访时间
 private String comment;//意见
 private String gsi;//满意度
 @Id @GeneratedValue(strategy = IDENTITY)
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
public String getBillid() {
	return billid;
}
public void setBillid(String billid) {
	this.billid = billid;
}
public String getVisitname() {
	return visitname;
}
public void setVisitname(String visitname) {
	this.visitname = visitname;
}
public Date getVisittime() {
	return visittime;
}
public void setVisittime(Date visittime) {
	this.visittime = visittime;
}
public String getComment() {
	return comment;
}
public void setComment(String comment) {
	this.comment = comment;
}
public String getGsi() {
	return gsi;
}
public void setGsi(String gsi) {
	this.gsi = gsi;
}
 
}
