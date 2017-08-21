package com.threegrand.bison.alert.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.alert.dao.AlertDao;
import com.threegrand.bison.alert.model.Alert;
import com.threegrand.bison.alert.service.AlertService;
import com.threegrand.bison.assets.model.Asset;
import com.threegrand.bison.system.model.Staff;

/**
 * Created by junze on 2016/10/16.
 */
@Service("alertService")
public class AlertServiceImpl implements AlertService {

    @Autowired
    private AlertDao alertDao;
    
    @Autowired
    private  HttpServletRequest request;
    @Autowired
    private HttpSession session;

    @Override
    public List<Alert> getAlertHistoryListPage(Alert alert) {
        return alertDao.getAlertHistoryListPage(alert);
    }

    @Override
    public List<Alert> getUncheckedAlert(String companyId) {
        return alertDao.getUncheckedAlert(companyId);
    }

    @Override
    public List<Alert> getAlertTrace(Alert alert) {
        return alertDao.getAlertTrace(alert);
    }

    @Override
    public int checkAlert(Alert alert) {
        return alertDao.checkAlert(alert);
    }

	@Override
	public int addAlert(Alert alert) {
		//根据资产或人员来查询公司和部门信息
		if(alert.getDeviceClass().equals("0")){
			Asset asset = alertDao.getCompanyIdByAsset(alert);
			alert.setCompanyId(asset.getCompanyId());
			alert.setOrganId(asset.getOrganId());
			alert.setOrganName(asset.getOrganName());
		}else{
			Staff staff = alertDao.getCompanyIdByStaff(alert);
			alert.setCompanyId(staff.getCompanyId());
			alert.setOrganId(staff.getOrganId());
		}
		return alertDao.addAlert(alert);
	}

	@Override
	public int deleteAlerts(String[] ids, String companyId) {
		return alertDao.deleteAlerts(ids,companyId);
	}
}
