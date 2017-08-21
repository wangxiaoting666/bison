package com.threegrand.bison.develop.service;

import com.threegrand.bison.develop.model.Menu;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface MenuService {

    void initMenuInContext();

    void updateMenuInSession(HttpServletRequest request);

    List<Map<String, String>> getMenuTreeList();

    Menu getMenu(String menuId);

    int addMenu(Menu menu);

    int updateMenu(Menu menu);

    int deleteMenu(String menuId);

    void updateMenuOrder(List<Menu> menuList);
}
