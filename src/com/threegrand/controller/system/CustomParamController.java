package com.threegrand.controller.system;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.system.model.CustomParam;
import com.threegrand.bison.system.service.CustomParamService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/system/customParam")
public class CustomParamController {

    @Autowired
    private CustomParamService customParamService;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("system:customParam:open")
    public String customParam(Model model) throws JsonProcessingException {
        return "system/customParam";
    }

    @RequestMapping("/getCustomParamListPage")
    @ResponseBody
    public DataTablesResponse getCustomParamListPage(CustomParam customParam, HttpServletRequest request) {
        customParam.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return new DataTablesResponse(customParam, customParamService.getCustomParamListPage(customParam));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addCustomParam(CustomParam customParam, HttpServletRequest request) {
        customParam.setCompanyId((String) request.getSession().getAttribute("companyId"));
        int effectLineNum = customParamService.addCustomParam(customParam);
        return AjaxResponse.getInstanceByResult(effectLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{customParamId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteCustomParam(@PathVariable String customParamId) {
        int effectLineNum = customParamService.deleteCustomParam(customParamId);
        return AjaxResponse.getInstanceByResult(effectLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{customParamId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getCustomParam(@PathVariable String customParamId, HttpServletRequest request) {
        return new AjaxResponse("customParam", customParamService.getCustomParam(customParamId,
                request.getSession().getAttribute("companyId").toString()));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateCustomParam(CustomParam customParam, HttpServletRequest request) {
        customParam.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int effectLineNum = customParamService.updateCustomParam(customParam);
        return AjaxResponse.getInstanceByResult(effectLineNum == Constant.AFFECTED_LINE_1);
    }

}
