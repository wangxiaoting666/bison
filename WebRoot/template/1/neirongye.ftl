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
    <link href="${sysParam.basePath}css/demo.css" rel="stylesheet" type="text/css"/>
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
    <div class="banner_forecast">
        <p class="banner_p">当前位置&gt;${news.title}&gt;详细页</p>
    </div>

    <div id="forecast">
        <h1>${news.pageTitle}</h1>

        <p class="pl">
            发表时间：${news.publishTime}
            浏览次数：
            <script language='javascript' src='../../plug-in/click/getclick.php?module_id=solution&id=26'></script>
            【<a href="javascript:window.print();">打印</a> <a href='/html/solution-1/26.doc'>DOC</a>】
        </p>

        <p class="text">${news.content}<br/></p>

    </div>
    <!-- //content -->
<#include "include/foot.ftl"/>
</body>
</html>