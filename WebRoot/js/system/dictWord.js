var dictWordListTable = function () {

    var dataTable;
    var $table = $("#dataTable");

    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "description":
                        sortColumn = "description";
                        break;
                    case "dictName":
                        sortColumn = "dict_name";
                        break;
                    case "dictCode":
                        sortColumn = "dict_code";
                        break;
                    case "dictValue":
                        sortColumn = "dict_value";
                        break;
                    case "stateName":
                        sortColumn = "state";
                        break;
                    case "sequence":
                        sortColumn = "sequence";
                        break;
                    case "systemOrNotName":
                        sortColumn = "systemornot";
                        break;

                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "system/dict/getDictListPage" // ajax source
                },
                "columns": [
                    {data: 'description', orderable: true, searchable: true},
                    {data: 'dictName', orderable: true, searchable: true},
                    {data: 'dictCode', orderable: true, searchable: true},
                    {data: 'dictValue', orderable: true, searchable: true},
                    {data: 'sequence', orderable: true, searchable: true},
                    {data: 'systemOrNotName', orderable: true, searchable: true},
                    {data: 'stateName', orderable: true, searchable: true},
                    {
                        data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            if(full.systemOrNot=="1"){
                                return " ";
                            }
                            return '<a class="edit btn default btn-xs purple" dictId="' + full.dictId + '" ><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {

        $("#addDict").on("click", function () {
            $("#modalTitle").html("添加字典值");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    dictName: {
                        required: true
                    },
                    dictCode: {
                        required: true
                    },
                    dictValue: {
                        required: true
                    }
                }
            }).resetForm();
            $("#updateBtn").hide();
            $("#addBtn").show();
        });

        $("#addBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    dictName: $("#dictName").val(),
                    dictCode: $("#dictCode").val(),
                    dictValue: $("#dictValue").val(),
                    state: $("#state").val(),
                    systemOrNot: $("#systemOrNot").val(),
                    sequence: $("#sequence").val()
                };
                $.ajax({
                    url: "system/dict",
                    data: (data),
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

        $("#dataTableReload").on("click",function(){
            dataTable.reloadTable();
        });


        $table.on("click", "a.edit", function () {
            $("#modalTitle").html("编辑字典值");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#addBtn").hide();
            $("#updateBtn").show();
            $.get("system/dict/" + $(this).attr("dictId"), function (data) {
                var dict = data.returnData.dict;
                $("#dictId").val(Constant.dictId);
                $("#dictName").val(Constant.dictName);
                $("#dictCode").val(Constant.dictCode);
                $("#dictValue").val(Constant.dictValue);
                $("#state").val(Constant.state);
                $("#sequence").val(Constant.sequence);
                $("#systemOrNot").val(Constant.systemOrNot);
            });
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    dictId: $("#dictId").val(),
                    dictName: $("#dictName").val(),
                    dictCode: $("#dictCode").val(),
                    dictValue: $("#dictValue").val(),
                    state: $("#state").val(),
                    systemOrNot: $("#systemOrNot").val(),
                    sequence: $("#sequence").val()
                };
                $.ajax({
                    url: "system/dict",
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
                    url: "system/dict/" + $table.DataTable().row($this.parents('tr')[0]).data().dictId,
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