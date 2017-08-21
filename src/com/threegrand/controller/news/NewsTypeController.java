package com.threegrand.controller.news;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.news.model.NewsType;
import com.threegrand.bison.news.service.NewsTypeService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by Administrator on 2014/9/25.
 */
@Controller
@RequestMapping("/news/newsType")
public class NewsTypeController {

    @Autowired
    private NewsTypeService newsTypeService;

    @RequestMapping(method = RequestMethod.GET)
    public String newsType(String moduleId) throws JsonProcessingException {
        if (!SecurityUtils.getSubject().isPermitted("news:news" + moduleId + ":open")) {
            throw new UnauthorizedException();
        }
        return "news/newsType";
    }

    @RequestMapping("/getTypeListPage")
    @ResponseBody
    public DataTablesResponse getTypeListPage(NewsType type) {
        return new DataTablesResponse(type, newsTypeService.getTypeListPage(type));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addType(@RequestBody @Valid NewsType type, BindingResult result) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectedLineNum = newsTypeService.addNewsType(type);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{newsTypeId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteType(@PathVariable String newsTypeId) {
        int affectedLineNum = newsTypeService.deleteNewsType(newsTypeId);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{newsTypeId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse queryType(@PathVariable String newsTypeId) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        NewsType type = newsTypeService.queryNewsType(newsTypeId);
        ajaxResponse.addAttribute("types", type);
        return ajaxResponse;
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateType(@RequestBody @Valid NewsType type, BindingResult result) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectLineNum = newsTypeService.updateNewsType(type);
        return AjaxResponse.getInstanceByResult(affectLineNum == Constant.AFFECTED_LINE_1);
    }

}
