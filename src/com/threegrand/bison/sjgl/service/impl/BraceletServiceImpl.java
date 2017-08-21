package com.threegrand.bison.sjgl.service.impl;



import com.threegrand.bison.sjgl.dao.BraceletDao;
import com.threegrand.bison.sjgl.model.Binding;
import com.threegrand.bison.sjgl.model.Bracelet;
import com.threegrand.bison.sjgl.service.BraceletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("braceletService")
public class BraceletServiceImpl implements BraceletService {

    @Autowired
    private BraceletDao braceletDao;


    @Override
    public List<Bracelet> getShListPage(Bracelet bracelet) {
        return braceletDao.getShListPage(bracelet);
    }

    @Override
    public int addSh(Bracelet bracelet) {
        return braceletDao.addSh(bracelet);
    }

    @Override
    public List<Binding> getBraceletRz(Binding binding) {
        return braceletDao.getBraceletRz(binding);
    }

}
