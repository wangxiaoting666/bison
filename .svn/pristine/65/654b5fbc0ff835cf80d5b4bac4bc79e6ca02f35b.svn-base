package com.threegrand.bison.flex.dao;

import java.util.List;
import java.util.Map;

import com.threegrand.bison.flex.dto.UserDto;
import com.threegrand.bison.flex.entity.BleLogVO;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

@mybatisRepository
public interface BleLogDao {
	
	public List<BleLogVO> find() ;
	
	public List<UserDto> findDto();
	
	public List<BleLogVO> searchHistory(Map<String ,String > hashMap);
}
