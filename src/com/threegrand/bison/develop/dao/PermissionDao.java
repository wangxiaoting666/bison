package com.threegrand.bison.develop.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.threegrand.bison.develop.model.Permission;
import com.threegrand.bison.security.model.PermissionTreeNode;
import com.threegrand.bison.security.model.Role;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

@mybatisRepository
public interface PermissionDao {

    List<PermissionTreeNode> getPermissionTree(@Param("companyId") String companyId, @Param("newsMenuId") String newsMenuId);

    List<PermissionTreeNode> getPermissionTreeByLoginName(@Param("loginName") String loginName,
                                                          @Param("companyId") String companyId,
                                                          @Param("newsMenuId") String newsMenuId);

    List<Permission> getPermissionListPage(Permission permission);

    Permission getPermissionByPermToken(String permToken);

    Permission getPermissionByDescription(String description);

    int addPermission(Permission permission);

    int deletePermission(String permToken);

    int deleteUserPermissionByPermToken(String permToken);

    List<PermissionTreeNode> getPermissionTreeByRole(
    		@Param("roleName")String roleName,
    		@Param("companyId")String companyId,
    		@Param("newsMenuId") String newsMenuId);

    Permission getPermissionByParentId(String parentId);

    int updatePermission(Permission permission);

}
