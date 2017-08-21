package com.threegrand.bison.design.service.impl;

import com.wonderland.sail.exception.ValidateErrorException;
import com.threegrand.bison.design.dao.NewsParamDao;
import com.threegrand.bison.design.model.NewsParam;
import com.threegrand.bison.design.service.NewsParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/10/11.
 */

@Service("newsParamService")
public class NewsParamServiceImpl implements NewsParamService {

    @Autowired
    private NewsParamDao newsParamDao;

    @Override
    public List<NewsParam> getNewsParamListPage(NewsParam newsParam) {
        return newsParamDao.getNewsParamListPage(newsParam);
    }

    @Override
    public int addNewsParam(NewsParam newsParam) {
        if (newsParamDao.getNewsParamByParamName(newsParam.getParamName()) != null) {
            throw new ValidateErrorException("变量名已存在！");
        }
        return newsParamDao.addNewsParam(newsParam);
    }

    @Override
    public NewsParam getNewsParam(String newsParamId) {
        return newsParamDao.getNewsParam(newsParamId);
    }

    @Override
    public int updateNewsParam(NewsParam newsParam) {
        return newsParamDao.updateNewsParam(newsParam);
    }

    @Override
    public int deleteNewsParam(String newsParamId) {
        return newsParamDao.deleteNewsParam(newsParamId);
    }

}
