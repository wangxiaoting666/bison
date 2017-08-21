<%--@elvariable id="userList" type="java.util.List<com.threegrand.bison.security.model.User>"--%>
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
      <div class="row" style="overflow: hidden; margin-left:2px;">
          <input style="float:left;" placeholder="人员ID" type="text" class="form-control input-small" name="userIdQuery" id="userIdQuery">
          <input style="float:left;" placeholder="名称" type="text" class="form-control input-small" name="userNameQuery" id="userNameQuery">
          <input style="float:left;" placeholder="角色" type="text" class="form-control input-small" name="roleQuery" id="roleQuery">
          <input style="float:left;" placeholder="标签" type="text" class="form-control input-small" name="tagQuery" id="tagQuery">
          <input style="float:left;" placeholder="楼层" type="text" class="form-control input-small" name="stepQuery" id="stepQuery">
          <input style="float:left;" placeholder="楼栋" type="text" class="form-control input-small"  name="buildingQuery" id="buildingQuery">
          <div class="form-group last">
            <button type="button" id="queryUserMonitor" class="btn red" >查询</button>
            <button type="button" id="reset" class="btn default" >重置</button>
          </div>
      </div>
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
                <%--<a href="javascript:;" class="btn default yellow-stripe" id="addRole"><i class="fa fa-plus"></i><span class="hidden-480"> 添加角色</span></a>--%>
                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>

                
              </div>
            </div>
            <div class="portlet-body">
              <div class="table-container">
                <table class="table table-striped table-bordered table-hover" id="dataTable">
                  <thead>
                  <tr role="row" class="heading">
                    <th>人员Id</th>
                    <th>名称</th>
                    <th>状态</th>
                    <th>楼栋</th>
                    <th>楼层</th>
                    <th>当前位置</th>
                    <th>危险区域</th>
                    <th>报警区域</th>
                    <th>角色</th>
                    <th>标签</th>
                    <th>关联对象</th>
                    <th>绑定手环</th>
                  </tr>
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
                  <label class="col-md-4 control-label">角色名<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="hidden" id="roleId">
                    <input type="text" class="form-control input-medium" placeholder="角色名" id="roleName" name="roleName">
                    <span class="help-block"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group last">
                  <label class="col-md-4 control-label">角色描述</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-medium" placeholder="角色描述" id="description" name="description">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">用户</label>
                  <div class="col-md-10">
                    <select id="userNameList" class="form-control select2" style="width:695px" multiple="multiple" placeholder="用户">
                      <c:forEach var="user" items="${userList}">
                        <option value="${user.loginName}">${user.loginName}</option>
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
                  <label class="col-md-2 control-label">权限</label>
                  <div class="col-md-10">
                    <ul id="permissionTree" class="ztree"></ul>
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
<script src="<c:url value="/js/monitor/userMonitor.js"/>"></script>
<script type="text/javascript">
  $(function(){
    userMonitorListTable.init(${tree});
  });
</script>
</body>
</html>