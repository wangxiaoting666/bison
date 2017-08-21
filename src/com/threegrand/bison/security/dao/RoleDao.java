package com.threegrand.bison.security.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.security.model.Role;

import org.apache.ibatis.annotations.Param;

import java.util.List;

@mybatisRepository
public interface RoleDao {

    List<String> getUserByRoleName(@Param("roleName") String roleName, @Param("companyId") String companyId);

    List<String> getRolesByLoginName(String loginName);

    List<String> getRolePermTokensByLoginName(String loginName);

    List<Role> getRoleList(String companyId);

    List<Role> getRoleListPage(Role role);

    int addRole(Role role);

    List<Role> getRoleByRoleName(String role);

    int addUserList(Role role);

    int addRolePermission(Role role);

    int deleteUserPermissionByLoginName(
    		@Param("loginName")String loginName,
    		@Param("companyId")String companyId);

    int deleteRole(Role role);

    Role getRole(@Param("roleId") String roleId, @Param("companyId") String companyId);

    int deleteUserByRoleName(Role role);

    int deleteRolePermissionByRoleName(Role role);

    int updateRole(Role role);

    void deleteRolePermissionByPermToken(String permToken);

	List<String> getPermTokens(
			@Param("roleName")String roleName,
			@Param("companyId")String companyId);

	int addRoleOrgan(Role role);

	int deleteUserRole(Role role);

	int deleteRoleOrgan(Role role);

	List<String> getRoleOrgan(Role role);

	int updateUserRole(
			@Param("roleName")String roleName,
			@Param("oldRoleName")String oldRoleName,
			@Param("companyId")String companyId);

	Role getRoleByName(
			@Param("roleName")String roleName,
			@Param("companyId")String companyId);

	List<String> getOrganIds(
			@Param("roleId")String roleId, 
			@Param("companyId")String companyId);

	int getUserRoleByRoleName(
			@Param("roleName")String roleName, 
			@Param("companyId")String companyId);

}
