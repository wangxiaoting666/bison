var assetListTable = function() {

			var basePath;
			var dataTable;
			var $table = $("#dataTable");
			/**
			 * dataTable事件初始化方法
			 */
			var handleRecords = function() {
				dataTable = new Datatable();
				dataTable
						.init({
							src : $table,
							onQuery : function(data) {
								data.assetName = $("#assetName").val();
								data.classId = $("#classfiy").val();
								data.organId = $("#selectOrgan").val();
								data.user = $("#assetUser").val();
							},
							dataTable : {
								"ajax" : {
									"url" : basePath + "/asset/getAssetListPage" // ajax
									// source
								},
								"columns" : [
										{
											data : 'assetId',
											orderable : false,
											render : function(data, type, full) {
												return '<input type="checkbox"   name="test"   value="'
														+ full.id
														+ '"  assetId="'
														+ full.assetId + '"/>';
											}
										},
										{
											data : 'assetId',
											orderable : true,
											searchable : true
										},
										{
											data : 'assetName',
											orderable : true,
											searchable : true
										},
										{
											data : 'className',
											orderable : true,
											searchable : true
										},
										{
											data : 'version',
											orderable : true,
											searchable : true
										},
										{
											data : 'organName',
											orderable : true,
											searchable : true
										},
										{
											data : 'grade',
											orderable : true,
											searchable : true,
											render : function(data, type, full) {
												if (data == "o") {
													return "一般";
												} else if (data == "1") {
													return "重要";
												} else {
													return "非常重要";
												}
											}
										},
										{
											data : 'person',
											orderable : true,
											searchable : true
										},
										{
											data : 'user',
											orderable : true,
											searchable : true
										},
										{
											data : 'operate',
											orderable : false,
											render : function(data, type, full) {// //渲染方式设置为table
												if($("#pupdate").val() == "1"){
													return '<a class="check btn default btn-xs purple" assetId="'
													+ full.id
													+ '">查看</a>&nbsp;<shiro:hasPermission name="fansai:assetInfoUpdate:open"><a class="edit btn default btn-xs purple" assetId="'
													+ full.id
													+ '">编辑</a></shiro:hasPermission>';
												}
												return '<a class="check btn default btn-xs purple" assetId="'+ full.id+ '">查看</a>';
											}
										} ]
							}
						});
			};

			function fun(str) {
				obj = document.getElementsByName(str);
				check_val = [];
				for (k in obj) {
					if (obj[k].checked)
						check_val.push(obj[k].value);
				}
				return check_val;
			}

			var handleEvent = function() {

				$("#reload").on("click", function() {
					$("#assetName").val("");
					$("#classfiy").val("");
					$("#selectOrgan").val("");
					$("#assetUser").val("");
					dataTable.reloadTable();
				});

				$("#queryAssetInfo").on("click", function() {
					dataTable.reloadTable();
				});

				$("#reset").on("click", function() {
					$("#assetName").val("");
					$("#classfiy").val("");
					$("#selectOrgan").val("");
					$("#assetUser").val("");
					dataTable.reloadTable();
				});

				// 添加资产
				$("#addAsset").on("click", function() {
					layer.open({
						type : 2,
						title : '添加资产',
						area : [ '1000px', '600px' ],
						fix : false, // 
						content : basePath + '/asset/toAddassetMap',
						end : function() {
							dataTable.reloadTable();
						}
					});
				});
				// 添加资产后保存

				// 查看资产信息
				$table.on("click", "a.check", function() {
					layer.open({
						type : 2,
						title : '查看资产',
						area : [ '1000px', '600px' ],
						fix : false, // 
						content : 'jsp/asset/checkassetMap.jsp?assetId='
								+ $(this).attr("assetId"),
						end : function() {
							dataTable.reloadTable();
						}
					});
				});
				// 编辑资产
				$table.on("click", "a.edit", function() {
					layer.open({
						type : 2,
						title : '编辑资产',
						area : [ '1000px', '600px' ],
						fix : false, // 
						content : basePath + '/asset/toEditassetMap?assetId='
								+ $(this).attr("assetId"),
						end : function() {
							dataTable.reloadTable();
						}
					});
					/*
					 * alert(1); assetListTable.init();
					 */
				});

				function fun() {
					var objs = $("#dataTable input[type=checkbox]:checked");
					var check_val = "";
					$.each(objs, function(index, obj) {
						check_val += objs[index].defaultValue + "%";
					});
					return check_val;
				}

				function f() {
					var objs = $("#dataTables input[type=checkbox]:checked");
					var check_val = "";
					$.each(objs, function(index, obj) {
						check_val += "'" + objs[index].defaultValue + "'" + ",";
					});
					// check_val=check_val.substring(0,lastIndexOf('',check_val))
					return check_val;
				}

			};

			// checkbox删除
			$("#assetremove").click(function() {
				if ($("input[name='test']:checked")[0] == null) {
					alert("请勾选需要删除的资产");
					return;
				}
				var mymessage = confirm("确认删除吗？");
				if (mymessage == true) {
					$("input[name='test']:checked").each(function() { // 遍历选中的checkbox
						$.ajax({
							url : "asset/deleteAsset",
							data : "id=" + $(this).val(),
							dataType : "json",
						});
						// 页面删除
						n = $(this).parents("tr").index() + 1; // 获取checkbox所在行的顺序
						$("table#dataTable").find("tr:eq(" + n + ")").remove();
						// 地图服务器删除
						deleteAssetInfo($(this).attr("assetId"));
					});
				}
			});

			// 删除
			/*$table.on("click", "a.delete", function() {
				var mymessage = confirm("确认删除嘛？");
				if (mymessage == true) {
					$.ajax({
						url : "asset/deleteAsset",
						data : "id=" + $(this).attr("assetId"),
						success : function(data) {
							if (customGlobal.ajaxCallback(data)) {
								dataTable.reloadTable();
								deleteAssetInfo($(this).attr("aId"));
							}
						}
					});
				}
			});*/

			// 获取项目路径
			function getContextPath() {
				var currentPath = window.document.location.href;
				var pathName = window.document.location.pathname;
				var pos = currentPath.indexOf(pathName);
				var localhostPath = currentPath.substring(0, pos);
				var projectName = pathName.substring(0,
						pathName.substr(1).indexOf('/') + 1);
				return (localhostPath + projectName);
			}
			return {
				init : function() {
					basePath = getContextPath();
					handleRecords();
					handleEvent();
				}
			};
		}();