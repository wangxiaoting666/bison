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
<style>
#scale {
	background: #FFFFFF url('img/suo.png') no-repeat scroll
		0px 0px;
	background-position: center center;
	position:absolute; 
	left:3%;
	bottom:10%;
	width:26px;
	height:26px;
	
	
}
#scale.current {
	background: #FFFFFF url('img/fullscreen-exit.png') no-repeat
		scroll 0px 0px;
	background-position: center center;
}
/*弹出*/
.po_phone_num {
	display: none;
	margin-left: 228px;
	color: deeppink;
}

.po_phone_num_person {
	display: none;
	margin-left: 228px;
	color: deeppink;
}

#search_result{
            width:300px;
            position:absolute;
            left:134px;
            top:290px;
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

<!-- 日历 -->
<script src="<c:url value="/date/jedate/jedate.js"/>"></script>
<!-- 地图 -->
<script src="<c:url value="/js/asset/ol-debug.js"/>"></script>
<script src="<c:url value="/js/asset/jquery-1.9.1.js"/>"></script>
<script src="<c:url value="/js/asset/asset_common.js"/>"></script>
<script src="<c:url value="/js/asset/asset_style.js"/>"></script>
<script src="<c:url value="/js/asset/asset_init.js"/>"></script>
<script src="<c:url value="/js/asset/asset_base_fun.js"/>"></script>

<style type="text/css">
</style>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">


	<!-- 添加资产 -->

	<!-- 查看资产信息角色 -->


	<div>
		<div class="">
			<div class="modal-content" id="">


				<!--切换按钮 -->

				<ul id="myTab" class="nav nav-tabs">
					<li class="active"><a href="#home" data-toggle="tab"> 基本信息</a>
					</li>
					<li><a href="#ios" data-toggle="tab">高级信息</a></li>

				</ul>


				<div id="myTabContent" class="tab-content">
					<!-- 基本信息 -->
					<div class="tab-pane fade in active" id="home">
						<div class="modal-body form">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<div class="col-md-9 col-sm-8 col-xs-12">
											<div class="white_content  col-md-12">
												<form role="form" class="form-horizontal" id="dialogForm">
													<input type="text" id="id1" hidden="true" />
													<div class="form-group">
														<label class="col-sm-2 control-label" for="" id="">资产编号<span
															class="required"> * </span></label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="assetId1"
																placeholder=""></input> <font color="red"
																id="validateAssetId"></font>
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label" for="" id="">资产名称<span
															class="required"> * </span></label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="assetName1"
																placeholder=""></input> <font color="red"
																id="validateAssetName"></font>
														</div>
													</div>
													<div class="row">
														<div class="col-md-6">
															<div class="form-group">
																<label class="col-md-4 control-label">资产分类<span
																	class="required"> * </span></label>
																<div class="col-md-8">
																	<select id="className1" class="form-control select2"
																		style="width: 445px;" placeholder="角色">
																		<option value="">请选择</option>
																		<c:forEach var="classify" items="${twoClassList}">
																			<option value="${classify.classId}">${classify.className}</option>
																		</c:forEach>
																	</select> <font color="red" id="validateAssetClass"></font>
																</div>
															</div>
														</div>
													</div>

													<div class="form-group">
														<label class="col-sm-2 control-label" for="">资产简称</label>
														<div class="col-sm-8">
															<input type="text" class="form-control"
																id="abbreviation1" placeholder=""></input>
														</div>
													</div>

													<div class="form-group">
														<label class="col-sm-2 control-label" for="">资产型号</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="version1"
																placeholder=""></input>
														</div>
													</div>

													<div class="row">
														<div class="col-md-6">
															<div class="form-group last">
																<label class="col-md-4 control-label">归属单位<span
																	class="required"> * </span></label>
																<div class="col-md-8">
																	<select id="homeUnit1" class="form-control select2"
																		style="width: 445px;" placeholder="所属单位">
																		<option value="">请选择</option>
																		<c:forEach var="organ" items="${organList}">
																			<option value="${organ.organId}">${organ.organName}</option>
																		</c:forEach>
																	</select> <font color="red" id="validateAssetOrgan"></font>
																</div>
															</div>
														</div>
													</div>

													<div class="row">
														<div class="col-md-6">
															<div class="form-group last">
																<label class="col-md-4 control-label">重要等级<span
																	class="required"> * </span></label>
																<div class="col-md-8">
																	<select id="grade1" class="form-control select2"
																		style="width: 445px;" placeholder="角色">
																		<option value="">请选择</option>
																		<option value="2">非常重要</option>
																		<option value="1">重要</option>
																		<option value="0">一般</option>
																	</select> <font color="red" id="validateAssetGrade"></font>
																</div>
															</div>
														</div>
													</div>

													<div class="row">
														<div class="col-md-12">
															<div class="form-group">
																<label class="col-md-2 control-label" id="initGeom1">初始位置<span
																	class="required"> * </span></label>
															</div>
														</div>
													</div>

													<!-- ---------------------------------- -->
													<div id="updmap" class="updmapmap">
														<img class="updmap-initcenterimg"
															src="./icon/asset_setcenter.png " />
														<div id="scale"  style=""></div>

															
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

												</form>
											</div>
										</div>

									</div>
								</div>
							</div>

						</div>
					</div>
					<!-- 高级信息 -->
					<div class="tab-pane fade" id="ios">

						<div class="modal-body form">

							<div class="row">
								<div class="col-md-12">
									<div class="form-group">


										<div class="col-md-9 col-sm-8 col-xs-12">
											<div class="white_content  col-md-12">
												<form role="form" class="form-horizontal">
													<div class="form-group">
														<label class="col-sm-2 control-label" for="" id="">厂商名称</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="factoryName1"
																placeholder=""></input>
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label" for="" id="">采购价格</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="buyPrice1"
																placeholder=""></input>
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label" for="" id="">采购日期</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="buyDate1"
																placeholder=""></input>
														</div>
													</div>



													<div class="form-group">
														<label class="col-sm-2 control-label" for="">经销商</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="agency1"
																placeholder=""></input>
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label" for="">经销商联系方式</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="agencyPhone1"
																placeholder=""></input>
														</div>
														<div class="po_phone_num">手机号码格式有误</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label" for="">责任人</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="person1"
																placeholder=""></input>
														</div>
													</div>
													<div id="search_result"   class=" "></div>	

													<div class="form-group">
														<label class="col-sm-2 control-label" for="">使用者</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="user1"
																placeholder=""></input>
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-2 control-label" for="">使用者手机号</label>
														<div class="col-sm-8">
															<input type="text" class="form-control" id="userPhone1"
																placeholder=""></input>
														</div>
														<div class="po_phone_num_person">手机号码格式有误</div>
													</div>
													<div class="row">
														<div class="col-md-6">
															<div class="form-group last">
																<label class="col-md-4 control-label">备注<span
																	class="required"> * </span></label>
																<div class="col-md-8">
																	<textarea class="form-control input-medium"
																		placeholder="" id="remark1" name=""></textarea>
																</div>
															</div>
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
				<div class="modal-footer">
					<button type="button" class="btn default" data-dismiss="modal"
						id="close">关闭</button>
					<button type="button" class="btn blue" id="addBtn">保存</button>
				</div>
			</div>
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
		jeDate({
			dateCell : "#buyDate1",
			format : "yyyy-MM-dd HH:mm:ss",//控制是否显示小时
		})

		$(function() {
			assetListTable.init();
		});
	</script>
	<script type="text/javascript">
		//验证手机号码
		$("#agencyPhone1").blur(function() {
			//alert(1)
			var $phone_num = $("#agencyPhone1").val();
			var reg02 = /^1[3|4|5|7|8]\d{9}$/;//手机号
			if (reg02.test($phone_num)) {
				$(".po_phone_num").css("display", "none");
			} else {
				$(".po_phone_num").css("display", "block");
			}
		})
		$("#userPhone1").blur(function() {
			//alert(1)
			var $phone_num_person = $("#userPhone1").val();
			var reg01 = /^1[3|4|5|7|8]\d{9}$/;//手机号
			if (reg01.test($phone_num_person)) {
				$(".po_phone_num_person ").css("display", "none");
			} else {
				$(".po_phone_num_person").css("display", "block");
			}

		})

		// 添加资产
		AssetSavetype = 'add';// 新增资产
		AssetSelecttype = null;
		getFloorList();
		loadInitAsset('0');
		initLoadMap('updmap');
		$("#modal").width("500");
		$("#modal").height("100");

		//添加后保存
		var index = parent.layer.getFrameIndex(window.name);
		$("#addBtn").on("click", function() {
			//验证字段
			var num = validate();
			if (num == 0) {
				return
			}

			// 获取资产定位点的位置
			getAssetCenter();
			$.ajax({
				url : "asset",
				data : {
					assetId : $("#assetId1").val(),
					assetName : $("#assetName1").val(),
					classId : $("#className1 option:selected").val(),
					className : $("#className1 option:selected").html(),
					abbreviation : $("#abbreviation1").val(),
					version : $("#version1").val(),
					organId : $("#homeUnit1  option:selected ").val(),
					organName : $("#homeUnit1  option:selected ").html(),
					grade : $("#grade1  option:selected ").val(),

					// 高级信息
					factoryName : $("#factoryName1").val(),
					buyPrice : $("#buyPrice1").val(),
					buyDate : $("#buyDate1  option:selected ").val(),
					agency : $("#agency1").val(),
					agencyPhone : $("#agencyPhone1").val(),
					person : $("#person1").val(),
					user : $("#user1").val(),
					userPhone : $("#userPhone1").val(),
					remark : $("#remark1").val(),
					y : assetCenter[0],
					x : assetCenter[1],
					initFloor : floorid,
					initBuilding : placeid,
				},
				type : "post",
				success : function(data) {
					if (customGlobal.ajaxCallback(data)) {
						saveAssetInfo();
						//dataTable.reload();
					}
				}
			});

		})
		$('#close').on('click', function() {
			parent.layer.close(index);
		});

		// 资产责任人的keyUp事件
		$("#person1").keyup(
				function(event) {
					// 如果是enter健或者输入框的值为空，返回
					var str = $("#person1").val();
					var key = str.replace("'", "")
					if (event.keyCode == 13 || key == "" || key == null) {
						return;
					}
					if (event.keyCode == 38 || event.keyCode == 40) {
						return;
					}
					$.ajax({
						url : basePath + "/asset/search",
						type : "post",
						data : "key=" + key,
						success : function(data) {
							if (data != null) {
								var arr;
								arr = data.returnData.nameList.split(",");
								var laver;
								laver = "<table id='ret'>";
								for (var i = 0; i < arr.length; i++) {
									laver += "<tr id='sel'><td class='line'>"
											+ arr[i] + "</td></tr>";
								}
								laver += "</table>";
								$('#search_result').empty();
								$('#search_result').html(laver);
								$('.line:first').addClass('hover');
								$('#search_result').css('display', '');

								$('.line').hover(function() {
									$('.line').removeClass('hover');
									$(this).addClass('hover');
								}, function() {
									$(this).removeClass('hover');
								});
								$('.line').click(function() {
									var text = $(this).text();
									$('#person1').val(text.substring(0,text.indexOf("(")));
									$('#search_result').empty();
								})
							} else {
								$('#search_result').empty();
								$('#search_result').css('display', 'none');
							}
						}
					});
				});

		// enter键盘事件
		var currentLine = 0;
		$("#person1").keydown(function(event) {
			if (event.keyCode == 13) {
				var val = $(".hover").html()
				if (val == '') {
					return;
				}
				$(this).val(val.substring(0,val.indexOf("(")));
				$('#search_result').empty();
				$('#search_result').css('display', 'none');
				currentLine = 0;
			}
			if (event.keyCode == 38) {
				currentLine--;
				changeItem();
			}
			if (event.keyCode == 40) {
				currentLine++;
				changeItem();
			}
		});

		// 方向盘调用的事件
		function changeItem() {
			$('.line').removeClass('hover');
			if (currentLine < 0) {
				currentLine = $("#ret .line").length - 2;
			}
			if (currentLine == $("#ret .line").length - 1) {
				currentLine = 0;
			}
			$(".line:eq(" + currentLine + ")").addClass('hover');
		}

		//验证
		function validate() {
			if ($("#assetId1").val() == '') {
				$("#validateAssetName").html("");
				$("#validateAssetClass").html("");
				$("#validateAssetGrade").html("");
				$("#validateAssetOrgan").html("");
				$("#validateAssetId").html("资产编号不可为空");
				return 0;
			}
			if ($("#assetName1").val() == '') {
				$("#validateAssetId").html("");
				$("#validateAssetClass").html("");
				$("#validateAssetGrade").html("");
				$("#validateAssetOrgan").html("");
				$("#validateAssetName").html("资产名称不可为空");
				return 0;
			}
			if ($("#className1 option:selected").val() == '') {
				$("#validateAssetId").html("");
				$("#validateAssetName").html("");
				$("#validateAssetGrade").html("");
				$("#validateAssetOrgan").html("");
				$("#validateAssetClass").html("资产分类不可为空");
				return 0;
			}
			if ($("#homeUnit1  option:selected").val() == '') {
				$("#validateAssetId").html("");
				$("#validateAssetName").html("");
				$("#validateAssetClass").html("");
				$("#validateAssetGrade").html("");
				$("#validateAssetOrgan").html("所属部门不可为空");
				return 0;
			}
			if ($("#grade1  option:selected ").val() == '') {
				$("#validateAssetId").html("");
				$("#validateAssetName").html("");
				$("#validateAssetClass").html("");
				$("#validateAssetOrgan").html("");
				$("#validateAssetGrade").html("资产等级不可为空");
				return 0;
			}
			return 1;
		}
		
		/* 地图缩放 */
	 $("#scale").toggle(function(){ 
				 $(this).toggleClass("current"); 
                 $("#updmap").css({
                  "width":"950px",
					  "height":"400px",
					  "position":"absolute",
					  "margin-left":"0px",
					  "top":"0",
					  "left":"0"
                 }); 
                 $(".updmap-initcenterimg").css({
    			 "position":"absolute",
    					"left":"459px",
    					"top":"172px"
                    });
                 map.setSize([950,400]);
          },function(){
            	 $(this).toggleClass("current"); 
                 $("#updmap").css({
                "position": "relative",
                "width":"400px",
                "height":"200px",
                "margin-left":"80px",
             	"background-color":" rgba(255,250,250,1)"
			  }); 
                 $(".updmap-initcenterimg").css({
     			 "position":"absolute",
     					"left":"184px",
     					"top":"72px"
                     });
            	 map.setSize([400,200]);
             });
	</script>


</body>
</html>