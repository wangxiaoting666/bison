package com.threegrand.bison.assets.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.threegrand.bison.assets.model.Asset;
import com.threegrand.bison.assets.model.Classify;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

/**
 * Created by Administrator on 2015/12/26.
 */
@mybatisRepository
public interface AssetDao {

    List<Asset> getAssetListPage(Asset asset);

	List<Classify> getOneClassify();
	
	List<Classify> getTwoClassify();

    int addAsset(Asset asset);
    
	int deleteAsset(
			@Param("id")String id, 
			@Param("companyId")String companyId);
	
	Asset getAsset(
			@Param("id")String id, 
			@Param("companyId")String companyId);
	
	int updateAsset(Asset asset);
	
	Asset getAssetsByAssetName(
			@Param("name")String name, 
			@Param("companyId")String companyId);

	Asset getAssetById(
			@Param("assetId")String assetId,
			@Param("companyId")String companyId);

	List<Asset> getAssetLikeName(
			@Param("key")String key,
			@Param("companyId")String companyId);

	List<Asset> queryAssetByLikeName(
			@Param("name")String name, 
			@Param("companyId")String companyId);

	List<Asset> queryAssetByNameAndOrgan(
			@Param("assetName")String assetName, 
			@Param("organName")String organName,
			@Param("companyId")String companyId);

	String getSysValue(
			@Param("val")String val, 
			@Param("companyId")String companyId);

	
}
