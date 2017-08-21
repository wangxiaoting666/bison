package com.threegrand.bison.design.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.design.model.Template;

import java.util.List;

/**
 * Created by Administrator on 2014/9/26.
 */
@mybatisRepository
public interface TemplateDao {
    List<Template> getTemplateListPage(Template template);

    int addTemplate(Template template);

    Template getTemplateByTemplateName(String templateName);

    Template getTemplateByTemplateAlias(String templateAlias);

    Template getTemplate(String templateId);

    int updateTemplate(Template template);

    int deleteTemplate(String templateId);

    List<Template> getTemplateList(int templateType);

    List<Template> getTemplateLists(String companyId);
}
