package com.bk.soc.call.eve;

import java.util.Date;
import java.util.List;

import org.fdm.core.base.BaseBO;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import com.bk.soc.call.eve.data.TCallEvent;
import com.bk.soc.sam.shared.data.TTurn;

@Controller
public class TimeServices extends BaseBO {
	//@Scheduled(fixedDelay = 5000)
	@Scheduled(cron = "0 0 12 * * ?")
	void doSomethingWith() {
		String beanCode = this.getClass().getName();
		String componentId = beanCode.substring(0, beanCode.lastIndexOf("."));
		List<TCallEvent> listCallEvent = getCallEvent();// this.getBaseDAO().find(hql);;//
														// 获得状态为已批转与正在办理的事件
		if (listCallEvent.size() > 0) {
			for (int i = 0; i < listCallEvent.size(); i++) {
				TCallEvent tCallEvent = listCallEvent.get(i);
				String code = tCallEvent.getCode();
				List<TTurn> listTurn = getTurns(componentId,code);// this.getBaseDAO().find(hql);//
				if (listTurn.size() > 0) {
					TTurn tTurn = listTurn.get(0);
					Date turnDate = tTurn.getDate();// 获取事件转办的时间
					Integer day = tTurn.getDay();// 获取事件办理的天数
					try {
						long ts = calculateDate(new Date(), turnDate);// 获取当前时间与事件办理事件间的天数
						if (ts != 0) {
							if (ts > day) {
								String state = tCallEvent.getState();
								if (state != null && state.equals("002")) {
									tCallEvent.setState("005");
								} else if (state != null && state.equals("003")) {
									tCallEvent.setState("005");
								}
								this.getBaseDAO().update(tCallEvent);
							}
						}
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				}
			}

		}

	}

	public long calculateDate(Date d1, Date d2) throws Exception {
		long n1 = d1.getTime();
		long n2 = d2.getTime();
		long diff = Math.abs(n1 - n2);

		diff /= 3600 * 1000 * 24;
		return diff;
	}

	// /**
	// * 获取事件状态为已批转与正在办理
	// */
	public List<TCallEvent> getCallEvent() {
		String hql = "from TCallEvent _t1 where _t1.state in('002','003')";
		return this.getBaseDAO().find(hql);
	}

	// /**
	// * 获取事件办理的一条记录
	// *
	// * @param componentId
	// * @param billId
	// * @return
	// */
	public List<TTurn> getTurns(String componentId, String billId) {
		String hql = "from TTurn _t1 where _t1.billId = '" + billId
				+ "' and _t1.componentId = '" + componentId
				+ "' order by _t1.date desc";
		return this.getBaseDAO().find(hql);
	}
}
