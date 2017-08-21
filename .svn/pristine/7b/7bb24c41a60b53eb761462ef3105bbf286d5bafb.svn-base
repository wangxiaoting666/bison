package com.threegrand.controller.system;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.system.model.SysParam;
import com.threegrand.bison.system.service.SysParamService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2014/9/26.
 */

@Controller
@RequestMapping("/system/sysParam")
public class SysParamController {

    @Autowired
    private SysParamService sysParamService;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("system:sysParam:open")
    public String sysParam(Model model) throws JsonProcessingException {
        return "system/sysParam";
    }

    @RequestMapping("/getSysParamListPage")
    @ResponseBody
    public DataTablesResponse getSysParamListPage(SysParam sysParam, HttpServletRequest request) {
        sysParam.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return new DataTablesResponse(sysParam, sysParamService.getSysParamListPage(sysParam));
    }

    @RequestMapping(value = "/{sysParamId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getSysParam(@PathVariable String sysParamId, HttpServletRequest request) {
        return new AjaxResponse("sysParam", sysParamService.getSysParam(sysParamId,
                request.getSession().getAttribute("companyId").toString()));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateSysParam(SysParam sysParam, HttpServletRequest request) {
        sysParam.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int effectLineNum = sysParamService.updateSysParam(sysParam);
        return AjaxResponse.getInstanceByResult(effectLineNum == Constant.AFFECTED_LINE_1);
    }

}
