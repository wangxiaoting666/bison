package com.threegrand.bison.news.service.impl;

import com.threegrand.bison.common.util.FileUtil;
import com.threegrand.bison.design.dao.NewsParamValueDao;
import com.threegrand.bison.design.model.Module;
import com.threegrand.bison.design.model.NewsParamValue;
import com.threegrand.bison.design.model.SinglePage;
import com.threegrand.bison.design.service.ModuleService;
import com.threegrand.bison.design.service.SinglePageService;
import com.threegrand.bison.design.service.TemplateService;
import com.threegrand.bison.news.freemarker.tag.AfterPageDirective;
import com.threegrand.bison.news.freemarker.tag.PrePageDirective;
import com.threegrand.bison.news.model.News;
import com.threegrand.bison.news.model.NewsType;
import com.threegrand.bison.news.service.NewsService;
import com.threegrand.bison.news.service.NewsTypeService;
import com.threegrand.bison.news.service.PageUpdateService;
import com.threegrand.bison.system.model.Company;
import com.threegrand.bison.system.model.SysParam;
import com.threegrand.bison.system.service.SysParamService;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("pageUpdateService")
public class PageUpdateServiceImpl implements PageUpdateService {

    @Autowired
    private TemplateService templateService;

    @Autowired
    private NewsTypeService newsTypeService;

    @Autowired
    private NewsService newsService;

    @Autowired
    private SysParamService sysParamService;

    @Autowired
    private NewsParamValueDao newsParamValueDao;

    @Value("${apacheDocPath}")
    private String apacheDocPath;

    @Autowired
    private ModuleService moduleService;

    @Autowired
    private SinglePageService singlePageService;

    public static final String TEMPLATE_EXTEND_NAME = ".ftl";

    /**
     * 获取模板
     * @param templatePath 模板路径
     * @param templateName 模板名称
     * @return Template
     * @throws IOException
     */
    @Override
    public Template getTemplate(String templatePath, String templateName) throws IOException {
        Configuration configuration = new Configuration();
        configuration.setDirectoryForTemplateLoading(new File(templatePath));
        configuration.setObjectWrapper(new DefaultObjectWrapper());
        //这个一定要设置，不然在生成的页面中 会乱码
        configuration.setDefaultEncoding("UTF-8");
        return configuration.getTemplate(templateName);
    }

    /**
     * 更新列表页的html
     * @param company 公司
     * @param templatePath 模板路径
     * @throws IOException
     * @throws TemplateException
     */
    @Override
    public void updateListPage(Company company, String templatePath) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        putGeneralParam(company, paramMap);
        List<Module> moduleList = (List<Module>) paramMap.get("moduleList");
        createTypeListPage(moduleList, paramMap, templatePath);
        createListPage(templatePath, moduleList, paramMap);
    }

    /**
     * 放入所有页面通用的数据
     * @param company 公司
     * @param paramMap 传递给模板的数据
     */
    @Override
    public void putGeneralParam(Company company, Map<String, Object> paramMap) {
        paramMap.put("company", company);
        putSysParam(company.getCompanyId(), paramMap);
        List<Module> moduleList = putModuleList(company.getCompanyId(), paramMap);
        putModule(moduleList, paramMap);
        putTypeList(moduleList, paramMap);
        putSinglePage(company.getCompanyId(), paramMap);
        putApacheDocPath(company, paramMap);
    }

    /**
     * 将系统变量放入模板数据中
     * @param companyId 公司id
     * @param paramMap 传给模板的数据
     */
    private void putSysParam(String companyId, Map<String, Object> paramMap) {
        List<SysParam> sysParamList = sysParamService.getSysParamList(companyId);
        Map<String, String> map = new HashMap<String, String>();
        for (SysParam sysParam : sysParamList) {
            map.put(sysParam.getSysParamName(), sysParam.getSysParamValue());
        }
        paramMap.put("sysParam", map);
    }

    /**
     * 将模块列表放入模板数据中
     * @param companyId 公司id
     * @param paramMap 传给模板的数据
     * @return 模块列表
     */
    private List<Module> putModuleList(String companyId, Map<String, Object> paramMap) {
        List<Module> moduleList = moduleService.getModuleList(companyId);
        paramMap.put("moduleList", moduleList);
        return moduleList;
    }

    /**
     * 将模块以map的形式放入模板数据中，key为模块的别名
     * @param moduleList 模块列表
     * @param paramMap 传给模板的数据
     */
    private void putModule(List<Module> moduleList, Map<String, Object> paramMap) {
        Map<String, Module> map = new HashMap<String, Module>();
        for (Module module : moduleList) {
            map.put(module.getAlias(), module);
        }
        paramMap.put("module", map);
    }

    /**
     * 将模块的分类信息放入模板数据
     * @param moduleList 模块列表
     * @param paramMap 传给模板的数据
     */
    private void putTypeList(List<Module> moduleList, Map<String, Object> paramMap) {
        for (Module module : moduleList) {
            NewsType param = new NewsType();
            param.setModuleId(module.getModuleId());
            List<NewsType> newsTypesList = newsTypeService.getTypeList(param);
            paramMap.put(module.getAlias() + "TypeList", newsTypesList);
        }
    }

    /**
     * 将单页放入模板数据
     * @param companyId 公司id
     * @param paramMap 传给模板的数据
     */
    private void putSinglePage(String companyId, Map<String, Object> paramMap) {
        List<SinglePage> singlePageList = singlePageService.getSinglePageList(companyId);
        paramMap.put("singlePageList", singlePageList);
        for (SinglePage singlePage : singlePageList) {
            paramMap.put(singlePage.getAlias() + "singlePage", singlePage);
        }
    }

    /**
     * 将静态服务器的html目录放入模板数据，用于之后生成html
     * @param company 公司
     * @param paramMap 传给模板的数据
     */
    private void putApacheDocPath(Company company, Map<String, Object> paramMap) {
        String apacheDocAndCompanyPath = apacheDocPath + company.getCompanyTemplateDir();
        paramMap.put("apacheDocAndCompanyPath", apacheDocAndCompanyPath);
    }

    /**
     * 生成分类的列表页
     * @param moduleList 模块列表
     * @param paramMap 传给模板的数据
     * @param templatePath 模板路径
     * @throws IOException
     * @throws TemplateException
     */
    private void createTypeListPage(List<Module> moduleList, Map<String, Object> paramMap, String templatePath) throws IOException, TemplateException {
        for (Module module : moduleList) {
            List<NewsType> newsTypesList = (List<NewsType>) paramMap.get(module.getAlias() + "TypeList");
            for (NewsType newsType : newsTypesList) {
                List<News> newsList = newsService.getNewsByTypeId(newsType.getNewsTypeId());
                paramMap.put("pageNewsTypeName", newsType.getNewsTypeName());
                updateListPageByModule(newsList, module, templatePath, paramMap, newsType.getNewsTypeId() + "list");
            }
        }
    }

    /**
     * 生成分页页面
     * @param templatePath 模板路径
     * @param moduleList 模块列表
     * @param paramMap 传给模板的数据
     * @throws IOException
     * @throws TemplateException
     */
    private void createListPage(String templatePath, List<Module> moduleList, Map<String, Object> paramMap) throws IOException, TemplateException {
        for (Module module : moduleList) {
            News news = new News();
            NewsType newsType = new NewsType();
            newsType.setModuleId(module.getModuleId());
            news.setNewsType(newsType);
            List<News> newsList = newsService.getNewsList(news);
            paramMap.put("pageNewsTypeName", "");
            updateListPageByModule(newsList, module, templatePath, paramMap, "list");
        }
    }

    /**
     * 更新首页
     * @param company 公司
     * @param templatePath 模板路径
     * @throws IOException
     * @throws TemplateException
     */
    @Override
    public void updateIndexPage(Company company, String templatePath) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        putGeneralParam(company, paramMap);
        updateIndexListModule(templatePath, paramMap);
    }

    /**
     * 更新单页
     * @param company 公司
     * @param templatePath 模板路径
     * @throws IOException
     * @throws TemplateException
     */
    @Override
    public void updateSinglePage(Company company, String templatePath) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        putGeneralParam(company, paramMap);
        List<SinglePage> singlePageList = (List<SinglePage>) paramMap.get("singlePageList");
        for (SinglePage singlePage : singlePageList) {
            paramMap.put("content", singlePage.getContent());
            paramMap.put("title", singlePage.getTitle());
            paramMap.put("alia", singlePage.getAlias());
            singleListModule(singlePage, singlePage.getAlias(), templatePath, paramMap);
        }
    }

    /**
     * 复制模板
     * @param company 公司
     * @param path 路径
     */
    @Override
    public void moduleCopy(Company company, String path) {
        FileUtil.copyFolder(path, apacheDocPath + File.separator + company.getCompanyTemplateDir());
    }

    /**
     * 根据模块更新列表页
     * @param newsList 新闻列表
     * @param module 模块
     * @param templatePath 模板路径
     * @param paramMap 传给模板的参数
     * @param fileName 文件名
     * @throws IOException
     * @throws TemplateException
     */
    private void updateListPageByModule(List<News> newsList, Module module, String templatePath, Map<String, Object> paramMap, String fileName) throws IOException, TemplateException {
        Template template = getTemplate(templatePath, templateService.getTemplate(module.getListTemplateId()).getTemplateAlias() + TEMPLATE_EXTEND_NAME);
        String apacheDocAndCompanyPath = (String) paramMap.get("apacheDocAndCompanyPath");
        String dir = apacheDocAndCompanyPath + File.separator + module.getAlias() + File.separator;
        File file = new File(dir);
        if (!file.exists()) {
            file.mkdirs();
        }
        //处理新闻分页，按页生成html
        int pageSize = module.getModulePageSize();
        int totalPage = newsList.size() / pageSize;
        if (newsList.size() % pageSize != 0) {
            totalPage = totalPage + 1;
        }
        if (newsList.size() == 0) {
            totalPage = 1;
        }
        //获取栏目信息集合
        for (int i = 1; i <= totalPage; i++) {
            Writer writer = new OutputStreamWriter(new FileOutputStream(dir + fileName + i + ".html"), "UTF-8");
            int endIndex = i < totalPage ? i * pageSize : newsList.size();
            NewsType param = new NewsType();
            param.setModuleId(module.getModuleId());
            List<NewsType> newsTypesList = newsTypeService.getTypeList(param);
            paramMap.put("pageModule", module);
            paramMap.put("pageTypeList", newsTypesList);
            paramMap.put("pageList", newsList.subList((i - 1) * pageSize, endIndex));
            paramMap.put("prePageUrl", i > 1 ? fileName + (i - 1) + ".html" : "#");
            paramMap.put("nextPageUrl", i < totalPage ? fileName + (i + 1) + ".html" : "#");
            paramMap.put("pageNum", i);
            paramMap.put("totalPage", totalPage);
            paramMap.put("totalResult", newsList.size());
            paramMap.put("firstPageUrl", fileName + "1.html");
            paramMap.put("endPageUrl", fileName + totalPage + ".html");
            paramMap.put("prePage", new PrePageDirective());
            paramMap.put("afterPage", new AfterPageDirective());
            paramMap.put("urlPrefix", fileName);
            template.process(paramMap, writer);
            writer.close();
        }
    }

    /**
     * 更新首页的列表模块
     * @param templatePath 模板路径
     * @param paramMap 传给模板的参数
     * @throws IOException
     * @throws TemplateException
     */
    private void updateIndexListModule(String templatePath, Map<String, Object> paramMap) throws IOException, TemplateException {
        Template template = getTemplate(templatePath, "index" + TEMPLATE_EXTEND_NAME);
        String apacheDocAndCompanyPath = (String) paramMap.get("apacheDocAndCompanyPath");
        String dir = apacheDocAndCompanyPath + File.separator;
        File file = new File(dir);
        if (!file.exists()) {
            file.mkdirs();
        }
        Writer writer = new OutputStreamWriter(new FileOutputStream(dir + "index.html"), "UTF-8");
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

    /**
     * 生成单页的html
     * @param singlePage 单页
     * @param alias 别名
     * @param templatePath 模板路径
     * @param paramMap 传入目标的参数
     * @throws IOException
     * @throws TemplateException
     */
    private void singleListModule(SinglePage singlePage, String alias, String templatePath, Map<String, Object> paramMap) throws IOException, TemplateException {
        Template template = getTemplate(templatePath, templateService.getTemplate(singlePage.getTemplateId()).getTemplateAlias() + TEMPLATE_EXTEND_NAME);
        String apacheDocAndCompanyPath = (String) paramMap.get("apacheDocAndCompanyPath");
        String dir = apacheDocAndCompanyPath + File.separator + "singlePage" + File.separator;
        File file = new File(dir);
        if (!file.exists()) {
            file.mkdirs();
        }
        Writer writer = new OutputStreamWriter(new FileOutputStream(dir + alias + ".html"), "UTF-8");
        template.process(paramMap, writer);
        writer.close();
    }

    /**
     * 更新内容页
     * @param company 公司
     * @param templatePath 模板路径
     * @throws IOException
     * @throws TemplateException
     */
    @Override
    public void updateContentPage(Company company, String templatePath) throws IOException, TemplateException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        putGeneralParam(company, paramMap);
        List<Module> moduleList = (List<Module>) paramMap.get("moduleList");
        for (Module module : moduleList) {
            News news = new News();
            NewsType newsType = new NewsType();
            newsType.setModuleId(module.getModuleId());
            news.setNewsType(newsType);
            List<News> newsList = newsService.getNewsList(news);
            for (News news2 : newsList) {
                putNewsParam(news2.getNewsId(), paramMap);
                updateContentPageByModule(module, templatePath, paramMap, news2);
            }
        }

    }

    /**
     * 将新闻的参数放入模板数据
     * @param newsId 新闻id
     * @param paramMap 传入模板的数据
     */
    @Override
    public void putNewsParam(String newsId, Map<String, Object> paramMap) {
        List<NewsParamValue> newsParamList = newsParamValueDao.getNewsParamValue(newsId);
        Map<String, String> map = new HashMap<String, String>();
        for (NewsParamValue newsParamValue : newsParamList) {
            map.put(newsParamValue.getNewsParam().getParamName(), newsParamValue.getParamValue());
        }
        paramMap.put("newsParamValue", map);
    }

    /**
     * 根据模块更新内容页
     * @param module 模块
     * @param templatePath 模板路径
     * @param paramMap 传入模板的参数
     * @param news 新闻
     * @throws IOException
     * @throws TemplateException
     */
    private void updateContentPageByModule(Module module, String templatePath, Map<String, Object> paramMap, News news) throws IOException, TemplateException {
        Template template = getTemplate(templatePath, templateService.getTemplate(module.getContentTemplateId()).getTemplateAlias() + ".ftl");
        String apacheDocAndCompanyPath = (String) paramMap.get("apacheDocAndCompanyPath");
        String dir = apacheDocAndCompanyPath + File.separator + module.getAlias() + File.separator;
        File file = new File(dir);
        if (!file.exists()) {
            file.mkdirs();
        }
        Writer writer = new OutputStreamWriter(new FileOutputStream(dir + "detail" + news.getNewsId() + ".html"), "UTF-8");
//            news.setContent(news.getContent().replaceAll("template/\\d+/", "../"));
        paramMap.put("news", news);
        template.process(paramMap, writer);
        writer.close();
    }
}