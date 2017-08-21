package com.threegrand.bison.flex.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.flex.dao.BleLogDao;
import com.threegrand.bison.flex.dao.MapAreaDao;
import com.threegrand.bison.flex.dao.MapLocationDao;
import com.threegrand.bison.flex.dto.AreaDto;
import com.threegrand.bison.flex.dto.BleLogDto;
import com.threegrand.bison.flex.dto.LocationDto;
import com.threegrand.bison.flex.dto.UserDto;
import com.threegrand.bison.flex.entity.BleLogVO;
import com.threegrand.bison.flex.entity.MapAreaVO;
import com.threegrand.bison.flex.entity.MapLocationVO;
import com.threegrand.bison.flex.service.BleLogService;
import com.threegrand.bison.security.dao.UserDao;
import com.threegrand.bison.security.model.User;

@Service("bleLogService")
public class BleLogServiceImpl implements BleLogService {

	@Autowired
	BleLogDao bleLogDao ;
	@Autowired
	MapAreaDao mapAreaDao ;
	@Autowired
	MapLocationDao mapLocationDao ;
	@Autowired
	UserDao userDao ;
	
	@Override
	public LocationDto getAllBleLog() {
		LocationDto locationDto = new LocationDto();
		locationDto.setBleLogList(bleLogDao.find()) ;
		return locationDto;
	}
	
	@Override
	public void insertAreaLocation(List<MapLocationVO> mapLocationList , MapAreaVO mapAreaVO){
		Date date = new Date();
		try{
		mapAreaVO.setCreateTime(date);
		mapAreaDao.doAdd(mapAreaVO) ;
		for(MapLocationVO location:mapLocationList){
			location.setAreaId(mapAreaVO.getAreaId());
			location.setCreateTime(date) ;
			mapLocationDao.doAdd(location) ;
		}
		}catch(Exception e){
			e.printStackTrace() ;
			
		}
	}

	@Override
	public List<UserDto> findDto() {
		List<UserDto> userDtoList  = new ArrayList<UserDto>() ;
		try{
			userDtoList = bleLogDao.findDto();
		}catch(Exception e ){
			e.printStackTrace() ;
		}
		
		return userDtoList ;
	}

	@Override
	public List<BleLogVO> searchHistory(BleLogDto bleLogDto) {
		Map<String,String> searchMap= new HashMap<String,String>();
		searchMap.put("userid", bleLogDto.getDeviceId());
		searchMap.put("startTime", bleLogDto.getStartTime());
		searchMap.put("endTime", bleLogDto.getEndTime());
		List<BleLogVO> logList = bleLogDao.searchHistory(searchMap);
		return logList;
	}
	
	@Override
	public List<MapAreaVO> getNowAreaList(Long picId){
		Map<String,Long> searchMap= new HashMap<String,Long>();
		searchMap.put("picId", picId);
		List<MapAreaVO> areaList = mapAreaDao.findAreaByPicId(searchMap);
		return  areaList;
	}
	
	
	@Override
	public List<MapLocationVO>  getNowAreaLocationList(Long areaid){
		Map<String,Long> searchMap= new HashMap<String,Long>();
		searchMap.put("areaid", areaid);
		List<MapLocationVO> locationList = mapLocationDao.findLocationByAreaId(searchMap);
		return  locationList;
	}
	@Override
	public List<AreaDto> getAllBasePicid(Long picId){
		List<AreaDto>  areaDtoList = new ArrayList<AreaDto>();
		List<MapAreaVO> mapAreaList = getNowAreaList(picId);
		for(MapAreaVO maparea : mapAreaList){
			AreaDto areaDto = new AreaDto();
			areaDto.setAreaName(maparea.getAreaName());
			List<MapLocationVO> locationList = getNowAreaLocationList(maparea.getAreaId());
			areaDto.setLocationList(locationList);
			areaDtoList.add(areaDto) ;
		}
		return areaDtoList ;
	}
	@Override
	public void deleteNowAreaLocationList(Long areaid){
		Map<String,Long> searchMap= new HashMap<String,Long>();
		searchMap.put("areaId", areaid) ;
		this.mapAreaDao.deleteAreaByAreaId(searchMap) ;
		this.mapLocationDao.deleteMapLocationByAreaId(searchMap);
	}
	
	@Override
	public List<User>  getUserList(){
		List<User> userList = userDao.queryAll() ;
		return userList;
	}
 }
