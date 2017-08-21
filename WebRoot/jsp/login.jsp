<%--@elvariable id="message" type="java.lang.String"--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <title>登录</title>
    <%@include file="includes/head.jsp"%>
    <link href="<c:url value="/assets/admin/pages/css/login-soft.css"/>" rel="stylesheet" type="text/css"/>
</head>
<body class="login">
<div class="logo">
   <%--  <img src="<c:url value="/img/logo.png"/>" style="height:17px" alt=""/> --%>
     <center><font  color="white"  style="font-family: KaiTi; font-size:20px;">经管学部实验中心实验室资产管理平台</font></center>
</div>
<div class="menu-toggler sidebar-toggler">
</div>
<div class="content">
<!-- BEGIN LOGIN FORM -->
<form class="login-form" action="<c:url value="/login"/>" method="post">
    <h3 class="form-title"><spring:message code="loginToYourAccount"/></h3>
    <div class="alert alert-danger display-hide">
        <button class="close" data-close="alert"></button>
			<span><spring:message code="enterAnyUsernameAndPassword"/></span>
    </div>
    <div class="form-group">
        <label class="control-label visible-ie8 visible-ie9"><spring:message code="username"/></label>
        <div class="input-icon">
            <i class="fa fa-user"></i>
            <input class="form-control placeholder-no-fix" type="text" autocomplete="off"
                   placeholder="<spring:message code="username"/>" name="loginName" id="loginName" value=""/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label visible-ie8 visible-ie9"><spring:message code="password"/></label>
        <div class="input-icon">
            <i class="fa fa-lock"></i>
            <input id="password" class="form-control placeholder-no-fix" type="password" autocomplete="off"
                   placeholder="<spring:message code="password"/>" name="password" value=""/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label visible-ie8 visible-ie9"><spring:message code="password"/></label>
        <div class="input-icon col-md-6" style="padding:0;">
            <i class="fa fa-code"></i>
            <input id="idenCode" class="form-control placeholder-no-fix" type="text" autocomplete="off"
                   placeholder="验证码" name="code" value=""/>
        </div>
        <div class="col-md-6">
        	<img id="vcode" style="vertical-align: middle;" title="点击更换" alt="验证图片" src="<c:url value="/captcha/idenCode"/>" height="35" width="85">
        </div>
    </div>
    <div class="form-actions">
        <label class="checkbox">
            <input id="checkbox" type="checkbox" name="remember" value="1"/><spring:message code="rememberMe"/></label>
        <button type="button" id="loginBtn" class="btn blue pull-right"><spring:message code="login"/><i class="m-icon-swapright m-icon-white"></i>
        </button>
    </div>
</form>
<!-- END LOGIN FORM -->
</div>
<div class="copyright">
    <!-- Copyright © 2015-2016 懋特(上海)物联网科技有限公司 -->
     <font color="white"   style="font-family: KaiTi;  font-size:16px; ">
     华东师范大学经济与管理学部实验中心<br/>
    </font>
    <div  style="margin-top:180px;">
    <font color="white"   style="font-family: KaiTi; font-size:16px;  ">  地址: 上海市东川路500号
    &nbsp;邮箱: shixun@bs.ecnu.cn
   &nbsp; 电话: 021-6223 3138<br/>
   Copyright ©2017-2020. All rights reserved.
    本平台受2017年度实验室教学设备研制项目"基于WiFi定位的实验室资产管理平台研发"立项资助
    </font>
    </div>
</div>
<!-- <div class="copyright">V 1.0.0.2</div> -->
<%@include file="includes/bottomscript.jsp"%>
<script src="<c:url value="/js/bower_components/jquery-backstretch/jquery.backstretch.min.js"/>" type="text/javascript"></script>
<script src="<c:url value="/js/login.js"/>" type="text/javascript"></script>
<script src="<c:url value="/js/jquery.cookie.js"/>" type="text/javascript"></script>
<script>
    $(function(){
        Login.init();
        <c:if test="${message!=null}">
            toast.error("${message}");
        </c:if>
        
        $('#vcode').click(function () { 
            $(this).attr('src', '${ctx}/captcha/idenCode?' + Math.floor(Math.random()*100) ); 
        })
        $("#idenCode").blur(function(){
        	
        });
    })
    
    

    
</script>
</body>
</html>