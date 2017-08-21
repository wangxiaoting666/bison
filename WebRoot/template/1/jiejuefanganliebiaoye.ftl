<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ThreeGrand</title>
    <link href="${sysParam.basePath}/css/main.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}/css/default.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}/css/main1.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}/css/bar.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}/css/settings.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}/css/demo.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="${sysParam.basePath}/js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}/js/main.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}/js/jquery.themepunch.plugins.min.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}/js/jquery.themepunch.revolution.min.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}/js/jquery.themepunch.tools.min.js"></script>
</head>
<body>
<#include "include/head.ftl"/>
<!--[if IE 7]>
<style>
    .system {
        width: 100%;
        padding-bottom: 30px;
        padding-left: 15px;
    }
</style>
<![endif]-->
<!-- content -->
<div id="content">
    <div class="banner_solution">
        <p class="banner_p">当前位置&gt;${pageModule.moduleName}&gt;${pageNewsTypeName}</p>
    </div>
    <div id="details">
        <div class="left"><!--左侧菜单栏-->
            <ul class="liebiao">
            <#list pageTypeList as newsType>
                <!--todo 确定url地址-->
                <li>
                    <a href="${sysParam.basePath}jiejuefangan/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a>
                </li>
            </#list>
            </ul>
        </div>
        <!--左侧菜单栏-->

        <div class="right"><!--右侧菜单栏-->
            <div id="solution">
            <#list pageList as news>
                <div class="system">
                    <div class="recognition"
                         style="background:url('${sysParam.basePath}/img/<#if news.image?? >${news.image}<#else>assets/loader2.gif</#if>') top right no-repeat">
                        <a href="detail${news.newsId}.html" title="${news.title}">
                            <p>
                                <#if news.pageTitle?length lt 8>
                                    ${news.pageTitle}
                                <#else>
                                ${news.pageTitle[0..7]}
                                </#if>
                            </p>
                        </a>
                    </div>
                    <a href="detail${news.newsId}.html" title="${news.title}"

                    <p class="text">${news.summary}</p>
                    </a>
                </div>
            </#list>
                <div class="pagination">
                    <ul>
                        <span class="center">
                            <a href="${firstPageUrl}">
                                <li class="li_04">始页</li>
                            </a>
                            <li class="li_01">
                                <a href="${prePageUrl}">&lt;</a>
                            <@prePage label='<a href="#url">#pageNum</a>' repeat="5"> </@prePage>
                                <span class="current">${pageNum}</span>
                            <@afterPage label='<a href="#url">#pageNum</a>' repeat="5"/>
                                <a href="${nextPageUrl}">&gt;</a>
                            </li>
                            <a href="${endPageUrl}">
                                <li class="li_04">末页</li>
                            </a>
                        </span>
                        总计${totalResult}条，共${totalPage}页
                    </ul>
                </div>
            </div>
        </div>
        <!--右侧菜单栏-->
    </div>
</div>
<!-- //content -->
<#include "include/foot.ftl"/>
</body>
</html>