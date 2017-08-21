package com.threegrand.bison.design.dao;

import org.apache.ibatis.annotations.Param;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;

@mybatisRepository
public interface FenceDao {

	int updateFence(
			@Param("ids")String[] ids, 
			@Param("fenceId")String fenceId, 
			@Param("companyId")String companyId);

	int deleteFence(
			@Param("fenceId")String fenceId, 
			@Param("companyId")String companyId);
	
	

}
