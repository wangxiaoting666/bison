<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <title>首页</title>
    <%@include file="../includes/head.jsp"%>
    
<script type="text/javascript" language="javascript">   
function iFrameHeight() {   
var ifm= document.getElementById("iframepage");   
var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;   
if(ifm != null && subWeb != null) {
   ifm.height = subWeb.body.scrollHeight;
   ifm.width = subWeb.body.scrollWidth;
}   
}   
</script>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp"%>
<div class="page-container">
    <%@include file="../includes/sidebar.jsp"%>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content user-padding">
        	<iframe style="margin:0px;" id="iframepage" name="iframe" width="100%" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0" onLoad="iFrameHeight()"  src="flex/mapLocation"></iframe>
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<%@include file="../includes/footer.jsp"%>
<%@include file="../includes/bottomscript.jsp"%>
</body>
</html>