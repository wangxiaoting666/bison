var indexTemplateListTable = function () {

    var handleEvent = function(){
        $("#updateBtn").on("click",function(){
            if ($("#dialogForm").validate().form()){
                customGlobal.blockUI("#modalContent");
                var data = {
                    indexTemplate:{
                        templateId: $("#templateNameQuery").val()
                    }
                };
                $.ajax({
                    url: "module/indexTemplate",
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
    };


    return {
        init: function () {
            handleEvent();
        }
    };
}();