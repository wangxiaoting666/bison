<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xml:lang="zh" xmlns="http://www.w3.org/1999/xhtml" lang="zh">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<#include "include/title.ftl"/>
</head>
<body>
<#include "include/head.ftl"/>

<link type="text/css" rel="stylesheet" href="${sysParam.basePath}css/indexs.css">
<div id="content">
    <div id="work">
        <h2>当前位置>学院工作</h2>
        <div class="functions">
            <ul class="ul-menu">
            <#list pageList as news>
                <#list pageTypeList as newsType>
                    <#if news.newsTypeId==newsType.newsTypeId>
                        <li class="li2"><a href="${sysParam.basePath}${pageModule.alias}/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a></li>
                         <#else>
                        <li class="li1"><a href="${sysParam.basePath}${pageModule.alias}/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a></li>
                    </#if>
                </#list>
                <#if news_index==0><#break></#if>
            </#list>
            </ul>
            <ul class="text menu00">
                <#list pageList as news>
                     <li><a href="detail${news.newsId}.html"><span class="span1">${news.publishTime}</span><span>${news.pageTitle}</span></a></li>
                </#list>
            </ul>
        </div>
        <div class="workPagination">共${totalResult}条记录 <a href="${firstPageUrl}">首页</a> <a href="${prePageUrl}">上一页</a> <a href="${nextPageUrl}">下一页</a> <a href="${endPageUrl}">尾页</a> 页次${pageNum}/${totalPage}</div>
    </div>

</div>
<#include "include/foot.ftl"/>
</body>
</html>


