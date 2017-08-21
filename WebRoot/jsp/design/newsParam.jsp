<%--@elvariable id="moduleList" type="java.util.List<com.threegrand.bison.basic.model.Module>"--%>
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
                                <a href="javascript:;" class="btn default yellow-stripe" id="addNewsParam"><i class="fa fa-plus"></i><span class="hidden-480"> 添加变量</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>
                                
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>变量名</th>
                                        <th>描述</th>
                                        <th>栏目名称</th>
                                        <th>变量分类</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr role="row" class="filter">
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm gAuto" autoFlag="gAutoNewsParamName" name="paramNameQuery" id="paramNameQuery">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm" name="descriptionQuery" id="descriptionQuery">
                                        </td>
                                        <td>
                                            <select class="form-control input-medium select2me" data-placeholder="栏目名称" id="moduleTypeQuery" name="moduleTypeQuery">
                                                <option value="">全部</option>
                                                <c:forEach var="module" items="${moduleList}">
                                                    <option value="${module.moduleId}">${module.moduleName}</option>
                                                </c:forEach>
                                            </select>
                                            <span class="help-block"></span>
                                        </td>
                                        <td>
                                            <select class="form-control form-filter input-medium" name="paramTypeQuery" placeholder="变量类型" id="paramTypeQuery">
                                                <option value="">--请选择--</option>
                                                <option value="1">单一变量</option>
                                                <option value="2">数组变量</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="margin-bottom-5">
                                                <a class="btn btn-sm yellow filter-submit margin-bottom"><i class="fa fa-search"></i>查询</a>
                                                <a class="btn btn-sm red filter-cancel"><i class="fa fa-refresh"></i>重置</a>
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
                                    <label class="col-md-4 control-label">栏目名称<span class="required"> * </span></label>
                                    <div class="col-md-4">
                                        <select class="form-control input-medium select2me" data-placeholder="栏目名称" id="moduleTypeList" name="moduleTypeList">
                                            <option value="">全部</option>
                                            <c:forEach var="module" items="${moduleList}">
                                                <option value="${module.moduleId}">${module.moduleName}</option>
                                            </c:forEach>
                                        </select>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">变量类型</label>
                                    <div class="col-md-8">
                                        <select class="form-control form-filter input-medium" name="addParamType" placeholder="变量类型" id="addParamType">
                                            <option value="1">单一变量</option>
                                            <option value="2">数组变量</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">变量名<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <input type="hidden" id="newsParamId">
                                        <input type="text" class="form-control input-medium" placeholder="变量名" id="paramName" name="paramName">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">描述<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="描述" id="description" name="paramName">
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
<%@include file="../includes/footer.jsp"%>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/bottomscript.jsp" %>
<script type="text/javascript"
        src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript"
        src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script src="<c:url value="/js/design/newsParam.js"/>"></script>
<script type="text/javascript">
    $(function () {
        newsParamListTable.init();
    });
</script>
</body>
</html>