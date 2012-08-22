package com.bk.soc.sam.message.data;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


import org.directwebremoting.annotations.DataTransferObject;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author shixiangru
 * @version 创建时间：2012-8-10 上午11:40:28
 * @Description
 */
@DataTransferObject 
@Entity  
@Table(name="SAM.SAM_Message") 
public class MessageDwr implements Serializable {
 /**
  * 
  */
 private static final long serialVersionUID = 1L;
 private Long id;
 private String msg;
 private String time;

 @Id
 @SequenceGenerator(name = "SME_SEQ", sequenceName = "COMMON_MESSAGE_SEQ", allocationSize = 1)
 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SME_SEQ")
 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }

 @Column(length = 100)
 public String getMsg() {
  return msg;
 }

 public void setMsg(String msg) {
  this.msg = msg;
 }

 @Column(length = 20)
 public String getTime() {
  return time;
 }

 public void setTime(String time) {
  this.time = time;
 }

 private String byid;

 @Transactional
 public String getByid() {
  return byid;
 }

 public void setByid(String byid) {
  this.byid = byid;
 }

 public MessageDwr(String userid, String username) {
  super();
  this.byid = userid;
  this.msg = username;
 }

//在Set中添加相同实体会重 把hashCode重写

 @Override
 public int hashCode() {
  return byid.hashCode() * 7 + msg.hashCode() * 11;
 }

 @Override
 public boolean equals(Object obj) {
  if (obj.getClass() != this.getClass()) {
   return false;
  }
  MessageDwr meDwr = (MessageDwr) obj;
  if (null != this.getByid() && this.getByid().equals(meDwr.getByid())
    && this.getMsg() != null
    && this.getMsg().equals(meDwr.getMsg())) {
   return true;
  }
  return false;
 }
}