var typeListTable = function () {

    var dataTable;
    var $table = $("#dataTable");
    var zNodes;
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();

        dataTable.init({
            src: $table,
            onQuery:function(data){
                data.newsTypeName=$("#typeNameQuery").val();
                data.sequence=$("#order").val();
                data.state=$("#state").val();
            },
            onSortColumn:function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "newsTypeName":
                        sortColumn = "news_type_name";
                        break;
                    case "sequence":
                        sortColumn = "sequence";
                        break;
                    case "stateName":
                        sortColumn = "state";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },

            dataTable: {
                "ajax": {
                    "url": basePath + "news/newsType/getTypeListPage?moduleId="+$("#moduleId").val() // ajax source
                },
                "columns": [
                    {data: 'newsTypeName', orderable: true,searchable:true},
                    {data: 'sequence', orderable: true,searchable:true},
                    {data: 'stateName', orderable: true,searchable:true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" newTypeId="' + full.newsTypeId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function(){
        $("#addNewsType").on("click",function(){
            $("#modalTitle").html("添加分类");
            customGlobal.clearFormAndShowDialog("modalDialog");
                $("#dialogForm").validate({
                rules: {
                    newsTypeName: {
                        required: true
                    }
                }
            }).resetForm();
            $("#addBtn").show();
            $("#updateBtn").hide();
        });

        $("#addBtn").on("click",function(){
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                $.ajax({
                    url: "news/newsType",
                    data: JSON.stringify({
                        moduleId: $("#moduleId").val(),
                        newsTypeName: $("#typeName").val(),
                        sequence: $("#addOrder").val(),
                        state: $("#addState").val()
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
            $("#modalTitle").html("编辑分类");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    newsTypeId: {
                        required: true
                    }
                }
            }).resetForm();

            $("#addBtn").hide();
            $("#updateBtn").show();

            $.get("news/newsType/"+$(this).attr("newTypeId"),function(data){
                var type = data.returnData.types;
                $("#typeId").val(type.newsTypeId);
                $("#typeNum").val(type.moduleId);
                $("#typeName").val(type.newsTypeName);
                $("#addOrder").val(type.sequence);
                $("#addState").val(type.state);
                $("#passwordHelpBlock").html("");

            });

        });

        $("#updateBtn").on("click",function(){
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    newsTypeId: $("#typeId").val(),
                    moduleId: $("#moduleId").val(),
                    newsTypeName: $("#typeName").val(),
                    sequence: $("#addOrder").val(),
                    state: $("#addState").val()
                };

                $.ajax({
                    url: "news/newsType",
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
                    url: "news/newsType/" + $table.DataTable().row($this.parents('tr')[0]).data().newsTypeId,
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
        init: function (zTreeNodes) {
            handleRecords();
            handleEvent();
            zNodes = zTreeNodes;
        }
    };
}();