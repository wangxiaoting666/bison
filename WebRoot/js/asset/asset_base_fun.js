
// base
// 初始化地图
function initLoadMap(maptarget){
	if (map == null ){
		map = new ol.Map({
			logo: {src: IconPath + '/icon/LOGO.png',href: 'http://www.intmote.com/'},
			// 设置显示地图的视图
			view: view,
			// 让id为map的div作为地图的容器
			target:maptarget,
			layers: [
				amap,
				basemap
			],
			//controls: ol.control.defaults({
			//	attributionOptions: {collapsible: false}
			//}),
		});	
		// 设置控件
		map.addControl(new ol.control.Rotate());          // 指北针
		map.addControl(new ol.control.ScaleLine());       // 比例尺
		map.addControl(new ol.control.Zoom());            // 地图缩放	

		loadBasemap();
		//getFloorList();		
	}else {
		loadMap(maptarget);

	}

	
}

function loadMap(maptarget){
	map.setTarget(maptarget);
	//changeFloorAction();
	loadBasemap();
}

// 加载楼层条
function getFloorList(){
	var FloorTag = [];
	var FloorId = [];
	var GetFloorParam = {
		service: 'WFS',
		version: '1.1.0',
		request: 'GetFeature',
		typeName: DBs + ':polygon_background ', // 电子围栏图层
		outputFormat: 'application/json',
		cql_filter: 'place_id=' + placeid
	};	
	$.ajax({  
		url: wfsUrl,
		data: $.param(GetFloorParam), 
		type: 'GET',
		dataType: 'json',
		success: function(response){
			
			var features = new ol.format.GeoJSON().readFeatures(response);
			var floorLength = features.length
			for (var FloorNum =0;FloorNum < floorLength;FloorNum++){
				FloorId[FloorNum] = features[FloorNum].values_.floor_id;
			}
			var floorDummy;
			for (var Floori =0;Floori < floorLength;Floori++){
				for (var Floorj =Floori+1;Floorj < floorLength;Floorj++){
					if (FloorId[Floori] >= FloorId[Floorj]){
						floorDummy = FloorId[Floori];
						FloorId[Floori] = FloorId[Floorj];
						FloorId[Floorj] = floorDummy;
					}					
				}
			}

			for (var FloorNum =0;FloorNum < floorLength;FloorNum++){
				FloorTag[FloorNum] = '<li role="presentation" class="floorS ' + FloorId[FloorNum] + '" onClick="floorSelect(this);"><a>F' + FloorId[FloorNum] + '</a></li>';
			}

			$("#floorlist").html(FloorTag);
			changeFloorAction();
		}
	}); 	
}

// 楼层选择
function floorSelect(e){
	var floorLength = document.getElementsByClassName('floorS').length;
	for (var i =0; i< floorLength; i++){
		document.getElementsByClassName('floorS')[i].classList.remove('active');
		// console.log(document.getElementsByClassName('floorS')[i]);
	}
	e.classList.add('active');
	// 切换楼层
	var floorSelectId = e.innerText.substr(1,2);
	// console.log(floorSelectId);
	if ( floorSelectId != floorid){
		floorUpdate(floorSelectId);
	}

}
// 切换楼层
function floorUpdate(newfloorId){
	// 取点击的楼层 赋值给floor_id   第二个字符后两位
	floorid = newfloorId;	
	// 刷新图层（背景，道路，poi ，资产初始位置）
	loadBasemap();		
	// 电子围栏加载资产初始点位置
	 if (AssetSelecttype == 'all'){
		 loadInitAsset('0');		
	 }else if (AssetSelecttype == 'fence'){
		 loadInitAsset('ArrIdForFence');
		 electronicFence(AseetIdForSaveFence);
	 }
}

// 刷新图层 背景，poi
function loadBasemap(){
	viewParam = 'place_id:' + placeid + ';floor_id:' + floorid;
	// WMS
	backgroundLayer.getSource().updateParams({viewparams:viewParam});
	
	// WFS
	polygonLayer.getSource().clear();
	polygonLayer.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(geojsonObject(viewParam,polygonTypename)));
	pointLayer.getSource().clear();
	pointLayer.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(geojsonObject(viewParam,pointTypename)));
	
}



// 初始点
// 根据条件加载资产初始点图层
function loadInitAsset(id){
	initAssetLayer.getSource().clear();
	// 加载一个资产点   定位到资产点的位置
	if(AssetSavetype == 'upd' || AssetSelecttype == 'one'){
		var asset_id = id;
		var AssetOneFilter = "l_id='" + asset_id + "'";
		initAssetLayer.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(AssetObject(AssetOneFilter,assetTypename)));
	// 加载所有资产点	
	}else if (AssetSelecttype == 'all'){
		var AssetAllFilter = "place_id=" + placeid + " and floor_id='" + floorid + "'";
		initAssetLayer.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(AssetObject(AssetAllFilter,assetTypename)));
	}else if (id == 'ArrIdForFence'){
		for (var num = 0; num < AseetIdForSaveFence.length ; num++){
			var AssetOneFilter = "l_id='" + AseetIdForSaveFence[num] + "'";
			initAssetLayer.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(AssetObject(AssetOneFilter,assetTypename)));
		}
	}
}



// 资产录入
// 所属单位变更后，placeid变更，并重新加载place所在地图
function getPlace(){			
	// 所属单位变更后，placeid变更
	// placeid = 
	loadBasemap();
	view.setCenter(placeCenter[placeid]);
}

// 点击保存按钮后，执行保存资产信息的操作（存储到postgresql）
function saveAssetInfo(){
	// 获取资产信息
	getAssetInfo();
	// 作成并保存要存储的资产记录
	makeAssetInfo();	
}

// 获取资产定位点的位置
function getAssetCenter(){
	
	//assetCenter = view.getCenter();
	var dummyassetCenter = view.getCenter();
	assetCenter = [dummyassetCenter[1],dummyassetCenter[0]];
}

// 获取和处理资产信息
function getAssetInfo(){
	// 资产编号asset_id，修改时如何获取fid？
	// 资产名称asset_name
	// 资产简称abbreviation
	// 资产分类class_name，资产名称经过匹配后获取资产分类赋值给class_id
	// 重要等级grade
	// 初始电子围栏编号fence_num
	// 初始建筑init_building
	// 初始楼层init_floor
	// 初始位置init_geom
}

// 作成需要保存的记录
function makeAssetInfo(){
	var newFeature = new ol.Feature();
	if(AssetSavetype=="add"){
	newFeature.setId($("#assetId1").val());
	}else{
		
		var AssetOneFilter = "l_id=" +"'"+$("#assetId1").val()+"'";
		newFeature.setId(AssetFIDObject(AssetOneFilter,assetTypename)[0]);

	}
	newFeature.setGeometryName('init_geom');	
	newFeature.set('init_geom', null);
	newFeature.set('l_id', $("#assetId1").val());
	newFeature.set('asset_name', $("#assetName1").val());
	newFeature.set('abbreviation', $("#abbreviation1").val());
	newFeature.set('asset_version', $("#version1").val());
	newFeature.set('class_id', $("#className1 option:selected").val());		
	newFeature.set('grade', $("#grade1  option:selected ").val());
	newFeature.set('fence_num', null);		
	newFeature.set('place_id', placeid);		
	newFeature.set('floor_id', floorid);			
	newFeature.setGeometry(new ol.geom.Point(assetCenter));
	
	var tableType = 'asset_init_locate'; 
	saveAssetInfoToPg(newFeature,tableType);
}
// 删除记录
function deleteAssetInfo(id){
	AssetSavetype = 'dlt';
	var AssetOneFilter = "l_id=" +"'"+id+"'";
	var newFeature = new ol.Feature();
	newFeature.setId(AssetFIDObject(AssetOneFilter,assetTypename)[0]);
	newFeature.setGeometryName('init_geom');	
	newFeature.set('init_geom', null);
	newFeature.setGeometry(new ol.geom.Point(assetCenter));	
	
	var tableType = 'asset_init_locate'; 
	saveAssetInfoToPg(newFeature,tableType);
}
// 数据库更新
function saveAssetInfoToPg(newFeature,tableType){
	switch (AssetSavetype) {  
		case 'add': 
			updateNewFeature([newFeature],tableType,'insert');
			break;
		case 'upd': 
			updateNewFeature([newFeature],tableType,'update');
			break;
		case 'dlt': 
			updateNewFeature([newFeature],tableType,'remove');
			break;
	}		
}



// 资产定位
//资产定位点显示---获取资产编号
function saveArrIdToLocate(assetArray){
	AseetIdForLocate = assetArray ;
	//console.log(AseetIdForLocate);
	getAssetLocateFlag = true;
}
// 获取要显示的资产编号并设置style
function getAssetLocate(){
	var WFSUrl = locateAssetsUrl;
	// 正确格式示例：{'deviceIds': ['35657533688244','ccccyt']}
	var DATAParam = "{'deviceIds': [" + AseetIdForLocate + ']}';
	//console.log(DATAParam);
	// 从位置服务器获取定位信息
	$.ajax({
		url: WFSUrl,
		data: DATAParam,
		type: 'POST',
		dataType: 'json',
		//type: 'GET',
		//dataType: 'jsonp',
		//jsonp: 'callback',
		//jsonpCallback: 'successCallBack',
		success: function(response){
			var features = new ol.format.GeoJSON().readFeatures(response);
			AssetLocateSource.clear();

			var AssetLocateInfo = response.features;
			var AssetLocateLength = AssetLocateInfo.length;
			
			if (AssetLocateLength == 0){
				layer.msg('未获取到定位信息，请检查定位标签状态！',{time:2000,icon:2});
				///退出本函数的循环
				getAssetLocateFlag = false;
			}else{
				// 当定位点所在楼层和室内图选择的楼层相同时，显示定位点-----在style中设置！
				AssetLocateSource.addFeatures(features);
			
				if (setCenterFlag){
					
/*					// 计算出没有获取到的定位信息
					var asset_id_dummy = [];
					var j = 0;
					if (AssetLocateLength < AseetIdForLocate.length){
						for (var i = 0 ; i < AseetIdForLocate.length ; i++){
							var alertAssetidFlag = true;
							for (var k = 0 ; k < AssetLocateLength; k++){
								if ( AseetIdForLocate[i] == AssetLocateInfo[k].properties.l_id){
									alertAssetidFlag = false;
									break;
								}
							}
							if (alertAssetidFlag){
								asset_id_dummy[j] = AseetIdForLocate[i];
								j++;
							}
						}
						layer.msg('未获取到 [ ' + asset_id_dummy + ' ] 的定位信息！',{time:2000,icon:7});
					}*/

					// 只有一个定位点时，直接设置该点为中心点，zoom设为21
					if (AssetLocateLength == 1){
						// 切换到定位点的place和floor，并重新加载基础图层
						var asset_placeid = AssetLocateInfo[0].properties.place_id;
						var asset_floorid = AssetLocateInfo[0].properties.floor_id;
						
						floorid = asset_floorid;
						if (asset_placeid != placeid){
							//和初始点的place_id不一样！预警！
							layer.msg('资产不在当前区域内，已切换至资产所在区域',{time:2500,icon:7});
							placeid = asset_placeid;
							// 楼层条改为定位点所在区域的楼层列表
							getFloorList();	
						}
						loadBasemap();
						
						// 修改楼层条状态
						changeFloorAction();

						assetCenter = AssetLocateInfo[0].geometry.coordinates; // 取得位置信息		
						view.setCenter(assetCenter);
						view.setZoom(21);
					// 多个定位点时，设置多点的中心为中心点，zoom设为15
					}else{
						var AssetLocateGeomXX = 0,AssetLocateGeomYY = 0;
						for (var num = 0 ; num < AssetLocateLength ; num ++){
							AssetLocateGeomXX += AssetLocateInfo[num].geometry.coordinates[0];
							AssetLocateGeomYY += AssetLocateInfo[num].geometry.coordinates[1];
						}
						var AssetLocateGeomX = AssetLocateGeomXX/AssetLocateLength;
						var AssetLocateGeomY = AssetLocateGeomYY/AssetLocateLength;
						assetCenter = [AssetLocateGeomX,AssetLocateGeomY];
						view.setCenter(assetCenter);
						view.setZoom(15);
					}	
					setCenterFlag = false;
				}
			}			
		},
		error: function (){
			console.log('error   locate');
		}
	});	
}
var setCenterFlag = true,getAssetLocateFlag = true;

var setAssetLocateMainTimeout;
// 获取资产实时定位
function getAssetLocateMain(){
	setAssetLocateMainTimeout = setTimeout(getAssetLocateMain,1000); 
	if(AseetIdForLocate.length > 0 && getAssetLocateFlag){
		getAssetLocate();	
	}else if (!setCenterFlag){
		AssetLocateSource.clear();
		setCenterFlag = true;
	}
}


// 位置告警
// 获取位置告警时的历史轨迹
function getAssetRouteMain(deviceId,beginDate,endDate){
	var FeatureOBJ;
	var FeatureStart;
	var FeatureEnd;
	var FeaturePoints = [],FeatureGeom = [] ;
	//var deviceId = '35657533688244';
	//var beginDate = '2017-7-26 03:00:02';
	//var endDate = '2017-7-28 15:00:00';
	var DATAParam = {'deviceId':deviceId,'beginDate':beginDate,'endDate':endDate};
	console.log(DATAParam);
	$.ajax({
		url: routeAssetUrl,
		data: DATAParam, 
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'callback',
		jsonpCallback: 'successCallBack',
		success: function(response){	
			if (AssetRouteLayer != null){
				AssetRouteLayer.getSource().clear();
				AssetRoutePointLayer.getSource().clear();
			}
			
			if (response.features != null && response.features.length == 1){
				
				var times = response.features[0].properties.time;
				var geoms = response.features[0].geometry.coordinates;
				var geomlength = geoms.length;
				var myplace = response.features[0].properties.place_id;
				var myfloor = response.features[0].properties.floor_id[parseInt(geomlength/2)];  
				
				if(myplace != placeid){
					//和初始点的place_id不一样！预警！
					layer.msg('轨迹不在当前区域内，已切换至轨迹所在区域',{time:2500,icon:7});
					placeid = myplace;
					floorid = myfloor;
					// 楼层条改为定位点所在区域的楼层列表
					getFloorList();	
					loadBasemap();
					// 修改楼层条状态
					changeFloorAction();
				}

				// feature 轨迹
				FeatureOBJ = new ol.format.GeoJSON().readFeatures(response);
				FeatureOBJ[0].set('type' , 'route');

				// feature 中间点
				for(var num = 0;num < geomlength ; num++){
					FeaturePoints[num] = new ol.Feature({
						geometry: new ol.geom.Point(geoms[num])
					});
					FeaturePoints[num].set('time',times[num]);
					
					if(num == 0){
						FeaturePoints[num].set('type','start');
					}else if(num == geomlength - 1){
						FeaturePoints[num].set('type','end');
					}else{
						FeaturePoints[num].set('type','geoms');
					}
					
					if(num == parseInt(geomlength/2)){
						view.setCenter(geoms[num]);
					}
				}
				
				if( AssetRouteLayer == null ){

					getAssetFenceLayer();
					
					getAssetPopup(AssetRoutePointLayer);
					// 资产的电子围栏
					electronicFence([deviceId]);
					
					AssetRouteLayer.getSource().addFeatures(FeatureOBJ);
					basemap.getLayers().extend([AssetRouteLayer]);	
					
					AssetRoutePointLayer.getSource().addFeatures(FeaturePoints);
					basemap.getLayers().extend([AssetRoutePointLayer]);
				}else {
					AssetRouteLayer.getSource().addFeatures(FeatureOBJ);
					AssetRoutePointLayer.getSource().addFeatures(FeaturePoints);
				}	
			}else{
				layer.msg('获取轨迹失败，轨迹信息为空！',{time:2000,icon:7});
			}	
		},
		error: function (){
			layer.msg('获取轨迹失败，请检查服务器状态！',{time:2000,icon:2});
		}
	});
}

function getAssetFenceLayer(){
	// 中间点
	AssetRoutePointLayer = new ol.layer.Vector({
		title: 'Asset route point map',
		visible: true,
		source: new ol.source.Vector(),
		style: function(feature) {
	          //if (feature.get('type') === 'geoms') {
	          //  return null;
	          //}
	          return RouteStyle[feature.get('type')];
	        },
		zIndex: 90
	});	
	// 轨迹
	AssetRouteLayer = new ol.layer.Vector({
		title: 'Asset route map',
		visible: true,
		source: new ol.source.Vector(),
		style: function(feature) {
	          return RouteStyle[feature.get('type')];
	        },
		zIndex: 90
	});	
}	
	
	
// common    popup
function getAssetPopup(layers){
	//add popup
	// 获取到popup的节点
	var popupcontainer = document.getElementById('popup');
	var popupcontent = document.getElementById('popup-content');

	// 创建一个overlay, 绑定html元素container
	var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
		element: popupcontainer,  // 要素是一个提示信息
		autoPan: true,
		autoPanAnimation: {   // 动画
			duration: 250
		}
	}));
	
	selectPointerMove = new ol.interaction.Select({
	   condition: ol.events.condition.pointerMove,
	   layers: [layers]
	});
	selectPointerMove.on('select', function(e) {
        if (e.selected[0] != null){
			switch (layers) {  
				case AssetRoutePointLayer: 
		        	popupcontent.innerHTML = e.selected[0].values_.time;
		        	overlay.setPosition(e.selected[0].values_.geometry.getCoordinates());
					break;
				case initAssetLayer: 
					var alertinfo = '资产名称：' + e.selected[0].values_.asset_name + '<br>'
						+ '资产型号：' + e.selected[0].values_.asset_version;
					popupcontent.innerHTML = alertinfo;
					overlay.setPosition(e.selected[0].values_.geometry.getCoordinates());
					break;
				case '': 
					popupcontent.innerHTML = '';
					overlay.setPosition([]);
					break;
			} 

        }else{
        	overlay.setPosition(null);
        } 
    });
	map.addInteraction(selectPointerMove);
	map.addOverlay(overlay);
}



// 电子围栏
//电子围栏MAIN
function UpdateElectronicFence(drawinfo){
	drawElectronicFlag = true;

	var newDrawtype = drawinfo.id;
	//本次编辑和上次不同
	if (drawtype != newDrawtype ){
		// 关闭上一次的编辑并判断之前的编辑操作（draw or modify）是否需要保存
		checkSaveElectronicFence();
		// 显示电子围栏
		electronicFence(AseetIdForSaveFence);
		
		$('.fenceshow').removeClass("active");
		drawinfo.classList.add('active');
		
		switch (newDrawtype) {  
			case 'AddElectronicFence': 
				console.log(drawinfo.innerText);
				ADDelectronicFence();
				break;
			case 'UpdateElectronicFence': 
				console.log(drawinfo.innerText);
				UpdElectronicFence();
				break;
			case 'RemoveElectronicFence': 
				console.log(drawinfo.innerText);
				RmElectronicFence();
				break;
		}		
		drawtype = newDrawtype;
	}
}
//判断之前的编辑操作（draw or modify）是否需要保存
function checkSaveElectronicFence(){	
	// 关闭上一次的编辑
	switch (drawtype) {  
		case 'AddElectronicFence': 
			DrawElectronicFence.setActive(false);
			break;
		case 'UpdateElectronicFence': 
			ModifyElectronicFence.setActive(false);
			break;
		case 'RemoveElectronicFence': 
			DeleteElectronicFence.setActive(false);
			break;
	}			

	// 保存上一次的编辑
	if(electronicFeatureDummy.length != 0){
		// 弹出是否保存
		if(confirm("有未保存的编辑，是否需要保存？")){
			SaveElectronicFence();
		}else{
			electronicFeatureDummy = [];
			//AseetIdForSaveFence = [];
			electronicFence(AseetIdForSaveFence);
			layer.msg('已清除未保存的编辑！',{time:2000});	
		}
	}	
}
//新增电子围栏
function ADDelectronicFence(){
	
	if(!addElectronicFlag){
		// draw polygon
		DrawElectronicFence = {
			init: function() {
				map.addInteraction(this.Polygon);
				this.Polygon.setActive(true);
			},
			Polygon: new ol.interaction.Draw({
				source: electronicLayer.getSource(),
				type: /** @type {ol.geom.GeometryType} */ ('Polygon'),
				geometryName: 'geom',
				condition: ol.events.condition.primaryAction
			}),
			setActive: function(active) {
				this.Polygon.setActive(active);
			}			
		};
		DrawElectronicFence.init();
		var j=0;
		DrawElectronicFence.Polygon.on('drawend',
			function(evt) {
				var Coordinates = evt.feature.values_.geom.getCoordinates()[0];
				var CoordinatesLength = Coordinates.length;

				var newCoordinates = [];
				var oldCoordinates;
				for (var i=0;i<CoordinatesLength;i++){
					oldCoordinates = Coordinates[i];
					newCoordinates[i] = [oldCoordinates[1],oldCoordinates[0]];
				}
				poly = Coordinates;
				var newFeature = new ol.Feature();
				newFeature.setId('electronic_fence.'  + deviceId);
				newFeature.setGeometryName('geom');	
				newFeature.set('geom', null);
				newFeature.set('place_id', placeid);
				newFeature.set('floor_id', floorid);
				var mytime = getNowFormatDate();
				newFeature.set('fence_id', mytime);
				newFeature.set('name', null);		
				newFeature.setGeometry(new ol.geom.Polygon([newCoordinates]));
				electronicFeatureDummy[0] = newFeature;
				j++
			}, this);			

		addElectronicFlag = true;

	} else {
		DrawElectronicFence.setActive(true);
	}	
}
//修改电子围栏
function UpdElectronicFence(){
	if(!updateElectronicFlag){
		ModifyElectronicFence = {
			init: function() {
				this.select = new ol.interaction.Select({
					layers: [electronicLayer],
				}); 
				this.modify = new ol.interaction.Modify({
					features: this.select.getFeatures(),
				});
				map.addInteraction(this.select);
				map.addInteraction(this.modify);
			
				this.setEvents();
			},
			setEvents: function() {
				var selectedFeatures = this.select.getFeatures();
			
				this.select.on('change:active', function() {
					selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
				});
			},
			setActive: function(active) {
				this.select.setActive(active);
				this.modify.setActive(active);
			}
		};
		ModifyElectronicFence.init();
		var j=0;
		var modifyIdInfo = [];
		ModifyElectronicFence.modify.on('modifyend',
			function(evt) {
				var modifyInfo = evt.features.getArray()[0].values_;
				var modifyId = evt.features.getArray()[0].id_;
				
				var Coordinates = modifyInfo.geometry.getCoordinates()[0];
				var CoordinatesLength = Coordinates.length;
				
				var newCoordinates = [];
				var oldCoordinates;
				for (var i=0;i<CoordinatesLength;i++){
					oldCoordinates = Coordinates[i];
					newCoordinates[i] = [oldCoordinates[1],oldCoordinates[0]];
				}
				poly = Coordinates;
				var modifyPlaceid = modifyInfo.place_id;
				var modifyFloorid = modifyInfo.floor_id;
				var modifyFenceid = modifyInfo.fence_id;
				var modifyName = modifyInfo.name;		
				assetFenceid = modifyFenceid;
				
				var newFeature = new ol.Feature();
				newFeature.setId(modifyId);
				newFeature.setGeometryName('geom');	
				newFeature.set('geom', null);
				newFeature.set('place_id', modifyPlaceid);
				newFeature.set('floor_id', modifyFloorid);
				newFeature.set('fence_id', modifyFenceid);
				newFeature.set('name', modifyName);		
				newFeature.setGeometry(new ol.geom.Polygon([newCoordinates]));							

				//if (j !=0){
				//	for (var num = 0;num<j;num++){
				//		if(modifyIdInfo[num] == modifyId){
				//			electronicFeatureDummy[num] = newFeature;
				//		}
				//	}
				//}else{
				//	modifyIdInfo[j] = modifyId;
					electronicFeatureDummy[0] = newFeature;
					j++;
				//}			
			}, this);			
		updateElectronicFlag = true;
	} else {
		ModifyElectronicFence.setActive(true);
	}
}
//删除电子围栏
function RmElectronicFence(){
	if(!rmElectronicFlag){
		DeleteElectronicFence = {
			init: function() {
				this.select = new ol.interaction.Select({
					layers: [electronicLayer],
					condition: ol.events.condition.leftAndRightClick
				}); 
				map.addInteraction(this.select);
			
				this.setEvents();
			},
			setEvents: function() {
				var selectedFeatures = this.select.getFeatures();
			
				this.select.on('change:active', function() {
					selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
				});
			},
			setActive: function(active) {
				this.select.setActive(active);
			}
		};
		DeleteElectronicFence.init();
		DeleteElectronicFence.select.on('select',
			function(evt) {
				if(evt.target.getFeatures().getArray().length != 0) {  
					var evtInfo = evt.target.getFeatures().getArray()[0];
					// 弹出是否删除
					layer.msg('确认删除？', {
						  time: 0 //不自动关闭
						  ,btn: ['确定', '取消']
						  ,yes: function(index){
						    layer.close(index);
							var selectInfo = evtInfo.values_;
							var selectId = evtInfo.id_;
							var fenceId = selectInfo.fence_id;
							
							var Coordinates = selectInfo.geometry.getCoordinates()[0];
							var CoordinatesLength = Coordinates.length;
							
							var newCoordinates = [];
							var oldCoordinates;
							for (var i=0;i<CoordinatesLength;i++){
								oldCoordinates = Coordinates[i];
								newCoordinates[i] = [oldCoordinates[1],oldCoordinates[0]];
							}
			
							var newFeature = new ol.Feature();
							newFeature.setId(selectId);
							newFeature.setGeometryName('geom');	
							newFeature.set('geom', null);		
							newFeature.setGeometry(new ol.geom.Polygon([newCoordinates]));							
							
							deleteInitAssetFence(fenceId);
							deleteBisonAssetFence(fenceId);
							updateNewFeature([newFeature],'electronic_fence','remove');
							
							layer.msg('删除围栏成功！',{time:1500,icon:6});
							//electronicFence(AseetIdForSaveFence);
						  }
						});
					DeleteElectronicFence.setActive(false);
					DeleteElectronicFence.setActive(true);
				}			
			}, this);			
		rmElectronicFlag = true;
	} else {
		DeleteElectronicFence.setActive(true);
	}
}

//判断新增或修改后的电子围栏是否包含了所有相关资产
function checkPointInPolygon(){
	var InOrOut = false;
	switch (drawtype) {  
		case 'AddElectronicFence': 
			for (var i = 0; i < AseetIdForSaveFence.length ; i++){
				var AssetOneFilter = "l_id=" +"'"+ AseetIdForSaveFence[i] +"'";
				var AssetGeom = AssetGeomObject(AssetOneFilter,assetTypename)[0];	
				if (rayCasting(AssetGeom,poly) != 'in'){
					InOrOut = false;
					return InOrOut;
				}
			}
			InOrOut = true;
			break;
			
		case 'UpdateElectronicFence': 
			var AssetAnyFilter = "fence_num=" +"'"+ assetFenceid +"'";
			var AssetGeom = AssetGeomObject(AssetAnyFilter,assetTypename);	
			console.log(AssetGeom);
			for (var i = 0 ;i < AssetGeom.length; i++ ){
				if (rayCasting(AssetGeom[i],poly) != 'in'){
					InOrOut = false;
					return InOrOut;
				}
			}
			InOrOut = true;
			break;
	}	
	
	return InOrOut;
}

//保存电子围栏编辑
function SaveElectronicFence(){
	if (electronicFeatureDummy.length > 0){
		// 电子围栏
		var featureType = 'electronic_fence';
		switch (drawtype) {  
			case 'AddElectronicFence': 
				if (AseetIdForSaveFence.length == 0){
					layer.msg('请选择电子围栏对应的资产！',{time:1500,icon:7});	
				}else if (!checkPointInPolygon()){
					layer.msg('请确认添加的围栏包含了所有选择的资产！',{time:1500,icon:7});	
				}else{
					updateInitAssetFence(electronicFeatureDummy[0].values_.fence_id);
					updateNewFeature(electronicFeatureDummy,featureType,'insert');
					updateBisonAssetFence(AseetIdForSaveFence,electronicFeatureDummy[0].values_.fence_id);
					layer.msg('添加电子围栏成功！',{time:1500,icon:6});				
				}
				break;
			case 'UpdateElectronicFence': 
				if (!checkPointInPolygon()){
					layer.msg('请确认修改后的围栏包含了所有相关资产！',{time:1500,icon:7});	
				}else{
					updateNewFeature(electronicFeatureDummy,featureType,'update');
					layer.msg('修改电子围栏成功！',{time:1500,icon:6});				
				}
				break;
		}	
		electronicFeatureDummy = [];
		//AseetIdForSaveFence = [];
		//electronicFence(AseetIdForSaveFence);		
	}
	
}


// 新增电子围栏时资产信息更改
function updateInitAssetFence(fence_num){
	AssetSavetype = 'upd';
	var tableType = 'asset_init_locate'; 
	
	var AssetDummy = [];
	for (var i = 0; i < AseetIdForSaveFence.length ; i++){
		var newFeature = new ol.Feature();
		var AssetOneFilter = "l_id=" +"'"+ AseetIdForSaveFence[i] +"'";
		newFeature.setId(AssetFIDObject(AssetOneFilter,assetTypename)[0]);	
		newFeature.set('fence_num', fence_num);			
		AssetDummy[i] = newFeature;
	}
	updateNewFeature(AssetDummy,tableType,'update');
	AssetSavetype = null;
}

// 删除电子围栏时资产信息更改
function deleteInitAssetFence(fence_num){
	AssetSavetype = 'upd';
	var tableType = 'asset_init_locate'; 
	var AssetAnyFilter = "fence_num=" +"'"+ fence_num +"'";
	
	var AssetFidArray = AssetFIDObject(AssetAnyFilter,assetTypename);
	var AssetDummy = [];
	for (var i = 0; i < AssetFidArray.length ; i++){
		var newFeature = new ol.Feature();
		
		newFeature.setId(AssetFidArray[i]);	
		newFeature.set('fence_num', null);			
		AssetDummy[i] = newFeature;
	}
	updateNewFeature(AssetDummy,tableType,'update');
	AssetSavetype = null;
}
//关闭电子围栏编辑
function electronicFenceDrawOFF(){
	// 判断是否已保存
	if(drawElectronicFlag){
		$('.fenceshow').removeClass("active");
		checkSaveElectronicFence();	
		// 编辑的Flag初始化
		drawtype = null;
		drawElectronicFlag = false;
	}

}

//显示电子围栏
function electronicFence(assets){
	electronicLayer.getSource().clear();
	
	//console.log(assets);

	if (electronicLayerOff) {
		// 根据勾选的资产编号查找对应的围栏编号
		var assetFences = AssetFenceObject(assets,assetTypename);
		$('#electronicFence').addClass("active");
		for (var num = 0 ;num < assetFences.length ; num++){
			var electronicParam = {
				service: 'WFS',
				version: '1.1.0',
				request: 'GetFeature',
				typeName: DBs + ':electronic_fence', // 电子围栏图层
				outputFormat: 'application/json',
				cql_filter: "fence_id='" + assetFences[num]  + "'"
			};	
			$.ajax({  
				url: wfsUrl,
				data: $.param(electronicParam), 
				type: 'GET',
				dataType: 'json',
				success: function(response){
					var features = new ol.format.GeoJSON().readFeatures(response);
					electronicLayer.getSource().addFeatures(features);
				}
			}); 	
		}
		
		electronicLayerOff = false;
	}else {
		$('#electronicFence').removeClass("active");
		electronicLayerOff = true;
		if (drawElectronicFlag){
			electronicFence(AseetIdForSaveFence);
		}
	}	
}

// 电子围栏---获取资产编号
function saveArrIdToMap(assetArray){
	AseetIdForSaveFence = assetArray;
}

//更新后台的电子围栏
function updateBisonAssetFence(ids,fenceId){
	$.ajax({
		   type: "POST",
		   url: IconPath+"/design/fence/updateFence",
		   data: "ids="+ids+"&fenceId="+fenceId,
		   success: function(msg){
		   }	
	});
}
	
//刪除后台的电子围栏
function deleteBisonAssetFence(fenceId){
	$.ajax({
		   type: "POST",
		   url: IconPath+"/design/fence/deleteFence",
		   data:"fenceId="+fenceId,
		   success: function(msg){
		   }
	});
}



















