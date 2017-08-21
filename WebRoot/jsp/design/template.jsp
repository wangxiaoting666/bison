<%--@elvariable id="roleList" type="java.util.List<com.threegrand.bison.security.model.Role>"--%>
<%--@elvariable id="templateTypeList" type="java.util.List<com.threegrand.bison.basic.model.DictValue>"--%>
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
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css"/>"/>
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
                                <a href="javascript:;" class="btn default yellow-stripe" id="uploadZip"><i
                                        class="fa fa-plus"></i><span class="hidden-480"> 上传模板</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="addTemplate"><i
                                        class="fa fa-plus"></i><span class="hidden-480"> 添加模板</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i
                                        class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>

                               
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>模板名</th>
                                        <th>模板类型</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr role="row" class="filter">
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm gAuto"
                                                   autoFlag="gAutoTemplateName" name="templateNameQuery"
                                                   id="templateNameQuery">
                                        </td>
                                        <td>
                                            <select class="form-control form-filter input-sm gAuto"
                                                    name="templateTypeQuery" id="templateTypeQuery">
                                                <option value="">全部</option>
                                                <c:forEach var="templateType" items="${templateTypeList}">
                                                    <option value="${templateType.dictCode}">${templateType.dictValue}</option>
                                                </c:forEach>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="margin-bottom-5">
                                                <a class="btn btn-sm yellow filter-submit margin-bottom">
                                                    <i class="fa fa-search"></i>查询</a>
                                                <a class="btn btn-sm red filter-cancel">
                                                    <i class="fa fa-refresh"></i>重置</a>
                                            </div>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade bs-modal-lg" id="modalDialog" tabindex="-1" data-keyboard="false" aria-hidden="true"
     data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" id="modalContent">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title" id="modalTitle"></h4>
            </div>
            <div class="modal-body form">
                <form id="dialogForm" class="form-horizontal">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">模板名<span class="required"> * </span></label>

                                    <div class="col-md-8">
                                        <input type="hidden" id="templateId">
                                        <input type="text" class="form-control input-medium" placeholder="模板名"
                                               id="templateName" name="templateName">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">模板类型<span class="required"> * </span></label>

                                    <div class="col-md-8">
                                        <select class="form-control input-medium" placeholder="模板类型" id="templateType"
                                                name="templateType">
                                            <c:forEach var="templateType" items="${templateTypeList}">
                                                <option value="${templateType.dictCode}">${templateType.dictValue}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">模板别名<span class="required"> * </span></label>

                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="模板别名"
                                               id="templateAlias" name="templateAlias">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-md-4 control-label" style="width:151px">模板内容<span
                                            class="required"> * </span></label>

                                    <div class="col-md-8" style="width:724px">
                                        <textarea class="form-control" placeholder="模板内容"
                                                  id="content" name="content" style="width:694px;height:300px">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn blue" id="addBtn">保存</button>
                <button type="button" class="btn blue" id="updateBtn">保存</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade bs-modal-lg" id="uploadTemplateDialog" tabindex="-1" data-keyboard="false" aria-hidden="true"
     data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">上传模板</h4>
            </div>
            <div class="modal-body form">
                <form class="form-horizontal">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-md-4 control-label" style="width:151px">上传模板<span
                                            class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail" style="width: 120px; height: 20px;">
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail"
                                                 style="max-width: 200px; max-height: 150px;">
                                            </div>
                                            <div>
                                                <span class="btn default btn-file">
                                                <span class="fileinput-new">选择文件</span>
                                                <span class="fileinput-exists">更改</span>
                                                <input type="file" name="uploadTemplate" id="uploadTemplate"></span>
                                                <a href="#" class="btn default fileinput-exists" data-dismiss="fileinput">移除</a>
                                                <span>请选择zip文件</span>
                                            </div>
                                        </div>
                                        <div id="titleImageError" style="color: #a94442"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn blue" id="uploadTemplateBtn">保存</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</div>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/footer.jsp"%>
<%@include file="../includes/bottomscript.jsp" %>
<script type="text/javascript" src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-process.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-validate.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"/>"></script>

<script src="<c:url value="/js/design/template.js"/>"></script>
<script type="text/javascript">
    $(function () {
        templateListTable.init();
    });
</script>
</body>
</html>