package com.threegrand.bison.system.dao;


import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.system.model.CustomParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@mybatisRepository
public interface CustomParamDao {

    List<CustomParam> getCustomParamListPage(CustomParam customParam);

    CustomParam getCustomParamByParamName(String paramName);

    int addCustomParam(CustomParam customParam);

    CustomParam getCustomParam(@Param("customParamId") String customParamId, @Param("companyId") String companyId);

    int updateCustomParam(CustomParam customParam);

    int deleteCustomParam(String customParamId);

}
