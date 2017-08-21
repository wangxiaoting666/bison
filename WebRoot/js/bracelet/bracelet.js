var ringListTable = function () {
    var dataTable;
    var dataTable1;
    var zTreeObj;
    var $table = $("#dataTable");
    var $table1 = $("#dataTable1");
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
                data.braceletId=$("#braceletIds").val();
                data.mac=$("#macs").val();
                data.status=$("#statuszt").val();
                data.bindType=$("#bindType").val();
                data.bindObjmc=$("#bindObjmc").val();
            },
            dataTable: {
                "ajax": {
                    "url": basePath + "shgl/getShListPage" // ajax source
                },
                "columns": [
                    {data: 'braceletId', orderable: false,
                        render: function (data, type, full) {
                            return '<input type="checkbox" value="'+full.braceletId+'"/>';
                        }},
                    {data: 'braceletId', orderable: true,searchable:true},
                    {data: 'mac', orderable: true,searchable:true},
                    {data: 'status', orderable: true,searchable:true},
                    {data: 'bindType', orderable: true,searchable:true},
                    {data: 'bindObj', orderable: true,searchable:true},
                    {data: 'bindObjmc', orderable: true,searchable:true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                        	var mac = full.mac;
                            return '<a class="edit btn default btn-xs purple" braceletId="' + mac + '"><i class="fa fa-edit"></i>监控信息</a>&nbsp;'+
                            '<a class="edit1 edit btn default btn-xs purple" braceletId="' + mac + '"><i class="fa fa-edit"></i>历史轨迹</a>&nbsp;';
                        }
                    }
                ]
            }
        });
    };



    $("#reset").on("click",function(){
        braceletIds.value="";
        macs.value="";
        statuszt.value="";
        bindType.value="";
        bindObjmc.value="";
    });


    var handDialogRecords=function(){
        dataTable1 = new Datatable();
        dataTable1.init({
            src: $table1,
            dataTable: {
                "ajax": {
                    "url": basePath + "shgl/getBindingUserListPage" // ajax source
                },
                "columns": [
                    {data: 'userId', orderable: false,
                        render: function (data, type, full) {
                            return '<input type="checkbox" value="'+full.userId+'"/>';
                        }
                    },
                    {data: 'userId', orderable: true,searchable:true},
                    {data: 'username', orderable: true,searchable:true},
                    {data: 'userRole', orderable: true,searchable:true},
                    {data: 'userTag', orderable: true,searchable:true}

                ]
            }
        });
    }


    $("#findsh").on("click",function(){
            dataTable.reloadTable();
    });

    var handleEvent = function(){
        $("#Sh").on("click",function(){
            $("#modalTitle").html("添加手环");
            customGlobal.clearFormAndShowDialog("modalDialog");
            zTreeInit();
            $('#shList').select2();
            $("#dialogForm").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
        });



        $("#DEL").on("click",function(){
            $("#modalTitlede").html("解除绑定");
            customGlobal.clearFormAndShowDialog("modalDialogde");
            zTreeInit();
            $('#shList').select2();
            $("#dialogFormde").validate({
                rules: {
                    roleName: {
                        required: true
                    }
                }
            }).resetForm();

            $("#passwordHelpBlock").html("");
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

        $("#BD").on("click",function(){
            $("#modalTitle").html("绑定手环");

            customGlobal.clearFormAndShowDialog("modalBD");
            dataTable1.reloadTable();

            $("#passwordHelpBlock").html("");
        });
        
        $("#addBtn").on("click",function(){

            if ($("#dialogForm").validate().form()) {
                customGlobal.blockUI("#modalContent1");
                $.ajax({
                    url: "shgl/addSh",
                    data:{
                        braceletId: $("#braceletId").val(),
                        mac: $("#mac").val()
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


        $("#delBtn").on("click",function(){
            if ($("#dialogFormde").validate().form()) {
                customGlobal.blockUI("modalContentde");
                if(fun()) {
                    $.ajax({
                        url: "shgl/deleteBindingInfo",
                        data:{
                            ids:fun()
                        } ,
                        datatype: "json",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialogde").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
                else{
                    alert("请选择用户!");
                }
            }
        });

        var objHistory = $("#history");
        var objEdit = $("#edit");
        //var objBison = $("#bison");
        function embedStatus(status){
        	objHistory.css("display","none");
        	objEdit.css("display","none");
        	//objBison.css("display","none");
        	if(status == 1){
        		objHistory.css("display","block");
        	}
        	if(status == 2){
        		objEdit.css("display","block");
        	}
//        	if(status == 3){
//        		objBison.css("display","block");
//        	}
        }
        $table.on("click","a.edit",function(){
            $("#modalTitleHistory").html("查看日志");
            customGlobal.clearFormAndShowDialog("record");
            embedStatus(1);
            $.ajax({
                url: "shgl/getBraceletRz",
                data: {
                    braceletId:$(this).attr("braceletId")
                },
                type: "GET",
                success: function (data) {
//                    var history = data.returnData.History;
//                    var str = "";
//                    for(var i=0;i < history.length;i++){
//                        str +="在"+history[i].xgsj+"  "+"与用户"+history[i].username+"  "
//                        +history[i].userId+"  "+history[i].cz+"</br>";
//                    }
//                    $("#content").empty();
//                    $("#content").append(str);
                }
            });
        });

        $table.on("click","a.edit1",function(){
            $("#modalTitleHistory").html("查看日志");
            customGlobal.clearFormAndShowDialog("record");
            embedStatus(2);
            $.ajax({
                url: "shgl/getBraceletRz",
                data: {
                    braceletId:$(this).attr("braceletId")
                },
                type: "GET",
                success: function (data) {
//                    var history = data.returnData.History;
//                    var str = "";
//                    for(var i=0;i < history.length;i++){
//                        str +="在"+history[i].xgsj+"  "+"与用户"+history[i].username+"  "
//                        +history[i].userId+"  "+history[i].cz+"</br>";
//                    }
//                    $("#content").empty();
//                    $("#content").append(str);
                }
            });
        });
        
        
        $("#bdBtn").on("click",function(){
            customGlobal.blockUI("modalContent3");
            if (fun()) {

                    $.ajax({
                        url: "shgl/AddbindingPer",
                        data: {
                            ids: fun(),
                            bdper: f()
                        },
                        datatype: "json",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalBD").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
                else{
                    alert("请选择用户!");
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

    function f(){
        var  objs = $("#dataTable1 input[type=checkbox]:checked");
        var check_val = "";
        $.each(objs,function(index,obj){
            check_val +="'"+ objs[index].defaultValue+"'"+",";
        });
        return check_val;
    }

    var zTreeInit = function (node){

        node = node == undefined ? zNodes : node;
        zTreeObj = $.fn.zTree.init($("#checkAllUser"), {
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
            zNodes = zTreeNodes;
        }
    };
}();