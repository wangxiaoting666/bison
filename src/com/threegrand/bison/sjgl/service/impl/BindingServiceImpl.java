package com.threegrand.bison.sjgl.service.impl;



import com.threegrand.bison.sjgl.dao.BindingDao;
import com.threegrand.bison.sjgl.model.Binding;
import com.threegrand.bison.sjgl.model.Bracelet;
import com.threegrand.bison.sjgl.service.BindingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service("bindingService")
public class BindingServiceImpl implements BindingService {

    @Autowired
    private BindingDao bindingDao;

    @Override
    public List<Binding> getBindingUserListPage(Binding binding) {
        return bindingDao.getBindingUserListPage(binding);
    }


    @Override
    public int addBindingUser(Binding binding) {
        bindingDao.addBindingUserBf(binding);
        bindingDao.addRzs(binding);
        return bindingDao.addBindingUser(binding);
    }

    @Override
    public List<Binding> getBindingAsset(Binding binding) {
        return bindingDao.getBindingAsset(binding);
    }

    @Override
    public int deleteBindingInfo(Bracelet bracelet) {
        bracelet.setIds(bracelet.getIds().substring(0,bracelet.getIds().length()-1));
        List<Bracelet>  braceletlist=bindingDao.getBraceletListByIds(bracelet);
        for(Bracelet b:braceletlist){
            bindingDao.deleteBindingInfo(b);
            Binding bd=new Binding();
            bd.setXgsj(new Date());
            bd.setUserId(b.getBraceletId());
            bd.setUsername(b.getBindObjmc());
            bd.setBindObj(b.getBindObj());
            bindingDao.addRz(bd);
        }
        return 1;
    }




    @Override
    public int AddbindingPer(Bracelet bracelet) {
        String[] strid=bracelet.getIds().split(",");
        String strbdper=bracelet.getBdper().substring(1, bracelet.getBdper().length() - 2);
        for(int i=0;i<strid.length;i++){
            Binding bd=new Binding();
            bd.setXgsj(new Date());
            bd.setBraceletId(strid[i].substring(1, strid[i].length() - 1));
            bd.setUserId(strbdper);
            Binding str = bindingDao.findbduser(bd);
            bd.setBindObj(strbdper);
            bd.setBindType("人员");
            bd.setBindObjmc(str.getUsername());
            bd.setUsername(str.getUsername());
            bindingDao.addBindingUser(bd);
            bindingDao.addRz(bd);
        }
        return 1;
    }


}
