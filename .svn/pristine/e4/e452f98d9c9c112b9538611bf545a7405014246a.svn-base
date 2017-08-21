package com.threegrand.controller.system;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.threegrand.bison.companyInfo.service.CompanyInfoService;
import com.threegrand.bison.security.model.Role;
import com.threegrand.bison.security.model.User;
import com.threegrand.bison.security.service.RoleService;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.model.OrganOrStaffTree;
import com.threegrand.bison.system.model.Staff;
import com.threegrand.bison.system.service.OrganService;
import com.threegrand.bison.system.service.StaffService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.ajax.response.ReturnState;
import com.wonderland.sail.constant.Constant;

/**
 * Created by threegrand6 on 2014/12/1.
 */
@Controller
@RequestMapping("/system/organ")
public class OrganController {

	@Autowired
	private OrganService organService;
	@Autowired
	private UserService userService;
	@Autowired
	private RoleService roleService;
	@Autowired
	private StaffService staffService;
	@Autowired
	private CompanyInfoService companyInfoService;

	@RequestMapping(method = RequestMethod.GET)
	public String organ(Model model, HttpServletRequest request)
			throws JsonProcessingException {
		// 获取当前用户角色对应的部门id集合
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		List<String> organIds = getUserOrganIdsByRoleName(request, companyId);

		ArrayList<Organ> oList = new ArrayList<Organ>();
		for (String oid : organIds) {
				Organ organ = organService.getOrgan(oid, companyId);
				oList.add(organ);
		}
		model.addAttribute("organList", oList);
		//查询公司信息
		model.addAttribute("companyInfo",companyInfoService.getCompanyInfo());
		return "system/organ";
	}

	/**
	 * 获取部门和人员的tree数据
	 * @param request
	 * @return
	 */
	@RequestMapping("/getOrganTreeList")
	@ResponseBody
	public AjaxResponse getOrganTreeList(HttpServletRequest request) {

		// 获取当前用户角色对应的部门id集合
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		List<String> organIds = getUserOrganIdsByRoleName(request, companyId);

		List<OrganOrStaffTree> organTreeList = new ArrayList<OrganOrStaffTree>();
		
		int sum = 0;
		// 根据部门id查询其下的子部门和人员
		for (String id : organIds) {
			Organ organ = organService.getOrgan(id, companyId);
			OrganOrStaffTree oot = new OrganOrStaffTree();
			oot.setId(organ.getOrganId());
			oot.setpId(organ.getParentId());
			oot.setType("organ");
			// 顶级部门
			if (id.equals(companyId)) {
				// 查询出单位的所有的人数
				int count = organService.countStaff(companyId);
				oot.setName(organ.getOrganName() + "(" + count + ")");
				organTreeList.add(oot);
				//获取单位所属的人员
				List<OrganOrStaffTree> tree3 = organService
						.getOrganOrStaffTree("staff", id, companyId);
				organTreeList.addAll(tree3);
			} else {
				// 其他部门需要获取他的人员
				if (!organTreeList.contains(oot)) {
					int count = 0;
					count += getCount(id, companyId, 0);
					oot.setName(organ.getOrganName() + "(" + count + ")");
					organTreeList.add(oot);
				}
				List<OrganOrStaffTree> tree2 = organService
						.getOrganOrStaffTree("staff", id, companyId);
				organTreeList.addAll(tree2);
			}
		}

		return new AjaxResponse("organTree", organTreeList);
	}

	public int getCount(String pId, String companyId, int sum) {
		sum += organService.countStaffByOrganId(pId, companyId);
		// 查询出pid为传入id的所有部门id
		List<String> organIdList = organService.queryOrganByPId(pId, companyId);
		if (organIdList.size()>0) {
			// 遍历查询出当前部门下的人数，
			for (String organId : organIdList) {
				int count = organService
						.countStaffByOrganId(organId, companyId);
				sum += count;
				getCount(organId, companyId, sum);
			}
		} else {
			sum += 0;
		}
		return sum;
	}

	@RequestMapping("/getUserListToOrgan")
	@ResponseBody
	public AjaxResponse getUserListToOrgan(HttpServletRequest request) {
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		List<User> userList = userService.getUserListToOrgan(companyId);
		return new AjaxResponse("userList", userList);
	}

	/**
	 * 添加部门
	 * 
	 * @param organ
	 * @param result
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse addOrgan(@RequestBody @Valid Organ organ,
			BindingResult result, HttpServletRequest request) {
		if (result.hasErrors()) {
			return new AjaxResponse(result);
		}
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		//判断同级部门下是否有同名的部门
		List<String> organNameList = organService.queryOrganNameByPId(organ.getParentId(), companyId);
		if(organNameList.contains(organ.getOrganName())){
			return new AjaxResponse(ReturnState.ERROR, "该部门下存在相同名称的子部门");
		}
		organ.setCompanyId(companyId);
		//获取所有的角色
		List<Role> roleList = roleService.getRoleList(companyId);
		//添加部门
		int affectedLineNum = organService.addOrgan(organ);
		//遍历判断角色是否有添加部门上级部门的权限
		for (Role role : roleList) {
			List<String> organIds = roleService.getOrganIds(role.getRoleId(), companyId);
			if(organIds.contains(organ.getParentId())){
				organService.addRoleOrgan(role.getRoleId(), organ.getOrganId(),
						companyId);
			}
		}
		return AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
	}

	/**
	 * 根据id获取部门信息
	 * 
	 * @param organId
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/{organId}", method = RequestMethod.GET)
	@ResponseBody
	public AjaxResponse getOrgan(@PathVariable String organId,
			HttpServletRequest request) throws JsonProcessingException {
		AjaxResponse ajaxResponse = new AjaxResponse();
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
		// 查询部门
		Organ organ = organService.getOrgan(organId, companyId);
		ajaxResponse.addAttribute("organ", organ);
		return ajaxResponse;
	}

	/**
	 * 根据id获取人员信息
	 * 
	 * @param organId
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "getStaff/{id}", method = RequestMethod.GET)
	@ResponseBody
	public AjaxResponse getStaff(@PathVariable String id,
			HttpServletRequest request) throws JsonProcessingException {
		AjaxResponse ajaxResponse = new AjaxResponse();
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
		// 查询人员
		Staff staff = staffService.getStaff(id, companyId);
		ajaxResponse.addAttribute("staff", staff);
		return ajaxResponse;
	}

	/**
	 * 更新部门信息
	 * 
	 * @param organ
	 * @param result
	 * @return
	 */
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public AjaxResponse updateOrgan(@RequestBody @Valid Organ organ,
			BindingResult result, HttpServletRequest request) {
		if (result.hasErrors()) {
			return new AjaxResponse(result);
		}
		String companyId = request.getSession().getAttribute("companyId").toString();
		
		//验证更改后的部门名称是否有重复
		Organ o1 = organService.getOrgan(organ.getOrganId(), companyId);
		if(!o1.getOrganName().equals(organ.getOrganName())){
			List<String> organNameList = organService.queryOrganNameByPId(organ.getParentId(), companyId);
				if(organNameList.contains(organ.getOrganName())){
					return new AjaxResponse(ReturnState.ERROR, "该部门下存在相同名称的子部门");
				}
		}
		
		//验证更新后的父部门是否合法
		Organ pOrgan = organService.getOrgan(organ.getParentId(), companyId);
		Organ sOrgan = organService.getOrgan(organ.getOrganId(), companyId);
		if( Integer.parseInt(pOrgan.getLevel()) > Integer.parseInt(sOrgan.getLevel()) 
				|| pOrgan.getOrganName().equals(organ.getOrganName())){
			return new AjaxResponse(ReturnState.ERROR, "父部门填写有误");
		}
		
		organ.setCompanyId(companyId);
		int affectedLineNum = organService.updateOrgan(organ);
		return AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
	}

	/**
	 * 更新员工信息
	 * 
	 * @param organ
	 * @param result
	 * @return
	 */
	@RequestMapping(value = "updateStaff", method = RequestMethod.PUT)
	@ResponseBody
	public AjaxResponse updateStaff(@RequestBody @Valid Staff staff,
			BindingResult result, HttpServletRequest request) {
		if (result.hasErrors()) {
			return new AjaxResponse(result);
		}
		String companyId= request.getSession().getAttribute("companyId").toString();
		//判断更新后的人员名称是否重复
		Staff s1 = staffService.getStaff(staff.getId(), companyId);
		if(!s1.getName().equals(staff.getName())){
			List<String> staffNameList = staffService.getStaffNameByOrganId(staff.getOrganId(), companyId);
			if(staffNameList.contains(staff.getName())){
				return new AjaxResponse(ReturnState.ERROR, "该部门下有相同名称的员工");
			}
		}
		
		staff.setCompanyId(companyId);
		int affectedLineNum = organService.updateStaff(staff);
		return AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
	}

	/**
	 * 删除部门
	 * 
	 * @param organId
	 * @return
	 */
	@RequestMapping(value = "/{organId}", method = RequestMethod.DELETE)
	@ResponseBody
	public AjaxResponse deleteOrgan(@PathVariable String organId,
			HttpServletRequest request) {
		int affectedLineNum = organService.deleteOrgan(organId, request
				.getSession().getAttribute("companyId").toString());
		return AjaxResponse
				.getInstanceByResult(affectedLineNum >= Constant.AFFECTED_LINE_1);
	}

	/**
	 * 删除人员
	 * 
	 * @param organId
	 * @return
	 */
	@RequestMapping(value = "deleteStaff/{staffId}", method = RequestMethod.DELETE)
	@ResponseBody
	public AjaxResponse deleteStaff(@PathVariable String staffId,
			HttpServletRequest request) {
		int affectedLineNum = organService.deleteStaff(staffId, request
				.getSession().getAttribute("companyId").toString());
		return AjaxResponse
				.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
	}

	/**
	 * 根据关键词查询部门或者人员
	 * 
	 * @param key
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse searchOrgan(@RequestParam("key") String key,
			HttpServletRequest request) throws Exception {
		// 获取当前用户角色对应的部门id集合
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		List<String> organIds = getUserOrganIdsByRoleName(request, companyId);
		
		List<Organ> organList = organService.searchOrgan(key,companyId);
		StringBuffer sb = new StringBuffer();
		if(organList.size()>0){
		for (Organ organ : organList) {
			if (organIds.contains(organ.getOrganId())) {
				sb.append(organ.getOrganName()).append(",");
			}
		}
		}else{
			//如果根据关键词查询不到部门，就去查询人员
			List<Staff> staffList = staffService.getStaffLikeName(key,companyId);
			for (Staff staff : staffList) {
				if(organIds.contains(staff.getOrganId())){
					sb.append(staff.getName()).append(",");
				}
			}
		}
		return new AjaxResponse("nameList", sb.toString());
	}

	/**
	 * 添加员工
	 * 
	 * @param staff
	 * @param result
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addStaff", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse addStaff(@RequestBody @Valid Staff staff,
			BindingResult result, HttpServletRequest request) {
		if (result.hasErrors()) {
			return new AjaxResponse(result);
		}
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
        //判断该部门下面是否还有同名的员工
		List<String> staffNameList = staffService.getStaffNameByOrganId(staff.getOrganId(), companyId);
		if(staffNameList.contains(staff.getName())){
			return new AjaxResponse(ReturnState.ERROR, "该部门下有相同名称的员工");
		}
		staff.setCompanyId(companyId);
		int affectedLineNum = staffService.addStaff(staff);
		return new AjaxResponse("organName", affectedLineNum);
	}

	/**
	 * 根据name查询部门或者人员
	 * 
	 * @param key
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/queryOrganByName", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse queryOrganByName(@RequestParam("name") String name,
			HttpServletRequest request) throws Exception {
		
		// 获取当前用户角色对应的部门id集合
		String companyId = (String) request.getSession().getAttribute(
				"companyId");
		List<String> organIds = getUserOrganIdsByRoleName(request, companyId);
		OrganOrStaffTree organ = organService.queryOrganByName(name, companyId);
		ArrayList<OrganOrStaffTree> orList = new ArrayList<OrganOrStaffTree>();
       
		if (organ != null) {
			getOrganOrStaffByPId(organ.getId(), orList, companyId, organIds);
			return new AjaxResponse("ztreeNode", orList);
		} else {
			//如果部门为空，就去查询人员
			List<Staff> stList = staffService.getStaffLikeName(name, companyId);
			return new AjaxResponse("ztreeNode", stList);
		}
	}

	// 根据部门id查询其下的子部门和人员
	public List<OrganOrStaffTree> getOrganOrStaffByPId(String pid,
			ArrayList<OrganOrStaffTree> orList, String companyId,
			List<String> organIds) {
		// 根据id获取部门tree的数据
		if (organIds.contains(pid)) {
			OrganOrStaffTree zOrgan = organService.getOrganTreeById(pid,
					companyId);
			zOrgan.setType("organ");
			orList.add(zOrgan);
			// 获取部门下人员tree数据
			List<OrganOrStaffTree> staffByOrganId = organService
					.getStaffTreeByOrganId(pid, companyId);
			for (OrganOrStaffTree zStaff : staffByOrganId) {
				zStaff.setType("staff");
				orList.add(zStaff);
			}
			// 获取该部门下的所有子部门id
			List<String> oidList = organService.queryOrganByPId(pid, companyId);
			// 遍历
			for (String oid : oidList) {
				getOrganOrStaffByPId(oid, orList, companyId, organIds);
			}
		}
		return orList;
	}

	public List<String> getUserOrganIdsByRoleName(HttpServletRequest request,
			String companyId) {
		// 获取当前用户对应的角色名
		String loginName = (String) SecurityUtils.getSubject().getPrincipal();
		String roleName = userService.getRoles(loginName, companyId).get(0);

		// 通过角色名获取部门id
		Role role = roleService.getRoleByName(roleName, companyId);
		List<String> organIds = roleService.getOrganIds(role.getRoleId(),
				companyId);
		return organIds;
	}

}
