<%--@elvariable id="templateList" type="java.util.List<com.threegrand.bison.design.model.Template>"--%>
<%--@elvariable id="indexTemplate" type="java.lang.String"--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <%@include file="../includes/head.jsp"%>
    <title>${menu.menuName}</title>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp"%>
<div class="page-container">
<%@include file="../includes/sidebar.jsp"%>
    <div class="page-content-wrapper">
        <div class="page-content">
            <%@include file="../includes/current.jsp"%>
            <div class="portlet box blue ">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-gift"></i> 首页模板
                    </div>
                    <div class="tools">
                        <a href="" class="collapse">
                        </a>
                        <a href="" class="remove">
                        </a>
                    </div>
                </div>
                <div class="portlet-body form">
                    <form id="dialogForm" class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="col-md-3 control-label">首页模板</label>
                                <div class="col-md-4">
                                    <select class="form-control form-filter input-sm gAuto"  id="templateNameQuery" name="templateNameQuery">
                                        <c:forEach var="template" items="${templateList}">
                                            <option value="${template.templateId}" <c:if test="${template.templateId==indexTemplate}">selected="selected"</c:if>>${template.templateName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="col-md-offset-4 col-md-12">
                                    <button type="button" class="btn blue" id="updateBtn">保存</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="../includes/footer.jsp"%>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/bottomscript.jsp"%>
<script src="<c:url value="/js/design/indexTemplate.js"/>"></script>
<script type="text/javascript">
    $(function(){
        indexTemplateListTable.init();
    });
</script>
</body>
</html>