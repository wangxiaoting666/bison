package com.threegrand.bison.sjgl.dao;


import com.threegrand.bison.sjgl.model.Binding;
import com.threegrand.bison.sjgl.model.Bracelet;
import com.wonderland.sail.mybatis.annotation.mybatisRepository;

import java.util.List;

@mybatisRepository
public interface BraceletDao {

    List<Bracelet> getShListPage(Bracelet bracelet);
    int addSh(Bracelet bracelet);
    List<Binding> getBraceletRz(Binding binding);

}
