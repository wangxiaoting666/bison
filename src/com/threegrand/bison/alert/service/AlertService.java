package com.threegrand.bison.alert.service;

import java.util.ArrayList;
import java.util.List;

import com.threegrand.bison.alert.model.Alert;

/**
 * Created by junze on 2016/10/16.
 */
public interface AlertService {

    List<Alert> getAlertHistoryListPage(Alert alert);

    List<Alert> getUncheckedAlert(String companyId);

    List<Alert> getAlertTrace(Alert alert);

    int checkAlert(Alert alert);

	int addAlert(Alert alert);

	int deleteAlerts(String[] ids, String companyId);

}