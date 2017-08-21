package com.threegrand.bison.news.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.news.model.NewsType;

import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
@mybatisRepository
public interface NewsTypeDao {

    List<NewsType> getTypeList(NewsType newsType);

    List<NewsType> getTypeListPage(NewsType type);

    int addNewsType(NewsType type);

    int deleteNewsType(String newsTypeId);

    NewsType queryNewsType(String newsTypeId);

    int updateNewsType(NewsType type);
}
