package com.threegrand.bison.system.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.system.dao.CustomParamDao;
import com.threegrand.bison.system.model.CustomParam;
import com.threegrand.bison.system.service.CustomParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
@Service("customParamService")
public class CustomParamServiceImpl implements CustomParamService {

    @Autowired
    private CustomParamDao customParamDao;

    @Override
    public List<CustomParam> getCustomParamListPage(CustomParam customParam) {
        return customParamDao.getCustomParamListPage(customParam);
    }

    @Override
    public int addCustomParam(CustomParam customParam) {
        if (customParamDao.getCustomParamByParamName(customParam.getParamName()) != null) {
            throw new ValidateErrorException("变量名已存在！");
        }
        return customParamDao.addCustomParam(customParam);
    }

    @Override
    public CustomParam getCustomParam(String customParamId, String companyId) {
        return customParamDao.getCustomParam(customParamId, companyId);
    }

    @Override
    public int updateCustomParam(CustomParam customParam) {
        return customParamDao.updateCustomParam(customParam);
    }

    @Override
    public int deleteCustomParam(String customParamId) {
        return customParamDao.deleteCustomParam(customParamId);
    }

}
