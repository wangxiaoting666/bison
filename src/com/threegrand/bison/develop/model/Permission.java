package com.threegrand.bison.develop.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @author gaoxinyu
 */
public class Permission extends DataTablesPage {
    @NotBlank(message = "权限标识不能为空！")
    private String permToken;
    @NotBlank(message = "权限描述不能为空！")
    private String description;
    private String parentId;

    public String getPermToken() {
        return permToken;
    }

    public void setPermToken(String permToken) {
        this.permToken = permToken;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
}
