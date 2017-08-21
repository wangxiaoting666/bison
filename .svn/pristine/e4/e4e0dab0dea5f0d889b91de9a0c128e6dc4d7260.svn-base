
var moduleListTable = function () {

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
                data.moduleName = $("#moduleNameQuery").val();
                data.alias = $("#moduleAliasQuery").val();
            },
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "moduleName":
                        sortColumn = "module_name";
                        break;
                    case "alias":
                        sortColumn = "alias";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "module/module/getModuleListPage" // ajax source
                },
                "columns": [
                    {data: 'moduleName', orderable: true, searchable: true},
                    {data: 'alias', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" moduleId="' + full.moduleId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addModule").on("click", function () {
            $("#modalTitle").html("栏目添加");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $('#indexTemplateList').select2();
            $('#listTemplateList').select2();
            $('#contentTemplateList').select2();
            $("#dialogForm").validate({
                rules: {
                    moduleName: {
                        required: true
                    },
                    alias: {
                        required: true
                    },
                    modulePageSize: {
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
                    url: "module/module",
                    data: JSON.stringify({
                        moduleName: $("#moduleName").val(),
                        alias: $("#alias").val(),
                        modulePageSize: $("#modulePageSize").val(),
                        indexTemplateId: $("#indexTemplateList").val(),
                        listTemplateId: $("#listTemplateList").val(),
                        contentTemplateId: $("#contentTemplateList").val()
                    }),
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
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
                    moduleName: {
                        required: true
                    },
                    alias: {
                        required: true
                    },
                    modulePageSize: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").hide();
            $("#updateBtn").show();
            $.get("module/module/" + $(this).attr("moduleId"), function (data) {
                var module = data.returnData.module;
                $("#moduleId").val(module.moduleId);
                $("#companyId").val(module.companyId);
                $("#moduleName").val(module.moduleName);
                $("#alias").val(module.alias);
                $("#modulePageSize").val(module.modulePageSize);
                var $indexTemplateList = $("#indexTemplateList");
                $indexTemplateList.find("option").removeAttr("selected");
                $indexTemplateList.find("option[value=" + module.indexTemplateId + "]").attr("selected", "selected")
                $indexTemplateList.select2();
                var $listTemplateList = $("#listTemplateList");
                $listTemplateList.find("option").removeAttr("selected");
                $listTemplateList.find("option[value=" + module.listTemplateId + "]").attr("selected", "selected")
                $listTemplateList.select2();
                var $contentTemplateList = $("#contentTemplateList");
                $contentTemplateList.find("option").removeAttr("selected");
                $contentTemplateList.find("option[value=" + module.contentTemplateId + "]").attr("selected", "selected")
                $contentTemplateList.select2();
            });
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    moduleId: $("#moduleId").val(),
                    companyId: $("#companyId").val(),
                    moduleName: $("#moduleName").val(),
                    alias: $("#alias").val(),
                    modulePageSize: $("#modulePageSize").val(),
                    indexTemplateId: $("#indexTemplateList").val(),
                    listTemplateId: $("#listTemplateList").val(),
                    contentTemplateId: $("#contentTemplateList").val()
                };
                $.ajax({
                    url: "module/module",
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
                    url: "module/module/" + $table.DataTable().row($this.parents('tr')[0]).data().moduleId,
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