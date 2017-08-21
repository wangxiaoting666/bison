	var amapLayer = new ol.layer.Tile({
		title: '高德地图',
		visible: true,
		source: new ol.source.XYZ({
			url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
		}),
		zIndex: 0
	});
	
	var viewParam = 'place_id:' + placeid + ';floor_id:' + floorid;
	var backgroundLayer = new ol.layer.Tile({
		title: 'background map',
		visible: true,
		source: new ol.source.TileWMS({
			url: wmsUrl,
			params: {LAYERS: DBs + ':mote_background',VERSION:'1.1.0',viewparams:viewParam}
		}),
		zIndex: 1
	});	

	var polygonTypename = DBs + ':mote_polygon';
	var polygonLayer = new ol.layer.Vector({
		title: 'polygon map',
		visible: true,
		source: new ol.source.Vector({
			features:  new ol.format.GeoJSON().readFeatures(geojsonObject(viewParam,polygonTypename))
		}),
		style: geojsonstylefunction,
		maxResolution: 0.00001,
		zIndex: 10
	});

	var pointTypename = DBs + ':mote_point';
	var pointLayer = new ol.layer.Vector({
		title: 'point map',
		visible: true,
		source: new ol.source.Vector({
			features:  new ol.format.GeoJSON().readFeatures(geojsonObject(viewParam,pointTypename))
		}),
		style: geojsonstylefunction,
		maxResolution: 0.000003,
		zIndex: 30
	});
	
	// 资产初始位置
	var assetTypename = DBs + ':asset_init_locate';
	var initAssetLayer = new ol.layer.Vector({
		title: 'ini asset map',
		visible: true,
		source: new ol.source.Vector(),
		style: assetInitstylefunction,
		maxResolution: 0.000003,
		zIndex: 60
	});
	
	// 定位点图层
	var AssetLocateSource = new ol.source.Vector();
	var AssetLocateLayer = new ol.layer.Vector({
		title: 'asset locate map',
		visible: true,
		source: AssetLocateSource,
		style: assetstylefunction,
		maxResolution: 0.000003,
		zIndex: 65
	});

	// 电子围栏图层 	
	var electronicLayer = new ol.layer.Vector({
		title: 'electronicFence map',
		visible: true,
		style: electronicFenceStyleFun,
		source: new ol.source.Vector(),
		zIndex: 80
	});		
	
	// 位置告警的历史轨迹图层
	var AssetRouteLayer,AssetRoutePointLayer;
	var selectPointerMove;
	
	
	// 创建地图
	var amap = new ol.layer.Group({
		title: 'amap',
		layers: [amapLayer],
	});	
	var basemap = new ol.layer.Group({
		title: 'base map',
		layers: [backgroundLayer,polygonLayer,pointLayer,initAssetLayer,electronicLayer,AssetLocateLayer],
	});

	var map;

	
	
	