<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xml:lang="zh" xmlns="http://www.w3.org/1999/xhtml" lang="zh">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<#include "include/title.ftl"/>
</head>
<body>
<#include "include/head.ftl"/>

<link type="text/css" rel="stylesheet" href="${sysParam.basePath}css/indexs.css">

<div id="contant">
    <h2 class="xiaobiaoti">当前位置>${pageModule.moduleName}</h2>
    <div class="idContainer4">
        <ul class="menus">
            <#list pageList as news>
                <#list pageTypeList as newsType>
                    <#if news.newsTypeId=newsType.newsTypeId>
                             <li><a class="menu1" href="${sysParam.basePath}${pageModule.alias}/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a></li>
                       <#else>
                             <li><a class="menu2" href="${sysParam.basePath}${pageModule.alias}/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a></li>
                    </#if>
                </#list>
                <#if news_index==0><#break></#if>
            </#list>
        </ul>

    </div>

    <div class="xian"></div>
    <div class = "contructionnews">
        <ul class="ZGlists">
            <#list pageList as news>
            <li><a href="detail${news.newsId}.html">${news.pageTitle}<span>${news.publishTime}</span></a></li>
            </#list>
        </ul>
    </div>
    <div class="fenye">共${totalResult}条记录 <a href="${firstPageUrl}">首页</a> <a href="${prePageUrl}">上一页</a> <a href="${nextPageUrl}">下一页</a> <a href="${endPageUrl}">尾页</a> 页次${pageNum}/${totalPage}</div>
</div>

<#include "include/foot.ftl"/>
</body>
</html>


