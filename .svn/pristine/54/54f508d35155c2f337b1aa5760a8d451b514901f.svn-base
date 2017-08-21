package com.threegrand.bison.system.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.system.model.SysParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by Administrator on 2014/9/26.
 */

@mybatisRepository
public interface SysParamDao {

    List<SysParam> getSysParamListPage(SysParam sysParam);

    SysParam getSysParam(@Param("sysParamId") String sysParamId, @Param("companyId") String companyId);

    int updateSysParam(SysParam sysParam);

    int addSysParam(SysParam sysParam);

    int addSysParamValue(SysParam sysParam);

    List<SysParam> getSysParamList(String companyId);

    int deleteSysParamValue(SysParam sysParam);

}
