var sysParamListTable = function () {

    var dataTable;
    var $table = $("#dataTable");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "sysParamName":
                        sortColumn = "sys_param_name";
                        break;
                    case "paramValue":
                        sortColumn = "param_value";
                        break;
                    case "description":
                        sortColumn = "description";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "system/sysParam/getSysParamListPage" // ajax source
                },
                "columns": [
                    {data: 'sysParamName', orderable: true, searchable: true},
                    {data: 'sysParamValue', orderable: true, searchable: true},
                    {data: 'description', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<shiro:hasPermission name="system:sysParamEdit:open"><a class="edit btn default btn-xs purple" sysParamId="' + full.sysParamId + '" paramValue="' + full.sysParamValue + '"><i class="fa fa-edit"></i>编辑</a></shiro:hasPermission>&nbsp;'
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $table.on("click", "a.edit", function () {
            $("#modalTitle").html("编辑变量");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    paramValue: {
                        required: true
                    }
                }
            }).resetForm();
            $("#updateBtn").show();
            var sysParamId = $(this).attr("sysParamId");
            var paramValue = $(this).attr("paramValue");
            $("#sysParamId").val(sysParamId);
            $("#paramValue").val(paramValue == "null" ? "" : paramValue);
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    sysParamId: $("#sysParamId").val(),
                    sysParamValue: $("#paramValue").val()
                };
                $.ajax({
                    url: "system/sysParam",
                    data: (data),
                    type: "put",
                    success: function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            dataTable.reloadTable();
                        }
                    }
                });
            }
        });
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();