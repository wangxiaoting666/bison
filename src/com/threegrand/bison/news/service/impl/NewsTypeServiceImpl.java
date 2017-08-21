package com.threegrand.bison.news.service.impl;

import com.threegrand.bison.news.dao.NewsTypeDao;
import com.threegrand.bison.news.model.NewsType;
import com.threegrand.bison.news.service.NewsTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
@Service("NewsTypeService")
public class NewsTypeServiceImpl implements NewsTypeService {

    @Autowired
    private NewsTypeDao newsTypeDao;

    @Override
    public List<NewsType> getTypeList(NewsType newsType) {
        return newsTypeDao.getTypeList(newsType);
    }

    @Override
    public List<NewsType> getTypeListPage(NewsType type) {
        return newsTypeDao.getTypeListPage(type);
    }

    @Override
    public int addNewsType(NewsType type) {
        return newsTypeDao.addNewsType(type);
    }

    @Override
    public int deleteNewsType(String newsTypeId) {
        return newsTypeDao.deleteNewsType(newsTypeId);
    }

    @Override
    public NewsType queryNewsType(String newsTypeId) {
        return newsTypeDao.queryNewsType(newsTypeId);
    }

    @Override
    public int updateNewsType(NewsType type) {
        return newsTypeDao.updateNewsType(type);
    }


}
