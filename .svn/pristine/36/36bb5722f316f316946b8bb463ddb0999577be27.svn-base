package com.threegrand.bison.personInfo.service;

import com.threegrand.bison.personInfo.model.Area;
import com.threegrand.bison.personInfo.model.ConsumerRole;
import com.threegrand.bison.personInfo.model.Tag;
import com.threegrand.bison.personInfo.model.UserInfo;

import java.util.List;

/**
 * Created by Administrator on 2015/12/26.
 */
public interface UserInfoService {
    UserInfo getUserInfoByName(String userName);

    List<String> getBuilds();

    List<String> getStepsByBuild(String build);

    List<String> getAreaByStep(Area area);

    List<UserInfo> getUserInfoListPage(UserInfo userInfo);

    List<Area> getAreasListPage(Area area);

    List<Area> getUserAreasListPage(Area area);

    List<Tag> getTags();

    List<ConsumerRole> getUserRoles();

    List<UserInfo> getUserInfoById(String userId);

    int addUserInfo(UserInfo userInfo);

    int addAlertArea(Area area);

    int setUserInfoRole(UserInfo userInfo);

    int setUserInfoTag(UserInfo userInfo);

    int setUserInfoArea(Area area);

}
