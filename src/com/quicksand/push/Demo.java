package com.quicksand.push;

import org.junit.Test;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.TextMessage;

@Controller
public class Demo {
	
	
	@Bean//这个注解会从Spring容器拿出Bean
    public SpringWebSocketHandler infoHandler() {
        return new SpringWebSocketHandler();
    }
	
	
	public  void test() {
		infoHandler().sendMessageToUsers(new TextMessage("hahhaa"));
	}

}
