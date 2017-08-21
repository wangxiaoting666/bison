/**
 * Created by junze on 2016/10/17.
 */
/**
 *
 * Init code
 *
 */

Metronic.init(); // init metronic core components
Layout.init(); // init current layout

function initPositionMap(modal) {
    var map = $("div.map", modal).mapplic({
        source: 'data/warehouse.json',
        height: 500,
        mapfill: true,
        lightbox: true,
        maxscale: 1,
        zoom: true,
        coordtip: true
    });
    map.on('mapready', function (e, self) {
    });
    map.on('positionchanged', function (e, self) {
        $.each(onCheckAlertTrace, function (i, v) {
            self.coordtip.locate(i, v.x, v.y);
        });
    });
    return map.data('mapplic')
}
var mapSelf = initPositionMap($('#map-section'));

$("#map-section").dialog({
    draggable: true,
    autoOpen: false,
    height: 600,
    width: 800,
    modal: true,
    title: "SOS位置地图",
    open: function () {
        $(window).resize()
    }
});


/**
 *
 * SOS code
 *
 */

var getUncheckedAlerUrl = basePath + "alert/getAlertUncheckedList";
var toAlertHistoryPage = basePath + "alert?menuId=274";
var checkAlertUrl = basePath + "alert/checkAlert";
var $uncheckedAlertMenu = $('li.dropdown-alert');
var $uncheckedAlertMenuBtn = $("a.dropdown-toggle", $uncheckedAlertMenu);
var $uncheckedAlertBadge = $("span.badge", $uncheckedAlertMenuBtn);
var $uncheckedAlertList = $('ul', $uncheckedAlertMenu);
var $uncheckedAlertItems = $('li.sos-alert', $uncheckedAlertList);
var $showMoreAlert = $('a.show-more', $uncheckedAlertList);
var $alertMenuDivider = $('li.divider', $uncheckedAlertList);
var alertListShowLength = 5;
var uncheckedAlertData = [];
var onCheckAlertTrace = {};
initUncheckedAlertMenu();

function initUncheckedAlertMenu() {
    $.get(getUncheckedAlerUrl, function (data) {
    	/*var place = data.returnData.map.place;
    	var sos = data.returnData.map.sos;*/
        uncheckedAlertData = data.data;
        $uncheckedAlertBadge.html(uncheckedAlertData && uncheckedAlertData.length);
        uncheckedAlertData.length > alertListShowLength ? $uncheckedAlertList.html(
            '<li class="divider"></li><li class="show-more"><a href="javascript:void(0)">显示更多</a></li>') :
            $uncheckedAlertList.html("");
        $showMoreAlert = $('li.show-more', $uncheckedAlertList);
        $alertMenuDivider = $('li.divider', $uncheckedAlertList);
        uncheckedAlertData && $.each(uncheckedAlertData, function (i, v) {
            $uncheckedAlertList.prepend('<li class="sos-alert"><a onclick="checkAlert(\'' + v.deviceId + '\');" ' +
                'href="javascript:void(0)">' + v.deviceId + "报警" + '</a></li>');
        });
        $uncheckedAlertItems = $('li.sos-alert', $uncheckedAlertList);
        $showMoreAlert.click(function (e) {
            alertListShowLength += 5;
            $uncheckedAlertItems.each(function (i, e) {
                i < alertListShowLength ? $(e).show() : $(e).hide();
            });
            $uncheckedAlertItems.size() < alertListShowLength && $showMoreAlert.hide(); //&& $alertMenuDivider.hide();
            e.stopPropagation();
        });
   
    });
}




$uncheckedAlertMenuBtn.click(function () {
    if (uncheckedAlertData.length == 0) {
        window.location.href = toAlertHistoryPage;
    } else {
        alertListShowLength = 5;
        $uncheckedAlertItems.each(function (i, e) {
            i < 5 ? $(e).show() : $(e).hide();
        });
        $uncheckedAlertItems.size() > alertListShowLength && $showMoreAlert.show() && $alertMenuDivider.show();
    }
});
var checkAlert = function (id) {
    $.ajax({
        url: checkAlertUrl,
        data: {
            'deviceId': id
        },
        type: "POST",
        success: function (data) {
            onCheckAlertTrace = data.returnData.trace;
            initUncheckedAlertMenu();
            $("#map-section").dialog('open');
        },
        error: function (data) {
            toast.error("查看失败:" + data);
        }
    });
};