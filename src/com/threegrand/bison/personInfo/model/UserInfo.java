package com.threegrand.bison.personInfo.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

/**
 * Created by Administrator on 2015/12/26.
 */
public class UserInfo extends DataTablesPage{
    private String userId;
    private String userName;
    private String userRole;
    private String dangerArea;
    private String alertArea;
    private String userTag;
    private int relationId;
    private String buildingId;
    private String buildingName;
    private String stepNumber;

    public String getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(String stepNumber) {
        this.stepNumber = stepNumber;
    }

    public String getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(String buildingId) {
        this.buildingId = buildingId;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public int getRelationId() {
        return relationId;
    }

    public void setRelationId(int relationId) {
        this.relationId = relationId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getDangerArea() {
        return dangerArea;
    }

    public void setDangerArea(String dangerArea) {
        this.dangerArea = dangerArea;
    }

    public String getAlertArea() {
        return alertArea;
    }

    public void setAlertArea(String alertArea) {
        this.alertArea = alertArea;
    }

    public String getUserTag() {
        return userTag;
    }

    public void setUserTag(String userTag) {
        this.userTag = userTag;
    }


}
