package com.bk.soc.sam.calendar;


import java.util.Date;

import com.bk.soc.sam.calendar.data.TUserCalendar;
import com.bk.soc.sam.shared.data.ViewData;

public interface ICalendar
{
	public ViewData queryCalendar(String date);
	
	public ViewData opSaveCalendar(TUserCalendar bill);
	
	public ViewData opDeleteCalendar(TUserCalendar bill);
	
//	public ViewData opDeleteCalendar(TCalendar bill);
//	
//	public ViewData opModifyCalendar(TCalendar bill);
//	
//	public ViewData opAddNewCalendar(TCalendar bill);
//	
	public ViewData querySignedDays(Date startDate,Date endDate);
//	
}
