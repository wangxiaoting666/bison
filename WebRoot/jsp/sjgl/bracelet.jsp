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
      <div class="row" style="overflow: hidden;margin-left: 2px;">

              <input style="float: left;" type="text" class="form-control input-small"  placeholder="序列号" class="" id="braceletIds" name="braceletIds">
              <input style="float: left;" type="text" class="form-control input-medium" placeholder="Mac地址" id="macs" name="macs">
              <input style="float: left;" type="text" class="form-control input-medium" placeholder="状态" id="statuszt" name="statuszt">
              <input style="float: left;" type="text" class="form-control input-medium" placeholder="绑定类型" id="bindType" name="bindType">
              <input style="float: left;" type="text" class="form-control input-medium" placeholder="绑定对象名称" id="bindObjmc" name="bindObjmc">


        <div class="form-group last">
          <button type="button" class="btn red" id="findsh">查询</button>
          <button type="button" class="btn default"  id="reset" >重置</button>
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
                <a href="javascript:;" class="btn default yellow-stripe" id="DEL"><i class="fa fa-plus"></i><span class="hidden-480"> 解除</span></a>
                <a href="javascript:;" class="btn default yellow-stripe" id="BD"><i class="fa fa-plus"></i><span class="hidden-480"> 绑定</span></a>
                <a href="javascript:;" class="btn default yellow-stripe" id="Sh"><i class="fa fa-plus"></i><span class="hidden-480"> 添加手环</span></a>
                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload"><i class="fa fa-refresh"></i><span class="hidden-480"> 重新载入</span></a>
              </div>
            </div>
            <div class="portlet-body">
              <div class="table-container">
                <table class="table table-striped table-bordered table-hover" id="dataTable">
                  <thead>
                  <tr role="row" class="heading">
                    <th></th>
                    <th>资产ID</th>
                    <th>Mac地址</th>
                    <th>状态</th>
                    <th>绑定类型</th>
                    <th>绑定对象ID</th>
                    <th>绑定对象名称</th>
                    <th>日志</th>
                  </tr>
                  </thead>
                  <tbody>
                  <th  width="5%" ><input type='checkbox' id='checkAllUser' name="checkAllUser" onclick="checkAll(this)"></th>
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

<div class="modal fade" id="record" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-full">
    <div class="modal-content" id="modalContent1">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitleHistory"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogForm1" class="form-horizontal">
          <div class="form-body">
            <div id="content" align="center">
            	<div id="history">
	            	<embed src="${ctx}/jsp/flex/mote_history.swf" quality="high" bgcolor="#ffffff"
						width="1024px" height="500px" name="mote_history" align="middle"
						play="true"
						loop="false"
						quality="high"
						allowScriptAccess="sameDomain"
						type="application/x-shockwave-flash"
						pluginspage="http://www.adobe.com/go/getflashplayer">
					</embed>
				</div>
				
				<div id="edit">
                	<embed src="${ctx}/jsp/flex/mote_edit.swf" quality="high" bgcolor="#ffffff"
						width="1024px" height="500px" name="mote_history" align="middle"
						play="true"
						loop="false"
						quality="high"
						allowScriptAccess="sameDomain"
						type="application/x-shockwave-flash"
						pluginspage="http://www.adobe.com/go/getflashplayer">
					</embed>
                </div>
            </div>

          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
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
                  <label class="col-md-4 control-label">序列号<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-medium" placeholder="" id="braceletId" name="braceletId">
                    <span class="help-block"></span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group last">
                  <label class="col-md-4 control-label">Mac地址</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control input-medium" placeholder="" id="mac" name="mac">
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

<div class="modal fade bs-modal-lg" id="modalDialogde" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContentde">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="modalTitlede"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogFormde" class="form-horizontal">

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">取消</button>
        <button type="button" class="btn blue" id="delBtn">确定</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade bs-modal-lg" id="bracel" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContent2">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="bracels"></h4>
      </div>
      <div class="modal-body form">
        <form id="dialogForm2" class="form-horizontal">
          <div class="form-body">
            <div id="content1"></div>

          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade bs-modal-lg" id="modalBD" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" id="modalContent3">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="ryzc"></h4>
      </div>
      <div class="modal-body form">

          <div class="form-body">
            <div class="row">
              <div class="portlet-body">
                <div class="table-container">
                  <table class="table table-striped table-bordered table-hover" id="dataTable1">
                    <thead>
                    <tr role="row" class="heading">
                      <th>选择</th>
                      <th>人员ID</th>
                      <th>名称</th>
                      <th>角色</th>
                      <th>标签</th>
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
      <div class="modal-footer">
        <button type="button" class="btn default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn blue" id="bdBtn">确定</button>
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
<script src="<c:url value="/js/bracelet/bracelet.js"/>"></script>
<script type="text/javascript">
  $(function(){
    ringListTable.init(${tree});
  });
</script>
</body>
</html>