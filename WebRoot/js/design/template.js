var templateListTable = function () {

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
                data.templateName = $("#templateNameQuery").val();
                data.templateType = $("#templateTypeQuery").val();
            },
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "templateName":
                        sortColumn = "template_name";
                        break;
                    case "templateTypeName":
                        sortColumn = "template_type";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "design/template/getTemplateListPage" // ajax source
                },
                "columns": [
                    {data: 'templateName', orderable: true, searchable: true},
                    {data: 'templateTypeName', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" templateId="' + full.templateId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addTemplate").on("click", function () {
            $("#modalTitle").html("添加模板");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    templateName: {
                        required: true
                    },
                    templateType: {
                        required: true
                    },
                    templateAlias: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").show();
            $("#updateBtn").hide();
        });

        $("#uploadZip").on("click", function () {
            customGlobal.clearFormAndShowDialog("uploadTemplateDialog");
        });

        $("#uploadTemplate").fileupload({
            url: "upload/uploadTemplateZip",
            dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(zip)$/i,
            messages:{
                acceptFileTypes: '文件类型不匹配',
                maxFileSize: '文件过大',
                minFileSize: '文件过小'
            }
        }).on("fileuploadadd",function(e,data){
            $("#titleImageError").html("");
            $("#uploadTemplateBtn").off("click").on("click", function () {
                data.submit()
            })
        }).on("fileuploadprocessalways",function(e,data) {
            var index = data.index,
                file = data.files[index];
            if (file.error) {
                $("#titleImageError").html(file.error)
            }
            $("#uploadTemplateBtn").prop('disabled', !!data.files.error);
        }).on("fileuploaddone",function(e,data){
            if (customGlobal.ajaxCallback(data.result)) {
                $("#uploadTemplateDialog").modal("hide");
            }
        });

        $("#addBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                $.ajax({
                    url: "design/template",
                    data: JSON.stringify({
                        templateName: $("#templateName").val(),
                        templateType: $("#templateType").val(),
                        templateAlias: $("#templateAlias").val(),
                        content: $("#content").val()
                    }),
                    contentType: "application/json; charset=utf-8",
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
            $("#modalTitle").html("编辑模板");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    templateName: {
                        required: true
                    },
                    templateType: {
                        required: true
                    },
                    templateAlias: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").hide();
            $("#updateBtn").show();
            $.get("design/template/" + $(this).attr("templateId"), function (data) {
                var template = data.returnData.template;
                $("#templateId").val(template.templateId);
                $("#templateType").val(template.templateType);
                $("#templateName").val(template.templateName);
                $("#templateAlias").val(template.templateAlias);
                $("#content").val(template.content)
            });
        });

        $("#updateBtn").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    templateId: $("#templateId").val(),
                    templateName: $("#templateName").val(),
                    templateType: $("#templateType").val(),
                    templateAlias: $("#templateAlias").val(),
                    content: $("#content").val()
                };
                $.ajax({
                    url: "design/template",
                    data: JSON.stringify(data),
                    type: "put",
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
                    url: "design/template/" + $table.DataTable().row($this.parents('tr')[0]).data().templateId,
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