package com.threegrand.controller.design;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.basic.model.DictName;
import com.threegrand.bison.basic.model.DictValue;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.common.util.FileUtil;
import com.threegrand.bison.design.model.Template;
import com.threegrand.bison.design.service.TemplateService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.util.List;

/**
 * Created by Administrator on 2014/9/26.
 */
@Controller
@RequestMapping("/design/template")
public class TemplateController {
    @Autowired
    private TemplateService templateService;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("design:template:open")
    public String template(Model model) {
        List<DictValue> templateTypeList = DictValue.getDictValueList(DictName.TEMPLATE_TYPE);
        model.addAttribute("templateTypeList", templateTypeList);
        return "design/template";
    }

    @RequestMapping("/getTemplateListPage")
    @ResponseBody
    public DataTablesResponse getTemplateListPage(Template template, HttpServletRequest request) {
        template.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return new DataTablesResponse(template, templateService.getTemplateListPage(template));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addTemplate(@RequestBody @Valid Template template, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        String path = request.getServletContext().getRealPath("/template/" + request.getSession().getAttribute("companyId").toString());
        template.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectedLineNum = templateService.addTemplate(template);
        FileUtil.createFile(template.getTemplateAlias() + ".ftl", template.getContent(), path);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{templateId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getTemplate(@PathVariable String templateId, HttpServletRequest request) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        Template template = templateService.getTemplate(templateId);
        template.setCompanyId(request.getSession().getAttribute("companyId").toString());
        String path = request.getServletContext().getRealPath("/template/" + request.getSession().getAttribute("companyId").toString() + "/" + template.getTemplateAlias() + ".ftl");
        String content = FileUtil.readFile(path);
        template.setContent(content);
        ajaxResponse.addAttribute("template", template);
        ajaxResponse.addAttribute("template", template);
        return ajaxResponse;
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateTemplate(@RequestBody @Valid Template template, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        template.setCompanyId(request.getSession().getAttribute("companyId").toString());
        Template template1 = templateService.getTemplate(template.getTemplateId());
        int affectedLineNum = templateService.updateTemplate(template);
        String path = request.getServletContext().getRealPath("/template/" + request.getSession().getAttribute("companyId").toString());
        FileUtil.deleteFile(path + File.separator + template1.getTemplateAlias() + ".ftl");
        FileUtil.createFile(template.getTemplateAlias() + ".ftl", template.getContent(), path);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{templateId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteTemplate(@PathVariable String templateId, HttpServletRequest request) {
        Template template = templateService.getTemplate(templateId);
        int affectedLineNum = templateService.deleteTemplate(templateId);
        String path = request.getServletContext().getRealPath("/template/" + request.getSession().getAttribute("companyId").toString() + "/" + template.getTemplateAlias() + ".ftl");
        FileUtil.deleteFile(path);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }
}
