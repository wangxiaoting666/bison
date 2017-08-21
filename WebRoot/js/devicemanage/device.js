var deviceTable = function () {
    /**
     *
     * General
     *
     */
    /** Dictionary **/
    var pagePath = "deviceManage/";
    var dic = {
        field: {
            "id": "编号",
            "fwVer": "固件版本",
            "hwVer": "硬件版本",
            "apVer": "应用版本",
            "chipId": "芯片ID",
            "flashId": "闪存ID",
            "flashSize": "闪存大小",
            "flashMode": "闪存模式",
            "flashSpeed": "闪存速度",
            "resetReason": "重启原因",
            "applicationServerIp": "应用服务器IP",
            "positionServerIp": "位置服务器IP"
        },
        flashMode: function (item) {
            return {
                "1": "A模式",
                "2": "B模式",
                "3": "C模式",
                "4": "D模式"
            }[item.flashMode]
        },
        resetReason: function (item) {
            return {
                "1": "shut-down",
                "2": "power-off",
                "3": "exception",
                "4": "full",
                "5": "unknown"
            }[item.resetReason]
        },
        fwVer: function (item) {
            return item.majorVer + '.' + item.minorVer + '.' + item.revisonVer;
        },
        fwVerSplit: function (fwVer) {
            var versions = fwVer.split('.', 3);
            return {
                "majorVer": versions[0],
                "minorVer": versions[1],
                "revisonVer": versions[2]
            }
        }
    };
    var url = {
        list: basePath + pagePath + "getDeviceListPage",
        add: basePath + pagePath + "",
        edit: basePath + pagePath + "edit",
        del: basePath + pagePath + "",
        update: basePath + pagePath + "updateVersion",
        getFwVer: basePath + "firmwareManage/getFirmwareListPage",
        getApVer: basePath + "applicationManage/getApplicationListPage",
        getHwVer: basePath + pagePath + "getHardwareList"
    };


    /**
     *
     * Object & global variable
     *
     */
    /** Table object **/
    var $table = $("#dataTable");
    var $tbody = $("tbody", $table);
    var _table = {};        //表的dataTable对象；
    // var _table = $table.dataTable();
    /** Window object**/
    var $filterWin = $("#filterWin");
    var $detailWin = $("#detailWin");
    var $editWin = $("#editWin");
    var $updateWin = $("#updateWin");
    /** Form object **/
    var $editForm = $("form", $editWin);
    var $updateForm = $("form", $updateWin);
    /** Form control **/
    var ff = {
        userid: $('input[name="userid"]', $filterWin),
        fwVer: $('select[name="fwVer"]', $filterWin),
        hwVer: $('select[name="hwVer"]', $filterWin),
        apVer: $('select[name="apVer"]', $filterWin),
        asi: $('input[name="applicationServerIp"]', $filterWin),
        psi: $('input[name="positionServerIp"]', $filterWin),
        echo: {userid: '', fwVer: '', hwVer: '', apVer: '', asi: '', psi: ''}
    };
    var ef = {//asi:应用服务器ip，psi:定位服务器ip，bot:开始运营时间控件，eot:结束运营时间控件
        info: $('.well', $editForm),
        userid: $('input[name="userid"]', $editForm),
        fwVer: $('input[name="fwVer"]', $editForm),
        hwVer: $('input[name="hwVer"]', $editForm),
        apVer: $('input[name="apVer"]', $editForm),
        asi: $('input[name="applicationServerIp"]', $editForm),
        psi: $('input[name="positionServerIp"]', $editForm),
        bot: $('#beginOperatingTime').timepicker().on('changeTime.timepicker', function (e) {
            ef.bHour = e.time.hours + 12 * (e.time.meridian === "PM");
            ef.bMinute = e.time.minutes;
        }),
        eot: $('#endOperatingTime').timepicker().on('changeTime.timepicker', function (e) {
            ef.eHour = e.time.hours + 12 * (e.time.meridian === "PM");
            ef.eMinute = e.time.minutes;
        }),
        disasi: $('#disableAsi'),
        dispsi: $('#disablePsi'),
        disbot: $('#disableBot'),
        diseot: $('#disableEot'),
        submit: $('.submit', $editWin)
    };
    var uf = {
        info: $('.well', $updateWin),
        fwVer: $('select[name="fwVer"]', $updateForm),
        apVer: $('select[name="apVer"]', $updateForm),
        ufo: $('#updateFirmwareOnly'),
        uao: $('#updateApplicationOnly'),
        submit: $('.submit', $updateWin)
    };
    /** Button object **/
    var $checkTable = $('#checkTable');
    var $checkPage = $('#checkPage');
    var $showUpdate = $("#updateShow");
    var $showEdit = $("#editShow");
    var $showFilter = $("#filterShow");
    /** Control object **/

    /** Select list **/
    var selected = [];


    /**
     *
     * config
     *
     **/
    /** sumoSelectConfig **/
    var multSelectConfig = {
        maxHeight: 200,
        //buttonWidth: '150px',
        disableIfEmpty: true,
        disabledText: '没有任何版本',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return '请选择版本';
            } else if (options.length > 3) {
                return '已选择了' + options.length + "项";
            } else {
                var labels = [];
                options.each(function () {
                    labels.push($(this).attr('label') ? $(this).attr('label') : $(this).html());
                });
                return labels.join(',');
            }
        }
    };
    ff.fwVer.multiselect(multSelectConfig);
    ff.hwVer.multiselect(multSelectConfig);
    ff.apVer.multiselect(multSelectConfig);

    /** blockUIConfig **/
    var blockUIConfig = {
        message: '<h1>请稍后...</h1>',
        overlayCSS: {
            backgroundColor: '#0f0f0f',
            opacity: '0.2'
        }
    };
    var block = function (target, config) {
        target.block(config || blockUIConfig);
    };

    /** dataTableConfig **/
    var dataTableConfig = {
        "ajax": {
            "url": url.list// ajax source
        },
        "columns": [
            {
                data: 'checkbox',
                orderable: false,
                render: function (data) {
                    return '<input type="checkbox">';
                }
            },
            {data: 'userid', orderable: false, searchable: true},
            {
                data: 'fwVer',
                orderable: false,
                render: function (data, type, row) {
                    return dic.fwVer(row);
                }
            },
            {data: 'hwVer', orderable: false, searchable: true},
            {data: 'apVer', orderable: false, searchable: true},
            {data: 'applicationServerIp', orderable: false, searchable: true},
            {data: 'positionServerIp', orderable: false, searchable: true},
            {
                data: 'operate',
                orderable: false,
                render: function (data, type, row) {
                    return '<a class="update btn default btn-xs green"><i class="fa fa-arrow-up"></i>更新</a>&nbsp;'
                        + '<a class="edit btn default btn-xs orange"><i class="fa fa-edit"></i>编辑</a>&nbsp;';
                    //+ '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                }
            }
        ]
    };

    /** onQueryConfig **/
    var onQueryConfig = function (data) {
        data.userid = ff.echo.userid = ff.userid.val();
        data.applicationServerIp = ff.echo.asi = ff.asi.val();
        data.positionServerIp = ff.echo.psi = ff.psi.val();
        if (ff.fwVer.val()) {
            ff.echo.fwVer = ff.fwVer.val();
            var majorVer = [], minorVer = [], revisonVer = [];
            $.each(ff.fwVer.val(), function (i, v) {
                var vers = dic.fwVerSplit(v);
                majorVer.push(vers.majorVer);
                minorVer.push(vers.minorVer);
                revisonVer.push(vers.revisonVer);
            });
            data.majorVer = majorVer.join(',');
            data.minorVer = minorVer.join(',');
            data.revisonVer = revisonVer.join(',');
        } else {
            data.majorVer = "";
            data.minorVer = "";
            data.revisonVer = "";
        }
        ff.echo.hwVer = ff.hwVer.val();
        ff.echo.apVer = ff.apVer.val();
        data.hwVer = ff.hwVer.val() ? ff.hwVer.val().join(',') : "";
        data.apVer = ff.apVer.val() ? ff.apVer.val().join(',') : "";
    };

    /** onSortConfig **/
    var onSortConfig = function (sortColumn, sortDirection) {
        switch (sortColumn) {
            case "userid":
                sortColumn = "user_id";
                break;
        }
        return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
    };

    /** initConfig **/
    var initConfig = {
        src: $table,
        onQuery: onQueryConfig,
        onSortColumn: onSortConfig,
        // onDetail: onDetailConfig,
        dataTable: dataTableConfig
    };

    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init(initConfig);
        _table = dataTable.getDataTable();
    };


    /**
     *
     * Event
     *
     */

    var handleEvent = function () {
        //显示隐藏筛选行
        $showFilter.click(filterShow);
        //显示升级窗口
        $showUpdate.click(updateShow);//多行升級，目前不支持
        $tbody.on("click", "a.update", updateShow);//单行升级
        //行点击事件，显示/隐藏详情窗口
        $tbody.on("click", "tr", detailShow);
        //显示编辑窗口
        $tbody.on("click", "a.edit", editShow);
        //显示删除窗口&删除设备
        $tbody.on("click", "a.delete", submitDelete);
        //确认编辑
        ef.submit.click(submitEdit);
        //确认升级
        uf.submit.click(submitUpdate);
        //单选事件
        $tbody.on('click', ':checkbox', function (e) {
            e.stopPropagation();
            var id = _table.row($(this).closest('tr')).data().userid;
            this.checked ? selected.push(id) : (selected = _.without(selected, id));
            //是否已全选
            var checkedAll = ($(":checkbox", $tbody).length == $(":checkbox", $tbody).filter(':checked').length);
            $checkPage.prop('checked', checkedAll).parent().toggleClass("checked", checkedAll);
        });
        //全选本页
        $checkPage.click(function (e) {
            e.stopPropagation();
            var checkAll = $(this).prop("checked");
            var $cbs = $(":checkbox", $tbody);
            $cbs.prop('checked', checkAll).parent().toggleClass("checked", checkAll);
            selected = checkAll ? _.pluck(_table.data(), 'userid') : [];
        });
        //页面刷新
        $table.on("draw.dt", function () {
            selected = [];
            getSelectList();
            $checkPage.prop('checked', false).parent().removeClass('checked');
        });

        /** 其他细节事件 **/
        uf.ufo.on("change", function () {
            uf.apVer.attr("disabled", this.checked);
            uf.uao.attr("disabled", this.checked);
        });
        uf.uao.on("change", function () {
            uf.fwVer.attr("disabled", this.checked);
            uf.ufo.attr("disabled", this.checked);
        });
        ef.disasi.on("change", function () {
            ef.asi.attr("disabled", this.checked);
        });
        ef.dispsi.on("change", function () {
            ef.psi.attr("disabled", this.checked);
        });
        ef.disbot.on("change", function () {
            ef.bot.attr("disabled", this.checked);
        });
        ef.diseot.on("change", function () {
            ef.eot.attr("disabled", this.checked);
        });
    };


    /**
     *
     * Method
     *
     */

    /** Display&hide filter row **/
    var filterShow = function () {
        $filterWin.toggle();
    };

    /** Display update window **/
    var updateShow = function (e) {
        e.stopPropagation();
        //没选中则弹出warning，只有一台设备则显示详情，多台设备则显示数量
        if (this == $showUpdate[0]) {
            if (selected.length == 0) {
                toast.warning('请勾选需要升级的设备后再点击设备升级！');
                return;
            } else if (selected.length == 1) {
                var item = _.findWhere(_table.data(), {userid: selected[0]});
                uf.info.html('<p>已选中以下设备</p>' +
                    '<p class="userid">设备ID:' + item.userid + '</p>' +
                    '<p>固件版本:' + dic.fwVer(item) + '</p>' +
                    '<p>硬件版本:' + item.hwVer + '</p>' +
                    '<p>应用版本:' + item.apVer + '</p>');
            } else {
                uf.info.html("已选择" + selected.length + "台设备。");
            }
        } else {
            var item = _table.row($(this).closest('tr')).data();
            uf.info.html('<p>已选中以下设备</p>' +
                '<p class="userid">设备ID:' + item.userid + '</p>' +
                '<p>固件版本:' + dic.fwVer(item) + '</p>' +
                '<p>硬件版本:' + item.hwVer + '</p>' +
                '<p>应用版本:' + item.apVer + '</p>');
        }
        $(".modal-title", $updateWin).html("升级设备");
        $.get(url.getFwVer, function (data) {
            var list = data.data;
            uf.fwVer.html('<option value="">--请选择固件版本--</option>');
            $.each(list, function (i, v) {
                uf.fwVer.append('<option value="' + v.version + '">' + v.version + '</option>');
            });
        });
        $.get(url.getApVer, function (data) {
            var list = data.data;
            uf.apVer.html('<option value="">--请选择应用版本--</option>');
            $.each(list, function (i, v) {
                uf.apVer.append('<option value="' + v.version + '">' + v.version + '</option>');
            });
        });
        customGlobal.clearFormAndShowDialog("updateWin");
    };

    /** Display detail window **/
    var detailShow = function () {
        $(this).addClass("activeRow").siblings().removeClass("activeRow");
        $(".modal-title", $detailWin).html("设备详情");
        //获取该行对应的数据
        var item = _table.row($(this).closest('tr')).data();
        //填充数据
        $('strong', $detailWin).each(function (i, e) {
            var name = $(this).attr('name');
            $(this).html(dic[name] ? dic[name](item) : item[name]);
        });
        customGlobal.clearFormAndShowDialog("detailWin");
    };

    /** Display edit window **/
    var editShow = function (e) {
        e.stopPropagation();
        //没选中则弹出warning，只有一台设备则显示详情，多台设备则显示数量
        if (this == $showEdit[0]) {
            if (selected.length == 0) {
                toast.warning('请勾选需要编辑的设备后再点击设备编辑！');
                return;
            } else if (selected.length == 1) {
                var item = _.findWhere(_table.data(), {userid: selected[0]});
                ef.info.html('<p>已选中以下设备</p>' +
                    '<p class="userid">设备ID:' + item.userid + '</p>' +
                    '<p>固件版本:' + dic.fwVer(item) + '</p>' +
                    '<p>硬件版本:' + item.hwVer + '</p>' +
                    '<p>应用版本:' + item.apVer + '</p>');
            } else {
                uf.info.html("已选择" + selected.length + "台设备。");
            }
        } else {
            var item = _table.row($(this).closest('tr')).data();
            ef.info.html('<p>已选中以下设备</p>' +
                '<p class="userid">设备ID:' + item.userid + '</p>' +
                '<p>固件版本:' + dic.fwVer(item) + '</p>' +
                '<p>硬件版本:' + item.hwVer + '</p>' +
                '<p>应用版本:' + item.apVer + '</p>');
        }
        $(".modal-title", $editWin).html("编辑设备");
        customGlobal.clearFormAndShowDialog("editWin");
        // var item = _table.row($(this).closest('tr')).data();
        // ef.userid.val(item.userid).attr("readOnly", true);
        // ef.fwVer.val(dic.fwVer(item)).attr("readOnly", true);
        // ef.hwVer.val(item.hwVer).attr("readOnly", true);
        // ef.apVer.val(item.apVer).attr("readOnly", true);
        if (item == undefined) return;
        ef.asi.val(item.applicationServerIp).attr("placeholder", item.applicationServerIp);
        ef.psi.val(item.positionServerIp).attr("placeholder", item.positionServerIp);
        // ef.bot.val(item.bHour + ':' + item.bMinute);
        // ef.bot.val(item.eHour + ':' + item.eMinute);
    };

    /** Confirm delete **/
    var submitDelete = function (e) {
        e.stopPropagation();
        var item = _table.row($(this).closest('tr')).data();
        //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
        $("#confirmBtn").off("click.deleteRow").on("click.deleteRow", function () {
            $.ajax({
                url: url.del + item.userid,
                dataType: "json",
                // data: JSON.stringify({userid: item.userid}),
                type: "DELETE",
                success: function (data) {
                    $("#confirmDialog").modal("hide");
                    if (customGlobal.ajaxCallback(data)) {
                        dataTable.reloadTable();
                    }
                }
            })
        })
    };

    /** Submit edit **/
    var submitEdit = function () {
        if ($editForm.validate().form()) {
            block($editForm);
            var data = $editForm.serializeObject();
            var $id = $("p.userid", ef.info);
            data.userid = $id.length == 0 ? selected.join(',') : $id.html().split(':')[1];
            if (ef.bot.val()) {
                data["bHour"] = ef.bHour;
                data["bMinute"] = ef.bMinute;
            }
            if (ef.eot.val()) {
                data["eHour"] = ef.eHour;
                data["eMinute"] = ef.eMinute;
            }
            $.ajax({
                url: url.edit,
                data: data,
                type: "POST",
                success: function (data) {
                    if (customGlobal.ajaxCallback(data)) {
                        $editForm.unblock();
                        $editWin.modal("hide");
                        dataTable.reloadTable();
                    }
                },
                error: function (data) {
                    $editForm.unblock();
                    toast.error("连接失败！");
                    return false;
                }
            });
        }
    };

    /** Submit update **/
    var submitUpdate = function () {
        if ($updateForm.validate().form()) {
            block($updateForm);
            var data = $updateForm.serializeObject();
            if (uf.fwVer.attr("disabled") != true) {
                data = $.extend(true, data, dic.fwVerSplit(data.fwVer));
            }
            var $id = $("p.userid", $updateForm);
            data.userid = $id.length == 0 ? selected.join(',') : $id.html().split(':')[1];
            $.ajax({
                url: url.update,
                data: data,
                //data: JSON.stringify(data),
                type: "post",
                //contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $updateForm.unblock();
                    if (customGlobal.ajaxCallback(data)) {
                        $updateWin.modal("hide");
                        dataTable.reloadTable();
                    }
                },
                error: function (data) {
                    $updateForm.unblock();
                    toast.error("连接失败！");
                    return false;
                }
            });
        }
    };


    /** Get select list & Data echo **/
    var getSelectList = function () {
        $.get(url.getFwVer, function (data) {
            ff.fwVer.multiselect('dataprovider', _.map(data.data, function (v) {
                var version = v.version;
                var select = (_.indexOf(ff.echo.fwVer, version) >= 0);
                return {label: "V" + version, value: version, selected: select};
            }));
        });
        $.get(url.getHwVer, function (data) {
            ff.hwVer.multiselect('dataprovider', _.map(data.returnData.hardware, function (v) {
                var version = v.hwVer;
                var select = (_.indexOf(ff.echo.hwVer, version) >= 0);
                return {label: "V" + version, value: version, selected: select};
            }));
        });
        $.get(url.getApVer, function (data) {
            ff.apVer.multiselect('dataprovider', _.map(data.data, function (v) {
                var version = v.version;
                var select = (_.indexOf(ff.echo.apVer, version) >= 0);
                return {label: "V" + version, value: version, selected: select};
            }));
        });
        ff.userid.val(ff.echo.userid);
        ff.asi.val(ff.echo.asi);
        ff.psi.val(ff.echo.psi);
    };


    /**
     *
     * Return
     *
     */
    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    }
};