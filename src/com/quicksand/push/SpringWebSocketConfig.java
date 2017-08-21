package com.quicksand.push;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;


/**
 * websocket入口
 * @author lenovo
 *
 */
@Configuration
@EnableWebMvc
@EnableWebSocket
public class SpringWebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer{
	 
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		//注册websocket通道
		 registry.addHandler(webSocketHandler(),"/websocket/socketServer").addInterceptors(new SpringWebSocketHandlerInterceptor());
	        registry.addHandler(webSocketHandler(), "/sockjs/socketServer").addInterceptors(new SpringWebSocketHandlerInterceptor()).withSockJS();
		
	}
	    @Bean
	    public TextWebSocketHandler webSocketHandler(){
	        return new SpringWebSocketHandler();
	    }

	
}
