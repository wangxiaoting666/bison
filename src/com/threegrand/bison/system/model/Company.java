package com.threegrand.bison.system.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import com.threegrand.bison.design.model.Template;

/**
 * Created by Administrator on 2014/10/27.
 */
public class Company extends DataTablesPage {
    private String companyId;
    private String companyName;
    private String companyTemplateDir;
    private Template indexTemplate;

    public Template getIndexTemplate() {
        return indexTemplate;
    }

    public void setIndexTemplate(Template indexTemplate) {
        this.indexTemplate = indexTemplate;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyTemplateDir() {
        return companyTemplateDir;
    }

    public void setCompanyTemplateDir(String companyTemplateDir) {
        this.companyTemplateDir = companyTemplateDir;
    }
}
