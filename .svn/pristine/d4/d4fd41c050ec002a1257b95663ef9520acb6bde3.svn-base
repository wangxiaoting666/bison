package com.threegrand.controller.accountMgt;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.threegrand.bison.AccountMgt.model.Account;
import com.threegrand.bison.AccountMgt.model.BindingPerson;
import com.threegrand.bison.AccountMgt.service.AccountService;
import com.threegrand.bison.common.ajax.DataTablesResponse;
import com.threegrand.bison.develop.service.PermissionService;
import com.threegrand.bison.security.model.PermissionTreeNode;
import com.threegrand.bison.security.model.Role;
import com.threegrand.bison.security.service.UserService;
import com.wonderland.sail.ajax.response.AjaxResponse;
import com.wonderland.sail.constant.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * �˻�����
 * Created by haxp on 2016/2/19.
 */

@Controller
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private UserService userService;
    /**
     * @ҳ����ת
     * @param model
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(method = RequestMethod.GET)
    public String toAccount(Model model, HttpServletRequest request)throws JsonProcessingException{
        String companyId = (String) request.getSession().getAttribute("companyId");
        List<PermissionTreeNode> permissionTreeNodes = permissionService.getPermissionTree(companyId);
        model.addAttribute("tree", new ObjectMapper().writeValueAsString(permissionTreeNodes));
        return "account/account";
    }

    /**
     * @��ȡ�˻��б�
     * @param account
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getAccountListPage")
    @ResponseBody
    public DataTablesResponse getAccountListPage(Account account, HttpServletRequest request) throws JsonProcessingException {
        return new DataTablesResponse(account,accountService.getAccountListPage(account));
    }

    /**
     * @����˻�
     * @param account
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value="/addAccount",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse addAccount(Account account, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = accountService.addAccount(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     * @�����˻�
     * @param account
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value="/updateAccountPer",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateAccountPer(@RequestBody Account account, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = accountService.updateAccountPer(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     * @�����˻�����
     * @param account
     * @return
     */
    @RequestMapping(value = "/updateAcscountpassword", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateAcscountpassword(Account account) {
        int affectedLineNum = accountService.updateAccountpassword(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);

    }

    /**
     * @����˻�
     * @param account
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value = "/updateAcscountstatusstop", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateAcscountstatusstop(Account account, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = accountService.updateAccountstatusstop(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);

    }

    /**
     * @����˻�
     * @param account
     * @param result
     * @param request
     * @return
     */
    @RequestMapping(value = "/updateAcscountstatusstart", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse updateAcscountstatusstart(Account account, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = accountService.updateAccountstatusstart(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }

    /**
     * @��ȡ���б�
     * @param bindingPerson
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getBindingPerListPage")
    @ResponseBody
    public DataTablesResponse getBindingPerListPage(BindingPerson bindingPerson, HttpServletRequest request) throws JsonProcessingException {
        return new DataTablesResponse(bindingPerson,accountService.getBindingPerListPage(bindingPerson));
    }

    /**
     *
     * @param account
     * @return
     */
    @RequestMapping(value = "/AddmonitorobjectPer", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse AddmonitorobjectPer(Account account) {
        int affectedLineNum = accountService.AddmonitorobjectPer(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);

    }

    /**
     * @
     * @param bindingPerson
     * @param request
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value="/getBindingPerdelListPage")
    @ResponseBody
    public DataTablesResponse getBindingPerdelListPage(BindingPerson bindingPerson, HttpServletRequest request) throws JsonProcessingException {
        return new DataTablesResponse(bindingPerson,accountService.getBindingPerdelListPage(bindingPerson));
    }

    /**
     *
     * @param account
     * @return
     */
    @RequestMapping(value = "/monitorobjectPerdel", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse monitorobjectPerdel(Account account) {
        int affectedLineNum = accountService.monitorobjectPerdel(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);

    }

    @RequestMapping(value = "/deleteAccountList", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse deleteAccountList(Account account, BindingResult result, HttpServletRequest request) {
        int affectedLineNum = accountService.deleteAccountList(account);
        return AjaxResponse.getInstanceByResult(affectedLineNum == Constant.AFFECTED_LINE_1);
    }
    
    @RequestMapping(value = "getNode",method = RequestMethod.POST)
    @ResponseBody
    public AjaxResponse getNode(@RequestParam("id")String id, HttpServletRequest request) throws JsonProcessingException {
    	AjaxResponse ajaxResponse = new AjaxResponse();
    	id = id.substring(0,id.length()-1);
    	id = id.substring(1,id.length()-1);
    	Account account1 = new Account();
    	account1.setEmpID(id);
    	
    	Account account = userService.getUserByUserName(account1);
    	ajaxResponse.addAttribute("permTokenTree", permissionService.getPermissionTreeByRole(account.getEmpID(),""));
        return ajaxResponse;
    }

}
