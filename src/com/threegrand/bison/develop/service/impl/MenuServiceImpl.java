package com.threegrand.bison.develop.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.design.dao.ModuleDao;
import com.threegrand.bison.design.model.Module;
import com.threegrand.bison.develop.dao.MenuDao;
import com.threegrand.bison.develop.dao.PermissionDao;
import com.threegrand.bison.develop.model.Menu;
import com.threegrand.bison.develop.model.Permission;
import com.threegrand.bison.develop.service.MenuService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("menuService")
public class MenuServiceImpl implements MenuService {

    @Autowired
    private PermissionDao permissionDao;
    @Autowired
    private MenuDao menuDao;
    @Autowired
    private ModuleDao moduleDao;

    /**
     * 启动时将菜单放在context中
     */
    @Override
    @PostConstruct
    public void initMenuInContext() {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        if (webApplicationContext != null) {
            List<Menu> list = menuDao.getMenuList();
            List<Module> moduleList = moduleDao.getModuleList(null);
            addModuleToLevel1MenuList(list, moduleList);
            addModuleToLevel2MenuList(list, moduleList);
            Map<String, Menu> menuMap = new HashMap<String, Menu>();
            for (Menu menu : list) {
                menuMap.put(menu.getMenuId(), menu);
            }
            webApplicationContext.getServletContext().setAttribute("menuMap", menuMap);
        }
    }

    /**
     * 更新session中存储的菜单信息。
     * @param request request
     */
    @Override
    public void updateMenuInSession(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String companyId = (String) session.getAttribute("companyId");

        List<Menu> level0List = new ArrayList<Menu>();
        Subject currentUser = SecurityUtils.getSubject();
        for (Menu menu : menuDao.getMenuListByLevel("0")) {
            if (currentUser.isPermitted(menu.getPermToken())) {
                level0List.add(menuUrlHandle(menu));
            }
        }

        List<Menu> level1List = menuDao.getMenuListByLevel("1");
        List<Module> moduleList = moduleDao.getModuleList(companyId);
        addModuleToLevel1MenuList(level1List, moduleList);
        Map<String, List<Menu>> level1Map = groupMenuList(level1List);

        List<Menu> level2List = menuDao.getMenuListByLevel("2");
        addModuleToLevel2MenuList(level2List, moduleList);
        Map<String, List<Menu>> level2Map = groupMenuList(level2List);

        session.setAttribute("level0List", level0List);
        session.setAttribute("level1Map", level1Map);
        session.setAttribute("level2Map", level2Map);
    }

    private void addModuleToLevel2MenuList(List<Menu> level2List, List<Module> moduleList) {
        for (Module module : moduleList) {
            Menu typeMenu = new Menu();
            typeMenu.setMenuId("module" + module.getModuleId() + "type");
            typeMenu.setMenuName(module.getModuleName() + "分类管理");
            typeMenu.setIcon("icon-grid");
            typeMenu.setUrl("news/newsType?moduleId=" + module.getModuleId());
            typeMenu.setPermToken("news:news" + module.getModuleId() + ":open");
            typeMenu.setParentId("module" + module.getModuleId());
            typeMenu.setLevel("1");
            typeMenu.setLeaf(false);
            level2List.add(typeMenu);
            Menu newsMenu = new Menu();
            newsMenu.setMenuId("module" + module.getModuleId() + "news");
            newsMenu.setMenuName(module.getModuleName() + "信息管理");
            newsMenu.setIcon("icon-list");
            newsMenu.setUrl("news/news?moduleId=" + module.getModuleId());
            newsMenu.setPermToken("news:news" + module.getModuleId() + ":open");
            newsMenu.setParentId("module" + module.getModuleId());
            newsMenu.setLevel("1");
            newsMenu.setLeaf(false);
            level2List.add(newsMenu);
        }
    }

    private void addModuleToLevel1MenuList(List<Menu> level1List, List<Module> moduleList) {
        Menu newsMenu = menuDao.getNewsMenu();
        for (Module module : moduleList) {
            Menu menu = new Menu();
            menu.setMenuId("module" + module.getModuleId());
            menu.setMenuName(module.getModuleName());
            menu.setIcon("icon-book-open");
            menu.setUrl("");
            menu.setPermToken("news:news" + module.getModuleId() + ":open");
            menu.setParentId(newsMenu.getMenuId());
            menu.setLevel("1");
            menu.setLeaf(false);
            level1List.add(menu);
        }
    }

    private Map<String, List<Menu>> groupMenuList(List<Menu> menuList) {
        Subject currentUser = SecurityUtils.getSubject();
        Map<String, List<Menu>> map = new HashMap<String, List<Menu>>();
        for (Menu menu : menuList) {
            if (!map.containsKey(menu.getParentId())) {
                map.put(menu.getParentId(), new ArrayList<Menu>());
            }
            if ("".equals(menu.getPermToken()) || currentUser.isPermitted(menu.getPermToken())) {
                map.get(menu.getParentId()).add(menuUrlHandle(menu));
            }
        }
        return map;
    }

    private Menu menuUrlHandle(Menu menu) {
        String url = menu.getUrl();
        menu.setUrl(url + (url.contains("?") ? "&" : "?") + "menuId=" + menu.getMenuId());
        return menu;
    }

    @Override
    public List<Map<String, String>> getMenuTreeList() {
        return menuDao.getMenuTreeList();
    }

    @Override
    public Menu getMenu(String menuId) {
        return menuDao.getMenu(menuId);
    }

    @Override
    public int addMenu(Menu menu) {
        validateMenu(menu);
        if (menu.isLeaf()) {
            Permission permission = new Permission();
            permission.setPermToken(menu.getPermToken());
            permission.setParentId(menu.getParentId());
            permission.setDescription(menu.getMenuName());
            permissionDao.addPermission(permission);
        }
        return menuDao.addMenu(menu);
    }

    @Override
    public int updateMenu(Menu menu) {
        validateMenu(menu);
        Menu originalMenu = getMenu(menu.getMenuId());
        if (menu.isLeaf() && !originalMenu.getPermToken().equals(menu.getPermToken())) {
            if (!"".equals(originalMenu.getPermToken())) {
                permissionDao.deletePermission(originalMenu.getPermToken());
            }
            Permission permission = new Permission();
            permission.setPermToken(menu.getPermToken());
            permission.setParentId(menu.getParentId());
            permission.setDescription(menu.getMenuName());
            permissionDao.addPermission(permission);
        }
        return menuDao.updateMenu(menu);
    }

    @Override
    public int deleteMenu(String menuId) {
        Menu menu = getMenu(menuId);
        if (menu.isLeaf()) {
            permissionDao.deletePermission(menu.getPermToken());
        }
       // menuDao.deleteMenuByParentId(menuId);
        return menuDao.deleteMenu(menuId);
    }

    @Override
    public void updateMenuOrder(List<Menu> menuList) {
        for (Menu menu : menuList) {
            menuDao.updateMenuOrder(menu);
        }
    }

    private void validateMenu(Menu menu) {
        if (menu.isLeaf() && "".equals(menu.getPermToken())) {
            throw new ValidateErrorException("权限许可不能为空！");
        }
    }
}
