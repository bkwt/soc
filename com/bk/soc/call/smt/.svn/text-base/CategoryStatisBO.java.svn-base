package com.bk.soc.call.smt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.def.IFoundationDataBaseDao;
import com.bk.soc.call.def.data.TCallState;
import com.bk.soc.call.def.data.TCategory;
import com.bk.soc.mdm.idao.HumanFrameworkDAO;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

/**
 * @author 段尚 E-mail:38763179@qq.com
 * @version 创建时间：2012-7-19 下午4:07:54
 * @Description
 */
@Controller
@RemoteProxy(name = "call_CategoryStatisService")
public class CategoryStatisBO extends BaseBO implements CategoryStatisService{
	
	@Resource
	IFoundationDataBaseDao foundDataBase;
	
	public IFoundationDataBaseDao getFoundDataBase() {
		return foundDataBase;
	}

	public void setFoundDataBase(IFoundationDataBaseDao foundDataBase) {
		this.foundDataBase = foundDataBase;
	}
	
	//部门
	@Resource
	HumanFrameworkDAO orgzDao;

	public HumanFrameworkDAO getOrgzDao() {
		return orgzDao;
	}

	public void setOrgzDao(HumanFrameworkDAO orgzDao) {
		this.orgzDao = orgzDao;
	}
	

	/**
	 * 查询类别统计列表
	 */
	public ViewData queryCategoryStatis(AreaInfo areaInfo,String startdate,String enddate,String orgz,String eventype,String eventsource) {
		String hql = "";
		String orgzCode=this.getUserSession().getOrgzCode();//获取部门编码
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		List listState=foundDataBase.getCallState();//获得呼叫状态list
		ViewData viewData = new ViewData();
		hql="from TCategory _t1 where _t1.supercode = 'root' and _t1.code in(select callcategorylarge  from TCallEvent)";
		List  listOrgz = this.getBaseDAO().find(hql);//获得类别list
		for(int i=0;i<listOrgz.size();i++){
			TCategory tCategory=(TCategory)listOrgz.get(i);
			hql="from TCallEvent _t1 where _t1.callcategorylarge='"+tCategory.getCode()+"' and _t1.callorgz='"+orgzCode+"'";
			if(null != orgz && !orgz.equals("")){
				hql += "and _t1.callorgz in ("+ orgz +") ";
			}
			if(null != eventype){
				hql += "and _t1.calltype='"+eventype+"' ";
			}
			if(null != eventsource){
				hql += "and _t1.callsource='"+eventsource+"' ";
			}
			List listTEvent=this.getBaseDAO().find(hql);//根据类别获取事件数量
			Map<String,Object> map=new HashMap<String, Object>();
			map.put("name",tCategory.getName());
			map.put("count",listTEvent.size());
			map.put("catecode",tCategory.getCode());
			for(int j=0;j<listState.size();j++){
				TCallState tCallState=(TCallState)listState.get(j);
				hql="from TCallEvent _t1 where _t1.callcategorylarge='"+tCategory.getCode()+"' and _t1.state='"+tCallState.getCode()+"' and calltime between '"+startdate+"' and '"+enddate+"' ";//根据类别与状态获取数量
				if(null != orgz && !orgz.equals("")){
					hql += "and _t1.callorgz in ("+ orgz +") ";
				}
				if(null != eventype){
					hql += "and _t1.calltype='"+eventype+"' ";
				}
				if(null != eventsource){
					hql += "and _t1.callsource='"+eventsource+"' ";
				}
				List listCallState=this.getBaseDAO().find(hql);
				map.put(tCallState.getCode(), listCallState.size());
			}
			list.add(map);
			
		}
		viewData.setResultList(list);
		return viewData;
	}

	public List getCategory() {
		return this.getBaseDAO().find("select new list(code,name) from TCategory");
	}

	/**
	 * 获取事件类型
	 */
	public List getCallType() {
		return foundDataBase.getCallType();
	}
	
	/**
	 * 获取部门名称
	 * @return
	 */
	public List getOrgz(){
		return orgzDao.getTOrgz();
	}

	/**
	 * 获取事件来源渠道
	 */
	public List getCallChannel(){
		return foundDataBase.getCallChannels();
	}
	
	
	/**
	 * 获取事件表图表数据
	 * 
	 * @return
	 */
	public ViewData getTEventChartData(String starttime, String endtime) {
		String orgzCode=this.getUserSession().getOrgzCode();//获取部门编码
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		ViewData viewData = new ViewData();
		String hql="from TCategory _t1 where _t1.supercode = 'root' and _t1.code in(select callcategorylarge  from TCallEvent)";
		List  listOrgz=this.getBaseDAO().find(hql);//获得类别list
		for(int i=0;i<listOrgz.size();i++){
			TCategory tCategory = (TCategory)listOrgz.get(i);
			hql="from TCallEvent _t1 where _t1.callcategorylarge='"+ tCategory.getCode()+"' and _t1.calltime>='" + starttime
					+ "' and _t1.calltime<='" + endtime + "'";
			List listTEvent=this.getBaseDAO().find(hql);//根据类别获取事件数量
			Map<String,Object> map=new HashMap<String, Object>();
			map.put("name",tCategory.getName());
			map.put("data1",listTEvent.size());
			map.put("catecode",tCategory.getCode());
			list.add(map);
			
		}
		viewData.setResultList(list);
		return viewData;
	}
	/**
	 * 获取类别统计详细
	 */
	public ViewData getTeventCategoryData(String cateCode) {
		String orgzCode=this.getUserSession().getOrgzCode();//获取部门编码
		String hql = "";
		ViewData viewData = new ViewData();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List listState = foundDataBase.getCallState();// 获得呼叫状态list
		for (int j = 0; j < listState.size(); j++) {
			Map<String, Object> map = new HashMap<String, Object>();
			TCallState tCallState = (TCallState) listState.get(j);
			hql = "from TCallEvent _t1 where _t1.callcategorylarge='" + cateCode
					+ "' and _t1.state='" + tCallState.getCode() + "' and _t1.callorgz='"+orgzCode+"'";
			List listCallState = this.getBaseDAO().find(hql);
			map.put("name", tCallState.getName());
			map.put("data1", listCallState.size());
			list.add(map);
		}

		viewData.setResultList(list);
		return viewData;
	}
	
	
}
