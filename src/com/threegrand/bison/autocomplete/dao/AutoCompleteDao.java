package com.threegrand.bison.autocomplete.dao;

import com.wonderland.sail.mybatis.annotation.mybatisRepository;
import com.wonderland.sail.autocomplete.model.AutoComplete;

import java.util.List;

/**
 * @author gaoxinyu
 */
@mybatisRepository
public interface AutoCompleteDao {

    List<AutoComplete> gAutoLoginName();

    List<AutoComplete> gAutoUsername();

    List<AutoComplete> gAutoMenu();

    List<AutoComplete> gAutoRoleName();

    List<AutoComplete> gAutoPermToken();

    List<AutoComplete> gAutoNewsTypeName();

    List<AutoComplete> gAutoPageTitle();

    List<AutoComplete> gAutoParamName();

    List<AutoComplete> gAutoModuleName();

    List<AutoComplete> gAutoModuleAlias();

    List<AutoComplete> gAutoNewsParamName();

    List<AutoComplete> gAutoSinglePageName();
}
