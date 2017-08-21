package com.threegrand.bison.design.model;

import com.threegrand.bison.basic.model.DictName;
import com.threegrand.bison.basic.model.DictValue;
import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Created by Administrator on 2014/9/26.
 */
public class Template extends DataTablesPage {

    public static final int template_index = 2;
    public static final int template_list = 3;
    public static final int template_content = 4;
    private String templateId;
    @NotBlank(message = "模板名不能为空！")
    private String templateName;
    @NotBlank(message = "模板类别不能为空！")
    private String templateType;
    @NotBlank(message = "模板内容不能为空！")
    private String content;
    private String templateAlias;
    private String companyId;

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getTemplateType() {
        return templateType;
    }

    public void setTemplateType(String templateType) {
        this.templateType = templateType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getTemplateTypeName() {
        return DictValue.getDictValue(DictName.TEMPLATE_TYPE, templateType);
    }

    public String getTemplateAlias() {
        return templateAlias;
    }

    public void setTemplateAlias(String templateAlias) {
        this.templateAlias = templateAlias;
    }
}
