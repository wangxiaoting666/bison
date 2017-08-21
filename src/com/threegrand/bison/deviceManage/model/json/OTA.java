package com.threegrand.bison.deviceManage.model.json;

public class OTA {
	private String ver;
	private String basever;
	private String checksum;
	
	public String getVer() {
		return ver;
	}
	public void setVer(String ver) {
		this.ver = ver;
	}
	public String getBasever() {
		return basever;
	}
	public void setBasever(String basever) {
		this.basever = basever;
	}
	public String getChecksum() {
		return checksum;
	}
	public void setChecksum(String checksum) {
		this.checksum = checksum;
	}
	
	@Override
	public String toString() {
		return "OTA [ver=" + ver + ", basever=" + basever + ", checksum="
				+ checksum + "]";
	}
	

	
}
