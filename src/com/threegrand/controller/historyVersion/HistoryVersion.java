package com.threegrand.controller.historyVersion;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/history")
public class HistoryVersion {

    @RequestMapping
    public String toHistoryPage(){
        return "/historyVersion/history";
    }
}
