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
      <div class="row" style="overflow: hidden; margin-left: 2px;">

          <input style="float:left;" type="text" class="form-control input-medium" placeholder="人员姓名" name="userNameQuery" id="userNameQuery">
          <input style="float:left;" type="text" class="form-control input-medium" placeholder="性别" name="userRoleQuery" id="userRoleQuery">
          <input style="float:left;" type="text" class="form-control input-medium" placeholder="一年五班" name="userTagQuery" id="userTagQuery">
       
          <div class="form-group last">
            <button type="button" id="queryUserInfo" class="btn red" >查询</button>
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
                <a href="javascript:;" class="btn default yellow-stripe" id="addUserInfo"><i class="fa fa-plus"></i><span class="hidden-480"> 添加用户</span></a>
                  <shiro:hasPermission name="fansai:assetInfoDelete:open">
										<a href="javascript:;" class="btn default yellow-stripe"><i class="fa fa-minus"></i><span
										class="hidden-480" id="assetremove"> 删除资产</span></a> 
				 </shiro:hasPermission>
                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>
                
              </div>
            </div>
            <div class="portlet-body">
              <div class="table-container">
                <table class="table table-striped table-bordered table-hover" id="dataTable">
                  <thead>
                  <tr role="row" class="heading">
                    <th></th>
                    <th>编号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>所属单位</th>
                    <th>年龄</th>
                    <th>出生日期</th>
                    <th>家庭住址</th>
                    <th>联系电话</th>
                    <th>责任人</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <th  width="5%" ><input type='checkbox' id='checkAllUserInfo' name="checkAllUserInfo" onclick="checkAll(this)"></th>
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
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">编号<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="" name="">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">姓名<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="" name="">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">性别<span class="required"> * </span></label>
                  <div class="col-md-10">
                    <select id="" class="form-control select2" style="width:577px"  placeholder="">
                     
                        <option value="">男</option>
                        <option value="">女</option>
                     
                    </select>
                    <span class="help-block"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">所属单位</label>
                  <div class="col-md-10">
                    <select id="tagList" class="form-control select2" style="width:577px" multiple="multiple" placeholder="">
                      <c:forEach var="tag" items="">
                        <option value=""></option>
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
                  <label class="col-md-2 control-label">出生日期</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="" name="">
                  </div>
                </div>
              </div>
            </div>
             <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">联系电话</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control  " placeholder="" id="" name="">
                  </div>
                </div>
              </div>
            </div>
             <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">家庭住址</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="" name="">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">责任人</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="" name="">
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
<%@include file="../includes/bottomscript.jsp"%>
<script type="text/javascript" src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"/>"></script>
<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script src="<c:url value="/js/userInfo/userInfo.js"/>"></script>

	<!-- 弹框 -->
	<script src="layer/layer.js"></script>
	<script src="layer/extend/layer.ext.js"></script>
	
<script type="text/javascript">
  $(function(){
    userInfoListTable.init(${tree});
  });
</script>
</body>
</html>