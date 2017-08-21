package com.threegrand.bison.develop.model;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

public class Menu implements Serializable{

	private static final long serialVersionUID = -122043110887240887L;

	@Override
	public String toString() {
		return "Menu [menuId=" + menuId + ", menuName=" + menuName + ", icon="
				+ icon + ", url=" + url + ", permToken=" + permToken
				+ ", parentId=" + parentId + ", level=" + level + ", leaf="
				+ leaf + ", sequence=" + sequence + ", memo=" + memo
				+ ", enable=" + enable + "]";
	}

	private String menuId;
    @NotBlank(message = "菜单名不能为空！")
    private String menuName;
    private String icon;
    private String url;
    private String permToken;
    private String parentId;
    private String level;
    private boolean leaf;
    private double sequence;
    private String memo;
    private boolean enable;

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPermToken() {
        return permToken;
    }

    public void setPermToken(String permToken) {
        this.permToken = permToken;
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

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public double getSequence() {
        return sequence;
    }

    public void setSequence(double sequence) {
        this.sequence = sequence;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }
}
