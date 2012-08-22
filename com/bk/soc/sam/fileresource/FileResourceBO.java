package com.bk.soc.sam.fileresource;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.fdm.core.base.BaseBO;
import org.springframework.stereotype.Controller;

import com.bk.soc.sam.fileresource.data.TFileResource;
import com.bk.soc.sam.idao.IFileResourceDAO;
@Controller("SAM_FileResourceBO")
@RemoteProxy(name="SAM_FileResourceService")
public class FileResourceBO extends BaseBO implements IFileResourceDAO {

	public boolean deleteFileResource(String hid) 
	{
		String hql="from TFileResource _t1 where _t1.hid="+hid+"";
		List list = this.getBaseDAO().find(hql);
		if(list.size()>0)
		{
			TFileResource t = (TFileResource)list.get(0);
			if("1".equals(t.getUserCount()+""))
			{
				this.getBaseDAO().delete(t);
			}
			else
			{
				t.setUserCount(t.getUserCount()-1);
				this.getBaseDAO().updateView(t);	
			}
		}	
		return true;
	}

	public TFileResource getFileResource(String hid) 
	{
		String hql="from TFileResource _t1 where _t1.hid="+hid+"";
		List list = this.getBaseDAO().find(hql);
		if(list.size()>0)
		{
			TFileResource t = (TFileResource)list.get(0);
			return t;
		}
		return null;
	}

}
