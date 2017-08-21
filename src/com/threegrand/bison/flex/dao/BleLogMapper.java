package com.threegrand.bison.flex.dao;

import com.threegrand.bison.flex.entity.BleLogVO;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

import java.util.List;


@mybatisRepository
public interface BleLogMapper {
	public List<BleLogVO> find() ;
}
