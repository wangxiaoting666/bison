package com.threegrand.commoninterface;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.threegrand.bison.deviceManage.model.DeviceUpdateManage;
import com.threegrand.bison.deviceManage.model.json.OTA;
import com.threegrand.bison.deviceManage.service.DeviceUpdateManageService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.util.JsonUtil;

@Controller
@RequestMapping("deviceManage")
public class DeviceManageCommonController {
	
	@Autowired
	private DeviceUpdateManageService deviceUpdateManageService;
	
	@RequestMapping(value="/insertAccount")
	@ResponseBody
	public Map<String,Object> insertDevice(@Valid DeviceUpdateManage deviceUpdateManage,BindingResult result){
		Map<String,Object> map = new HashMap<String,Object>();
		if (result.hasErrors()){
			AjaxResponse ajaxresponse= new AjaxResponse(result);
			String message = ajaxresponse.getReturnMsg();
			map.put("message", message);
            return map;
        }
		
		DeviceUpdateManage device = deviceUpdateManageService.getDeviceByUserId(deviceUpdateManage.getUserid());
		String currentVer = deviceUpdateManage.getMajorVer() + "." + deviceUpdateManage.getMinorVer() + "." + deviceUpdateManage.getRevisonVer();
		//OTA versions = (OTA) JsonUtil.jsonToBean(verJson, OTA.class);
		if(device != null && device.getUserid().equals("")){
			deviceUpdateManageService.insertDevice(deviceUpdateManage);
		} 
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("cmd", "1");
		map.put("main", map1);
		return map;
	}
	
	@RequestMapping(value="/updateAccount")
	@ResponseBody
	public Map<String,Object> updateDevice(DeviceUpdateManage deviceUpdateManage){
		//deviceUpdateManageService.updateDevice(deviceUpdateManage);
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,Object> map1 = new HashMap<String,Object>();
		if(Double.parseDouble(deviceUpdateManage.getBattery()) < 3.6 /**|| versions.getBasever().indexOf(currentVer) < 0*/){
			map1.put("otafw", "1");
			map1.put("checksum", "0123");
			map.put("cmd",map1);
		}
		
		return map;
	}
	
	@RequestMapping(value="/reset")
	@ResponseBody
	public Map<String,Object> reset(){
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("reset", "1");
		map.put("cmd",map1);
		
		return map;
	}
	
	
	public static void main(String args[]){
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("main", "1");
		map.put("cmd", map1);
		System.out.println(map);
	}

}
