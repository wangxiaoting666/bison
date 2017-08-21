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
	$
			.get(
					getUncheckedAlerUrl,
					function(data) {
						var place = data.returnData.map.place;
						var sos = data.returnData.map.sos;
						var sum = place + sos;
						$uncheckedAlertBadge.html(sum);
						$uncheckedAlertList.html("");
						if (place > 0) {
							$uncheckedAlertList
									.prepend('<li class="place-alert"><a  href="alert?menuId=274"> <font color="red" id="place-alert">'
											+ "位置报警(<font id ='number'>"
											+ place
											+ "</font>)"
											+ '</font></a></li>');
						}
						if (sos > 0) {
							$uncheckedAlertList
									.prepend('<li class="sos-alert"> <a  href="alert?menuId=274"><font color="red" id="sos-alert">'
											+ "SOS报警(<font id='snum'>"
											+ sos
											+ ")</font>" + '</font></a></li>');
						}
					});
}

$uncheckedAlertMenuBtn.click(function() {
	if (uncheckedAlertData.length == 0) {
		window.location.href = toAlertHistoryPage;
	} else {
		alertListShowLength = 5;
		$uncheckedAlertItems.each(function(i, e) {
			i < 5 ? $(e).show() : $(e).hide();
		});
		$uncheckedAlertItems.size() > alertListShowLength
				&& $showMoreAlert.show() && $alertMenuDivider.show();
	}
});
var checkAlert = function(id) {
	$.ajax({
		url : checkAlertUrl,
		data : {
			'id' : id
		},
		type : "POST",
		success : function(data) {
			initUncheckedAlertMenu();
		},
		error : function(data) {
			toast.error("查看失败:" + data);
		}
	});
};