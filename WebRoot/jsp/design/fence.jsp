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
	href="<c:url value="/js/bower_components/ztree_v3/css/zTreeStyle/zTreeStyle.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ztree_custom.css"/>" />
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
<span class="input-group-addon btn btn-primary" id="doSearch"  style="background:#eaeaea;"><i   class="fa fa-search"></i></span>
</div>
</div> 
		<div id="search_result"   class=" "></div>						
									<ul id="zTree" class="ztree"  style="overflow:auto;  height:450px;"
									></ul>
								</div>
								<div class="col-md-9 col-sm-6 col-sm-12">
													<!-- ---------------------------------- -->
													<div id="fencemap" class="fencemap"  >
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
													<div class="feature-select">
														<ul class="nav nav-pills nav-stacked">
															<li id="electronicFence" class="fenceset" onclick="electronicFence(AseetIdForSaveFence);"><a>显示</a></li>
															<li class="divider"></li>
															<li id="AddElectronicFence" class="fenceset fenceshow" onclick="UpdateElectronicFence(this);"><a>新增</a></li>
															<li class="divider"></li>
															<li id="UpdateElectronicFence" class="fenceset fenceshow" onclick="UpdateElectronicFence(this);"><a>修改</a></li>
															<li class="divider"></li>
															<li id="RemoveElectronicFence" class="fenceset fenceshow" onclick="UpdateElectronicFence(this);"><a>删除</a></li>
															<li class="divider"></li>
															<li id="electronicFenceDrawOFF" class="fenceset" onclick="electronicFenceDrawOFF();"><a>停止</a></li> 
															<li class="divider"></li>
															<li id="SaveElectronicFence" class="fenceset" onclick="SaveElectronicFence();"><a>保存</a></li>
														</ul>
													</div>
													</div>
													<div id="popup" class="ol-popup">
														<div id="popup-content"></div>
													</div>
													<!--<div id="feature-select-oncontextmenu">
 														<ul class="nav nav-pills nav-stacked">
 															<li onclick="electronicFence(AseetIdForSaveFence);"><a>显示</a></li>
															<li class="divider"></li>
															<li onclick="UpdateElectronicFence(document.getElementById('AddElectronicFence'));"><a>新增</a></li>
															<li class="divider"></li>
															<li onclick="UpdateElectronicFence(document.getElementById('UpdateElectronicFence'));"><a>修改</a></li>
															<li class="divider"></li>
															<li onclick="UpdateElectronicFence(document.getElementById('RemoveElectronicFence'));"><a>删除</a></li>
															<li class="divider"></li>
															<li onclick="electronicFenceDrawOFF();"><a>停止</a></li> 
															<li class="divider"></li>
															<li onclick="SaveElectronicFence();"><a>保存</a></li>
														
 														</ul>
 													</div> -->
									
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
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.core-3.5.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ztree_v3/js/jquery.ztree.exedit-3.5.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload.js"/>"></script>
	<script src="<c:url value="/js/design/fence.js"/>"></script>
	<script type="text/javascript">
		$(function() {
			resource.init();
		});

		var fenceOnconTextMenu = document.getElementById("feature-select-oncontextmenu");
		document.oncontextmenu = function(ev) {
			var oEvent = ev || event;
			if (ev.target.className == 'ol-unselectable'){
				//自定义的菜单显示
				//fenceOnconTextMenu.style.display = "block";
				//让自定义菜单随鼠标的箭头位置移动
				//var leftx = oEvent.layerX + 50 ;
				//fenceOnconTextMenu.style.left = leftx + "px";
				//fenceOnconTextMenu.style.top = oEvent.layerY + "px";
				//return false阻止系统自带的菜单，
				//return false必须写在最后，否则自定义的右键菜单也不会出现
				return false;
			}

		}
		//实现点击document，自定义菜单消失
		//document.onclick = function() {
		//	fenceOnconTextMenu.style.display = "none";
		//} 

	</script>
</body>
</html>