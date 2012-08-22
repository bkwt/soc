package com.bk.soc.sms.addressbook.data;
import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="SMS.SMS_AddrListGroup") 
public class TAddrListGroup{
  public TAddrListGroup(){}
  @Id @GeneratedValue(strategy=IDENTITY) 
    private Long hid;
    
    private String uid;
    
    private String groupCode;
    
    private String groupName;
    
    private String groupType;
    
    private String mark;

    public Long getHid(){
      return hid;
    }
    public void  setHid(Long hid){
      this.hid=hid;
    }
    public String getUid(){
      return uid;
    }
    public void  setUid(String uid){
      this.uid=uid;
    }
    public String getGroupCode(){
      return groupCode;
    }
    public void  setGroupCode(String groupCode){
      this.groupCode=groupCode;
    }
    public String getGroupName(){
      return groupName;
    }
    public void  setGroupName(String groupName){
      this.groupName=groupName;
    }
    public String getGroupType(){
      return groupType;
    }
    public void  setGroupType(String groupType){
      this.groupType=groupType;
    }
    public String getMark(){
      return mark;
    }
    public void  setMark(String mark){
      this.mark=mark;
    }
    public String toString(){
      return ReflectionToStringBuilder.toString(this);
  }
}
