package com.threegrand.bison.system.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.threegrand.bison.system.model.Dict;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@mybatisRepository
public interface DictDao {

    List<Dict> getDictListPage(Dict dict);

    int addDict(Dict dict);

    Dict getDictById(@Param("dictId") String dictId, @Param("companyId") String companyId);

    int updateDict(Dict dict);

    int deleteDict(String dictId);

    List<Dict> getDictName(Dict dict);

}
