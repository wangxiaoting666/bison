package com.threegrand.bison.keyWord.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.keyWord.dao.KeyWordShieldDao;
import com.threegrand.bison.keyWord.model.KeyWordShield;
import com.threegrand.bison.keyWord.service.KeyWordShieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/11/3.
 * User: 宗晓宇
 * Date: 2014/11/3
 * Time: 17:13
 */
@Service("keyWordShieldService")
public class KeyWordShieldServiceImpl implements KeyWordShieldService {
    @Autowired
    private KeyWordShieldDao keyWordShieldDao;

    @Override
    public List<KeyWordShield> getKeyWordShieldListPage(KeyWordShield keyWordShield) {
        return keyWordShieldDao.getKeyWordListPage(keyWordShield);
    }

    @Override
    public KeyWordShield getKeyWordShieldById(String keyWordShieldId) {
        return keyWordShieldDao.getKeyWordShieldById(keyWordShieldId);
    }

    @Override
    public int addKeyWordShield(KeyWordShield keyWordShield) {
        if (keyWordShieldDao.getKeyWordShieldByKeyWord(keyWordShield.getKeyWord()) != null) {
            throw new ValidateErrorException("要屏蔽的关键字已存在！");
        }
        return keyWordShieldDao.addKeyWord(keyWordShield);
    }

    @Override
    public int updateKeyWordShield(KeyWordShield keyWordShield) {
        if (!keyWordShield.getKeyWord().equals(keyWordShieldDao.getKeyWordShieldById(keyWordShield.getKeyWordShieldId()).getKeyWord()) &&
                keyWordShieldDao.getKeyWordShieldByKeyWord(keyWordShield.getKeyWord()) != null) {
            throw new ValidateErrorException("要屏蔽的关键字已存在！");
        }
        return keyWordShieldDao.updateKeyWord(keyWordShield);
    }

    @Override
    public int deleteKeyWordShield(String keyWordShield) {
        return keyWordShieldDao.deleteKeyWord(keyWordShield);
    }
}
