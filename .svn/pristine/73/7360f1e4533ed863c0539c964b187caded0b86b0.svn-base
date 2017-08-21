var applicationTable = function () {
    //预命名
    //var defaultOptions = CONSTANT.DATA_TABLES.DEFAULT_OPTION;
    //var ellipsis = CONSTANT.DATA_TABLES.RENDER.ELLIPSIS;
    /**
     *
     * General
     *
     */
    var pagePath = "applicationManage/";
    var dic = {
        field: {
            "version": "应用版本",
            "uploadDate": "上传时间",
            "description": "版本描述"
        }
    };
    var url = {
        list: basePath + pagePath + "getApplicationListPage",
        add: basePath + pagePath + "insert",
        edit: basePath + pagePath + "edit",
        del: basePath + pagePath + ""
    };
    var fileInfo = function (input, index) {
        if (input.fileinput('getFileStack')[index] == undefined)return null;
        var info = input.fileinput('getFileStack')[index];
        var fname = info.name;
        var temp = fname.split('.');
        var type = temp.pop();
        var name = temp.join('.');
        var size = info.size;
        var lastModify = info.lastModified;
        var lastModifiedDate = info.lastModifiedDate;
        return {info: info, fname: fname, type: type, name: name, size: size, lm: lastModify, lmd: lastModifiedDate}
    };


    /**
     *
     * Object & global variable
     *
     */
    /** Table object **/
    var $table = $("#dataTable");
    var $tbody = $("tbody", $table);
    var _table = {};
    /** Window object **/
    var $uploadWin = $("#uploadWin");
    var $editWin = $("#editWin");
    /** Form object **/
    var $editForm = $('form', $editWin);
    var $uploadForm = $('form', $uploadWin);
    /** Button object **/

    /** Control object **/
    var uf = {
        ver: $('input[name="version"]', $uploadWin),
        desc: $('textarea', $uploadWin),
        info: $('div.well', $uploadWin),
        file: $('input[type="file"]', $uploadWin)
    };
    var ef = {
        ver: $('input[name="version"]', $editWin),
        desc: $('textarea', $editWin),
        submit: $('button.submit', $editWin)
    };


    /**
     *
     * config
     *
     **/

    /**dataTableConfig**/
    var dataTableConfig = {
        "paging": true,
        "serverSide": false,
        "ajax": {
            "url": url.list, // ajax source
            "timeout": 2000,
            "data": ""
        },
        "columns": [
            {data: 'version', orderable: false, searchable: false},
            {
                data: 'uploadDate',
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return tolocalTime(data);
                }
            },
            {data: 'description', orderable: false, searchable: false},
            {
                data: 'operate',
                orderable: false,
                render: function (data, type, row) {
                    return '<a class="edit btn default btn-xs purple"><i class="fa fa-edit"></i>编辑</a>&nbsp;' +
                        '<a class="delete btn default btn-xs black" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>&nbsp;';
                }
            }
        ]
    };

    /**uploadInputConfig**/
    var uploadInputConfig = {
        uploadUrl: url.add,
        language: 'zh',
        showBrowse: true,
        showPreview: false,
        uploadAsync: false,
        minFileCount: 1,
        maxFileCount: 1,
        maxFilePreviewSize: 102400,
        elErrorContainer: "#errorBlock",
        allowedFileExtensions: ["zip", "rar", "gz", "tgz"],
        initialCaption: "请选择上传应用",
        uploadExtraData: function (previewId, index) {
            return {
                "version": uf.ver.val(), "description": uf.desc.val(),
                "fileName": fileInfo(uf.file, 0).fname,
                "uploadDate": new Date()
            };
        }
    };
    uf.file.fileinput(uploadInputConfig);

    /**blockUIConfig**/
    var blockUIConfig = {
        message: '<h1>请稍后...</h1>',
        overlayCSS: {
            backgroundColor: '#0f0f0f',
            opacity: '0'
        }
    };
    var block = function (target, config) {
        target.block(config || blockUIConfig);
    };

    /**initConfig**/
    var initConfig = {
        src: $table,
        onQuery: function (data) {
        },
        onSortColumn: function (sortColumn, sortDirection) {
            return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
        },
        dataTable: dataTableConfig
    };
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init(initConfig);
        _table = dataTable.getDataTable();
    };

    /**
     *
     * Method
     *
     */

    /** FileInfo show **/
    var fileInfoShow = function () {
        var info = fileInfo(uf.file, 0);
        if (info) {
            uf.info.html("");
            uf.info.append('<label>文件名：</label><i>' + info.name + '</i><br>');
            info.type && uf.info.append('<label>文件类型：</label><i>' + info.type + '</i><br>');
            var size = (info.size / 1024) > 1024 ? (info.size / 1024 / 1024).toFixed(2) + 'MB' : (info.size / 1024).toFixed(2) + 'kB'
            uf.info.append('<label>文件大小：</label><i>' + size + '</i><br>');
            info.lastModified && uf.info.append('<label>上次修改时间：</label><i>' + info.lastModified.toLocaleString() + '</i>');
            uf.info.parent().show();
        } else {
            uf.info.parent().hide();
        }

    };
    /** FileInput lock **/
    var fileInputLock = function (event, filestack, extraData) {
        block($('.form-body', $uploadWin))
    };

    // /** FileInput unlock **/
    // var fileInputUnlock = function (event, filestack, extraData) {
    //     $('.form-body', $uploadWin).unblock();
    // };

    /** FileInput upload conplete **/
    var fileUploadComplete = function () {
        $('.form-body', $uploadWin).unblock();
        toast.success("上传成功！");
        customGlobal.clearFormAndShowDialog("uploadWin");
        _table.ajax.reload();
    };
    /** FileInput upload error **/
    var fileUploadError = function () {
        $('.form-body', $uploadWin).unblock();
        toast.error("上传失败！");
    };
    /** FileInput upload cancel **/
    var fileUploadCancel = function () {
        $('.form-body', $uploadWin).unblock();
        toast.info("上传取消！");
    };


    /** Display upload window **/
    var uploadShow = function () {
        $(".modal-title", $uploadWin).html("上传应用");
        customGlobal.clearFormAndShowDialog("uploadWin");
        uf.file.fileinput('clear');
        uf.info.parent().hide();
    };

    /** Display edit window **/
    var editShow = function () {
        $(".modal-title", $editWin).html("编辑应用包");
        customGlobal.clearFormAndShowDialog("editWin");
        var item = _table.row($(this).closest('tr')).data();
        ef.ver.val(item.version);
        ef.desc.val(item.description);
    };


    /** Confirm delete **/
    var submitDelete = function () {
        var item = _table.row($(this).closest('tr')).data();
        //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
        $("#confirmBtn").off("click.deleteRow").on("click.deleteRow", function () {
            $.ajax({
                url: url.del + item.id,
                dataType: "json",
                // data: JSON.stringify({userid: item.userid}),
                type: "DELETE",
                success: function (data) {
                    $("#confirmDialog").modal("hide");
                    if (customGlobal.ajaxCallback(data)) {
                        _table.ajax.reload();
                    }
                }
            })
        })
    };

    /** Submit edit **/
    var submitEdit = function () {
        block($editForm);
        var data = $editForm.serializeObject();
        $.ajax({
            url: url.edit,
            data: data,
            type: "POST",
            //contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (customGlobal.ajaxCallback(data)) {
                    $editForm.unblock();
                    $editWin.modal("hide");
                    _table.ajax.reload();
                }
            },
            error: function (data) {
                $editForm.unblock();
                toast.error("连接失败！");
                return false;
            }
        });
    };


    /**
     *
     * Event
     *
     */

    var handleEvent = function () {
        //文件有所改变
        uf.file.on('change', fileInfoShow);
        //文件上传控件锁定
        uf.file.on('filelock', fileInputLock);
        //文件上传空间取消锁定
        // uf.file.on('fileuploaded', fileInputUnlock);
        // uf.file.on('fileuploaderror', fileInputUnlock);
        //uf.file.on('fileunlock', fileInputUnlock);
        //文件上传成功重新获取数据
        uf.file.on('filebatchuploadsuccess', fileUploadComplete);
        //文件上传失败
        uf.file.on('filebatchuploaderror', fileUploadError);
        //文件上传取消
        //uf.file.on('filebatchuploadsuccess', fileUploadCancle);
        //显示上传窗口
        $("#uploadShow").click(uploadShow);
        //显示编辑窗口
        $tbody.on("click", "a.edit", editShow);
        //显示删除窗口&删除应用
        $tbody.on("click", "a.delete", submitDelete);
        //确认编辑
        ef.submit.click(submitEdit);
        //确认上传（控件接管）
    };


    /**
     *
     * function
     *
     */

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    }
};