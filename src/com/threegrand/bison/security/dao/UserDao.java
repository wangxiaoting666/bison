package com.threegrand.bison.security.dao;


import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.AccountMgt.model.Account;
import com.threegrand.bison.security.model.User;
import com.threegrand.bison.system.model.Organ;

import java.util.List;

import org.apache.ibatis.annotations.Param;

@mybatisRepository
public interface UserDao {
	Account getUserByUserName(Account account);
	
    User getUserByLoginName(
    		@Param("loginName")String loginName,
    		@Param("companyId")String companyId);

    List<User> getUserListPage(User user);

    List<User> queryAll();
    
    int addUser(User user);

    User getUser(
    		@Param("userId")String userId,
    		@Param("companyId")String companyId);

    int updateUser(User user);

    int deleteUser(
    		@Param("userId")String userId,
    		@Param("companyId")String companyId);

    int addUserRole(User user);

    int updatePassword(User user);

    List<User> getUserList(String companyId);

    int updateOrganUser(User user);

    List<User> getUserListByOrganId(String organId);

    List<User> getUserListToOrgan(String companyId);

	void userRoleAdd(
			@Param("roleName")String roleName,
			@Param("loginName")String loginName, 
			@Param("companyId")String companyId);

	List<String> getRoles(
			@Param("loginName")String loginName, 
			@Param("companyId")String companyId);

	//删除用户角色
	void deleteUserRole(
			@Param("loginName")String loginName,
			@Param("companyId")String companyId);

	User getCompanyIdByLoginName(
			@Param("loginName")String loginName,
			@Param("password")String password);

}
