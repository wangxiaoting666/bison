package com.threegrand.bison.news.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.design.dao.NewsParamDao;
import com.threegrand.bison.design.dao.NewsParamValueDao;
import com.threegrand.bison.design.model.NewsParam;
import com.threegrand.bison.design.model.NewsParamValue;
import com.threegrand.bison.news.dao.NewsDao;
import com.threegrand.bison.news.dao.NewsTypeDao;
import com.threegrand.bison.news.model.News;
import com.threegrand.bison.news.model.NewsType;
import com.threegrand.bison.news.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("newsService")
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsDao newsDao;
    @Autowired
    private NewsTypeDao newsTypeDao;
    @Autowired
    private NewsParamDao newsParamDao;
    @Autowired
    private NewsParamValueDao newsParamValueDao;

    @Override
    public List<NewsType> getTypeList(NewsType newsType) {
        newsType.setState("1");
        return newsTypeDao.getTypeList(newsType);
    }

    @Override
    public List<NewsParam> getNewsParamList(String moduleId) {
        return newsParamDao.getNewsParamList(moduleId);
    }

    @Override
    public List<News> getNewsList(News news) {
        return newsDao.getNewsList(news);
    }

    @Override
    public List<News> getNewsListNoSequence(News news) {
        return newsDao.getNewsListNoSequence(news);
    }

    @Override
    public List<News> getNewsListSequence(News news) {
        return newsDao.getNewsListSequence(news);
    }

    @Override
    public List<News> getNewsListPage(News news) {
        return newsDao.getNewsListPage(news);
    }

    @Override
    public int addNewsAndParam(News newsAndParam) {
        if (newsDao.getNewsByPageTitle(newsAndParam.getPageTitle()) != null) {
            throw new ValidateErrorException("该文章已存在！");
        }
        if (newsAndParam.getNewsTypeList() != null && !newsAndParam.getNewsTypeList().isEmpty()) {
            throw new ValidateErrorException("必须选择文章分类！");
        }
        int affectedLineNum = newsDao.addNews(newsAndParam);
        addNewsParamValue(newsAndParam);
        return affectedLineNum;
    }

    @Override
    public News getNewsAndParam(String newsId) {
        News newsAndParam = newsDao.getNews(newsId);
        Map<String, List<NewsParamValue>> newsParamValue = getNewsParamValue(newsId);
        newsAndParam.setNewsParamValueMap(newsParamValue);
        return newsAndParam;
    }

    @Override
    public int updateNewsAndParam(News newsAndParam) {
        int affectedLineNum = newsDao.updateNews(newsAndParam);

        updateNewsParamValue(newsAndParam);
        return affectedLineNum;
    }

    @Override
    public int deleteNewsAndParam(String newsId) {
        newsParamValueDao.deleteNewsParamValue(newsId);
        return newsDao.deleteNews(newsId);
    }

    @Override
    public List<News> getNewsByTypeId(String newsTypeId) {
        return newsDao.getNewsByTypeId(newsTypeId);
    }

    @Override
    public List<News> getFrontNewsListPage(News news) {
        return newsDao.getFrontNewsListPage(news);
    }

    @Override
    public News getNews(String newsId) {
        return newsDao.getNews(newsId);
    }

    private void addNewsParamValue(News news) {
        //创建一个NewsParamValue集合
        List<NewsParamValue> strNewsParamValueList = new ArrayList<NewsParamValue>();
        //循环遍历newsParamValueList，得到NewsParamValue的list集合
        List<NewsParamValue> newsParamValueList = news.getNewsParamValueList();
        for (NewsParamValue newsParamValue : newsParamValueList) {
            // //创建一个NewsParamValue对象，存放遍历的NewsParamValue属性
            NewsParamValue newsParamValue1 = new NewsParamValue();
            newsParamValue1.setNewsParamId(newsParamValue.getNewsParamId());
            newsParamValue1.setNewsId(news.getNewsId());
            newsParamValue1.setParamValue(newsParamValue.getParamValue());

            strNewsParamValueList.add(newsParamValue1);
            newsParamValueDao.addNewsParamValue(newsParamValue1);
        }
        news.setNewsParamValueList(strNewsParamValueList);
    }

    private Map<String, List<NewsParamValue>> getNewsParamValue(String newsId) {
        //得到NewsParamValue的List集合
        List<NewsParamValue> newsParamValueList = newsParamValueDao.getNewsParamValue(newsId);
        //创建NewsParamValue的Map集合
        Map<String, List<NewsParamValue>> newsParamValueMap = new HashMap<String, List<NewsParamValue>>();
        //遍历NewsParamValue的List集合得到NewsParamValue对象的各种属性
        for (NewsParamValue newsParamValue : newsParamValueList) {
            //如果newsParamValueMap的key值不为空则执行此段代码
            if (!newsParamValueMap.containsKey(newsParamValue.getNewsParamId())) {
                //将key值为newsParamId，value值为NewsParamValue的List集合的Map存放到newsParamValueMap里
                newsParamValueMap.put(newsParamValue.getNewsParamId(), new ArrayList<NewsParamValue>());
            }
            //否则直接将newsParamValue赋给newsParamValueMap的key为NewsParamId的value
            newsParamValueMap.get(newsParamValue.getNewsParamId()).add(newsParamValue);
        }
        return newsParamValueMap;
    }

    private void updateNewsParamValue(News news) {
        //创建一个NewsParamValue集合
        List<NewsParamValue> strNewsParamValueList = new ArrayList<NewsParamValue>();
        //循环遍历newsParamValueList，得到NewsParamValue的list集合
        List<NewsParamValue> newsParamValueList = news.getNewsParamValueList();
        for (NewsParamValue newsParamValue : newsParamValueList) {
            //创建一个NewsParamValue对象，存放遍历的NewsParamValue属性
            NewsParamValue newsParamValue1 = new NewsParamValue();
            newsParamValue1.setNewsParamId(newsParamValue.getNewsParamId());
            newsParamValue1.setNewsId(news.getNewsId());
            newsParamValue1.setParamValue(newsParamValue.getParamValue());
            strNewsParamValueList.add(newsParamValue1);
            newsParamValueDao.updateNewsParamValue(newsParamValue1);
        }
        news.setNewsParamValueList(strNewsParamValueList);
    }
}
