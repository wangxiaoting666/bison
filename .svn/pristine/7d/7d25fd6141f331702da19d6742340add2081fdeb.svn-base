package com.threegrand.controller.log;

import com.threegrand.bison.log.model.Log;
import com.threegrand.bison.log.service.impl.OptionLogServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by lzg on 2016-01-14.
 */
@Controller
@RequestMapping("/sys/getLogListPage")
public class LogController {

    @Autowired
    private OptionLogServiceImpl optionLog;

    @RequestMapping(method = RequestMethod.GET)
    public String getLogListPage(Model model,Log log){
        List<Log> list = optionLog.getLogListPage(log);
        model.addAttribute("log",list);
        return "log/log";
    }
}
