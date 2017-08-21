package com.threegrand.bison.design.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.design.model.SinglePage;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by Administrator on 2014/9/25.
 */
@mybatisRepository
public interface SinglePageDao {

    List<SinglePage> getSinglePageList();

    List<SinglePage> getSinglePageListPage(SinglePage singlePage);

    int addSinglePage(SinglePage singlePage);

    int deleteSinglePage(String singlePageId);

    SinglePage querySinglePage(@Param("singlePageId") String singlePageId, @Param("companyId") String companyId);

    int updateSinglePage(SinglePage singlePage);

    List<SinglePage> getSinglePageLists(String companyId);

    SinglePage getSinglePageByAlias(@Param("alias") String alias, @Param("companyId") String companyId);
}
