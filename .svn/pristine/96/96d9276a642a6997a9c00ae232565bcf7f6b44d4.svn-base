package com.threegrand.controller.design;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.design.model.SinglePage;
import com.threegrand.bison.design.model.Template;
import com.threegrand.bison.design.service.SinglePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
@Controller
@RequestMapping("/module/singlePage")
public class SinglePageController {

    @Autowired
    private SinglePageService singlePageService;

    @RequestMapping(method = RequestMethod.GET)
    public String singlePage(Model model) throws JsonProcessingException {
        List<Template> templateList = singlePageService.getTemplateList(5);
        model.addAttribute("templateList", templateList);
        return "design/singlePage";
    }

    @RequestMapping("/getSinglePageListPage")
    @ResponseBody
    public DataTablesResponse getSinglePageListPage(SinglePage singlePage, HttpServletRequest request) {
        singlePage.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return new DataTablesResponse(singlePage, singlePageService.getSinglePageListPage(singlePage));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addSinglePage(@RequestBody SinglePage singlePage, HttpServletRequest request) {
        singlePage.setCompanyId((String) request.getSession().getAttribute("companyId"));
        int affectedLineNum = singlePageService.addSinglePage(singlePage);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{singlePageId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteSinglePage(@PathVariable String singlePageId) {
        int affectedLineNum = singlePageService.deleteSinglePage(singlePageId);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{singlePageId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse querySinglePage(@PathVariable String singlePageId, HttpServletRequest request) throws JsonProcessingException {
        return new AjaxResponse("singlePage", singlePageService.querySinglePage(singlePageId,
                request.getSession().getAttribute("companyId").toString()));

    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateSinglePage(@RequestBody @Valid SinglePage singlePage, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        singlePage.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectLineNum = singlePageService.updateSinglePage(singlePage);
        return AjaxResponse.getInstanceByResult(affectLineNum == Constant.AFFECTED_LINE_1);
    }
}
