// common
var locate; // 中心点   定位点
var deviceId; //手环id   从传入参数获取值  点位点
var ltype; // 定位点类型 暂未用到
var placeid = assignment("placeid");
var floorid = assignment("floorNum");// 楼层编号    选择楼层
var LocationRequestParam; //定位param
var DBs = 'mote'; //数据源
var locateIp = assignment("LocateSever");
var comIp = assignment("GeoServer");
var wfsUrl = comIp + '/geoserver/wfs';
var wmsUrl = comIp + '/geoserver/' + DBs + '/wms';
var locateUrl = locateIp + '/LocateServer/getLocation.action';
var locateCertainUrl = locateIp + '/LocateServer/getCertainLocation.action';
var locateAssetUrl = locateIp + '/LocateServer/getAssetLocation.action';
var locateAssetsUrl = locateIp + '/LocateServer/getAssetsLocation.action';
var locateAssetCertainUrl = locateIp + '/LocateServer/getAssetCertainLocation.action';
var locateAllUrl = locateIp + '/LocateServer/getAllLocation.action';
//deviceId=35657533688244&beginDate=2017-7-26 03:00:02&endDate=2017-7-28 15:00:00
var routeAssetUrl = locateIp + '/LocateServer/getTrack.action';

var AssetSavetype; //资产信息编辑的flag（add or upd or dlt）
var AssetSelecttype; //资产信息查看flag（one or all）

//获取地图中心点
/*var mote = assignment("2");
var zBei = assignment("3");
var mHang = assignment("4");*/
// 设置中心点
var placeCenter = {
	'2' : [121.4286933,31.1664993],// mote
	'3' : [121.407241820159,31.2265797284321],//中北
	'4' : [121.4287933,31.1664993]//闵行
};
var assetCenter;
var assetId;
var assetFenceid;
var AseetIdForLocate = [];
// 设置视图
var view = new ol.View({
	center: placeCenter[placeid],
	projection: 'EPSG:4326',
	zoom: 21
});


//从数据库取值给变量赋值
function assignment(val){
	var value;
	$.ajax({
			url : "/bison/asset/getSysValue",
			data : "val=" + val,
			dataType : "json",
			async :false,
			success : function(data) {
				value = data.returnData.value;
			}
		});
	return value;
}



// 室内图数据获取 	
var geojsonObject = function(viewParams,Typename){
	var geojson;
	$.ajax({
		url: wfsUrl,
		data: {
			service: 'WFS',
			version: '1.1.0',
			request: 'GetFeature',
			typename: Typename,
			outputFormat: 'application/json',
			viewparams: viewParams
		},
		type: 'GET',
		dataType: 'json',	
		async: false,
		success: function(response){
			geojson = response;
		}
	});
	// 返回经过条件筛选后的数据
	return geojson; 
};

// 资产数据获取
var AssetObject = function(AssetFilter,Typename){
	var geojson;
	$.ajax({
		url: wfsUrl,
		data: {
			service: 'WFS',
			version: '1.1.0',
			request: 'GetFeature',
			typename: Typename,
			outputFormat: 'application/json',
			cql_filter: AssetFilter
		},
		type: 'GET',
		dataType: 'json',	
		async: false,
		success: function(response){
			geojson = response;
			// 根据tree获取多个资产初始点时，设置center和zoom（BUG）
			if(AssetSavetype == 'upd' || AssetSelecttype == 'one' || AseetIdForSaveFence.length == 1){
				floorid = response.features[0].properties.floor_id;
				//placeid = response.features[0].properties.place_id;
				assetCenter = response.features[0].geometry.coordinates; // 取得位置信息		
				view.setCenter(assetCenter);
				view.setZoom(21);
				// 切换到资产点的楼层
				// 资产点楼层的图标高亮
				changeFloorAction();
				loadBasemap();
			}else if (AseetIdForSaveFence.length > 1){
				view.setZoom(20);
			}
		}
		
	});
	// 返回经过条件筛选后的数据（BUG）
	return geojson; 
};

// 更改楼层条高亮
function changeFloorAction(){
	var floorLength = document.getElementsByClassName('floorS').length;
	for (var i =0; i< floorLength; i++){
		document.getElementsByClassName('floorS')[i].classList.remove('active');
	}
	if(document.getElementsByClassName(floorid)[0] != null ){
		document.getElementsByClassName(floorid)[0].classList.add('active');
	}	
}



// 资产FID获取
var AssetFIDObject = function(AssetFilter,Typename){
	var assetFid = [];
	$.ajax({
		url: wfsUrl,
		data: {
			service: 'WFS',
			version: '1.1.0',
			request: 'GetFeature',
			typename: Typename,
			outputFormat: 'application/json',
			cql_filter: AssetFilter
		},
		type: 'GET',
		dataType: 'json',	
		async: false,
		success: function(response){
			if (response.features.length == 1){
				assetFid[0] = response.features[0].id;
			}else if (response.features.length > 1){
				for (var i = 0 ;i < response.features.length ; i++){
					assetFid[i] = response.features[i].id;
				}
			}else{
				//alert("删除失败");
			}		
		}
		
	});
	// 返回经过条件筛选后的数据
	return assetFid;
};
//资产对应围栏获取
var AssetFenceObject = function(Assets,Typename){
	var assetfence = [];
	var assetNum = 0;
	for(var num = 0 ; num < Assets.length; num++ ){
		var AssetFilter = "l_id='" + Assets[num] + "'";
		$.ajax({
			url: wfsUrl,
			data: {
				service: 'WFS',
				version: '1.1.0',
				request: 'GetFeature',
				typename: Typename,
				outputFormat: 'application/json',
				cql_filter: AssetFilter
			},
			type: 'GET',
			dataType: 'json',	
			async: false,
			success: function(response){
				var assetfencedummy = response.features[0].properties.fence_num;
				if (assetfencedummy != null){
					var saveFlag = true;
					for (var i = 0;i<assetNum;i++){
						if(assetfence[i] == assetfencedummy){
							saveFlag = false;
							break;
						}
					}
					if(saveFlag){
						assetfence[assetNum] = assetfencedummy;
						assetNum++;				
					}
				}else{
					console.log(Assets[num] + ": 没有围栏");
				}		
			}
		});		
	}
	// 返回经过条件筛选后的数据
	return assetfence;
};
//资产坐标获取
var AssetGeomObject = function(AssetFilter,Typename){
	var assetGeom = [];
	$.ajax({
		url: wfsUrl,
		data: {
			service: 'WFS',
			version: '1.1.0',
			request: 'GetFeature',
			typename: Typename,
			outputFormat: 'application/json',
			cql_filter: AssetFilter
		},
		type: 'GET',
		dataType: 'json',	
		async: false,
		success: function(response){	
			if (response.features.length == 1){
				assetGeom[0] = response.features[0].geometry.coordinates;
			}else if (response.features.length > 1){
				for (var i = 0 ;i < response.features.length ; i++){
					assetGeom[i] = response.features[i].geometry.coordinates;
				}
			}
			
		}
		
	});
	// 返回经过条件筛选后的数据
	return assetGeom;
};

// 室内图样式设置
var geojsonstylefunction = function(feature){
	// console.log(feature);
	// var featureiiiid = feature.I.feature_id;
	var featureiiiid = feature.values_.feature_id;
	if (feature.getGeometry().getType() == 'Point'  && (featureiiiid == '30060300' || featureiiiid == '30060000' || featureiiiid == '30040100')){
		// geojsonstyle[featureiiiid].getText().setText(feature.I.name);
		geojsonstyle[featureiiiid].getText().setText(feature.values_.name);
	}
	if (featureiiiid == '30060100' || featureiiiid == '30060200' ){
		if (map.getView().getZoom() > 19){
			geojsonstyle[featureiiiid].getImage().setScale((map.getView().getZoom()-19)*0.1);
		}else {
			geojsonstyle[featureiiiid].getImage().setScale(0.1);
		}
	}
	if (featureiiiid == '30050100' || featureiiiid == '30050800' || featureiiiid == '30050200' || featureiiiid == '30050300' ){
		if (map.getView().getZoom() > 18){
			geojsonstyle[featureiiiid].getImage().setScale((map.getView().getZoom()-18)*0.06);
		}else {
			geojsonstyle[featureiiiid].getImage().setScale(0.1);
		}
	}
	// 返回数据的style
	return geojsonstyle[featureiiiid];
};

// 资产初始点图标设置
var assetInitstylefunction = function(feature){
	var asset_classiiiid = feature.values_.class_id;
	var asset_name = feature.values_.asset_name;
	var asset_version = feature.values_.asset_version;
	var asset_floor = feature.values_.floor_id;
	var assetstyle = new ol.style.Style({  
		image: new ol.style.Icon({
			src: IconPath + '/icon/' + asset_classiiiid + '.png',
			anchor: [0.5,0.5],
			scale: (map.getView().getZoom()-16)*0.05,
			rotateWithView: true
		}),
		text: new ol.style.Text({
			text: asset_name,
			font: '0.71em sans-serif',
			// scale: 100,
			textAlign: 'center',
			textBaseline: 'top',
			offsetY: 10,
			fill: new ol.style.Fill({
				color: [40,40,40,1]
			}),
			stroke: new ol.style.Stroke({
				color: [255,255,255,1],
				width: 1
			})
		}),
		zIndex:300
	});
	// 根据楼层显示初始点！
	if(asset_floor == floorid){
		return assetstyle;
	}else {
		return null;
	}
	
}
// 资产定位点图标设置
var assetstylefunction = function (feature){
	var asset_id = feature.values_.l_id;
	var asset_classiiiid = feature.values_.category;
	var locateFloor = feature.values_.floor_id;
	var asset_name = feature.values_.name;
	
	var assetLocateStyle = {
		'show': new ol.style.Style({  
			text: new ol.style.Text({
				text: asset_name,
				font: '0.71em sans-serif',
				// scale: 100,
				textAlign: 'center',
				textBaseline: 'top',
				offsetY: 10,
				fill: new ol.style.Fill({
					color: [40,40,40,1]
				}),
				stroke: new ol.style.Stroke({
					color: [255,255,255,1],
					width: 1
				})
			}),
			image: new ol.style.Icon({
				src: IconPath + '/icon/' + asset_classiiiid + '_show.png',
				anchor: [0.5,0.5],
				scale: 0.3,
				rotateWithView: true
			}),
			zIndex:300
		}),
		'grey': new ol.style.Style({  
			image: new ol.style.Icon({
				src: IconPath + '/icon/' + asset_classiiiid + '_grey.png',
				anchor: [0.5,0.5],
				scale: 0.5,
				rotateWithView: true
			}),
			zIndex:300
		}),
		'hide': new ol.style.Style({  
			image: new ol.style.Icon({
				src: IconPath + '/icon/' + asset_classiiiid + '_hide.png',
				anchor: [0.5,0.5],
				scale: 0.3,
				rotateWithView: true
			}),
			zIndex:300
		})
	};
	
	// 判断该记录是否需要显示
	var showOrHide ;
	
	// 资产不在要显示的资产编号数组内
	//if ($.inArray(asset_id, AseetIdForLocate)){
	//	showOrHide = 'hide'; // 隐藏
	//	console.log('xxxxx'  );
	// 资产在要显示的资产编号数组内   && 资产所在楼层是当前选择楼层
	//}else
	if (locateFloor == floorid){
		showOrHide = 'show'; // 显示
		//console.log('oooooo'  );
	// 资产在要显示的资产编号数组内   && 资产所在楼层不是当前选择楼层
	}else {
		showOrHide = 'grey'; // 灰暗
	}
	return assetLocateStyle[showOrHide];
}

// 电子围栏样式设置
var electronicFenceStyleFun = function(feature){
	var featureFloor = feature.values_.floor_id;
	var featureiiiid = '1';
	// 返回数据的style
	if(featureFloor == floorid){
		return electronicFenceStyle[featureiiiid];
	}else {
		return electronicFenceStyle['2'];;
	}
	
};


// 确认网址的Flag 当为true时可以定位，加载定位信息
var checkFlag = false;

// 当为TRUE时 定位点在电子围栏内，定位点的style为特殊式样
var locateStyleWarn = false;

// 电子围栏
var electronicLayerOff = true; // 显示电子围栏的FLAG 当为true时显示电子围栏图层
var drawElectronicFlag = false;
var addElectronicFlag = false; // 第一次add后，设为true 
var updateElectronicFlag = false; // 第一次upd后，设为true 
var rmElectronicFlag = false; // 第一次rm后，设为true 
var drawtype = null;   // add or upd or rm
var DrawElectronicFence; // 绘制的interaction  draw
var ModifyElectronicFence; // 修改的interaction  select and modify
var DeleteElectronicFence; // 删除的interaction  select
// var electronicFeatureDummy = new ol.source.Vector(); // 电子围栏的feature 临时存储
var electronicFeatureDummy =[]; // 电子围栏的feature 临时存储
var OldWarnType = null; // 电子围栏预警的flag 对比前一次的变化去预警
var AseetIdForSaveFence = [];


// 修改记录
function updateNewFeature(features,featureType,updType){
	var WFSTSerializer = new ol.format.WFS();
    var formatGML = new ol.format.GML({  
		featureNS: 'http://www.' + DBs + '.com',
		featurePrefix: DBs,
        featureType: featureType,
        srsName: 'EPSG:4326',
    }); 	
	var featObject;
	switch (updType) {  
		case 'insert': 
			featObject = WFSTSerializer.writeTransaction(features,null,null,formatGML);
			break;
		case 'update': 
			featObject = WFSTSerializer.writeTransaction(null,features,null,formatGML);
			break;
		case 'remove': 
			featObject = WFSTSerializer.writeTransaction(null,null,features,formatGML);
			break;
	}
	var serializer = new XMLSerializer();
	var featString = serializer.serializeToString(featObject);
	featObjectSend(featString);
	console.log(featString);
}

// 发送操作数据库请求
function featObjectSend(featString){
	var request = new XMLHttpRequest();
	request.open('POST', wfsUrl + '?service=wfs');
	request.setRequestHeader('Content-Type', 'text/xml');
	request.send(featString);	
	if (AssetSavetype == "upd" || AssetSavetype == "add"){
		request.onreadystatechange = function(){
			//alert(request.readyState);
			if(request.readyState == 4){
			 setTimeout(parentlayerclose,1000); 
			}
		}
	}
	if(drawtype != null){
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				electronicFence(AseetIdForSaveFence);
			}
		}
	}

}

function parentlayerclose(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}
// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + month + strDate
            + date.getHours() + date.getMinutes()
            + date.getSeconds();
    return currentdate;
} 

// 获取根目录
var IconPath;
getPath();
function getPath(){  
    var curWwwPath = window.document.location.href;  
    var pathName = window.document.location.pathname;  
    var pos = curWwwPath.indexOf(pathName);  
    var localhostPaht = curWwwPath.substring(0,pos);  
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    IconPath = localhostPaht + projectName;
};

// 判断点在面内
var poly = [];
function rayCasting(p, poly) {
    var px = p[0];
    var py = p[1];
    var flag = false;

    for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
        var sx = poly[i][0];
        var sy = poly[i][1];
        var tx = poly[j][0];
        var ty = poly[j][1];

        // 点与多边形顶点重合
        if((sx === px && sy === py) || (tx === px && ty === py)) {
            console.log('点与多边形顶点重合');
            return 'on';
        }

        // 判断线段两端点是否在射线两侧
        if((sy < py && ty >= py) || (sy >= py && ty < py)) {
            // 线段上与射线 Y 坐标相同的点的 X 坐标
            var x = sx + (py - sy) * (tx - sx) / (ty - sy);

            // 点在多边形的边上
            if(x === px) {
                console.log('点在多边形的边上');
                return 'on';
            }

            // 射线穿过多边形的边界
            if(x > px) {
                console.log('射线穿过多边形的边界');
                flag = !flag;
            }
        }
    }
    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return flag ? 'in' : 'out';
}
