package com.threegrand.bison.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.security.model.OrganTreeNode;
import com.threegrand.bison.system.dao.OrganDao;
import com.threegrand.bison.system.dao.StaffDao;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.model.OrganOrStaffTree;
import com.threegrand.bison.system.model.Staff;
import com.threegrand.bison.system.service.OrganService;
import com.wonderland.sail.exception.ValidateErrorException;

/**
 * Created by threegrand4 on 2014/12/1.
 */
@Service("organService")
public class OrganServiceImpl implements OrganService {

    @Autowired
    private OrganDao organDao;
    
    @Autowired
    private StaffDao staffDao;


    /**
     * 添加部门
     */
    public int addOrgan(Organ organ) {
    	validateRepeatOrgan(organ);
    	//根据pid查询父部门
    	Organ pOrgan = organDao.getOrgan(organ.getParentId(),organ.getCompanyId());
    	//设置该部门的级别
    	int level = Integer.parseInt(pOrgan.getLevel())+1;
    	organ.setLevel(String.valueOf(level));
    	organ.setEnable(true);
        int affectedLineNum = organDao.addOrgan(organ);
        return affectedLineNum;
    }

    /**
     * 根据id获取部门信息
     */
    public Organ getOrgan(String organId,String companyId) {
        Organ organ = organDao.getOrgan(organId,companyId);
        return organ;
    }

    /**
     * 更新部门信息
     */
    public int updateOrgan(Organ organ) {
    	//根据pid查询父部门
    	Organ pOrgan = organDao.getOrgan(organ.getParentId(),organ.getCompanyId());
    	//设置该部门的级别
    	int level = Integer.parseInt(pOrgan.getLevel())+1;
    	organ.setLevel(String.valueOf(level));
        int affectedLineNum = organDao.updateOrgan(organ);
        return affectedLineNum;
    }


    /**
     * 删除部门
     */
    public int deleteOrgan(String organId,String companyId) {
    	//递归删除部门和人员
    	deleteOrganStaff(organId,companyId);
        //删除角色关系表中的数据
        return organDao.deleteRoleOrgan(organId,companyId);
    }
    
    //递归删除
    public void deleteOrganStaff(String id,String companyId){
    	//获取所有pid为id的部门
    	List<String> organIds = organDao.queryOrganByPId(id, companyId);
    	//删除自己
    	organDao.deleteOrgan(id, companyId);
    	//删除部门下的所有人员
    	organDao.deleteStaffByOrganId(id,companyId);
    	if(organIds.size()>0){
    	for (String organId : organIds) {
    		deleteOrganStaff(organId,companyId);
		}
    	}
    }
    

    //验证部门名称是否存在
    private void validateRepeatOrgan(Organ organ) {
        if (organDao.getOrganByOrganName(
        		organ.getOrganName(),organ.getCompanyId(),organ.getLevel()) != null) {
            throw new ValidateErrorException("此部门名称已存在！");
        }
    }


	/**
	 * 获取所有的部门名称
	 */
	public List<Organ> getAllOrgan(String companyId) {
		return organDao.getAllOrgan(companyId);
	}

	/**
	 * 根据key搜索部门名称
	 */
	public List<Organ> searchOrgan(String key,String companyId) {
		return organDao.searchOrgan(key,companyId);
	}

	/**
	 * 获取三级部门
	 */
	public List<Organ> getNumberOrgan(String level) {
		return organDao.getNumberOrgan(level);
	}

	/**
	 * 角色模块需要的tree数据
	 */
	public List<OrganTreeNode> getOrganTree(String companyId) {
		return organDao. getOrganTree(companyId);
	}

	/**
	 * 查询zTee需要的部门和人员信息
	 */
	public List<OrganOrStaffTree> getOrganOrStaffTree(String type, String id,
			String companyId) {
		if(type.equals("organ")){
			List<OrganOrStaffTree> organZTreeList = organDao.getOrganZTree(id,companyId);
			for (OrganOrStaffTree organZTree : organZTreeList) {
				organZTree.setType(type);
			}
	        return organZTreeList;
		}else{
			List<OrganOrStaffTree> staffZTreeList = organDao.getStaffZTree(id,companyId);
			for (OrganOrStaffTree staffZTree : staffZTreeList) {
				staffZTree.setType(type);
			}
	        return staffZTreeList;
		}
	}

	/**
	 * 删除员工
	 */
	public int deleteStaff(String staffId, String companyId) {
		return organDao.deleteStaff(staffId,companyId);
	}

	@Override
	public int updateStaff(Staff staff) {
		return organDao.updateStaff(staff);
	}

	@Override
	public OrganOrStaffTree queryOrganByName(String name, String companyId) {
		return organDao.queryOrganByName(name,companyId);
	}

	@Override
	public int countStaff(String companyId) {
		return staffDao.countStaff(companyId);
	}

	@Override
	public int countStaffByOrganId(String organId,String companyId) {
		return staffDao.countStaffByOrganId(organId,companyId);
	}

	@Override
	public List<String> queryOrganByPId(String pId,String companyId) {
		return organDao.queryOrganByPId(pId,companyId) ;
	}

	@Override
	public void addRoleOrgan(String roleId, String organId, String companyId) {
		organDao.addRoleOrgan(roleId,organId,companyId);
		
	}

	@Override
	public List<OrganOrStaffTree> getStaffTreeByOrganId(String pid,
			String companyId) {
		return organDao.getStaffTreeByOrganId(pid,companyId);
	}

	@Override
	public OrganOrStaffTree getOrganTreeById(String pid, String companyId) {
		return organDao.getOrganTreeById(pid,companyId);
	}

	@Override
	public List<String> queryOrganNameByPId(String parentId, String companyId) {
		return organDao.queryOrganNameByPId(parentId,companyId);
	}


}
