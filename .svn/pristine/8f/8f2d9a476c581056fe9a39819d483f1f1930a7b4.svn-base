package com.threegrand.bison.news.model;

import com.threegrand.bison.common.ajax.DataTablesPage;
import com.threegrand.bison.design.model.NewsParamValue;
import org.hibernate.validator.constraints.NotBlank;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/9/23.文章实体类
 */
public class News extends DataTablesPage {
    //文章id
    private String newsId;
    @NotBlank(message = "文章分类不能为空！")
    private String newsTypeId;
    //html head中的title
    private String title;
    @NotBlank(message = "页面标题不能为空！")
    private String pageTitle;
    //摘要
    private String summary;
    //关键字
    private String keyword;
    //作者
    private String author;
    //外链
    private String link;
    //内容
    private String content;
    //标题图片
    private String image;
    //视频
    private String video;
    //发布时间
    private String publishTime;
    //文章属性-首页置顶
    private double indexSequence;
    //文章属性-列表置顶
    private double listSequence;
    //创建人
    private String creatorId;
    //创建时间
    private String createTime;
    //上次修改时间
    private String lastModifyTime;
    //上次修改人
    private String lastModifyOperator;
    //文章分类
    private NewsType newsType;
    //文章分类集合
    private List<String> newsTypeList;
    //文章变量集合
    private List<NewsParamValue> newsParamValueList;
    //文章变量
    private NewsParamValue newsParamValue;
    //文章变量Map集合
    private Map<String, List<NewsParamValue>> newsParamValueMap;

    public Map<String, List<NewsParamValue>> getNewsParamValueMap() {
        return newsParamValueMap;
    }

    public void setNewsParamValueMap(Map<String, List<NewsParamValue>> newsParamValueMap) {
        this.newsParamValueMap = newsParamValueMap;
    }

    public NewsParamValue getNewsParamValue() {
        return newsParamValue;
    }

    public void setNewsParamValue(NewsParamValue newsParamValue) {
        this.newsParamValue = newsParamValue;
    }

    public String getNewsId() {
        return newsId;
    }

    public void setNewsId(String newsId) {
        this.newsId = newsId;
    }

    public String getNewsTypeId() {
        return newsTypeId;
    }

    public void setNewsTypeId(String newsTypeId) {
        this.newsTypeId = newsTypeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(String publishTime) {
        this.publishTime = publishTime;
    }

    public double getIndexSequence() {
        return indexSequence;
    }

    public void setIndexSequence(double indexSequence) {
        this.indexSequence = indexSequence;
    }

    public double getListSequence() {
        return listSequence;
    }

    public void setListSequence(double listSequence) {
        this.listSequence = listSequence;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getLastModifyTime() {
        return lastModifyTime;
    }

    public void setLastModifyTime(String lastModifyTime) {
        this.lastModifyTime = lastModifyTime;
    }

    public String getLastModifyOperator() {
        return lastModifyOperator;
    }

    public void setLastModifyOperator(String lastModifyOperator) {
        this.lastModifyOperator = lastModifyOperator;
    }

    public NewsType getNewsType() {
        return newsType;
    }

    public void setNewsType(NewsType newsType) {
        this.newsType = newsType;
    }

    public List<String> getNewsTypeList() {
        return newsTypeList;
    }

    public void setNewsTypeList(List<String> newsTypeList) {
        this.newsTypeList = newsTypeList;
    }

    public List<NewsParamValue> getNewsParamValueList() {
        return newsParamValueList;
    }

    public void setNewsParamValueList(List<NewsParamValue> newsParamValueList) {
        this.newsParamValueList = newsParamValueList;
    }
}
