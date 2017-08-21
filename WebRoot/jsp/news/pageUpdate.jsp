<%--@elvariable id="newsTypeList" type="java.util.List<com.threegrand.bison.security.model.NewsType>"--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <%@include file="../includes/head.jsp" %>
    <title>${menu.menuName}</title>
    <link rel="stylesheet" type="text/css"
          href="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>"/>
    <link rel="stylesheet" type="text/css"
          href="<c:url value="/js/bower_components/jquery-file-upload/css/jquery.fileupload.css"/>"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp"%>
<div class="page-container">
<%@include file="../includes/sidebar.jsp"%>
    <div class="page-content-wrapper">
        <div class="page-content">
            <%@include file="../includes/current.jsp" %>
            <div class="row">
                <div class="col-md-12">
                    <div class="portlet">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="${menu.icon}"></i>${menu.menuName}
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                            </div>
                            <div class="actions">
                                <a href="javascript:;" class="btn default yellow-stripe" id="updateIndexPage"><i
                                        class="fa fa-refresh"></i><span class="hidden-480"> 更新首页</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="updateListPage"><i
                                        class="fa fa-refresh"></i><span class="hidden-480"> 更新列表页</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="updateContentPage"><i
                                        class="fa fa-refresh"></i><span class="hidden-480"> 更新内容页</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="updateSinglePage"><i
                                        class="fa fa-refresh"></i><span class="hidden-480"> 更新单页</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="moduleCopy"><i
                                        class="fa fa-refresh"></i><span class="hidden-480"> 复制模板</span></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/footer.jsp"%>
<%@include file="../includes/footer.jsp" %>
<%@include file="../includes/bottomscript.jsp" %>
<script src="<c:url value="/js/news/pageUpdate.js"/>"></script>
<script type="text/javascript">
    $(function () {
        pageUpdate.init();
    });
</script>
</body>
</html>