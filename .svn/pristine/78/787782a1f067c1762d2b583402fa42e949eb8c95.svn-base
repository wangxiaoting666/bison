package com.threegrand.bison.sjgl.dao;


import com.threegrand.bison.sjgl.model.Binding;
import com.threegrand.bison.sjgl.model.Bracelet;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

import java.util.List;


@mybatisRepository
public interface BindingDao {

    List<Binding> getBindingUserListPage(Binding binding);
    int addBindingUser(Binding binding);
    int addBindingUserBf(Binding binding);

    List<Binding> getBindingAsset(Binding binding);
    int deleteUserAssetinfo(Bracelet bracelet);
    int deleteBindingInfo(Bracelet bracelet);

    int addRz(Binding binding);
    List<Bracelet> getBraceletListByIds(Bracelet bracelet);
    int addRzs(Binding binding);

    Binding findbduser(Binding bd);
}
