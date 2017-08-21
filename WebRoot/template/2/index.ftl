<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xml:lang="zh" xmlns="http://www.w3.org/1999/xhtml" lang="zh">
<head>
<#include "include/title.ftl"/>
</head>
<body>
<#include "include/head.ftl"/>

<link type="text/css" rel="stylesheet" href="${sysParam.basePath}css/indexs.css">

<div id="zhuyao" class="clr">
    <div class="xinwenba fl">
        <div class="logos1"></div>
        <div class="xyxw">学院新闻</div>
        <div class="xline"></div>
        <div class="xunhuan">
            <div class="Pa">
                <div class="img">
                <#list schoolNewsIndexList as news>
                    <a href="${sysParam.basePath}schoolNews/detail${news.newsId}.html"><img src="<#if news.image?? >${news.image}<#else>nopic.jpg</#if>" title="${news.title}" width="148" height="148"/></a>
                    <#if news_index==2><#break></#if>
                </#list>
                </div>
                <div class="ul">
                    <ul class="No">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div id="yntz" class="fl">
        <div class="logos2"></div>
        <div class="yntzz">教育创新</div>
        <div class="xian2"></div>
        <div class="wenzi1">
            <span class="a1"><b>传播正能量、 展望新未来—纪念研究生院建院30周年软件学院学术讲座</b></span><p class="a2">2014年9月26日晚，我院邀请中国人民财产保险股份有限公司吉林省分公司副总经理王曙光老师，以"一切都是你的选择"为主题，在计算机大楼B108进行了讲座，为大家分享了自己的经验和观点。
            作为毕业于吉林大学的校友，王曙光老师首先回顾并分享了自己当年在学校的学习和生活，为在校期间的同学们提出了宝贵的意见和建议，他强调只有不断地让自己变的优秀，通过理论与实践相结合，打开视野，放眼未来..</p>

        </div>
        <div class="btns">
            <input type="button" class="buttonLeft" />
            <input type="button" class="buttonRight"/>
        </div>

    </div>

    <div class="clr"></div>
    <div id="tongzhi" class="fl">
        <div class="logos10"></div>
        <div class="tongshz">学院通知</div>
        <div class="tongline"></div>
    <#list collegeNoticeTypeList as newsType>
        <div class="tongduo1"><span class="bbb"><a href="${sysParam.basePath}collegeNotice/${newsType.newsTypeId}list1.html">more</a></span></div>
        <#if newsType_index==0><#break></#if>
    </#list>
        <div class="tongzhinew">
            <ul class="lists">
            <#list collegeNoticeIndexList as news>
                <li class="gao">
                    <span class="gao_r">${news.publishTime?date}</span>
                    <span class="biao1"><img src="${sysParam.basePath}img/xiaobiao_07.gif"/>
                    </span>
                    <a href="${sysParam.basePath}collegeNotice/detail${news.newsId}.html">
                        <span class="gao_l">
                            <#if news.pageTitle?length lt 20>
                            ${news.pageTitle}...
                            <#else>
                            ${news.pageTitle[0..19]}...
                            </#if>
                        </span></a>
                </li>
                <#if news_index==5><#break></#if>
            </#list>
            </ul>
        </div>

    </div>

    <div id="kuaixun" class="fl">
        <div class="kuai1"></div>
        <div class="kuai2">学院快讯</div>
        <div class="kuailine"></div>
    <#list collegeExpressTypeList as newsType>
        <div class="kuaiduo"><span class="bbs"><a href="${sysParam.basePath}collegeExpress/${newsType.newsTypeId}list1.html">more</a></span></div>
        <#if newsType_index==0><#break></#if>
    </#list>
        <div class = "kuainews">
            <ul class="huolists">
            <#list collegeExpressIndexList as news>
                <li class="gao">
                    <span class="gao_r">${news.publishTime?date}</span>
                    <span class="biao2"><img src="${sysParam.basePath}img/xiaobiao_07.gif"/>
                    </span>
                    <a href="${sysParam.basePath}collegeExpress/detail${news.newsId}.html">
                        <span class="gao_l">
                            <#if news.pageTitle?length lt 20>
                            ${news.pageTitle}...
                            <#else>
                            ${news.pageTitle[0..19]}...
                            </#if>
                        </span></a>
                </li>
                <#if news_index==5><#break></#if>
            </#list>
            </ul>
        </div>

    </div>



    <div class="clr"></div>

    <div id="zhaosheng" class="fl">
        <div class="logos4"></div>
        <div class="xyzshz">学院招生</div>
        <div class="zsline"></div>
    <#list recruitTypeList as newsType>
        <div class="gengduo1"><span class="bbb"><a href="${sysParam.basePath}recruit/${newsType.newsTypeId}list1.html">more</a></span></div>
        <#if newsType_index==0><#break></#if>
    </#list>

        <div class="zhaoshengnew">
            <ul class="lists">
            <#list recruitIndexList as news>
                <li class="gao">
                    <span class="gao_r">${news.publishTime?date}</span>
                    <span class="biao1"><img src="${sysParam.basePath}img/xiaobiao_07.gif"/>
                    </span>
                    <a href="${sysParam.basePath}recruit/detail${news.newsId}.html">
                        <span class="gao_l">
                            <#if news.pageTitle?length lt 20>
                            ${news.pageTitle}...
                            <#else>
                            ${news.pageTitle[0..19]}...
                            </#if>
                        </span></a>
                </li>
            </#list>
            </ul>
        </div>
    </div>


    <div id="huodong" class="fl">
        <div class="huo1"></div>
        <div class="huo2">学生活动</div>
        <div class="huoline"></div>
    <#list studentActivityTypeList as newsType>
        <div class="huoduo"><span class="bbs"><a href="${sysParam.basePath}studentActivity/${newsType.newsTypeId}list1.html">more</a></span></div>
        <#if newsType_index==0><#break></#if>
    </#list>

        <div class = "huonews">
            <ul class="huolists">
            <#list studentActivityIndexList as news>
                <li class="gao">
                    <span class="gao_r">${news.publishTime?date}</span>
                    <span class="biao2"><img src="${sysParam.basePath}img/xiaobiao_07.gif"></span>
                    <a href="<?{url url = "${sysParam.basePath}recruit/detail${news.newsId}.html">
                    <span class="gao_l">$
                        <#if news.pageTitle?length lt 20>
                        ${news.pageTitle}...
                        <#else>
                        ${news.pageTitle[0..19]}...
                        </#if>
                    </span></a>
                </li>
            </#list>
            </ul>
        </div>
    </div>

</div>



<#include "include/foot.ftl"/>
</body>
</html>


