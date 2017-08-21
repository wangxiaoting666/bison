package com.threegrand.bison.system.model;

import com.threegrand.bison.basic.model.DictName;
import com.threegrand.bison.basic.model.DictValue;
import com.threegrand.bison.common.ajax.DataTablesPage;
import org.hibernate.validator.constraints.NotBlank;

public class Dict extends DataTablesPage {
    private String description;
    private String dictId;
    @NotBlank(message = "字典名称名不能为空！")
    private String dictName;
    @NotBlank(message = "字典编码名不能为空！")
    private String dictCode;
    @NotBlank(message = "字典值不能为空！")
    private String dictValue;
    private String sequence;
    private String systemOrNot;
    private String companyId;
    private String state;

    public String getDictId() {
        return dictId;
    }

    public void setDictId(String dictId) {
        this.dictId = dictId;
    }

    public String getDictName() {
        return dictName;
    }

    public void setDictName(String dictName) {
        this.dictName = dictName;
    }

    public String getDictCode() {
        return dictCode;
    }

    public void setDictCode(String dictCode) {
        this.dictCode = dictCode;
    }

    public String getDictValue() {
        return dictValue;
    }

    public void setDictValue(String dictValue) {
        this.dictValue = dictValue;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }

    public String getSystemOrNot() {
        return systemOrNot;
    }

    public void setSystemOrNot(String systemOrNot) {
        this.systemOrNot = systemOrNot;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStateName() {
        return DictValue.getDictValue(DictName.USEORNOT, state);
    }

    public String getSystemOrNotName() {
        return DictValue.getDictValue(DictName.VIEWORNOT, systemOrNot);
    }
}
