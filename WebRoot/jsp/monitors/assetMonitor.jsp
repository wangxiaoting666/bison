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

          <input style="float:left;" type="text" class="form-control input-medium" placeholder="资产ID" name="assetIdQuery" id="assetIdQuery">
          <input style="float:left;" type="text" class="form-control input-medium" placeholder="名称" name="assetNameQuery" id="assetNameQuery">
          <input style="float:left;" type="text" class="form-control input-medium" placeholder="角色" name="roleNameQuery" id="roleNameQuery">
          <input style="float:left;" type="text" class="form-control input-medium"  placeholder="标签" name="tagNameQuery" id="tagNameQuery">
          <div class="form-group last">
            <button type="button" id="queryAssetMonitor" class="btn red" >查询</button>
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
               <%-- <a href="javascript:;" class="btn default yellow-stripe" id="addRole"><i class="fa fa-plus"></i><span class="hidden-480"> 添加角色</span></a>--%>
                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>
              </div>
            </div>
            <div class="portlet-body">
              <div class="table-container">
                <table class="table table-striped table-bordered table-hover" id="dataTable">
                  <thead>
                  <tr role="row" class="heading">
                    <th>资产Id</th>
                    <th>资产名称</th>
                    <th>状态</th>
                    <th>楼栋</th>
                    <th>楼层号</th>
                    <th>当前位置</th>
                    <th>初始位置</th>
                    <th>离开初始位置次数</th>
                    <th>角色</th>
                    <th>标签</th>
                    <th>绑定手环</th>
                  </tr>
                  <%--<tr role="row" class="filter">
                    <td>
                      <input type="text" class="form-control form-filter input-sm gAuto" autoFlag="gAutoRoleName" name="roleNameQuery" id="roleNameQuery">
                    </td>
                    <td>
                      <input type="text" class="form-control form-filter input-sm" name="descriptionQuery" id="descriptionQuery">
                    </td>
                    <td>
                      <div class="margin-bottom-5">
                        <a class="btn btn-sm yellow filter-submit margin-bottom">
                          <i class="fa fa-search"></i>查询</a>
                        <a class="btn btn-sm red filter-cancel">
                          <i class="fa fa-refresh"></i>重置</a>
                      </div>
                    </td>
                  </tr>--%>
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
<script src="<c:url value="/js/monitor/assetMonitor.js"/>"></script>
<script type="text/javascript">
  $(function(){
    assetMonitorPageListTable.init(${tree});
  });
</script>
</body>
</html>