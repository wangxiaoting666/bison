package com.threegrand.bison.security.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.AccountMgt.model.Account;
import com.threegrand.bison.security.dao.RoleDao;
import com.threegrand.bison.security.dao.UserDao;
import com.threegrand.bison.security.model.User;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.service.OrganService;
import com.wonderland.sail.autocomplete.service.AutoCompleteService;
import com.wonderland.sail.exception.ValidateErrorException;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private RoleDao roleDao;
	@Autowired
	private AutoCompleteService autoCompleteService;
	@Autowired
	private OrganService organService;

	public User getUserByLoginName(String loginName,String companyId) {
		return userDao.getUserByLoginName(loginName,companyId);
	}

	/**
	 * 获取分页用户
	 */
	public List<User> getUserListPage(User user) {
		List<User> userListPage = userDao.getUserListPage(user);
		for (User u2 : userListPage) {
			Organ organ = organService.getOrgan(u2.getOrganId(), u2.getCompanyId());
			u2.setOrganName(organ.getOrganName());
		}
		return userListPage;
	}

	/**
	 * 添加用户
	 */
	public int addUser(User user) {
		int affectedLineNum = userDao.addUser(user);
		addUserRole(user);
		autoCompleteService.initAutoComplete();
		return affectedLineNum;
	}



	/**
	 * 添加用户角色
	 * 
	 * @param user
	 */
	private void addUserRole(User user) {
		if (user.getRoleName() != null && !user.getRoleName().isEmpty()) {
			userDao.addUserRole(user);
		}
	}

	/**
	 * 获取用户
	 */
	public User getUser(String userId,String companyId) {
		return userDao.getUser(userId,companyId);
	}

	/**
	 * 更新用户
	 */
	public int updateUser(User user) {
		userDao.deleteUserRole(user.getLoginName(), user.getCompanyId());
		addUserRole(user);
		autoCompleteService.initAutoComplete();
		return userDao.updateUser(user);
	}

	/**
	 * 验证登录名是否存在
	 * 
	 * @param user
	 */
	private User validateRepeatUser(User user,String companyId) {
			return userDao.getUserByLoginName(user.getLoginName(),companyId) ;
	}

	/**
	 * 删除用户
	 */
	public int deleteUser(String userId,String companyId) {
		User user = getUser(userId,companyId);
		if(user.getLoginName().equals("super")){
			return 0;
		}
		userDao.deleteUserRole(user.getLoginName(), user.getCompanyId());
		autoCompleteService.initAutoComplete();
		return userDao.deleteUser(userId,companyId);
	}

	/**
	 * 根据登录名和公司id来获取用户角色
	 */
	public List<String> getRoles(String loginName, String companyId) {
		return userDao.getRoles(loginName, companyId);
	}

	/**
	 * 更新密码
	 */
	public int updatePassword(String loginName, String oldPassword,
			String newPassword,String companyId) {
		User user = userDao.getUserByLoginName(loginName,companyId);
		if (!user.getPassword().equals(oldPassword)) {
			throw new ValidateErrorException("原密码不正确！");
		}
		user.setPassword(newPassword);
		return userDao.updatePassword(user);
	}

	/**
	 * 获取所有的用户
	 */
	public List<User> getUserList(String companyId) {
		return userDao.getUserList(companyId);
	}

	/**
	 * 获取部门下的所有用户
	 */
	public List<User> getUserListToOrgan(String companyId) {
		return userDao.getUserListToOrgan(companyId);
	}

	public Account getUserByUserName(Account account) {
		return userDao.getUserByUserName(account);
	}

	/**
	 * 添加用户和角色
	 */
	public void userRoleAdd(String roleName, String loginName, String companyId) {
		userDao.userRoleAdd(roleName, loginName, companyId);

	}

	/**
	 * 删除用户和角色
	 */
	public void deleteUserRole(String loginName, String companyId) {
		userDao.deleteUserRole(loginName, companyId);
	}

	@Override
	public User getCompanyIdByLoginName(String loginName,String password) {
		return userDao.getCompanyIdByLoginName(loginName,password);
	}

}
