package com.threegrand.bison.deviceManage.service;

import java.io.IOException;
import java.util.List;

import com.threegrand.bison.deviceManage.model.ApplicationManage;

public interface ApplicationManageService {

    public int insert(ApplicationManage applicationManage) throws IOException;

    public int edit(ApplicationManage applicationManage);

    public int delete(Integer id);

    public List<ApplicationManage> findApplicationListPage(ApplicationManage applicationManage);
}
