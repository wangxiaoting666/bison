package com.threegrand.controller.devicemanage;

import com.threegrand.bison.deviceManage.model.QueryDevciceDTO;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.deviceManage.model.DeviceUpdateManage;
import com.threegrand.bison.deviceManage.service.DeviceUpdateManageService;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/deviceManage")
public class DeviceUpdateManageController {

    @Autowired
    private DeviceUpdateManageService deviceUpdateManageService;

    @RequestMapping
    public String toDeviceManage() {
        System.out.println("进入设备管理界面");
        return "devicemanage/deviceUpdate";
    }

    @RequestMapping(value = "/getDeviceListPage", method = RequestMethod.POST)
    @ResponseBody
    public DataTablesResponse getDevicesListPage(DeviceUpdateManage deviceUpdateManage) {
        List<QueryDevciceDTO> queryDevciceDTOList = null;
        List<String> apVerList = null;
        List<String> hwVerList = null;
        if (deviceUpdateManage.getMajorVer() != null && deviceUpdateManage.getMajorVer().length() > 0) {
            String majorVer[] = deviceUpdateManage.getMajorVer().split(",");
            String minorVer[] = deviceUpdateManage.getMinorVer().split(",");
            String revisonVer[] = deviceUpdateManage.getRevisonVer().split(",");
            queryDevciceDTOList = new ArrayList<>();
            for (int i = 0; i < majorVer.length; i++) {
                QueryDevciceDTO dto = new QueryDevciceDTO();
                dto.setMajorVer(majorVer[i]);
                dto.setMinorVer(minorVer[i]);
                dto.setRevisonVer(revisonVer[i]);
                queryDevciceDTOList.add(dto);
            }
        }
        if (deviceUpdateManage.getApVer() != null && deviceUpdateManage.getApVer().length() > 0) {
            String apVer[] = deviceUpdateManage.getApVer().split(",");
            apVerList = new ArrayList<>();
            for (String ap : apVer) {
                apVerList.add(ap);
            }
        }
        if (deviceUpdateManage.getHwVer() != null && deviceUpdateManage.getHwVer().length() > 0) {
            String hwVer[] = deviceUpdateManage.getHwVer().split(",");
            hwVerList = new ArrayList<>();
            for (String hw : hwVer) {
                hwVerList.add(hw);
            }
        }
        deviceUpdateManage.setQueryFirmwareList(queryDevciceDTOList);
        deviceUpdateManage.setApVerList(apVerList);
        deviceUpdateManage.setHwVerList(hwVerList);
        return new DataTablesResponse(deviceUpdateManage, deviceUpdateManageService.findDeviceListPage(deviceUpdateManage));
    }

    @RequestMapping(value = "/getHardwareList", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getHardwareList() {
        AjaxResponse ajaxResponse = new AjaxResponse();
        ajaxResponse.addAttribute("hardware", deviceUpdateManageService.findHardwareVer());
        return ajaxResponse;
    }

    @RequestMapping(value = "/updateVersion", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateVersion(DeviceUpdateManage deviceUpdateManage) {
        int affectLine = deviceUpdateManageService.updateVersion(deviceUpdateManage);
        return AjaxResponse.getInstanceByResult(affectLine == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse editDevice(DeviceUpdateManage deviceUpdateManage) {
        return AjaxResponse.getInstanceByResult(deviceUpdateManageService.editDevice(deviceUpdateManage) == 1);
    }

//    @RequestMapping(value = "/delete/{userid}", method = RequestMethod.DELETE)
//    @ResponseBody
//    public AjaxResponse deleteDevice(DeviceUpdateManage deviceUpdateManage) {
//        return AjaxResponse.getInstanceByResult(deviceUpdateManageService.editDevice(deviceUpdateManage) == 1);
//    }

}