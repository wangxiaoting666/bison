package com.threegrand.bison.monitor.service.impl;

import com.threegrand.bison.monitor.dao.AssetMonitorDao;
import com.threegrand.bison.monitor.model.AssetMonitor;
import com.threegrand.bison.monitor.service.AssetMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/2/20.
 */
@Service("assetMonitorService")
public class AssetMonitorServiceImpl implements AssetMonitorService {


    @Autowired
    private AssetMonitorDao assetMonitorDao;
    @Override
    public List<AssetMonitor> getAssetMonitorListPage(AssetMonitor assetMonitor) {
        return assetMonitorDao.getAssetMonitorListPage(assetMonitor);
    }
}
