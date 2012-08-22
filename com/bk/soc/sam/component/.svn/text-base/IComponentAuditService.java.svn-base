package com.bk.soc.sam.component;

import java.util.List;
import java.util.Map;

import com.bk.soc.sam.component.data.TAuditFlow;
import com.bk.soc.sam.component.data.TAuditRuleExpression;
import com.bk.soc.sam.component.data.TAuditStep;
import com.bk.soc.sam.shared.data.ViewData;

public interface IComponentAuditService
{
	public ViewData queryAuditFlows(String componentId);

	public ViewData queryAuditFlow(String componentId, String flowId);

	public ViewData opAddNewAuditFlow(TAuditFlow bill);

	public ViewData opModifyAuditFlows(List<TAuditFlow> list);

	public ViewData opDeleteAuditFlows(List<TAuditFlow> list);

	public ViewData queryAuditRuleExpression(String componentId, String flowId);

	public ViewData opSaveAuditRuleExpression(TAuditRuleExpression bill);

	public ViewData queryAuditSteps(String componentId, String flowId);

	public ViewData opAddNewAuditStep(TAuditStep bill);

	public ViewData opModifyAuditSteps(List<TAuditStep> list);

	public ViewData opDeleteAuditSteps(List<TAuditStep> list);

	public ViewData opTestAudit(String componentId, Map bill);
}
