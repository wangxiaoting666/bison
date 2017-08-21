package com.threegrand.controller.alert;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quicksand.push.SpringWebSocketHandler;
import com.threegrand.bison.alert.model.Alert;
import com.threegrand.bison.alert.service.AlertService;

public class ConsumerMq implements MessageListener {

	private AlertService alertService;

	private static final ObjectMapper MAPPER = new ObjectMapper();


	@Bean
	// 这个注解会从Spring容器拿出Bean
	public SpringWebSocketHandler infoHandler() {
		return new SpringWebSocketHandler();
	}

	public void onMessage(Message msg) {
		System.out.println("接收到的消息为：" + msg);
		// 将得到的消息反序列化
		try {
			// 将接收到的数据保存到数据库
			Alert alert = new Alert();
			JsonNode jsonData = MAPPER.readTree(msg.getBody());
			alert.setDeviceId(jsonData.get("deviceId").asText());
			alert.setDeviceName(jsonData.get("name").asText());
			alert.setDeviceClass(jsonData.get("deviceType").asText());
			alert.setDeviceVersion(jsonData.get("typeNum").asText());
			alert.setAlertClass(jsonData.get("alarmType").asText());
			alert.setAlertLevel(jsonData.get("alarmLevel").asText());
			alert.setAlertBuilder(jsonData.get("placeId").asText());
			alert.setAlertFloor(jsonData.get("floorId").asText());
			alert.setAlertX(jsonData.get("lon").asDouble());
			alert.setAlertY(jsonData.get("lat").asDouble());
			String distence = jsonData.get("distance").asText();
			String ndtence = distence.substring(0, distence.indexOf("."));
			alert.setAlertDescripe("目标偏移初始位置"
					+ndtence+ "米");
			alert.setChecked(0);
			// 将时间戳转换为时间
			long asLong = jsonData.get("timestamp").asLong();
			
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			String dStr = simpleDateFormat.format(asLong);
			Date date = simpleDateFormat.parse(dStr);
			alert.setAlertData(date);
			int count = alertService.addAlert(alert);
			// 将报警推送到前台
			if (count == 1) {
				infoHandler().sendMessageToUsers(
						new TextMessage(alert.getAlertClass()));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public AlertService getAlertService() {
		return alertService;
	}

	public void setAlertService(AlertService alertService) {
		this.alertService = alertService;
	}

}
