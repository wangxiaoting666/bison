var userListTable = function () {
        var dataTable;
        var zTreeObj;
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
                	 data.loginName=$("#loginNameQuery").val();
                     data.username=$("#usernameQuery").val();
                     data.roleName=$("#roleNameQuery").val();
                     data.organId=$("#organNameQuery").val();
                },
                onSortColumn:function (sortColumn, sortDirection) {
                    switch (sortColumn) {
                        case "loginName":
                            sortColumn = "login_name";
                            break;
                        case "username":
                            sortColumn = "username";
                            break;
                         case "roleName":
                            sortColumn = "roleName";
                            break; 
                    }
                    return customGlobal.onSortColumnDefault(sortColumn, sortDirection);
                },
                dataTable: {
                    "ajax": {
                        "url": basePath + "security/user/getUserListPage" // ajax source
                    },
                    "columns": [
                        {data: 'loginName', orderable: true,searchable:true},
                        {data: 'username', orderable: true,searchable:true},
                        {data: 'roleName', orderable: true,searchable:true},
                        {data: 'organName', orderable: true,searchable:true},
                        {data: 'operate', orderable: false,
                            render: function (data, type, full) {
                            	var str = '';
                            	if($("#pupdate").val() == "update"){
                            		str = '<a class="edit btn default btn-xs purple" userId="' + full.userId + '"><i class="fa fa-edit"></i>编辑</a>&nbsp;'
                            	}
                            	if($("#pdelete").val() == "delete"){
                            		str = str + '<a class="delete btn default btn-xs black" id="'+full.userId+'" data-target="#confirmDialog" data-toggle="modal"><i class="fa fa-times"></i>删除</a>';
                               }
                            	return str;
                            }
                        }
                    ]
                }
            });
        };

        var handleEvent = function(){
            $("#addUser").on("click",function(){
                $("#modalTitle").html("添加用户");
                customGlobal.clearFormAndShowDialog("modalDialog");
                zTreeInit();
                $('#roleNameList').select2();
                //
                $('#organNameList').select2();
                
                $("#dialogForm").validate({
                    rules: {
                        loginName: {
                            required: true
                        },
                        username:{
                            required: true
                        },
                        rePassword:{
                            equalTo:"#password"
                        }
                    }
                }).resetForm();
                $("#password").rules("add","required");
                $("#rePassword").rules("add","required");
                $("#passwordHelpBlock").html("");
                $("#addBtn").show();
                $("#updateBtn").hide();
            });

            $("#addBtn").on("click",function(){
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    $.ajax({
                        url: "security/user",
                        data: JSON.stringify({
                            loginName: $("#loginName").val(),
                            username: $("#username").val(),
                            password: $("#password").val().md5(),
                            roleName:$("#roleNameList").val(),
                            organId:$("#organNameList").val()
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
                $("#modalTitle").html("编辑用户");
                customGlobal.clearFormAndShowDialog("modalDialog");
                $("#dialogForm").validate({
                    rules: {
                        loginName: {
                            required: true
                        },
                        username:{
                            required: true
                        },
                        rePassword:{
                            equalTo:"#password"
                        }
                    }
                }).resetForm();
                $("#password").rules("remove","required");
                $("#rePassword").rules("remove","required");
                $("#addBtn").hide();
                $("#updateBtn").show();
                $.get("security/user/"+$(this).attr("userId"),function(data){
                    var user = data.returnData.user;
                    $("#userId").val(user.userId);
                    $("#loginName").val(user.loginName);
                    $("#username").val(user.username);
                    $("#passwordHelpBlock").html("不填写则不更改密码");
                    var $roleNameList = $("#roleNameList");
                    $roleNameList.find("option").removeAttr("selected");
                    var roleNameList = data.returnData.roleNameList;
                    for(var roleName in roleNameList){
                        $roleNameList.find("option[value="+roleNameList[roleName]+"]").attr("selected","selected")
                    }
                    $roleNameList.select2();
                    //部门回显
                    var $organNameList = $("#organNameList");
                    $organNameList.find("option").removeAttr("selected");
                    var organ = data.returnData.organ;
                    $organNameList.find("option[value="+organ.organId+"]").attr("selected","selected");
                    $organNameList.select2();
                    
                });
            });

            $("#updateBtn").on("click",function(){
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    var data = {
                        userId: $("#userId").val(),
                        loginName: $("#loginName").val(),
                        username: $("#username").val(),
                        roleName:$("#roleNameList").val(),
                        //
                        organId:$("#organNameList").val()
                    };
                    var $password = $("#password");
                    if ($password.val() != "") {
                        data.password = $password.val().md5();
                    }
                    $.ajax({
                        url: "security/user",
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
                        url: "security/user/" + $table.DataTable().row($this.parents('tr')[0]).data().userId,
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

        var zTreeInit = function (node){
            node = node == undefined ? zNodes : node;
            zTreeObj = $.fn.zTree.init($("#permissionTree"), {
                check: {
                    enable: true
                },
                view: {
                    showLine:false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            }, node);
        };

        return {
            init: function (zTreeNodes) {
                handleRecords();
                handleEvent();
                zNodes = zTreeNodes;
            }
        };
    }();