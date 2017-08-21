package com.threegrand.bison.design.model;

public class Node {
	private String id;
	private String pId;
	private String name;
	private String type;
	private String iconSkin;
	private Boolean isParent;

	public Boolean getIsParent() {
		return isParent;
	}

	public void setIsParent(Boolean isParent) {
		this.isParent = isParent;
	}

	public String getIconSkin() {
		if (type.equals("asset")) {
			return "icon04";
		} else if (type.equals("staff")) {
			return "icon02";
		} else if (type.equals("organ") && id.equals("1")) {
			return "icon03";
		} else {
			return "icon01";
		}
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Node [id=" + id + ", pId=" + pId + ", name=" + name + ", type="
				+ type + ", iconSkin=" + iconSkin + "]";
	}

}
