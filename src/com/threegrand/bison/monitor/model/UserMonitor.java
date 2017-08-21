package com.threegrand.bison.monitor.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

/**
 * Created by Administrator on 2016/2/19.
 */
public class UserMonitor  extends DataTablesPage {

    private String userId;
    private String userName;
    private String status;
    private String building;
    private String step;
    private String locate;
    private String alertArea;
    private String dangerArea;
    private String roleName;
    private String tagName;
    private String relationId;
    private String braceletId;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public String getLocate() {
        return locate;
    }

    public void setLocate(String locate) {
        this.locate = locate;
    }

    public String getAlertArea() {
        return alertArea;
    }

    public void setAlertArea(String alertArea) {
        this.alertArea = alertArea;
    }

    public String getDangerArea() {
        return dangerArea;
    }

    public void setDangerArea(String dangerArea) {
        this.dangerArea = dangerArea;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getRelationId() {
        return relationId;
    }

    public void setRelationId(String relationId) {
        this.relationId = relationId;
    }

    public String getBraceletId() {
        return braceletId;
    }

    public void setBraceletId(String braceletId) {
        this.braceletId = braceletId;
    }
}
