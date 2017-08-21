package com.threegrand.bison.keyWord.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.keyWord.model.KeyWordShield;

import java.util.List;

@mybatisRepository
public interface KeyWordShieldDao {
    List<KeyWordShield> getKeyWordListPage(KeyWordShield sysKeyWord);

    KeyWordShield getKeyWordShieldByKeyWord(String keyWord);

    KeyWordShield getKeyWordShieldById(String keyWordShieldId);

    int addKeyWord(KeyWordShield sysKeyWord);

    int updateKeyWord(KeyWordShield sysKeyWord);

    int deleteKeyWord(String keyWordShield);
}
