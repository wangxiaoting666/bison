<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<%
    String path = request.getRequestURI();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()  + path;
%>
<base href="<%=basePath%>">
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
	href="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ol.css"/>" />
 <link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ol3-base_3d.css"/>" />
	
<!-- 地图 -->
<script src="<c:url value="/js/asset/ol-debug.js"/>"></script>
<script src="<c:url value="/js/asset/jquery-1.9.1.js"/>"></script>
<!-- 弹框 -->
<script src="../../layer/layer.js"></script>
<script src="../../layer/extend/layer.ext.js"></script>

<script src="<c:url value="/js/asset/asset_common.js"/>"></script>
<script src="<c:url value="/js/asset/asset_style.js"/>"></script>
<script src="<c:url value="/js/asset/asset_init.js"/>"></script>
<script src="<c:url value="/js/asset/asset_base_fun.js"/>"></script>

<style>
.ztree li span.button.icon03_ico_close {
	margin-right: 2px;
	background: url(../../img/organTree/school.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

.ztree li span.button.icon03_ico_open {
	margin-right: 2px;
	background: url(../../img/organTree/school.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

.ztree li span.button.icon01_ico_close {
	margin-right: 2px;
	background: url(../../img/organTree/dclose.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

.ztree li span.button.icon01_ico_open {
	margin-right: 2px;
	background: url(../../img/organTree/dopen.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

.ztree li span.button.icon01_ico_docu {
	margin-right: 2px;
	background: url(../../img/organTree/dclose.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

.ztree li span.button.icon02_ico_docu {
	margin-right: 2px;
	background: url(../../img/organTree/people.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

.ztree li span.button.icon04_ico_docu {
	margin-right: 2px;
	background: url(../../img/organTree/asset.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

.ztree li span.button.icon03_ico_docu {
	margin-right: 2px;
	background: url(../../img/organTree/school.png) no-repeat scroll 0 0
		transparent;
	vertical-align: top;
	*vertical-align: middle
}

#search_result{
       width:131px;
            position:absolute;
            left:1px;
            top:31px;
            z-index:1;
            overflow:hidden;
            background:#dcf6f8;
            border:#c5dadb 1px solid;
            border-top:none;
        }
        .line{
            font-size:12px;
            color:#000;
            background:#ffffff;
      width:302px; 
            padding:2px;
        }
        .hover{
            background:#007ab8;
            color:#fff;
        }
</style>
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
							</div>




							<div>
								<div class="col-md-3 col-sm-6 col-sm-12">
								<!-- 搜索按钮 -->
 <div class="row">
<div class="input-group  col-md-12 ">
<input type="text" id="search" class="form-control " id="newName" name="newName">
<span class="input-group-addon btn btn-primary" id="doSearch"  style="background:#eaeaea;"><i  id="doSearch" class="fa fa-search"></i></span>
</div>
</div> 

<div id="search_result"   class=" "></div>
								
									<ul id="zTree" class="ztree"  style="overflow:auto;  height:450px;"></ul>
								</div>
								
								<div class="col-md-9 col-sm-6 col-sm-12">
													<!-- ---------------------------------- -->
													<div id="locatemap" class="locatemap"  >
														<div class="floor-select">
															<div class="wheel">
																<ul class="nav nav-pills nav-stacked">
																	<li role="presentation" class="up"><a><i
																		class="glyphicon glyphicon-chevron-up"></i></a></li>
																	<li class="divider"></li>
																	<li class="floor-wheel ">
																		<ul class="nav nav-pills nav-stacked " id="floorlist"></ul>
																	</li>
																	<li class="divider"></li>
																	<li role="presentation" class="down"><a><i
																		class="glyphicon glyphicon-chevron-down"></i></a></li>
																</ul>
															</div>
														</div>
													</div>
		<div id="popup" class="ol-popup">
		<div id="popup-content"></div>
	</div>
								</div>
								   
							</div>


						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>

	<%@include file="../includes/footer.jsp"%>
	<jsp:include page="../includes/confirmdiv.jsp">
		<jsp:param value="确认删除当前文件？" name="dialogContent"></jsp:param>
	</jsp:include>
	<%@include file="../includes/bottomscript.jsp"%>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.exedit-3.5.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-process.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-validate.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"/>"></script>
	<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
	<script src="<c:url value="/js/design/resource.js"/>"></script>
	<script type="text/javascript">
		$(function() {
			resource.init();
		});
	</script>
</body>
</html>