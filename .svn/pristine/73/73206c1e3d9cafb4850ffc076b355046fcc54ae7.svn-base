package com.threegrand.controller.devicemanage;

import java.io.IOException;

import com.threegrand.bison.deviceManage.service.FirmwareManageService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.deviceManage.model.FirmwareManage;

@Controller
@RequestMapping("/firmwareManage")
public class FirmwareManageController {

    @Autowired
    private FirmwareManageService firmwareManageService;


    @RequestMapping
    public String toFirmware() {
        System.out.println("进入固件管理界面。");
        return "devicemanage/firmwareManage";
    }


    @RequestMapping(value = "insert", method = RequestMethod.POST)
    @ResponseBody
    public String firmInsert(FirmwareManage firmwareManage) {
        try {
            int affectLine = firmwareManageService.insert(firmwareManage);
            //return AjaxResponse.getInstanceByResult( affectLine == Constant.AFFECTED_LINE_1);
            return "{}";
        } catch (IOException e) {
            //return AjaxResponse.getInstanceByResult(false);
            return "";
        }
    }


    @RequestMapping(value = "edit", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse firmEdit(FirmwareManage firmwareManage) {
        return AjaxResponse.getInstanceByResult(firmwareManageService.edit(firmwareManage) == 1);
    }


    @RequestMapping("getFirmwareListPage")
    @ResponseBody
    public DataTablesResponse getFirmwareListPage(FirmwareManage firmwareManage) {
        return new DataTablesResponse(firmwareManage, firmwareManageService.findFirmwareListPage(firmwareManage));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse delFirmWare(@PathVariable String id) {
        int affectLine = firmwareManageService.delete(Integer.parseInt(id));
        return AjaxResponse.getInstanceByResult(affectLine == Constant.AFFECTED_LINE_1);
    }

}
