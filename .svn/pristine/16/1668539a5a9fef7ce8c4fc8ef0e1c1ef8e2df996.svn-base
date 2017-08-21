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
            <%@include file="../includes/current.jsp" %>

            <div class="row">
                <div class="col-md-12">
                    <div class="portlet">

                        <!-- END PAGE HEADER-->
                        <!-- BEGIN DASHBOARD STATS -->
                        <div class="portlet-body">
                            <section id="map-section" class="inner over">
                                <div class="editor-window">
                                    <div class="window-mockup brown"></div>
                                    <!--
                                    <div class="editor-body">
                                        <code>
                                            {<br>
                                            &nbsp;&nbsp;&nbsp;"id": "newlandmark",<br>
                                            &nbsp;&nbsp;&nbsp;"title": "New Landmark",<br>
                                            &nbsp;&nbsp;&nbsp;"description": "Creating a new landmark is that easy!",<br>
                                            &nbsp;&nbsp;&nbsp;"x": "<span class="mapplic-coordinates-x">0.0000</span>",<br>
                                            &nbsp;&nbsp;&nbsp;"y": "<span class="mapplic-coordinates-y">0.0000</span>",<br>
                                            &nbsp;&nbsp;&nbsp;...<br>
                                            }
                                        </code>
                                    </div>
                                     -->
                                </div>

                                <div class="map-container">
                                    <div class="window-mockup">
                                        <div class="window-bar"></div>
                                    </div>
                                    <!-- Map -->
                                    <div id="mapplic"></div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <!-- END DASHBOARD STATS -->
            </div>
        </div>
        <!-- END CONTENT -->
    </div>
    <%@include file="../includes/footer.jsp" %>
    <%@include file="../includes/bottomscript.jsp" %>
    <script type="text/javascript">
        $(document).ready(function () {
            var map = $('#mapplic').mapplic({
                source: 'data/warehouse.json',
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
                console.log('Map is ready!')
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
                JS.Engine.on(
                        {
                            // 对应服务端 “频道1” 的值 result1
                            result2: function (num1) {
                                self.coordtip.locate(num1.deviceID, num1.x, num1.y);
                                //toastr.warning(num1.message)
                            },

                        }
                );
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


        });

    </script>
</body>
</html>