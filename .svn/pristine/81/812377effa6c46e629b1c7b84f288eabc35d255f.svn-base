package com.threegrand.bison.assets.service.impl;

import com.threegrand.bison.assets.dao.AssetRoleDao;
import com.threegrand.bison.assets.model.AssetRole;
import com.wonderland.sail.exception.ValidateErrorException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/1/10.
 */
@Service("assetRoleService")
public class AssetRoleServiceImpl implements AssetRoleDao {
    private AssetRoleDao assetRoleDao;

    @Override
    public List<AssetRole> getAssetRoles() {
        return assetRoleDao.getAssetRoles();
    }

    @Override
    public int addAssetRole(AssetRole assetRole) {
        validateRepeatRoleName(assetRole);
        int affectedLineNum=assetRoleDao.addAssetRole(assetRole);
        return affectedLineNum;
    }

    @Override
    public AssetRole getAssetRoleByName(String roleName) {
        return assetRoleDao.getAssetRoleByName(roleName);
    }

    private void validateRepeatRoleName(AssetRole assetRole){
        if(assetRoleDao.getAssetRoleByName(assetRole.getRoleName())!=null){
            throw  new ValidateErrorException("名称重复");
        }
    }
}
