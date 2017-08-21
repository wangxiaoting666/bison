package com.threegrand.controller.personInfo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.personInfo.model.Area;
import com.threegrand.bison.personInfo.model.ConsumerRole;
import com.threegrand.bison.personInfo.model.Tag;
import com.threegrand.bison.personInfo.model.UserInfo;
import com.threegrand.bison.personInfo.service.ConsumerService;
import com.threegrand.bison.personInfo.service.TagsService;
import com.threegrand.bison.personInfo.service.UserInfoService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @数据管理--人员信息
 * Created by Administrator on 2015/12/27.
 */
@Controller
@RequestMapping("/personInfo/userInfo")
public class    UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

   @Autowired
   private ConsumerService consumerService;

    /**
     * @页面跳转
     * @return
     */
    @RequestMapping
    public String toUserInfo(){
        return "personInfo/userInfo";
    }

    /**
     * @获取人员列表数据
     * @param model
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(method = RequestMethod.GET)
    public String userInfo(Model model) throws JsonProcessingException {
        List<ConsumerRole> roleList=consumerService.getUserRoles();
        model.addAttribute("roleList", roleList);
        List<Tag> tagList=userInfoService.getTags();
        model.addAttribute("tagList",tagList );
        List<String> buildList=userInfoService.getBuilds();
        model.addAttribute("buildList",buildList);
       /* List<String> stepList=userInfoService.getStepsByBuild();
        model.addAttribute("stepList",stepList);*/
        return "personInfo/userInfo";
    }

    /**
     * @获取获取用户
     * @param build
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/getStepByBuild", method = RequestMethod.GET)
    @ResponseBody
    public Object getUser( @RequestParam("build")String build) throws JsonProcessingException {
        return userInfoService.getStepsByBuild(build);
    }

    /**
     * @通过楼层获取区域
     * @param area
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/getAreaByStep", method = RequestMethod.GET)
    @ResponseBody
    public Object getArea(Area area) throws JsonProcessingException {
        return userInfoService.getAreaByStep(area);
    }

    /**
     * @添加人员
     * @param userInfo
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value ="/addUserInfo" ,method=RequestMethod.POST)
    @ResponseBody
    public AjaxResponse createUserInfo( UserInfo userInfo, BindingResult result, HttpServletRequest request){
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectedLineNum= userInfoService.addUserInfo(userInfo);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     * @添加区域
     * @param area
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value ="/addArea" ,method=RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addArea( Area area, BindingResult result, HttpServletRequest request){
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        int affectedLineNum= userInfoService.addAlertArea(area);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     * @主页人员列表
     * @param userInfo
     * @param request
     * @return
     */
    @RequestMapping(value = "/getUserInfoListPage",method = RequestMethod.GET)
    @ResponseBody
    public DataTablesResponse getUserInfoListPage(UserInfo userInfo, HttpServletRequest request) {
        return new DataTablesResponse(userInfo, userInfoService.getUserInfoListPage(userInfo));
    }

    /**
     * @获取区域列表
     * @param area
     * @param request
     * @return
     */
    @RequestMapping(value = "/getAreaListPage",method = RequestMethod.GET)
    @ResponseBody
    public DataTablesResponse getAreaListPage(Area area, HttpServletRequest request) {
        return new DataTablesResponse(area, userInfoService.getAreasListPage(area));
    }

    /**
     * @获取用户区域列表
     * @param area
     * @return
     */
    @RequestMapping("getUserAreaListPage")
    @ResponseBody
    public DataTablesResponse getUserAreaListPage(Area area) {
        return new DataTablesResponse(area, userInfoService.getUserAreasListPage(area));
    }

    /**
     * @设置权限
     * @param userInfo
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value="/setRole",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse setRole(UserInfo userInfo,BindingResult result,HttpServletRequest request){
        if(result.hasErrors()){
            return new AjaxResponse(result);
        }
        int affectedLineNum =userInfoService.setUserInfoRole(userInfo);
        return AjaxResponse.getInstanceByResult(affectedLineNum== Constant.AFFECTED_LINE_1);
    }

    /**
     * @设置标签
     * @param userInfo
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value = "/setTag",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse setTag(UserInfo userInfo,BindingResult result,HttpServletRequest request){
        if(result.hasErrors()){
            return new AjaxResponse(result);
        }
        int affectLineNum=userInfoService.setUserInfoTag(userInfo);
        return AjaxResponse.getInstanceByResult(affectLineNum==Constant.AFFECTED_LINE_1);
    }


    /**
     * @获取人员信息
     * @param userId
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getUserInfoById",method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getUserInfoById(String userId) throws JsonProcessingException {
        return new AjaxResponse().addAttribute("History",userInfoService.getUserInfoById(userId));
    }
}
