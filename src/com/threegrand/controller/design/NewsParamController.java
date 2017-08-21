package com.threegrand.controller.design;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.design.dao.ModuleDao;
import com.threegrand.bison.design.model.Module;
import com.threegrand.bison.design.model.NewsParam;
import com.threegrand.bison.design.service.NewsParamService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Administrator on 2014/10/11.
 */
@Controller
@RequestMapping("/design/newsParam")
public class NewsParamController {

    @Autowired
    private NewsParamService newsParamService;

    @Autowired
    private ModuleDao moduleDao;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("design:newsParam:open")
    public String newsParam(Model model, HttpServletRequest request) throws JsonProcessingException {
        List<Module> moduleList = moduleDao.getModuleList(request.getSession().getAttribute("companyId").toString());
        model.addAttribute("moduleList", moduleList);
        return "design/newsParam";
    }

    @RequestMapping("/getNewsParamListPage")
    @ResponseBody
    public DataTablesResponse getNewsParamListPage(NewsParam newsParam) {
        return new DataTablesResponse(newsParam, newsParamService.getNewsParamListPage(newsParam));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addNewsParam(NewsParam newsParam) {
        int effectLineNum = newsParamService.addNewsParam(newsParam);
        return AjaxResponse.getInstanceByResult(effectLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{newsParamId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteNewsParam(@PathVariable String newsParamId) {
        int effectLineNum = newsParamService.deleteNewsParam(newsParamId);
        return AjaxResponse.getInstanceByResult(effectLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{newsParamId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getNewsParam(@PathVariable String newsParamId) {
        return new AjaxResponse("newsParam", newsParamService.getNewsParam(newsParamId));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateNewsParam(NewsParam newsParam) {
        int effectLineNum = newsParamService.updateNewsParam(newsParam);
        return AjaxResponse.getInstanceByResult(effectLineNum == Constant.AFFECTED_LINE_1);
    }

}
