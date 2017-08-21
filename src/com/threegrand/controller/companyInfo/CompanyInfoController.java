package com.threegrand.controller.companyInfo;

import com.threegrand.bison.companyInfo.model.CompanyInfo;
import com.threegrand.bison.companyInfo.service.CompanyInfoService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by lzg on 2016-01-14.
 */
@Controller
@RequestMapping("company")
public class CompanyInfoController {

    @Autowired
    private CompanyInfoService companyInfoService;

    @RequestMapping(method = RequestMethod.GET)
    public String toCompanyInfo(Model model){
        model.addAttribute("companyInfo",companyInfoService.getCompanyInfo());
        return "companyInfo/companyInfo";
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateInfo(@RequestBody CompanyInfo companyInfo){
        return AjaxResponse.getInstanceByResult(companyInfoService.updateInfo(companyInfo)== Constant.AFFECTED_LINE_1);
    }
}
