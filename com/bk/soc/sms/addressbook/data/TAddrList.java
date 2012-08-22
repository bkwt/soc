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
@Table(name="SMS.SMS_AddrList")  
public class TAddrList{
  public TAddrList(){}
  @Id @GeneratedValue(strategy=IDENTITY) 
    private Long hid;
    
    private String uid;
    
    private String addrType;
    
    private String name;
    
    private String mobileNo;
    
    private String email;
    
    private String sex;
    
    private String groupName;
    
    private String corpCode;
    
    private String deptCode;
    
    private String posCode;
    
    private String contactInfo;
    
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
    public String getAddrType(){
      return addrType;
    }
    public void  setAddrType(String addrType){
      this.addrType=addrType;
    }
    public String getName(){
      return name;
    }
    public void  setName(String name){
      this.name=name;
    }
    public String getMobileNo(){
      return mobileNo;
    }
    public void  setMobileNo(String mobileNo){
      this.mobileNo=mobileNo;
    }
    public String getEmail(){
      return email;
    }
    public void  setEmail(String email){
      this.email=email;
    }
    public String getSex(){
      return sex;
    }
    public void  setSex(String sex){
      this.sex=sex;
    }
    public String getGroupName(){
      return groupName;
    }
    public void  setGroupName(String groupName){
      this.groupName=groupName;
    }
    public String getCorpCode(){
      return corpCode;
    }
    public void  setCorpCode(String corpCode){
      this.corpCode=corpCode;
    }
    public String getDeptCode(){
      return deptCode;
    }
    public void  setDeptCode(String deptCode){
      this.deptCode=deptCode;
    }
    public String getPosCode(){
      return posCode;
    }
    public void  setPosCode(String posCode){
      this.posCode=posCode;
    }
    public String getContactInfo(){
      return contactInfo;
    }
    public void  setContactInfo(String contactInfo){
      this.contactInfo=contactInfo;
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
