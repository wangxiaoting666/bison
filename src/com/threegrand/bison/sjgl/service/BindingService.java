package com.threegrand.bison.sjgl.service;


import com.threegrand.bison.sjgl.model.Binding;
import com.threegrand.bison.sjgl.model.Bracelet;

import java.util.List;

public interface BindingService {


    List<Binding> getBindingUserListPage(Binding binding);
    int addBindingUser(Binding binding);

    List<Binding> getBindingAsset(Binding binding);

    int deleteBindingInfo(Bracelet bracelet);
    int AddbindingPer(Bracelet bracelet);
}

