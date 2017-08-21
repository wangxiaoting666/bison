<%--@elvariable id="roleList" type="java.util.List<com.threegrand.bison.security.model.Role>"--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <%@include file="../includes/head.jsp"%>
    <title>${menu.menuName}</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/js/bower_components/ztree_v3/css/zTreeStyle/zTreeStyle.css"/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/global/ztree_custom.css"/>"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp"%>
<div class="page-container">
<%@include file="../includes/sidebar.jsp"%>
    <div class="page-content-wrapper">
        <div class="page-content">
            <%@include file="../includes/current.jsp"%>
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
                            <shiro:hasPermission name="security:userAdd:open">
                                <a href="javascript:;" class="btn default yellow-stripe" id="addUser"><i class="fa fa-plus"></i><span class="hidden-480"> 添加用户</span></a>
                             </shiro:hasPermission>
                             <shiro:hasPermission name="security:userUpdate:open">
                                     <input id="pupdate" value="update" hidden="true">
                             </shiro:hasPermission>
                             <shiro:hasPermission name="security:userDelete:open">
                                       <input id="pdelete" value="delete" hidden="true">
                             </shiro:hasPermission>
                                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>登录名</th>
                                        <th>昵称</th>
                                        <th>角色</th>
                                        <th>部门</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr role="row" class="filter">
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm gAuto" autoFlag="gAutoLoginName" name="loginNameQuery" id="loginNameQuery">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm gAuto" autoFlag="gAutoUsername" name="usernameQuery" id="usernameQuery">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm gAuto" autoFlag="gAutoRoleName" name="roleNameQuery" id="roleNameQuery">
                                        </td>
                                        <td>
                                            <select class="form-control form-filter input-sm gAuto" name="organNameQuery" id="organNameQuery">
                                            <option value="">请选择</option>
                                                 <c:forEach var="organ" items="${organList}">
                                                     <option value="${organ.organId}">${organ.organName}</option>
                                                  </c:forEach>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="margin-bottom-5">
                                                <a class="btn btn-sm yellow filter-submit margin-bottom">
                                                    <i class="fa fa-search">查询</i></a>
                                                <a class="btn btn-sm red filter-cancel">
                                                    <i class="fa fa-refresh">重置</i></a>
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
<div class="modal fade bs-modal-lg" id="modalDialog" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
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
                                    <label class="col-md-4 control-label">登录名<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <input type="hidden" id="userId">
                                        <input type="text" class="form-control input-medium" placeholder="登录名" id="loginName" name="loginName">
                                        <span class="help-block">此名称用于登录</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">昵称<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="昵称" id="username" name="username">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">密码<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <input type="password" class="form-control input-medium" placeholder="密码" id="password" name="password">
                                        <span class="help-block" id="passwordHelpBlock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">确认密码<span class="required"> * </span></label>
                                    <div class="col-md-8">
                                        <input type="password" class="form-control input-medium" placeholder="确认密码" id="rePassword" name="rePassword">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">角色</label>
                                    <div class="col-md-10">
                                        <select id="roleNameList" class="form-control select2" style="width:695px"  placeholder="角色">
                                            <c:forEach var="role" items="${roleList}">
                                                <option value="${role.roleName}">${role.roleName}</option>
                                            </c:forEach>
                                        </select>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">部门</label>
                                    <div class="col-md-10">
                                        <select id="organNameList" class="form-control select2" style="width:695px"  placeholder="部门">
                                            <c:forEach var="organ" items="${organList}">
                                                <option value="${organ.organId}">${organ.organName}</option>
                                            </c:forEach>
                                        </select>
                                        <span class="help-block"></span>
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
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/footer.jsp"%>
<%@include file="../includes/bottomscript.jsp"%>
<script type="text/javascript" src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script src="<c:url value="/js/security/user.js"/>"></script>
<script type="text/javascript">
    $(function(){
        userListTable.init(${tree});
    });
    
</script>
</body>
</html>