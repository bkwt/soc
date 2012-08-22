package com.bk.soc.sam.shared.dao;

import java.util.List;

import org.fdm.core.base.BaseBO;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
@Controller("TimeService")
public class TimeService extends BaseBO {
	
	//@Scheduled(fixedDelay = 5000) 
	//@Scheduled(cron = "0 0 12 * * ?")
	void aaa(){  
List list = this.getBaseDAO().find("from TSystem _t1");
System.out.println(list.size());
}  

}
