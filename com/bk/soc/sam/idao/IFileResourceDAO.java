package com.bk.soc.sam.idao;

import com.bk.soc.sam.fileresource.data.TFileResource;

public interface IFileResourceDAO 
{
	/**
	 * ����hid��ѯ�ļ�
	 * **/
	public TFileResource getFileResource(String hid);
	/**
	 * ����hidɾ���ļ�
	 * **/
	public boolean deleteFileResource(String hid);
}
