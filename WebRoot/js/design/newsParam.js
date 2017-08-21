var newsParamListTable = function () {

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
                data.description = $("#descriptionQuery").val();
                data.moduleId = $("#moduleTypeQuery").val();
                data.paramType = $("#paramTypeQuery").val();
            },
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "moduleId":
                        sortColumn = "module_id";
                        break;
                    case "paramName":
                        sortColumn = "param_name";
                        break;
                    case "description":
                        sortColumn = "description";
                        break;
                    case "paramTypeName":
                        sortColumn = "param_type";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "design/newsParam/getNewsParamListPage" // ajax source
                },
                "columns": [
                    {data: 'paramName', orderable: true, searchable: true},
                    {data: 'description', orderable: true, searchable: true},
                    {data: 'module.moduleName',orderable: true, searchable: true},
                    {data: 'paramTypeName',orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" newsParamId="' + full.newsParamId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addNewsParam").on("click", function () {
            $("#modalTitle").html("添加变量");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $('#moduleTypeList').select2();
            $("#dialogForm").validate({
                rules: {
                    paramName: {
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
                    url: "design/newsParam",
                    data:{
                        moduleId:$("#moduleTypeList").val(),
                        paramName: $("#paramName").val(),
                        description: $("#description").val(),
                        paramType: $("#addParamType").val()
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
                    description: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").hide();
            $("#updateBtn").show();
            $.get("design/newsParam/" + $(this).attr("newsParamId"), function (data) {
                var newsParam = data.returnData.newsParam;
                $("#newsParamId").val(newsParam.newsParamId);
                $("#paramName").val(newsParam.paramName);
                $("#description").val(newsParam.description);
                $("#addParamType").val(newsParam.paramType);
                var $moduleTypeList = $("#moduleTypeList");
                $moduleTypeList.find("option").removeAttr("selected");
                $moduleTypeList.find("option[value="+newsParam.moduleId+"]").attr("selected","selected")
                $moduleTypeList.select2();
            });
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    newsParamId: $("#newsParamId").val(),
                    moduleId: $("#moduleTypeList").val(),
                    paramName: $("#paramName").val(),
                    description: $("#description").val(),
                    paramType: $("#addParamType").val()
                };
                $.ajax({
                    url: "design/newsParam",
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
                    url: "design/newsParam/" + $table.DataTable().row($this.parents('tr')[0]).data().newsParamId,
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