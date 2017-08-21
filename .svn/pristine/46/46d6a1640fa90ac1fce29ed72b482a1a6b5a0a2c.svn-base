var singlePageContentListTable = function () {

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
            },
            onSortColumn:function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "singlePageName":
                        sortColumn = "single_page_name";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "news/singlePageContent/getSinglePageListPage" // ajax source
                },
                "columns": [
                    {data: 'singlePageName', orderable: true,searchable:true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" singlePageId="' + full.singlePageId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function(){
        $table.on("click","a.edit",function(){
            $("#modalTitle").html("编辑类型");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#updateBtn").show();
            var singlePageId = $(this).attr("singlePageId");
        $("#singlePageId").val(singlePageId);
            $.get("news/singlePageContent/"+$(this).attr("singlePageId"),function(data){
                var singlePageContent = data.returnData.singlePageContent;
                CKEDITOR.instances.content.setData(singlePageContent.content == null ? "" :singlePageContent.content);
            });
        });

        $("#updateBtn").on("click",function(){
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                var data = {
                    singlePageId: $("#singlePageId").val(),
                    content: CKEDITOR.instances.content.getData()
                };
                $.ajax({
                    url: "news/singlePageContent",
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
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();