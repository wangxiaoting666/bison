package com.threegrand.bison.AccountMgt.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

/**
 * Created by lzg on 2016/2/18.
 */
public class Account extends DataTablesPage {
    private int id;
    private String empID;
    private String username;
    private String password;
    private String department;
    private String position;
    private String status;
    private Date createTime;
    private String controlObject;
    private List<String> permTokenList;
    private String ids;
    private String bdpers;
    private String userId;
    private int monitId;
    private String companyId;

    public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmpID() {
        return empID;
    }

    public void setEmpID(String empID) {
        this.empID = empID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getControlObject() {
        return controlObject;
    }

    public void setControlObject(String controlObject) {
        this.controlObject = controlObject;
    }

    public List<String> getPermTokenList() {
        return permTokenList;
    }

    public void setPermTokenList(List<String> permTokenList) {
        this.permTokenList = permTokenList;
    }

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    public String getBdpers() {
        return bdpers;
    }

    public void setBdpers(String bdpers) {
        this.bdpers = bdpers;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getMonitId() {
        return monitId;
    }

    public void setMonitId(int monitId) {
        this.monitId = monitId;
    }
}
