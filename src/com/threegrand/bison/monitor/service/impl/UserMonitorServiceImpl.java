package com.threegrand.bison.monitor.service.impl;

import com.threegrand.bison.monitor.dao.UserMonitorDao;
import com.threegrand.bison.monitor.model.UserMonitor;
import com.threegrand.bison.monitor.service.UserMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/2/19.
 */
@Service("monitorService")
public class UserMonitorServiceImpl implements UserMonitorService {
    @Autowired
    private UserMonitorDao monitorDao;

    @Override
    public List<UserMonitor> getUserMonitorListPage(UserMonitor userMonitor) {
        return monitorDao.getUserMonitorListPage(userMonitor);
    }
}
