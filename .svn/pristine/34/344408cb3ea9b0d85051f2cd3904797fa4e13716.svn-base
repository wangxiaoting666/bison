package com.threegrand.bison.news.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.design.model.SinglePage;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by Administrator on 2014/10/31.
 */
@mybatisRepository
public interface SinglePageContentDao {

    List<SinglePage> getSinglePageListPage(SinglePage singlePage);

    SinglePage getSinglePageContent(@Param("singlePageId") String singlePageId, @Param("companyId") String companyId);

    int updateSinglePageContent(SinglePage singlePage);

}
