package com.bk.soc.call.eve;

import java.util.List;

import com.bk.soc.call.eve.data.TCallEvent;

/**
 * @author shixiangru
 * @version 创建时间：2012-8-2 上午9:18:55
 * @Description
 */
public interface IEventManageDao {
	public List<TCallEvent> getCallEventState();
}
