package com.threegrand.controller.identifycode;

import javax.servlet.http.HttpServletRequest;

import com.google.code.kaptcha.Constants;

public class CaptchaUtils {
	public static boolean verify(HttpServletRequest request) {
        //从session中取出servlet生成的验证码text值
        String expected = (String) request.getSession().getAttribute("myCode");
        //获取用户页面输入的验证码
        String received = request.getParameter("kaptcha");
        return received != null && received.equalsIgnoreCase(expected);
    }
}
