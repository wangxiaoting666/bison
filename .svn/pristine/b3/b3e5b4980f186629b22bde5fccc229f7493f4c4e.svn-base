var resource = function() {
	
	// 资产定位
	AssetSavetype = null;// 新增资产
	AssetSelecttype = 'all';
	//placeid = '3';
	//floorid = '01';
	getFloorList();	
	loadInitAsset('0');		
	initLoadMap('locatemap');
	getAssetPopup(initAssetLayer);
	getAssetLocateMain();
	
	var basePath;
	var url;

	var setting = {
		check : {
			enable : true,
			chkStyle : "checkbox",
			chkboxType: { "Y": "s", "N": "s"}
		},
		view : {
			selectedMulti : true,
			showLine : false
		},
		data : {
			key : {
				name : "name"
			},
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pId",
			}
		},
		async : {
			enable : true,
			url : "/bison/node/getTree",
			autoParam : [ "id" ],
			type : "get",
			dataFilter : ajaxDataFilter,
			dataType : "json"
		},
		callback: {
			beforeCheck: zTreeBeforeCheck,
			onCheck : zTreeOnCheck,
		}
	};

	var zTreeObj;

	//初始化根节点
	function initTree() {
		$.get(basePath + "/node/initNode", function(data) {
			zTreeObj = $.fn.zTree.init($("#zTree"), setting,
					data.returnData.node);
		});
	}

	// 异步加载数据过滤器
	function ajaxDataFilter(treeId, parentNode, responseData) {
		return responseData.returnData.treeList;
	};

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
	
	//节点勾选前事件
	function zTreeBeforeCheck(treeId, treeNode) {
	    return true;
	};
	
	//节点勾选事件
	function zTreeOnCheck(event, treeId, treeNode) { 
	    
		var arr = new Array();
		var treeObj = $.fn.zTree.getZTreeObj("zTree"), 
		nodes = treeObj.getCheckedNodes(true);
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].type == 'asset') {
				arr.push("'" + nodes[i].id + "'");
				//arr.push(nodes[i].id);
			}
		}
		saveArrIdToLocate(arr);
	};
	
	// search的keyUp事件
	$("#search").keyup(
			function(event) {
				// 如果是enter健或者输入框的值为空，返回
				var str = $("#search").val();
				var key = str.replace("'","")
				if (event.keyCode == 13 || key == "" || key == null) {
					return;
				}
				if(event.keyCode == 38 || event.keyCode == 40){
					return;
				}
				$.ajax({
					url : basePath + "/node/search",
					type : "POST",
					data : "key="+key,
					success : function(data) {
						if (data != null) {
							var arr;
							arr = data.returnData.nameList.split(",");
							var laver;
							laver = "<table id='ret'>";
							for (var i = 0; i < arr.length; i++) {
								laver += "<tr  id='sel'><td class='line'>" + arr[i]
										+ "</td></tr>";
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
	var currentLine=0;
	$("#search").keydown(function(event) {
		if (event.keyCode == 13) {
			
			var val = $(".hover").html();
			if(val == '' || val == null){
				$("#zTree").html('<font color="grey" size="+6"><i   class="fa fa-search"/> 未搜索到任何信息<font>');
			    return;
			}
			$(this).val(val);
			currentLine=0;
			search();
		}
		if(event.keyCode == 38){
			currentLine--;
		      changeItem();
		}
		if(event.keyCode == 40){
			currentLine++;
		      changeItem();

		}
	});
	
	//方向盘调用的事件
	function changeItem(){
		$('.line').removeClass('hover');
		 if(currentLine<0){
			    currentLine=$("#ret .line").length-2;
		}
		 if(currentLine==$("#ret .line").length-1){
			  currentLine=0;
		}
		 $(".line:eq("+currentLine+")").addClass('hover');
	}

	// 查询
	function search() {
		// 获取输入框中的值
		var name = $("#search").val();
		if (name != "" && name != null) {
			$.ajax({
				url : basePath + "/node/queryOrganOrAssetByName",
				type : "POST",
				data : "name="+name,
				success : function(data) {
					if (data.returnData.ztreeNode != "") {
						zTreeObj = $.fn.zTree.init($("#zTree"), setting,
								data.returnData.ztreeNode);
						$('#ret').hide();
					}else{
						$("#zTree").html('<font color="grey" size="+6"><i   class="fa fa-search"/> 没有该部门或资产<font>');
					}
				}
			});
		} else {
			initTree();
			$('#ret').hide();
		}
	}
	

	return {
		init : function() {
			basePath = getContextPath();
			initTree();
		}
	};

}();