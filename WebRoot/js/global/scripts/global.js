var basePath = (function () {
    var url = window.location + "";
    var h = url.split("//");
    var x = h[1].split("/");
    return h[0] + "//" + window.location.host + "/" + x[1] + "/";
})();
var tolocalTime = function (time) {
    var date = new Date(time);
    var now = new Date();
    var datestr = "";
    if ((now - date) >= 1000 * 3600 * 24) {
        if (date.getYear() != now.getYear()) datestr += date.getYear() + "年";
        datestr += date.getMonth() + "月" + date.getDay() + 1 + "日";
    } else {
        datestr += date.getDay() == now.getDay() ? "今天" : "昨天";
    }
    datestr += date.getHours() > 12 ? "下午" : "上午";
    datestr += date.getHours() % 12 + '点' + date.getMinutes() + '分' + date.getSeconds() + '秒';
    return datestr;
};
$(function () {
    //此函数为了处理firefox及chrome中，在弹出的窗口中点击ckeditor的上传图片，显示的input无法获取光标的问题
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
        modal_this = this;
        $(document).on('focusin.modal', function (e) {
            if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
                && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select')
                && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
                modal_this.$element.focus()
            }
        })
    };
    $.ajaxSetup({
        cache: false,
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.responseJSON) {
                toast.error(XMLHttpRequest.responseJSON.returnMsg);
            } else {
                toast.error("状态：" + XMLHttpRequest.status + ", 错误：" + XMLHttpRequest.statusText)
            }
            Metronic.unblockUI(customGlobal.blockUITarget);
        }
    });
    $.validator.setDefaults({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: true,
        ignore: "",  // validate all fields including form hidden input
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            toastr.error("表单信息填写有误，请核对后再提交。");
        }
    });
    $.validator.messages.equalTo = "两次输入不相同";
    $("#menu_" + $("#menuParentId").val()).addClass("active").find("span.arrow").addClass("open");
    $("#menu_" + $("#menuId").val()).addClass("active");
    var $menuSearch = $("#menuSearch").on("keydown", function (e) {
        var $this = $(this);
        var menuId = $this.getGAutoHiddenValue();
        if (e.which == 13 && menuId != undefined && menuId != "") {
            e.preventDefault();
            customGlobal.menuSearch(menuId);
        }
    });
    $("#menuSearchBtn").on("click", function () {
        var menuId = $menuSearch.getGAutoHiddenValue();
        if (menuId != undefined && menuId != "") {
            customGlobal.menuSearch(menuId)
        }
    });
    customGlobal.initUpdatePasswordEvent();
    //可以将form表单的结果转换为Object对象
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});
var customGlobal = {
    onSortColumnDefault: function (sortColumn, sortDirection) {
        return {
            sortColumn: sortColumn,
            sortDirection: sortDirection
        }
    },
    blockUI: function (target) {
        if (target !== undefined) {
            customGlobal.blockUITarget = target;
            Metronic.blockUI({
                target: target,
                boxed: true,
                message: '载入中，请稍候...'
            });
        } else {
            Metronic.blockUI({
                boxed: true,
                message: '载入中，请稍候...'
            });
        }
    },
    ajaxCallback: function (data) {
        Metronic.unblockUI(customGlobal.blockUITarget);
        if (data.ok) {
            toast.success(data.returnMsg);
            return true;
        } else if (data.error) {
            toast.error(data.returnMsg);
            return false;
        } else if (data.warn) {
            toast.warn(data.returnMsg);
            return true;
        }
    },
    clearFormAndShowDialog: function (dialogId) {
        $("#" + dialogId).find("input:text,input:password,select,textarea").val("").end().modal("show").find("div.form-group").removeClass("has-error");
    },
    menuSearch: function (menuId) {
        $.post("develop/menu/menuSearch", {menuId: menuId}, function (data) {
            if (customGlobal.ajaxCallback(data)) {
                location.href = data.returnData.url;
            }
        })
    },
    initUpdatePasswordEvent: function () {
        $("#updatePass").on("click", function () {
            customGlobal.clearFormAndShowDialog("updatePasswordModal");
            $("#updatePasswordDialog").validate({
                rules: {
                    oldPassword: {
                        required: true
                    },
                    reNewPassword: {
                        equalTo: "#newPassword"
                    }
                }
            }).resetForm();
            $("#passwordHelpBlock").html("");
        });

        $("#updatePassword").on("click", function () {
            customGlobal.blockUI("#updatePasswordContent");
            $.ajax({
                url: "security/user/updatePassword",
                data: {
                    oldPassword: $("#oldPassword").val().md5(),
                    newPassword: $("#newPassword").val().md5()
                },
                type: "post",
                success: function (data) {
                    if (customGlobal.ajaxCallback(data)) {
                        $("#updatePasswordModal").modal("hide");
                    }
                }
            });
        });
    }
};
