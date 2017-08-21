package com.threegrand.bison.basic.service.impl;

import com.wonderland.sail.constant.Constant;
import com.threegrand.bison.basic.dao.DictValueDao;
import com.threegrand.bison.basic.model.DictValue;
import com.threegrand.bison.basic.service.DictValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("dictValueService")
@Lazy(false)
public class DictValueServiceImpl implements DictValueService {

    @Autowired
    private DictValueDao dictValueDao;

    @Override
    @PostConstruct
    public void initDictValueMap() {
        //构建dictValueMapList
        DictValue dictValue = new DictValue();
        dictValue.setState(Constant.STATE1);
        List<DictValue> dictValuesList = dictValueDao.getDictValueList(dictValue);
        Map<String, List<DictValue>> dictValueMapList = new HashMap<String, List<DictValue>>();
        for (DictValue dictValues : dictValuesList) {
            if (dictValueMapList.containsKey(dictValues.getDictName().trim())) {
                dictValueMapList.get(dictValues.getDictName().trim()).add(dictValues);
            } else {
                List<DictValue> temp = new ArrayList<DictValue>();
                temp.add(dictValues);
                dictValueMapList.put(dictValues.getDictName(), temp);
            }
        }
        DictValue.dictValueMapList = dictValueMapList;

        //构建dictValueMap
        Map<String, Map<String, DictValue>> dictValueMap = new HashMap<String, Map<String, DictValue>>();
        dictValuesList = dictValueDao.getDictValueList(new DictValue());
        for (DictValue dictValuesVO : dictValuesList) {
            if (dictValueMap.containsKey(dictValuesVO.getDictName().trim())) {
                dictValueMap.get(dictValuesVO.getDictName().trim()).put(dictValuesVO.getDictCode(), dictValuesVO);
            } else {
                Map<String, DictValue> temp = new HashMap<String, DictValue>();
                temp.put(dictValuesVO.getDictCode(), dictValuesVO);
                dictValueMap.put(dictValuesVO.getDictName(), temp);
            }
        }
        DictValue.dictValueMap = dictValueMap;
    }
}
