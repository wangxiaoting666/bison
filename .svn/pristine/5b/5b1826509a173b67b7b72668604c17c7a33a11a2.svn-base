package com.threegrand.controller.news;

import com.wonderland.sail.ajax.response.AjaxResponse;
import com.threegrand.bison.news.service.PageUpdateService;
import com.threegrand.bison.system.model.Company;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping("/news/pageUpdate")
public class PageUpdateController {

    @Autowired
    private PageUpdateService pageUpdateService;

    @RequestMapping(method = RequestMethod.GET)
    public String pageUpdate() {
        return "news/pageUpdate";
    }

    @RequestMapping(value = "/updateListPage", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateListPage(HttpServletRequest request) throws IOException, TemplateException {
        HttpSession session = request.getSession();
        Company company = (Company) request.getSession().getAttribute("company");
        String templatePath = session.getServletContext().getRealPath("template" + File.separator + company.getCompanyId());
        pageUpdateService.updateListPage(company, templatePath);
        return new AjaxResponse();
    }

    @RequestMapping(value = "/updateSinglePage", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateSinglePage(HttpServletRequest request) throws IOException, TemplateException {
        HttpSession session = request.getSession();
        Company company = (Company) request.getSession().getAttribute("company");
        String templatePath = session.getServletContext().getRealPath("template" + File.separator + company.getCompanyId());
        pageUpdateService.updateSinglePage(company, templatePath);
        return new AjaxResponse();
    }

    @RequestMapping(value = "/moduleCopy", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse moduleCopy(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        Company company = (Company) request.getSession().getAttribute("company");
        String templatePath = session.getServletContext().getRealPath("template" + File.separator + company.getCompanyId());
        pageUpdateService.moduleCopy(company, templatePath);
        return new AjaxResponse();
    }

    @RequestMapping(value = "/updateIndexPage", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateIndexPage(HttpServletRequest request) throws IOException, TemplateException {
        HttpSession session = request.getSession();
        Company company = (Company) request.getSession().getAttribute("company");
        String templatePath = session.getServletContext().getRealPath("template" + File.separator + company.getCompanyId());
        pageUpdateService.updateIndexPage(company, templatePath);
        return new AjaxResponse();
    }

    @RequestMapping(value = "/updateContentPage", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateContentPage(HttpServletRequest request) throws IOException, TemplateException {
        HttpSession session = request.getSession();
        Company company = (Company) request.getSession().getAttribute("company");
        String templatePath = session.getServletContext().getRealPath("template" + File.separator + company.getCompanyId());
        pageUpdateService.updateContentPage(company, templatePath);
        return new AjaxResponse();
    }
}
