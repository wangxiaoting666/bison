package com.threegrand.bison.system.model;

import java.util.Objects;

public class OrganOrStaffTree {

	private String id;
	private String name;
	private String pId;
	private String iconSkin;
	private String sex;
	private String type;

	public String getIconSkin() {
		if (id.equals("1")) {
			return "icon03";
		}
		if(type.equals("organ")){
			return "icon01";
		}
		return sex.equals("男") ? "icon02" : "icon04";
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	// 重写equals和hashcode方法
	@Override
	public boolean equals(Object obj) {
		if (obj == this)
			return true;
		OrganOrStaffTree other = (OrganOrStaffTree) obj;
		return Objects.equals(id, other.id);
	}
}
