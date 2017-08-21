package com.threegrand.bison.security.model;

public class PermissionTreeNode {

    private String id;
    private String name;
    private String pId;
    private String permToken;
    private String checked;
    private String level;
    private String iconSkin;

    

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getIconSkin() {
		if(this.level.equals("3")){
			return "icon02";
		}
			return "icon01";
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

    public String getPermToken() {
        return permToken;
    }

    public void setPermToken(String permToken) {
        this.permToken = permToken;
    }

    public String getChecked() {
        return checked;
    }

    public void setChecked(String checked) {
        this.checked = checked;
    }
}
