package com.threegrand.bison.personInfo.dao;

import com.threegrand.bison.personInfo.model.Area;
import com.threegrand.bison.personInfo.model.UserInfo;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

import java.util.List;

/**
 * Created by Administrator on 2016/1/2.
 */
@mybatisRepository
public interface AreaDao {
   List<Area> getAreasByConditions(Area area);
   int addAreas(Area area);
   List<Area>  getBuildings();
   List<Area> getStepsByBuildingId(int buildingId);
   List<Area> getAreaByStepId(int stepId);
}
