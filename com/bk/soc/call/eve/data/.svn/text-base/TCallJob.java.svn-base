package com.bk.soc.call.eve.data;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

/**
 * @author shixiangru
 * @version 创建时间：2012-8-16 下午3:16:43
 * @Description
 */
@DataTransferObject
@Entity
@Table(name = "call.call_job")
public class TCallJob {
	@Id @GeneratedValue(strategy = IDENTITY)
	 private Long hid;
	 private String billid;//事件编号
	 private Date jobtime;//时间
	 private String node;//短信内容
	 private String type;
	public Long getHid() {
		return hid;
	}
	public void setHid(Long hid) {
		this.hid = hid;
	}
	public String getBillid() {
		return billid;
	}
	public void setBillid(String billid) {
		this.billid = billid;
	}
	public String getNode() {
		return node;
	}
	public void setNode(String node) {
		this.node = node;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getJobtime() {
		return jobtime;
	}
	public void setJobtime(Date jobtime) {
		this.jobtime = jobtime;
	}
	 
}
