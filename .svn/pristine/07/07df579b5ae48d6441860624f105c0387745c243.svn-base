package com.threegrand.bison.design.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.design.dao.ModuleDao;
import com.threegrand.bison.design.model.Module;
import com.threegrand.bison.design.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/9/23.
 * User: 林宗广
 * Date: 2014/9/23
 * Time: 14:38
 */
@Service("moduleService")
public class ModuleServiceImpl implements ModuleService {
    @Autowired
    private ModuleDao moduleDao;

    @Override
    public List<Module> getModuleListPage(Module module) {
        return moduleDao.getModuleListPage(module);
    }

    @Override
    public List<Module> getModuleList(String companyId) {
        return moduleDao.getModuleList(companyId);
    }

    @Override
    public int addModule(Module module) {
        validateRepeatModuleAlias(module);
        validateRepeatModule(module);
        int affectedLineNum = moduleDao.addModule(module);
        /*添加栏目，并且栏目名称不存在*/
        return affectedLineNum;
    }

    @Override
    public Module getModuleById(String moduleId) {
        return moduleDao.getModuleById(moduleId);
    }

    @Override
    public int updateModule(Module module) {
        Module getModule = getModule(module);
         /*验证栏目别名是否存在*/
        if (!getModule.getModuleName().equals(module.getModuleName())) {
            validateRepeatModule(module);
        }
        /*验证栏目名称是否存在*/
        if (!getModule.getAlias().equals(module.getAlias())) {
            validateRepeatModuleAlias(module);
        }
        return moduleDao.updateModule(module);
    }

    private Module getModule(Module module) {
        return moduleDao.getModuleById(module.getModuleId());
    }

    @Override
    public int deleteModule(String moduleId) {
        return moduleDao.deleteModule(moduleId);
    }

    @Override
    public Module getModuleByAlias(String alias) {
        return moduleDao.getModuleByAlias(alias);
    }

    /*栏目名不相同*/
    private void validateRepeatModule(Module module) {
        if (moduleDao.getModuleByModuleName(module.getModuleName()) != null) {
            throw new ValidateErrorException("栏目名已存在！");
        }
    }

    /*别名不相同*/
    private void validateRepeatModuleAlias(Module module) {
        if (moduleDao.getModuleByAlias(module.getAlias()) != null) {
            throw new ValidateErrorException("别名已存在！");
        }
    }
}
