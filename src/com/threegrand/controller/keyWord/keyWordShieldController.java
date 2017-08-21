package com.threegrand.controller.keyWord;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.develop.service.MenuService;
import com.threegrand.bison.keyWord.model.KeyWordShield;
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
 * Created by Administrator on 2014/11/3.
 * User: 宗晓宇
 * Date: 2014/11/3
 * Time: 16:47
 */
@Controller
@RequestMapping("/keyWord/keyWordShield")
public class keyWordShieldController {
    @Autowired
    private KeyWordShieldService keyWordShieldService;
    @Autowired
    private MenuService menuService;

    @RequestMapping(method = RequestMethod.GET)
    @RequiresPermissions("system:keyWordShield:open")
    public String keyWordShield(KeyWordShield keyWordShield) throws JsonProcessingException {
        return "keyWord/keyWordShield";
    }

    @RequestMapping("/getKeyWordShieldListPage")
    @ResponseBody
    public DataTablesResponse getKeyWordShieldListPage(KeyWordShield keyWordShield, HttpServletRequest request) throws IOException {
        String companyId = getCompanyId(request);
        keyWordShield.setCompanyId(companyId);
        return new DataTablesResponse(keyWordShield, keyWordShieldService.getKeyWordShieldListPage(keyWordShield));
    }

    private String getCompanyId(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return (String) session.getAttribute("companyId");
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addKeyWordShield(@RequestBody KeyWordShield keyWordShield, BindingResult result, HttpServletRequest request) throws IOException {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        String companyId = getCompanyId(request);
        keyWordShield.setCompanyId(companyId);
        int affectedLineNum = keyWordShieldService.addKeyWordShield(keyWordShield);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }


    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateModule(KeyWordShield keyWordShield, BindingResult result, HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        keyWordShield.setCompanyId(request.getSession().getAttribute("companyId").toString());
        int affectedLineNum = keyWordShieldService.updateKeyWordShield(keyWordShield);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{keyWordShieldId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteKeyWordShield(@PathVariable String keyWordShieldId) {
        int affectedLineNum = keyWordShieldService.deleteKeyWordShield(keyWordShieldId);
        menuService.initMenuInContext();
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }
}
