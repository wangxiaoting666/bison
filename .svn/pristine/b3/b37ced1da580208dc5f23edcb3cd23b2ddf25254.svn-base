var organTree = function() {
	var basePath;

	var setting = {
		check : {
			enable : false
		},
		view : {
			selectedMulti : false,
		// addHoverDom: addHoverDom,
		// removeHoverDom: removeHoverDom,
		},
		data : {
			key : {
				name : "name"
			},
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pId"
			}
		},
		edit : {
			enable : true,
			removeTitle : "删除节点",
			showRemoveBtn : $("#pdelete").val() == "delete" ? setRemoveBtn : false,
			showRenameBtn : false
		},
		callback : {
			// onRightClick : onRightClick,
			// 单击事件
			onClick : zTreeOnClick,

			onNodeCreated : zTreeOnNodeCreated,

			beforeRemove : zTreeBeforeRemove,

			onRemove : zTreeOnRemove
		}
	};

	var zTreeObj;

	function initTree() {
		$.get(basePath + "/system/organ/getOrganTreeList", function(data) {
			zTreeObj = $.fn.zTree.init($("#organTree"), setting,
					data.returnData.organTree);
			zTreeObj.expandAll(false);
		});
	}

	// 控制节点是否显示删除图标
	function setRemoveBtn(treeId, treeNode) {
		return treeNode.pId != null;
	}

	// 给生成的节点添加class属性
	function zTreeOnNodeCreated(event, treeId, treeNode) {
		var str = treeNode.tId + "_span";
		$("#" + str).addClass(treeNode.type);
	}
	;

	// 删除之前事件
	function zTreeBeforeRemove(treeId, treeNode) {
		return confirm("是否确认删除？") == true;
	}
	// 删除节点事件
	function zTreeOnRemove(event, treeId, treeNode) {

		if (treeNode.type == "organ") {
			$.ajax({
				url : basePath + "/system/organ/" + treeNode.id,
				type : "DELETE",
				success : function(data) {
					$("#confirmDialog").modal("hide"); // 点击删除按钮，隐藏弹框
					if (customGlobal.ajaxCallback(data)) {
						location.reload();
					}
				}
			});
		} else {
			$.ajax({
				url : basePath + "/system/organ/deleteStaff/" + treeNode.id,
				type : "DELETE",
				success : function(data) {
					$("#confirmDialog").modal("hide"); // 点击删除按钮，隐藏弹框
					if (customGlobal.ajaxCallback(data)) {
						initTree();
					}
				}
			});
		}
	}

	// 单击事件，向后台发起请求
	function zTreeOnClick(event, treeId, treeNode) {
		if (treeNode.id == "1") {
			return;
		}
		$("#moreinform").show();
		$("#baseinform").hide();
		$(".po_phone_num_r").css("display", "none");
		$(" .po_email_r").css("display", "none");
		if (treeNode.type == "organ") {
			$("#organ").html("部门名称");
			$("#Partman").show();
			$("#Email").hide();
			$("#sorgan").html("上级部门");
			$("#partaddress").html("部门地址");
			$("#partman").html("部门负责人");
			$("#parttel").html("手机");

			if (treeNode.id == "1") {
				$("#po").hide();
			} else {
				$("#po").show();
			}
			$.ajax({
				url : basePath + "/system/organ/" + treeNode.id,
				type : "get",
				success : function(data) {
					var organ = data.returnData.organ;
					$("#organId").val(organ.organId);
					$("#sex").hide();
					$("#name").val(organ.organName);
					$("#diz").val(organ.address);
					$("#tel").val(organ.phone);
					$("#manage").val(organ.manager);
					$("#parentOrgan").val(organ.parentId);
				}
			});
		} else {
			$("#po").show();
			$("#organ").html("姓名");
			$("#sex").show();
			$("#Email").show();
			$("#Partman").hide();
			$("#sorgan").html("所属部门");
			$("#partaddress").html("职位");
			$("#parttel").html("手机");

			$.ajax({
				url : basePath + "/system/organ/getStaff/" + treeNode.id,
				type : "get",
				success : function(data) {
					var staff = data.returnData.staff;
					$("#organId").val(staff.id);
					$("#name").val(staff.name);
					$("#diz").val(staff.position);
					$("#tel").val(staff.tel);
					$("#profession").val(staff.sex)
					$("#Email02").val(staff.email);
					$("#parentOrgan").val(staff.organId);
				}
			});

		}
	}
	;

	/* 判断在哪一级部门 */
	function showContextMenu(type, leaf, x, y) {
		if (type == -1) {
			$(".dropdown-menu").find("li:not(:first)").hide();
		} else if (leaf) {
			$(".dropdown-menu").find("li:first").hide();
		} else {
			$(".dropdown-menu").find("li").show();
		}
		$("#treeContextMenu").css({
			"top" : y + "px",
			"left" : x + "px"
		}).show();
		$("body").on("mousedown", onBodyMouseDown);
	}

	function hideContextMenu() {
		$("#treeContextMenu").hide();
		$("body").off("mousedown", onBodyMouseDown);
	}

	function onBodyMouseDown(event) {
		if (!(event.target.id == "treeContextMenu" || $(event.target).parents(
				"#treeContextMenu").length > 0)) {
			hideContextMenu();
		}
	}
	// 点击重新载入，初始化树
	var handleEvent = function() {
		// $("#treeReload").on("click", initTree);
		$("#reload").on("click", function() {
			location.reload();
		});

		// 添加部门
		$("#addChildOrgan").on("click", function() {
			$(".po_phone_num").css("display", "none");
			$("#modalTitle").html("添加部门");
			$("#care").html("部门名称");
			$("#Sex").hide();
			$("#email").hide();
			/* $("#manager").show(); */
			$("#partment").html("上级部门");
			$("#adress").html("部门地址");

			$("#mangent").html("部门负责人");
			$("#phonetel").html("手机");

			$("#manager").show();

			$("#mangent").show();

			customGlobal.clearFormAndShowDialog("modalDialog");
			$("#addBtn").show();
			$("#updateBtn").hide();
			// 获取光标选中的(selected)
			var selectedNode = zTreeObj.getSelectedNodes()[0];

			initUser();
		});

		function getUserList() {
			var userList = [];
			var $organSelectList = $("#organSelectList2");
			$organSelectList.find("option").each(function() {
				var $this = $(this);
				userList.push({
					userId : $this.val()
				})
			});
			return userList;
		}
		// 请求后台添加部门
		$("#addBtn").on("click", function() {
			$("#phone").trigger("blur");

			if (juddge02) {
				$.ajax({
					url : basePath + "/system/organ",
					dataType : "json",
					data : JSON.stringify({
						organName : $("#organName").val(),
						parentId : $("#parentId").val(),
						address : $("#address").val(),
						manager : $("#manager").val(),
						phone : $("#phone").val()
					}),
					contentType : "application/json; charset=utf-8",
					type : "post",
					success : function(data) {
						if (customGlobal.ajaxCallback(data)) {
							$("#modalDialog").modal("hide");
							location.reload();
						}
					}
				});
			} else {
				alert("手机格式有误");
			}

		});
		// 添加员工
		$("#toUpdateBtn").on("click", function() {

			$(".po_phone_num").css("display", "none");
			$("#modalTitle").html("新建员工");
			$("#care").html("姓名");
			$("#Sex").show();
			$("#email").show();
			$("#manager").hide();
			$("#partment").html("所属部门");
			$("#adress").html("职位");

			$("#mangent").hide();

			$("#phonetel").html("手机");
			customGlobal.clearFormAndShowDialog("modalDialog");
			$("#addBtn").hide();
			$("#updateBtn").show();
			var organ = data.returnData.organ;

		});
		// 请求后台添加员工
		$("#updateBtn").on("click", function() {
			$("#email1").trigger("blur");
			$("#phone").trigger("blur");
			if (juddge01 && juddge02) {

				$.ajax({
					url : basePath + "/system/organ/addStaff",
					dataType : "json",
					data : JSON.stringify({
						name : $("#organName").val(),
						sex : $("#profession1").val(),
						organId : $("#parentId").val(),
						position : $("#address").val(),
						email : $("#email1").val(),
						tel : $("#phone").val()
					}),
					contentType : "application/json; charset=utf-8",
					type : "post",
					success : function(data) {
						if (customGlobal.ajaxCallback(data)) {
							$("#modalDialog").modal("hide");
							initTree();
						}
					}
				})
			} else {
				alert("邮箱或手机格式有误");
			}
		});
	};

	// 离焦事件
	$("#search").focusout(function() {
		// $('#ret').hide();
	});

	// search的keyUp事件
	$("#search").keyup(
			function(event) {
				// 如果是enter健或者输入框的值为空，返回
				var str = $("#search").val();
				var key = str.replace("'", "")
				if (event.keyCode == 13 || key == "" || key == null) {
					return;
				}
				if (event.keyCode == 38 || event.keyCode == 40) {
					return;
				}
				$.ajax({
					url : basePath + "/system/organ/search",
					data : "key=" + key,
					type : "post",
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
								$('#search').val($(this).text());
								$('#search_result').empty();
								search();
							})
						} else {
							$('#search_result').empty();
							$('#search_result').css('display', 'none');
						}

					}
				});
			});

	// 执行查询
	$("#doSearch").click(function() {
		search();
	});

	// enter键盘事件

	var currentLine = 0;
	$("#search")
			.keydown(
					function(event) {
						if (event.keyCode == 13) {
							var val = $(".hover").html()
							if (val == '') {
								$("#organTree")
										.html(
												'<font color="grey" size="+6"><i   class="fa fa-search"/> 未搜索到部门或人员<font>');
								return;
							}
							$(this).val(val);
							currentLine = 0;
							search();
						}
						if (event.keyCode == 38) {
							console.info(currentLine);
							currentLine--;
							changeItem();
						}
						if (event.keyCode == 40) {
							console.info(currentLine);
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

	// 查询
	function search() {
		// 获取输入框中的值
		var name = $("#search").val();
		if (name != "" && name != null) {
			$
					.ajax({
						url : basePath + "/system/organ/queryOrganByName",
						type : "post",
						data : "name=" + name,
						success : function(data) {
							if (data.returnData.ztreeNode != "") {
								zTreeObj = $.fn.zTree.init($("#organTree"),
										setting, data.returnData.ztreeNode);
								$('#ret').hide();
							} else {
								$("#organTree")
										.html(
												'<font color="grey" size="+6"><i   class="fa fa-search"/> 未搜索到部门或人员<font>');
							}
						}
					});
		} else {
			initTree();
			$('#ret').hide();
		}
	}

	// 左右移动
	var organSelectList = function() {
		$(".fa-arrow-right").on(
				"click",
				function() {
					$("#organSelectList1 option:selected").appendTo(
							$("#organSelectList2"));
				});
		$(".fa-arrow-left").on(
				"click",
				function() {
					$("#organSelectList2 option:selected").appendTo(
							"#organSelectList1")
				})
	};

	// 修改后保存

	$("#keep").on("click", function() {
		$("#Email02").trigger("blur");
		$("#tel").trigger("blur");
		var vname = $("#organ").html();
		if (vname == "部门名称") {

			if (juddge04) {
				$.ajax({
					url : basePath + "/system/organ",
					dataType : "json",
					data : JSON.stringify({
						organId : $("#organId").val(),
						organName : $("#name").val(),
						address : $("#diz").val(),
						phone : $("#tel").val(),
						manager : $("#manage").val(),
						parentId : $("#parentOrgan").val()
					}),
					contentType : "application/json; charset=utf-8",
					type : "put",
					success : function(data) {
						if (customGlobal.ajaxCallback(data)) {
							initTree();
						}
					}
				})
			} else {
				alert("手机格式有误");
			}

		} else {
			if (juddge03 && juddge04) {

				$.ajax({
					url : basePath + "/system/organ/updateStaff",
					dataType : "json",
					data : JSON.stringify({
						id : $("#organId").val(),
						name : $("#name").val(),
						sex : $("#profession").val(),
						position : $("#diz").val(),
						tel : $("#tel").val(),
						email : $("#Email02").val(),
						organId : $("#parentOrgan").val()
					}),
					contentType : "application/json; charset=utf-8",
					type : "put",
					success : function(data) {
						if (customGlobal.ajaxCallback(data)) {
							initTree();
						}
					}
				})
			} else {
				alert("邮箱或手机格式有误");
			}

		}
	});

	// 验证邮箱
	var juddge01 = juddge02 = juddge03 = juddge04 = false;
	$("#email1")
			.blur(
					function() {
						var $email = $("#email1").val();
						var reg01 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;// 邮箱号
						if (reg01.test($email) || $email.length == 0) {
							$(".po_email").css("display", "none");
							juddge01 = true;

						} else {
							$(".po_email").css("display", "block");
							juddge01 = false;

						}
					})

	// 验证手机号码
	$("#phone").blur(function() {
		var $phone_num = $("#phone").val();
		var reg02 = /^1[3|4|5|7|8]\d{9}$/;// 手机号

		if (reg02.test($phone_num) || $phone_num.length == 0) {
			$(".po_phone_num").css("display", "none");
			juddge02 = true;

		} else {
			$(".po_phone_num").css("display", "block");
			juddge02 = false;

		}
	});

	/* 右侧页面的验证 */
	$("#Email02")
			.blur(
					function() {
						var $email_r = $("#Email02").val();
						var reg01 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;// 邮箱号
						if (reg01.test($email_r) || $email_r.length == 0) {
							$(".po_email_r").css("display", "none");
							juddge03 = true;

						} else {
							$(".po_email_r").css("display", "block");
							juddge03 = false;

						}
					})

	// 验证手机号码
	$("#tel").blur(function() {

		var $phone_num_r = $("#tel").val();
		// if(){}
		var reg02 = /^1[3|4|5|7|8]\d{9}$/;// 手机号

		if (reg02.test($phone_num_r) || $phone_num_r.length == 0) {
			$(".po_phone_num_r").css("display", "none");
			juddge04 = true;

		} else {
			$(".po_phone_num_r").css("display", "block");
			juddge04 = false;

		}

	})

	$(".toggle dl dd").hide();
	$(".toggle").show();
	$("#Hiden").css({
		"height" : "40px",
	});
	$("#organTree").css({
		"height" : "390px",
	});
	$(".toggle dl dt").toggle(function() {
		$(this).toggleClass("current");
		$("#Hiden").css({
			"height" : "131px",
		});
		$("#organTree").css({
			"height" : "299px",
		});
		$(".toggle dl dd").show();
	}, function() {
		$(this).toggleClass("current");
		$("#Hiden").css({
			"height" : "40px",
		});
		$("#organTree").css({
			"height" : "390px",
		});
		$(".toggle dl dd").hide();

	});
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
			initTree();
			handleEvent();
			organSelectList();
		}
	};

}();