package com.threegrand.bison.system.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.threegrand.bison.security.model.OrganTreeNode;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.model.OrganOrStaffTree;
import com.threegrand.bison.system.model.Staff;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

/**
 * Created by threegrand4 on 2014/12/1.
 */
@mybatisRepository
public interface OrganDao {

    int addOrgan(Organ organ);

    int updateOrgan(Organ organ);

    int deleteOrgan(
    		@Param("organId")String organId,
    		@Param("companyId")String companyId);

    int deleteOrganByParentId(
    		@Param("parentId")String parentId,
    		@Param("companyId")String companyId);

    Organ getOrganByOrganName(
    		@Param("organName")String organName,
    		@Param("companyId")String companyId,
    		@Param("level")String level);

    List<Organ> getOrganListByParentId(
    		@Param("organId")String organId,
    		@Param("companyId")String companyId);

	List<Organ> getAllOrgan(String companyId);

	List<OrganTreeNode> getOrganTree(String companyId);

	List<Organ> searchOrgan(
			@Param("key")String key,
			@Param("companyId")String companyId);

	List<Organ> getNumberOrgan(String level);

	Organ getOrgan(
			@Param("organId")String organId,
			@Param("companyId")String companyId);

	List<OrganOrStaffTree> getOrganZTree(
			@Param("organId")String organId,
			@Param("companyId")String companyId);

	List<OrganOrStaffTree> getStaffZTree(
			@Param("organId")String organId,
			@Param("companyId")String companyId);

	int deleteStaff(
			@Param("staffId")String staffId,
			@Param("companyId")String companyId);

	int deleteStaffByOrganId(
			@Param("organId")String organId, 
			@Param("companyId")String companyId);

	int updateStaff(Staff staff);

	OrganOrStaffTree queryOrganByName(
			@Param("name")String name, 
			@Param("companyId")String companyId);

	List<String> queryOrganByPId(
			@Param("pId")String pId,
			@Param("companyId")String companyId);

	void addRoleOrgan(
			@Param("roleId")String roleId, 
			@Param("organId")String organId, 
			@Param("companyId")String companyId);

	int deleteRoleOrgan(
			@Param("organId")String organId, 
			@Param("companyId")String companyId);



	List<OrganOrStaffTree> getStaffTreeByOrganId(
			@Param("pid")String pid,
			@Param("companyId")String companyId);

	OrganOrStaffTree getOrganTreeById(
			@Param("id")String pid, 
			@Param("companyId")String companyId);

	List<String> queryOrganNameByPId(
			@Param("parentId")String parentId, 
			@Param("companyId")String companyId);

}
