package com.threegrand.bison.news.service.impl;

import com.threegrand.bison.design.model.SinglePage;
import com.threegrand.bison.news.dao.SinglePageContentDao;
import com.threegrand.bison.news.service.SinglePageContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/10/31.
 */
@Service("SingPageContentService")
public class SinglePageContentServiceImpl implements SinglePageContentService {

    @Autowired
    private SinglePageContentDao singlePageContentDao;

    @Override
    public List<SinglePage> getSinglePageListPage(SinglePage singlePage) {
        return singlePageContentDao.getSinglePageListPage(singlePage);
    }

    @Override
    public SinglePage getSinglePageContent(String singlePageId, String companyId) {
        return singlePageContentDao.getSinglePageContent(singlePageId, companyId);
    }

    @Override
    public int updateSinglePageContent(SinglePage singlePage) {
        return singlePageContentDao.updateSinglePageContent(singlePage);
    }

}
