<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>mapplic</title>
		<link rel="stylesheet" type="text/css" href="css/map/style.css">
		<link rel="stylesheet" type="text/css" href="css/map/mapplic.css">
		<link rel="stylesheet" type="text/css" href="css/map/map.css">
		<link rel="stylesheet" href="css/map/magnific-popup.css" />
		<script type="text/javascript" src="js/connet/comet4j.js"></script>
		
	</head>
	<body>
	<div id="header"></div>
    <div id="content">
    	  <section id="map-section" class="inner over">
					<div class="editor-window">
						<div class="window-mockup brown"></div>
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
		
	<script type="text/javascript" src="js/map/jquery.min.js"></script>
	<script type="text/javascript" src="js/map/hammer.min.js"></script>
	<script type="text/javascript" src="js/map/jquery.mousewheel.js"></script>
	<script type="text/javascript" src="js/map/script.js"></script>
	<script type="text/javascript" src="js/map/magnific-popup.js"></script>
	<script type="text/javascript" src="js/map/mapplic.js"></script>
    <script type="text/javascript">
			$(document).ready(function() {
				var map = $('#mapplic').mapplic({
					source: 'data/warehouse.json',
					height: 500,
					mapfill: true,
					lightbox: true,
					maxscale: 1,
					zoom:true,
					coordtip:true
				});
                var y = 1066;
				// EVENTS
				// Map ready
				map.on('mapready', function(e, self) {
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
		                    result1 : function(num1){
		                    console.log(num1.x+"---"+num1.y);
		                    self.coordtip.locate("test", num1.x, num1.y);
	                   },
	                   // 对应服务端 “频道2” 的值 result2
	                   result2 : function(num2){
	                          number2.innerHTML = num2;
	                   },
	                }
	              );
				});

				// Location opened
				map.on('locationopened', function(e, location) {
					// location grants full access to the location
					console.log(location.title + ' opened.');
				});

				// Location closed
				map.on('locationclosed', function(e) {
					console.log('Location closed.');
				});

				// Level switched
				map.on('levelswitched', function(e, level) {
					console.log('Switched to ' + level + ' level.');
				});

				// Position changed
				map.on('positionchanged', function(e, self) {
					// self grants direct access to the map object
					//console.log('Pan or zoom performed, current scale: ' + self.scale);
				});

				// METHODS
				// Getting mapplic object
				var self = map.data('mapplic');

				map.on('locationclosed', function(e) {
					//console.log(self);
				});
			});

	</script>

	</body>
</html>
