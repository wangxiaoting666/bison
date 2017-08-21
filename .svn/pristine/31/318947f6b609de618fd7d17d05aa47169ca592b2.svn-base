package com.threegrand.controller.identifycode;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.code.kaptcha.Producer;

@Controller
@RequestMapping("/captcha")
public class CaptchaController {

	private Producer captchaProducer = null;

	@Autowired
	public void setCaptchaProducer(Producer captchaProducer) {
		this.captchaProducer = captchaProducer;
	}

	@RequestMapping(value = "idenCode", method = RequestMethod.GET)
	public ModelAndView kaptcha(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/*
		 * response.setDateHeader("Expires", 0);
		 * 
		 * response.setHeader("Cache-Control",
		 * "no-store, no-cache, must-revalidate");
		 * response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		 * response.setHeader("Pragma", "no-cache");
		 * response.setContentType("image/jpeg"); String capText =
		 * captchaProducer.createText();
		 * request.getSession().setAttribute(Constants.KAPTCHA_SESSION_KEY,
		 * capText); BufferedImage bi = captchaProducer.createImage(capText);
		 * ServletOutputStream out = response.getOutputStream();
		 * ImageIO.write(bi, "jpg", out); try { out.flush(); } finally {
		 * out.close(); } return null;
		 */
		// 设置响应的类型格式为图片格式
		response.setContentType("image/jpeg");
		// 禁止图像缓存。
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		CreateCode vCode = new CreateCode(100, 30, 4, 10);
		HttpSession session = request.getSession();
		session.setAttribute("myCode", vCode.getCode());
		ServletOutputStream out = response.getOutputStream();
		vCode.write(out);
		try {
			out.flush();
		} finally {
			out.close();
		}
		return null;

	}

	@RequestMapping(value = "checkCode", method = RequestMethod.POST)
	@ResponseBody
	public boolean checkCode(HttpServletRequest request) {
		String oldStr = (String) request.getSession().getAttribute(
				"myCode");
		String newStr = request.getParameter("code");
		if (oldStr.equalsIgnoreCase(newStr)) {
			return true;
		}
		return false;
	}
}