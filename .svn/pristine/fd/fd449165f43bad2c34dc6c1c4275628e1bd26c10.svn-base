<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ThreeGrand</title>
    <link href="${sysParam.basePath}css/main.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}css/default.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}css/main1.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}css/bar.css" rel="stylesheet" type="text/css"/>
    <link href="${sysParam.basePath}css/settings.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="${sysParam.basePath}js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}js/main.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}js/jquery.themepunch.plugins.min.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}js/jquery.themepunch.revolution.min.js"></script>
    <script type="text/javascript" src="${sysParam.basePath}js/jquery.themepunch.tools.min.js"></script>
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

    <div class="main">
        <div class="fullwidthabnner">
            <ul id="revolutionul">
                <li data-transition="fade" data-slotamount="8" data-masterspeed="700" data-delay="9400">
                    <img src="${sysParam.basePath}img/banner.gif"/>
                </li>
                <li data-transition="fade" data-slotamount="8" data-masterspeed="700" data-delay="9400">
                    <img src="${sysParam.basePath}img/banner2.gif"/>
                </li>
                <li data-transition="fade" data-slotamount="8" data-masterspeed="700" data-delay="9400">
                    <img src="${sysParam.basePath}img/banner3.gif"/>
                </li>
            </ul>
            <div class="tp-bannertimer tp-bottom"></div>
        </div>
    </div>
    <div class="case">
        <div class="case_main">
            <h2><img src="${sysParam.basePath}img/h2_case.gif"/></h2>

            <div class="case_left">
                <ul>
                <#list anliIndexList as news>
                    <a href="${sysParam.basePath}anli/detail${news.newsId}.html">
                        <li>
                            <#if news.pageTitle?length lt 16>
                                ${news.pageTitle}
                                <#else>
                            ${news.pageTitle[0..15]}
                            </#if>
                        </li>
                    </a>
                    <#if news_index==4><#break></#if>
                </#list>
                </ul>
            </div>
            <div class="case_right"><img src="${sysParam.basePath}img/demo.gif"></div>
            <div class="more_blue"><a href="${sysParam.basePath}anli/list1.html"><img src="${sysParam.basePath}img/more_blue.gif"/></a>
            </div>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
    <div class="scheme">
        <div class="scheme_main">
            <h2><img src="${sysParam.basePath}img/h2_scheme.gif"/><a href="${sysParam.basePath}jiejuefangan/list1.html"><img
                    src="${sysParam.basePath}img/moer_black.gif" class="more_black" alt="button"/></a></h2>
            <ul>
            <#list jiejuefanganIndexList as news >
                <li>
                    <img src="${sysParam.basePath}img/<#if news.image?? >${news.image}<#else>assets/loader2.gif</#if>"
                         title="${news.title}"
                         width="148" height="148"/><br/>
                    <span>${news.title}</span>
                </li>
                <#if news_index==3><#break></#if>
            </#list>
            </ul>
        </div>
    </div>
    <div class="news">
        <div class="news_main">
            <h2><img src="${sysParam.basePath}img/h2_news.gif" alt="news"/><a href="${sysParam.basePath}xinwen/list1.html"><img
                    src="${sysParam.basePath}img/more_orange.gif" class="more_orange" alt="button"/></a></h2>

            <div class="news_main_center">
                <div class="news_left"><img src="${sysParam.basePath}img/news_show.gif" alt="news"/></div>
                <ul>
                <#list xinwenIndexList as news>
                    <a href="xinwen/detail${news.newsId}.html">
                        <li>
                            <#if news.summary?length lt 20>
                            ${news.summary}
                            <#else>
                            ${news.summary[0..19]}
                            </#if>
                        </li>
                    </a>
                    <#if news_index==4><#break></#if>
                </#list>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- //content -->
<#include "include/foot.ftl"/>
</body>
</html>