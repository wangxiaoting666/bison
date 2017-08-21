package com.threegrand.controller.security;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.develop.service.PermissionService;
import com.threegrand.bison.security.model.OrganTreeNode;
import com.threegrand.bison.security.model.PermissionTreeNode;
import com.threegrand.bison.security.model.Role;
import com.threegrand.bison.security.service.RoleService;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.system.service.OrganService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.ajax.response.ReturnState;
import com.wonderland.sail.constant.Constant;

/**
 * @权限管理--角色管理
 * Created by Administrator on 2014/9/24.
 */
@Controller
@RequestMapping("/security/role")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private OrganService organService;
    /**
     * @页面跳转
     * @param model
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("security:role:open")
    public String role(Model model, HttpServletRequest request) throws JsonProcessingException {
        String companyId = (String) request.getSession().getAttribute("companyId");
        //permissionTree
        List<PermissionTreeNode> permissionTreeNodes = permissionService.getPermissionTree(companyId);
        model.addAttribute("tree", new ObjectMapper().writeValueAsString(permissionTreeNodes));
        //organTree
        List<OrganTreeNode> OrganTreeNodes = organService.getOrganTree(companyId);
        
        model.addAttribute("oTree", new ObjectMapper().writeValueAsString(OrganTreeNodes));
        return "security/role";
    }

    /**
     * @获取权限列表
     * @param role
     * @param request
     * @return
     */
    @RequestMapping("/getRoleListPage")
    @ResponseBody
    public DataTablesResponse getRoleListPage(Role role, HttpServletRequest request) {
        role.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return new DataTablesResponse(role, roleService.getRoleListPage(role));
    }

    /**
     * @添加角色
     * @param role
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addRole(@RequestBody @Valid Role role, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        role.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectedLineNum = roleService.addRole(role);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     * @删除角色
     * @param roleId
     * @param request
     * @return
     */
    @RequestMapping(value = "/{roleId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteRole(@PathVariable String roleId, HttpServletRequest request) {
    	//验证该角色是否关联用户
    	String companyId = request.getSession().getAttribute("companyId").toString();
    	Role role = roleService.getRole(roleId, companyId);
    	int count = roleService.getUserRoleByRoleName(role.getRoleName(),role.getCompanyId());
    	if(count>0){
    		return new AjaxResponse(ReturnState.ERROR,"角色已绑定用户,不能删除");
    	}else{
    		int affectedLineNum = roleService.deleteRole(roleId,companyId);
            return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    	}
    }

    /**
     * @获取角色
     * @param roleId
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/{roleId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getRole(@PathVariable String roleId, HttpServletRequest request) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
       
        String companyId = (String) request.getSession().getAttribute("companyId");
        Role role = roleService.getRole(roleId,companyId);
        ajaxResponse.addAttribute("role", role);
        
        //获取角色对应的权限
        ajaxResponse.addAttribute("permTokenTree", permissionService.getPermissionTreeByRole(role.getRoleName(),companyId));
     
        //获取角色管理的部门
        ajaxResponse.addAttribute("organTokenTree", roleService.getRoleOrgan(role));
        return ajaxResponse;
    }

    /**
     * 更新角色
     * @param role
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateUser(@RequestBody @Valid Role role, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        role.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectedLineNum = roleService.updateRole(role);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

}
