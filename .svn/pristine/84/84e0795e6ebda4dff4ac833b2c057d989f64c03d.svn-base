<%--@elvariable id="log" type="java.util.List<com.threegrand.bison.log.model.log>"--%>
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
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/bower_components/jquery-file-upload/css/jquery.fileupload.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css"/>"/>
    <link href="<c:url value="/assets/global/css/components.css"/>" rel="stylesheet" type="text/css"/>
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
                                <div class="btn-group">
                                    <div class="dropdown-menu hold-on-click dropdown-checkboxes pull-right"
                                         id="dataTableToggleColumn">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <c:forEach var="log" items="${log}">
                                    <div>
                                        <div><span>日期:</span><span>${log.createDate}</span></div>
                                        <div><span>内容:</span><span>${log.content}</span></div>
                                        <div><span>操作:</span><span>${log.operation}</span></div>
                                        <br/>
                                </c:forEach>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/footer.jsp"%>
<%@include file="../includes/bottomscript.jsp" %>
<script type="text/javascript" src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-process.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-validate.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/bower_components/ckeditor/ckeditor.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>

</body>
</html>