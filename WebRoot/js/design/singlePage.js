var singlePageListTable = function () {

    var dataTable;
    var $table = $("#dataTable");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();

        dataTable.init({
            src: $table,
            onQuery:function(data){
                data.singlePageName=$("#singlePageNameQuery").val();
                data.title=$("#titleQuery").val();
                data.alias=$("#aliasQuery").val();
                data.templateId=$("#templateNameQuery").val();

            },
            onSortColumn:function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "templateId":
                        sortColumn = "template_id";
                        break;
                    case "singlePageName":
                        sortColumn = "single_page_name";
                        break;

                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "module/singlePage/getSinglePageListPage" // ajax source
                },
                "columns": [
                    {data: 'singlePageName', orderable: true,searchable:true},
                    {data: 'title', orderable: true,searchable:true},
                    {data: 'alias', orderable: true,searchable:true},
                    {data: 'template.templateName', orderable: true,searchable:true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" singlePageId="' + full.singlePageId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function(){
        CKEDITOR.replace( 'content', {
            customConfig: '../../global/scripts/ckeditor_config.js'
        });
        $("#addSinglePage").on("click",function(){
            $("#modalTitle").html("添加类型");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $('#templateTypeList').select2();
            $("#dialogForm").validate({
                rules: {
                   templateTypeList:{
                       required: true
                   },
                   title: {
                       required: true
                    },
                    singlePageName: {
                        required: true
                    },
                    alias: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").show();
            $("#updateBtn").hide();
            CKEDITOR.instances.content.setData("")
        });

        $("#addBtn").on("click",function(){
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                $.ajax({
                    url: "module/singlePage",
                    data: JSON.stringify({
                        templateId:$("#templateTypeList").val(),
                        singlePageName: $("#singlePageName").val(),
                        title: $("#title").val(),
                        alias: $("#alias").val(),
                        content: CKEDITOR.instances.content.getData()
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

        $table.on("click","a.edit",function(){
            $("#modalTitle").html("编辑类型");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    templateTypeList:{
                        required:true
                    },
                    title: {
                        required: true
                    },
                    singlePageName: {
                        required: true
                    },
                    alias: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").hide();
            $("#updateBtn").show();

            $.get("module/singlePage/"+$(this).attr("singlePageId"),function(data){
                var singlePage = data.returnData.singlePage;
                $("#singlePageId").val(singlePage.singlePageId),
                $("#singlePageName").val(singlePage.singlePageName),
                $("#title").val(singlePage.title),
                $("#alias").val(singlePage.alias),
                CKEDITOR.instances.content.setData(singlePage.content == null ? "" : singlePage.content);
                var $templateTypeList = $("#templateTypeList");
                $templateTypeList.find("option").removeAttr("selected");
                $templateTypeList.find("option[value="+singlePage.templateId+"]").attr("selected","selected")
                $templateTypeList.select2();
            });
        });

        $("#updateBtn").on("click",function(){
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    singlePageId: $("#singlePageId").val(),
                    templateId: $("#templateTypeList").val(),
                    singlePageName: $("#singlePageName").val(),
                    title: $("#title").val(),
                    alias: $("#alias").val(),
                    content: CKEDITOR.instances.content.getData()
                };

                $.ajax({
                    url: "module/singlePage",
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

        $table.on("click","a.delete",function(){
            var $this = $(this);
            //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
            $("#confirmBtn").off("click.deleteRow").on("click.deleteRow",function(){
                $.ajax({
                    url: "module/singlePage/" + $table.DataTable().row($this.parents('tr')[0]).data().singlePageId,
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