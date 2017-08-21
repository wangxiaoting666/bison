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
<div class="page-container" style="margin:0px;">
<%@include file="../includes/sidebar.jsp"%>
  <div class="page-content-wrapper">
    <div class="page-content">
      <%@include file="../includes/current.jsp"%>
      <div class="row" style="overflow: hidden; margin-left:2px;">

        <input style="float: left" class="form-control input-medium" type="text"  placeholder="部门" class="" id="department" name="department">
        <input style="float: left" type="text" class="form-control input-medium"  placeholder="岗位" id="position" name="position">
        <input style="float: left" type="text" class="form-control input-medium"  placeholder="工号" id="empID" name="empID">
        <input style="float: left" type="text" class="form-control input-medium"  placeholder="用户名" id="username" name="username">

        <div class="form-group last">
          <button type="button" class="btn red" id="findaccount">查询</button>
          <button type="button"  class="btn default" id="reset" >重置</button>
        </div>

      </div>


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

              <a href="javascript:;" class="btn default yellow-stripe" id="addAccountBD"><i class="fa fa-plus"></i><span class="hidden-480"> 添加监控对象</span></a>
              <a href="javascript:;" class="btn default yellow-stripe" id="delAccount"><i class="fa fa-plus"></i><span class="hidden-480"> 删除监控对象</span></a>
              <a href="javascript:;" class="btn default yellow-stripe" id="resetPass"><i class="fa fa-plus"></i><span class="hidden-480"> 重置密码</span></a>
              <a href="javascript:;" class="btn default yellow-stripe" id="permissionSet"><i class="fa fa-plus"></i><span class="hidden-480"> 设置权限</span></a>
              <a href="javascript:;" class="btn default yellow-stripe" id="createAccount"><i class="fa fa-plus"></i><span class="hidden-480"> 创建账户</span></a>
              <a href="javascript:;" class="btn default yellow-stripe" id="closeAccount"><i class="fa fa-plus"></i><span class="hidden-480"> 封禁账号</span></a>
              <a href="javascript:;" class="btn default yellow-stripe" id="openAccount"><i class="fa fa-plus"></i><span class="hidden-480"> 解禁账号</span></a>
              <a href="javascript:;" class="btn default yellow-stripe" id="del"><i class="fa fa-plus"></i><span class="hidden-480"> 删除</span></a>

        
            </div>
          </div>
          <div class="portlet-body">
            <div class="table-container">
              <table class="table table-striped table-bordered table-hover" id="dataTable">
                <thead>
                <tr role="row" class="heading">
                  <th></th>
                  <th>工号</th>
                  <th>用户名</th>
                  <th>密码</th>
                  <th>部门</th>
                  <th>岗位</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>查看</th>
                </tr>
                </thead>
                <tbody>
                <th  width="5%" ><input type='checkbox' id='checkAllAccount' name="checkAllAccount" onclick="checkAll(this)"></th>
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
                  <label class="col-md-4 control-label">工号<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-medium" placeholder="工号" id="empIDs" name="empIDs">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-md-4 control-label">用户名<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-medium" placeholder="用户名" id="usernames" name="usernames">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-md-4 control-label">密码<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="password" class="form-control input-medium" placeholder="密码" id="passwords" name="passwords">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-md-4 control-label">部门</label>
                  <div class="col-md-6">
                    <input type="text" class="form-control input-medium" placeholder="部门" id="departments" name="departments">
                    <span class="help-block"></span>
                  </div>
                </div>
              </div>


              <div class="col-md-6">
                <div class="form-group last">
                  <label class="col-md-2 control-label">岗位</label>
                  <div class="col-md-6">
                    <input type="text" class="form-control input-medium" placeholder="岗位" id="positions" name="positions">
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
      </div>
    </div>
  </div>
</div>

<div class="modal fade bs-modal-lg" id="modalDialogPer" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentPer">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitlePer"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogFormPer" class="form-horizontal">
          <div class="form-body">
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
        <button type="button" class="btn blue" id="permissionBtn">保存</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade bs-modal-lg" id="modalDialogPass" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentPass">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitlePass"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogFormPass" class="form-horizontal">
          <div class="form-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-8 control-label">确定将该账号密码重置为初始密码123456？</label>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="permissionPassBtn">保存</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade bs-modal-lg" id="modalDialogClose" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentClose">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitleClose"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogFormClose" class="form-horizontal">
          <div class="form-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-8 control-label">确定封禁该账号，封禁后该账号将不可登录？</label>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="permissionCloseBtn">保存</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade bs-modal-lg" id="modalDialogOpen" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentOpen">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitleOpen"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogFormOpen" class="form-horizontal">
          <div class="form-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-7 control-label">确定解禁该账号？</label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="permissionOpenBtn">保存</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade bs-modal-lg" id="modalDialogcut" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentcut">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitlecut"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogFormcut" class="form-horizontal">
          <div class="form-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-7 control-label">确定删除该账号？</label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="permissioncut">保存</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade bs-modal-lg" id="modalDialogAdd" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentAdd">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitleAdd"></h4>
        <span id="user">人员</span>
        <span id="asset">资产</span>
      </div>
      <div class="portlet-body" id="userContent">
        <div style="overflow: hidden;float: right">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <div class="form-group last" style="float:left;">
            <button type="button" class="btn red" id="">查询</button>
            <button type="button"  class="btn default" id="" >重置</button>
          </div>
        </div>
        <div class="table-container">
          <table class="table table-striped table-bordered table-hover" id="dataTables">
            <thead>
            <tr role="row" class="heading">
              <th>全选</th>
              <th>ID号</th>
              <th>名称</th>
              <th>危险区域</th>
              <th>报警区域</th>
              <th>角色</th>
              <th>标签</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      <div class="portlet-body" id="assetContent" style="display: none">
        <div style="overflow: hidden;float: right">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <input type="text" style="float: left" class="form-control input-small" placeholder="用户名" id="" name="">
          <div class="form-group last" style="float:left;">
            <button type="button" class="btn red" id="">查询</button>
            <button type="button"  class="btn default" id="" >重置</button>
          </div>
        </div>
        <div class="table-container">
          <table class="table table-striped table-bordered table-hover" id="dataTables">
            <thead>
            <tr role="row" class="heading">
              <th>全选</th>
              <th>ID号</th>
              <th>名称</th>
              <th>危险区域</th>
              <th>报警区域</th>
              <th>角色</th>
              <th>标签</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="permissionAdd">确定</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade bs-modal-lg" id="modalDialogdel" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentdel">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitledel"></h4>
      </div>
      <div class="portlet-body">
        <div class="table-container">
          <table class="table table-striped table-bordered table-hover" id="dataTabledel">
            <thead>
            <tr role="row" class="heading">
              <th></th>
              <th>ID号</th>
              <th>名称</th>
              <th>危险区域</th>
              <th>报警区域</th>
              <th>角色</th>
              <th>标签</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="permissiondel">确定</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade bs-modal-lg" id="modalDialogfind" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentfind">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitlefind"></h4>
      </div>
      <div class="portlet-body">
        <div class="table-container">
          <table class="table table-striped table-bordered table-hover" id="dataTablefind">
            <thead>
            <tr role="row" class="heading">
              <th></th>
              <th>ID号</th>
              <th>名称</th>
              <th>危险区域</th>
              <th>报警区域</th>
              <th>角色</th>
              <th>标签</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="permissionfind">确定</button>
      </div>
    </div>
  </div>
</div>
<%@include file="../includes/footer.jsp"%>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/bottomscript.jsp"%>
<script type="text/javascript" src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script src="<c:url value="/js/account/account.js"/>"></script>
<script type="text/javascript">
  $(function(){
    ringListTable.init(${tree});
  });
</script>
</body>
</html>