package com.threegrand.bison.AccountMgt.service;

import com.threegrand.bison.AccountMgt.model.Account;
import com.threegrand.bison.AccountMgt.model.BindingPerson;

import java.util.List;

/**
 * Created by lzg on 2016/2/19.
 */
public interface AccountService {

    List<Account> getAccountListPage(Account account);
    int addAccount(Account account);
    int updateAccountPer(Account account);
    int updateAccountpassword(Account account);
    int updateAccountstatusstop(Account account);
    int updateAccountstatusstart(Account account);
    List<BindingPerson> getBindingPerListPage(BindingPerson bindingPerson);
    int AddmonitorobjectPer(Account account);
    List<BindingPerson> getBindingPerdelListPage(BindingPerson bindingPerson);
    int monitorobjectPerdel(Account account);
    int deleteAccountList(Account account);

}
