package com.threegrand.bison.AccountMgt.dao;

import com.threegrand.bison.AccountMgt.model.Account;
import com.threegrand.bison.AccountMgt.model.BindingPerson;
import com.threegrand.bison.security.model.Role;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

import java.util.List;

/**
 * Created by lzg on 2016/2/19.
 */

@mybatisRepository
public interface AccountDao {

    List<Account> getAccountListPage(Account account);
    int addAccount(Account account);
    int updateAccountPer(Role role);
    int updateAccountpassword(Account account);
    int addRolePermission(Role role);

    int updateAccountstatusstop(Account account);
    int updateAccountstatusstart(Account account);
    List<Account> getAccountListByIds(Account account);

    List<BindingPerson> getBindingPerListPage(BindingPerson bindingPerson);

    int AddmonitorobjectPer(Account account);
    List<BindingPerson> getBindingPerdelListPage(BindingPerson bindingPerson);
    int monitorobjectPerdel(Account account);

    int deleteAccountPer(Role role);

    int deleteAccountList(Account account);


    Role findRolePer(Role role);
}
