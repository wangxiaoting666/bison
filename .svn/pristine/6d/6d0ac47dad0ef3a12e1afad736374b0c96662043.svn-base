package com.threegrand.bison.personInfo.service.impl;

import com.threegrand.bison.personInfo.dao.*;
import com.threegrand.bison.personInfo.model.Area;
import com.threegrand.bison.personInfo.model.ConsumerRole;
import com.threegrand.bison.personInfo.model.Tag;
import com.threegrand.bison.personInfo.model.UserInfo;
import com.threegrand.bison.personInfo.service.UserInfoService;
import com.wonderland.sail.autocomplete.service.AutoCompleteService;
import com.wonderland.sail.exception.ValidateErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by Administrator on 2015/12/26.
 */

@Service( "userInfoService")
public class UserInfoServiceImpl implements UserInfoService {
    @Autowired
    private UserInfoDao userInfoDao;

    @Override
    public UserInfo getUserInfoByName(String userName) {
        return userInfoDao.getUserInfoByName(userName);
    }

    @Override
    public List<String> getBuilds() {
        return userInfoDao.getBuilds();
    }

    @Override
    public List<String> getStepsByBuild(String build) {
        return userInfoDao.getStepsByBuild( build);
    }

    @Override
    public List<String> getAreaByStep(Area area) {
        return userInfoDao.getAreaByStep(area);
    }

    @Override
    public int addUserInfo(UserInfo userInfo) {
        validateRepeatUser(userInfo);
        int affectedLineNum=userInfoDao.addUserInfo(userInfo);
        return affectedLineNum;
    }

    @Override
    public int addAlertArea(Area area) {
        String[] ids=area.getUserId().split("%");
        String[] ids2=area.getAreaId().split("%");
        int affectedLineNum=0;
        for(int i=0;i<ids.length;i++){
             area.setUserId(ids[i]);
            for(int j=0;j<ids2.length;j++){
                area.setAreaId(ids2[j]);
                affectedLineNum=userInfoDao.addAlertArea(area);
            }
        }
        return affectedLineNum;
    }

    @Override
    public List<UserInfo> getUserInfoListPage(UserInfo userInfo) {
        return userInfoDao.getUserInfoListPage(userInfo);
    }

    @Override
    public List<Area> getAreasListPage(Area area) {
        return userInfoDao.getAreasListPage(area);
    }

    @Override
    public List<Area> getUserAreasListPage(Area area) {
        String[] ids=area.getUserId().split("%");
        area.setUserId(ids[0]);
        return userInfoDao.getUserAreasListPage(area);
    }

    @Override
    public int setUserInfoRole(UserInfo userInfo) {
        String[] ids=userInfo.getUserId().split("%");
        for(int i=0;i<ids.length;i++) {
            userInfo.setUserId(ids[i]);
            int affectedLineNum = userInfoDao.setUserInfoRole(userInfo);
        }
        return 1;
    }

    @Override
    public int setUserInfoTag(UserInfo userInfo) {
        String[] ids=userInfo.getUserId().split("%");
        for(int i=0;i<ids.length;i++) {
               userInfo.setUserId(ids[i]);
            int affectedLineNum = userInfoDao.setUserInfoTag(userInfo);
        }
        return 1;
    }

    @Override
    public List<Tag> getTags() {
        return userInfoDao.getTags();
    }

    @Override
    public List<ConsumerRole> getUserRoles() {
        return userInfoDao.getUserRoles();
    }

    @Override
    public List<UserInfo> getUserInfoById(String userId) {
        return userInfoDao.getUserInfoById(userId);
    }

    @Override
    public int setUserInfoArea(Area area) {
        String[] ids=area.getUserId().split("%");
        int affectedLineNum=0;
        for(int i=0;i<ids.length;i++) {
            area.setUserId(ids[i]);
             affectedLineNum = userInfoDao.setUserInfoArea(area);
        }
        return affectedLineNum;
    }


    private void validateRepeatUser(UserInfo userInfo) {

        if (userInfoDao.getUserInfoByName(userInfo.getUserName()) != null) {
            throw new ValidateErrorException("名称重复");
        }
    }

}
