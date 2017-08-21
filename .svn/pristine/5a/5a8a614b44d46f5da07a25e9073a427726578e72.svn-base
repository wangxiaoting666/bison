package com.threegrand.bison.news.service.impl;

import com.threegrand.bison.design.model.Module;
import com.threegrand.bison.design.model.SinglePage;
import com.threegrand.bison.design.service.ModuleService;
import com.threegrand.bison.design.service.SinglePageService;
import com.threegrand.bison.design.service.TemplateService;
import com.threegrand.bison.news.model.IndexParam;
import com.threegrand.bison.news.model.News;
import com.threegrand.bison.news.model.NewsType;
import com.threegrand.bison.news.service.IndexService;
import com.threegrand.bison.news.service.NewsService;
import com.threegrand.bison.news.service.NewsTypeService;
import com.threegrand.bison.news.service.PageUpdateService;
import com.threegrand.bison.system.model.Company;
import com.threegrand.bison.system.service.CompanyService;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("indexService")
public class IndexServiceImpl implements IndexService {

    public static final String ACT_INDEX = "index";
    private static final String ACT_LIST = "list";
    private static final String ACT_DETAIL = "detail";
    private static final String ACT_SINGLE = "single";

    @Autowired
    private PageUpdateService pageUpdateService;

    @Autowired
    private NewsService newsService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private TemplateService templateService;

    @Autowired
    private NewsTypeService newsTypeService;
    @Autowired
    private ModuleService moduleService;
    @Autowired
    private SinglePageService singlePageService;


    @Override
    public void index(IndexParam param, PrintWriter writer) throws IOException, TemplateException {
        if(param.getAct().equals("index")){
        	outIndexPage(param, writer);
        }else if(param.getAct().equals("list")){
        	outListPage(param, writer);
        }else if(param.getAct().equals("detail")){
        	outDetailPage(param, writer);
        }else if(param.getAct().equals("single")){
        	ousSinglePage(param, writer);
        }
    	
    }

    private void ousSinglePage(IndexParam param, PrintWriter writer) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Company company = companyService.getCompany(param.getComId());
        pageUpdateService.putGeneralParam(company, paramMap);
        SinglePage singlePage = singlePageService.getSinglePageByAlias(param.getDetail(), company.getCompanyId());
        paramMap.put("content", singlePage.getContent());
        paramMap.put("title", singlePage.getTitle());
        paramMap.put("alia", singlePage.getAlias());
        Template template = pageUpdateService.getTemplate(param.getTemplatePath(), templateService.getTemplate(singlePage.getTemplateId()).getTemplateAlias() + PageUpdateServiceImpl.TEMPLATE_EXTEND_NAME);
        template.process(paramMap, writer);
        writer.close();
    }

    private void outDetailPage(IndexParam param, PrintWriter writer) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Company company = companyService.getCompany(param.getComId());
        Module module = moduleService.getModuleByAlias(param.getModule());
        pageUpdateService.putGeneralParam(company, paramMap);
        News news = newsService.getNews(param.getDetail());
        pageUpdateService.putNewsParam(param.getDetail(), paramMap);
        Template template = pageUpdateService.getTemplate(param.getTemplatePath(), templateService.getTemplate(module.getContentTemplateId()).getTemplateAlias() + PageUpdateServiceImpl.TEMPLATE_EXTEND_NAME);
        paramMap.put("news", news);
        template.process(paramMap, writer);
        writer.close();

    }

    private void outListPage(IndexParam param, PrintWriter writer) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Company company = companyService.getCompany(param.getComId());
        Module module = moduleService.getModuleByAlias(param.getModule());
        pageUpdateService.putGeneralParam(company, paramMap);

        News news = new News();
        NewsType newsType = new NewsType();
        newsType.setModuleId(module.getModuleId());
        news.setNewsType(newsType);
        news.setPageNo(param.getRealPageNo());
        news.setPageSize(module.getModulePageSize());
        String typeUrl = "";
        if (!StringUtils.isBlank(param.getT())) {
            news.setNewsTypeId(param.getT());
            typeUrl = "&t=" + param.getT();
            paramMap.put("pageNewsTypeName", newsTypeService.queryNewsType(param.getT()).getNewsTypeName());
        }
        List<News> newsList = newsService.getFrontNewsListPage(news);

        paramMap.put("pageNewsTypeName", "");
        NewsType newsTypeParam = new NewsType();
        newsTypeParam.setModuleId(module.getModuleId());
        List<NewsType> newsTypesList = newsTypeService.getTypeList(newsTypeParam);

        paramMap.put("pageModule", module);
        paramMap.put("pageTypeList", newsTypesList);
        paramMap.put("pageList", newsList);
        paramMap.put("prePageUrl", news.getPageNo() > 1 ? "?act=list&module=" + module.getModuleId() + "&pageNo=" + (news.getPageNo() - 1) + typeUrl : "#");
        paramMap.put("nextPageUrl", news.getPageNo() < news.getTotalPage() ? "?act=list&module=" + module.getModuleId() + "&pageNo=" + (news.getPageNo() + 1) + typeUrl : "#");
        paramMap.put("pageNum", news.getPageNo());
        paramMap.put("totalPage", news.getTotalPage());
        paramMap.put("totalResult", news.getTotalResult());
        paramMap.put("firstPageUrl", "?act=list&module=" + module.getModuleId() + typeUrl);
        paramMap.put("endPageUrl", "?act=list&module=" + module.getModuleId() + "&pageNo=" + news.getTotalPage() + typeUrl);
        Template template = pageUpdateService.getTemplate(param.getTemplatePath(), templateService.getTemplate(module.getListTemplateId()).getTemplateAlias() + PageUpdateServiceImpl.TEMPLATE_EXTEND_NAME);
        template.process(paramMap, writer);
        writer.close();
    }

    private void outIndexPage(IndexParam param, PrintWriter writer) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Company company = companyService.getCompany(param.getComId());
        pageUpdateService.putGeneralParam(company, paramMap);
        Template template = pageUpdateService.getTemplate(param.getTemplatePath(), "index" + PageUpdateServiceImpl.TEMPLATE_EXTEND_NAME);
        List<Module> moduleList = (List<Module>) paramMap.get("moduleList");
        for (Module module1 : moduleList) {
            News news = new News();
            NewsType newsType = new NewsType();
            List<News> newsList = new ArrayList<News>();
            newsType.setModuleId(module1.getModuleId());
            news.setNewsType(newsType);
            List<News> newsList1 = newsService.getNewsListSequence(news);
            for (News news1 : newsList1) {
                newsList.add(news1);
            }
            paramMap.put(module1.getAlias() + "IndexList", newsList);
        }
        template.process(paramMap, writer);
        writer.close();
    }

}
