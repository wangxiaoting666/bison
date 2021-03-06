<%--@elvariable id="companyInfoList" type="java.util.List<com.threegrand.bison.companyInfo.model.CompanyInfo>"--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
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
<style>
 /*弹出验证*/
	.po_phone_num{display:none; color: deeppink;}
.po_email{display: none; color: deeppink;}	
</style>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/js/bower_components/jquery-file-upload/css/jquery.fileupload.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css"/>" />
<link href="<c:url value="/assets/global/css/components.css"/>"
	rel="stylesheet" type="text/css" />
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
								
								<shiro:hasPermission name="fansai:comInfoEdit:open">
									<a href="javascript:;" class="btn default yellow-stripe"
										id="editCompanyInfo"><i class="fa fa-plus"></i><span
										class="hidden-480"> 编辑信息</span></a> 
								</shiro:hasPermission>
										<a href="company?menuId=260"
										class="btn default yellow-stripe" id="dataTableReload"><i
										class="fa fa-refresh"></i><span class="hidden-480">
											重新载入</span></a>

								</div>

								<div class="actions">
									<div class="btn-group">
										<div
											class="dropdown-menu hold-on-click dropdown-checkboxes pull-right"
											id="dataTableToggleColumn"></div>
									</div>
								</div>
							</div>






							<div class="container" style="margin-top: 10%">
								<div class="row">
									<div class="col-md-2 col-sm-4 col-xs-5 col-md-offset-2"
										style="margin-left: 7%">
										<img src="${companyInfo.image}" alt=""
											style="width: 100%; height: 100%; display: block;">
									</div>
									<div class="col-md-8 col-sm-8 col-xs-7">
										<form class="form-horizontal">
											<div class="form-group">
												<div class="col-sm-2 control-label"  style="padding-top:0px;">
													<label style="font-size:17px;">单位名称：</label>
												</div>
												<div class="col-sm-10">
													<label style="font-size:17px;" id="cName">${companyInfo.companyName}</label>
												</div>
											</div>
											<div class="form-group">
												<div class="col-sm-2 control-label"   style="padding-top:0px;">
													<label style="font-size:17px;">单位地址：</label>
												</div>
												<div class="col-sm-10">
													<label style="font-size:17px;">${companyInfo.companySite}</label>
												</div>
											</div>
											<div class="form-group">
												<div class="col-sm-2 control-label"  style="padding-top:0px;">
													<label style="font-size:17px;">联系人：</label>
												</div>
												<div class="col-sm-10">
													<label style="font-size:17px;">${companyInfo.companyLinker}</label>
												</div>
											</div>
											<div class="form-group">
												<div class="col-sm-2 control-label" style="padding-top:0px;">
													<label style="font-size:17px;">联系电话：</label>
												</div>
												<div class="col-sm-10">
													<label  style="font-size:17px;">${companyInfo.companyLinkMethod}</label>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade bs-modal-lg" id="modalDialog" tabindex="-1"
		data-keyboard="false" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog modal-md">
			<div class="modal-content" id="modalContent">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true"></button>
					<h4 class="modal-title" id="modalTitle"></h4>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<div class="col-md-8">
								<div class="fileinput fileinput-new" data-provides="fileinput"
									id="uploadImageDiv">
									<div class="fileinput-new thumbnail"
										style="width: 200px; height: 150px;">
										<img src="${companyInfo.image}" alt="" />
									</div>
									<div class="fileinput-preview fileinput-exists thumbnail"
										style="max-width: 200px; max-height: 150px;"></div>
									<div>
										<span class="btn default btn-file"> <span
											class="fileinput-new">选择图片</span> <span
											class="fileinput-exists">更改</span> <input type="file"
											name="uploadImage" id="uploadImage" /></span> <a href="#"
											class="btn default fileinput-exists" data-dismiss="fileinput">移除</a>
										<span>请选择1M以内图片</span>
									</div>
								</div>
								<div id="titleImageError" style="color: #a94442"></div>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="modal-body form">
							<form id="dialogForm" class="form-horizontal">
								<div class="form-body">
									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
												<div class="col-md-5">
													<input type="text" 
														class="form-control input-medium"
														placeholder="${companyInfo.companyName}" id="companyName"
														name="companyName">
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
												<div class="col-md-5">
													<input type="text" class="form-control input-medium"
														placeholder="${companyInfo.companySite}" id="companySite"
														name="companySite">
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
												<div class="col-md-5">
													<input type="text" class="form-control input-medium"
														placeholder="${companyInfo.companyLinker}"
														id="companyLinker" name="companyLinker"> <span
														class="help-block"></span>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
												<div class="col-md-7">
													<input type="text" class="form-control input-medium"
														placeholder="${companyInfo.companyLinkMethod}"
														id="companyLinkMethod" name="companyLinkMethod"> <span
														class="help-block"></span>
														<div class="po_phone_num">请输入正确的手机号码</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
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
	<jsp:include page="../includes/confirmdiv.jsp" />
	<%@include file="../includes/bottomscript.jsp"%>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-image.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-process.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/jquery-file-upload/js/jquery.fileupload-validate.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/bower_components/smalot-bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"/>"></script>
	<script type="text/javascript"
		src="<c:url value="/js/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"/>"></script>

	<script type="text/javascript"
		src="<c:url value="/js/bower_components/ckeditor/ckeditor.js"/>"></script>
	<script src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
	<script src="<c:url value="/js/companyInfo/companyInfo.js"/>"></script>
	<script type="text/javascript">
		$(function() {
			companyInfo.init();
		});
	</script>
</body>
</html>