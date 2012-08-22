package com.bk.soc.sam.calendar;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.calendar.data.TUserCalendar;
import com.bk.soc.sam.shared.data.ViewData;
@Controller("SAM_CalendarBO")
@RemoteProxy(name="SAM_CalendarBO")
public class CalendarBO extends BaseBO implements ICalendar
{

	public ViewData queryCalendar(String date)
	{
		String userID = this.getUserSession().getUserID();

		String hql = "from TUserCalendar _t1 where _t1.userID='" + userID + "' ";

		if (date != null)
		{
			hql += " and _t1.signDate='" + date + "'";
		}

		return this.getBaseDAO().findView( hql);
	}

	public ViewData opSaveCalendar(TUserCalendar bill)
	{
		bill.setUserID(this.getUserSession().getUserID());
		return this.getBaseDAO().saveOrUpdateView(bill);
	}

	public ViewData opDeleteCalendar(TUserCalendar bill)
	{
		if(bill.getHid()==null)
			return new ViewData();
		else
			return this.getBaseDAO().deleteView(bill);
	}

//	public ViewData opAddNewCalendar(TCalendar bill)
//	{
//		String userID = this.getUserSession().getUserID();
//		bill.setUserID(userID);
//		return this.getBaseDAO().saveView(bill);
//	}
//
//	public ViewData opDeleteCalendar(TCalendar bill)
//	{
//		String userID = this.getUserSession().getUserID();
//		bill.setUserID(userID);
//		return this.getBaseDAO().deleteView(bill);
//	}
//
//	public ViewData opModifyCalendar(TCalendar bill)
//	{
//		String userID = this.getUserSession().getUserID();
//		bill.setUserID(userID);
//		return this.getBaseDAO().updateView(bill);
//	}
//
	public ViewData querySignedDays(Date startDate,Date endDate)
	{
		ViewData v = new ViewData();
		List list = new ArrayList();

		String userID = this.getUserSession().getUserID();

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

		String hql = "from TUserCalendar where userID='" + userID + "' and signDate>='"+formatter.format(startDate)+"' and signDate<='"+formatter.format(endDate)+"'";
		List l1 = this.getBaseDAO().find(hql);
		
		Map map=new HashMap();
		
		for (int i = 0; i < l1.size(); i++)
		{
			TUserCalendar t = (TUserCalendar) l1.get(i);
			map.put(formatter.format(t.getSignDate()), true);
		}
		
		list.add(map);

		v.setResultList(list);
		return v;
	}
}
