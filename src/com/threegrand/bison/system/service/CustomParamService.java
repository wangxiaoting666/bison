package com.threegrand.bison.system.service;

import com.threegrand.bison.system.model.CustomParam;

import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
public interface CustomParamService {

    List<CustomParam> getCustomParamListPage(CustomParam customParam);

    int addCustomParam(CustomParam customParam);

    CustomParam getCustomParam(String customParamId, String companyId);

    int updateCustomParam(CustomParam customParam);

    int deleteCustomParam(String customParamId);

}
