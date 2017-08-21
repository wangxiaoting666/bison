package com.threegrand.bison.news.service;


import com.threegrand.bison.design.model.NewsParam;
import com.threegrand.bison.news.model.News;
import com.threegrand.bison.news.model.NewsType;

import java.util.List;

public interface NewsService {

    List<NewsType> getTypeList(NewsType newsType);

    List<NewsParam> getNewsParamList(String moduleId);

    List<News> getNewsList(News news);

    List<News> getNewsListNoSequence(News news);

    List<News> getNewsListSequence(News news);

    List<News> getNewsListPage(News news);

    int addNewsAndParam(News newsAndParam);

    News getNewsAndParam(String newsId);

    int updateNewsAndParam(News newsAndParam);

    int deleteNewsAndParam(String newsId);

    List<News> getNewsByTypeId(String newsTypeId);

    List<News> getFrontNewsListPage(News news);

    News getNews(String newsId);
}
