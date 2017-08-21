<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<head>
    <%@include file="../includes/head.jsp" %>
    <title>${menu.menuName}</title>
    <link rel="stylesheet" type="text/css"
          href="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>"/>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ol.css"/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value="/css/global/ol3-base_3d.css"/>" />

<!-- 日历 -->
<script src="<c:url value="/date/jedate/jedate.js"/>"></script>
<!-- 地图 -->
<script src="<c:url value="/js/asset/ol-debug.js"/>"></script>
<script src="<c:url value="/js/asset/jquery-1.9.1.js"/>"></script>
<!-- 弹框 -->
<script src="layer/layer.js"></script>
<script src="layer/extend/layer.ext.js"></script>

<script src="<c:url value="/js/asset/asset_common.js"/>"></script>
<script src="<c:url value="/js/asset/asset_style.js"/>"></script>
<script src="<c:url value="/js/asset/asset_init.js"/>"></script>
<script src="<c:url value="/js/asset/asset_base_fun.js"/>"></script>


</head>

<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp" %>
<div class="page-container">
    <%@include file="../includes/sidebar.jsp" %>
    <div class="page-content-wrapper">
        <div class="page-content">
            <%@include file="../includes/current.jsp" %>
              <!--  搜索框 -->
           <div class="row" style="overflow: hidden; margin-left: 2px;">
					<input style="float: left;  width:220px;" type="text"
						class="form-control input-medium" placeholder="告警日期"
						name="alertDateQuery" id="aDate">
					<select style="float: left; width:220px;" class="form-control input-medium" id="aClass" placeholder="告警类别">
					    <option value="">告警类型</option>
					    <option value="1">位置告警</option>
					    <option value="0">SOS</option>
					</select>
					 <input style="float: left; width:220px;" type="text"
						class="form-control input-medium" placeholder="人资编号"
						name="deviceIdQuery" id="dId"> 
					<input  style="float: left;width:220px;" type="text" class="form-control input-medium"
						placeholder="人资名称" name="deviceNameQuery" id="dName">
						
				     <select style="float: left;width:220px;" class="form-control input-medium" id="oid" placeholder="所属部门">
					    <option value="">所属部门</option>
						<c:forEach var="organ" items="${organList}">
							  <option value="${organ.organId}">${organ.organName}</option>
						  </c:forEach>
					</select>		

					<div class="form-group last">
						<button type="button" class="btn red"   id="queryAlertInfo">查询</button>
						<button type="button" class="btn default"  id="reset">重置</button>
            
            
            <div class="row">
                <div class="col-md-12">
                    <div class="portlet">
                        <div class="portlet-title">
                            <%-- <div class="caption">
                                <i class="${menu.icon}"></i>${menu.menuName}
                            </div> --%>
                            <div class="actions">
                                <a href="javascript:;" class="btn default yellow-stripe" id="dataTableReload">
                                    <i class="fa fa-refresh"></i><span class="hidden-480">重新载入</span></a>
                                    <a href="javascript:;" class="btn default yellow-stripe"><i
										class="fa fa-minus"></i><span class="hidden-480"
										id="Button1"> 删除信息</span></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                       <th style="width: 44.8889px;"> 全选  
                                           <input type="checkbox" name="keeperUserGroup-checkable" class="group-checkable" data-set="#sample_1 .checkboxes" />  
                                
                                       </th>  
                                        <th>告警日期</th>
                                        <th>告警类型</th>
                                        <th class="a">人资编号</th>
                                        <th>人资名称</th>
                                        <th>所属部门</th>
                                        <th>人资类型</th>
                                        <th>型号/性别</th>
                                        <th class="b">告警详情</th>
                                        <th>位置详情</th>
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
<div class=""   style="position:absolute; top:20px; left:300px; display:none;" id="modal"  >
		<div class="modal-dialog modal-lg">
			<div class="modal-content" >
				<div class="modal-header">
					<button type="button" class="close"  id="close" data-dismiss="modal"
						aria-hidden="true"></button>
					<h4 class="modal-title" id="modalTitleRole">查看信息</h4>
				</div>
				
				


				<div  class="tab-content">
					
													<!-- ---------------------------------- -->
													<div id="fencemap" class="routemap"  >
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


                <div class="modal-footer">
				<button type="button" class="btn default" data-dismiss="modal"  id="close1">关闭</button>
					
					
				</div>
				
			</div>
		</div>
	</div>
<jsp:include page="../includes/confirmdiv.jsp"/>
<%@include file="../includes/footer.jsp" %>
<%@include file="../includes/bottomscript.jsp" %>
<script type="text/javascript"
        src="<c:url value="/js/bower_components/DataTables/media/js/jquery.dataTables.min.js"/>"></script>
<script type="text/javascript"
        src="<c:url value="/js/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/global/scripts/datatable.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/alert/alertHistory.js"/>"></script>
<script type="text/javascript">

jeDate({
	dateCell:"#aDate",
	format:"YYYY-MM-DD",//控制是否显示小时
})
    $(function () {
        alertHistoryTable().init();
    });
    
   
</script>
</body>

</html>