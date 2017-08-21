package com.threegrand.bison.design.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.threegrand.bison.design.model.Node;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.model.Staff;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

@mybatisRepository
public interface NodeDao {
	Node getNodeTree(
			@Param("organId")String organId,
			@Param("companyId")String companyId);

	List<Node> getAssetsTree(
			@Param("organId")String organId, 
			@Param("companyId")String companyId);


	List<Node> getStaffTree(
			@Param("id")String id, 
			@Param("companyId")String companyId);

	int getAssetCount(String companyId);

	int getAssetCountByPid(
			@Param("id")String id, 
			@Param("companyId")String companyId);

	List<Node> getOrganNode(
			@Param("name")String name, 
			@Param("companyId")String companyId);
	
}

