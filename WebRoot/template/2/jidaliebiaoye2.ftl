<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xml:lang="zh" xmlns="http://www.w3.org/1999/xhtml" lang="zh">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<#include "include/title.ftl"/>
</head>
<body>
<#include "include/head.ftl"/>

<link type="text/css" rel="stylesheet" href="${sysParam.basePath}css/jiaoyu.css">
<div id="content">
    <div class="con_up"><span class="con_up_s1">当前位置＞</span><span class="con_up_s2">教育</span></div>
    <div class="con_down">
        <div class="con_down_left">
         <#list collegeEducationTypeList as newsType>
            <div  class="left1"><span><a href="${sysParam.basePath}collegeEducation/${newsType.newsTypeId}list1.html">本科生教育</a></span></div>
             <#if newsType_index==0><#break></#if>
        </#list>
         <#list graduateEducationTypeList as newsType>
            <div  class="left2"><span><a href="${sysParam.basePath}graduateEducation/${newsType.newsTypeId}list1.html">研究生教育</a></span></div>
             <#if newsType_index==0><#break></#if>
        </#list>
        </div>
        <div class="con_down_right conDown00">
            <div class="right1">
                <ul>
            <#list pageList as news>
                <#list pageTypeList as newsType>
                   <#if news.newsTypeId==newsType.newsTypeId>
                    <li><span><a class="no_bg1" href="${sysParam.basePath}${pageModule.alias}/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a></span>
                    </li>
                   <#else>
                    <li><span><a href="${sysParam.basePath}${pageModule.alias}/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a></span>
                    </li>
                    </#if>
                </#list>
                <#if news_index==0><#break></#if>
            </#list>
                </ul>
            </div>

            <div class="downR downR00">
                <div class="right2">
                    <ul>

                    <#list pageList as news>
                        <li><span class="r_l"></span><span class="r_m"><a  href="detail${news.newsId}.html">${news.pageTitle}</a></span><span
                                class="r_r">${news.publishTime}</span></li>
                    </#list>

                    </ul>
                </div>
                <div class="right3">
                    <ul>
                        <li><span>共${totalResult}条记录 <a href="${firstPageUrl}">首页</a> <a href="${prePageUrl}">上一页</a> <a href="${nextPageUrl}">下一页</a> <a href="${endPageUrl}">尾页</a> 页次${pageNum}/${totalPage}</span></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>

<#include "include/foot.ftl"/>
</body>
</html>


