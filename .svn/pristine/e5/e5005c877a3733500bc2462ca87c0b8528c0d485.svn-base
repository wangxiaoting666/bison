package com.quicksand.push;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.TextMessage;

@Controller
@RequestMapping(value="/test")
public class ControllerTest {
	
	@Bean//这个注解会从Spring容器拿出Bean
    public SpringWebSocketHandler infoHandler() {
        return new SpringWebSocketHandler();
    }
	
	@RequestMapping(value="test")
	 public void test(){
		infoHandler().sendMessageToUsers(new TextMessage("hahhaa"));
		System.out.println("hahah");
	 }

}
