package com.threegrand.bison.assets.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.assets.dao.AssetDao;
import com.threegrand.bison.assets.model.Asset;
import com.threegrand.bison.assets.model.Classify;
import com.threegrand.bison.assets.service.AssetService;
import com.wonderland.sail.autocomplete.service.AutoCompleteService;

/**
 * Created by Administrator on 2015/12/26.
 */
@Service("assetService")
public class AssetServiceImpl implements AssetService {
    @Autowired
    private AssetDao assetDao;
    @Autowired
    private AutoCompleteService autoCompleteService;

    @Override
    public List<Asset> getAssetListPage(Asset asset) {
        return assetDao.getAssetListPage(asset);
    }
    
    @Override
    public int validateRepeatName(String name,String companyId){
       Asset asset = assetDao.getAssetsByAssetName(name,companyId);
      return  asset == null ? 1 : 0 ;
    }

	@Override
	public List<Classify> getOneClassify() {
		return assetDao.getOneClassify();
	}
	
	@Override
	public List<Classify> getTwoClassify() {
		return assetDao.getTwoClassify();
	}
	
	@Override
    public int addAsset(Asset asset) {
        int affectedLineNum=assetDao.addAsset(asset);
        return affectedLineNum;
    }

	@Override
	public int deleteAsset(String id, String companyId) {
		return assetDao.deleteAsset(id,companyId);
	}

	@Override
	public Asset getAsset(String id, String companyId) {
		return assetDao.getAsset(id,companyId);
	}

	@Override
	public int updateAsset(Asset asset) {
		return assetDao.updateAsset(asset);
	}

	@Override
	public Asset getAssetById(String assetId, String companyId) {
		return assetDao.getAssetById(assetId,companyId);
	}

	@Override
	public List<Asset> getAssetLikeName(String key, String companyId) {
		return assetDao.getAssetLikeName(key,companyId);
	}

	@Override
	public List<Asset> queryAssetByLikeName(String name, String companyId) {
		return assetDao.queryAssetByLikeName(name, companyId);
	}

	@Override
	public List<Asset> queryAssetByNameAndOrgan(String assetName,
			String organName, String companyId) {
		return assetDao.queryAssetByNameAndOrgan(assetName, organName, companyId);
	}

	@Override
	public String getSysValue(String val, String companyId) {
		return assetDao.getSysValue(val,companyId);
	}


}
