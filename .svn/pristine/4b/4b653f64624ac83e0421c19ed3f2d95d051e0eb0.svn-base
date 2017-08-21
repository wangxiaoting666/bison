package com.threegrand.bison.flex.dao;

import java.util.List;
import java.util.Map;

import com.threegrand.bison.flex.entity.MapAreaVO;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

@mybatisRepository
public interface MapAreaDao {

	
	public void doAdd(MapAreaVO errorMsg)  ;
	
	public List<MapAreaVO> find() ;
	
	public List<MapAreaVO> findAreaByPicId(Map<String,Long> param) ;
	
	public void deleteAreaByAreaId(Map<String,Long> param);
}
