package com.threegrand.bison.deviceManage.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threegrand.bison.deviceManage.dao.DeviceUpdateManageDao;
import com.threegrand.bison.deviceManage.model.DeviceUpdateManage;
import com.threegrand.bison.deviceManage.model.json.Json;
import com.threegrand.bison.deviceManage.model.json.OTA;
import com.threegrand.bison.deviceManage.service.DeviceUpdateManageService;
import com.wonderland.sail.util.JsonUtil;

import java.lang.reflect.Type;

@Service
public class DeviceUpdateManageServiceImpl implements DeviceUpdateManageService {

    @Autowired
    private DeviceUpdateManageDao deviceUpdateManageDao;

    @Override
    public List<DeviceUpdateManage> findDeviceListPage(DeviceUpdateManage deviceUpdateManage) {
        return deviceUpdateManageDao.findDeviceListPage(deviceUpdateManage);
    }

    @Override
    public String updateDevice(DeviceUpdateManage deviceUpdateManage) {
        String verJson = "[{\"ver\":\"1.0.0\",\"basever\":\"0.6.0,0.7.0,0.8.0,0.9.0\",\"checksum\":\"11223344556677888\"}]";
        String currentVer = deviceUpdateManage.getMajorVer() + "." + deviceUpdateManage.getMinorVer() + "." + deviceUpdateManage.getRevisonVer();
        OTA versions = (OTA) JsonUtil.jsonToBean(verJson, OTA.class);
        if (Double.parseDouble(deviceUpdateManage.getBattery()) < 3.6 || versions.getBasever().indexOf(currentVer) < 0) {
            return "{'cmd':[{'main':'1'}]}";
        } else {
            return "{'cmd':[{'otafw':'1'},{'checksum':'0123'}]}";
        }
    }

    @Override
    public int insertDevice(DeviceUpdateManage deviceUpdateManage) {
        // TODO Auto-generated method stub
        return deviceUpdateManageDao.insertDevice(deviceUpdateManage);
    }

    @Override
    public int editDevice(DeviceUpdateManage deviceUpdateManage) {
        // TODO Auto-generated method stub
        return deviceUpdateManageDao.editDevice(deviceUpdateManage);
    }

    @Override
    public int updateVersion(DeviceUpdateManage deviceUpdateManage) {
        return deviceUpdateManageDao.updateVersion(deviceUpdateManage);
    }

    @Override
    public List<DeviceUpdateManage> findHardwareVer() {
        return deviceUpdateManageDao.findHardwareVer();
    }

    private Object getJson(String jsonStr) {
        return null;
    }

    public static void main(String[] args) {
        String verJson = "{\"ver\":\"1.0.0\",\"basever\":\"0.6.0,0.7.0,0.8.0,0.9.0\",\"checksum\":\"11223344556677888\"}";

        Object bean = JsonUtil.jsonToBean(verJson, OTA.class);
        System.out.println(bean.toString());
    }

	@Override
	public DeviceUpdateManage getDeviceByUserId(String userId) {
		return deviceUpdateManageDao.getDeviceByUserId(userId);
	}
}
