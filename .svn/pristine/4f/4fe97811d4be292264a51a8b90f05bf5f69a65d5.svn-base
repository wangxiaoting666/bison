package com.threegrand.bison.design.service;

import com.threegrand.bison.design.model.SinglePage;
import com.threegrand.bison.design.model.Template;

import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
public interface SinglePageService {

    List<Template> getTemplateList(int templateType);

    List<SinglePage> getSinglePageListPage(SinglePage singlePage);

    int addSinglePage(SinglePage singlePage);

    int deleteSinglePage(String singlePageId);

    SinglePage querySinglePage(String singlePageId, String companyId);

    int updateSinglePage(SinglePage singlePage);

    List<SinglePage> getSinglePageList(String companyId);

    SinglePage getSinglePageByAlias(String alias, String companyId);
}
