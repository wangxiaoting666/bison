package com.threegrand.bison.design.service.impl;

import com.threegrand.bison.design.dao.SinglePageDao;
import com.threegrand.bison.design.dao.TemplateDao;
import com.threegrand.bison.design.model.SinglePage;
import com.threegrand.bison.design.model.Template;
import com.threegrand.bison.design.service.SinglePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
@Service("SingPageService")
public class SinglePageServiceImpl implements SinglePageService {

    @Autowired
    private SinglePageDao singlePageDao;
    @Autowired
    private TemplateDao templateDao;

    @Override
    public List<Template> getTemplateList(int templateType) {
        return templateDao.getTemplateList(templateType);
    }

    @Override
    public List<SinglePage> getSinglePageListPage(SinglePage singlePage) {
        return singlePageDao.getSinglePageListPage(singlePage);
    }

    @Override
    public int addSinglePage(SinglePage singlePage) {
        return singlePageDao.addSinglePage(singlePage);
    }

    @Override
    public int deleteSinglePage(String singlePageId) {
        return singlePageDao.deleteSinglePage(singlePageId);
    }

    @Override
    public SinglePage querySinglePage(String singlePageId, String companyId) {
        return singlePageDao.querySinglePage(singlePageId, companyId);
    }

    @Override
    public int updateSinglePage(SinglePage singlePage) {
        return singlePageDao.updateSinglePage(singlePage);
    }

    @Override
    public List<SinglePage> getSinglePageList(String companyId) {
        return singlePageDao.getSinglePageLists(companyId);
    }

    @Override
    public SinglePage getSinglePageByAlias(String alias, String companyId) {
        return singlePageDao.getSinglePageByAlias(alias,companyId);
    }
}
