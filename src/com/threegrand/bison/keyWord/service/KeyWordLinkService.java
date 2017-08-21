package com.threegrand.bison.keyWord.service;

import com.threegrand.bison.keyWord.model.KeyWordLink;

import java.util.List;

/**
 * Created by threegrand1 on 14-11-20.
 */
public interface KeyWordLinkService {

    List<KeyWordLink> getKeyWordLinkListPage(KeyWordLink sysKeyWord);

    KeyWordLink getKeyWordLinkByKeyWord(String keyWord);

    KeyWordLink getKeyWordLinkById(String keyWordLinkId);

    int addKeyWordLink(KeyWordLink keyWordLink);

    int updateKeyWordLink(KeyWordLink keyWordLink);

    int deleteKeyWordLink(String keyWordLinkId);
}
