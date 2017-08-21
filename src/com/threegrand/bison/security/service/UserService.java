package com.threegrand.bison.security.service;


import java.util.List;

import com.threegrand.bison.AccountMgt.model.Account;
import com.threegrand.bison.security.model.User;
import com.threegrand.bison.system.model.Organ;

public interface UserService {

    List<String> getRoles(String loginName,String companyId);

    User getUserByLoginName(String loginName,String companyId);
    
    Account getUserByUserName(Account account);
    
    List<User> getUserListPage(User user);

    int addUser(User user);

    User getUser(String userId,String companyId);

    int updateUser(User user);

    int deleteUser(String userId,String companyId);

    List<User> getUserList(String companyId);

    int updatePassword(String loginName, String oldPassword, String newPassword,String companyId);

    List<User> getUserListToOrgan(String companyId);

	void userRoleAdd(String roleName, String loginName, String companyId);

	void deleteUserRole(String loginName, String companyId);

	User getCompanyIdByLoginName(String loginName,String password);

}
