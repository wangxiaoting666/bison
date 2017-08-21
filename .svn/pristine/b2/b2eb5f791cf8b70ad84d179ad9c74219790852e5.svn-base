package com.threegrand.bison.security;

import java.util.List;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.threegrand.bison.security.model.User;
import com.threegrand.bison.security.service.RoleService;
import com.threegrand.bison.security.service.UserService;

import flex.messaging.io.ArrayList;

public class ShiroDbRealm extends AuthorizingRealm {

    private UserService userService;
    
    private RoleService roleService;
    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }
    
    private String companyId;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String loginName = (String) getAvailablePrincipal(principals); // 使用Shiro提供的方法获取用户名称
        if (loginName != null) {
            List<String> roles = userService.getRoles(loginName,companyId);
            
            //获取用户的权限
            List<String> permTokens = new ArrayList();
            for (String roleName : roles) {
				List<String> pt=roleService.getPermTokens(roleName,companyId);
				permTokens.addAll(pt);
			}
            
            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
            if (roles != null) {
                info.addRoles(roles); // 加入用户角色
            }
            if (permTokens != null) {
                info.addStringPermissions(permTokens); // 加入用户许可标记
            }
            return info;
        }
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken)
            throws AuthenticationException {

        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String userName = token.getUsername();
        String password = new String(token.getPassword());
        if (userName != null && !"".equals(userName)) {
        	//通過用户名和密码和获取公司id
            User user = userService.getCompanyIdByLoginName(userName,password);
            companyId=user.getCompanyId();
            if (user != null) {
                return new SimpleAuthenticationInfo(user.getLoginName(), user.getPassword(), getName());
            }
        }
        return null;
    }

}
