package com.threegrand.bison.assets.dao;

import com.threegrand.bison.personInfo.model.Area;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

import java.util.List;

/**
 * Created by Administrator on 2016/1/12.
 */
@mybatisRepository
public interface AssetInitZoneDao {
    List<Area> getZones(Area area);

    List<Area> getBuildings(Area area);

    List<Area> getStepsByBuildingId(Area area);

    List<Area> getAreaByStepId(Area area);
}
