package com.wonderland.sail.autocomplete.service;


import com.wonderland.sail.autocomplete.model.AutoComplete;

import java.util.List;

/**
 * 自动提示的抽象类
 *
 * @author lzg
 */
public interface AutoCompleteService {

    void initAutoComplete();

    List<AutoComplete> getAutoCompleteResultList(AutoComplete autoCompleteParam);

}
