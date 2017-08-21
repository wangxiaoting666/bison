<%--@elvariable id="roleList" type="java.util.List<com.threegrand.bison.security.model.Role>"--%>
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
                                <a href="javascript:;" class="btn default yellow-stripe" id="treeReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>
                                <a href="javascript:;" class="btn default yellow-stripe" id="saveOrder"><i class="fa fa-refresh"></i><span class="hidden-480"> 保存排序</span></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <ul id="menuTree" class="ztree"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="dropdown open" id="treeContextMenu" style="display: none;position: absolute">
    <ul class="dropdown-menu">
        <li><a href="javascript:;" id="addChildMenu">添加子菜单</a></li>
        <li><a href="javascript:;" id="addSiblingMenu">添加同级菜单</a></li>
        <li><a href="javascript:;" id="toUpdateBtn">修改</a></li>
        <li><a href="#" id="deleteBtn" data-target="#confirmDialog" data-toggle="modal">删除</a></li>
    </ul>
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
                                    <label class="col-md-4 control-label">菜单名</label>
                                    <div class="col-md-8">
                                        <input type="hidden" id="menuId"/>
                                        <input type="hidden" id="parentId"/>
                                        <input type="hidden" id="level"/>
                                        <input type="text" class="form-control input-medium" placeholder="菜单名" id="menuName" name="menuName">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">图标</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="图标" id="icon" name="icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">访问地址</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="访问地址" id="url" name="url">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">权限许可</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="权限许可" id="permToken" name="permToken">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">是否末级结点</label>
                                    <div class="col-md-8">
                                        <div class="radio-list">
                                            <label class="radio-inline">
                                                <input type="radio" name="leaf" value="1" checked="checked">是
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="leaf" value="0">否
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">排序号</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="排序号" id="sequence" name="sequence">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">备注</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control input-medium" placeholder="备注" id="memo" name="memo">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group last">
                                    <label class="col-md-4 control-label">是否启用</label>
                                    <div class="col-md-8">
                                        <div class="radio-list">
                                            <label class="radio-inline">
                                                <input type="radio" name="enable" value="1" checked="checked">是
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="enable" value="0">否
                                            </label>
                                        </div>
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
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.exedit-3.5.min.js"/>"></script>
<script src="<c:url value="/js/develop/menu.js"/>"></script>
<script type="text/javascript">
    $(function(){
        menuTree.init();
    });
</script>
<style>
    .diy-dom{
        padding-left: 5px;
    }
</style>
</body>
</html>