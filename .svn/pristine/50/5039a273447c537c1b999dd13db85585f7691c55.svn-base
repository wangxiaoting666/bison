package com.threegrand.bison.system.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Created by Administrator on 2014/9/22.
 */
public class CustomParam extends DataTablesPage {

    private String companyId;
    private String customParamId;
    @NotBlank(message = "变量名不能为空！")
    private String paramName;
    private String paramValue;
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCustomParamId() {
        return customParamId;
    }

    public void setCustomParamId(String customParamId) {
        this.customParamId = customParamId;
    }

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getParamValue() {
        return paramValue;
    }

    public void setParamValue(String paramValue) {
        this.paramValue = paramValue;
    }
}
