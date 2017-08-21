package com.threegrand.bison.system.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.threegrand.bison.system.model.Staff;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

@mybatisRepository
public interface StaffDao {

	int addStaff(Staff staff);

	List<Staff> getStaffByOrganId(@Param("organId")String organId,
			@Param("companyId")String companyId);

	Staff getStaff(
			@Param("id")String id, 
			@Param("companyId")String companyId);

	int countStaff(String companyId);

	int countStaffByOrganId(
			@Param("organId")String organId, 
			@Param("companyId")String companyId);

	List<Staff> getStaffLikeName(
			@Param("key")String key, 
			@Param("companyId")String companyId);

	List<String> getStaffNameByOrganId(
			@Param("organId")String organId, 
			@Param("companyId")String companyId);

}
