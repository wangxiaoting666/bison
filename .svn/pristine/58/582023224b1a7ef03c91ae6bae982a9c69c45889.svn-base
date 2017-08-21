package com.threegrand.controller.monitor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.monitor.model.UserMonitor;
import com.threegrand.bison.monitor.service.UserMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @列表监控--人员
 * Created by Administrator on 2016/2/19.
 */
@Controller
@RequestMapping("/userMonitor")
public class UserMonitorController {
    @Autowired
    private UserMonitorService userMonitorService;


    /**
     * @页面跳转
     * @param model
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping
    public String toPage(Model model, HttpServletRequest request)throws JsonProcessingException {
        return "monitors/userMonitor";
    }

    /**
     * @获取人员列表
     * @param userMonitor
     * @return
     */
    @RequestMapping(value="getUserMonitorListPage" ,method = RequestMethod.GET )
    @ResponseBody
    public DataTablesResponse getUserMonitorListPage(UserMonitor userMonitor){
        return new DataTablesResponse(userMonitor,userMonitorService.getUserMonitorListPage(userMonitor));
    }
}
