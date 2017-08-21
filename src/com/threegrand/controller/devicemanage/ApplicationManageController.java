package com.threegrand.controller.devicemanage;

import java.io.IOException;

import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.deviceManage.model.ApplicationManage;
import com.threegrand.bison.deviceManage.service.ApplicationManageService;

@Controller
@RequestMapping("/applicationManage")
public class ApplicationManageController {

    @Autowired
    private ApplicationManageService applicationManageService;


    @RequestMapping
    public String toApplication() {
        System.out.println("进入应用管理界面。");
        return "devicemanage/applicationManage";
    }


    @RequestMapping(value = "insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(ApplicationManage applicationManage) {
        try {
            int affectLine = applicationManageService.insert(applicationManage);
            return "{}";
        } catch (IOException e) {
            //return AjaxResponse.getInstanceByResult(false);
            return "";
        }
    }


    @RequestMapping(value = "edit", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse edit(ApplicationManage applicationManage) {
        return AjaxResponse.getInstanceByResult(applicationManageService.edit(applicationManage) == 1);
    }


    @RequestMapping("getApplicationListPage")
    @ResponseBody
    public DataTablesResponse getApplicationListPage(ApplicationManage applicationManage) {
        return new DataTablesResponse(applicationManage, applicationManageService.findApplicationListPage(applicationManage));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse delete(@PathVariable String id) {
        int affectLine = applicationManageService.delete(Integer.parseInt(id));
        return AjaxResponse.getInstanceByResult(affectLine == Constant.AFFECTED_LINE_1);
    }

}
