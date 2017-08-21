package com.wonderland.sail.autocomplete.controller;

import com.wonderland.sail.autocomplete.model.AutoComplete;
import com.wonderland.sail.autocomplete.service.AutoCompleteService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * AutoCompleteController
 *
 * @author lzg
 */
@RequestMapping("/autoComplete")
public class AutoCompleteController {

    private AutoCompleteService autoCompleteService;

    public void setAutoCompleteService(AutoCompleteService autoCompleteService) {
        this.autoCompleteService = autoCompleteService;
    }

    @RequestMapping
    @ResponseBody
    public List<AutoComplete> autoComplete(AutoComplete autoCompleteParam) {
        return autoCompleteService.getAutoCompleteResultList(autoCompleteParam);
    }

}
