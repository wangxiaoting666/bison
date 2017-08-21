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
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/global/sumoselect.css"/>"/>
    <link rel="stylesheet" type="text/css"
          href="<c:url value="/js/global/plugins/bootstrap-multiselect/css/bootstrap-multiselect.css"/>"/>
    <link rel="stylesheet" type="text/css"
          href="<c:url value="/js/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.css"/>"/>
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
                                <a href="javascript:;" class="btn default yellow-stripe" id="updateShow">
                                    <i class="fa fa-update"></i><span class="hidden-480"> 升级设备</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="filterShow">
                                    <i class="fa fa-filter"></i><span class="hidden-480"> 筛选设备</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="editShow">
                                    <i class="fa fa-refresh"></i><span class="hidden-480">编辑设备</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload">
                                    <i class="fa fa-refresh"></i><span class="hidden-480">重新载入</span></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th><input type="checkbox" id="checkPage">全选本页</th>
                                        <th>设备id</th>
                                        <th>固件版本</th>
                                        <th>硬件版本</th>
                                        <th>应用版本</th>
                                        <th>应用服务器IP</th>
                                        <th>定位服务器IP</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr role="row" id="filterWin">
                                        <td><a class="btn default btn-xs green" id="checkTable">
                                            <i class="fa fa-filter"></i>筛选栏</a></td>
                                        <td><input type="text" class="form-control form-filter input-sm"
                                                   placeholder="输入设备ID以搜索" name="userid"></td>
                                        <td><select class="form-control form-filter" multiple="multiple"
                                                    name="fwVer"></select></td>
                                        <td><select class="form-control form-filter" multiple="multiple"
                                                    name="hwVer"></select></td>
                                        <td><select class="form-control form-filter" multiple="multiple"
                                                    name="apVer"></select></td>
                                        <td><input type="text" class="form-control form-filter input-sm"
                                                   placeholder="输入应用服务器IP以搜索" name="applicationServerIp"></td>
                                        <td><input type="text" class="form-control form-filter input-sm"
                                                   placeholder="输入位置服务器IP以搜索" name="positionServerIp"></td>
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
<div class="modal fade bs-modal-lg" id="editWin" tabindex="-1"
     data-keyboard="false" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body form">
                <form class="form-horizontal">
                    <div class="form-body">
                        <div class="well"></div>
                        <%--<div class="form-group">--%>
                            <%--<label class="col-md-4 control-label">设备ID</label>--%>
                            <%--<div class="col-md-8">--%>
                                <%--<input type="text" class="form-control" name="userid">--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div class="form-group">--%>
                            <%--<label class="col-md-4 control-label">固件版本</label>--%>
                            <%--<div class="col-md-8">--%>
                                <%--<input type="text" class="form-control" name="fwVer">--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div class="form-group">--%>
                            <%--<label class="col-md-4 control-label">硬件版本</label>--%>
                            <%--<div class="col-md-8">--%>
                                <%--<input type="text" class="form-control" name="hwVer">--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div class="form-group">--%>
                            <%--<label class="col-md-4 control-label">应用版本</label>--%>
                            <%--<div class="col-md-8">--%>
                                <%--<input type="text" class="form-control apVerList" name="apVer">--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <div class="row">
                            <div class="form-group col-md-8">
                                <label class="col-md-4 control-label">应用服务器IP</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="applicationServerIp">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="checkbox" id="disableAsi"/>不修改应用服务器IP
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8">
                                <label class="col-md-4 control-label">定位服务器IP</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="positionServerIp">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="checkbox" id="disablePsi"/>不修改定位服务器IP
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8">
                                <label class="col-md-4 control-label">起始运营时间</label>
                                <div class="col-md-8">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="beginOperatingTime" type="text" class="form-control">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="checkbox" id="disableBot"/>不修改起始运营时间
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8">
                                <label class="col-md-4 control-label">结束运营时间</label>
                                <div class="col-md-8">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="endOperatingTime" type="text" class="form-control">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="checkbox" id="disableEot"/>不修改结束运营时间
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn blue submit">保存编辑</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade bs-modal-lg" id="detailWin" tabindex="-1"
     data-keyboard="false" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <p><label class="col-md-3">设备ID ：</label><strong name="userid"></strong></p>
                <p><label class="col-md-3">固件版本：</label><strong name="fwVer"></strong></p>
                <p><label class="col-md-3">硬件版本：</label><strong name="hwVer"></strong></p>
                <p><label class="col-md-3">应用版本：</label><strong name="apVer"></strong></p>
                <p><label class="col-md-3">芯片ID ：</label><strong name="chipid"></strong></p>
                <p><label class="col-md-3">闪存ID ：</label><strong name="flashid"></strong></p>
                <p><label class="col-md-3">闪存大小：</label><strong name="flashsize"></strong></p>
                <p><label class="col-md-3">闪存模式：</label><strong name="flashmode"></strong></p>
                <p><label class="col-md-3">闪存速度：</label><strong name="flashspeed"></strong></p>
                <p><label class="col-md-3">重启原因：</label><strong name="resetreason"></strong></p>
                <p><label class="col-md-3">应用服务器IP：</label><strong name="applicationServerIp"></strong></p>
                <p><label class="col-md-3">位置服务器IP：</label><strong name="positionServerIp"></strong></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<%--<div id="detailWin">--%>
<%--<p><label class="col-md-4">设备ID ：</label><strong class="col-md-8" name="userid"></strong></p>--%>
<%--<p><label class="col-md-4">固件版本：</label><strong class="col-md-8" name="fwVer"></strong></p>--%>
<%--<p><label class="col-md-4">硬件版本：</label><strong class="col-md-8" name="hwVer"></strong></p>--%>
<%--<p><label class="col-md-4">应用版本：</label><strong class="col-md-8" name="apVer"></strong></p>--%>
<%--<p><label class="col-md-4">芯片ID ：</label><strong class="col-md-8" name="chipid"></strong></p>--%>
<%--<p><label class="col-md-4">闪存ID ：</label><strong class="col-md-8" name="flashid"></strong></p>--%>
<%--<p><label class="col-md-4">闪存大小：</label><strong class="col-md-8" name="flashsize"></strong></p>--%>
<%--<p><label class="col-md-4">闪存模式：</label><strong class="col-md-8" name="flashmode"></strong></p>--%>
<%--<p><label class="col-md-4">闪存速度：</label><strong class="col-md-8" name="flashspeed"></strong></p>--%>
<%--<p><label class="col-md-4">重启原因：</label><strong class="col-md-8" name="resetreason"></strong></p>--%>
<%--<p><label class="col-md-4">应用服务器IP：</label><strong class="col-md-8" name="applicationServerIp"></strong></p>--%>
<%--<p><label class="col-md-4">位置服务器IP：</label><strong class="col-md-8" name="positionServerIp"></strong></p>--%>
<%--</div>--%>

<div class="modal fade bs-modal-lg" id="updateWin" tabindex="-1"
     data-keyboard="false" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body form">
                <form class="form-horizontal">
                    <div class="form-body">
                        <div class="well"></div>
                        <div class="row">
                            <div class="form-group col-md-8">
                                <label class="col-md-4 control-label">要升级到的固件版本</label>
                                <div class="col-md-8">
                                    <select class="form-control fwVerList" name="fwVer">
                                        <option value="">--请选择固件版本--</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="checkbox" id="updateFirmwareOnly"/>只升级固件
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-8">
                                <label class="col-md-4 control-label">要升级到的应用版本</label>
                                <div class="col-md-8">
                                    <select class="form-control fwVerList" name="apVer">
                                        <option value="">--请选择应用版本--</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="checkbox" id="updateApplicationOnly"/>只升级应用
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn blue submit">确认升级</button>
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
<script type="text/javascript"
        src="<c:url value="/js/global/plugins/bootstrap-multiselect/js/bootstrap-multiselect.js"/>"></script>
<script type="text/javascript"
        src="<c:url value="/js/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script src="<c:url value="/js/devicemanage/device.js"/>"></script>
<script type="text/javascript">
    $(function () {
        deviceTable().init();
    });
</script>
</body>
</html>