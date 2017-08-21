package com.threegrand.bison.system.service.impl;

import com.threegrand.bison.system.dao.DictDao;
import com.threegrand.bison.system.model.Dict;
import com.threegrand.bison.system.service.DictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("DictService")
public class DictServiceImpl implements DictService {

    @Autowired
    private DictDao dictDao;

    @Override
    public List<Dict> getDictListPage(Dict dict) {
        return dictDao.getDictListPage(dict);
    }

    @Override
    public int addDict(Dict dict) {
        return dictDao.addDict(dict);
    }

    @Override
    public Dict getDictById(String dictId, String companyId) {
        return dictDao.getDictById(dictId, companyId);
    }

    @Override
    public int updateDict(Dict dict) {
        return dictDao.updateDict(dict);
    }

    @Override
    public int deleteDict(String dictId) {
        return dictDao.deleteDict(dictId);
    }

    @Override
    public List<Dict> getDictName(Dict dict) {
        return dictDao.getDictName(dict);
    }
}
