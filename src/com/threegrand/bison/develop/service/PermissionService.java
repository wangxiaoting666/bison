package com.threegrand.bison.develop.service;

import java.util.List;

import com.threegrand.bison.develop.model.Permission;
import com.threegrand.bison.security.model.PermissionTreeNode;
import com.threegrand.bison.security.model.Role;

public interface PermissionService {

    List<PermissionTreeNode> getPermissionTree(String companyId);

    List<PermissionTreeNode> getPermissionTreeByLoginName(String loginName, String companyId);

    List<Permission> getPermissionListPage(Permission permission);

    int addPermission(Permission permission);

    int deletePermission(String permToken);

    List<PermissionTreeNode> getPermissionTreeByRole(String roleName,String companyId);

    Permission getPermissionByPermToken(String permToken);

    int updatePermission(Permission permission);

}
