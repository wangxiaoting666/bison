package com.threegrand.bison.news.model;

import com.threegrand.bison.basic.model.DictName;
import com.threegrand.bison.basic.model.DictValue;
import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

/**
 * Created by Administrator on 2014/9/25.
 */
public class NewsType extends DataTablesPage {

    private String newsTypeId;
    private String moduleId;
    @NotBlank(message = "分类名称必须填写！")
    private String newsTypeName;
    private String sequence;
    private String state;


    public String getNewsTypeId() {
        return newsTypeId;
    }

    public void setNewsTypeId(String newsTypeId) {
        this.newsTypeId = newsTypeId;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getNewsTypeName() {
        return newsTypeName;
    }

    public void setNewsTypeName(String newsTypeName) {
        this.newsTypeName = newsTypeName;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }

    public String getStateName() {
        return DictValue.getDictValue(DictName.VIEWORNOT, state);
    }

}
