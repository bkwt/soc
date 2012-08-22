package com.bk.soc.sam.shared;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.fdm.core.service.IFieldsRankingService;
import org.fdm.core.tools.Clogger;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.shared.data.TFieldsRanking;
@Controller
@RemoteProxy(name="fieldsRankingService")
public class FieldsRankingService extends BaseBO implements IFieldsRankingService
{
	
	public String loadFieldsRankingConfig(String pageURL, String areaID, String progParams, String logID)
	{
		String ranking = null;
		String hql = "from TFieldsRanking where pageURL='"
				+ pageURL + "' and areaID='" + areaID + "' and progParams='"
				+ progParams + "' and logID='" + logID + "'";
		List list = this.getBaseDAO().find(hql);
		if (list.size() > 0)
		{
			TFieldsRanking t = (TFieldsRanking) list.get(0);
			ranking = t.getRanking();
		}
		return ranking;
	}

	public boolean saveFieldsRankingConfig(String pageURL, String areaID, String progParams, String logID, String ranking)
	{
		Clogger.logInfo("------starting FieldsRankingService--------");
		Clogger.logInfo("method:saveFieldsRankingConfig");
		boolean isSucceed = false;

		String hql = "from TFieldsRanking where pageURL='"
				+ pageURL + "' and areaID='" + areaID + "' and progParams='"
				+ progParams + "' and logID='" + logID + "'";
		List list = this.getBaseDAO().find(hql);
		if (list.size() > 0)
		{
			TFieldsRanking t = (TFieldsRanking) list.get(0);
			t.setRanking(ranking);
			this.getBaseDAO().update(t);
		}
		else
		{
			TFieldsRanking t = new TFieldsRanking();
			t.setPageURL(pageURL);
			t.setAreaID(areaID);
			t.setProgParams(progParams);
			t.setLogID(logID);
			t.setRanking(ranking);
			this.getBaseDAO().save(t);
		}
		isSucceed = true;

		Clogger.logInfo("------end FieldsRankingService-------------\n\n");
		return isSucceed;
	}

	public boolean resetFieldsRankingConfig(String pageURL, String areaID, String progParams, String logID)
	{
		Clogger.logInfo("------starting FieldsRankingService--------");
		Clogger.logInfo("method:resetFieldsRankingConfig");
		boolean isSucceed = true;

		String hql = "from TFieldsRanking where pageURL='"
				+ pageURL + "' and areaID='" + areaID + "' and progParams='"
				+ progParams + "' and logID='" + logID + "'";
		List list = this.getBaseDAO().find(hql);
		if (list.size() > 0)
		{
			TFieldsRanking t = (TFieldsRanking) list.get(0);
			this.getBaseDAO().delete(t);
		}
		// isSucceed = true;
		Clogger.logInfo("------end FieldsRankingService-------------\n\n");
		return isSucceed;
	}

	public Map<String,String> loadFieldsRankingConfigs(String logID)
	{
		String hql = "from TFieldsRanking where logID=?";
		List<TFieldsRanking> list = this.getBaseDAO().find(hql,new Object[]{logID});
		
		Map<String,String> fieldsRankingBuff=new HashMap<String,String>();
		
		for (int i = 0; i < list.size(); i++)
		{
			TFieldsRanking t = (TFieldsRanking) list.get(i);
			fieldsRankingBuff.put(t.getPageURL()+"__"+t.getAreaID()+"__"+t.getProgParams(), t.getRanking());
			
		}

		return fieldsRankingBuff;
	}

}
