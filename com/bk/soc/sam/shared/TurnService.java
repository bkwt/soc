package com.bk.soc.sam.shared;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.fdm.bill.util.DateUtil;
import org.fdm.core.base.BaseBO;
import org.fdm.core.service.UserJobService;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.dao.ITurnDAO;
import com.bk.soc.sam.shared.dao.ITurnService;
import com.bk.soc.sam.shared.data.TTurn;
import com.bk.soc.sam.shared.data.ViewData;

@Controller
public class TurnService extends BaseBO implements ITurnDAO{
	@Resource
	private UserJobService userJobService;
	
	public void setUserJobService(UserJobService userJobService)
	{
		this.userJobService = userJobService;
	}
	public ViewData queryTurn(ITurnService iTurnService,String code)
	{
		try {
			String beanCode = iTurnService.getClass().getName();
			String componentId = beanCode.substring(0, beanCode.lastIndexOf("."));
			String hql = "from TTurn _t1 where _t1.billId = '" + code + "' and _t1.componentId = '" + componentId + "'";
			System.out.println(hql);
			return this.getBaseDAO().findView(hql);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ViewData();
	}
	
	public ViewData turnBill(ITurnService iTurnService, String billId, String orgz,int day,String node)
	{
		String beanCode = iTurnService.getClass().getName();
		String componentId= beanCode.substring(0, beanCode.lastIndexOf("."));
		//完成
		try {
			userJobService.setJobComplated(componentId,  this.getUserSession().getOrgzCode(), billId, "ZB");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ViewData viewData = matchTurn(iTurnService,billId);
		if(viewData.getIsSucceed() == false)
			return viewData;
		String code = viewData.getMessage();
		String[] orgzs = orgz.split(",");
		for(int i=0;i<orgzs.length;i++){
			//转办增加
			userJobService.addJob(componentId, "事件办理", orgzs[i], billId, "ZB");
			TTurn bill = new TTurn();
			bill.setCode(code);
			bill.setBillId(billId);
			bill.setComponentId(componentId);
			bill.setDate(new Date());
			bill.setPerson(this.getUserSession().getUserID());
			bill.setFromorgz(this.getUserSession().getOrgzCode());
			bill.setToorgz(orgzs[i]);
			bill.setDay(day);
			bill.setNode(node);
			bill.setState("start");
		    this.getBaseDAO().saveView(bill);
		}
		return new ViewData();
	}
	public ViewData endBill(ITurnService iTurnService, String billId, String node)
	{
		try {
			String beanCode = iTurnService.getClass().getName();
			String componentId= beanCode.substring(0, beanCode.lastIndexOf("."));
			//完成
			userJobService.setJobComplated(componentId,  this.getUserSession().getOrgzCode(), billId, "ZB");
			ViewData viewData = matchTurn(iTurnService,billId);
			if(viewData.getIsSucceed() == false)
				return viewData;
			String code = viewData.getMessage();
			TTurn bill = new TTurn();
			bill.setCode(code);
			bill.setBillId(billId);
			bill.setComponentId(componentId);
			bill.setDate(DateUtil.getCurrentTime());
			bill.setPerson(this.getUserSession().getUserID());
			bill.setFromorgz(this.getUserSession().getOrgzCode());
			bill.setNode(node);
			bill.setState("end");
			 this.getBaseDAO().saveView(bill);
			 matchEndTurn(iTurnService,billId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		 return new ViewData();
	}
	
	public List<TTurn> getTurn(ITurnService iTurnService, String billId){
		String beanCode = iTurnService.getClass().getName();
		String componentId= beanCode.substring(0, beanCode.lastIndexOf("."));
		String hql = "from TTurn _t1 where _t1.billId = '" + billId + "' and _t1.componentId = '" + componentId + "' and _t1.toorgz ='" + this.getUserSession().getOrgzCode() + "' and _t1.state ='start'";
		return this.getBaseDAO().find(hql);
	}
	
	public List<TTurn> getTurns(String componentId, String billId){
		String hql = "from TTurn _t1 where _t1.billId = '" + billId + "' and _t1.componentId = '" + componentId + "' order by _t1.date desc";
		return this.getBaseDAO().find(hql);
	}
	
	public ViewData matchTurn(ITurnService iTurnService, String billId){
		ViewData viewData = new ViewData();
		String beanCode = iTurnService.getClass().getName();
		String componentId= beanCode.substring(0, beanCode.lastIndexOf("."));
		String hql = "from TTurn _t1 where _t1.billId = '" + billId + "' and _t1.componentId = '" + componentId + "' and _t1.toorgz ='" + this.getUserSession().getOrgzCode() + "' and _t1.state ='start'";
		List<TTurn> list = this.getBaseDAO().find(hql);
		if(list.size()==0){
			hql = "from TTurn _t1 where _t1.billId = '" + billId + "' and _t1.componentId = '" + componentId + "'";
			List<TTurn> list1 = this.getBaseDAO().find(hql);
			if(list1.size()==0){
				iTurnService.startTurn(billId);
				viewData.setMessage(1+"");
			}else{
				viewData.setMessage("编号为："+billId+"事件已转办");
				viewData.setIsSucceed(false);
			}
		}else{
			for(int i=0;i<list.size();i++){
				TTurn t = list.get(i);
				t.setState("end");
				this.getBaseDAO().update(t);
				int code = Integer.parseInt(t.getCode())+1;
				viewData.setMessage(code+"");
			}
		}
		 return viewData;
	}
	public ViewData matchEndTurn(ITurnService iTurnService, String billId){
		ViewData viewData = new ViewData();
		String beanCode = iTurnService.getClass().getName();
		String componentId= beanCode.substring(0, beanCode.lastIndexOf("."));
		String hql = "from TTurn _t1 where _t1.billId = '" + billId + "' and _t1.componentId = '" + componentId + "' and _t1.state ='start'";
		 List<TTurn> list1 = this.getBaseDAO().find(hql);
		 if(list1.size()==0)
			 iTurnService.endTurn(billId);
		 return viewData;
	}
	
	

	
}
