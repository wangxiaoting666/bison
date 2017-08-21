package com.threegrand.controller.design;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.design.model.Module;
import com.threegrand.bison.design.model.Template;
import com.threegrand.bison.design.service.ModuleService;
import com.threegrand.bison.design.service.TemplateService;
import com.threegrand.bison.develop.service.MenuService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/**
 * Created by Administrator on 2014/9/23.
 * User: 宗晓宇
 * Date: 2014/9/23
 * Time: 13:24
 */
@Controller
@RequestMapping("/module/module")
public class ModuleController {
    @Autowired
    private ModuleService moduleService;
    @Autowired
    private MenuService menuService;
    @Autowired
    private TemplateService templateService;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("module:module:open")
    public String module(Model model) throws JsonProcessingException {
        List<Template> indexTemplateList = templateService.getTemplateList(Template.template_index);
        List<Template> listTemplateList = templateService.getTemplateList(Template.template_list);
        List<Template> contentTemplateList = templateService.getTemplateList(Template.template_content);
        model.addAttribute("indexTemplateList", indexTemplateList);
        model.addAttribute("listTemplateList", listTemplateList);
        model.addAttribute("contentTemplateList", contentTemplateList);
        return "design/module";
    }

    @RequestMapping("/getModuleListPage")
    @ResponseBody
    public DataTablesResponse getModuleListPage(Module module, HttpServletRequest request) throws IOException {
        String companyId = getCompanyId(request);
        module.setCompanyId(companyId);
        return new DataTablesResponse(module, moduleService.getModuleListPage(module));
    }

    private String getCompanyId(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return (String) session.getAttribute("companyId");
    }

    @RequestMapping(value = "/getTemplate", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getIndexTemplateNameList() throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        ajaxResponse.addAttribute("indexTemplateNameList", templateService.getTemplateList(Template.template_index));
        return ajaxResponse;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addModule(@RequestBody @Valid Module module, BindingResult result, HttpServletRequest request) throws IOException {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        String companyId = getCompanyId(request);
        module.setCompanyId(companyId);
        int affectedLineNum = moduleService.addModule(module);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{moduleId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getModule(@PathVariable String moduleId) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        Module module = moduleService.getModuleById(moduleId);
        ajaxResponse.addAttribute("module", module);
        return ajaxResponse;
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateModule(@RequestBody @Valid Module module, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        module.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectedLineNum = moduleService.updateModule(module);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{moduleId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteModule(@PathVariable String moduleId) {
        int affectedLineNum = moduleService.deleteModule(moduleId);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }
}
