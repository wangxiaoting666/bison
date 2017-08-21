package com.threegrand.controller.system;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.system.model.Dict;
import com.threegrand.bison.system.service.DictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Controller
@RequestMapping("/system/dict")
public class DictController {

    @Autowired
    private DictService dictService;

    @RequestMapping(method = RequestMethod.GET)
    public String dict(Model model, Dict dict, HttpServletRequest request) {
        model.addAttribute("dictNameList", dictService.getDictName(dict));
        return "dictWord/dictWord";
    }

    @RequestMapping("/getDictListPage")
    @ResponseBody
    public DataTablesResponse getDictListPage(Dict dict, HttpServletRequest request) {
        dict.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return new DataTablesResponse(dict, dictService.getDictListPage(dict));
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addDict(@Valid Dict dict, BindingResult result,HttpServletRequest request) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        dict.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return AjaxResponse.getInstanceByResult(dictService.addDict(dict) == com.wonderland.sail.constant.Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public AjaxResponse updateDict(@Valid Dict dict, HttpServletRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return new AjaxResponse(result);
        }
        dict.setCompanyId(request.getSession().getAttribute("companyId").toString());
        return AjaxResponse.getInstanceByResult(dictService.updateDict(dict) == com.wonderland.sail.constant.Constant.AFFECTED_LINE_1);
    }

    @RequestMapping(value = "/{dictId}", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResponse getDictById(@PathVariable String dictId, HttpServletRequest request) throws JsonProcessingException {
        AjaxResponse ajaxResponse = new AjaxResponse();
        ajaxResponse.addAttribute("dict", dictService.getDictById(dictId, request.getSession().getAttribute("companyId").toString()));
        return ajaxResponse;
    }

    @RequestMapping(value = "/{dictId}", method = RequestMethod.DELETE)
    @ResponseBody
    public AjaxResponse deleteDict(@PathVariable String dictId) {
        return AjaxResponse.getInstanceByResult(dictService.deleteDict(dictId) == com.wonderland.sail.constant.Constant.AFFECTED_LINE_1);
    }
}
