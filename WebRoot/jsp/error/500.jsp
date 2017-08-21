<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <title>500</title>
    <%@include file="../includes/head.jsp"%>
    <link href="<c:url value="/assets/admin/pages/css/error.css"/>" rel="stylesheet" type="text/css"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp"%>
<div class="page-container">
    <%@include file="../includes/sidebar.jsp"%>
    <div class="page-content-wrapper">
        <div class="page-content">
            <h3 class="page-title">
                500 ERROR
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="<c:url value="/"/>">主页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <span>500</span>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12 page-500">
                    <div class=" number">
                        500
                    </div>
                    <div class=" details">
                        <h3>Oops! 出错了！</h3>
                        <p>
                            请联系管理员,<br/>
                            或稍后重试。<br/><br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="../includes/footer.jsp"%>
<%@include file="../includes/bottomscript.jsp"%>
</body>
</html>