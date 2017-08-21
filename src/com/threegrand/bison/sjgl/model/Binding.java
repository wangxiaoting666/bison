package com.threegrand.bison.sjgl.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

import java.util.Date;
import java.util.List;

/**
 * Created by haxp on 2015/12/30.
 */
public class Binding extends DataTablesPage {
    public int id;
    public String userId;
    public String username;
    public String userRole;
    public String userTag;
    private String bindObj;
    private String braceletId;
    private String bindObjmc;
    private String bindType;

    public String assetId;
    public String assetName;
    public String assetRole;
    public String assetTag;
    public String assetInit;

    public Date xgsj;
    public String cz;


    public String getBraceletId() {
        return braceletId;
    }

    public void setBraceletId(String braceletId) {
        this.braceletId = braceletId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getXgsj() {
        return xgsj;
    }

    public void setXgsj(Date xgsj) {
        this.xgsj = xgsj;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserTag() {
        return userTag;
    }

    public void setUserTag(String userTag) {
        this.userTag = userTag;
    }


    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getAssetInit() {
        return assetInit;
    }

    public void setAssetInit(String assetInit) {
        this.assetInit = assetInit;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public String getAssetRole() {
        return assetRole;
    }

    public void setAssetRole(String assetRole) {
        this.assetRole = assetRole;
    }

    public String getAssetTag() {
        return assetTag;
    }

    public void setAssetTag(String assetTag) {
        this.assetTag = assetTag;
    }

    public String getCz() {
        return cz;
    }

    public void setCz(String cz) {
        this.cz = cz;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBindObj() {
        return bindObj;
    }

    public void setBindObj(String bindObj) {
        this.bindObj = bindObj;
    }

    public String getBindType() {
        return bindType;
    }

    public void setBindType(String bindType) {
        this.bindType = bindType;
    }

    public String getBindObjmc() {
        return bindObjmc;
    }

    public void setBindObjmc(String bindObjmc) {
        this.bindObjmc = bindObjmc;
    }
}
