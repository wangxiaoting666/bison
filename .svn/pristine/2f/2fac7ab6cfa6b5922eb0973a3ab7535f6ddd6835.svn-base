var permissionListTable = function () {

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
                data.permToken = $("#permTokenQuery").val();
                data.description = $("#descriptionQuery").val();
            },
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "permToken":
                        sortColumn = "perm_token";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "develop/permission/getPermissionListPage" // ajax source
                },
                "columns": [
                    {data: 'permToken', orderable: true, searchable: true},
                    {data: 'description', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" permToken="' + full.permToken + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addPermission").on("click", function () {
            $("#modalTitle").html("添加许可");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    permToken: {
                        required: true
                    },
                    description: {
                        required: true
                    },
                    ParentId: {
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
                var data = {
                    permToken: $("#permToken").val(),
                    description: $("#description").val(),
                    parentId: $("#ParentId").val()
                };
                $.ajax({
                    url: "develop/permission",
                    data: JSON.stringify(data),
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
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
            $("#modalTitle").html("栏目编辑");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    permToken: {
                        required: true
                    },
                    description: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").hide();
            $("#updateBtn").show();
            $.get("develop/permission/" + $(this).attr("permToken"), function (data) {
                var permission = data.returnData.permission;
                $("#ParentId").val(permission.parentId);
                $("#permToken").val(permission.permToken);
                $("#ParentId").hide();
                $("#ParentId2").hide();
                $("#permToken").hide();
                $("#permToken2").hide();
                $("#permToken3").hide();
                $("#description").val(permission.description);
            });
        });
        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    permToken: $("#permToken").val(),
                    description: $("#description").val(),
                    parentId: $("#ParentId").val()
                };
                $.ajax({
                    url: "develop/permission",
                    data: JSON.stringify(data),
                    type: "PUT",
                    contentType: "application/json; charset=utf-8",
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
                    url: "develop/permission/" + $table.DataTable().row($this.parents('tr')[0]).data().permToken,
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