package com.bk.soc.sam.shared.dao;

import java.util.List;

import com.bk.soc.sam.shared.data.TTurn;
import com.bk.soc.sam.shared.data.ViewData;

public interface ITurnDAO {
	
	public ViewData turnBill(ITurnService iTurnService, String billId, String orgz,int day,String node);
	
	public ViewData endBill(ITurnService iTurnService, String billId, String node);
	
	public List<TTurn> getTurn(ITurnService iTurnService, String billId);
	
	public ViewData queryTurn(ITurnService iTurnService, String code);
	public List<TTurn> getTurns(String componentId,String billId);
}
