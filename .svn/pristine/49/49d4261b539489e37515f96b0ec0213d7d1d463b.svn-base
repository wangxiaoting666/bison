package com.threegrand.bison.news.dao;


import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.news.model.News;

import java.util.List;


@mybatisRepository
public interface NewsDao {

    List<News> getNewsList(News news);

    List<News> getNewsListNoSequence(News news);

    List<News> getNewsListSequence(News news);

    List<News> getNewsListPage(News news);

    int addNews(News news);

    News getNews(String newsId);

    int updateNews(News news);

    int deleteNews(String newsId);

    News getNewsByPageTitle(String pageTitle);

    List<News> getNewsByTypeId(String newsTypeId);

    List<News> getFrontNewsListPage(News news);
}
