var keyWordLinkListTable = function () {

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
                    case "keyWordLink":
                        sortColumn = "key_word_link";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "keyWord/keyWordLink/getKeyWordLinkListPage" // ajax source
                },
                "columns": [
                    {data: 'keyWord', orderable: true, searchable: true},
                    {data: 'keyWordLink', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" keyWordLinkId="' + full.keyWordLinkId + '" keyWord="' + full.keyWord + '"keyWordLink="' + full.keyWordLink + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {

        $("#addKeyWordLink").on("click", function () {
            $("#modalTitle").html("栏目链接关键字");
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
                    url: "keyWord/keyWordLink",
                    data: JSON.stringify({
                        keyWord: $("#keyWord").val(),
                        keyWordLink: $("#keyWordLink").val()
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
            $("#modalTitle").html("关键字链接编辑");
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
            var keyWordLinkId = $(this).attr("keyWordLinkId");
            var keyWord = $(this).attr("keyWord");
            var keyWordLink = $(this).attr("keyWordLink");
            $("#keyWordLinkId").val(keyWordLinkId);
            $("#keyWord").val(keyWord);
            $("#keyWordLink").val(keyWordLink == "null" ? "" : keyWordLink);
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    keyWordLinkId: $("#keyWordLinkId").val(),
                    keyWord: $("#keyWord").val(),
                    keyWordLink: $("#keyWordLink").val()
                };
                $.ajax({
                    url: "keyWord/keyWordLink",
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
                    url: "keyWord/keyWordLink/" + $table.DataTable().row($this.parents('tr')[0]).data().keyWordLinkId,
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