package com.bk.soc.mdm.human.data;
import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="MDM.MDM_Person") 
public class TPerson{
  @Id @GeneratedValue(strategy=IDENTITY)
    private Long hid;
    
    private String code;
    
    private String name;
    
    private String orgz;
    
    private String pos;
    
    private String idcard;
    
    private Date birthday;
    
    private String sex;
    
    private String telephone;
    
    private String state;
    
    private String fncId;
    
    private String fncId1;

    public Long getHid(){
      return hid;
    }
    public void  setHid(Long hid){
      this.hid=hid;
    }
    public String getCode(){
      return code;
    }
    public void  setCode(String code){
      this.code=code;
    }
    public String getName(){
      return name;
    }
    public void  setName(String name){
      this.name=name;
    }
    public String getOrgz(){
      return orgz;
    }
    public void  setOrgz(String orgz){
      this.orgz=orgz;
    }
    public String getPos(){
      return pos;
    }
    public void  setPos(String pos){
      this.pos=pos;
    }
    public String getIdcard(){
      return idcard;
    }
    public void  setIdcard(String idcard){
      this.idcard=idcard;
    }
    public Date getBirthday(){
      return birthday;
    }
    public void  setBirthday(Date birthday){
      this.birthday=birthday;
    }
    public String getSex(){
      return sex;
    }
    public void  setSex(String sex){
      this.sex=sex;
    }
    public String getTelephone(){
      return telephone;
    }
    public void  setTelephone(String telephone){
      this.telephone=telephone;
    }
    public String getState(){
      return state;
    }
    public void  setState(String state){
      this.state=state;
    }
    public String getFncId(){
      return fncId;
    }
    public void  setFncId(String fncId){
      this.fncId=fncId;
    }
    public String getFncId1(){
      return fncId1;
    }
    public void  setFncId1(String fncId1){
      this.fncId1=fncId1;
    }
    public String toString(){
      return ReflectionToStringBuilder.toString(this);
  }
}
