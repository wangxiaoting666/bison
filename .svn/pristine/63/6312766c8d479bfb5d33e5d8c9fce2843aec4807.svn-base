package com.threegrand.bison.flex.service;


import java.util.List;

import com.threegrand.bison.flex.dto.AreaDto;
import com.threegrand.bison.flex.dto.BleLogDto;
import com.threegrand.bison.flex.dto.LocationDto;
import com.threegrand.bison.flex.dto.UserDto;
import com.threegrand.bison.flex.entity.BleLogVO;
import com.threegrand.bison.flex.entity.MapAreaVO;
import com.threegrand.bison.flex.entity.MapLocationVO;
import com.threegrand.bison.security.model.User;
public interface BleLogService {
	
	
	public LocationDto getAllBleLog();
	
	public void insertAreaLocation(List<MapLocationVO> mapLocationList , MapAreaVO mapAreaVO);

	public List<UserDto> findDto();
	
	public List<BleLogVO> searchHistory(BleLogDto bleLogDto );
	
	public List<MapAreaVO> getNowAreaList(Long picId);
	
	public List<MapLocationVO>  getNowAreaLocationList(Long areaid);
	
	public List<AreaDto> getAllBasePicid(Long picId);
	
	public void deleteNowAreaLocationList(Long areaid);
	
	public List<User>  getUserList();
}
