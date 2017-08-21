var ringListTable = function () {

    var dataTable;
    var dataTables;
    var dataTabledel;
    var dataTablefind;
    var zTreeObj;
    var zTreeck;
    var $table = $("#dataTable");
    var $table1 = $("#dataTables");
    var $table2 = $("#dataTabledel");
    var $table3 = $("dataTablefind");
    var flag=0;
    var cs="";
    var zNodes;
    $("body").find("a").attr("userId");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery:function(data){
                data.department=$("#department").val();
                data.position=$("#position").val();
                data.empID=$("#empID").val();
                data.username=$("#username").val();
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "accounts/getAccountListPage" // ajax source
                },
                "columns": [
                    {data: 'id', orderable: false,
                        render: function (data, type, full) {
                            return "<input type='checkbox' value='"+full.empID+"'/>";
                        }},
                    {data: 'empID', orderable: true,searchable:true},
                    {data: 'username', orderable: true,searchable:true},
                    {data: 'password', orderable: true,searchable:true},
                    {data: 'department', orderable: true,searchable:true},
                    {data: 'position', orderable: true,searchable:true},
                    {data: 'status', orderable: true,searchable:true},
                    {data: 'createTime', orderable: true,searchable:true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return '<a class="edit btn default btn-xs purple" Id="' + full.empID + '"><i class="fa fa-edit"></i>查看</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };






    var handDialogRecords=function(){
        dataTables = new Datatable();
        dataTables.init({
            src: $table1,
            dataTable: {
                "ajax": {
                    "url": basePath + "accounts/getBindingPerListPage" // ajax source
                },
                "columns": [
                    {data: 'ID', orderable: false,
                        render: function (data, type, full) {
                            return '<input type="checkbox" name="checkbox" value="'+full.userId+'"/>';
                        }},
                    {data: 'userId', orderable: true,searchable:true},
                    {data: 'userName', orderable: true,searchable:true},
                    {data: 'dangerArea', orderable: true,searchable:true},
                    {data: 'alertArea', orderable: true,searchable:true},
                    {data: 'userRole', orderable: true,searchable:true},
                    {data: 'userTag', orderable: true,searchable:true}
                ]
            }
        });
    }

    var handbdperRecords=function(){
        dataTabledel = new Datatable();
        dataTabledel.init({
            src: $table2,
            onQuery:function(data){

                //data.ids= fun();


            },
            dataTable: {
                "ajax": {
                    "url": basePath + "accounts/getBindingPerdelListPage" // ajax source
                },
                "columns": [
                    {
                        data: 'monitId', orderable: false,
                        render: function (data, type, full) {
                            return '<input type="checkbox" name="checkbox" value="' + full.monitId + '"/>';
                        }
                    },
                    {data: 'userId', orderable: true, searchable: true},
                    {data: 'userName', orderable: true, searchable: true},
                    {data: 'dangerArea', orderable: true, searchable: true},
                    {data: 'alertArea', orderable: true, searchable: true},
                    {data: 'userRole', orderable: true, searchable: true},
                    {data: 'userTag', orderable: true, searchable: true}
                ]
            }
        });
    }


    var handfindRecords=function(){
        dataTablefind = new Datatable();
        dataTablefind.init({
            src: $table3,
            onQuery:function(data){
                //data.ids= fun();
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "accounts/getBindingPerdelListPage" // ajax source
                },
                "columns": [
                    {
                        data: 'monitId', orderable: false,
                        render: function (data, type, full) {
                            return '<input type="checkbox" name="checkbox" value="' + full.monitId + '"/>';
                        }
                    },
                    {data: 'userId', orderable: true, searchable: true},
                    {data: 'userName', orderable: true, searchable: true},
                    {data: 'dangerArea', orderable: true, searchable: true},
                    {data: 'alertArea', orderable: true, searchable: true},
                    {data: 'userRole', orderable: true, searchable: true},
                    {data: 'userTag', orderable: true, searchable: true}
                ]
            }
        });
    }




    var handleEvent = function(){
        $("#createAccount").on("click",function(){
            $("#modalTitle").html("创建账户");
            customGlobal.clearFormAndShowDialog("modalDialog");
            //zTreeInit();
            $("#dialogForm").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
        });


        $("#findaccount").on("click",function(){
            if ($("#dialogFormClose").validate().form()) {
                customGlobal.blockUI("#modalContentClose");
                dataTable.reloadTable();

            }
        });

        $("#reset").on("click",function(){
            department.value="";
            position.value="";
            empID.value="";
            username.value="";
        });


        $("#permissionSet").on("click",function(){
            $("#modalTitlePer").html("设置权限");
            var str = fun();
            if(str == null || str ==""){
            	alert("请选择一个用户！");
            	return;
            }
            customGlobal.clearFormAndShowDialog("modalDialogPer");
            $.ajax({
            	url:"accounts/getNode",
            	type:"post",
            	data:{
            		id:fun()
            	},
            	datatype:"json",
            	success:function(data){
            		zTreeInit(data.returnData.permTokenTree);
            	}
            });
            
            //zTreeInit();
            $("#dialogFormPer").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
        });

        $("#permissionBtn").on("click",function(){

            customGlobal.blockUI("#modalContentPer");
            $.ajax({
                url: "accounts/updateAccountPer",
                data: JSON.stringify({
                    ids:funRname(),
                    permTokenList:getPermTokens()
                }),
                contentType: "application/json; charset=utf-8",
                type: "post",
                success: function (data) {
                    if (customGlobal.ajaxCallback(data)) {
                        $("#modalDialogPer").modal("hide");
                        dataTable.reloadTable();
                    }
                }
            });

        });

        $("#resetPass").on("click",function(){
            $("#modalTitlePass").html("重置密码");
            customGlobal.clearFormAndShowDialog("modalDialogPass");
            zTableInit();
            $("#dialogFormPass").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
        });

        $("#permissionPassBtn").on("click",function(){
            if ($("#dialogFormPass").validate().form()) {
                customGlobal.blockUI("modalContentPass");
                if(fun()) {
                    $.ajax({
                        url: "accounts/updateAcscountpassword",
                        data:{
                            ids:fun()
                        } ,
                        datatype: "json",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialogPass").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
                else{
                    alert("请选择账户!");
                }
            }
        });

        $("#closeAccount").on("click",function(){
            $("#modalTitleClose").html("封禁账号");
            customGlobal.clearFormAndShowDialog("modalDialogClose");
            zTableInit();
            $("#dialogFormClose").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
        });

        $("#permissionCloseBtn").on("click",function(){
            if ($("#dialogFormClose").validate().form()) {
                customGlobal.blockUI("#modalContentClose");
                if(fun()) {
                    $.ajax({
                        url: "accounts/updateAcscountstatusstop",
                        data:{
                            ids:fun()
                        } ,
                        datatype: "json",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialogClose").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                } else{
                    alert("请选择账户!");
                }
            }
        });

        $("#del").on("click",function(){
            $("#modalTitlecut").html("删除账号");
            customGlobal.clearFormAndShowDialog("modalDialogcut");
            zTreeInit();
            $("#dialogFormcut").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
        });

        $("#permissioncut").on("click",function(){
            if ($("#dialogFormcut").validate().form()) {
                customGlobal.blockUI("#modalContentcut");
                if(fun()) {
                    $.ajax({
                        url: "accounts/deleteAccountList",
                        data: {
                            ids: fun()
                        },
                        datatype: "json",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialogcut").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
                else{
                    alert("请选择账户!");
                }
            }
        });



        $("#openAccount").on("click",function(){
            $("#modalTitleOpen").html("解禁账号");
            customGlobal.clearFormAndShowDialog("modalDialogOpen");
            zTreeInit();
            $("#dialogFormOpen").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
        });

        $("#permissionOpenBtn").on("click",function(){
            if ($("#dialogFormOpen").validate().form()) {
                customGlobal.blockUI("#modalContentOpen");
                if(fun()) {
                    $.ajax({
                        url: "accounts/updateAcscountstatusstart",
                        data: {
                            ids: fun()
                        },
                        datatype: "json",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialogOpen").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
                else{
                    alert("请选择账户!");
                }
            }
        });



        $("#addAccountBD").on("click",function(){
            $("#modalTitleAdd").html("添加监控对象");

            customGlobal.clearFormAndShowDialog("modalDialogAdd");
            dataTables.reloadTable();

            $("#passwordHelpBlock").html("");
        });


        $("#delAccount").on("click",function(){
            $("#modalTitledel").html("删除监控对象");
            customGlobal.clearFormAndShowDialog("modalDialogdel");
            dataTabledel.reloadTable();
            $("#passwordHelpBlock").html("");
        });


        $table.on("click","a.edit",function(){
            //$("#modalTitlefind").html("查看");
            //customGlobal.clearFormAndShowDialog("modalDialogfind");
            //dataTablefind.reloadTable();

            $("#modalTitledel").html("查看监控对象");
            customGlobal.clearFormAndShowDialog("modalDialogdel");
            dataTabledel.reloadTable();
            cs=$(this).attr("userId")
            flag=1;
            $("#passwordHelpBlock").html("");
        });
        $("#permissionAdd").on("click",function(){
            customGlobal.blockUI("modalContentAdd");
            if (fun()) {
                if(f()){
                    $.ajax({
                        url: "accounts/AddmonitorobjectPer",
                        data: {
                            ids: fun(),
                            bdpers: f()
                        },
                        datatype: "json",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialogAdd").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
                else{
                    alert("请选择监控对象!");
                }
            }
            else{
                alert("请选择账户!");
            }

        });
        $("#permissiondel").on("click",function(){
            customGlobal.blockUI("modalContentdel");
            if (p()) {
                $.ajax({
                    url: "accounts/monitorobjectPerdel",
                    data: {
                        ids: p()
                    },
                    datatype: "json",
                    type: "post",
                    success: function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialogdel").modal("hide");
                            dataTable.reloadTable();
                        }
                    }
                });
            }else{
                alter("至少选择一条！");
            }


        });

        $("#user").on("click",function(){
            $("#userContent").css("display","block");
            $("#assetContent").css("display","none");
        });

        $("#asset").on("click",function(){
            $("#userContent").css("display","none");
            $("#assetContent").css("display","block");
        });


        function getPermTokens (){
            var nodes = zTreeObj.getCheckedNodes();
            //去掉重复的permToken
            var permTokenObj = {};
            for (var node in nodes) {
                if (nodes[node].permToken!="") {
                    permTokenObj[nodes[node].permToken] = nodes[node].permToken;
                }
            }
            var permTokens = [];
            for (node in permTokenObj) {
                permTokens.push(permTokenObj[node]);
            }
            return permTokens;
        }


        function getPermTokensch (){
            var nodes = zTreeck.getCheckedNodes();
            //去掉重复的permToken
            var permTokenObj = {};
            for (var node in nodes) {
                if (nodes[node].permToken!="") {
                    permTokenObj[nodes[node].permToken] = nodes[node].permToken;
                }
            }
            var permTokens = [];
            for (node in permTokenObj) {
                permTokens.push(permTokenObj[node]);
            }
            return permTokens;
        }

        $("#addBtn").on("click",function(){
            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent1");
                $.ajax({
                    url: "accounts/addAccount",
                    data:{
                        empID: $("#empIDs").val(),
                        username: $("#usernames").val(),
                        password: $("#passwords").val().md5(),
                        department: $("#departments").val(),
                        position: $("#positions").val()
                    },
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


        $table.on("click",function(){
            var $this = $(this);
            //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
            $("#confirmBtn").off("click.deleteRow").on("click.deleteRow",function(){
                $.ajax({
                    url: "",
                    dataType: "json",
                    type: "",
                    success: function (data) {
                        $("#confirmDialog").modal("hide");
                        if (customGlobal.ajaxCallback(data)) {

                        }
                    }
                })
            })
        });
    };

    function fun(){
        var  objs = $("#dataTable input[type=checkbox]:checked");
        var check_val = "";
        $.each(objs,function(index,obj){
            check_val +="'"+ objs[index].defaultValue+"'"+",";
        });
        return check_val;
    }

    function funRname(){
        var  objs = $("#dataTable input[type=checkbox]:checked");
        var check_val = "";
        for(var i=0;i<objs.length;i++){
            check_val +="'"+ objs[i].parentNode.parentNode.parentNode.nextSibling.textContent+"'"+",";
        }
        //$.each(objs,function(index,obj){
        //    check_val +="'"+ obj.parent().parent().parent().next().html()+"'"+",";
        //});
        return check_val;
    }

    function f(){
        var  objs = $("#dataTables input[type=checkbox]:checked");
        var check_val = "";
        $.each(objs,function(index,obj){
            check_val +="'"+ objs[index].defaultValue+"'"+",";
        });
        return check_val;
    }

    function p(){
        var  objs = $("#dataTabledel input[type=checkbox]:checked");
        var check_val = "";
        $.each(objs,function(index,obj){
            check_val += objs[index].defaultValue+",";
        });
        return check_val;
    }

    var zTableInit = function (nodes){
        nodes = nodes == undefined ? zNodes : nodes;
        zTreeck = $.fn.zTree.init($("#checkAllAccount"), {
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
        }, nodes);
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
            handDialogRecords();
            handbdperRecords();

            zNodes = zTreeNodes;
        }
    };
}();