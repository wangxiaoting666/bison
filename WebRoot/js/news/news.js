var newsListTable = function () {

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
                data.pageTitle = $("#pageTitleQuery").val();
                data.newsTypeId = $("#newsTypeNameQuery").val();
            },
            onSortColumn: function (sortColumn, sortDirection) {
                switch (sortColumn) {
                    case "newsType.newsTypeName":
                        sortColumn = "b.news_type_name";
                        break;
                    case "pageTitle":
                        sortColumn = "page_title";
                        break;
                }
                return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "news/news/getNewsListPage?newsType.moduleId=" + $("#moduleId").val() // ajax source
                },
                "columns": [
                    {data: 'pageTitle', orderable: true, searchable: true},
                    {data: 'newsType.newsTypeName', orderable: true, searchable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" newsId="' + full.newsId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                                + '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };
    //addFlag=1时为新增，2时为修改
    var addFlag = 1;
    //设置变量的input标签
    function getParamValueInput(newsParamId, newsParamValue) {
        newsParamValue = newsParamValue == undefined ? "" : newsParamValue;
        return "<input type='text' class='form-control input-medium mt5' placeholder='变量值' data-news-param-id='" + newsParamId + "' name='paramValue' value=" + newsParamValue + ">";
    }

    //获取文章所有数据函数
    function getNewsData(titleImageUrl) {
        var newsParamValueList = [];
        $("input[name=paramValue]").each(function () {
            var $this = $(this);
            newsParamValueList.push({
                newsParamId: $this.data("newsParamId"),
                paramValue: $this.val()
            })
        });
        return {
            newsTypeId: $("#newsTypeNameList").val(),
            title: $("#title").val(),
            pageTitle: $("#pageTitle").val(),
            summary: $("#summary").val(),
            keyword: $("#keyword").val(),
            author: $("#author").val(),
            link: $("#link").val(),
            content: CKEDITOR.instances.content.getData(),
            image: titleImageUrl == undefined ? "" : titleImageUrl,
            video: $("#video").val(),
            publishTime: $("#publishTime").val(),
            indexSequence: $("#indexSequence").val(),
            listSequence: $("#listSequence").val(),
            newsParamValueList: newsParamValueList
        }
    }

    function initAddBtn() {
        //添加保存按钮点击事件
        $("#addBtn").off("click").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                addNews();
            }
        });
    }

    function addNews(titleImageUrl) {
        $.ajax({
            url: "news/news",
            data: JSON.stringify(getNewsData(titleImageUrl)),
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

    function initUpdateBtn() {
        //修改保存按钮点击事件
        $("#updateBtn").off("click").on("click", function () {
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent");
                updateNews($("#oriImage").attr("src"));
            }
        });
    }

    function updateNews(titleImageUrl) {
        var news = getNewsData(titleImageUrl);
        news.newsId = $("#newsId").val();
        $.ajax({
            url: "news/news",
            data: JSON.stringify(news),
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

    var handleEvent = function () {
        CKEDITOR.replace( 'content', {
            customConfig: '../../global/scripts/ckeditor_config.js'
        });
        $("#uploadImage").fileupload({
            url: "upload/uploadNewsTitleImage",
            dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 1000000, // 1 MB
            messages: {
                acceptFileTypes: '文件类型不匹配',
                maxFileSize: '文件过大',
                minFileSize: '文件过小'
            }
        }).on("fileuploadadd", function (e, data) {
            $("#titleImageError").html("");
            $("#addBtn,#updateBtn").off("click").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    data.submit()
                }
            })
        }).on("fileuploadprocessalways", function (e, data) {
            var index = data.index,
                file = data.files[index];
            if (file.error) {
                $("#titleImageError").html(file.error)
            }
            $("#addBtn,#updateBtn").prop('disabled', !!data.files.error);
        }).on("fileuploaddone", function (e, data) {
            if (data.result.ok) {
                if (addFlag == 1) {
                    addNews(data.result.returnData.url);
                } else {
                    updateNews(data.result.returnData.url);
                }
            }
        });

        $("#addNews").on("click", function () {
            addFlag = 1;
            $("#modalTitle").html("添加文章");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $('#newsTypeNameList').select2();
            $("#dialogForm").validate({
                rules: {
                    newsTypeNameList: {required: true},
                    pageTitle: {required: true}
                }
            }).resetForm();
            $("a.fileinput-exists").click();
            $("#uploadImage").attr("name", "uploadImage");
            CKEDITOR.instances.content.setData("");
            //重新设置变量的input标签，否则再点击添加文章按钮会重复遍历input标签
            $("div.paramValue").each(function () {
                $(this).html(getParamValueInput($(this).data('newsParamId')))
            });
            $("#addBtn").show();
            $("#updateBtn").hide();
        });

        //添加变量按钮点击事件
        $("button.addParamValue").on("click", function () {
            $(this).parent("div").find("div.paramValue")
                .append(getParamValueInput($(this).data('newsParamId')))
        });
        //删除变量按钮点击事件
        $("button.delParamValue").on("click", function () {
            var $obj =$(this).parent("div").find("div.paramValue").children();
            if($obj.length>1){
                $obj.last().remove()
            }
        });

        //移除图片按钮点击事件
        $("a.fileinput-exists").on("click", function () {
            $("#titleImageError").html("");
            initAddBtn();
            initUpdateBtn();
            $("#addBtn,#updateBtn").prop('disabled', false);
        });

        initAddBtn();
        initUpdateBtn();

        $table.on("click", "a.edit", function () {
            addFlag = 2;
            $("#modalTitle").html("编辑文章");
            customGlobal.clearFormAndShowDialog("modalDialog");
            $("#dialogForm").validate({
                rules: {
                    newsTypeNameList: {required: true},
                    pageTitle: {required: true}
                }
            }).resetForm();
            $("a.fileinput-exists").click();
            $("#uploadImage").attr("name", "uploadImage");
            $("#addBtn").hide();
            $("#updateBtn").show();
            $.get("news/news/" + $(this).attr("newsId"), function (data) {
                var newsAndParam = data.returnData.newsAndParam;
                $("#newsId").val(newsAndParam.newsId);
                $("#title").val(newsAndParam.title);
                $("#pageTitle").val(newsAndParam.pageTitle);
                $("#summary").val(newsAndParam.summary);
                $("#keyword").val(newsAndParam.keyword);
                $("#author").val(newsAndParam.author);
                $("#link").val(newsAndParam.link);
                CKEDITOR.instances.content.setData(newsAndParam.content == null ? "" : newsAndParam.content);
                if (newsAndParam.image) {
                    $("#uploadImageDiv").removeClass("fileinput-new").addClass("fileinput-exists");
                    $("div.fileinput-preview").html("<img id='oriImage' src='" + newsAndParam.image + "'/>").show();
                }
                $("#video").val(newsAndParam.video);
                $("#publishTime").val(newsAndParam.publishTime);
                $("#indexSequence").val(newsAndParam.indexSequence);
                $("#listSequence").val(newsAndParam.listSequence);

                var $newsTypeNameList = $("#newsTypeNameList");
                $newsTypeNameList.find("option").removeAttr("selected");
                $newsTypeNameList.find("option[value=" + newsAndParam.newsTypeId + "]").attr("selected", "selected");
                $newsTypeNameList.select2();

                var newsParamValueMap = data.returnData.newsAndParam.newsParamValueMap;
                for (var key in newsParamValueMap) {
                    var paramList = newsParamValueMap[key];
                    var tempHtml = "";
                    for (var i in paramList) {
                        var param = paramList[i];
                        tempHtml += getParamValueInput(param.newsParamId, param.paramValue)
                    }
                    $("#paramValue" + key).find("div.paramValue").html(tempHtml);
                }
            });
        });

        $table.on("click", "a.delete", function () {
            var $this = $(this);
            //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
            $("#confirmBtn").off("click.deleteRow").on("click.deleteRow", function () {
                $.ajax({
                    url: "news/news/" + $table.DataTable().row($this.parents('tr')[0]).data().newsId,
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
        //时间控件
        $("#publishTime").datetimepicker({
            language: 'zh-CN',
            format: "yyyy-mm-dd hh:ii:ss",
            todayBtn: true,
            autoclose: true,
            todayHighlight: true
        });
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();

        }
    };
}();