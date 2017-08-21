package com.threegrand.bison.alert.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.threegrand.bison.alert.model.Alert;
import com.threegrand.bison.assets.model.Asset;
import com.threegrand.bison.system.model.Staff;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

/**
 * Created by junze on 2016/10/16.
 */
@mybatisRepository
public interface AlertDao {

    public List<Alert> getAlertHistoryListPage(Alert alert);

    public List<Alert> getUncheckedAlert(String companyId);

    public List<Alert> getAlertTrace(Alert alert);

    public int checkAlert(Alert alert);

	public int addAlert(Alert alert);

	public Asset getCompanyIdByAsset(Alert alert);

	public Staff getCompanyIdByStaff(Alert alert);

	public int deleteAlerts(
			@Param("ids")String[] ids, 
			@Param("companyId")String companyId);
}
