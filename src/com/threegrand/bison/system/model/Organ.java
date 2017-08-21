package com.threegrand.bison.system.model;

import java.util.List;
import java.util.Objects;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.threegrand.bison.security.model.User;

/**
 * Created by threegrand4 on 2014/12/1.
 */
public class Organ{

    private String organId;
    private String companyId;
    @NotBlank(message = "部门名称不能为空!")
    private String organName;
    @NotBlank(message = "上级部门不能为空!")
    private String parentId;
    private String level;
    private boolean leaf;
    private String manager;
    private boolean enable;
    private String phone;
    private String address;
    public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	List<User> userList;

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }


    public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public String getOrganId() {
        return organId;
    }

    public void setOrganId(String organId) {
        this.organId = organId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getOrganName() {
        return organName;
    }

    public void setOrganName(String organName) {
        this.organName = organName;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

	@Override
	public String toString() {
		return "Organ [organId=" + organId + ", companyId=" + companyId
				+ ", organName=" + organName + ", parentId=" + parentId
				+ ", level=" + level + ", leaf=" + leaf + ", manager="
				+ manager + ", enable=" + enable + ", phone=" + phone
				+ ", address=" + address + ", userList=" + userList + "]";
	}

	//重写equals和hashcode方法
	@Override
	public boolean equals(Object obj) {
		 if (obj == this) 
			 return true;  
	         Organ other = (Organ) obj;  
	        return 
	                Objects.equals(organId, other.organId);  
	}
	
}
