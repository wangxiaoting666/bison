package com.threegrand.controller.alert;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.threegrand.bison.alert.model.Alert;
import com.threegrand.bison.alert.service.AlertService;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.security.model.Role;
import com.threegrand.bison.security.service.RoleService;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.system.model.Organ;
import com.threegrand.bison.system.service.OrganService;
import com.wonderland.sail.ajax.response.AjaxResponse;

/**
 * Created by junze on 2016/10/16.
 */
@Controller
@RequestMapping("/alert")
public class alertHistoryController {
	@Autowired
	private AlertService alertService;
	@Autowired
	private UserService userService;
	@Autowired
	private RoleService roleService;
	@Autowired
	OrganService organService;

	@RequestMapping
	public String toDeviceManage(Model model, HttpServletRequest request) {
		// 获取所有的部门信息
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
		List<Organ> allOrgan = organService.getAllOrgan(companyId);
		model.addAttribute("organList", allOrgan);
		return "alert/alertHistory";
	}

	/**
	 * 获取所有的告警信息
	 * 
	 * @param alertSignal
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getAlertHistoryListPage", method = RequestMethod.POST)
	@ResponseBody
	public DataTablesResponse getAlertHistoryListPage(Alert alert,
			HttpServletRequest request) throws Exception {
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
		// 获取当前用户对应的角色名
		String loginName = (String) SecurityUtils.getSubject().getPrincipal();
		String roleName = userService.getRoles(loginName, companyId).get(0);
		// 通过角色名获取部门id
		Role role = roleService.getRoleByName(roleName, companyId);
		List<String> organIds = roleService.getOrganIds(role.getRoleId(),
				companyId);
		ArrayList<String> arrayList = new ArrayList<String>();

		for (String organId : organIds) {
			/**
			 * 获取该部门下的所有子部门id集合 如果子部门id集合不为null，判断organIds是否包含所有的子部门id集合 --
			 * 是，有该部门的权限 如果子部门id集合为null，有该部门的权限
			 */
			List<String> organIdList = organService.queryOrganByPId(organId,
					companyId);
			if (organIdList.size() > 0) {
				if (organIds.containsAll(organIdList)) {
					arrayList.add(organId);
				}
			} else {
				arrayList.add(organId);
			}
		}

		alert.setCompanyId(companyId);
		alert.setOrganIdList(arrayList);
		List<Alert> alertHistory = alertService.getAlertHistoryListPage(alert);

		return new DataTablesResponse(alert, alertHistory);
	}

	/**
	 * 获取所有未读信息
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAlertUncheckedList", method = RequestMethod.GET)
	@ResponseBody
	public AjaxResponse getAlertUncheckedList(HttpServletRequest request) {
		HashMap<String, Integer> hashMap = new HashMap<String, Integer>();
		int class1 = 0;
		int class2 = 0;
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
		List<Alert> alertUncheckedList = alertService
				.getUncheckedAlert(companyId);
		for (Alert alert : alertUncheckedList) {
			if (alert.getAlertClass().equals("1")) {
				class1 += 1;
			} else {
				class2 += 1;
			}
		}
		hashMap.put("place", class1);
		hashMap.put("sos", class2);
		return new AjaxResponse("map", hashMap);
	}

	/**
	 * 修改消息的状态
	 * 
	 * @param alertSignal
	 * @return
	 */
	@RequestMapping(value = "/checkAlert", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse checkAlert(Alert alert, HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId")
				.toString();
		alert.setCompanyId(companyId);
		return AjaxResponse.getInstanceByResult(
				alertService.checkAlert(alert) > 0).addAttribute("trace",
				alertService.getAlertTrace(alert));
	}

	@RequestMapping(value = "/deleteAlerts", method = RequestMethod.POST)
	@ResponseBody
	public AjaxResponse deleteAlerts(@RequestParam(value = "ids") String[] ids,
			HttpServletRequest request) {
		String companyId = request.getSession().getAttribute("companyId")
				.toString();

		int count = alertService.deleteAlerts(ids, companyId);

		return AjaxResponse.getInstanceByResult(count > 0);

	}

}
