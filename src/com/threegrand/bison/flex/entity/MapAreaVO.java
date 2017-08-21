package com.threegrand.bison.flex.entity;

import java.util.Date;

import de.aixcept.flex2.annotations.ActionScript;

@ActionScript(bindable = true)
public class MapAreaVO {
	private Long areaId;
	private Long picId;
	private String areaName;
	private Date createTime;

	public Long getAreaId() {
		return areaId;
	}

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}

	public Long getPicId() {
		return picId;
	}

	public void setPicId(Long picId) {
		this.picId = picId;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
