package com.threegrand.bison.design.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.design.dao.TemplateDao;
import com.threegrand.bison.design.model.Template;
import com.threegrand.bison.design.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/9/26.
 */
@Service("templateService")
public class TemplateServiceImpl implements TemplateService {
    @Autowired
    private TemplateDao templateDao;

    @Override
    public List<Template> getTemplateListPage(Template template) {
        return templateDao.getTemplateListPage(template);
    }

    @Override
    public int addTemplate(Template template) {
        validateRepeatTemplateName(template);
        validateRepeatTemplateAlias(template);
        return templateDao.addTemplate(template);
    }

    @Override
    public Template getTemplate(String templateId) {
        return templateDao.getTemplate(templateId);
    }

    @Override
    public int updateTemplate(Template template) {
        if (!templateDao.getTemplate(template.getTemplateId()).getTemplateName().equals(template.getTemplateName())) {
            validateRepeatTemplateName(template);
        }
        if (!templateDao.getTemplate(template.getTemplateId()).getTemplateAlias().equals(template.getTemplateAlias())) {
            validateRepeatTemplateAlias(template);
        }
        return templateDao.updateTemplate(template);
    }

    private void validateRepeatTemplateName(Template template) {
        if (templateDao.getTemplateByTemplateName(template.getTemplateName()) != null) {
            throw new ValidateErrorException("模板名已存在！");
        }
    }

    private void validateRepeatTemplateAlias(Template template) {
        if (templateDao.getTemplateByTemplateAlias(template.getTemplateAlias()) != null) {
            throw new ValidateErrorException("别名已存在！");
        }
    }


    @Override
    public int deleteTemplate(String templateId) {
        return templateDao.deleteTemplate(templateId);
    }

    @Override
    public List<Template> getTemplateList(int templateType) {
        return templateDao.getTemplateList(templateType);
    }
}
