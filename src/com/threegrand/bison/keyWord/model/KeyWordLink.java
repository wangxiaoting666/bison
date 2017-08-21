package com.threegrand.bison.keyWord.model;

import com.threegrand.bison.common.ajax.DataTablesPage;

/**
 * Created by Administrator on 2014/11/3.
 * User: 宗晓宇
 * Date: 2014/11/3
 * Time: 16:20
 */
public class KeyWordLink extends DataTablesPage {
    private String keyWordLinkId;
    private String companyId;
    private String keyWord;
    private String keyWordLink;

    public String getKeyWordLinkId() {
        return keyWordLinkId;
    }

    public void setKeyWordLinkId(String keyWordLinkId) {
        this.keyWordLinkId = keyWordLinkId;
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

    public String getKeyWordLink() {
        return keyWordLink;
    }

    public void setKeyWordLink(String keyWordLink) {
        this.keyWordLink = keyWordLink;
    }
}
