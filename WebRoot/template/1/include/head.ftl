<div id="head">
    <h1>
        <div class="logo">
            <a href="<?{url url='/'}?>">
                <img src="${sysParam.basePath}img/logo.gif"/>
            </a>
        </div>
        <div class="nav">
            <ul>
                <li><a href="${sysParam.basePath}index.html">首页<br/><span>HOME</span></a></li>
                <li>
                    <a href="?act=single&detail=jianjie">简介<br/><span>INTRODUCTION</span></a>
                </li>
                <li>
                    <a href="${sysParam.basePath}jiejuefangan/list1.html">解决方案<br/><span>SOLUTION</span></a>
                    <ul class="nav_list">
                    <#list jiejuefanganTypeList as newsType>
                        <li>
                            <a href="${sysParam.basePath}jiejuefangan/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a>
                        </li>
                    </#list>
                    </ul>
                </li>
                <li>
                    <a href="index.do?act=list&module=anli">案例<br/><span>CASE</span></a>
                    <ul class="nav_list">
                    <#list anliTypeList as newsType>
                        <li>
                            <a href="${sysParam.basePath}anli/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a>
                        </li>
                    </#list>
                    </ul>
                </li>
                <li>
                    <a href="${sysParam.basePath}singlePage/${zhaopinsinglePage.alias}.html">招聘<br/><span>JOBS</span></a>
                </li>
                <li>
                    <a href="${sysParam.basePath}xinwen/list1.html">新闻<br/><span>NEWS</span></a>
                    <ul class="nav_list">
                    <#list xinwenTypeList as newsType>
                        <li>
                            <a href="${sysParam.basePath}xinwen/${newsType.newsTypeId}list1.html">${newsType.newsTypeName}</a>
                        </li>
                    </#list>
                    </ul>
                </li>
                <li>
                    <a href="${sysParam.basePath}singlePage/${lianxiwomensinglePage.alias}.html">联系我们<br/><span>CONTACT</span></a>
                </li>
            </ul>
        </div>
    </h1>
</div>