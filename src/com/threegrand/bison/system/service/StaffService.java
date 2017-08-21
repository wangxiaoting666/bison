package com.threegrand.bison.system.service;

import java.util.List;

import com.threegrand.bison.system.model.Staff;

public interface StaffService {

	int addStaff(Staff staff);

	List<Staff> getStaffByOrganId(String organId,String companyId);

	Staff getStaff(String id, String companyId);

	List<Staff> getStaffLikeName(String key, String companyId);

	List<String> getStaffNameByOrganId(String organId, String companyId);


}
