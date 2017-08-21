<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <title>首页</title>
    <%@include file="../includes/head.jsp" %>


</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
<%@include file="../includes/top.jsp" %>
<div class="page-container">
    <%@include file="../includes/sidebar.jsp" %>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="row">
                <div class="col-md-12">
                    <div class="portlet">
                        <!-- BEGIN PAGE HEADER-->
                        <h3 class="page-title">当前位置 </h3>

                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li>
                                    <i class="fa fa-home"></i>
                                    <a href="flex/mapLocation">主页</a>
                                    <i class="fa fa-angle-right"></i>
                                </li>
                                <li><span><i class=""></i> 懋特</span><i class="fa fa-angle-right"></i></li>
                                <li><span><i class=""></i> 地图</span><i class="fa fa-angle-right"></i></li>
                                <li><span><i class=""></i>当前位置<span></span></span></li>
                            </ul>
                        </div>

                          <div class="portlet-body">
                            <div class="row">
                                <div class="col-md-3 col-sm-6 col-sm-12">总共：100MB</div>
                                <%-- <div class="col-md-3 col-sm-6 col-sm-12">已用：<span id="usedSize">${usedSize}</span>MB</div>
                                <div class="col-md-3 col-sm-6 col-sm-12">剩余：<span id="availableSize">${availableSize}</span>MB</div> --%>
                            </div>
                            <!-- <iframe src=" http://www.intmote.com/map/map.html?deviceId=all"
	                                     frameborder="0" style="width:1100px;  height:600px;"></iframe> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<%@include file="../includes/footer.jsp" %>
<%@include file="../includes/bottomscript.jsp" %>
</body>

<script type="text/javascript">
   /*  $(document).ready(function () {
        var map = $('#mapplic').mapplic({
            source: 'data/warehouse.json',
            //source: 'data/warehouse.json',
            height: 500,
            mapfill: true,
            lightbox: true,
            maxscale: 1,
            zoom: true,
            coordtip: true
        });
        var y = 1066;
        // EVENTS
        // Map ready
        map.on('mapready', function (e, self) {
            console.log('Map is ready!');
            // self grants direct access to the map object
            // The map will be focused on the washing machine by default

            //setInterval(function(){
            //if(y>50)
            //self.coordtip.locate("test", 461, --y);
            //}, 500);
            var number1 = document.getElementById('number1');
            var number2 = document.getElementById('number2');
            // 建立连接，conn 即web.xml中 CometServlet的<url-pattern>
            JS.Engine.start('conn');
            // 监听后台某个频道
            JS.Engine.on({
                result1: function (num1) {
                    self.coordtip.locate(num1.deviceID, num1.x, num1.y);
                },
                result2: function (num2) {
                    number2.innerHTML = num2;
                }
            });
        });

        // Location opened
        map.on('locationopened', function (e, location) {
            // location grants full access to the location
            console.log(location.title + ' opened.');
        });

        // Location closed
        map.on('locationclosed', function (e) {
            console.log('Location closed.');
        });

        // Level switched
        map.on('levelswitched', function (e, level) {
            console.log('Switched to ' + level + ' level.');
        });

        // Position changed
        map.on('positionchanged', function (e, self) {
            // self grants direct access to the map object
            //console.log('Pan or zoom performed, current scale: ' + self.scale);
        });

        // METHODS
        // Getting mapplic object
        var self = map.data('mapplic');

        map.on('locationclosed', function (e) {
            //console.log(self);
        });


    }());
 */
</script>
</html>