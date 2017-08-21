package com.threegrand.bison.develop.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.develop.model.Menu;

import java.util.List;
import java.util.Map;

@mybatisRepository
public interface MenuDao {
    List<Menu> getMenuListByLevel(String level);

    List<Map<String, String>> getMenuTreeList();

    List<Menu> getMenuList();

    Menu getMenu(String menuId);

    int addMenu(Menu menu);

    int updateMenu(Menu menu);

    int deleteMenu(String menuId);

    int deleteMenuByParentId(String parentId);

    void updateMenuOrder(Menu menu);

    /*根据permToken删除menu*/
    void deleteMenuByPermToken(String permToken);

    Menu getNewsMenu();

    List<Menu> getMenusByPermToken(String permToken);

    List<Menu> getMenuByMenuName(String menuName);
}
