package com.threegrand.bison.personInfo.model;

/**
 * Created by Administrator on 2016/1/6.
 */
public class Tag {
    private int id;
    private int tagId;
    private String tagName;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }
}
