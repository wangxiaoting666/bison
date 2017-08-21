package com.threegrand.bison.alert.model;




import java.util.ArrayList;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.threegrand.bison.common.ajax.DataTablesPage;

public class Alert extends DataTablesPage{
	
	private String id;
	private String deviceId;
	private String deviceName;
	private String deviceClass;
	private String deviceVersion;
	@DateTimeFormat(pattern="YYYY-MM-DD")
	private Date alertData;
	private String aDate;
	private String alertClass;
	private String alertLevel;
	private String alertDescripe;
	private Double alertX;
	private Double alertY;
	private String alertFloor;
	private String alertBuilder;
	private Integer checked;
	private String companyId;
	private String organId;
	private String organName;
	//为了sql语句传参添加的字段
	private ArrayList<String> organIdList;
	
	public ArrayList<String> getOrganIdList() {
		return organIdList;
	}
	public void setOrganIdList(ArrayList<String> organIdList) {
		this.organIdList = organIdList;
	}
	public String getOrganName() {
		return organName;
	}
	public void setOrganName(String organName) {
		this.organName = organName;
	}
	public String getOrganId() {
		return organId;
	}
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getDeviceClass() {
		return deviceClass;
	}
	public void setDeviceClass(String deviceClass) {
		this.deviceClass = deviceClass;
	}
	public String getDeviceVersion() {
		return deviceVersion;
	}
	public void setDeviceVersion(String deviceVersion) {
		this.deviceVersion = deviceVersion;
	}
	
	public Date getAlertData() {
		return alertData;
	}
	public void setAlertData(Date alertData) {
		this.alertData = alertData;
	}
	
	public String getaDate() {
		return aDate;
	}
	public void setaDate(String aDate) {
		this.aDate = aDate;
	}
	public String getAlertClass() {
		return alertClass;
	}
	public void setAlertClass(String alertClass) {
		this.alertClass = alertClass;
	}
	public String getAlertDescripe() {
		return alertDescripe;
	}
	public String getAlertLevel() {
		return alertLevel;
	}
	public void setAlertLevel(String alertLevel) {
		this.alertLevel = alertLevel;
	}
	public void setAlertDescripe(String alertDescripe) {
		this.alertDescripe = alertDescripe;
	}
	public Double getAlertX() {
		return alertX;
	}
	public void setAlertX(Double alertX) {
		this.alertX = alertX;
	}
	public Double getAlertY() {
		return alertY;
	}
	public void setAlertY(Double alertY) {
		this.alertY = alertY;
	}
	public String getAlertFloor() {
		return alertFloor;
	}
	public void setAlertFloor(String alertFloor) {
		this.alertFloor = alertFloor;
	}
	public String getAlertBuilder() {
		return alertBuilder;
	}
	public void setAlertBuilder(String alertBuilder) {
		this.alertBuilder = alertBuilder;
	}
	public Integer getChecked() {
		return checked;
	}
	public void setChecked(Integer checked) {
		this.checked = checked;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	@Override
	public String toString() {
		return "Alert [id=" + id + ", deviceId=" + deviceId + ", deviceName="
				+ deviceName + ", deviceClass=" + deviceClass
				+ ", deviceVersion=" + deviceVersion + ", alertData="
				+ alertData + ", aDate=" + aDate + ", alertClass=" + alertClass
				+ ", alertLevel=" + alertLevel + ", alertDescripe="
				+ alertDescripe + ", alertX=" + alertX + ", alertY=" + alertY
				+ ", alertFloor=" + alertFloor + ", alertBuilder="
				+ alertBuilder + ", checked=" + checked + ", companyId="
				+ companyId + ", organId=" + organId + "]";
	}
}
