package com.threegrand.controller.develop;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.ajax.response.ReturnState;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.develop.model.Menu;
import com.threegrand.bison.develop.service.MenuService;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.ContextLoader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/develop/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @RequestMapping("/sidebar")
    public String showSidebar(Model model) {
        return "/develop/sidebar";
    }

    @RequestMapping("/current")
    public String getCurrent(HttpServletRequest request, HttpServletResponse response) throws IOException {
        @SuppressWarnings("all")
		Map<String, Menu> menuMap = (HashMap) ContextLoader.getCurrentWebApplicationContext()
                .getServletContext().getAttribute("menuMap");
        Menu menu = menuMap.get(request.getParameter("menuId"));
        int level = Integer.parseInt(menu.getLevel());
        String current = "<li><span><i class='" + menu.getIcon() + "'></i>" + menu.getMenuName() + "<span></li>";
        for (int i = 0; i < level; i++) {
            menu = menuMap.get(menu.getParentId());
            current = "<li><span><i class='" + menu.getIcon() + "'></i> " + menu.getMenuName()
                    + "</span><i class='fa fa-angle-right'></i>" + current;
        }
        response.getWriter().write(current);
        return null;
    }

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("develop:menu:open")
    public String menu() throws JsonProcessingException {
      /* if (!"admin".equals(SecurityUtils.getSubject().getPrincipal())) {
            throw new UnauthorizedException();
        }*/
        return "develop/menu";
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addMenu(@Valid Menu menu, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectedLineNum = menuService.addMenu(menu);
        menuService.initMenuInContext();
        menuService.updateMenuInSession(request);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{menuId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getUser(@PathVariable String menuId) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        Menu menu = menuService.getMenu(menuId);
        ajaxResponse.addAttribute("menu", menu);
        return ajaxResponse;
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateMenu(@Valid Menu menu, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectedLineNum = menuService.updateMenu(menu);
        menuService.initMenuInContext();
        menuService.updateMenuInSession(request);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "updateMenuOrder", method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateMenuOrder(@RequestBody List<Menu> menuList, HttpServletRequest request) {
        menuService.updateMenuOrder(menuList);
        menuService.initMenuInContext();
        menuService.updateMenuInSession(request);
        return new AjaxResponse();
    }

    @RequestMapping(value = "/{menuId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteUser(@PathVariable String menuId, HttpServletRequest request) {
        
    	if(menuId.equals("18")){
    		return new AjaxResponse("跟节点，不能删除！！");
    	}
    	int affectedLineNum = menuService.deleteMenu(menuId);
        menuService.initMenuInContext();
        menuService.updateMenuInSession(request);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }


    @RequestMapping("/getMenuTree")
    @ResponseBody
    public AjaxResponse getMenuTree() {
        return new AjaxResponse("tree", menuService.getMenuTreeList());
    }

    @RequestMapping("/menuSearch")
    @ResponseBody
    public AjaxResponse menuSearch(String menuId) {
        Menu menu = menuService.getMenu(menuId);
        if (SecurityUtils.getSubject().isPermitted(menu.getPermToken())) {
            String url = menu.getUrl();
            url = url + (url.contains("?") ? "&" : "?") + "menuId=" + menu.getMenuId();
            return new AjaxResponse("url", url);
        } else {
            return new AjaxResponse(ReturnState.ERROR, Constant.NOT_PERMITTED);
        }
    }
}
