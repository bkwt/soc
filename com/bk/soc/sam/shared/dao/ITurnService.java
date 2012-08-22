package com.bk.soc.sam.shared.dao;

import java.util.List;

import com.bk.soc.sam.shared.data.TTurn;

public interface ITurnService {
	
	public void startTurn(String billId);
	
	public void endTurn(String billId);
	
	
	public Object getBill(String billId);
	
}
