package com.threegrand.bison.assets.service.impl;

import com.threegrand.bison.assets.dao.AssetInitZoneDao;
import com.threegrand.bison.assets.service.AssetInitZoneService;
import com.threegrand.bison.personInfo.model.Area;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/1/16.
 */
@Service("assetInitZoneService")
public class AssetInitZoneServiceImpl implements AssetInitZoneService{

    @Autowired
    private AssetInitZoneDao assetInitZoneDao;

    @Override
    public List<Area> getZones(Area area) {
        return assetInitZoneDao.getZones(area);
    }

    @Override
    public List<Area> getBuildings(Area area) {
        return assetInitZoneDao.getBuildings(area);
    }

    @Override
    public List<Area> getStepsByBuildingId(Area area) {
        return assetInitZoneDao.getStepsByBuildingId(area);
    }

    @Override
    public List<Area> getAreaByStepId(Area area) {
        return assetInitZoneDao.getAreaByStepId(area);
    }
}
