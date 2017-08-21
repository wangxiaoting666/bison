package com.threegrand.bison.sjgl.model;


import com.threegrand.bison.common.ajax.DataTablesPage;

import java.util.Date;
import java.util.List;

public class Bracelet extends DataTablesPage {
    private int id;
    private String checkBox;
    private String braceletId;
    private String mac;
    private String status;
    private String bindType;
    private String bindObj;
    private String bindObjmc;
    private String ids;
    private String bdper;
    public Date xgsj;

    private List<Bracelet> braceletlist;

    private String braceletIds;
    private String macs;
    private String statuszt;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBraceletId() {
        return braceletId;
    }

    public void setBraceletId(String braceletId) {
        this.braceletId = braceletId;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBindType() {
        return bindType;
    }

    public void setBindType(String bindType) {
        this.bindType = bindType;
    }

    public String getBindObj() {
        return bindObj;
    }

    public void setBindObj(String bindObj) {
        this.bindObj = bindObj;
    }

    public String getBindObjmc() {
        return bindObjmc;
    }

    public void setBindObjmc(String bindObjmc) {
        this.bindObjmc = bindObjmc;
    }

    public String getCheckBox() {
        return checkBox;
    }

    public void setCheckBox(String checkBox) {
        this.checkBox = checkBox;
    }

    public List<Bracelet> getBraceletlist() {
        return braceletlist;
    }

    public void setBraceletlist(List<Bracelet> braceletlist) {
        this.braceletlist = braceletlist;
    }

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    public Date getXgsj() {
        return xgsj;
    }

    public void setXgsj(Date xgsj) {
        this.xgsj = xgsj;
    }

    public String getBdper() {
        return bdper;
    }

    public void setBdper(String bdper) {
        this.bdper = bdper;
    }

    public String getBraceletIds() {
        return braceletIds;
    }

    public void setBraceletIds(String braceletIds) {
        this.braceletIds = braceletIds;
    }

    public String getMacs() {
        return macs;
    }

    public void setMacs(String macs) {
        this.macs = macs;
    }

    public String getStatuszt() {
        return statuszt;
    }

    public void setStatuszt(String statuszt) {
        this.statuszt = statuszt;
    }
}
