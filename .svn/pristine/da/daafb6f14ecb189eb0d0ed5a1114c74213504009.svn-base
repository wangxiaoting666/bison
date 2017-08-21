package com.threegrand.bison.personInfo.service.impl;

import com.threegrand.bison.personInfo.dao.AreaDao;
import com.threegrand.bison.personInfo.model.Area;
import com.threegrand.bison.personInfo.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/1/7.
 */
@Service("areaService")
public class AreaServiceImpl implements AreaService{
    @Autowired
    private AreaDao areaDao;
    @Override
    public List<Area> getAreasByConditions(Area area) {
        return areaDao.getAreasByConditions(area);
    }

    @Override
    public int addAreas(Area area) {
        int affectedLineNumber=areaDao.addAreas(area);
        return affectedLineNumber;
    }

    @Override
    public List<Area> getBuildings() {
        return areaDao.getBuildings();
    }

    @Override
    public List<Area> getStepsByBuildingId(int  buildingId) {
        return areaDao.getStepsByBuildingId(buildingId);
    }

    @Override
    public List<Area> getAreaByStepId(int stepId) {
        return areaDao.getAreaByStepId(stepId);
    }
}
