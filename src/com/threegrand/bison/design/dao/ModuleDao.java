package com.threegrand.bison.design.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.design.model.Module;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by Administrator on 2014/9/23.
 * User: 宗晓宇
 * Date: 2014/9/23
 * Time: 14:42
 */
@mybatisRepository
public interface ModuleDao {

    List<Module> getModuleListPage(Module module);

    List<Module> getModuleList(@Param("companyId") String companyId);

    int addModule(Module module);

    Module getModuleById(String moduleId);

    Module getModuleByModuleName(String moduleName);

    Module getModuleByAlias(String alias);

    int updateModule(Module module);

    int deleteModule(String moduleId);
}
