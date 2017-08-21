package com.threegrand.bison.assets.service;

import java.util.List;

import com.threegrand.bison.assets.model.Asset;
import com.threegrand.bison.assets.model.Classify;

/**
 * Created by Administrator on 2015/12/26.
 */
public interface AssetService {

    List<Asset> getAssetListPage(Asset asset);

	List<Classify> getOneClassify();
	
	List<Classify> getTwoClassify();
	
    int  addAsset(Asset asset);

	int deleteAsset(String id, String companyId);

	Asset getAsset(String id, String companyId);

	int updateAsset(Asset asset);

	int validateRepeatName(String name, String companyId);

	Asset getAssetById(String assetId, String companyId);

	List<Asset> getAssetLikeName(String key, String companyId);

	List<Asset> queryAssetByLikeName(String name, String companyId);

	List<Asset> queryAssetByNameAndOrgan(String assetName, String organName,
			String companyId);

	String getSysValue(String val, String companyId);

 
}
