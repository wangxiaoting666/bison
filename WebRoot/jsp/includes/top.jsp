<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div class="page-header navbar navbar-fixed-top">
	<div class="page-header-inner">
		<div class="page-logo" style=" line-height:45px; width: 328px;padding-left: 15px;">
		<%-- 	<a href="<c:url value="/"/>"><img
				src="<c:url value="/img/logo.png"/>" style="height: 14px" alt="logo"
				class="logo-default" /></a> --%>
      <font size="+1.6" color="white"   style="font-family: KaiTi;">基于WiFi定位的实验室资产管理平台</font>
			<div class="menu-toggler sidebar-toggler hide"></div>
		</div>
		<a href="javascript:;" class="menu-toggler responsive-toggler"
			data-toggle="collapse" data-target=".navbar-collapse"></a>
		<div class="top-menu">
			<ul class="nav navbar-nav pull-right">
				<li class="dropdown dropdown-alert"><a href="#"
					class="dropdown-toggle" data-toggle="dropdown"
					data-hover="dropdown" data-close-others="true"> <span
						class="badge pull-left"></span><label class="hidden-sm">报警</label><i
						class="fa fa-bell"></i>
				</a>
					<ul class="dropdown-menu">
					</ul></li>
				<li class="dropdown dropdown-user"><a href="#"
					class="dropdown-toggle" data-toggle="dropdown"
					data-hover="dropdown" data-close-others="true"> <span
						class="username username-hide-on-mobile">你好，${sessionScope.username}</span>
						<i class="fa fa-angle-down"></i>
				</a>
					<ul class="dropdown-menu">
						<li><a href="javascript:;" id="updatePass"><i
								class="icon-lock"></i>修改密码</a></li>
						<li><a href="<c:url value="/logout"/> "><i
								class="icon-key"></i>退出登录</a></li>
					</ul></li>
			</ul>
		</div>
	</div>
</div>
<div class="modal fade bs-modal-lg" id="updatePasswordModal"
	tabindex="-1" data-keyboard="false" aria-hidden="true"
	data-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content" id="updatePasswordContent">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true"></button>
				<h4 class="modal-title">修改密码</h4>
			</div>
			<div class="modal-body form">
				<form id="updatePasswordDialog" class="form-horizontal">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-md-4 control-label">原密码<span
										class="required"> * </span></label>
									<div class="col-md-8">
										<input type="password" class="form-control input-medium"
											placeholder="原密码" id="oldPassword" name="oldPassword">
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-md-4 control-label">新密码<span
										class="required"> * </span></label>
									<div class="col-md-8">
										<input type="password" class="form-control input-medium"
											placeholder="新密码" id="newPassword" name="newPassword">
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="form-group last">
									<label class="col-md-4 control-label">确认新密码<span
										class="required"> * </span></label>
									<div class="col-md-8">
										<input type="password" class="form-control input-medium"
											placeholder="确认新密码" id="reNewPassword" name="reNewPassword">
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn blue" id="updatePassword">保存</button>
			</div>
		</div>
	</div>
</div>
<div class="clearfix"></div>
<script>
	//toastr.sos(num1)
</script>
<script type="text/javascript"
	src="http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript"
	src="http://cdn.bootcss.com/sockjs-client/1.1.1/sockjs.js"></script>
<script type="text/javascript">
	function wsPath() {
		var pathName = window.document.location.pathname;
		var host = window.location.host;
		var projectName = pathName.substring(0,
				pathName.substr(1).indexOf('/') + 1);
		return (host + projectName);
	}
	wsPath = wsPath();
	var websocket = null;
	if ('WebSocket' in window) {
		websocket = new WebSocket("ws://" + wsPath + "/websocket/socketServer");
	} else if ('MozWebSocket' in window) {
		websocket = new MozWebSocket("ws://" + wsPath
				+ "/bison/websocket/socketServer");
	} else {
		websocket = new SockJS("http://" + wsPath
				+ "/bison/sockjs/socketServer");
	}
	websocket.onmessage = onMessage;
	websocket.onope = onOpen;
	websocket.onerror = onError;
	websocket.onclose = onClose;

	function onOpen() {
	}

	function onMessage(evt) {
		var $uncheckedAlertMenuBtn = $("a.dropdown-toggle", $uncheckedAlertMenu);
		var $uncheckedAlertBadge = $("span.badge", $uncheckedAlertMenuBtn);
		var $uncheckedAlertMenu = $('li.dropdown-alert');
		var $uncheckedAlertList = $('ul', $uncheckedAlertMenu);
		var a = $uncheckedAlertBadge.html();
		$uncheckedAlertBadge.html(Number(a) + 1);
		//判断报警类型  如果是位置偏移，place+1
		if (evt.data == "1") {
			var count;
			var a = $("#number").html();
			if (a == null) {
				count = 1;
				$uncheckedAlertList
						.prepend('<li class="place-alert"><a  href="alert?menuId=274"> <font color="red" id="place-alert">'
								+ "位置报警(<font id ='number'>"
								+ count
								+ "</font>)" + '</font></a></li>');
			} else {
				count = Number(a) + 1;
				$("#place-alert").html(
						"位置偏移(<font id='number'>" + count + "</font>)");
			}
		}
		if (evt.data == "0") {
			var count;
			var a = $("#snum").html();
			if (a == null) {
				count = 1;
				$uncheckedAlertList
						.prepend('<li class="sos-alert"> <a  href="alert?menuId=274"><font color="red" id="sos-alert">'
								+ "SOS报警(<font id='snum'>"
								+ count
								+ ")</font>"
								+ '</font></a></li>');
			} else {
				count = Number(a) + 1;
				$("#sos-alert").html(
						"SOS报警(<font id='snum'>" + count + "</font>)");
			}
		}
	}
	
	function onError() {
		websocket.close();
	}
	
	function onClose() {
	}
	window.close = function() {
		websocket.onclose();
	}
</script>