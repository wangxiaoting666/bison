package com.threegrand.bison.security.service;


import com.threegrand.bison.security.model.Role;

import java.util.List;

public interface RoleService {

    List<String> getUserByRoleName(String roleName, String companyId);

    List<Role> getRoleList(String companyId);

    List<Role> getRoleListPage(Role role);

    int addRole(Role role);

    int deleteRole(String roleId,String companyId);

    Role getRole(String roleId, String companyId);

    int updateRole(Role role);

	List<String> getPermTokens(String roleName, String companyId);

	List<String> getRoleOrgan(Role role);

	Role getRoleByName(String roleName, String companyId);

	List<String> getOrganIds(String roleId, String companyId);

	int getUserRoleByRoleName(String roleName, String companyId);


}
