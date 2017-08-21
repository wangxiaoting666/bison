<%--@elvariable id="roleList" type="java.util.List<com.threegrand.bison.security.model.Role>"--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
<%@include file="../includes/head.jsp"%>
<title>${menu.menuName}</title>

<link rel="stylesheet" type="text/css"
	href="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/js/bower_components/ztree_v3/css/zTreeStyle/zTreeStyle.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ztree_custom.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ol.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ol3-base_3d.css"/>" />



<style type="text/css">
</style>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">

			<div class="modal-content" id="">

				  <div class="modal-body form">
        <form id="dialogForm" class="form-horizontal">
          <div class="form-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">编号<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="personId" name="">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">姓名<span class="required"> * </span></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="personName" name="">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">性别<span class="required"> * </span></label>
                  <div class="col-md-10">
                    <select id="personSex" class="form-control select2" style="width:577px"  placeholder="">
                     
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
                    <select id="organId" class="form-control select2" style="width:577px"  placeholder="">
                     
                        <option value="">请选择</option>
                      
                     
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
                    <input type="text" class="form-control " placeholder="" id="brithday" name="">
                  </div>
                </div>
              </div>
            </div>
             <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">联系电话</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control  " placeholder="" id="phone" name="">
                  </div>
                </div>
              </div>
            </div>
             <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">家庭住址</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="Address" name="">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-2 control-label">责任人</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control " placeholder="" id="personLiable" name="">
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </form>
      </div>
				
			
				
				<div class="modal-footer">
					<button type="button" class="btn default" data-dismiss="modal"
						id="close">关闭</button>
					<button type="button" class="btn blue" id="addBtn">保存</button>
				</div>
			
	</div>

	<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
	<%@include file="../includes/bottomscript.jsp"%>
	<script
		src="<c:url value="/js/bower_components/bootstrap/dist/js/bootstrap.min.js"/>"
		type="text/javascript"></script>

	<script
		src="<c:url value="/js/bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"/>"
		type="text/javascript"></script>

	<script
		src="<c:url value="/js/bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js"/>"
		type="text/javascript"></script>


	<script type="text/javascript"
		src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"/>"></script>
	<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
    <script src="<c:url value="/js/asset/assetPage.js"/>"></script> 


	<!-- 弹框 -->
	<script src="layer/layer.js"></script>
	<script src="layer/extend/layer.ext.js"></script>


	<script type="text/javascript">
	
	//添加后保存
	var index = parent.layer.getFrameIndex(window.name);
	$("#addBtn").on("click", function() {
		//验证字段
		var num = validate();
		if (num == 0) {
			return
		}
		$.ajax({
			url : "xxxxxxxxxxxxx",
			data : {
				personId : $("#personId").val(),
				personName : $("#personName").val(),
				personSex : $("#personSex option:selected").val(),
				organId : $("#organId option:selected").html(),
				brithday : $("#brithday").val(),
				phone : $("#phone").val(),
				Address : $("#Address").val(),
				personLiable : $("#personLiable").val(),
				

			},
			type : "post",
			success : function(data) {
				if (customGlobal.ajaxCallback(data)) {
					saveAssetInfo();
					//dataTable.reload();
				}
				parent.layer.close(index);
			}
		});

	})
	$('#close').on('click', function() {
		parent.layer.close(index);
	});
</script>


</body>
</html>