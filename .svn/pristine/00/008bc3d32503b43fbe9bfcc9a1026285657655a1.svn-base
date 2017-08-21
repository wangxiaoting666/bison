package com.threegrand.bison.security.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

import java.util.List;

/**
 * @author gaoxinyu
 */
public class Role extends DataTablesPage {

    private String roleId;
    @NotBlank(message = "角色名不能为空！")
    private String roleName;
    private String description;
    private List<String> getUserList;
    private List<String> permTokenList;
    private List<String> organTokenList;
    private String companyId;
    private String permToken;

	public List<String> getOrganTokenList() {
		return organTokenList;
	}

	public void setOrganTokenList(List<String> organTokenList) {
		this.organTokenList = organTokenList;
	}

	public String getPermToken() {
		return permToken;
	}

	public void setPermToken(String permToken) {
		this.permToken = permToken;
	}

	public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getGetUserList() {
        return getUserList;
    }

    public void setGetUserList(List<String> getUserList) {
        this.getUserList = getUserList;
    }

    public List<String> getPermTokenList() {
        return permTokenList;
    }

    public void setPermTokenList(List<String> permTokenList) {
        this.permTokenList = permTokenList;
    }

	@Override
	public String toString() {
		return "Role [roleId=" + roleId + ", roleName=" + roleName
				+ ", description=" + description + ", getUserList="
				+ getUserList + ", permTokenList=" + permTokenList
				+ ", organTokenList=" + organTokenList + ", companyId="
				+ companyId + ", permToken=" + permToken + "]";
	}
    
}
