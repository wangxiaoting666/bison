package com.threegrand.bison.assets.service;

import com.threegrand.bison.assets.model.AssetRole;

import java.util.List;

/**
 * Created by Administrator on 2016/1/10.
 */
public interface AssetRoleService {
    List<AssetRole> getAssetRoles();

    int addAssetRole(AssetRole assetRole);

    AssetRole getAssetRoleByName(String roleName);
}
