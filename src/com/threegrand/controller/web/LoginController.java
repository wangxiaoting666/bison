package com.threegrand.controller.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.threegrand.bison.develop.service.MenuService;
import com.threegrand.bison.security.model.User;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.system.service.CompanyService;
import com.threegrand.bison.system.service.SysParamService;

/**
 * @author gaoxinyu
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private MenuService menuService;
    
    @Autowired
    private SysParamService sysParamService;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyService companyService;

    @RequestMapping(method = {RequestMethod.GET})
    public String login(HttpServletRequest request) {
        System.out.println("欢迎登陆！……");
        return "login";
    }

    @RequestMapping(method = {RequestMethod.POST})
    public String loginPost(User user, RedirectAttributes redirectAttributes, HttpServletRequest request) {
        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(user.getLoginName(), user.getPassword(), user.isRememberMe());
        try {
            currentUser.login(token);
        } catch (AuthenticationException e) {
            redirectAttributes.addFlashAttribute("message", "用户名或密码错误！");
            return "redirect:/login";
        }
        if (currentUser.isAuthenticated()) {
            sessionHandle(user, request);
            return "redirect:/alert?menuId=274";
        } else {
            redirectAttributes.addFlashAttribute("message", "用户名或密码错误！");
            return "redirect:/login";
        }
    }

    private void sessionHandle(User user, HttpServletRequest request) {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        HttpSession session = request.getSession();
        User loginUser = userService.getCompanyIdByLoginName(user.getLoginName(),user.getPassword());
        if(loginUser != null){
        	session.setAttribute("username", loginUser.getUsername());
            session.setAttribute("userId", loginUser.getUserId());
            webApplicationContext.getServletContext().setAttribute("userId", loginUser.getUserId());
            session.setAttribute("companyId", loginUser.getCompanyId());
            session.setAttribute("company", companyService.getCompany(loginUser.getCompanyId()));
        }
        menuService.updateMenuInSession(request);
    }
}
