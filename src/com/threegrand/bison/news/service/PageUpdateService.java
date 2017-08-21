package com.threegrand.bison.news.service;

import com.threegrand.bison.system.model.Company;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.IOException;
import java.util.Map;

public interface PageUpdateService {

    Template getTemplate(String templatePath, String templateName) throws IOException;

    void updateListPage(Company company, String templatePath) throws IOException, TemplateException;

    void updateSinglePage(Company company, String templatePath) throws IOException, TemplateException;

    void putGeneralParam(Company company, Map<String, Object> paramMap);

    void updateIndexPage(Company company, String templatePath) throws IOException, TemplateException;

    void moduleCopy(Company company, String newPath);

    void updateContentPage(Company company, String templatePath) throws IOException, TemplateException;

    void putNewsParam(String newsId, Map<String, Object> paramMap);
}
