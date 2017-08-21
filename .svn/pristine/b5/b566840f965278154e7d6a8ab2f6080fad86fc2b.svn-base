package com.threegrand.controller.keyWord;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.develop.service.MenuService;
import com.threegrand.bison.keyWord.model.KeyWordLink;
import com.threegrand.bison.keyWord.model.KeyWordShield;
import com.threegrand.bison.keyWord.service.KeyWordLinkService;
import com.threegrand.bison.keyWord.service.KeyWordShieldService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * author : 赵鹏
 * date ： 2014-11-26
 */
@Controller
@RequestMapping("/keyWord/keyWordLink")
public class keyWordLinkController {

    @Autowired
    private KeyWordLinkService keyWordLinkService;
    @Autowired
    private MenuService menuService;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("system:keyWordLink:open")
    public String keyWordLink(KeyWordLink keyWordLink) throws JsonProcessingException {
        return "keyWord/keyWordLink";
    }

    @RequestMapping("/getKeyWordLinkListPage")
    @ResponseBody
    public DataTablesResponse getKeyWordShieldListPage(KeyWordLink keyWordLink, HttpServletRequest request) throws IOException {
        String companyId = getCompanyId(request);
        keyWordLink.setCompanyId(companyId);
        return new DataTablesResponse(keyWordLink, keyWordLinkService.getKeyWordLinkListPage(keyWordLink));
    }

    private String getCompanyId(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return (String) session.getAttribute("companyId");
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addKeyWordLink(@RequestBody KeyWordLink keyWordLink, BindingResult result, HttpServletRequest request) throws IOException {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        String companyId = getCompanyId(request);
        keyWordLink.setCompanyId(companyId);
        int affectedLineNum = keyWordLinkService.addKeyWordLink(keyWordLink);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }


    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateModule(KeyWordLink keyWordLink, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        keyWordLink.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectedLineNum = keyWordLinkService.updateKeyWordLink(keyWordLink);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{keyWordLinkId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteKeyWordLink(@PathVariable String keyWordLinkId) {
        int affectedLineNum = keyWordLinkService.deleteKeyWordLink(keyWordLinkId);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }
}
