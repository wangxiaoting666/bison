var alertHistoryTable = function() {
	// 预命名
	// var defaultOptions = CONSTANT.DATA_TABLES.DEFAULT_OPTION;
	// var ellipsis = CONSTANT.DATA_TABLES.RENDER.ELLIPSIS;

	// 历史轨迹
	AssetSavetype = null;
	AssetSelecttype = 'one';
	//placeid = '3';
	//floorid = '01';
	getFloorList();

	var pagePath = "alert/";
	var dic = {
		field : {}
	};
	var url = {
		list : basePath + pagePath + "getAlertHistoryListPage",
		check : basePath + pagePath + "checkAlert"
	};

	var $table = $("#dataTable");
	var $tbody = $("tbody", $table);
	var _table = {};

	var dataTableConfig = {
		"ajax" : {
			"url" : url.list,
		    "type" : "post"
		},

		"columns" : [
				{
					className : "td-checkbox",
					orderable : false,
					bSortable : false,
					data : "id",
					render : function(data, type, row, meta) {
						var content = '<label   style="margin-left:32px;"  class="mt-checkbox mt-checkbox-single mt-checkbox-outline">';
						content += '    <input type="checkbox"  name="test"  class="group-checkable"" value="'
								+ data + '" />';
						content += '</label>';
						return content;
					}
				},
				{
					data : 'alertData',
					orderable : false,
					searchable : false,
					render : function(data, type, row) {
						var newDate = new Date();
						newDate.setTime(data);
						var month = newDate.getMonth() + 1;
						var hours=newDate.getHours();
						if(hours<10){
							hours = "0"+hours;
						}
						var minutes=newDate.getMinutes();
						if(minutes<10){
							minutes = "0"+minutes;
						}
						var time = newDate.getFullYear()+"-"+month+"-"+newDate.getDate()+" "+hours+":"+minutes;
						return time;
					}
				},
				{
					data : 'alertClass',
					orderable : false,
					searchable : false,
					render : function(data, type, row) {
						if (data == "1") {
							return "位置报警";
						} else {
							return "SOS";
						}
					}
				},

				{
					data : 'deviceId',
					orderable : false,
					searchable : false
				},

				{
					data : 'deviceName',
					orderable : false,
					searchable : true,
				},
				{
					data : 'organName',
					orderable : false,
					searchable : true,
				},
				{
					data : 'deviceClass',
					orderable : false,
					searchable : true,
					render : function(data, type, row) {
						if (data = "0") {
							return "资产";
						} else {
							return "人员";
						}
					}
				},
				{
					data : 'deviceVersion',
					orderable : false,
					searchable : true,
				},
				{
					data : 'alertDescripe',
					orderable : false,
					searchable : true,
				},
				{
					data : 'checked',
					orderable : false,
					render : function(data, type, full) {
						var icon = data == '1' ? "fa fa-eye"
								: "fa fa-eye-slash";
						return data == '1' ? '<i class="' + icon
								+ '"></i><a class="edit" id="' + full.id
								+ '" deviceId="' + full.deviceId + '" date="'
								+ full.alertData
								+ '" style="cursor:pointer;">查看</a>'
								: '<i class="'
										+ icon
										+ '"></i><a class="edit" date="'
										+ full.alertData
										+ '" deviceId="'
										+ full.deviceId
										+ '" id="'
										+ full.id
										+ '"><font color="red" style="cursor:pointer;">点击查看</font></a>';
					}
				} ]
	};
	
	
	/*查询*/
	 $("#queryAlertInfo").on("click",function(){
         dataTable.reloadTable();
 });

 $("#reset").on("click",function(){
     $("#aDate").val("");
     $("#aClass").val("");
     $("#dId").val("");
     $("#dName").val("");
     $("#oid").val("");
     dataTable.reloadTable();
 });

	/* 批量删除 */
	$('#Button1').click(function() {
		if ($("input[name='test']:checked")[0] == null) {
			alert("请选择需要删除的消息");
			return;
		}
		var mymessage = confirm("确认删除吗？");
		if (mymessage == true) {

			var ids = new Array;
			$("input[name='test']:checked").each(function() {
				ids.push($(this).val());
				n = $(this).parents("tr").index() + 1; // 获取checkbox所在行的顺序
				$("table#dataTable").find("tr:eq(" + n + ")").remove();
			});

			$.ajax({
				url : basePath + "alert/deleteAlerts",
				data : "ids=" + ids,
				type : "post",
				dataType : "json",
				success : function(data) {
					location.reload();
				}
			});
		}
	})

	$table.on("click", "a.edit", function() {
		$("#modal").show();


		var deviceId = $(this).attr("deviceId");

		var date = new Date(parseInt($(this).attr("date")));
		var beginInterval = date.getTime() - 3600000;
		var endInterval = date.getTime() + 3600000;
		var beginDate = getdate(new Date(beginInterval));
		var endDate = getdate(new Date(endInterval));

		function getdate(date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			return year + "-" + month + "-" + day + " " + hour + ":" + minute
					+ ":" + second;
		}
		loadInitAsset(deviceId);
		initLoadMap('fencemap');
		getAssetRouteMain(deviceId, beginDate, endDate);
		// 更新数据库的状态
		checkAlert($(this).attr("id"));
		dataTable.reloadTable();
	});
	
	/*关闭事件*/
	$("#close").click(function() {
	$("#modal").hide();
	/*location.reload();*/
	
	})
	$("#close1").click(function() {	
	$("#modal").hide();
	/*location.reload();*/
	})

	/** initConfig* */
	var initConfig = {
		src : $table,
		onQuery : function(data) {
			data.aDate = $("#aDate").val();
			data.alertClass = $("#aClass").val();
			data.deviceId = $("#dId").val();
			data.deviceName = $("#dName").val();
			data.organId = $("#oid").val();
		},
		onSortColumn : function(sortColumn, sortDirection) {
			return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
		},
		dataTable : dataTableConfig
	};
	var handleRecords = function() {
		dataTable = new Datatable();
		dataTable.init(initConfig);
		_table = dataTable.getDataTable();
	};

	return {
		init : function() {
			handleRecords();
		},
		_table : _table
	}
};