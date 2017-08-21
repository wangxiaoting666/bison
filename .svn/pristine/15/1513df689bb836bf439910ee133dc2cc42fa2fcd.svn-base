package com.threegrand.bison.design.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Created by Administrator on 2014/9/25.
 */
public class SinglePage extends DataTablesPage {

    private String singlePageId;
    private String companyId;
    @NotBlank(message = "单页名称不能为空！")
    private String singlePageName;
    @NotBlank(message = "单页标题不能为空！")
    private String title;
    private String templateId;
    private String content;
    private String alias;

    private Template template;

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getSinglePageId() {
        return singlePageId;
    }

    public void setSinglePageId(String singlePageId) {
        this.singlePageId = singlePageId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getSinglePageName() {
        return singlePageName;
    }

    public void setSinglePageName(String singlePageName) {
        this.singlePageName = singlePageName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Template getTemplate() {
        return template;
    }

    public void setTemplate(Template template) {
        this.template = template;
    }
}
