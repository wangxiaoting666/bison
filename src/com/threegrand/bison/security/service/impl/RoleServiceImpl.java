package com.threegrand.bison.security.service.impl;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.security.dao.RoleDao;
import com.threegrand.bison.security.model.Role;
import com.threegrand.bison.security.model.User;
import com.threegrand.bison.security.service.RoleService;
import com.wonderland.sail.exception.ValidateErrorException;

@Service("roleService")
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleDao roleDao;

    @Override
    public List<Role> getRoleList(String companyId) {
        return roleDao.getRoleList(companyId);
    }

    @Override
    public List<Role> getRoleListPage(Role role) {
        return roleDao.getRoleListPage(role);
    }

    /**
     * 添加角色
     */
    public int addRole(Role role) {
        if (roleDao.getRoleByRoleName(role.getRoleName()) != null && !roleDao.getRoleByRoleName(role.getRoleName()).isEmpty()) {
            throw new ValidateErrorException("角色名已存在！");
        }
        int affectedLineNum = roleDao.addRole(role);
        //添加角色对应的权限
        addRolePermission(role);
        //添加角色管理的部门
        addRoleOrgan(role);
        return affectedLineNum;
    }

    /**
     * 添加用户管理的部门
     * @param role
     */
    private void addRoleOrgan(Role role) {
		if(role.getOrganTokenList() != null && !role.getOrganTokenList().isEmpty()){
			roleDao.addRoleOrgan(role);
		}
	}

    /**
     * 添加角色对应的权限
     * @param role
     */
	private void addRolePermission(Role role) {
        if (role.getPermTokenList() != null && !role.getPermTokenList().isEmpty()) {
            roleDao.addRolePermission(role);
        }
    }

    /**
     * 删除角色
     */
    public int deleteRole(String roleId,String companyId) {
        Role role=getRole(roleId,companyId);
        //删除角色用户表中的相关数据
        roleDao.deleteUserRole(role);
        //删除角色管理部门表中相关数据
        roleDao.deleteRoleOrgan(role);
        //刪除該用戶的权限
        roleDao.deleteRolePermissionByRoleName(role);
        return roleDao.deleteRole(role);
    }


    /**
     * 获取角色
     */
    public Role getRole(String roleId, String companyId) {
        return roleDao.getRole(roleId, companyId);
    }

    @Override
    public List<String> getUserByRoleName(String roleName, String companyId) {
        return roleDao.getUserByRoleName(roleName, companyId);
    }


    /**
     * 更新角色
     */
    public int updateRole(Role role) {
    	//更新用户角色表
    	//根据roleId获取role
    	Role r1 = roleDao.getRole(role.getRoleId(), role.getCompanyId());
    	//根据roleName和公司更新用户对应的角色
    	roleDao.updateUserRole(role.getRoleName(), r1.getRoleName(), role.getCompanyId());
    	
    	//更新角色对应的权限
        roleDao.deleteRolePermissionByRoleName(role);
        addUserRolePermission(role);
        
        //更新角色对应的模块
        roleDao.deleteRoleOrgan(role);
        addRoleOrgan(role);
        return roleDao.updateRole(role);
    }

    /**
     * 添加角色权限
     * @param role
     */
    private void addUserRolePermission(Role role) {
        if (role.getPermTokenList() != null && !role.getPermTokenList().isEmpty()) {
            roleDao.addRolePermission(role);
        }
    }

	@Override
	public List<String> getPermTokens(String roleName, String companyId) {
		return roleDao.getPermTokens(roleName,companyId);
	}

	@Override
	public List<String> getRoleOrgan(Role role) {
		return roleDao.getRoleOrgan(role);
	}

	@Override
	public Role getRoleByName(String roleName, String companyId) {
		return roleDao.getRoleByName(roleName,companyId);
	}

	/**
	 * 通过角色名获取部门id集合
	 */
	public List<String> getOrganIds(String roleId, String companyId) {
		return roleDao.getOrganIds(roleId,companyId);
	}

	@Override
	public int getUserRoleByRoleName(String roleName, String companyId) {
		return roleDao.getUserRoleByRoleName(roleName,companyId);
	}
	
}
