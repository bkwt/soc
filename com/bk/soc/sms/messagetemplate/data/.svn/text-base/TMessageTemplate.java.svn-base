package com.bk.soc.sms.messagetemplate.data;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;

/**
 * ��ͨ�Ĳ�ѯ��ϢBean
 *
 */
@DataTransferObject 
@Entity  
@Table(name="SMS.SMS_BasicQueryMessageTemplate") 
public class TMessageTemplate {
	@Id @GeneratedValue(strategy=IDENTITY) 
	private Long hid;
	private String templateId;
	private String templateName;
	private String subSystem;
	private String dataSql;
	private String templateContent;
	private String needImpower;
	private String paramDesc;
	
	public String getParamDesc()
	{
		return paramDesc;
	}
	public void setParamDesc(String paramDesc)
	{
		this.paramDesc = paramDesc;
	}
	/**
	 * @return the hid
	 */
	public Long getHid() {
		return hid;
	}
	/**
	 * @param hid the hid to set
	 */
	public void setHid(Long hid) {
		this.hid = hid;
	}
	/**
	 * @return the templateId
	 */
	public String getTemplateId() {
		return templateId;
	}
	/**
	 * @param templateId the templateId to set
	 */
	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}
	/**
	 * @return the templateName
	 */
	public String getTemplateName() {
		return templateName;
	}
	/**
	 * @param templateName the templateName to set
	 */
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	/**
	 * @return the subsystem
	 */
	public String getSubSystem() {
		return subSystem;
	}
	/**
	 * @param subsystem the subsystem to set
	 */
	public void setSubSystem(String subSystem) {
		this.subSystem = subSystem;
	}
	/**
	 * @return the dataSql
	 */
	public String getDataSql() {
		return dataSql;
	}
	/**
	 * @param dataSql the dataSql to set
	 */
	public void setDataSql(String dataSql) {
		this.dataSql = dataSql;
	}
	/**
	 * @return the templateContent
	 */
	public String getTemplateContent() {
		return templateContent;
	}
	/**
	 * @param templateContent the templateContent to set
	 */
	public void setTemplateContent(String templateContent) {
		this.templateContent = templateContent;
	}
	public String getNeedImpower()
	{
		return needImpower;
	}
	public void setNeedImpower(String needImpower)
	{
		this.needImpower = needImpower;
	}	
}
