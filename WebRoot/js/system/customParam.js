var customParamListTable = function () {

    var dataTable;
    var $table = $("#dataTable");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery: function (data) {
                data.paramName = $("#paramNameQuery").val();
                data.paramValue = $("#paramValueQuery").val();
                data.description = $("#descriptionQuery").val();
            },
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "paramName":
                        sortColumn = "param_name";
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
                    "url": basePath + "system/customParam/getCustomParamListPage" // ajax source
                },
                "columns": [
                    {data: 'paramName', orderable: true, searchable: true},
                    {data: 'paramValue', orderable: true, searchable: true},
                    {data: 'description', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<shiro:hasPermission name="system:customParamEdit:open"><a class="edit btn default btn-xs purple" customParamId="' + full.customParamId + '"><i class="fa fa-edit"></i>编辑</a></shiro:hasPermission>&nbsp;'
                                + '<shiro:hasPermission name="system:customParamEdit:open"><a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a></shiro:hasPermission>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addCustom").on("click", function () {
            $("#modalTitle").html("添加变量");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    paramName: {
                        required: true
                    },
                    paramValue: {
                        required: true
                    },
                    description: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").show();
            $("#updateBtn").hide();
        });

        $("#addBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                $.ajax({
                    url: "system/customParam",
                    data:{
                        paramName: $("#paramName").val(),
                        paramValue: $("#paramValue").val(),
                        description: $("#description").val()
                    },
                    type: "post",
                    success: function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            dataTable.reloadTable();
                        }
                    }
                });
            }
        });

        $table.on("click", "a.edit", function () {
            $("#modalTitle").html("编辑变量");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    paramName: {
                        required: true
                    },
                    paramValue: {
                        required: true
                    },
                    description: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").hide();
            $("#updateBtn").show();
            $.get("system/customParam/" + $(this).attr("customParamId"), function (data) {
                var customParam = data.returnData.customParam;
                $("#customParamId").val(customParam.customParamId);
                $("#paramName").val(customParam.paramName);
                $("#paramValue").val(customParam.paramValue);
                $("#description").val(customParam.description);
            });
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    customParamId: $("#customParamId").val(),
                    paramName: $("#paramName").val(),
                    paramValue: $("#paramValue").val(),
                    description: $("#description").val()
                };
                $.ajax({
                    url: "system/customParam",
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

        $table.on("click", "a.delete", function () {
            var $this = $(this);
            //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
            $("#confirmBtn").off("click.deleteRow").on("click.deleteRow", function () {
                $.ajax({
                    url: "system/customParam/" + $table.DataTable().row($this.parents('tr')[0]).data().customParamId,
                    dataType: "json",
                    type: "DELETE",
                    success: function (data) {
                        $("#confirmDialog").modal("hide");
                        if (customGlobal.ajaxCallback(data)) {
                            dataTable.reloadTable();
                        }
                    }
                })
            })
        });
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();