package com.threegrand.bison.AccountMgt.service.impl;

import com.threegrand.bison.AccountMgt.dao.AccountDao;
import com.threegrand.bison.AccountMgt.model.Account;
import com.threegrand.bison.AccountMgt.model.BindingPerson;
import com.threegrand.bison.AccountMgt.service.AccountService;
import com.threegrand.bison.security.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lzg on 2016/2/19.
 */

@Service("accountService")
public class AccountServiceImpl  implements AccountService {
    @Autowired
    private AccountDao accountDao;


    @Override
    public List<Account> getAccountListPage(Account account) {
        return accountDao.getAccountListPage(account);
    }

    @Override
    public int addAccount(Account account) {
        return accountDao.addAccount(account);
    }
    @Override
    public int updateAccountPer(Account account) {
        String[] strid=account.getIds().split(",");
        for(int i=0;i<strid.length;i++) {
            Role r = new Role();
            r.setCompanyId("0");
            r.setRoleName(strid[i].substring(1,strid[i].length()-1));
            r.setPermTokenList(account.getPermTokenList());
            accountDao.deleteAccountPer(r);
            addRolePermission(r);
        }
        //return accountDao.updateAccountPer(account);
        return 1;
    }

    private void addRolePermission(Role role) {
        if (role.getPermTokenList() != null && !role.getPermTokenList().isEmpty()) {
            for(int i=0;i<role.getPermTokenList().size();i++) {
                role.setPermToken(role.getPermTokenList().get(i));
                Role r = accountDao.findRolePer(role);
                if(r==null) {
                    accountDao.addRolePermission(role);
                }
                accountDao.updateAccountPer(role);
            }
        }
    }


    @Override
    public int updateAccountpassword(Account account) {
        account.setIds(account.getIds().substring(0,account.getIds().length()-1));
        List<Account>  accountlist=accountDao.getAccountListByIds(account);
        for(Account a:accountlist){
            accountDao.updateAccountpassword(a);
        }
        return 1;
    }

    @Override
    public int updateAccountstatusstop(Account account) {
        account.setIds(account.getIds().substring(0,account.getIds().length()-1));
        List<Account>  accountlist=accountDao.getAccountListByIds(account);
        for(Account a:accountlist){
            accountDao.updateAccountstatusstop(a);
        }
        return 1;
    }

    @Override
    public int updateAccountstatusstart(Account account) {
        account.setIds(account.getIds().substring(0, account.getIds().length() - 1));
        List<Account>  accountlist=accountDao.getAccountListByIds(account);
        for(Account a:accountlist){
            accountDao.updateAccountstatusstart(a);
        }
        return 1;
    }

    @Override
    public List<BindingPerson> getBindingPerListPage(BindingPerson bindingPerson) {
        return accountDao.getBindingPerListPage(bindingPerson);
    }


    public int AddmonitorobjectPer(Account account) {
        account.setIds(account.getIds().substring(0,account.getIds().length()-1));
        String[] strid=account.getIds().split(",");
        String[] strbdper=account.getBdpers().split(",");
        for(int i=0;i<strid.length;i++){
            for(int j=0;j<strbdper.length;j++){
                Account a=new Account();
                a.setEmpID(strid[i].substring(1,strid[i].length()-1));
                a.setUserId(strbdper[j].substring(1,strbdper[j].length()-1));
                accountDao.AddmonitorobjectPer(a);
            }
        }
        return 1;
    }

    @Override
    public List<BindingPerson> getBindingPerdelListPage(BindingPerson bindingPerson) {
        if(bindingPerson.getIds()!=null&&!"".equals(bindingPerson.getIds())&&bindingPerson.getIds().length()>0) {
            bindingPerson.setIds(bindingPerson.getIds().substring(0, bindingPerson.getIds().length() - 1));
        }else{
            bindingPerson.setIds(null);
        }
        return accountDao.getBindingPerdelListPage(bindingPerson);
    }



    public int monitorobjectPerdel(Account account) {
        account.setIds(account.getIds().substring(0,account.getIds().length()-1));
        String[] strid=account.getIds().split(",");
        for(int i=0;i<strid.length;i++){
            Account a=new Account();
            a.setMonitId( Integer.parseInt(strid[i]));
            accountDao.monitorobjectPerdel(a);
        }
        return 1;
    }

    public int deleteAccountList(Account account) {
        account.setIds(account.getIds().substring(0,account.getIds().length()-1));
        String[] strid=account.getIds().split(",");
        for(int i=0;i<strid.length;i++){
                Account a=new Account();
                a.setEmpID(strid[i].substring(1, strid[i].length() - 1));
                accountDao.deleteAccountList(a);
        }
        return 1;
    }

}
