package com.bk.soc.mdm.human.data;
import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.directwebremoting.annotations.DataTransferObject;
@DataTransferObject 
@Entity  
@Table(name="MDM.MDM_Pos") 
public class TPos{
   @Id @GeneratedValue(strategy=IDENTITY)
    private Long hid;
    
    private String code;
    
    private String name;
    
    private String orgzCode;
    
    private String note;
    
    private String state;

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
    public String getOrgzCode(){
      return orgzCode;
    }
    public void  setOrgzCode(String orgzCode){
      this.orgzCode=orgzCode;
    }
    public String getNote(){
      return note;
    }
    public void  setNote(String note){
      this.note=note;
    }
    public String getState(){
      return state;
    }
    public void  setState(String state){
      this.state=state;
    }
    public String toString(){
      return ReflectionToStringBuilder.toString(this);
  }
}
