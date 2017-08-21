package com.threegrand.bison.security.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

import java.util.List;

/**
 * @author gaoxinyu
 */
public class User extends DataTablesPage {

    private String userId;
    @NotBlank(message = "用户名不能为空！")
    private String username;
    @NotBlank(message = "登录名不能为空！")
    private String loginName;
    private String password;
    private boolean rememberMe;
    @NotBlank(message = "角色不能为空！")
    private String roleName;
    private String companyId;
    @NotBlank(message = "部门不能为空！")
    private String organId;
    private String organName;
    
    
	public String getOrganName() {
		return organName;
	}

	public void setOrganName(String organName) {
		this.organName = organName;
	}

	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getLoginName() {
		return loginName;
	}


	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public boolean isRememberMe() {
		return rememberMe;
	}


	public void setRememberMe(boolean rememberMe) {
		this.rememberMe = rememberMe;
	}


	public String getRoleName() {
		return roleName;
	}


	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}


	public String getCompanyId() {
		return companyId;
	}


	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}


	public String getOrganId() {
		return organId;
	}


	public void setOrganId(String organId) {
		this.organId = organId;
	}


	@Override
	public String toString() {
		return "User [userId=" + userId + ", username=" + username
				+ ", loginName=" + loginName + ", password=" + password
				+ ", rememberMe=" + rememberMe + ", roleName=" + roleName
				+ ", companyId=" + companyId + ", organId=" + organId + "]";
	}

  
}
