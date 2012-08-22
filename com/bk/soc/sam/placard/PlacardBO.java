package com.bk.soc.sam.placard;

import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.bill.util.DateUtil;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.placard.data.TPlacard;
import com.bk.soc.sam.placard.data.TPlacardOrg;
import com.bk.soc.sam.shared.data.AreaInfo;
import com.bk.soc.sam.shared.data.ViewData;

@Controller
@RemoteProxy(name="SAM_PlacardService")  
public class PlacardBO extends BaseBO implements IPlacardService
{
	//private IOrgzDAO orgzDAO;
	
	public ViewData queryTopPlacards()
	{
		AreaInfo areaInfo=new AreaInfo();
		areaInfo.setCurrentPage(1);
		areaInfo.setPageSize(5);
		String hql="select new map(_t1.hid as hid,_t1.number as number,_t1.title as title, _t1.text as text, _t1.publishDate as publishDate, _t1.publishPersonCode as publishPersonCode, _t1.publishPersonName as publishPersonName,_t1.state as state) from TPlacard _t1 where _t1.number in (select number from TPlacardOrg where orgzCode='"+this.getUserSession().getOrgzCode()+"') and state='PUB' order by _t1.number desc";
		return this.getBaseDAO().findView(areaInfo,hql);
	}

	public ViewData queryPlacards(AreaInfo areaInfo)
	{
		String hql="select new map(_t1.hid as hid,_t1.number as number,_t1.title as title, _t1.text as text, _t1.publishDate as publishDate, _t1.publishPersonCode as publishPersonCode, _t1.publishPersonName as publishPersonName,_t1.state as state) from TPlacard _t1 order by _t1.number desc";
		return this.getBaseDAO().findView(areaInfo,hql);
	}

	public ViewData queryPlacard(String number)
	{
		String hql="select distinct new map(_t2.orgz as orgz,_t2.orgzName as orgzName) from TPlacardOrg _t1,VUser _t2 where _t1.orgzCode=_t2.orgz and number="+number;
		List<Map> list =this.getBaseDAO().find(hql);
		StringBuffer orgz=new StringBuffer();
		StringBuffer orgzName=new StringBuffer();
		for (int i = 0; i < list.size(); i++)
		{
			if(i!=0){
				orgz.append(",");
				orgzName.append("\n");
			}
			orgz.append(list.get(i).get("orgz"));
			orgzName.append(list.get(i).get("orgzName"));
		}
		
		hql="select new map(_t1.hid as hid,_t1.number as number,_t1.title as title, _t1.text as text, _t1.publishDate as publishDate, _t1.publishPersonCode as publishPersonCode, _t1.publishPersonName as publishPersonName,'"+orgz+"' as receiveOrgzCodes,'"+orgzName+"' as receiveOrgzs,_t1.state as state) from TPlacard _t1 where _t1.number="+number;
		return this.getBaseDAO().findView(hql);
	}

	public ViewData opPublish(TPlacard bill,List<String> orgzCodes)
	{
		String hql="select max(number) from TPlacard";
		List list=this.getBaseDAO().find(hql);
		
		Integer maxNum=1;
		
		if(list.get(0)!=null)
			maxNum=(Integer)list.get(0)+1;

		bill.setNumber(maxNum);
		
		bill.setPublishDate(DateUtil.getCurrentTime());
		bill.setPublishPersonCode(this.getUserSession().getUserID());
		bill.setPublishPersonName(this.getUserSession().getUserName());
		bill.setState("PUB");
		
		for (int i = 0; i < orgzCodes.size(); i++)
		{
			TPlacardOrg tPlacardOrg=new TPlacardOrg();
			tPlacardOrg.setNumber(maxNum);
			tPlacardOrg.setOrgzCode(orgzCodes.get(i));
			this.getBaseDAO().save(tPlacardOrg);
		}
		ViewData viewData = this.getBaseDAO().saveView(bill);
		viewData.addNewPrimaryKey("code", maxNum+"");
		return viewData;
	}

	public ViewData opInvalid(TPlacard bill)
	{
		if(bill.getState().equals("DEL"))
			return new ViewData(false,"�ù����Ѿ�����.");
		
		bill.setState("DEL");
		return this.getBaseDAO().updateView(bill);
		
	}
	
	public ViewData opDelete(TPlacard bill)
	{
		String hql = "from TPlacardOrg _t1 where _t1.number = '"+bill.getNumber()+"'";
		List list = getBaseDAO().find(hql);
        for(int i = 0; i < list.size(); i++)
            getBaseDAO().delete(list.get(i));
		
		return this.getBaseDAO().deleteView(bill);
	}

	public ViewData opModify(TPlacard bill,List<String> orgzCodes)
	{
		if(bill.getState().equals("DEL"))
			return new ViewData(false,"�ù����Ѿ�����.");
		String hql = "from TPlacardOrg _t1 where number = '"+bill.getNumber()+"'";
		List<TPlacardOrg> list = this.getBaseDAO().find(hql);
		for (int i = 0; i < list.size(); i++){
			TPlacardOrg tPlacardOrg = list.get(i);
			this.getBaseDAO().delete(tPlacardOrg);
		}
		
		for (int i = 0; i < orgzCodes.size(); i++)
		{
			TPlacardOrg tPlacardOrg=new TPlacardOrg();
			tPlacardOrg.setNumber(bill.getNumber());
			tPlacardOrg.setOrgzCode(orgzCodes.get(i));
			this.getBaseDAO().save(tPlacardOrg);
		}
		bill.setPublishDate(DateUtil.getCurrentTime());
		bill.setPublishPersonCode(this.getUserSession().getUserID());
		bill.setPublishPersonName(this.getUserSession().getUserName());
		return this.getBaseDAO().updateView(bill);
	}


}
