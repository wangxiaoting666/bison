package com.threegrand.bison.keyWord.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

/**
 * Created by Administrator on 2014/11/3.
 * User: 宗晓宇
 * Date: 2014/11/3
 * Time: 11:09
 */
public class KeyWordShield extends DataTablesPage {
    private String keyWordShieldId;
    private String companyId;
    private String keyWord;
    private String replaceWord;

    public String getKeyWordShieldId() {
        return keyWordShieldId;
    }

    public void setKeyWordShieldId(String keyWordShieldId) {
        this.keyWordShieldId = keyWordShieldId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    public String getReplaceWord() {
        return replaceWord;
    }

    public void setReplaceWord(String replaceWord) {
        this.replaceWord = replaceWord;
    }
}
