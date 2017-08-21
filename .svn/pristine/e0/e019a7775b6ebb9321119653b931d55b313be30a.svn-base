package com.threegrand.bison.develop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.develop.dao.MenuDao;
import com.threegrand.bison.develop.dao.PermissionDao;
import com.threegrand.bison.develop.dao.RolePermissionDao;
import com.threegrand.bison.develop.model.Menu;
import com.threegrand.bison.develop.model.Permission;
import com.threegrand.bison.develop.service.PermissionService;
import com.threegrand.bison.security.model.PermissionTreeNode;
import com.threegrand.bison.security.model.Role;
import com.wonderland.sail.exception.ValidateErrorException;

@Service("permissionService")
public class PermissionServiceImpl implements PermissionService {
    @Autowired
    private PermissionDao permissionDao;
    @Autowired
    private MenuDao menuDao;
    @Autowired
    private RolePermissionDao rolePermissionDao;

    //信息管理节点
    private Menu newsMenu;

    public Menu getNewsMenu() {
        if (newsMenu == null) {
            newsMenu = menuDao.getNewsMenu();
        }
        return newsMenu;
    }

    @Override
    public List<PermissionTreeNode> getPermissionTree(String companyId) {
        return permissionDao.getPermissionTree(companyId, getNewsMenu().getMenuId());
    }

    @Override
    public List<PermissionTreeNode> getPermissionTreeByLoginName(String loginName, String companyId) {
        return permissionDao.getPermissionTreeByLoginName(loginName, companyId, getNewsMenu().getMenuId());
    }

    @Override
    public List<Permission> getPermissionListPage(Permission permission) {
        return permissionDao.getPermissionListPage(permission);
    }

    @Override
    public int addPermission(Permission permission) {
        if (permissionDao.getPermissionByPermToken(permission.getPermToken()) != null) {
            throw new ValidateErrorException("权限已存在！");
        }
        if (permissionDao.getPermissionByDescription(permission.getDescription()) != null) {
            throw new ValidateErrorException("权限描述重复命名，请更换！");
        }
        return permissionDao.addPermission(permission);
    }

    @Override
    public int deletePermission(String permToken) {
        return permissionDao.deletePermission(permToken);
    }

    @Override
    public List<PermissionTreeNode> getPermissionTreeByRole(String roleName,String companyId) {
        return permissionDao.getPermissionTreeByRole(roleName,companyId, getNewsMenu().getMenuId());
    }

    @Override
    public Permission getPermissionByPermToken(String permToken) {
        return permissionDao.getPermissionByPermToken(permToken);
    }

    @Override
    public int updatePermission(Permission permission) {
        validateRepeatPermission(permission);
        return permissionDao.updatePermission(permission);
    }

    private void validateRepeatPermission(Permission permission) {
        Permission getPermission = permissionDao.getPermissionByParentId(permission.getParentId());
        if (!getPermission.getPermToken().equals(permission.getPermToken()) && !menuDao.getMenusByPermToken(permission.getPermToken()).isEmpty()) {
            throw new ValidateErrorException("该权限标识已存在，请重新设定！");
        }
    }
}
