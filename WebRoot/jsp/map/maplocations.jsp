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
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/map/mymapplic.css"/>">
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
    <script type="text/javascript" src="<c:url value="js/map/mymapplic.js"/>"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var map = $('#mapplic').mapplic2({
                source: 'data/test3.json',
                height: 500,
                mapfill: true,
                lightbox: true,
                maxscale: 2,
                zoom: true,
                coordtip: true
            });
            var y = 1066;
            var points = {};
            // EVENTS
            // Map ready
            map.on('mapready', function (e, self) {
//                if (points['1'] == null)
//                points['1'] = new Point();
//                var p = points['1'].getPoint(500,500);
//                self.coordtip.locate('1',p.x,p.y,0);
//                p = point2.getPoint(700, 700);
//                self.coordtip.locate('2',p.x,p.y,0);
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
                            result1: function (model) {
                                if (points[model.deviceID] == null)
                                    points[model.deviceID] = new Point2();
                                var p = points[model.deviceID].getPoint(model.x,model.y);
                                self.coordtip.locate(model.deviceID, p.x, p.y, model.h);
                            },
                            result2: function (num1) {
//                                self.coordtip.locate(num1.deviceID, num1.x, num1.y);
                                //toastr.warning(num1.message)
                            }

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
//                var p = point1.getPoint(500,500);
//                self.coordtip.locate('1',p.x,p.y,0);
//                p = point2.getPoint(700, 700);
//                self.coordtip.locate('2',p.x,p.y,0);
                // self grants direct access to the map object
                //console.log('Pan or zoom performed, current scale: ' + self.scale);
            });

            // METHODS
            // Getting mapplic object
            var self = map.data('mapplic');

            map.on('locationclosed', function (e) {
                //console.log(self);
            });

            function Point () {
                this.firstX = null;
                this.firstY = null;
                this.centerX = null;
                this.centerY = null;
                this.pixel = 100;

                Point.prototype.getPoint = function (x, y) {
                    if (!!this.centerY) {
                        if (Math.abs(x - this.centerX) < this.pixel && Math.abs(y - this.centerY) < this.pixel)
                            return { x: this.centerX, y: this.centerY };
                        else {
                            this.firstX = x;
                            this.firstY = y;
                            this.centerX = null;
                            this.centerY = null;
                            return { x: this.firstX, y: this.firstY};
                        }
                    }
                    else if (!!this.firstY) {
                        if (Math.abs(x - this.firstX) < 2 * this.pixel && Math.abs(y - this.firstY) < 2 * this.pixel) {
                            this.centerX = (x + this.firstX) / 2;
                            this.centerY = (y + this.firstY) / 2;
                            return { x: this.centerX, y: this.centerY };
                        }
                        else {
                            this.firstX = x;
                            this.firstY = y;
                            return { x: this.firstX, y: this.firstY};
                        }
                    }
                    else {
                        this.firstX = x;
                        this.firstY = y;
                        return { x: this.firstX, y: this.firstY};
                    }
                }
            };

            function Point2() {
                this.centerX = null;
                this.centerY = null;
                this.outlierX = null;
                this.outlierY = null;
                this.count = 0;
                this.pixel = 100;

                Point2.prototype.getPoint = function (x, y) {
                    if (!!this.centerY) {
                        if (Math.abs(x - this.centerX) < this.pixel && Math.abs(y - this.centerY) < this.pixel) {
                            if (!!this.outlierY) {
                                this.outlierX = null;
                                this.outlierY = null;
                            }
                            ++this.count;
                            this.centerX = ((this.count - 1) * this.centerX + x) / this.count;
                            this.centerY = ((this.count - 1) * this.centerY + y) / this.count;
                        }
                        else if (!!this.outlierY) {
                            this.count = 2;
                            this.centerX = ((this.count - 1) * this.outlierX + x) / this.count;
                            this.centerY = ((this.count - 1) * this.outlierY + y) / this.count;
                            this.outlierX = null;
                            this.outlierY = null;
                        }
                        else {
                            this.outlierX = x;
                            this.outlierY = y;
                        }
                    }
                    else {
                        ++this.count;
                        this.centerX = x;
                        this.centerY = y;
                    }
                    return { x: this.centerX, y: this.centerY };
                }
            };

            //ajax轮询位置
            // var userIds = ["0000000022", "0000000023"];
            // var info = {
            //     "userIds": userIds.join(",")
            // };
            var getLocationUrl = "map/getLocation";
            var getLocationInterval = 3000;
            var positions = [];

//            setInterval(function() {
//                    $.post(getLocationUrl, null, function(data) {
//                        positions = data;
//                        $.each(data, function(i, v) {
//                            self.coordtip.locate(v.journeyId, v.x, v.y);
//                            console.log(v.journeyId + ' ' + v.x + ' ' + v.y);
//                        });
//                        console.log("已获取到" + data.length + "条位置数据(包括自身)。");
//                    });
//            }, getLocationInterval);

        });

    </script>
</body>
</html>