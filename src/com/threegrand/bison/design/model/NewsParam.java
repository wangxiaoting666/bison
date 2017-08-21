package com.threegrand.bison.design.model;

import com.threegrand.bison.basic.model.DictName;
import com.threegrand.bison.basic.model.DictValue;
import com.threegrand.bison.common.ajax.DataTablesPage;

/**
 * Created by Administrator on 2014/10/11.
 */
public class NewsParam extends DataTablesPage {

    private String newsParamId;
    private String moduleId;
    private String paramName;
    private String description;
    private Module module;
    private String paramType;

    public String getParamType() {
        return paramType;
    }

    public void setParamType(String paramType) {
        this.paramType = paramType;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public String getNewsParamId() {
        return newsParamId;
    }

    public void setNewsParamId(String newsParamId) {
        this.newsParamId = newsParamId;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getParamTypeName() {
        return DictValue.getDictValue(DictName.NEWSPARAM_TYPE, paramType);
    }

}
