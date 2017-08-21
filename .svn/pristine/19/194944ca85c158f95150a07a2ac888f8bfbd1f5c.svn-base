package com.threegrand.controller.design;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.design.model.Template;
import com.threegrand.bison.design.service.SinglePageService;
import com.threegrand.bison.system.model.Company;
import com.threegrand.bison.system.service.CompanyService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Administrator on 2014/11/3.
 */
@Controller
@RequestMapping("/module/indexTemplate")
public class IndexTemplateController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private SinglePageService singlePageService;


    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("module:indexTemplate:open")
    public String company(Model model, HttpServletRequest request) throws JsonProcessingException {
        Company company = (Company) request.getSession().getAttribute("company");
        List<Template> templateList = singlePageService.getTemplateList(1);
        model.addAttribute("templateList", templateList);
        model.addAttribute("indexTemplate", company.getIndexTemplate().getTemplateId());
        return "design/indexTemplate";
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateIndexTemplate(@RequestBody Company company, HttpServletRequest request) {
        company.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectedLineNum = companyService.updateIndexTemplate(company);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

}
