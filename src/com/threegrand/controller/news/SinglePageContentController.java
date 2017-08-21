package com.threegrand.controller.news;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.design.model.SinglePage;
import com.threegrand.bison.news.service.SinglePageContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2014/10/31.
 */
@Controller
@RequestMapping("/news/singlePageContent")
public class SinglePageContentController {

    @Autowired
    private SinglePageContentService singlePageContentService;

    @RequestMapping(method = RequestMethod.GET)
    public String singlePage(Model model) throws JsonProcessingException {
        return "news/singlePageContent";
    }

    @RequestMapping("/getSinglePageListPage")
    @ResponseBody
    public DataTablesResponse getSinglePageListPage(SinglePage singlePage, HttpServletRequest request) {
        singlePage.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return new DataTablesResponse(singlePage, singlePageContentService.getSinglePageListPage(singlePage));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateSinglePageContent(SinglePage singlePage, HttpServletRequest request) {
        singlePage.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectLineNum = singlePageContentService.updateSinglePageContent(singlePage);
        return AjaxResponse.getInstanceByResult(affectLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{singlePageId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getSinglePageContent(@PathVariable String singlePageId, HttpServletRequest request) throws JsonProcessingException {
        return new AjaxResponse("singlePageContent", singlePageContentService.getSinglePageContent(singlePageId,
                request.getSession().getAttribute("companyId").toString()));

    }

}
