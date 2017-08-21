package com.threegrand.bison.autocomplete.service;

import com.wonderland.sail.autocomplete.model.AutoComplete;
import com.wonderland.sail.autocomplete.service.AbstractAutoCompleteService;
import com.threegrand.bison.autocomplete.dao.AutoCompleteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * AutoCompleteServiceImpl
 *
 * @author gaoxinyu
 */
@Service("autoCompleteService")
public class CustomAutoCompleteServiceImpl extends AbstractAutoCompleteService {

    @Autowired
    private AutoCompleteDao autoCompleteDao;

    @Override
    protected void initAutoCompleteMap() {
        Map<String, List<AutoComplete>> autoCompleteMap = new HashMap<String, List<AutoComplete>>();
        autoCompleteMap.put("gAutoLoginName", autoCompleteDao.gAutoLoginName());
        autoCompleteMap.put("gAutoUsername", autoCompleteDao.gAutoUsername());
        autoCompleteMap.put("gAutoMenu", autoCompleteDao.gAutoMenu());
        autoCompleteMap.put("gAutoRoleName", autoCompleteDao.gAutoRoleName());
        autoCompleteMap.put("gAutoPermToken", autoCompleteDao.gAutoPermToken());
        autoCompleteMap.put("gAutotypeName", autoCompleteDao.gAutoNewsTypeName());
        autoCompleteMap.put("gAutoNewsTypeName", autoCompleteDao.gAutoNewsTypeName());
        autoCompleteMap.put("gAutoPageTitle", autoCompleteDao.gAutoPageTitle());
        autoCompleteMap.put("gAutoParamName", autoCompleteDao.gAutoParamName());
        autoCompleteMap.put("gAutoModuleName", autoCompleteDao.gAutoModuleName());
        autoCompleteMap.put("gAutoModuleAlias", autoCompleteDao.gAutoModuleAlias());
        autoCompleteMap.put("gAutoNewsParamName", autoCompleteDao.gAutoNewsParamName());
        autoCompleteMap.put("gAutoSinglePageName", autoCompleteDao.gAutoSinglePageName());
        setAutoCompleteMap(autoCompleteMap);
    }
}
