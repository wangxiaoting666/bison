package com.threegrand.bison.design.service;

import com.threegrand.bison.design.model.Template;

import java.util.List;

/**
 * Created by Administrator on 2014/9/26.
 */
public interface TemplateService {
    List<Template> getTemplateListPage(Template template);

    int addTemplate(Template template);

    Template getTemplate(String templateId);

    int updateTemplate(Template template);

    int deleteTemplate(String templateId);

    List<Template> getTemplateList(int templateType);

}
