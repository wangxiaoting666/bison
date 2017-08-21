package com.threegrand.controller.monitor;

import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.monitor.model.AssetMonitor;
import com.threegrand.bison.monitor.service.AssetMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @列表监控--资产
 * Created by Administrator on 2016/2/20.
 */
@Controller
@RequestMapping("/assetMonitor")
public class AssetMonitorController {

    @Autowired
    private AssetMonitorService assetMonitorService;

    /**
     * @页面跳转
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String toPage(){
        return "monitors/assetMonitor";
    }

    /**
     * @获取资产列表
     * @param assetMonitor
     * @param request
     * @return
     */
    @RequestMapping("/getAssetMonitorListPage")
    @ResponseBody
    public DataTablesResponse getAssetMonitorListPage(AssetMonitor assetMonitor, HttpServletRequest request) {
        return new DataTablesResponse(assetMonitor, assetMonitorService.getAssetMonitorListPage(assetMonitor));
    }
}
