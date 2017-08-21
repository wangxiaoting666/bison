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
          href="<c:url value="/js/global/plugins/bootstrap-fileinput/fileinput.css"/>"/>
</head>

<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp" %>
<div class="page-container">
    <%@include file="../includes/sidebar.jsp" %>
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
                            <div class="actions">
                                <a href="javascript:;" class="btn default yellow-stripe" id="uploadShow">
                                    <i class="fa fa-plus"></i><span class="hidden-480">上传固件</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload">
                                    <i class="fa fa-refresh"></i><span class="hidden-480">重新载入</span></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>固件版本</th>
                                        <th>上传时间</th>
                                        <th>版本描述</th>
                                        <th>操作</th>
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
<div class="modal fade bs-modal-lg" id="uploadWin" tabindex="-1"
     data-keyboard="false" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <form class="form form-horizontal">
                    <div class="form-body">
                        <div class="form-group">
                            <label class="col-md-4 control-label">固件版本<span class="required"> * </span></label>
                            <div class="col-md-8">
                                <input type="text" class="form-control input-medium"
                                       placeholder="请输入固件版本" name="version">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">固件描述&nbsp;&nbsp;&nbsp;</label>
                            <div class="col-md-8">
                                <textarea class="form-control" rows="8" wrap="hard"
                                          placeholder="请输入对本固件版本的描述" name="description"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">文件详情&nbsp;&nbsp;&nbsp;</label>
                            <div class="col-md-8 well">
                            </div>
                        </div>
                    </div>
                    <div class="form-footer">
                        <div class="form-group">
                            <label class="col-md-4 control-label">固件文件<span class="required"> * </span></label>
                            <div class="col-md-8">
                                <input type="file" class="file-loading" name="firmwareFile">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="modal fade bs-modal-lg" id="editWin" tabindex="-1"
     data-keyboard="false" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <form class="form form-horizontal">
                    <div class="form-body">
                        <div class="form-group last">
                            <label class="col-md-4 control-label">固件版本</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="version" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">固件描述&nbsp;&nbsp;&nbsp;</label>
                            <div class="col-md-8">
                                <textarea class="form-control" rows="12" wrap="hard"
                                          placeholder="请输入对本固件版本的描述" name="description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn blue submit">确认编辑</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/footer.jsp" %>
<%@include file="../includes/bottomscript.jsp" %>
<script type="text/javascript"
        src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript"
        src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/bootstrap-fileinput/fileinput.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/bootstrap-fileinput/zh.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/devicemanage/firmware.js"/>"></script>
<script type="text/javascript">
    $(function () {
        firmwareTable().init();
    });
</script>
</body>

</html>