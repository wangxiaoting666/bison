var pageUpdate = function () {

    var handleEvent = function () {
        $("#updateIndexPage").on("click", function () {
            $.post("news/pageUpdate/updateIndexPage",function(data){
                customGlobal.ajaxCallback(data);
            })
        });
        $("#updateListPage").on("click", function () {
            $.post("news/pageUpdate/updateListPage",function(data){
                customGlobal.ajaxCallback(data);
            })
        });

        $("#updateContentPage").on("click", function () {
            $.post("news/pageUpdate/updateContentPage",function(data){
                customGlobal.ajaxCallback(data);
            })
        });

        $("#updateSinglePage").on("click", function () {
            $.post("news/pageUpdate/updateSinglePage",function(data){
                customGlobal.ajaxCallback(data);
            })
        });
        $("#moduleCopy").on("click", function () {
            $.post("news/pageUpdate/moduleCopy",function(data){
                customGlobal.ajaxCallback(data);
            })
        });
    };

    return {
        init: function () {
            handleEvent();
        }
    };
}();