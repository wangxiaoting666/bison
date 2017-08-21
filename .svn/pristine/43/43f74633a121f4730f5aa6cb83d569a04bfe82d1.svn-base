package com.threegrand.controller.security;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.develop.service.PermissionService;
import com.threegrand.bison.security.model.Role;
import com.threegrand.bison.security.model.User;
import com.threegrand.bison.security.service.RoleService;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.service.OrganService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.ajax.response.ReturnState;
import com.wonderland.sail.constant.Constant;

/**
 * @权限管理--用户管理
 */
@Controller
@RequestMapping("/security/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private OrganService organService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionService permissionService;

	/**
	 * @页面跳转
	 * @param model
	 * @param request
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping(method = RequestMethod.GET)
	@RequiresPermissions("security:user:open")
	public String user(Model model, HttpServletRequest request)
			throws JsonProcessingException {
		// 获取所有的角色
		List<Role> roleList = roleService.getRoleList(request.getSession()
				.getAttribute("companyId").toString());
		model.addAttribute("roleList", roleList);

		// 获取所有的部门
		List<Organ> organList = organService.getAllOrgan(request.getSession()
				.getAttribute("companyId").toString());
		model.addAttribute("organList", organList);
		return "security/user";
	}

	/**
	 * @获取用户列表
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/getUserListPage")
	@ResponseBody
	public DataTablesResponse getUserListPage(User user,
			HttpServletRequest request) {
		user.setCompanyId(request.getSession().getAttribute("companyId")
				.toString());
		return new DataTablesResponse(user, userService.getUserListPage(user));
	}

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @param result
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse addUser(@RequestBody @Valid User user,
			BindingResult result, HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId").toString();
		if (result.hasErrors()) {
			return new AjaxResponse(result);
		}
		if(userService.getUserByLoginName(user.getLoginName(), companyId) != null){
			return new AjaxResponse(ReturnState.ERROR, "登录名已存在");
		}
		user.setCompanyId(companyId);
		int affectedLineNum = userService.addUser(user);
		return AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
	}

	/**
	 * @获取用户
	 * @param userId
	 * @param request
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/{userId}", method = RequestMethod.GET)
	@ResponseBody
	public AjaxResponse getUser(@PathVariable String userId,
			HttpServletRequest request) throws JsonProcessingException {
		String companyId = (String) request.getSession().getAttribute("companyId");
		AjaxResponse ajaxResponse = new AjaxResponse();
		User user = userService.getUser(userId,companyId);
		ajaxResponse.addAttribute("user", user);
		// 获取用户的角色
		ajaxResponse.addAttribute("roleNameList",
				userService.getRoles(user.getLoginName(), companyId));

		//获取部门
		Organ organ = organService.getOrgan(user.getOrganId(),companyId);
		ajaxResponse.addAttribute("organ",organ);
		return ajaxResponse;
	}

	/**
	 * @更新人员
	 * @param user
	 * @param result
	 * @return
	 */
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public AjaxResponse updateUser(@RequestBody @Valid User user,
			BindingResult result, HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId").toString();
		if (result.hasErrors()) {
			return new AjaxResponse(result);
		}
		//验证更新后的登录名是否重复
		User u1 = userService.getUser(user.getUserId(),companyId);
		if(!u1.getLoginName().equals(user.getLoginName()) ){
			if(userService.getUserByLoginName(user.getLoginName(), companyId) != null){
				return new AjaxResponse(ReturnState.ERROR, "登录名已存在");
			}
		}
		user.setCompanyId(companyId);
		int affectedLineNum = userService.updateUser(user);
		return AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
	}

	/**
	 * @删除用户
	 * @param userId
	 * @return
	 */
	@RequestMapping(value = "/{userId}", method = RequestMethod.DELETE)
	@ResponseBody
	public AjaxResponse deleteUser(@PathVariable String userId,
			HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId").toString();
		int affectedLineNum = userService.deleteUser(userId,companyId);
		if(affectedLineNum==1){
		return  AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
		}else{
			return new AjaxResponse(ReturnState.ERROR, "超级用户不可以删除");
		}
	}

	/**
	 * @更新密码
	 * @param oldPassword
	 * @param newPassword
	 * @return
	 */
	@RequestMapping(value = "/updatePassword", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse updatePassword(String oldPassword, String newPassword,HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId").toString();
		String loginName = SecurityUtils.getSubject().getPrincipal().toString();
		int affectedLineNum = userService.updatePassword(loginName,
				oldPassword, newPassword,companyId);
		return AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
	}
	
}