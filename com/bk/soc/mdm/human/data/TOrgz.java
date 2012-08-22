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
@Table(name="MDM.MDM_Orgz") 
public class TOrgz{
  @Id @GeneratedValue(strategy=IDENTITY)
    private Long hid;
    
    private String code;
    
    private Integer orgzLevel;
    
    private String name;
    
    private String superCode;
    
    private String type;
    
    private String note;
    
    private String state;
    
    private String fncId;
    
    private String leaf;

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
    public Integer getOrgzLevel(){
      return orgzLevel;
    }
    public void  setOrgzLevel(Integer orgzLevel){
      this.orgzLevel=orgzLevel;
    }
    public String getName(){
      return name;
    }
    public void  setName(String name){
      this.name=name;
    }
    public String getSuperCode(){
      return superCode;
    }
    public void  setSuperCode(String superCode){
      this.superCode=superCode;
    }
    public String getType(){
      return type;
    }
    public void  setType(String type){
      this.type=type;
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
    public String getFncId(){
      return fncId;
    }
    public void  setFncId(String fncId){
      this.fncId=fncId;
    }
   
    public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String toString(){
      return ReflectionToStringBuilder.toString(this);
  }
}
