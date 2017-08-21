package com.threegrand.bison.deviceManage.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

import java.util.List;

public class DeviceUpdateManage extends DataTablesPage {
    private String userid;
    private String majorVer;
    private String minorVer;
    private String revisonVer;
    private String hwVer;
    private String apVer;
    private String chipid;
    private String flashid;
    private String flashsize;
    private String flashmode;
    private String flashspeed;
    private String resetreason;
    private String battery;
    private String applicationServerIp;
    private String positionServerIp;
    private List<QueryDevciceDTO> queryFirmwareList;
    private List<String> hwVerList;
    private List<String> apVerList;


    public String getBattery() {
        return battery;
    }

    public void setBattery(String battery) {
        this.battery = battery;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getMajorVer() {
        return majorVer;
    }

    public void setMajorVer(String majorVer) {
        this.majorVer = majorVer;
    }

    public String getMinorVer() {
        return minorVer;
    }

    public void setMinorVer(String minorVer) {
        this.minorVer = minorVer;
    }

    public String getRevisonVer() {
        return revisonVer;
    }

    public void setRevisonVer(String revisonVer) {
        this.revisonVer = revisonVer;
    }

    public String getHwVer() {
        return hwVer;
    }

    public void setHwVer(String hwVer) {
        this.hwVer = hwVer;
    }

    public String getApVer() {
        return apVer;
    }

    public void setApVer(String apVer) {
        this.apVer = apVer;
    }

    public String getChipid() {
        return chipid;
    }

    public void setChipid(String chipid) {
        this.chipid = chipid;
    }

    public String getFlashid() {
        return flashid;
    }

    public void setFlashid(String flashid) {
        this.flashid = flashid;
    }

    public String getFlashsize() {
        return flashsize;
    }

    public void setFlashsize(String flashsize) {
        this.flashsize = flashsize;
    }

    public String getFlashmode() {
        return flashmode;
    }

    public void setFlashmode(String flashmode) {
        this.flashmode = flashmode;
    }

    public String getFlashspeed() {
        return flashspeed;
    }

    public void setFlashspeed(String flashspeed) {
        this.flashspeed = flashspeed;
    }

    public String getResetreason() {
        return resetreason;
    }

    public void setResetreason(String resetreason) {
        this.resetreason = resetreason;
    }

    public String getApplicationServerIp() {
        return applicationServerIp;
    }

    public void setApplicationServerIp(String applicationServerIp) {
        this.applicationServerIp = applicationServerIp;
    }

    public String getPositionServerIp() {
        return positionServerIp;
    }

    public void setPositionServerIp(String positionServerIp) {
        this.positionServerIp = positionServerIp;
    }


    public List<QueryDevciceDTO> getQueryFirmwareList() {
        return queryFirmwareList;
    }

    public void setQueryFirmwareList(List<QueryDevciceDTO> queryFirmwareList) {
        this.queryFirmwareList = queryFirmwareList;
    }


    public List<String> getHwVerList() {
        return hwVerList;
    }

    public void setHwVerList(List<String> hwVerList) {
        this.hwVerList = hwVerList;
    }

    public List<String> getApVerList() {
        return apVerList;
    }

    public void setApVerList(List<String> apVerList) {
        this.apVerList = apVerList;
    }
}
