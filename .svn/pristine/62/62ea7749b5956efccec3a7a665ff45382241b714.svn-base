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
        <p class="banner_p">当前位置&gt;${title}</p>
    </div>
    <div id="details">
        <div class="left"><!--左侧菜单栏-->
            <ul class="liebiao">
            <#list singlePageList as singlePage>
            <#--todo 确定url地址-->
                <li><a href="${singlePage.alias}.html">${singlePage.title}</a></li>
            </#list>
            </ul>
        </div>
        <!--左侧菜单栏-->

        <div class="right"><!--右侧菜单栏-->
            <div id="solution">
                <div class="system">
                    <div class="recognition"
                         style="background:url('../img/nopic.jpg') top right no-repeat">
                        <a href="#" title="${title}">
                            <p>${content}</p>
                        </a>
                    </div>
                </div>
            </div>
            <!--右侧菜单栏-->
        </div>
    </div>
</div>
<!-- //content -->
<#include "include/foot.ftl"/>
</body>
</html>