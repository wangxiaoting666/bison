var keyWordShieldListTable = function () {

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
                    case "keyWord":
                        sortColumn = "key_word";
                        break;
                    case "replaceWord":
                        sortColumn = "replace_word";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "keyWord/keyWordShield/getKeyWordShieldListPage" // ajax source
                },
                "columns": [
                    {data: 'keyWord', orderable: true, searchable: true},
                    {data: 'replaceWord', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" keyWordShieldId="' + full.keyWordShieldId + '" keyWord="' + full.keyWord + '"replaceWord="' + full.replaceWord + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };


    var handleEvent = function () {
        $("#addKeyWordShield").on("click", function () {
            $("#modalTitle").html("栏目屏蔽关键字");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    keyWord: {
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
                $.ajax({
                    url: "keyWord/keyWordShield",
                    data: JSON.stringify({
                        keyWord: $("#keyWord").val(),
                        replaceWord: $("#replaceWord").val()
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
            $("#modalTitle").html("关键字屏蔽编辑");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    keyWord: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").hide();
            $("#updateBtn").show();
            var keyWordShieldId = $(this).attr("keyWordShieldId");
            var keyWord = $(this).attr("keyWord");
            var replaceWord = $(this).attr("replaceWord");
            $("#keyWordShieldId").val(keyWordShieldId);
            $("#keyWord").val(keyWord);
            $("#replaceWord").val(replaceWord == "null" ? "" : replaceWord);
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    keyWordShieldId: $("#keyWordShieldId").val(),
                    keyWord: $("#keyWord").val(),
                    replaceWord: $("#replaceWord").val()
                };
                $.ajax({
                    url: "keyWord/keyWordShield",
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
                    url: "keyWord/keyWordShield/" + $table.DataTable().row($this.parents('tr')[0]).data().keyWordShieldId,
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