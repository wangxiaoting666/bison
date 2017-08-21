package com.mote.ws.service.impl;

import javax.jws.WebService;

import org.comet4j.core.CometContext;
import org.comet4j.core.CometEngine;

import com.mote.ws.service.CometUtil;
import com.mote.ws.service.LocationWS;
import com.wonderland.sail.listener.Model;

import java.util.HashMap;
import java.util.Map;

@WebService
public class LocationWSImpl implements LocationWS {

	//Map<String,Model> locations = new HashMap<String,Model>();

	@Override
	public int sendLocation(String deviceID, double x, double y, int h,
			long dateTime) {
    	Model model = new Model();
    	model.setDeviceID(deviceID);
    	model.setX(x);
    	model.setY(y);
    	model.setH(h);
		//locations.put(deviceID,model);
    	CometUtil.send("result1", model);
		System.out.println("Location: deviceID is " + deviceID + ", X: " + x + " , Y: " + y + ", H: " + h);
		return 1;
	}

	@Override
	public int sendSOS(String deviceID, double x, double y, int h, long dateTime) {
		Model model = new Model();
    	model.setDeviceID(deviceID);
    	model.setX(x);
    	model.setY(y);
    	model.setH(h);
    	model.setMessage("设备"+deviceID+"发出求救！！");
        CometUtil.send("result2", model);
		System.out.println("SOS: deviceID is " + deviceID + ", X: " + x + " , Y: " + y + ", H: " + h);
		return 1;
	}

}
