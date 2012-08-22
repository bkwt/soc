package com.bk.soc.sms.addressbook;
import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;
@Controller
@RemoteProxy(name="SMS_SelectAddrList")
public class SelectAddrList extends BaseBO{
  public SelectAddrList(){
	  
  }
  
  public List<List<String>> getGroups(String otherConditions){
	  String hql = "select new list(_t1.groupName) from TAddrListGroup _t1 where "+otherConditions;
	  return (List<List<String>>)this.getBaseDAO().find(hql);
  }
  
  public ViewData findAddrList(AreaInfo areaInfo,String otherConditions){
  String hql = "select new map(_t1.hid as hid,_t1.name as name,_t1.mobileNo as mobileNo,_t1.sex as sex,_t1.corpCode as corpCode,_t1.groupName as groupName,_t1.deptCode as deptCode,_t1.posCode as posCode,_t1.contactInfo as contactInfo,_t1.mark as mark) from TAddrList _t1 where "+otherConditions;
  return this.getBaseDAO().findView(areaInfo,hql);
  }
}
