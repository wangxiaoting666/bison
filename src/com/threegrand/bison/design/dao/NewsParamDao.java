package com.threegrand.bison.design.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.design.model.NewsParam;

import java.util.List;

/**
 * Created by Administrator on 2014/10/11.
 */

@mybatisRepository
public interface NewsParamDao {

    List<NewsParam> getNewsParamListPage(NewsParam newsParam);

    NewsParam getNewsParamByParamName(String paramName);

    int addNewsParam(NewsParam newsParam);

    NewsParam getNewsParam(String newsParamId);

    int updateNewsParam(NewsParam newsParam);

    int deleteNewsParam(String newsParamId);

    List<NewsParam> getNewsParamList(String moduleId);

}
