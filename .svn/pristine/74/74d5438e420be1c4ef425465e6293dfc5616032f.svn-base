package com.threegrand.bison.flex.dao;

import java.util.List;
import java.util.Map;

import com.threegrand.bison.flex.entity.MapLocationVO;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

@mybatisRepository
public interface MapLocationDao {

	
	public void doAdd(MapLocationVO errorMsg)  ;
	
	public List<MapLocationVO> find() ;
	
	public List<MapLocationVO> findLocationByAreaId(Map<String,Long> map ) ;
	
	public void deleteMapLocationByAreaId(Map<String,Long> map ) ;
}
