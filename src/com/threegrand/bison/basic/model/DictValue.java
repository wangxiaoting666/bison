package com.threegrand.bison.basic.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DictValue {

    public static Map<String, List<DictValue>> dictValueMapList;
    public static Map<String, Map<String, DictValue>> dictValueMap;
    private String dictName;
    private String dictCode;
    private String dictValue;
    private String state;
    private String sequence;

    /**
     * 通过字典名称取得字典值map
     *
     * @param dictName 字典名称
     * @return List
     */
    public static Map<String, DictValue> getDictValueMapByName(String dictName) {
        Map<String, DictValue> map = new HashMap<String, DictValue>();
        map.putAll(dictValueMap.get(dictName));
        return map;
    }

    /**
     * 根据dictName获取dictValueList
     *
     * @param dictName 字典名称
     * @return List<DictValue>
     */
    public static List<DictValue> getDictValueList(String dictName) {
        List<DictValue> list = new ArrayList<DictValue>();
        list.addAll(dictValueMapList.get(dictName));
        return list;
    }

    /**
     * 根据dictName，dictCode获取dictValue
     *
     * @param dictName 字典名称
     * @param dictCode 字典代码
     * @return dictValue
     */
    public static String getDictValue(String dictName, String dictCode) {
        try {
            return getDictValueMapByName(dictName).get(dictCode).getDictValue();
        } catch (NullPointerException e) {
            return "";
        }
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }
}