package com.threegrand.bison.keyWord.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.keyWord.dao.KeyWordLinkDao;
import com.threegrand.bison.keyWord.model.KeyWordLink;
import com.threegrand.bison.keyWord.service.KeyWordLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by threegrand1 on 14-11-20.
 */
@Service("keyWordLinkService")
public class KeyWordLinkServiceImpl implements KeyWordLinkService {
    @Autowired
    private KeyWordLinkDao keyWordLinkDao;

    @Override
    public List<KeyWordLink> getKeyWordLinkListPage(KeyWordLink sysKeyWord) {
        return keyWordLinkDao.getKeyWordLinkListPage(sysKeyWord);
    }

    @Override
    public KeyWordLink getKeyWordLinkByKeyWord(String keyWord) {
        return keyWordLinkDao.getKeyWordLinkByKeyWord(keyWord);
    }

    @Override
    public KeyWordLink getKeyWordLinkById(String keyWordLinkId) {
        return keyWordLinkDao.getKeyWordLinkById(keyWordLinkId);
    }

    @Override
    public int addKeyWordLink(KeyWordLink keyWordLink) {
        if (keyWordLinkDao.getKeyWordLinkByKeyWord(keyWordLink.getKeyWord()) != null) {
            throw new ValidateErrorException("要链接的关键字已存在！");
        }
        return keyWordLinkDao.addKeyWordLink(keyWordLink);
    }

    @Override
    public int updateKeyWordLink(KeyWordLink keyWordLink) {
        if (!keyWordLink.getKeyWord().equals(keyWordLinkDao.getKeyWordLinkById(keyWordLink.getKeyWordLinkId()).getKeyWord()) &&
                keyWordLinkDao.getKeyWordLinkByKeyWord(keyWordLink.getKeyWord()) != null) {
            throw new ValidateErrorException("要链接的关键字已存在！");
        }
        return keyWordLinkDao.updateKeyWordLink(keyWordLink);
    }

    @Override
    public int deleteKeyWordLink(String keyWordLinkId) {
        return keyWordLinkDao.deleteKeyWordLink(keyWordLinkId);
    }
}
