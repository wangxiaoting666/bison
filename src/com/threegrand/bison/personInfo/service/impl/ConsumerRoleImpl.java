package com.threegrand.bison.personInfo.service.impl;

import com.threegrand.bison.personInfo.dao.ConsumerRoleDao;
import com.threegrand.bison.personInfo.model.ConsumerRole;
import com.threegrand.bison.personInfo.service.ConsumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/1/8.
 */
@Service("consumerService")
public class ConsumerRoleImpl implements ConsumerService{
    @Autowired
    private ConsumerRoleDao consumerRoleDao;
    @Override
    public List<ConsumerRole> getUserRoles() {
        return consumerRoleDao.getUserRoles();
    }

    @Override
    public int addConsumer(ConsumerRole consumerRole) {
        int affectedLineNumber=consumerRoleDao.addConsumer(consumerRole);
        return affectedLineNumber;
    }
}
