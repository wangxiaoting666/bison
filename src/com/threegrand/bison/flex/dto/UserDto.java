package com.threegrand.bison.flex.dto;

import de.aixcept.flex2.annotations.ActionScript;

@ActionScript(bindable = true)
public class UserDto {

	private Long usrId;

    private String usrName;
    
    private String deviceId ;

	public Long getUsrId() {
		return usrId;
	}

	public void setUsrId(Long usrId) {
		this.usrId = usrId;
	}

	public String getUsrName() {
		return usrName;
	}

	public void setUsrName(String usrName) {
		this.usrName = usrName;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
    
}
