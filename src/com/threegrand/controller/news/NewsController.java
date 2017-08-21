package com.threegrand.controller.news;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.design.model.NewsParam;
import com.threegrand.bison.news.model.News;
import com.threegrand.bison.news.model.NewsType;
import com.threegrand.bison.news.service.NewsService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/news/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @RequestMapping(method = RequestMethod.GET)
    public String news(NewsType newsType, Model model) throws JsonProcessingException {
        if (!SecurityUtils.getSubject().isPermitted("news:news" + newsType.getModuleId() + ":open")) {
            throw new UnauthorizedException();
        }

        List<NewsType> newsTypeList = newsService.getTypeList(newsType);
        model.addAttribute("newsTypeList", newsTypeList);

        List<NewsParam> newsParamList = newsService.getNewsParamList(newsType.getModuleId());
        model.addAttribute("newsParamList", newsParamList);
        return "news/news";
    }

    @RequestMapping("/getNewsListPage")
    @ResponseBody
    public DataTablesResponse getNewsListPage(News news) {
        return new DataTablesResponse(news, newsService.getNewsListPage(news));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addNewsAndParam(@RequestBody News newsAndParam, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        //记录当前文章创建者
        String userId = (String) request.getSession().getAttribute("userId");
        newsAndParam.setCreatorId(userId);
        //获取当前系统时间
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //记录当前文章发布时间和创建时间
        if ("".equals(newsAndParam.getPublishTime())) {
            newsAndParam.setPublishTime(sdf.format(now));
        }
        newsAndParam.setCreateTime(sdf.format(now));
        //记录当前文章最后修改时间和最后修改者
        newsAndParam.setLastModifyTime(sdf.format(now));
        String userName = (String) request.getSession().getAttribute("username");
        newsAndParam.setLastModifyOperator(userName);
        int affectedLineNum = newsService.addNewsAndParam(newsAndParam);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{newsId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getNewsAndParam(@PathVariable String newsId) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        News newsAndParam = newsService.getNewsAndParam(newsId);
        ajaxResponse.addAttribute("newsAndParam", newsAndParam);
        return ajaxResponse;
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateNewsAndParam(@RequestBody @Valid News newsAndParam, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        //获取当前系统时间
        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        //记录当前文章最后修改时间和最后修改者
        newsAndParam.setLastModifyTime(sdf.format(now));
        String userName = (String) request.getSession().getAttribute("username");
        newsAndParam.setLastModifyOperator(userName);
        int affectedLineNum = newsService.updateNewsAndParam(newsAndParam);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{newsId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteNews(@PathVariable String newsId) {
        int affectedLineNum = newsService.deleteNewsAndParam(newsId);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

}

