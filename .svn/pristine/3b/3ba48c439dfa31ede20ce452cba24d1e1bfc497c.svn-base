package com.threegrand.controller.develop;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.develop.model.Permission;
import com.threegrand.bison.develop.service.MenuService;
import com.threegrand.bison.develop.service.PermissionService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Controller
@RequestMapping("/develop/permission")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;
    @Autowired
    private MenuService menuService;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("develop:permission:open")
    public String user() throws JsonProcessingException {
        return "develop/permission";
    }

    @RequestMapping("/getPermissionListPage")
    @ResponseBody
    public DataTablesResponse getPermissionListPage(Permission permission) {
        return new DataTablesResponse(permission, permissionService.getPermissionListPage(permission));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addPermission(@RequestBody @Valid Permission permission, BindingResult result) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectedLineNum = permissionService.addPermission(permission);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{permToken}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getPermission(@PathVariable String permToken) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        Permission permission = permissionService.getPermissionByPermToken(permToken);
        ajaxResponse.addAttribute("permission", permission);
        return ajaxResponse;
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updatePermission(@RequestBody @Valid Permission permission, BindingResult result) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectedLineNum = permissionService.updatePermission(permission);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{permToken}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deletePermission(@PathVariable String permToken) {
        int affectedLineNum = permissionService.deletePermission(permToken);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

}
