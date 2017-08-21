package com.threegrand.bison.assets.model;

import java.util.ArrayList;

import org.hibernate.validator.constraints.NotBlank;

import com.threegrand.bison.common.ajax.DataTablesPage;


public class Asset extends DataTablesPage {
	private String id;
	@NotBlank(message="资产id不可为空")
    private String assetId;
    private String assetName;
	private String classId;
    private String className;
    private String abbreviation;
    private String version;
    private String organId;
    private String organName;
    private String grade;
    private Double x;
    private Double y;
    private String initFloor;
    private String initBuilding;
    private String factoryName;
    private String buyPrice;
    private String buyDate;
    private String agency;
    private String agencyPhone;
    private String person;
    private String user;
    private String userPhone;
    private String remark;
    private String companyId;
    private String fenceNum;
    //为了sql语句而添加的字段
    private ArrayList<String> organIdList;
    
	public ArrayList<String> getOrganIdList() {
		return organIdList;
	}
	public void setOrganIdList(ArrayList<String> organIdList) {
		this.organIdList = organIdList;
	}
	public String getClassId() {
		return classId;
	}
	public void setClassId(String classId) {
		this.classId = classId;
	}
	
	public String getFenceNum() {
		return fenceNum;
	}
	public void setFenceNum(String fenceNum) {
		this.fenceNum = fenceNum;
	}
	

	public String getOrganId() {
		return organId;
	}
	public void setOrganId(String organId) {
		this.organId = organId;
	}
	public String getOrganName() {
		return organName;
	}
	public void setOrganName(String organName) {
		this.organName = organName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getAssetId() {
		return assetId;
	}
	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}
	public String getAssetName() {
		return assetName;
	}
	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getAbbreviation() {
		return abbreviation;
	}
	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}

	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}

	public Double getX() {
		return x;
	}
	public void setX(Double x) {
		this.x = x;
	}
	public Double getY() {
		return y;
	}
	public void setY(Double y) {
		this.y = y;
	}

	public String getInitFloor() {
		return initFloor;
	}
	public void setInitFloor(String initFloor) {
		this.initFloor = initFloor;
	}
	public String getInitBuilding() {
		return initBuilding;
	}
	public void setInitBuilding(String initBuilding) {
		this.initBuilding = initBuilding;
	}
	public String getFactoryName() {
		return factoryName;
	}
	public void setFactoryName(String factoryName) {
		this.factoryName = factoryName;
	}
	public String getBuyPrice() {
		return buyPrice;
	}
	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}
	public String getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(String buyDate) {
		this.buyDate = buyDate;
	}
	public String getAgency() {
		return agency;
	}
	public void setAgency(String agency) {
		this.agency = agency;
	}
	public String getAgencyPhone() {
		return agencyPhone;
	}
	public void setAgencyPhone(String agencyPhone) {
		this.agencyPhone = agencyPhone;
	}
	public String getPerson() {
		return person;
	}
	public void setPerson(String person) {
		this.person = person;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@Override
	public String toString() {
		return "Asset [id=" + id + ", assetId=" + assetId + ", assetName="
				+ assetName + ", className=" + className + ", organId="
				+ organId + ", x=" + x + ", y=" + y + ", initFloor="
				+ initFloor + ", initBuilding=" + initBuilding + ", companyId="
				+ companyId + ", fenceNum=" + fenceNum + "]";
	}
  
}
