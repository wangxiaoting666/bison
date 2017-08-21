package com.threegrand.bison.system.service;

import java.util.List;

import com.threegrand.bison.design.model.Node;
import com.threegrand.bison.security.model.OrganTreeNode;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.model.OrganOrStaffTree;
import com.threegrand.bison.system.model.Staff;

/**
 * Created by threegrand4 on 2014/12/1.
 */
public interface OrganService {


    int addOrgan(Organ organ);

    Organ getOrgan(String organId,String companyId);

    int updateOrgan(Organ organ);

    int deleteOrgan(String organId,String companyId);

	List<Organ> getAllOrgan(String companyId);

	List<Organ> searchOrgan(String key,String companyId);

	List<Organ> getNumberOrgan(String level);

	List<OrganTreeNode> getOrganTree(String companyId);

	List<OrganOrStaffTree> getOrganOrStaffTree(String type, String id, String companyId);

	int deleteStaff(String staffId, String string);

	int updateStaff(Staff staff);

	OrganOrStaffTree queryOrganByName(String name, String string);

	int countStaff(String companyId);

	int countStaffByOrganId(String organId,String companyId);

	List<String> queryOrganByPId(String pId,String companyId);

	void addRoleOrgan(String roleId, String organId, String companyId);


	List<OrganOrStaffTree> getStaffTreeByOrganId(String pid, String companyId);

	OrganOrStaffTree getOrganTreeById(String pid, String companyId);

	List<String> queryOrganNameByPId(String parentId, String companyId);


}
