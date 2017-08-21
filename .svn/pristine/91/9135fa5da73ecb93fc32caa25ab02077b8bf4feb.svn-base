package com.threegrand.controller.sjgl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.develop.service.PermissionService;
import com.threegrand.bison.security.service.UserService;
import com.threegrand.bison.sjgl.model.Binding;
import com.threegrand.bison.sjgl.model.Bracelet;
import com.threegrand.bison.sjgl.service.BindingService;
import com.threegrand.bison.sjgl.service.BraceletService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;

/**
 * @手环管理
 */

@Controller
@RequestMapping("/shgl")
public class BraceletController {

    @Autowired
    private BraceletService braceletService;
    @Autowired
    private BindingService bindingService;

    /**
     * @页面跳转
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(method = RequestMethod.GET)
    public String toSh()throws JsonProcessingException{
        return "sjgl/bracelet";
    }

    /**
     * @获取手环列表
     * @param bracelet
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getShListPage")
    @ResponseBody
    public DataTablesResponse getShListPage(Bracelet bracelet, HttpServletRequest request) throws JsonProcessingException {
        return new DataTablesResponse(bracelet,braceletService.getShListPage(bracelet));
    }

    /**
     * @添加手环
     * @param bracelet
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value="/addSh",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addSh(Bracelet bracelet, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = braceletService.addSh(bracelet);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     *
     * @param binding
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getBraceletRz",method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getBraceletRz(Binding binding) throws JsonProcessingException {
        return new AjaxResponse().addAttribute("History", braceletService.getBraceletRz(binding));
    }

    /**
     *
     * @param binding
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getBindingUserListPage")
    @ResponseBody
    public DataTablesResponse getBindingUserListPage(Binding binding, HttpServletRequest request) throws JsonProcessingException {
        return new DataTablesResponse(binding, bindingService.getBindingUserListPage(binding));
    }

    /**
     *
     * @param binding
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getBindingZc",method = RequestMethod.GET)
    @ResponseBody
    public DataTablesResponse getBindingAsset(Binding binding, HttpServletRequest request) throws JsonProcessingException {
        return new DataTablesResponse(binding,bindingService.getBindingAsset(binding));
    }

    /**
     *
     * @param bracelet
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value = "/deleteBindingInfo", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse deleteBindingInfo(Bracelet bracelet, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = bindingService.deleteBindingInfo(bracelet);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);

    }

    /**
     *
     * @param bracelet
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value = "/AddbindingPer", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse AddbindingPer(Bracelet bracelet, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = bindingService.AddbindingPer(bracelet);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);

    }

}
