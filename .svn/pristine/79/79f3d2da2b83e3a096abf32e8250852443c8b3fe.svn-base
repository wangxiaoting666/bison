package com.mote.ws.service;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import java.util.Map;

@WebService
public interface LocationWS {
	/**
	 * 传送位置信息
	 * @param userID 设备唯一标识
	 * @param x X点坐标或者经度
	 * @param y Y点坐标或者纬度
	 * @param h 楼层高度
	 * @param dataTime 时间戳
	 * @return 返回成功为1 失败小于1的值
	 */
	@WebMethod
	public int sendLocation(@WebParam(name = "id")String deviceID, 
			@WebParam(name = "x")double x, @WebParam(name = "y")double y, 
			@WebParam(name = "h")int h, @WebParam(name = "datetime")long dateTime);
	
	/**
	 * 传送SOS紧急信号
	 * @param userID 设备唯一标识
	 * @param x X点坐标或者经度
	 * @param y Y点坐标或者纬度
	 * @param h 楼层高度
	 * @param dataTime 时间戳
	 * @return 返回成功为1 失败小于1的值
	 */
	@WebMethod
	public int sendSOS(@WebParam(name = "id")String deviceID, 
			@WebParam(name = "x")double x, @WebParam(name = "y")double y, 
			@WebParam(name = "h")int h, @WebParam(name = "datetime")long dateTime);
}
