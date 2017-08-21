package com.threegrand.bison.keyWord.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.keyWord.model.KeyWordLink;

import java.util.List;

/**
 * 描述：关键词链接管理
 * User：赵鹏
 * Date: 2014-11-20
 */
@mybatisRepository
public interface KeyWordLinkDao {

    List<KeyWordLink> getKeyWordLinkListPage(KeyWordLink keyWordLink);

    KeyWordLink getKeyWordLinkByKeyWord(String keyWord);

    KeyWordLink getKeyWordLinkById(String keyWordLinkId);

    int addKeyWordLink(KeyWordLink sysKeyWord);

    int updateKeyWordLink(KeyWordLink sysKeyWord);

    int deleteKeyWordLink(String keyWordLinkId);

}
